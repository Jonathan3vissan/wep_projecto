// Reserva.js
class Reserva {
    #fecha;
    #hora;

    constructor(fecha, hora) {
        this.#fecha = fecha;
        this.#hora = hora;
    }

    async iniciarReserva(ID, intermediario, gestorArchivo) {
        const recibirCliente = await this.pedirIDoMailA(ID, intermediario, gestorArchivo);
        console.log("Cliente recibido:", recibirCliente);
        // Aquí puedes continuar con la lógica de la reserva
    }

    /**
     * Ingresa el ID por web y se verifica la existencia de este ID con un cliente registrado.
     * @param {string} ID ingresado por web.
     * @param {Intermediario} intermediario se encarga de mediar con la base de datos.
     * @param {GestorArchivoTXT} gestorArchivo de TXT.
     * @returns {Promise<Object|string>} - el cliente completo o un mensaje de error.
     */
    async pedirIDoMailA(ID, intermediario, gestorArchivo) {
        const clienteDeVuelto = await intermediario.revisarExitenciaDe(ID, gestorArchivo);
        return clienteDeVuelto;
    }
}

module.exports = Reserva;
