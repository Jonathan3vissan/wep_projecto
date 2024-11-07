class RutasHTML {
    /**
     * Redirige a registro
     */
    redirijirARegistro() {
        document.getElementById("regsitrarse-boton").addEventListener("click", () => {
            window.location.href = "../html/RegistroUsuario.html";
        });
    }
/**
 * redirije a reserva de turno
 */
    redirijirReserva() {
        document.getElementById("reserva").addEventListener("click", () => {
            window.location.href = "../html/reserva.html"
        })
    }


}

// Inicializa la clase
const rutas = new RutasHTML();
rutas.redirijirARegistro();
rutas.redirijirReserva();
