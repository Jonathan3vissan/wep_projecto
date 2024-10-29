const Usuario = require("./Usuario");
const crypto = require('crypto');
class Cliente extends Usuario {
    #IDCliente = "def ID"
    #tamanioID = 10;
    constructor(nombre, mail, telefono,) {
        super(nombre, mail, telefono)
    }
    /**
     * @returns ID del cliente 
     */
    getIDCLiente() {
        return this.#IDCliente
    }
    /**
     * actuliza el IDCliente
     * @param {String} IDGenerado 
     */
    actualizarIDClienteCon(IDGenerado) {
        this.#IDCliente = IDGenerado;
    }
    /**
     *envia cliente completo a quien lo solicite
     */
    enviarDatos() {
        this.#generarIDCliente()
        const ClienteEnviado = {
            nombre: this.getNombre(),
            mail: this.getMail(),
            telefono: this.getTelefono(),
            IDCliente: this.getIDCLiente()
        };
        return ClienteEnviado
    }
    /**
    * genera el ID para el cliente y lo guarda en propiedad IDcliente
    */
    #generarIDCliente() {
        const randomInput = Math.random().toString();
        const hash = crypto.createHash('sha256');
        hash.update(randomInput);
        const fullHash = hash.digest('hex');
        this.#IDCliente = fullHash.substring(0, this.#tamanioID);
    }
}
module.exports = Cliente;