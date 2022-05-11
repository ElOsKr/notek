import { doc, db, getAuth, getDoc, onAuthStateChanged, addDoc, collection, ref, uploadBytes, getDownloadURL, getStorage } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);

const btnCrearAnuncio = document.getElementById("btnCrearAnuncio");
const tituloAnuncio = document.getElementById("tituloAnuncio");
const seleccionarArchivo = document.getElementById("seleccionarArchivo");
const storage = getStorage();

function cargarEventos() {
    cargarTextarea();
    btnCrearAnuncio.addEventListener("click", subirAnuncio);

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
                    titulo: tituloAnuncio.value,
                    contenido: contenidoTextarea,
                    fechaPublicado: Date.now(),
                    archivoSeleccionado: ""
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
    const storageRef = ref(storage, 'Anuncios/' + Date.now() + "-" + archivo.name);
    //Se sube a Firebase 
    return uploadBytes(storageRef, archivo).then(() => {
        //Si se subio correctamente se coge la url de la imagen subida y se la pone a la imagen
        getDownloadURL(storageRef)
            .then(async (url) => {
                const anuncio = await addDoc(collection(db, "Anuncios"), {
                    idUsuario: user.displayName,
                    imagenUsuario: user.photoURL,
                    titulo: tituloAnuncio.value,
                    contenido: contenidoTextarea,
                    fechaPublicado: Date.now(),
                    archivoSeleccionado: url
                });
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