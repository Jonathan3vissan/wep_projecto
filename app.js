// Asegúrate de que las clases y funciones necesarias estén importadas correctamente
import Cliente from "./js/Cliente.js";
import GestorArchivoTXT from "./js/GestorArchivosTXT.js";
import Intermediario from "./js/Intermediario.js";
import RegistroDB from "./js/RegistroDB.js";
import Reserva from "./js/Reserva.js";

// Instancia de las clases necesarias
const DB = new RegistroDB();
const gestor_archivo = new GestorArchivoTXT();
const reserva = new Reserva("12/02", "12pm");
const intermediario = new Intermediario();

// Función para manejar el envío del formulario
document.getElementById("registration-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los datos del formulario
    const nombre_recibido = document.getElementById("nombre").value;
    const mail_recibido = document.getElementById("email").value;
    const telefono_recibido = document.getElementById("telefono").value;
    console.log(nombre_recibido);
    console.log(mail_recibido);
    console.log(telefono_recibido);

    // Crear una nueva instancia de Cliente con los datos del formulario
    const cliente = new Cliente(nombre_recibido, mail_recibido, telefono_recibido);
    console.log(cliente);

    // Mostrar mensaje de carga o algo similar (opcional)
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('success', 'error', 'show'); // Limpiar clases previas
    resultadoDiv.innerText = "Procesando registro...";  // Mensaje mientras procesas
    resultadoDiv.classList.add('show');  // Aseguramos que el div sea visible

    try {
        // Enviar datos del cliente a la base de datos
        await DB.solicitaDatosA(cliente);
        console.log("Cliente recibido en DB:", DB.getNuevoCliente());

        // Guardar cliente en el archivo
        await DB.enviarClienteA(gestor_archivo);

        // Generar y descargar archivo .txt con los datos del cliente
        const datosCliente = `Nombre: ${nombre_recibido}\nEmail: ${mail_recibido}\nTeléfono: ${telefono_recibido}`;
        descargarArchivo(datosCliente);

        // Mostrar mensaje de éxito
        resultadoDiv.innerText = "Registro realizado con éxito.";
        resultadoDiv.classList.add('success'); // Estilo de éxito
    } catch (error) {
        // Manejo de errores (por si hay algún problema en el proceso)
        console.error("Error al registrar cliente:", error);
        resultadoDiv.innerText = "Ocurrió un error al procesar el registro.";
        resultadoDiv.classList.add('error'); // Estilo de error
    }
});

// Función para generar y descargar un archivo .txt con los datos del cliente
function descargarArchivo(contenido) {
    // Crear un Blob con el contenido en formato de texto
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear una URL temporal para el archivo
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = url;
    enlaceDescarga.download = "registro_cliente.txt"; // Nombre del archivo que se descargará

    // Simular el clic en el enlace para iniciar la descarga
    enlaceDescarga.click();

    // Liberar el objeto URL creado para liberar recursos
    URL.revokeObjectURL(url);
}
