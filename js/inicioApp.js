import { cerrarSesion,getAuth, onAuthStateChanged } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const correo=document.getElementById("correo");
const nickname=document.getElementById("nickname");
const imagen=document.getElementById("imagenUsuario");
function cargarEventos() {
    const boton = document.getElementById("btn-cerrarSesion");
   
    //Funcion que detecta si hay un usuario conectado, si no lo hay reedirige al usuario al index.html 
    mantenerSesionActiva(correo,nickname,imagen);

    //Onclick del boton para cerrar Sesion del usuario
    $(boton).click(function () {
        cerrarSesion();
    })
}

function mantenerSesionActiva() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            correo.innerHTML += user.displayName;
            nickname.innerHTML += user.email;
            imagen.src = user.photoURL;
        } else {
            // User is signed out
            location.href = "../index.html";
        }
    });
}
