import { resetContrasena } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const correo=document.getElementById("idRegistro");
const boton = document.getElementById("botonCodigoPass");
function cargarEventos() {
    boton.addEventListener("click",(e)=>{
        e.preventDefault();
        resetContrasena(correo.value);
    });
}

