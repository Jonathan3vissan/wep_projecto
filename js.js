class Registro {
    constructor() {
        this.formulario = document.getElementById('formulario-registro');
        this.nombreInput = document.getElementById('nombre');
        this.emailInput = document.getElementById('email');
        this.telefonoInput = document.getElementById('telefono');
        
        this.init();
    }

    init() {
        this.formulario.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const nombre = this.nombreInput.value;
        const email = this.emailInput.value;
        const telefono = this.telefonoInput.value;

        console.log(`Nombre: ${nombre}, Email: ${email}, Teléfono: ${telefono}`);

        // Aquí puedes añadir la lógica para enviar los datos a tu servidor o API
    }
}

// Inicializa la clase Registro
const registro = new Registro();
