import Cliente from "./Cliente.js";
import GestorArchivoTXT from "./GestorArchivosTXT.js";
class RegistroDB {
    #nuevoCliente = "def nuevo cliente "
    /**
     * @returns el nuevo cliente
     */
    getNuevoCliente() {
        return this.#nuevoCliente
    }
    /**
     * solicita los datos del cliente
     * @param {Cliente} cliente datos 
     */
    async solicitaDatosA(cliente) {
        this.#nuevoCliente = await cliente.enviarDatos()
    }
    /**
     * envia los datos del cliente al gestor para que lo guarde en el TXT
     * @param {GestorArchivoTXT} gestor para guardar en TXT 
     */
    enviarClienteA(gestor) {
        let clienteListo = "def"
        clienteListo = JSON.stringify(this.#nuevoCliente)
        gestor.registrarDatoDe(clienteListo)
    }
}
export default RegistroDB;