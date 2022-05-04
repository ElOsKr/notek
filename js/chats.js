import {
    db, getAuth, onSnapshot, getDocs, getDoc, doc, mandarMensaje,
    collection, onAuthStateChanged, query, orderBy, listaChatsBuscado, ultimoChatBuscado, limit
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const listaChats = document.getElementsByClassName("cajaListaChatsActivos")[0];
const imagenPerfilActual = document.getElementsByClassName("imagenPerfilActual")[0];
const input_BuscarChat = document.getElementById("inputBuscar");
const cabeceraUsuarioChat = document.getElementsByClassName("cabeceraUsuario")[0];
const cajaChat = document.getElementsByClassName("cajaChat")[0];
const inputEnviar = document.getElementById("inputChat");
const botonEnviar = document.getElementsByClassName("botonEnviar")[0];
const ultimoMensaje = document.getElementsByClassName("ultimoMensaje")[0];

function cargarEventos() {
    listaChatsActualizados();

    //Cargar imagen del usuario logeado
    cargarImagenPerfilActual();

    //Cargar datos del chat seleccionado en la parte derecha
    cabeceraChat();
    input_BuscarChat.addEventListener("keyup", buscarChat);

    botonEnviar.addEventListener("click", enviarMensaje);

    cargarMensajesChat();

}

//Muestra todos los chats que coinciden con la subcoleccion de Chats del usuario
function listaChatsActualizados() {
    listaChats.innerHTML = "";
    const referenciaChats = collection(db, "Usuarios", localStorage.getItem("id"), "Chats");
    const consulta = query(referenciaChats, orderBy("fechaChat", "desc"));
    //Consulta que siempre esta mirando si el Usuario tiene chats disponibles
    onSnapshot(consulta, (chats) => {
        chats.forEach((doc) => {
            const usuario = doc.data();
            listaChats.innerHTML += `
            <div data-id="${doc.id}" class="divChat w-100 p-3" style="display:inline-flex;">
                    <img data-id="${doc.id}" class="imagenPerfil"
                        srcset="${usuario.imagenUsuario}"
                        alt="imagenChat"/>
                    <div class="texto" data-id="${doc.id}">
                        <h6 class="text-md-start" data-id="${doc.id}">${usuario.idNombre}</h6>
                        <p class="text-white ultimoMensaje text-md-start" data-id="${doc.id}">Hey soy oskitar hihi y
                                soy cringe hihihhihihi</p>
                        <span class="tiempo text-white text-md-end " data-id="${doc.id}">${usuario.fechaChat}</span>
                    </div>
            </div>
            <hr>
            `
        });
        const listaDivsIniciarChat = listaChats.querySelectorAll(".divChat");
        seleccionarChat(listaDivsIniciarChat);
    });
}

//Funcion que mostrará todas los chats que concidan con la busqueda
function listaChatsBuscados() {
    listaChats.innerHTML = "";
    const textoUsuario = input_BuscarChat.value.toLowerCase();
    //Se llama a una funcion que coge la subcoleccion de chats del actual usuario 
    listaChatsBuscado((chats) => {
        chats.forEach((doc) => {
            const chat = doc.data();
            if (chat.idNombre.toLowerCase().indexOf(textoUsuario) !== -1) {
                const idNombre = chat.idNombre.split(" ");
                listaChats.innerHTML += `
                <div data-id="${doc.id}" class="divChat w-100 p-3" style="display:inline-flex;">
                        <img data-id="${doc.id}" class="imagenPerfil"
                            srcset="${chat.imagenUsuario}"
                            alt="imagenChat" />
                        <div class="texto" data-id="${doc.id}">
                            <h6 class="text-md-start" data-id="${doc.id}">${idNombre}</h6>
                            <p class="text-white ultimoMensaje text-md-start" data-id="${doc.id}">Hey soy oskitar hihi y
                                    soy gay hihihhihihi</p>
                            <span class="tiempo text-white text-md-end " data-id="${doc.id}">${chat.fechaChat}</span>
                        </div>
                </div>
                <hr>
            `;

            }
        });
        comprobarResultadosBusqueda();
        const listaDivsIniciarChat = listaChats.querySelectorAll(".divChat");
        seleccionarChat(listaDivsIniciarChat);
    });
}

function comprobarResultadosBusqueda() {
    if (listaChats.innerHTML == '') {
        listaChats.innerHTML = `
            <div class="divChat w-100 p-3 text-center" style="display:inline-flex;">
                    <div class="texto">
                        <h6 class="text-md-start text-center" >No se encuentran coincidencias con ningún chat </h6>
                    </div>
            </div>
            <hr>
        `;
    }
}

function seleccionarChat(listaDivsIniciarChat) {
    const referenciaMensajes = collection(db, "Usuarios", localStorage.getItem("id"), "Chats");
    listaDivsIniciarChat.forEach(boton => {
        //Saco el id que lleva cada uno
        boton.addEventListener("click", (evento) => {
            const idChat = evento.target.dataset.id;
            //Se guarda en el localStorage el id del chat que clicka el usuario
            localStorage.setItem("idChat", idChat);
            cabeceraChat();
            cargarMensajesChat();
        });
    });
}

//Conseguir que la cabecera tenga el ultimo de la subcoleccion de chats
function cabeceraChat() {
    ultimoChatBuscado((doc) => {
        const chat = doc.data();
        cabeceraUsuarioChat.innerHTML = `
        <img class="imagenPerfil imagenPerfilCabecera" alt="miimagen" src="${chat.imagenUsuario}" />
        <div class="nombreCabecera">
            <h5 class="pt-3 mb-0 text-white">${chat.idNombre}</h5>
        </div>
        `;
    });
}

//Cargar mensajes del chat seleccionado
function cargarMensajesChat() {
    const referenciaChat = collection(db, "Chats/" + localStorage.getItem("idChat") + "/Mensajes");
    const consulta = query(referenciaChat, orderBy("fecha"));
    //Consulta que siempre esta mirando si el Usuario tiene chats disponibles
    onSnapshot(consulta, (mensajes) => {
        cajaChat.innerHTML = "";
        //Si la subcoleccion de mensajes existe en el chat seleccionado 
        if (mensajes.size > 0) {
            mensajes.forEach((doc) => {
                const mensaje = doc.data();
                if (mensaje.autor != localStorage.getItem("id")) {
                    cajaChat.innerHTML += `
                    <div class="d-flex justify-content-start m-1">
                            <span class="mensajeIzquierda">
                                ${mensaje.mensaje}
                                <div class="hora">
                                    ${mensaje.fecha}
                                </div>
                            </span>
                    </div>
                `;
                }
                else {
                    cajaChat.innerHTML += `
                    <div class="d-flex justify-content-end m-1">
                        <span class="mensajeDerecha">
                            ${mensaje.mensaje}
                            <div class="hora">
                                ${mensaje.fecha}
                            </div>
                        </span>
                    </div>
                `;
                }
                /*Esto baja el scroll automaticamente sin que lo tenga que hacer el usuario*/
                cajaChat.scrollTop = cajaChat.scrollHeight;
            });
        }
        else {
            cajaChat.innerHTML = `
                    <div class="d-flex justify-content-center m-1">
                            <h3 class="text-center text-white ponerMargen">No se encuentran mensajes</h3>
                    </div>
                `;
        }
    });
}

function enviarMensaje() {
    if (inputEnviar.value != "") {
        mandarMensaje(inputEnviar.value);
        inputEnviar.value = "";
    }
}

//Carga la imagen del usuario logeado
function cargarImagenPerfilActual() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            imagenPerfilActual.src = user.photoURL;
        }
    });
}


//Si esta vacio de ejecuta la lista de Chats que tenga ya el usuario
function buscarChat() {
    if (input_BuscarChat.value == "") {
        listaChatsActualizados();
    }
    //Si no esta vacio se imprimirá una lista de usuarios con los que coincida la busqueda 
    else if (input_BuscarChat.value != "") {
        listaChatsBuscados();
    }
}

function ultimoMensajeUsuario() {
    const referenciaMensajes = collection(db, "Chats", localStorage.getItem("idChat"), "Mensajes");
    const consulta = query(referenciaMensajes, orderBy("fecha"), limit(1));
    //Consulta que siempre esta mirando si el Usuario tiene chats disponibles
    onSnapshot(consulta, (mensaje) => {
        mensaje.forEach((doc) => {
            console.log(doc.data().mensaje);
        });
    });
}