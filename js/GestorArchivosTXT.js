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

    //nuevo desde aca abajo
    /**
        * busca le IDCliente en el archivo y si lo encuentra devuelve true
        * @param {} clienteID 
        * @returns si encuentra  el IDCLinte dentro del archivo devuelve true
        */
    /*  identifidicarEl(clienteID) {
         let claveBuscada = clienteID.IDgenerado;
         let verificacion = false;
         fs.readFile(this.nombreArchivo, 'utf8', (error, data) => {
             if (error) {
                 console.error("Error al leer el archivo:", error);
                 return;
             }
             const lineas = data.split('\n').map(linea => linea.trim());
             const encontrada = lineas.some(linea => linea.toLowerCase().includes(claveBuscada.toLowerCase()));
             if (encontrada) {
                 console.log("¡Clave encontrada!");
                 verificacion = true;
             } else {
                 console.log("Clave no encontrada.");
                 verificacion = false;
             }
         });
         return verificacion
     }
  */
}
module.exports = GestorArchivoTXT;