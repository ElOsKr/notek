// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
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

//Se exporta esta funcion hacia el iniciarSesion.js
export const iniciarSesion = (correo, contrasena) => {
    const auth = getAuth();
    console.log(correo, contrasena);
    signInWithEmailAndPassword(auth, correo, contrasena)
        .then((userCredential) => {
            // Inició sesion
            const user = userCredential.user;

            setTimeout(location.replace("../html/inicioApp.html"), 500);
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
                    popup: 'animate__animated animate__fadeInTopRight'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
        });
}

//Funcion que se encarga de saber en todo momento si hay algun usuario conectado en la app
export function mantenerSesion() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.email;
            console.log(uid);
        } else {
            // User is signed out
            location.href = "../index.html";
        }
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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Introduzca un correo correcto",
                text: "El correo no existe",
                showClass: {
                    popup: 'animate__animated animate__fadeInTopRight'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });

        });
}