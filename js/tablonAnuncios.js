import {
    db, onSnapshot,
    collection, query, orderBy, getAuth, onAuthStateChanged
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const cajaIntroducirAnuncio = document.getElementsByClassName("cajaIntroducirAnuncio")[0];
const cajaIntroducirContenido = document.getElementsByClassName("cajaIntroducirContenido")[0];

function cargarEventos() {
    actualizaBienanuncioss();
    mantenerSesionActiva();
}

//Esta funcion evita que haya repeticiones a la hora de que detecte cambios en firebase
function actualizaBienanuncioss() {
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
    let htmlComentarios = "";
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

        htmlComentarios += `
        <div id="${anuncios.id}" style="display:none; " class="w-100">
            <div class="container cajaTotalComentarios">
                <div class="row">
                    <div class="col-12">
                        <h2 class="my-3 text-center text-white">Comentarios</h2>
                    </div>
                </div>
                <div class="row cajaComentarios">
                    <div class="col-12 py-2 px-2">
                        <div data-id="" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                            <div class="texto text-white" data-id="">
                                <img data-id="" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                                <h4 class="text-md-start" data-id="">Davman15</h4>
                                <p class=" ultimoMensaje text-md-start" data-id="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                                <span class="tiempo text-md-end float-end" data-id="">16/5/2022 17:25</span>
                                <br>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 py-2 px-2">
                        <div data-id="" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                            <img data-id="" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                            <div class="texto text-white" data-id="">
                                <h4 class="text-md-start" data-id="">Davman15</h4>
                                <p class=" ultimoMensaje text-md-start" data-id="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                                <span class="tiempo text-md-end float-end" data-id="">16/5/2022 17:25</span>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="formulario" class="px-0 pb-1 pt-2">
                    <input type="text" class="form-control" placeholder="Enviar comentario" id="inputChat" />
                    <div class="input-group-append">
                        <button class="btn btn-success" type="submit">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    actualizaBienComentarios(anuncios.id);
    });
    cajaIntroducirAnuncio.innerHTML = html + htmlComentarios;
    //Se inicializa el venobox
    $('.venobox').venobox();
}

function actualizaBienComentarios(id) {
    const referenciaComentarios = collection(db, "Anuncios/"+id+"/Comentarios");
    const consulta = query(referenciaComentarios, orderBy("fechaComentario", "desc"));
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
        const comentarios = [];
        querySnapshot.forEach((doc) => {
            comentarios.push({
                id: doc.id,
                idUsuario: doc.data().idUsuario,
                fechaComentario: doc.data().fechaComentario,
                imagenUsuario: doc.data().imagenUsuario,
                contenido: doc.data().contenido
            })
        });
        listaComentariosActualizados(comentarios);
    });
}

function listaComentariosActualizados(comentarios) {
    let htmlComentarios = "";
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