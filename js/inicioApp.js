import { mantenerSesionActiva,cerrarSesion } from "./firebase.js"
import { onAuthStateChanged,getAuth } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js"
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    const boton = document.getElementById("btn-cerrarSesion");
    //Funcion que detecta si hay un usuario conectado, si no lo hay reedirige al usuario al index.html 
    mantenerSesionActiva();

    //Onclick del boton para cerrar Sesion del usuario
    $(boton).click(function () {
        cerrarSesion();
    })
}