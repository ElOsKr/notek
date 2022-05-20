document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {

    if (document.readyState == "interactive") {
        document.getElementById("iniciarSesion").addEventListener("click", redirectSesion);
        document.getElementById("registrar").addEventListener("click", redirectRegistro);
    }
}

function redirectSesion() {
    location.href = "./html/iniciarSesion.php"
}

function redirectRegistro() {
    location.href = "./html/registro.php"
}