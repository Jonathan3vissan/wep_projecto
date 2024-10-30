const Cliente = require("./js/Cliente");
const GestorArchivoTXT = require("./js/GestorArchivosTXT");
const Intermediario = require("./js/Intermediario");
const RegistroDB = require("./js/RegistroDB");
const Reserva = require("./js/Reserva");

//-----------------
const cliente = new Cliente("jorge ", "bors@mal", "4512378")
const DB = new RegistroDB()
const gestor_archivo = new GestorArchivoTXT()
const reserva = new Reserva("12/02", "12pm")
const intermediario = new Intermediario()
//-------------------
console.log(cliente.enviarDatos());//clinte se completa bien
DB.solicitaDatosA(cliente);
console.log("recibi en DB", DB.getNuevoCliente());
DB.enviarClienteA(gestor_archivo)

reserva.pedirIDoMailA("d73dc22c5f", intermediario, gestor_archivo);



/* console.log(DB.solicitaDatosA(cliente));
console.log(DB.getNuevoCliente())
console.log("cliente ID", cliente.getIDCLiente());
console.log(cliente.enviarDatosA());
 */





