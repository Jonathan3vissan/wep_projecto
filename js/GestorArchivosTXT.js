// GestorArchivosTXT.js
const fs = require('fs').promises; // Asegúrate de usar fs como promesas
const path = require('path');

class GestorArchivoTXT {
    #direccionArchivo;
    #rutaArchivo;

    constructor() {
        this.#direccionArchivo = "registroCliente.txt";
        this.#rutaArchivo = path.join(__dirname, this.#direccionArchivo);
    }

    /**
     * Agrega los datos del cliente al archivo TXT existente.
     * @param {Object} cliente Datos del cliente a agregar.
     */
    async agregarDatoDe(cliente) {
        await this.#guardarDatosDe(cliente, this.#rutaArchivo, "Registro completado");
    }

    /**
     * Guarda un archivo TXT.
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

    async buscarCliente(clienteID) {
        try {
            const data = await fs.readFile(this.#rutaArchivo, 'utf8');
            const lineas = data.split('\n').map(linea => linea.trim()).filter(linea => linea !== "");
    
            // Busca el cliente en las líneas
            const clienteEncontrado = lineas
                .map(linea => {
                    try {
                        return JSON.parse(linea);
                    } catch (err) {
                        console.error(`Error al parsear línea: "${linea}":`, err.message);
                        return null; // Devuelve null si no se puede parsear
                    }
                })
                .find(cliente => cliente && cliente.IDCliente.toLowerCase() === clienteID.toLowerCase());
    
            if (clienteEncontrado) {
                console.log("¡ID Cliente encontrada en base de datos!");
                return clienteEncontrado; // Devuelve el cliente encontrado
            } else {
                return 'Cliente no encontrado'; // Mensaje de error
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            throw new Error("Error en la búsqueda del cliente.");
        }
    }
    
}

module.exports = GestorArchivoTXT;
