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
     * @returns cliente existente o cliente no registrado
     */
    pedirIDoMailA(cliente = "d7e9c43ac9", Intermediario) {
        return Intermediario.revisarExitenciaDe(cliente) ? "Cliente Existente" : "no existe cliente en los registros"
    }





}
module.exports = Reserva;