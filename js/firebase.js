// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
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

export const iniciarSesion = (correo, contrasena) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setTimeout(location.replace("../index.html"), 500);
            console.log("Iniciando Sesion");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //setTimeout(location.replace("../index.html"), 500);
            console.log("No se pudo");
        });
    console.log(correo, contrasena);
}
