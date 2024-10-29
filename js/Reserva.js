const GestorArchivoTXT = require("./GestorArchivosTXT");
const Intermediario = require("./Intermediario");

class Reserva {
    #IDCliente = "def id";
    #fecha = "def fecha";
    #hora = "def hora";
    constructor(fecha, hora) {
        this.#fecha = fecha;
        this.#hora = hora;
    }

    /**
     * ingresa el id por web y se verifica la existencia de este ID con un cliente registrado 
     * @param {string} cliente ingreasdo por web
     * @param {Intermediario} Intermediario se necarga de mediar con la base de datos 
     * @param {GestorArchivoTXT} gestorArchivo de TXT
     * @returns cliente existente o cliente no registrado
     */
    pedirIDoMailA(cliente, Intermediario, gestorArchivo) {
        return Intermediario.revisarExitenciaDe(cliente, gestorArchivo) ? "Cliente Existente" : "no existe cliente en los registros"
    }





}
module.exports = Reserva;