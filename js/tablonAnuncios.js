import {
    db, onSnapshot,
    collection, query,where, orderBy, addDoc, mantenerSesionActiva, listaComentariosActualizados
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const cajaIntroducirAnuncio = document.getElementsByClassName("cajaIntroducirAnuncio")[0];
const inputComentario = document.getElementsByClassName("inputComentario");
const cajaComentarios = document.getElementsByClassName("cajaComentarios");
function cargarEventos() {
    document.getElementById("btn-selectMio").addEventListener("click",function(){actualizaBienAnuncios("mio")});
    document.getElementById("btn-selectTodos").addEventListener("click",function(){actualizaBienAnuncios()});
    actualizaBienAnuncios();
    mantenerSesionActiva();
}

//Esta funcion evita que haya repeticiones a la hora de que detecte cambios en firebase
function actualizaBienAnuncios(filtro="todos") {
    var consulta;
    const referenciaAnuncios = collection(db, "Anuncios");
    if(filtro=="todos"){
        consulta = query(referenciaAnuncios, orderBy("fechaPublicado", "desc"));
    }else{
        consulta = query(referenciaAnuncios, where("correoUsuario", "==", localStorage.getItem("id")));
    }
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
        listaAnunciosActualizados(anuncios);
    });
}

function listaAnunciosActualizados(anuncios) {
    let html = "";
    let htmlComentariosEstructura = "";
    if(anuncios.length==0){
        html="<h2 class='text-center'>No hay anuncios</h2>";
        cajaIntroducirAnuncio.innerHTML=html
    }else{
        anuncios.forEach(anuncios => {
            let contador = 0;
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
                                    <button class="btn btn-secondary my-2 text-white float-start " data-bs-toggle="modal" data-bs-target="#boton${anuncios.id}" id="${anuncios.id}">Comentarios</button>
                                <br>
                                <br>
                                ${link}
                                <h6 class="mt-3 text-white float-end">${formatearFecha}</h6>
                            </div>
                        </div>
                    </div>
                    `;
            //Se pone en boton+id para poder linkear el modal con cada boton
            //Se pone cajaComentarios+id para poder saber donde se meteran los comentarios mediante innerHTML
            //Se pone data-id=id para poder identificar cada boton y asi es mas facil de introducir en Firebase
            htmlComentariosEstructura += `
                <div class="modal fade " id="boton${anuncios.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content" style="background-color: #222831;">
                            <div class="modal-body">
                                <div class="container cajaTotalComentarios">
                                    <div class="row">
                                        <div class="col-12">
                                            <h2 class="my-3 text-center text-white">Comentarios</h2>
                                        </div>
                                    </div>
                                    <div class="row cajaComentarios cajaComentarios${anuncios.id}">

                                    </div>
                                    <div id="formulario" class="px-0 pb-1 pt-2">
                                        <input type="text" class="form-control inputComentario" placeholder="Enviar comentario" />
                                        <div class="input-group-append px-1">
                                            <button class="btn btn-success botonMandarComentario" data-id="${anuncios.id}">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
            //Aqui recoge los comentarios de cada anuncio
            actualizaBienComentarios(anuncios.id);
            /*Esto baja el scroll automaticamente sin que lo tenga que hacer el usuario*/
            $(".cajaComentarios" + anuncios.id).each(function () { this.scrollTop = this.scrollHeight; });
                //Recorro los anuncios

            cajaIntroducirAnuncio.innerHTML = html + htmlComentariosEstructura;
            //Saco una lista de elementos (en este caso botones) que tengan la clase botonMandarComentario 
            const listaBotonesMandarComentario = document.querySelectorAll(".botonMandarComentario");
            enviarComentario(listaBotonesMandarComentario);
        });        
    }
}

function actualizaBienComentarios(id) {
    const referenciaComentarios = collection(db, "Anuncios/" + id + "/Comentarios");
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

//Asignar un evento a cada boton para añadir un comentario en la subcoleccion correspondiente
function enviarComentario(listaBotonesMandarComentario) {
    //Recorro la lista de Botones 
    for (let i = 0; i < listaBotonesMandarComentario.length; i++) {
        //Aqui le añado un evento a cada boton
        listaBotonesMandarComentario[i].addEventListener("click", async (evento) => {
            //Recojo la referencia del id del Anuncio
            const id = evento.target.dataset.id;
            //Si en el input correspondiente hay caracteres quitandole los espacios
            if ($.trim(inputComentario[i].value) != "") {
                //Hago la referencia en Firebase para situarme en la subcoleccion de Comentarios y añadirlo a Firebase
                let referenciaComentarios = await addDoc(collection(db, "Anuncios", id, "Comentarios"), {
                    idUsuario: localStorage.getItem("idNickname"),
                    correoUsuario:localStorage.getItem("id"),
                    fechaComentario: Date.now(),
                    imagenUsuario: localStorage.getItem("imagenPerfil"),
                    contenido: inputComentario[i].value
                });
                inputComentario[i].value = "";
            }
        });
    }
}