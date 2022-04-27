import { crearUsuario } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const botonRegistro=document.getElementById("botonRegistro");
const idRegistro=document.getElementById("idRegistro");
const nombre=document.getElementById("nombreRegistro");
const apellidos=document.getElementById("apellidosRegistro");
const correo=document.getElementById("correoRegistro");
const contrasena=document.getElementById("contraseniaRegistro");

function cargarEventos() {
    botonRegistro.addEventListener("click",(e)=>{
        //Se pone preventDefault() ya que en si, 
        //se crea el usuario bien pero va tan rapido que no da tiempo a ir a la otra pantalla 
        e.preventDefault();
        crearUsuario(correo.value,contrasena.value);
    });
}
