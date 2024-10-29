const GestorArchivoTXT = require("./GestorArchivosTXT")

class Intermediario {


    /**
     * recibe el ID client de Reserva pra verificar su exitencia en la base de datos
     * @param {String} IDCliente ingresado por usuario
     * @param {GestorArchivoTXT} gestor_archivo realza la tarea de buscar la exitencia del ID
     *@returns true si se encuentra false si no se encuentra el ID
    */
    revisarExitenciaDe(IDCliente, gestor_archivo) {
        return gestor_archivo.buscarCliente(IDCliente)
    }


}
module.exports = Intermediario