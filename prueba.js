document.addEventListener('DOMContentLoaded', function () {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const cuerpoTabla = document.getElementById("cuerpo-tabla");

    // Iterar sobre las reservas y añadirlas a la tabla
    reservas.forEach(reserva => {
        const fila = document.createElement("tr");

        const nombreTd = document.createElement("td");
        nombreTd.textContent = reserva.nombre;
        fila.appendChild(nombreTd);

        const emailTd = document.createElement("td");
        emailTd.textContent = reserva.email;
        fila.appendChild(emailTd);

        const telefonoTd = document.createElement("td");
        telefonoTd.textContent = reserva.telefono;
        fila.appendChild(telefonoTd);

        const fechaTd = document.createElement("td");
        fechaTd.textContent = reserva.fecha;
        fila.appendChild(fechaTd);

        const horaTd = document.createElement("td");
        horaTd.textContent = reserva.hora;
        fila.appendChild(horaTd);

        cuerpoTabla.appendChild(fila);
    });
});
