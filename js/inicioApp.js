import { mantenerSesionActiva, cerrarSesion } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    const boton = document.getElementById("btn-cerrarSesion");
    //Funcion que detecta si hay un usuario conectado, si no lo hay reedirige al usuario al index.html 
    mostrarDatos();
    //Onclick del boton para cerrar Sesion del usuario
    $(boton).click(function () {
        cerrarSesion();
    })
}

 function mostrarDatos() {
    const correo = document.getElementById("correo");
    const nickname = document.getElementById("nickname");
    const imagen = document.getElementById("imagenUsuario");
    otra(correo,nickname,imagen);
}

async function otra(correo,nickname,imagen) {
    const usuario = await mantenerSesionActiva();
    console.log(usuario);
    correo.innerHTML += usuario.displayName;
    nickname.innerHTML += usuario.email;
    console.log(imagen);
    imagen.src = usuario.photoURL;
}