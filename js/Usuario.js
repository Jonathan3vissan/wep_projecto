class Usuario {
    #nombre = "def nombre";
    #mail = "def mail"
    #telefono = "def telefono"
    constructor(nombre, mail, telefono) {
        this.#nombre = nombre;
        this.#mail = mail;
        this.#telefono = telefono;
    }
/**
 * @returns  nombre de usuario
 */
    getNombre() {
        return this.#nombre
    }
/**
 * @returns mail del usuario
 */
    getMail(){
        return this.#mail
    }
/**
 * @returns telefono del usuario
 */
getTelefono(){
    return this.#telefono
}


}
export default Usuario