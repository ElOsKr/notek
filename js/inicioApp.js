import { mantenerSesionActiva, cerrarSesion } from "./firebase.js"
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js"
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

function mantenerSesion() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.email;
            mostrarDatos(user);
        } else {
            // User is signed out
            location.href = "../index.html";
        }
    });
}

function mostrarDatos() {
    const correo = document.getElementById("correo");
    const nickname = document.getElementById("nickname");
    const imagen = document.getElementById("imagenUsuario");
    const usuario = mantenerSesion();
    correo.innerHTML += usuario.displayName;
    nickname.innerHTML += usuario.email;
    console.log(imagen);
    imagen.src = usuario.photoURL;
}