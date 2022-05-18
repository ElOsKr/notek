import { cerrarSesion, mantenerSesionActiva } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    document.getElementById("btn-sidebar").addEventListener("click", sidebar);
    irBuscadorChats();
    //Si clika en el link cerrar, cierra la sesion activa y le redirige al index
    $("#linkCerrarSesion").click(function () {
        cerrarSesion();
    });
}

function sidebar() {
    document.querySelector("body").classList.toggle("active");
    document.getElementById("btn-sidebar").classList.toggle("active");
    if (document.getElementById("btn-sidebar").classList.contains("active")) {
        document.getElementById("flecha-ocultar").animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(180deg)' }
        ], { duration: 300 })
        document.getElementById("flecha-ocultar").style.transform = "rotate(180deg)"
        $(".logo-container-block").css("display", "block");
        $(".logo-container").css("display", "none");
        $(".lista-navegacion").children().children().children().children(".col-9").css("display", "none");
        $(".lista-navegacion").children().children().children().children(".col-2").css("margin-left", "80%");
    } else {
        document.getElementById("flecha-ocultar").animate([
            { transform: 'rotate(180deg)' },
            { transform: 'rotate(360deg)' }
        ], { duration: 300 })
        document.getElementById("flecha-ocultar").style.transform = "rotate(360deg)"
        $("#logoImagen-navbar").fadeOut(300);
        $(".logo-container").fadeIn(500);
        $(".logo-container-block").css("display", "none");
        $(".lista-navegacion").children().children().children().children(".col-9").css("display", "block");
        $(".lista-navegacion").children().children().children().children(".col-2").css("margin-left", "0%");
    }
}

function irBuscadorChats() {
    $("#enlaceBuscadorChats").click(function () {
        $("#iframe").attr("src", "./buscadorChats.php");
    });
}