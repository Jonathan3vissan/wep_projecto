import Cliente from "./js/Cliente.js";


document.getElementById("reserva-formulario").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    const nombreRecibido = document.getElementById("nombre-completo-reserva").value;
    const mailRecibido = document.getElementById("email-reserva").value;
    const telefonoRecibido = document.getElementById("telefono-reserva").value;
    const fechaRecibida = document.getElementById("date").value;
    const horaRecibida = document.getElementById("time").value;

    const reservaData = {
        nombre: nombreRecibido,
        email: mailRecibido,
        telefono: telefonoRecibido,
        fecha: fechaRecibida,
        hora: horaRecibida
    };
    localStorage.setItem("reserva", JSON.stringify(reservaData));
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('success', 'error', 'show'); 
    resultadoDiv.innerText = "Procesando reserva...";  
    resultadoDiv.classList.add('show');  

    try {
        const cliente = new Cliente(nombreRecibido, mailRecibido, telefonoRecibido);
        const datosReserva = `Nombre: ${nombreRecibido}\nEmail: ${mailRecibido}\nTeléfono: ${telefonoRecibido}\nFecha: ${fechaRecibida}\nHora: ${horaRecibida}`;
        descargarArchivo(datosReserva); 

        resultadoDiv.innerText = "Reserva realizada con éxito.";
        resultadoDiv.classList.add('success'); 
    } catch (error) {
        console.error("Error al registrar reserva:", error);
        resultadoDiv.innerText = "Ocurrió un error al procesar la reserva.";
        resultadoDiv.classList.add('error'); 
    }
});
function descargarArchivo(contenido) {
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = url;
    enlaceDescarga.download = "reserva_cliente.txt"; 
    enlaceDescarga.click();
    URL.revokeObjectURL(url);
}
