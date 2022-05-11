import { doc, setDoc, db, getStorage, ref ,uploadBytes,getDownloadURL } from "/js/firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    document.getElementById("descargar").addEventListener("click", descargar);
}

const storage = getStorage();
const seleccionarImagen = document.getElementById("dejarFiles");

function descargar() {
    let archivo = seleccionarImagen.files[0];
    console.log(archivo);
    const storageRef = ref(storage, 'Anuncios/'+archivo.name);
    //Se sube a Firebase 
    return uploadBytes(storageRef, archivo).then(() => {
        //Si se subio correctamente se coge la url de la imagen subida y se la pone a la imagen
        getDownloadURL(storageRef)
            .then((url) => {
                console.log("URL descarga: "+url)
            })
            .catch((error) => {
                console.log(error);
            });
    });
}
