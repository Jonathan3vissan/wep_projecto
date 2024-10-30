const GestorArchivoTXT = require("./GestorArchivosTXT");
const Intermediario = require("./Intermediario");

class Reserva {
    #reserva = {};
    #fecha = "def fecha";
    #hora = "def hora";
    constructor(fecha, hora) {
        this.#fecha = fecha;
        this.#hora = hora;
    }


    inciarReserva(ID, intermediario, gestorArchivo) {
        this.pedirIDoMailA(ID, intermediario, gestorArchivo)

    }


    /**
     * ingresa el id por web y se verifica la existencia de este ID con un cliente registrado 
     * @param {string} ID ingreasdo por web
     * @param {Intermediario} Intermediario se necarga de mediar con la base de datos 
     * @param {GestorArchivoTXT} gestorArchivo de TXT
     * @returns cliente si esxite
     */
    pedirIDoMailA(ID, intermediario, gestorArchivo) {
        let clienteDeVuelto = "Def"
        clienteDeVuelto = intermediario.revisarExitenciaDe(ID, gestorArchivo)

        return clienteDeVuelto
    }




}
module.exports = Reserva;