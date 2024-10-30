const { error } = require('console');
const fs = require('fs');
const path = require('path');
class GestorArchivoTXT {
    #direccionArchivo;
    #direccionAgendados;
    #rutaArchivo;
    #rutaArchivoAgendados;
    constructor() {
        this.#direccionArchivo = "registroCliente.txt";
        this.#rutaArchivo = path.join(__dirname, this.#direccionArchivo);
        this.#direccionAgendados = "agendaCita.txt";
        this.#rutaArchivoAgendados = path.join(__dirname, this.#direccionAgendados);
    }
    /**
     * Agrega los datos del cliente al archivo TXT existente
     * @param {JSON} cliente Datos del cliente a agregar
     */
    agregarDatoDe(cliente) {
        console.log(typeof cliente);
        console.log(cliente);
        this.#guadarDatosDe(cliente, this.#rutaArchivo, "Registro completado");
    }
    /**
     * agrega al txt los datos de la agenda
     * @param {JSON} infoCita con los datos de la reserva
     */
    guardarCitaDe(infoCita) {
        this.#guadarDatosDe(infoCita, this.#rutaArchivoAgendados, "Cita guardado exitomsa ")
    }
    /**
     * guarda un archivo TXT
     * @param {JSON} datos  recibido
     * @param {String} ruta de guradado
     * @param {String} mensaje de guardado exitoso
     */
    #guadarDatosDe(datos, ruta, mensaje) {
        fs.appendFile(ruta, datos + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:');
            } else {
                console.log(mensaje);
            }
        });
    }

    /**
        * busca le IDCliente en el archivo y si lo encuentra devuelve true
        * @param {String} clienteID ingresado por el usuario
        * @returns si encuentra  el IDCLinte dentro del archivo devuelve true
        */
    buscarCliente(clienteID) {
        let clienteEncontrado = null;

        fs.readFile(this.#rutaArchivo, 'utf8', (error, data) => {
            if (error) {
                console.error("Error al leer el archivo:", error);
                return; // Termina la ejecución si hay un error
            }
            const lineas = data.split('\n').map(linea => linea.trim());
            lineas.forEach(linea => {
                if (linea.toLowerCase().includes(clienteID.toLowerCase())) {
                    console.log("¡ID Cliente encontrada en base de datos!");
                    clienteEncontrado = JSON.parse(linea);
                }
            });
            if (clienteEncontrado) {
                console.log("Información del cliente:", clienteEncontrado);
            } else {
                console.log("Verifica el ID cliente, no encontrada o no existe.");
            }
        });
    }



}
module.exports = GestorArchivoTXT;