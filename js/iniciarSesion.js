import {iniciarSesion} from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    
    const boton=document.getElementById("boton");
    if (document.readyState == "interactive") {
       
    }
    const correo= document.getElementById("email");
    const contrasena=document.getElementById("password");
    boton.addEventListener("click",(e)=>{
        e.preventDefault();
        iniciarSesion(correo.value,contrasena.value);
    });

    function redirigir() {
        location.replace("../index.html");
    }
}
