import { db, getAuth, onSnapshot, getDocs, doc, collection } from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const listaChats = document.getElementsByClassName("cajaListaChatsActivos")[0];

function cargarEventos() {
    listaChatsActualizados();

}

function listaChatsActualizados() {
    listaChats.innerHTML = "";
    const referenciaChats = collection(db, "Usuarios", localStorage.getItem("id"), "Chats");
    //Consulta que siempre esta mirando si el Usuario tiene chats disponibles
    onSnapshot(referenciaChats, (chats) => {
        chats.forEach((doc) => {
            const usuario = doc.data();
            console.log("Id: ", doc.id, "Data: ", doc.data());
            listaChats.innerHTML += `
            <div data-id="${doc.id}" class="divChat w-100 p-3" style="display:inline-flex;">
                    <img data-id="${doc.id}" class="imagenPerfil"
                        srcset="${usuario.imagenUsuario}"
                        alt="imagenChat" />
                    <div class="texto" data-id="${doc.id}">
                        <h6 class="text-md-start" data-id="${doc.id}">${usuario.idNombre}</h6>
                        <p class="text-white ultimoMensaje text-md-start" data-id="${doc.id}">Hey soy oskitar hihi y
                                soy gay hihihhihihi</p>
                        <span class="tiempo text-white text-md-end " data-id="${doc.id}">${usuario.fechaChat}</span>
                    </div>
            </div>
            <hr>
            `
        });
        const listaDivsIniciarChat = listaChats.querySelectorAll(".divChat");
        enviarMensaje(listaDivsIniciarChat);
    });
}

function enviarMensaje(listaDivsIniciarChat) {
    const referenciaMensajes = collection(db, "Usuarios", localStorage.getItem("id"), "Chats");

    listaDivsIniciarChat.forEach(boton => {
        console.log(boton)
        //Saco el id que lleva cada uno
        boton.addEventListener("click", (evento) => {
            const idChat = evento.target.dataset.id;
            console.log(idChat);
        });
    });



}


