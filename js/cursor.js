class CustomCursor {
    constructor(cursorElement) {
        this.cursorElement = cursorElement;
        this.isHorizontal = true; // Estado inicial

        // Configurar eventos
        this.initEvents();
    }

    initEvents() {
        document.addEventListener('mousemove', (event) => this.moveCursor(event));
        document.addEventListener('mousedown', () => this.setVerticalCursor());
        document.addEventListener('mouseup', () => this.setHorizontalCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('mouseenter', () => this.showCursor());
    }

    moveCursor(event) {
        this.cursorElement.style.left = `${event.clientX - 16}px`; // Centrado en el cursor
        this.cursorElement.style.top = `${event.clientY - 16}px`; // Centrado en el cursor
        this.cursorElement.style.display = 'block'; // Asegura que se muestre
    }

    setVerticalCursor() {
        this.cursorElement.style.backgroundImage = "url('../imagenes/cursor/cursor-vertical-final.cur')"; // Cursor vertical
    }

    setHorizontalCursor() {
        this.cursorElement.style.backgroundImage = "url('../imagenes/cursor/maquia-cursor.cur')"; // Cursor horizontal
        this.isHorizontal = true; // Restablece el estado a horizontal
    }

    hideCursor() {
        this.cursorElement.style.display = 'none'; // Oculta el cursor
    }

    showCursor() {
        this.cursorElement.style.display = 'block'; // Muestra el cursor
    }
}

// Inicializa el cursor personalizado
const moverCursor = document.getElementById("cursor-cambia");
const customCursor = new CustomCursor(moverCursor);
