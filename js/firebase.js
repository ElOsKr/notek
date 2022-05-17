// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, setDoc, getDoc, query, orderBy, limit, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdfDNkqHudgSySJipyKCIORWUamoYVI2I",
    authDomain: "proyectonotek.firebaseapp.com",
    projectId: "proyectonotek",
    storageBucket: "proyectonotek.appspot.com",
    messagingSenderId: "785351888693",
    appId: "1:785351888693:web:e779b9d7b71b07011ac67c",
    measurementId: "G-R1GN2M8GPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Conexion a Firestore
const db = getFirestore();

//Asi se puede hacer exportar las librerias de Firebase a los otros archivos que se quieran
export {
    getAuth,
    onAuthStateChanged,
    getDocs,
    doc,
    db,
    onSnapshot,
    collection,
    setDoc,
    query,
    orderBy,
    limit,
    getDoc,
    updateDoc,
    getStorage, ref,
    getDownloadURL, uploadBytes,
    updateProfile,
    addDoc
}

//Se exporta esta funcion hacia el iniciarSesion.js
export const iniciarSesion = (correo, contrasena) => {
    const auth = getAuth();
    console.log(correo, contrasena);
    signInWithEmailAndPassword(auth, correo, contrasena)
        .then((userCredential) => {
            // Inició sesion
            const user = userCredential.user;

            setTimeout(location.replace("../html/tablonAnuncios.php"), 500);
            console.log("Iniciando Sesion con " + user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Muestra el mensaje de error de credenciales
            Swal.fire({
                icon: "error",
                title: "Introduzca sus credenciales correctamente",
                text: "Los credenciales introducidos no existen",
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
        });
}

//Funcion que cierra la sesion del usuario cuando sale de la app
export function cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
        //Si se cierra Sesion correctamente ni hace falta cerrar la pagina y redirigir 
        //al usuario al inicio, (de eso se encarga la function mantenerSesion())
        console.log("Se cerro sesion correctamente");
    }).catch((error) => {
        console.log("No se pudo deslogear de la pagina");
    });
}

export function resetContrasena(correo) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, correo)
        .then(() => {
            console.log("Se envio un correo ");
            Swal.fire({
                icon: "info",
                title: "Revise su correo ",
                text: "Revise su correo y siga los pasos para resetear su contraseña",
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Introduzca un correo correcto",
                text: "El correo no existe",
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });

        });
}

//Le ponemos async a la 1º funcion que queremos ejecutar 
export function crearUsuario(correo, contrasena, nickname, nombre, apellidos, errorParrafo) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, correo, contrasena)
        .then((userCredential) => {
            // Se inicio Sesion
            console.log("Se creo el usuario");
            //Borra en el forulario el error
            errorParrafo.innerText = "";
            errorParrafo.style.display = "none";
            //Si se creo el usuario se añadirá al perfil del Usuario el IDnombre del formulario
            const actualizar = actualizarUsuario(auth, nickname, nombre, apellidos, correo);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Pone en el forulario el error existente
            errorParrafo.innerText = "El correo introducido ya existe";
            errorParrafo.style.display = "block";
        });
}

//Se añade nickname y foto por defecto al usuario que se registre
function actualizarUsuario(auth, nickname, nombre, apellidos, correo) {
    return updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/fotoSinPerfil%2Fsinperfil.png?alt=media&token=8aa1c14a-30df-4c5a-a739-d283a3fb52c0"
    }).then(async () => {
        //Se pone async y await para que espere la funcion a que se realice la funcion si no se pone esto no furula
        //Aqui se añade los datos recibidos del Formualrio de Registro al Cloud Firestore, para crear la coleccion de Datos
        const docRef = {
            idUsuario: nickname,
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            imagenUsuario: "https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/fotoSinPerfil%2Fsinperfil.png?alt=media&token=8aa1c14a-30df-4c5a-a739-d283a3fb52c0"
        }
        //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos
        await setDoc(doc(db, "Usuarios", correo), docRef);

        location.href = "../html/tablonAnuncios.php";
    })
}

/*----------------------------------------------------------BuscadorUsuarios------------------------------------------------*/

//Funcion que devuelve todos los documentos de la coleccion Usuarios
export const listaUsuarios = () => getDocs(collection(db, "Usuarios"));

//Funcion que devuelve todos los documentos de la coleccion Usuarios a tiempo Real
export const listaUsuariosActualizado = (funcion) => onSnapshot(collection(db, "Usuarios"), funcion);

/*----------------------------------------------------------CHATS------------------------------------------------*/

//Te devuelve una lista de chats del usuario logeado
export const listaChatsBuscado = (funcion) => onSnapshot(collection(db, "Usuarios/" + localStorage.getItem("id") + "/Chats"), funcion);

//Te devuelve un documento, el ultimo chat seleccionado por el usuario
export const ultimoChatBuscado = (funcion) => onSnapshot(doc(db, "Usuarios/" + localStorage.getItem("id") + "/Chats/" + localStorage.getItem("idChat")), funcion);

//Carga la imagen del usuario logeado
export function cargarImagenPerfilActual(imagenPerfilActual) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            imagenPerfilActual.src = user.photoURL;
        }
        else {
            location.href = "../html/iniciarSesion.php";
        }
    });
}

export async function mandarMensaje(mensajeMandado) {
    console.log(mensajeMandado);
    let idChat = "";
    let idChatInverso = localStorage.getItem("idChat").split(" ");
    localStorage.setItem("idChatInverso", idChatInverso[1] + " " + idChatInverso[0]);
    const referenciaChat = doc(db, "Usuarios/" + localStorage.getItem("id") + "/Chats", localStorage.getItem("idChatInverso"));
    const chat = await getDoc(referenciaChat);
    //Si existe el chat retorna true
    if (chat.exists()) {
        console.log("Existe el chat");
        idChat = localStorage.getItem("idChatInverso");
        const referenciaChatExistente = doc(db, "Usuarios/" + idChatInverso[0] + "/Chats", idChat);

        await updateDoc(referenciaChatExistente, {
            fechaChat: Date.now(),
            ultimoMensaje: mensajeMandado
        });

        const referenciaChatExistenteAjeno = doc(db, "Usuarios/" + idChatInverso[1] + "/Chats", idChat);

        await updateDoc(referenciaChatExistenteAjeno, {
            fechaChat: Date.now(),
            ultimoMensaje: mensajeMandado
        });

    } else {
        console.log("No Existe el chat");
        idChat = localStorage.getItem("idChat");
        const referenciaChatNoExistente = doc(db, "Usuarios/" + idChatInverso[0] + "/Chats", idChat);
        await updateDoc(referenciaChatNoExistente, {
            fechaChat: Date.now(),
            ultimoMensaje: mensajeMandado
        });
        const referenciaChatNoExistenteAjeno = doc(db, "Usuarios/" + idChatInverso[1] + "/Chats", idChat);
        await updateDoc(referenciaChatNoExistenteAjeno, {
            fechaChat: Date.now(),
            ultimoMensaje: mensajeMandado
        });
    }
    //Se le pasa el id del usuario y se crea la subcolleccion Mensajes dentro de ese documento
    const mensaje = await addDoc(collection(db, "Chats/" + idChat + "/Mensajes"), {
        autor: localStorage.getItem("id"),
        fecha: Date.now(),
        mensaje: mensajeMandado
    });
}

/*-----------------------------------------ANUNCIOS------------------------------------------------*/
export const listaAnunciosActualizado = (funcion) => onSnapshot(collection(db, "Anuncios"), funcion);