const Cliente = require("../Cliente");
const GestorArchivoTXT = require("../GestorArchivosTXT");
const RegistroDB = require("../RegistroDB");
const Usuario = require("../Usuario");

//-----------------
const cliente = new Cliente("pedro pedraza", "pedrito@mal", "4512378")

const DB = new RegistroDB()
const gestor_archivo = new GestorArchivoTXT()
//-------------------

console.log(cliente.enviarDatos());//clinte se completa bien

DB.solicitaDatosA(cliente);
console.log("recibi en DB",DB.getNuevoCliente());
DB.enviarClienteA(gestor_archivo)


/* console.log(DB.solicitaDatosA(cliente));
console.log(DB.getNuevoCliente())
console.log("cliente ID", cliente.getIDCLiente());
console.log(cliente.enviarDatosA());
 */





