import { mantenerSesion, cerrarSesion } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    const boton = document.getElementById("btn-cerrarSesion");
    //Funcion que detecta si hay un usuario conectado, si no lo hay reedirige al usuario al index.html 
    mantenerSesion();

    //Onclick del boton para cerrar Sesion del usuario
    $(boton).click(function () {
        cerrarSesion();
    })
}