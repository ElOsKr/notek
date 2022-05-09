import { cerrarSesion, getAuth, onAuthStateChanged } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const correo = document.getElementById("correo");
const nickname = document.getElementById("nickname");
const imagen = document.getElementById("imagenUsuario");
function cargarEventos() {
    const boton = document.getElementById("btn-cerrarSesion");

    //Funcion que detecta si hay un usuario conectado, si no lo hay reedirige al usuario al index.html 
    mantenerSesionActiva(correo, nickname, imagen);

    //Onclick del boton para cerrar Sesion del usuario
    $(boton).click(function () {
        cerrarSesion();
    });

    $("#btn-Chat").click(function () {
        buscadorChats();
    });
}

function mantenerSesionActiva() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            correo.innerHTML += user.email;
            nickname.innerHTML += user.displayName;
            imagen.src = user.photoURL;
            localStorage.setItem("id",user.email);
            localStorage.setItem("idChat", "");
            localStorage.setItem("idChatInverso", "");
        } else {
            // User is signed out
            location.href = "../index.html";
        }
    });
}

function buscadorChats() {
    location.href = "../html/buscadorChats.html";
}
