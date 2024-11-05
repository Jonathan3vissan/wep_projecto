import Usuario from "./Usuario.js";

class Cliente extends Usuario {
    #IDCliente = "def ID";
    #tamanioID = 10;

    constructor(nombre, mail, telefono) {
        super(nombre, mail, telefono);
    }

    /**
     * @returns ID del cliente 
     */
    getIDCLiente() {
        return this.#IDCliente;
    }

    /**
     * Actualiza el IDCliente
     * @param {String} IDGenerado 
     */
    actualizarIDClienteCon(IDGenerado) {
        this.#IDCliente = IDGenerado;
    }

    /**
     * Envia cliente completo a quien lo solicite
     */
    async enviarDatos() {
        await this.#generarIDCliente(); // Espera que se genere el ID asíncronamente
        const ClienteEnviado = {
            nombre: this.getNombre(),
            mail: this.getMail(),
            telefono: this.getTelefono(),
            IDCliente: this.getIDCLiente(),
        };
        return ClienteEnviado;
    }

    /**
     * Genera el ID para el cliente y lo guarda en propiedad IDcliente
     */
    async #generarIDCliente() {
        const randomInput = Math.random().toString(); // Entrada aleatoria
        const hashHex = await hashData(randomInput); // Genera el hash asíncronamente
        this.#IDCliente = hashHex.substring(0, this.#tamanioID); // Extrae el ID truncado
    }
}

/**
 * Función para generar un hash utilizando la API Web Crypto en el navegador
 * @param {string} data - Datos a ser hasheados
 * @returns {string} - Hash generado en formato hexadecimal
 */
async function hashData(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export default Cliente;
