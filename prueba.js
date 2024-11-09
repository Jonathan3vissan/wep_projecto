document.addEventListener('DOMContentLoaded', function () {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const cuerpoTabla = document.getElementById("cuerpo-tabla");

    // Función para mostrar las reservas en la tabla
    function mostrarReservas() {
        cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de volver a llenarla

        reservas.forEach((reserva, index) => {
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

            // Crear columna de acciones
            const accionesTd = document.createElement("td");

            // Crear botón de eliminar
            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.classList.add("boton");
            eliminarBtn.onclick = function() {
                eliminarReserva(index); // Llamar a la función de eliminar
            };
            accionesTd.appendChild(eliminarBtn);

            // Crear botón de modificar
            const modificarBtn = document.createElement("button");
            modificarBtn.textContent = "Modificar";
            modificarBtn.classList.add("boton");
            modificarBtn.onclick = function() {
                modificarReserva(index); // Llamar a la función de modificar
            };
            accionesTd.appendChild(modificarBtn);

            fila.appendChild(accionesTd);
            cuerpoTabla.appendChild(fila);
        });
    }

    // Función para eliminar una reserva
    function eliminarReserva(index) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta reserva?");
        if (confirmacion) {
            reservas.splice(index, 1); // Eliminar la reserva del array
            localStorage.setItem("reservas", JSON.stringify(reservas)); // Guardar el nuevo array en el localStorage
            mostrarReservas(); // Volver a mostrar las reservas actualizadas
        }
    }

    // Función para modificar una reserva
    function modificarReserva(index) {
        const reserva = reservas[index];
        // Aquí puedes redirigir a una página de edición o mostrar un formulario emergente para editar los datos.
        // En este caso, vamos a simplemente mostrar un prompt para modificar los datos como ejemplo.

        const nuevoNombre = prompt("Nuevo nombre:", reserva.nombre);
        if (nuevoNombre !== null) {
            reserva.nombre = nuevoNombre;
        }

        const nuevoEmail = prompt("Nuevo email:", reserva.email);
        if (nuevoEmail !== null) {
            reserva.email = nuevoEmail;
        }

        const nuevoTelefono = prompt("Nuevo teléfono:", reserva.telefono);
        if (nuevoTelefono !== null) {
            reserva.telefono = nuevoTelefono;
        }

        const nuevaFecha = prompt("Nueva fecha:", reserva.fecha);
        if (nuevaFecha !== null) {
            reserva.fecha = nuevaFecha;
        }

        const nuevaHora = prompt("Nueva hora:", reserva.hora);
        if (nuevaHora !== null) {
            reserva.hora = nuevaHora;
        }

        localStorage.setItem("reservas", JSON.stringify(reservas)); // Guardar los cambios en el localStorage
        mostrarReservas(); // Volver a mostrar las reservas actualizadas
    }

    // Mostrar las reservas al cargar la página
    mostrarReservas();
});
