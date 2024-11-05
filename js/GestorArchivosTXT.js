class GestorArchivoTXT {
    #localStorageClientesKey = "clientes";
    #localStorageAgendaKey = "agenda";

    constructor() {
        // Verifica si los datos existen, si no los inicializa
        if (!localStorage.getItem(this.#localStorageClientesKey)) {
            localStorage.setItem(this.#localStorageClientesKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.#localStorageAgendaKey)) {
            localStorage.setItem(this.#localStorageAgendaKey, JSON.stringify([]));
        }
    }

    /**
     * Agrega los datos del cliente al almacenamiento.
     * @param {Object} cliente Datos del cliente a agregar.
     */
    async registrarDatoDe(cliente) {
        try {
            const clientes = JSON.parse(localStorage.getItem(this.#localStorageClientesKey));
            clientes.push(cliente);
            localStorage.setItem(this.#localStorageClientesKey, JSON.stringify(clientes));
            console.log("Registro Exitoso de Cliente");
        } catch (err) {
            console.error('Error al guardar los datos:', err);
        }
    }

    /**
     * Agrega una reserva a la agenda del cliente en localStorage.
     * @param {Object} cliente Datos del cliente con su reserva.
     */
    async agendarCitaDe(cliente) {
        try {
            if (!cliente || !cliente.IDCliente) {
                throw new Error("Cliente o IDCliente no definido");
            }
            const clienteExistente = await this.buscarCliente(cliente.IDCliente); // Busca el cliente por ID
            if (!clienteExistente) {
                console.log('Cliente no encontrado');
                return;
            }
            // Agregar la cita al almacenamiento
            const agenda = JSON.parse(localStorage.getItem(this.#localStorageAgendaKey));
            agenda.push(cliente);
            localStorage.setItem(this.#localStorageAgendaKey, JSON.stringify(agenda));
            console.log("Reserva Agregada Exitosamente");
        } catch (error) {
            console.error("Error al agendar cita:", error);
        }
    }

    /**
     * Busca un cliente en localStorage por su IDCliente.
     * @param {String} clienteID El ID del cliente que se busca.
     * @returns {Object|null} El cliente encontrado o null si no se encuentra.
     */
    async buscarCliente(clienteID) {
        try {
            const clientes = JSON.parse(localStorage.getItem(this.#localStorageClientesKey));
            const clienteEncontrado = clientes.find(cliente => cliente.IDCliente && cliente.IDCliente.toLowerCase() === clienteID.toLowerCase());
            
            if (clienteEncontrado) {
                console.log("¡ID Cliente encontrado!");
                return clienteEncontrado;
            } else {
                return null;  // Si no se encuentra el cliente, devuelve null
            }
        } catch (error) {
            console.error("Error al leer los datos:", error);
            throw new Error("Error en la búsqueda del cliente.");
        }
    }

    /**
     * Verifica si existe una reserva de cliente en la agenda.
     * @param {String} IDCliente El ID del cliente a verificar.
     * @returns {Object|null} El cliente con la reserva o null si no existe.
     */
    async verificarExistenciaDeReservaDe(IDCliente) {
        try {
            const agenda = JSON.parse(localStorage.getItem(this.#localStorageAgendaKey));
            const reservaEncontrada = agenda.find(cliente => cliente.IDCliente === IDCliente);
            return reservaEncontrada ? reservaEncontrada : null;
        } catch (error) {
            console.error("Error al verificar reserva:", error);
            throw new Error("Error al verificar la existencia de la reserva.");
        }
    }
}
export default GestorArchivoTXT;
