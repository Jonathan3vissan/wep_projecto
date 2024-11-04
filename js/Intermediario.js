// Intermediario.js
const GestorArchivoTXT = require("./GestorArchivosTXT");
class Intermediario {
    /**
     * Recibe el ID cliente de Reserva para verificar su existencia en la base de datos.
     * @param {String} IDCliente ingresado por usuario.
     * @param {GestorArchivoTXT} gestor_archivo realiza la tarea de buscar la existencia del ID.
     * @returns {Promise<Object|string>} - si encuentra, recibe un objeto cliente, sino un mensaje.
     */
    async revisarExitenciaDe(IDCliente, gestor_archivo) {
        const guardardatos = await gestor_archivo.buscarCliente(IDCliente);
        return guardardatos;
    }
}
module.exports = Intermediario;
