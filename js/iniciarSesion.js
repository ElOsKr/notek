import { iniciarSesion } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

const boton = document.getElementById("boton");
const correo = document.getElementById("email");
const contrasena = document.getElementById("password");

function cargarEventos() {
    //Llamando al metodo iniciar Sesion
    boton.addEventListener("click", (e) => {
        comprobarCampos(correo, contrasena);
    });
}

//Plantilla de alerta 
export function ponerInformacionAlerta(icono,titulo,texto) {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        showClass: {
            popup: 'animate__animated animate__backInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        }
    });
}

function comprobarCampos(correo, contrasena) {
    if (correo.value == "" && contrasena.value == "") {
        let icono="warning";
        let titulo='Introduzca sus credenciales';
        let texto='Dejó ambos campos vacíos';
        ponerInformacionAlerta(icono,titulo,texto);
    }
    else if (correo.value == "") {
        let icono="warning";
        let titulo='Introduzca su correo';
        let texto='Dejó el campo Correo vacío';
        ponerInformacionAlerta(icono,titulo,texto);
    }
    else if (contrasena.value == "") {
        let icono="warning";
        let titulo='Introduzca su contraseña';
        let texto='Dejó el campo Contraseña vacío';
        ponerInformacionAlerta(icono,titulo,texto);
    } else {
        iniciarSesion(correo.value, contrasena.value);
    }
}