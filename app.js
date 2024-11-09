// Asegúrate de que las clases y funciones necesarias estén importadas correctamente
import Cliente from "./js/Cliente.js";
import GestorArchivoTXT from "./js/GestorArchivosTXT.js";
import Intermediario from "./js/Intermediario.js";
import RegistroDB from "./js/RegistroDB.js";
import Reserva from "./js/Reserva.js";

// Instancia de las clases necesarias
const DB = new RegistroDB();
const gestor_archivo = new GestorArchivoTXT();

const reserva = new Reserva();
const intermediario = new Intermediario();
// Función para manejar el envío del formulario de registro
document.getElementById("formulario-registro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los datos del formulario de registro
    const nombreRecibido = document.getElementById("nombre-completo-registro").value;
    const mailRecibido = document.getElementById("email-registro").value;
    const telefonoRecibido = document.getElementById("telefono-registro").value;

    // Crear un objeto con los datos del cliente
    const clienteData = {
        nombre: nombreRecibido,
        email: mailRecibido,
        telefono: telefonoRecibido
    };

    // Obtener los datos de clientes existentes en el localStorage (si existen)
    let clientes = JSON.parse(localStorage.getItem("Registro-cliente")) || [];  // Si no existe, inicializa un array vacío.

    // Añadir el nuevo cliente al array
    clientes.push(clienteData);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("Registro-cliente", JSON.stringify(clientes));

    // Mostrar mensaje de carga o algo similar (opcional)
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('success', 'error', 'show'); // Limpiar clases previas
    resultadoDiv.innerText = "Procesando registro...";  // Mensaje mientras procesas
    resultadoDiv.classList.add('show');  // Aseguramos que el div sea visible

    try {
        // Crear una nueva instancia de Cliente y enviar datos a la base de datos
        const cliente = new Cliente(nombreRecibido, mailRecibido, telefonoRecibido);
        await DB.solicitaDatosA(cliente); // Llamada asincrónica
        console.log("Cliente recibido en DB:", DB.getNuevoCliente());

        // Mostrar mensaje de éxito
        resultadoDiv.innerText = "Registro realizado con éxito.";
        resultadoDiv.classList.add('success'); // Estilo de éxito
    } catch (error) {
     
        console.error("Error al registrar cliente:", error);
        resultadoDiv.innerText = "Ocurrió un error al procesar el registro.";
        resultadoDiv.classList.add('error'); // Estilo de error
    }
});

// Función para generar y descargar un archivo .txt con los datos de la reserva
function descargarArchivo(contenido) {
    // Crear un Blob con el contenido en formato de texto
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear una URL temporal para el archivo
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = url;
    enlaceDescarga.download = "reserva_cliente.txt"; // Nombre del archivo que se descargará

    // Simular el clic en el enlace para iniciar la descarga
    enlaceDescarga.click();

    // Liberar el objeto URL creado para liberar recursos
    URL.revokeObjectURL(url);
}
