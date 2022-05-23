// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, setDoc, getDoc, query, orderBy, limit, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
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
    addDoc,
    where
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
        //al usuario al inicio, (de eso se encarga la function mantenerSesionActiva())
        localStorage.setItem("id", "");
        localStorage.setItem("idChat", "");
        localStorage.setItem("idChatInverso", "");
        localStorage.setItem("imagenPerfil", "");
        localStorage.setItem("idGrupo", "");
    }).catch((error) => {
        console.log("No se pudo deslogear de la pagina");
    });
}

export function mantenerSesionActiva() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem("id", user.email);
            localStorage.setItem("idChat", "");
            localStorage.setItem("idChatInverso", "");
            localStorage.setItem("imagenPerfil", user.photoURL);
            localStorage.setItem("idGrupo", "");
        } else {
            // User is signed out
            location.href = "../index.html";
        }
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
    //Si existe el chat en la referencia del usuario Ajeno, se actualizarán los campos correspondientes en esa referencia
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

    }
    //Si no existe el chat allí, entonces se encuentra en la referencia del usuario propio, y se actualizaran los campos correspondientes
    else {
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

//Aqui se cargan los comentarios nada mas en cada div del modal
export function listaComentariosActualizados(comentarios, id) {
    let htmlComentarios = "";
    //Si no hay comentarios aparecerá este div
    if (comentarios.length == 0) {
        htmlComentarios += `
            <div class="col-12 py-2 px-2">
                <div data-id="" class="d-block w-100 p-3 comentario mt-5" style="display:inline-flex;">
                        <div class="texto text-white " data-id="">
                            <h4 class="text-center">No hay comentarios</h4>
                        </div>
                </div>
            </div>
            `;
        //Aqui se pone el comentario para insertarlo en el div correspondiente
        $(".cajaComentarios" + id).html(htmlComentarios);
    }
    //Si hay comentarios
    else {
        comentarios.forEach(comentarios => {
            let fecha = new Date(comentarios.fechaComentario);
            let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();

            htmlComentarios += `
                    <div class="col-12 py-2 px-2">
                        <div data-id="" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                            <div class="texto text-white" data-id="">
                                <img data-id="" class="imagenPerfil" srcset="${comentarios.imagenUsuario}" alt="imagenChat" />
                                <h4 class="text-md-start" data-id="">${comentarios.idUsuario}</h4>
                                <p class=" ultimoMensaje text-md-start" data-id="">${comentarios.contenido}</p>
                                <span class="tiempo text-md-end float-end" data-id="">${formatearFecha}</span>
                                <br>
                            </div>
                        </div>
                    </div>
                `;

            //Aqui se pone el comentario para insertarlo en el div correspondiente
            $(".cajaComentarios" + id).html(htmlComentarios);
            /*Esto baja el scroll automaticamente sin que lo tenga que hacer el usuario*/
            $(".cajaComentarios" + id).each(function () { this.scrollTop = this.scrollHeight; });
        });
    }
}

/**------------------------------------------------GRUPOS------------------------------------------ */
//Asignar un evento a cada boton para añadir un comentario en la subcoleccion correspondiente
export function enviarComentario(listaBotonesMandarComentario, inputComentario) {
    //Recorro la lista de Botones 
    for (let i = 0; i < listaBotonesMandarComentario.length; i++) {
        //Aqui le añado un evento a cada boton
        listaBotonesMandarComentario[i].addEventListener("click", async (evento) => {
            //Recojo la referencia del id del Anuncio
            const id = evento.target.dataset.id;
            //Si en el input correspondiente hay caracteres quitandole los espacios
            if ($.trim(inputComentario[i].value) != "") {
                //Hago la referencia en Firebase para situarme en la subcoleccion de Anuncios y justo en el anuncio seleccionado
                let comentarios = "Grupos/" + localStorage.getItem("idGrupo") + "/Anuncios/" + id;
                let referenciaComentarios = await addDoc(collection(db, comentarios, "Comentarios"), {
                    idUsuario: localStorage.getItem("id"),
                    fechaComentario: Date.now(),
                    imagenUsuario: localStorage.getItem("imagenPerfil"),
                    contenido: inputComentario[i].value
                });
                inputComentario[i].value = "";
            }
        });

    }
}

export function actualizaBienComentarios(id) {
    const referenciaComentarios = collection(db, "Grupos/" + localStorage.getItem("idGrupo") + "/Anuncios/" + id + "/Comentarios");
    //Lo ordeno los comentarios por el campo fechaComentario y de forma ascendente
    const consulta = query(referenciaComentarios, orderBy("fechaComentario", "asc"));
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
        const comentarios = [];
        querySnapshot.forEach((doc) => {
            comentarios.push({
                id: doc.id,
                idUsuario: doc.data().idUsuario,
                fechaComentario: doc.data().fechaComentario,
                imagenUsuario: doc.data().imagenUsuario,
                contenido: doc.data().contenido,
                idAnuncio: doc.data().idAnuncio
            });
        });
        listaComentariosActualizados(comentarios, id);
    });
}