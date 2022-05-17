import { doc, db, getAuth, getDoc, onAuthStateChanged, addDoc, collection, ref, uploadBytes, getDownloadURL, getStorage } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

const btnCrearAnuncio = document.getElementById("btnCrearAnuncio");
const tituloAnuncio = document.getElementById("tituloAnuncio");
const seleccionarArchivo = document.getElementById("seleccionarArchivo");
const storage = getStorage();

function cargarEventos() {
    cargarTextarea();
    btnCrearAnuncio.addEventListener("click", validarCampos);
}

function validarCampos() {
    let contenidoAnuncio = tinymce.get("contenidoAnuncio").getContent({ format: "text" });

    if ($.trim(tituloAnuncio.value) == "") {
        mostrarErrores(0, "Introduzca algún título");
    }
    else if($.trim(tituloAnuncio.value).length > 30) {
        mostrarErrores(0, "No introduzca más de 30 caracteres")
    }
    else{
        quitarErrores(0);
    }

    //Lo valido quitando los espacios en blanco
    if ($.trim(contenidoAnuncio) == "") {
        mostrarErrores(1, "Introduzca algún contenido")
    }
    else {
        quitarErrores(1);
    }

    if ($.trim(tituloAnuncio.value) != "" && $.trim(tituloAnuncio.value).length <= 30 && $.trim(contenidoAnuncio) != "") {
        subirAnuncio();
    }
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

function subirAnuncio() {
    let contenidoTextarea = tinymce.get("contenidoAnuncio").getContent();
    console.log(contenidoTextarea);
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            //Si el usuario subio algun archivo
            if (seleccionarArchivo.files[0] != null) {
                subirArchivo(user, contenidoTextarea);
            }
            //Sino solo se crea el anuncio sin el archivo
            else {
                const anuncio = await addDoc(collection(db, "Anuncios"), {
                    idUsuario: user.displayName,
                    imagenUsuario: user.photoURL,
                    titulo: $.trim(tituloAnuncio.value),
                    contenido: contenidoTextarea,
                    fechaPublicado: Date.now(),
                    archivoSeleccionado: "",
                    tipoArchivo: ""
                });
                //Si se creo todo correctamente te redirige
                if (anuncio != null) {
                    console.log(anuncio);
                    location.href = "../html/tablonAnuncios.php";
                }
            }
        }
        else {
            location.href = "../html/iniciarSesion.php";
        }
    });
}

function subirArchivo(user, contenidoTextarea) {
    let archivo = seleccionarArchivo.files[0];
    //Aqui se crea un id para que el archivo no se sobreescriba en el Storage de firebase
    const storageRef = ref(storage, 'Anuncios/' + Date.now() + "-" + archivo.name);
    //Se sube a Firebase 
    return uploadBytes(storageRef, archivo).then(() => {
        //Si se subio correctamente se coge la url de la imagen subida y se la pone a la imagen
        getDownloadURL(storageRef)
            .then(async (url) => {
                const anuncio = await addDoc(collection(db, "Anuncios"), {
                    idUsuario: user.displayName,
                    imagenUsuario: user.photoURL,
                    titulo: $.trim(tituloAnuncio.value),
                    contenido: contenidoTextarea,
                    fechaPublicado: Date.now(),
                    archivoSeleccionado: url,
                    tipoArchivo: archivo.name.substring(archivo.name.length - 3)
                });
                //Cuando se cargue el anuncio redirigira al usuario al inicio
                if (anuncio != null) {
                    console.log(anuncio);
                    location.href = "../html/tablonAnuncios.php";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
}


function cargarTextarea() {
    tinymce.init({
        selector: 'textarea#contenidoAnuncio',
        language: 'es'
    });
}