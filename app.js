const Cliente = require("./js/Cliente");
const GestorArchivoTXT = require("./js/GestorArchivosTXT");
const Intermediario = require("./js/Intermediario");
const RegistroDB = require("./js/RegistroDB");
const Reserva = require("./js/Reserva");

//-----------------
const cliente = new Cliente("jorge", "bors@mal", "4512378");
const DB = new RegistroDB();
const gestor_archivo = new GestorArchivoTXT();
const reserva = new Reserva("12/02", "12pm");
const intermediario = new Intermediario();
//-------------------

// Aquí está la función asincrónica para ejecutar la lógica
(async () => {
    // Primero, puedes enviar los datos del cliente a la base de datos si es necesario
    // DB.solicitaDatosA(cliente);
    // console.log("recibi en DB", DB.getNuevoCliente());
    // DB.enviarClienteA(gestor_archivo);
    
    // Llamamos a pedirIDoMailA y esperamos su resultado
    const clienteEncontrado = await reserva.pedirIDoMailA("d73dc22c5f", intermediario, gestor_archivo);
    
    console.log("Cliente recibido:", clienteEncontrado);

    // Continúa con la lógica de la reserva si el cliente es encontrado
    if (typeof clienteEncontrado !== 'string') { // Si no es un mensaje de error
        // Lógica para continuar con la reserva
        console.log("Reserva en proceso...");
    } else {
        console.log(clienteEncontrado); // Imprime el mensaje de cliente no encontrado
    }
})();
