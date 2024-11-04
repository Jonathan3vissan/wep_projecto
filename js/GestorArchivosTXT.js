// GestorArchivosTXT.js
const fs = require('fs').promises; // Asegúrate de usar fs como promesas
const path = require('path');
class GestorArchivoTXT {
    #direccionArchivoAgenda;
    #rutaArchivoAgenda;
    #direccionArchivo;
    #rutaArchivo;
    constructor() {
        this.#direccionArchivo = "registroCliente.txt";
        this.#rutaArchivo = path.join(__dirname, this.#direccionArchivo);
        this.#direccionArchivoAgenda = "Agenda.txt";
        this.#rutaArchivoAgenda = path.join(__dirname, this.#direccionArchivoAgenda);
    }
    /**
     * Agrega los datos del cliente al archivo TXT existente.
     * @param {Object} cliente Datos del cliente a agregar.
     */
    async registrarDatoDe(cliente) {
        await this.#guardarDatosDe(cliente, this.#rutaArchivo, "Registro Exitoso de Cliente");
    }


   async agendarCitaDe(cliente) {
    try {
        if (!cliente || !cliente.IDCliente) {
            throw new Error("Cliente o IDCliente no definido");
        }
        let verificar = cliente.IDCliente;  // Asegúrate de usar directamente el ID
        console.log("Verificando IDCliente:", verificar);
        
        const clienteExistente = await this.buscarCliente(verificar);  // Llama a buscarCliente con el IDCliente
        if (!clienteExistente) {
            console.log('Cliente no encontrado');
            return;
        }
        
        await this.#guardarDatosDe(cliente, this.#rutaArchivoAgenda, "Reserva Agregada Exitosamente");
    } catch (error) {
        console.error(error);
    }
}



    /**
     * Guarda los datos en un archivo TXT.
     * @param {Object} datos Recibido.
     * @param {String} ruta de guardado.
     * @param {String} mensaje de guardado exitoso.
     */
    async #guardarDatosDe(datos, ruta, mensaje) {
        try {
            await fs.appendFile(ruta, JSON.stringify(datos) + '\n');
            console.log(mensaje);
        } catch (err) {
            console.error('Error al escribir en el archivo:', err);
        }
    }
    /**
     * verifica  la existencia de la reserva en agenda
     * @param {String} IDCliente recibido de reserva  
     * @returns 
     */
    async verificarExistenciaDeReservaDe(IDCliente) {
        let reservaVerifcar = JSON.stringify(IDCliente)
        return await this.buscarCliente(reservaVerifcar)
    }
    /**
     * verifica la existencia del cliente en el TXT
     * @param {string} clienteID 
     * @returns el cliente si se encuentra
     */
    async buscarCliente(clienteID) {
        try {
            if (!clienteID) {
                throw new Error("ID de cliente no definido");
            }
            const data = await fs.readFile(this.#rutaArchivo, 'utf8');
            const lineas = data.split('\n').map(linea => linea.trim()).filter(linea => linea !== "");
            
            const clienteEncontrado = lineas
                .map(linea => {
                    try {
                        return JSON.parse(linea);
                    } catch (err) {
                        console.error(`Error al parsear línea: "${linea}":`, err.message);
                        return null;
                    }
                })
                .find(cliente => cliente && cliente.IDCliente && cliente.IDCliente.toLowerCase() === clienteID.toLowerCase());
            
            console.log("Cliente encontrado:", clienteEncontrado);
    
            if (clienteEncontrado) {
                console.log("¡ID Cliente encontrado!");
                return clienteEncontrado;
            } else {
                return null;  // Cambiado para devolver null si no se encuentra
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw new Error("Error en la búsqueda del cliente.");
        }
    }
    
}
module.exports = GestorArchivoTXT;
