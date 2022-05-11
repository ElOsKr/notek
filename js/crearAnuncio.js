import { doc, db, getAuth, getDoc, onAuthStateChanged, addDoc,collection } from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const btnCrearAnuncio = document.getElementById("btnCrearAnuncio");
const tituloAnuncio = document.getElementById("tituloAnuncio");
function cargarEventos() {
    cargarTextarea();

    btnCrearAnuncio.addEventListener("click", subirImagen);

}

function subirImagen() {
    let contenidoTextarea = tinymce.get("contenidoAnuncio").getContent();
    console.log(contenidoTextarea);
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const anuncio = await addDoc(collection(db, "Anuncios"), {
                idUsuario: user.displayName,
                imagenUsuario: user.photoURL,
                titulo: tituloAnuncio.value,
                contenido: contenidoTextarea,
                fechaPublicado: Date.now()
            });
            if(anuncio!=null){
                console.log(anuncio);
                location.href = "../html/tablonAnuncios.html";
            }
            
        }
        else {
            location.href = "../html/iniciarSesion.html";
        }
    });
}

function cargarTextarea() {
    tinymce.init({
        selector: 'textarea#contenidoAnuncio',
        language: 'es'
    });
}