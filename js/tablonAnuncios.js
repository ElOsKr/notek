import {
    db, onSnapshot,
    collection, query, orderBy, getAuth, onAuthStateChanged
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const cajaIntroducirAnuncio = document.getElementsByClassName("cajaIntroducirAnuncio")[0];

function cargarEventos() {
    actualizaBienAnuncios();
    mantenerSesionActiva();
}

//Esta funcion evita que haya repeticiones a la hora de que detecte cambios en firebase
function actualizaBienAnuncios() {
    const referenciaAnuncios = collection(db, "Anuncios");
    const consulta = query(referenciaAnuncios, orderBy("fechaPublicado", "desc"));
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
        const anuncios = [];
        querySnapshot.forEach((doc) => {
            anuncios.push({
                id: doc.id,
                idUsuario: doc.data().idUsuario,
                fechaPublicado: doc.data().fechaPublicado,
                imagenUsuario: doc.data().imagenUsuario,
                titulo: doc.data().titulo,
                contenido: doc.data().contenido,
                archivoSeleccionado: doc.data().archivoSeleccionado,
                tipoArchivo: doc.data().tipoArchivo
            })
        });
        console.log(anuncios);
        listaAnunciosActualizados(anuncios);
    });
}

function listaAnunciosActualizados(anuncios) {
    let html = "";
    let htmlComentariosEstructura = "";
    //Recorro los anuncios
    anuncios.forEach(anuncios => {
        let link = "";
        let fecha = new Date(anuncios.fechaPublicado);
        let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
        //Si el anuncio tiene un archivo subido se mostrará el link
        if (anuncios.archivoSeleccionado != "") {
            //Si el archivo subido es de extension txt o pdf
            if (anuncios.tipoArchivo == "txt" || anuncios.tipoArchivo == "pdf") {
                link = `<a  href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-3 text-white me-3">Visualizar archivo aportado</a>`;
            }
            else {
                link = `<a  href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-3 text-white me-3">Enlace descargar archivo auxiliar</a>`;
            }
        }

        html += `
                <div class="col-md-6 my-3">
                    <div class="card cajasContenido">
                        <div class="card-body ">
                            <div class="w-100 text-center">
                                <img class="rounded-circle imagenAutor"
                                    src="${anuncios.imagenUsuario}"
                                    alt="imagenAutor">
                                <h3 class="text-center py-3 mt-1 w-100">${anuncios.idUsuario}</h3>
                            </div>
                            <h4 class="card-title  float-start ">${anuncios.titulo}</h4>
                            <br>
                            <br>
                            <div class="cajaIntroducirContenido p-1 bg-white text-black">
                                <p class="card-text">
                                ${anuncios.contenido}
                                </p>
                            </div>
                            <br>
                            <a class="venobox" data-overlay="#393b44" data-vbtype="inline" href="#${anuncios.id}">
                                <button class="btn btn-secondary my-2 text-white float-start " id="boton${anuncios.id}">Comentarios</button>
                            </a>
                            <br>
                            <br>
                            ${link}
                            <h6 class="mt-3 text-white float-end">${formatearFecha}</h6>
                        </div>
                    </div>
                </div>
                `;

        htmlComentariosEstructura += `
        <div id="${anuncios.id}" style="display:none; " class="w-100">
            <div class="container cajaTotalComentarios">
                <div class="row">
                    <div class="col-12">
                        <h2 class="my-3 text-center text-white">Comentarios</h2>
                    </div>
                </div>
                <div class="row cajaComentarios ${anuncios.id}">
                    
                </div>
                <div id="formulario" class="px-0 pb-1 pt-2">
                    <input type="text" class="form-control" placeholder="Enviar comentario" id="inputChat" />
                    <div class="input-group-append">
                        <button class="btn btn-success botonMandarComentario" data-id="${anuncios.id}">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
        actualizaBienComentarios(anuncios.id);
    });
    cajaIntroducirAnuncio.innerHTML = html + htmlComentariosEstructura;

    //Se inicializa el venobox
    $('.venobox').venobox();

    const listaBotonesMandarComentario = document.querySelectorAll(".botonMandarComentario");
    enviarComentario(listaBotonesMandarComentario)
}

function actualizaBienComentarios(id) {
    const referenciaComentarios = collection(db, "Anuncios/" + id + "/Comentarios");
    const consulta = query(referenciaComentarios, orderBy("fechaComentario", "desc"));
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

//Aqui se cargan los comentarios nada mas en cada div del venobox
function listaComentariosActualizados(comentarios, id) {
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
        $("." + id).html(htmlComentarios);
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

            //Aqui se pone el comentario para insertarlo en una div que tiene como clase el id del Anuncio
            $("." + id).html(htmlComentarios);
        });
    }
}

function enviarComentario(listaBotonesMandarComentario) {
    console.log(listaBotonesMandarComentario);
    listaBotonesMandarComentario.forEach(boton => {
        console.log(boton);
        //Saco el id que lleva cada uno
        /*boton.addEventListener("click", (evento) => {
            console.log(boton);
            const id = evento.target.dataset.id;
            let referenciaComentarios = collection(db, "Anuncios", id, "Comentarios");
            console.log(id);
        });*/
        boton.addEventListener('click', function () {
            self._showContent("hola");
        });
    });
}

function mantenerSesionActiva() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem("id", user.email);
            localStorage.setItem("idChat", "");
            localStorage.setItem("idChatInverso", "");
            localStorage.setItem("imagenPerfil", "");
        } else {
            // User is signed out
            location.href = "../index.html";
        }
    });
}