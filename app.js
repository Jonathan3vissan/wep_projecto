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

    // Enviar datos del cliente a la base de datos
    await DB.solicitaDatosA(cliente);
    console.log("Cliente recibido en DB:", DB.getNuevoCliente());

    // Guardar cliente en el archivo
    DB.enviarClienteA(gestor_archivo);
});
/*  try {

     // Buscar el cliente por email en la base de datos (o archivo)
     let clienteEncontrado = await reserva.pedirIDoMailA(mail_recibido, intermediario, gestor_archivo);

     // Mostrar el cliente encontrado o mensaje de error
     console.log("Cliente recibido:", clienteEncontrado);

     // Si el cliente es encontrado, continúa con el proceso de reserva
     if (typeof clienteEncontrado !== 'string') {
         console.log("Reserva en proceso...");
         console.log("cliente encontrado", clienteEncontrado);
         reserva.registrarReservaCon(clienteEncontrado, gestor_archivo);
         resultadoDiv.innerText = "Reserva realizada con éxito.";
         resultadoDiv.classList.add('success'); // Estilo de éxito
     } else {
         // Si el cliente no fue encontrado, muestra el error
         console.log(clienteEncontrado);
         resultadoDiv.innerText = clienteEncontrado;  // Muestra el mensaje de error
         resultadoDiv.classList.add('error'); // Estilo de error
     }
 } catch (error) {
     // Manejo de errores (por si hay algún problema en el proceso)
     console.error("Error al registrar cliente:", error);
     resultadoDiv.innerText = "Ocurrió un error al procesar el registro.";
     resultadoDiv.classList.add('error'); // Estilo de error
 }
}); */
