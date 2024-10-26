class RutasHTML {
    /**
     * Redirige a registro
     */
    redirijirARegistro() {
        document.getElementById("regsitrarse-boton").addEventListener("click", () => {
            window.location.href = "../html/RegistroUsuario.html";
        });
    }
}

// Inicializa la clase
const rutas = new RutasHTML();
rutas.redirijirARegistro();
