// Asegúrate de que las clases y funciones necesarias estén importadas correctamente
import Cliente from "./js/Cliente.js";
import GestorArchivoTXT from "./js/GestorArchivosTXT.js";
import Intermediario from "./js/Intermediario.js";
import RegistroDB from "./js/RegistroDB.js";
import Reserva from "./js/Reserva.js";

//  Instancia de las clases necesarias
const DB = new RegistroDB();
const gestor_archivo = new GestorArchivoTXT();
const reserva = new Reserva();
const intermediario = new Intermediario();

// Función para manejar el  envío del formulario de reserva
document.getElementById("reserva-formulario").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los datos del formulario de reserva
    const nombreRecibido = document.getElementById("nombre-completo-reserva").value;
    const mailRecibido = document.getElementById("email-reserva").value;
    const telefonoRecibido = document.getElementById("telefono-reserva").value;
    const fechaRecibida = document.getElementById("date").value;
    const horaRecibida = document.getElementById("time").value;

    // Crear un objeto con los datos de la reserva
    const reservaData = {
        nombre: nombreRecibido,
        email: mailRecibido,
        telefono: telefonoRecibido,
        fecha: fechaRecibida,
        hora: horaRecibida
    };

    // Guardar los datos de reserva en localStorage
    localStorage.setItem("reserva", JSON.stringify(reservaData));

    // Mostrar mensaje de carga o algo similar (opcional)
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('success', 'error', 'show'); // Limpiar clases previas
    resultadoDiv.innerText = "Procesando reserva...";  // Mensaje mientras procesas
    resultadoDiv.classList.add('show');  // Aseguramos que el div sea visible

    try {
        // Crear una nueva instancia de Cliente y enviar datos a la base de datos
        const cliente = new Cliente(nombreRecibido, mailRecibido, telefonoRecibido);
        await DB.solicitaDatosA(cliente); // Llamada asincrónica
        console.log("Cliente recibido en DB:", DB.getNuevoCliente());

        // Guardar cliente en el archivo (si es necesario)
        DB.enviarClienteA(gestor_archivo);

        // Generar y descargar archivo .txt con los datos de la reserva
        const datosReserva = `Nombre: ${nombreRecibido}\nEmail: ${mailRecibido}\nTeléfono: ${telefonoRecibido}\nFecha: ${fechaRecibida}\nHora: ${horaRecibida}`;
        descargarArchivo(datosReserva); // Llamamos a la función para generar el archivo

        // Mostrar mensaje de éxito
        resultadoDiv.innerText = "Reserva realizada con éxito.";
        resultadoDiv.classList.add('success'); // Estilo de éxito
    } catch (error) {
        // Manejo de errores (por si hay algún problema en el proceso)
        console.error("Error al registrar reserva:", error);
        resultadoDiv.innerText = "Ocurrió un error al procesar la reserva.";
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
