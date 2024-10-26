const moverCursor = document.getElementById("cursor-cambia");
let isHorizontal = true; // Estado inicial

document.addEventListener('mousemove', (event) => {
    // Mueve el cursor a la posición del mouse
    moverCursor.style.left = `${event.clientX - 16}px`; // Centrado en el cursor
    moverCursor.style.top = `${event.clientY - 16}px`; // Centrado en el cursor
});

// Al presionar el botón del mouse
document.addEventListener('mousedown', () => {
    moverCursor.style.backgroundImage = "url('../imagenes/cursor/correcion-vertical.cur')"; // Cursor vertical
});

// Al soltar el botón del mouse
document.addEventListener('mouseup', () => {
    // Vuelve el cursor a horizontal y cambia el estado
    moverCursor.style.backgroundImage = "url('../imagenes/cursor/maquia-cursor.cur')"; // Cursor horizontal
    isHorizontal = true; // Restablece el estado a horizontal
});

// Evento de clic para alternar el estado (removido, ya no es necesario)
