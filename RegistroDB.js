const Cliente = require("./Cliente");
const GestorArchivoTXT = require("./GestorArchivosTXT");

class RegistroDB {
    #nuevoCliente = "def nuevo cliente "
    /**
     * @returns el nuevo cliente
     */
    getNuevoCliente() {
        return this.#nuevoCliente
    }

    solicitaDatosA(cliente) {
        this.#nuevoCliente = cliente.enviarDatos()

    }

    /**
     * envia los datos del cliente al gestor para que lo guarde en el TXT
     * @param {GestorArchivoTXT} gestor para guardar en TXT 
     */
    enviarClienteA(gestor) {
        let clienteListo = "def"
        clienteListo = JSON.stringify(this.#nuevoCliente)
        gestor.agregarDatoDe(clienteListo)

    }


}
module.exports = RegistroDB;