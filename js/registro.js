import { crearUsuario } from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);
const botonRegistro = document.getElementsByTagName("button")[0];
const idRegistro = document.getElementsByTagName("input")[0];
const nombre = document.getElementsByTagName("input")[1];
const apellidos = document.getElementsByTagName("input")[2];
const correo = document.getElementsByTagName("input")[3];
const contrasena = document.getElementsByTagName("input")[4];
const correoFallo = document.getElementsByClassName("errores")[3];

function cargarEventos() {
    botonRegistro.addEventListener("click", (e) => {
        //Poner esto cada vez que vayamos a clickar en un formulario
        e.preventDefault();
        let arrayFallos = comprobarFallos(idRegistro, nombre, apellidos, correo, contrasena);
        if (arrayFallos.filter(x => x === true).length === 5) {
            e.preventDefault();
            //Con el siguiente metodo valida en Firebase si el correo introducido por el usuario ya existia
            const resultado = crearUsuario($.trim(correo.value), $.trim(contrasena.value), $.trim(idRegistro.value), $.trim(nombre.value), $.trim(apellidos.value), correoFallo);
        }
    });
}

function validarCampos(idRegistro, nombre, apellidos, correo, contrasena) {
    let arrayErrores = [];
    if ($.trim(idRegistro.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(0, "Introduzca un nickname");
    } else
        arrayErrores.push(true);

    if ($.trim(nombre.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(1, "Introduzca un nombre");
    } else
        arrayErrores.push(true);

    if ($.trim(apellidos.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(2, "Introduzca unos apellidos");
    } else
        arrayErrores.push(true);

    if ($.trim(correo.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(3, "Introduzca un correo");
    } else
        arrayErrores.push(true);

    if (!validarContrasena(contrasena)) {
        arrayErrores.push(false);
    } else
        arrayErrores.push(true);

    return arrayErrores;
}

function quitarErrores(indice) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = "";
    error.style.display = "none";
}

function mostrarErrores(indice, advertencia) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = advertencia;
    error.style.display = "block";
}

function comprobarFallos(idRegistro, nombre, apellidos, correo, contrasena) {
    let arrayErrores = validarCampos(idRegistro, nombre, apellidos, correo, contrasena);
    for (let i = 0; i < arrayErrores.length; i++) {
        //Si el elemento es true se quitan los errores
        if (arrayErrores[i] == true) {
            quitarErrores(i);
            console.log("Correcto " + i + " " + arrayErrores[i]);
        } else {
            console.log("Fallo " + i + " " + arrayErrores[i]);
        }
    }
    return arrayErrores;
}


function validarContrasena(contrasena) {
    let activador = true;
    if ($.trim(contrasena.value) == "") {
        mostrarErrores(4, "Introduzca una contraseña");
        activador = false;
    }
    else {
        //Valido la contraseña si es menor a 6 caracteres ya que en 
        //Firebase no se pueden poner contraseñas de menos de 6 caracteres
        if (contrasena.value.length <= 5) {
            console.log(contrasena.value.length);
            mostrarErrores(4, "Introduzca una contraseña de más de 5 caracteres");
            activador = false;
        }
    }
    return activador;
}