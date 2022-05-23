import {
    db, getAuth, onSnapshot, collection, query, orderBy, doc, getDoc, setDoc, listaUsuariosActualizado,
    where, enviarComentario, actualizaBienComentarios
} from "./firebase.js"
document.addEventListener("readystatechange", cargarEventos, false);
const inputTituloGrupo = document.getElementById("tituloGrupo");
const usuarioGrupo = document.getElementById("usuarioGrupo");
const cajaListaGrupo = document.getElementById("cajaListaGrupo");
const miembrosGrupo = document.getElementsByClassName("miembrosGrupo")[0];
const listaUsuarios = document.getElementsByClassName("listaUsuarios")[0];
const cajaTotal = document.getElementsByClassName("cajaTotal")[1];
const inputComentario = document.getElementsByClassName("inputComentario");
let arrayUsuarios = [];
let ordenacion = "asc";
let campo = "tituloBusqueda";
let idGrupoSeleccionado = localStorage.getItem("idGrupo");

function cargarEventos() {
    $("#crearGrupo").click(validarGrupo);

    usuarioGrupo.addEventListener("keyup", buscarUsuarios);
    actualizaBienGrupos();

    $("#fechaDescendente").click(cambiarOrdenFechaDescendente);
    $("#fechaAscendente").click(cambiarOrdenFechaAscendente);
    $("#tituloAscendente").click(cambiarOrdenTituloAscendente);
    $("#tituloDescendente").click(cambiarOrdenTituloDescendente);
}

function cambiarOrdenFechaDescendente() {
    campo = "fechaCreacionGrupo";
    ordenacion = "desc";
    actualizaBienGrupos();
}

function cambiarOrdenFechaAscendente() {
    campo = "fechaCreacionGrupo";
    ordenacion = "asc";
    actualizaBienGrupos();
}

function cambiarOrdenTituloAscendente() {
    campo = "tituloBusqueda";
    ordenacion = "asc";
    actualizaBienGrupos();
}

function cambiarOrdenTituloDescendente() {
    campo = "tituloBusqueda";
    ordenacion = "desc";
    actualizaBienGrupos();
}


function actualizaBienGrupos() {
    const referenciaGrupos = collection(db, "Grupos");
    //Consulta que se encarga de saber en cuantos grupos se encuentra el actual usuario
    //Se fija esta consulta en el campo miembrosGrupo que es un array con los id de los miembros que pertenecen a ese grupo
    //Para realizar esta doble consulta se deben crear indices en firebase
    const consulta = query(referenciaGrupos, where("miembrosGrupo", "array-contains-any", [localStorage.getItem("id")]), orderBy(campo, ordenacion));
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
        const grupos = [];
        querySnapshot.forEach((doc) => {
            grupos.push({
                id: doc.id,
                fechaCreacionGrupo: doc.data().fechaCreacionGrupo,
                titulo: doc.data().titulo,
                miembrosGrupo: doc.data().miembrosGrupo,
            });
        });
        listaGruposActualizados(grupos);
    });
}

function listaGruposActualizados(grupos) {
    let html = "";
    grupos.forEach(grupo => {
        let fecha = new Date(grupo.fechaCreacionGrupo);
        let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
        html += `
            <a href="#${grupo.titulo}"  data-id="${grupo.id}" class="list-group-item list-group-item-action grupoLista" aria-current="true">
            ${grupo.titulo}
            <span class="float-end">${formatearFecha}</span>
            </a>
            
        `;
    });
    cajaListaGrupo.innerHTML = html;
    //Selecciono todos los elementos del html que tengan esa clase
    const listaGrupos = document.querySelectorAll(".grupoLista");
    seleccionarGrupo(listaGrupos);
}


async function validarGrupo() {
    //El id se compone por el usuario fundador y luego el titulo
    const tituloIdGrupo = localStorage.getItem("id") + " " + $.trim(inputTituloGrupo.value);
    //Se va a la referencia del porpio usuario en la subcoleccion de grupos
    const referenciaGrupos = doc(db, "Grupos/", tituloIdGrupo);
    const grupo = await getDoc(referenciaGrupos);
    //Si el usuario introduce algun contenido
    if ($.trim(inputTituloGrupo.value) != "") {
        //Si ya existe algun grupo con ese nombre 
        if (grupo.exists()) {
            mostrarErrores(0, "El titulo introducido ya existe");
        }
        else {
            quitarErrores(0);
            let arrayMiembroSeleccionados = [];
            //Primero siempre inserto un usuario
            arrayMiembroSeleccionados.push(localStorage.getItem("id"));

            for (let i = 0; i < arrayUsuarios.length; i++) {
                const usuarioSeleccionado = arrayUsuarios[i].split(" ");
                //Selecciono solo el correo que funciona como id del usuario
                arrayMiembroSeleccionados.push(usuarioSeleccionado[0]);
            }

            if (arrayMiembroSeleccionados.length > 1) {
                //Si no hay fallos se crea el grupo correctamente
                const grupoPropio = {
                    titulo: $.trim(inputTituloGrupo.value),
                    tituloBusqueda: $.trim(inputTituloGrupo.value.toLowerCase()),
                    fechaCreacionGrupo: Date.now(),
                    miembrosGrupo: arrayMiembroSeleccionados
                };

                //Se crea una subcoleccion de Grupos 
                await setDoc(doc(db, "/Grupos", tituloIdGrupo), grupoPropio);

                restablecerInterfaz();
            }
            else {
                mostrarErrores(1, "Tiene que añadir algún usuario al grupo");
            }
        }
    }
    else {
        mostrarErrores(0, "Introduzca algún título");
    }
}

function restablecerInterfaz() {
    quitarErrores(1);
    usuarioGrupo.value = "";
    inputTituloGrupo.value = "";
    //Oculto el modal de bootstrap
    const modalSeleccionado = document.querySelector('#panelCrearGrupo');
    const modal = bootstrap.Modal.getInstance(modalSeleccionado);
    modal.hide();
}

function buscarUsuarios() {
    const auth = getAuth();
    listaUsuarios.innerHTML = '';
    const textoUsuario = $.trim(usuarioGrupo.value).toLowerCase();
    listaUsuariosActualizado((usuarios) => {
        if (textoUsuario != "") {
            listaUsuarios.classList.add("caja_ListaUsuarios");

            usuarios.forEach((doc) => {
                const usuario = doc.data();
                const idUsuario = doc.data().idUsuario;
                //Si hay algua coincidencia 
                if (idUsuario.toLowerCase().indexOf(textoUsuario) !== -1) {
                    //Esto evita que se encuentre el usuario actual a si mismo en la lista
                    if (idUsuario != auth.currentUser.displayName) {
                        listaUsuarios.innerHTML += `
                        <div class="container">
                            <div class="row " >
                                <div class="col-3 ms-3 p-3" style="display:flex; align-items:center;">
                                    <img style="width:60px; height:60px; " class="" src=" ${usuario.imagenUsuario}">
                                </div>
                                <div class="col-9 row pt-3">
                                    <div class="col-8 centrarBoton">
                                        <h4 class="text-white">${idUsuario}</h4>
                                        <h5 class=" mb-0">${usuario.nombre + " " + usuario.apellidos}</h5>
                                    </div>
                                    <div class="col-4 centrarBoton">
                                        <button class="btn btn-info text-white mt-3 aniadirMiembro" data-id="${doc.id + " " + idUsuario + " " + usuario.imagenUsuario + " " + usuario.nombre + " " + usuario.apellidos}">Añadir</button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <hr>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                }
            });
            comprobarResultadosBusqueda();
            //Selecciono todos los elementos del html que tengan esa clase
            const listaBotonesAniadirMiembro = listaUsuarios.querySelectorAll(".aniadirMiembro");
            aniadirMiembro(listaBotonesAniadirMiembro);
        }
        else {
            listaUsuarios.classList.remove("caja_ListaUsuarios");
        }
    });
}

function aniadirMiembro(listaBotonesAniadirMiembro) {
    //Recorro todos los botones seleccionados
    listaBotonesAniadirMiembro.forEach(boton => {
        //Saco el id que lleva cada uno
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.target.dataset.id;
            if (arrayUsuarios.length > 0) {
                if (!encontrarMiembro(idBoton)) {
                    arrayUsuarios.push(idBoton);
                }
            }
            else {
                arrayUsuarios.push(idBoton);
            }

            recorrerArrayUsuariosAniadidos();
        });
    });
}

function borrarMiembro(listaBotonesBorrarMiembro) {
    listaBotonesBorrarMiembro.forEach(boton => {
        //Saco el id que lleva cada uno
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.target.dataset.id;
            eliminar(arrayUsuarios, idBoton);
            recorrerArrayUsuariosAniadidos();
        });
    });
}

function eliminar(array, contenido) {
    var i = array.indexOf(contenido);

    if (i !== -1) {
        array.splice(i, 1);
    }
}

//Funcion que se encarga de evitar usuarios duplicados a la hora de crear el grupo
function encontrarMiembro(usuarioSeleccionado) {
    let activador = false;
    let i = 0;
    do {
        //Si ya esta en la lista de usuarios
        if (arrayUsuarios[i] == usuarioSeleccionado) {
            activador = true;
            return activador;
        }
        i++;
    } while (arrayUsuarios.length != i);

    return activador;
}

//Imprime por pantalla los usuarios elegidos
function recorrerArrayUsuariosAniadidos() {
    miembrosGrupo.innerHTML = "";
    for (let i = 0; i < arrayUsuarios.length; i++) {
        const usuarioSeleccionado = arrayUsuarios[i].split(" ");
        miembrosGrupo.innerHTML += `
        <div class="container">
            <div class="row ">
                <div class="col-3 ms-3 p-3" style="display:flex; align-items:center;">
                    <img style="width:60px; height:60px; " class="" src=" ${usuarioSeleccionado[2]}">
                </div>
                <div class="col-9 row pt-3">
                    <div class="col-8 centrarBoton">
                        <h4 class="text-white">${usuarioSeleccionado[1]}</h4>
                        <h5 class=" mb-0">${usuarioSeleccionado[3] + " " + usuarioSeleccionado[4]}</h5>
                    </div>
                    <div class="col-4 centrarBoton">
                        <button class="btn btn-danger text-white mt-3 borrarMiembro" data-id="${usuarioSeleccionado[0] + " " + usuarioSeleccionado[1] + " " + usuarioSeleccionado[2] + " " + usuarioSeleccionado[3] + " " + usuarioSeleccionado[4]}">Borrar</button>
                    </div>
                </div>
                <div class="col-12">
                    <hr>
                </div>
            </div>
        </div>
        `;
    }
    const listaBotonesBorrarMiembro = miembrosGrupo.querySelectorAll(".borrarMiembro");
    borrarMiembro(listaBotonesBorrarMiembro);
}

function comprobarResultadosBusqueda() {
    if (listaUsuarios.innerHTML == '') {
        listaUsuarios.innerHTML += `
        <div class="container">
            <div class="row">
                <div class="col-12 row pt-3">
                    <h4 class="text-white text-center">No hay resultados</h4>
                </div>
            </div>
        </div>
        `;
    }
}

function mostrarErrores(indice, advertencia) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = advertencia;
    error.style.display = "block";
}

function quitarErrores(indice) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = "";
    error.style.display = "none";
}

function seleccionarGrupo(listaGrupos) {
    //Recorro todos los botones seleccionados
    listaGrupos.forEach(grupo => {
        //Saco el id que lleva cada uno
        grupo.addEventListener("click", (evento) => {
            mostrarTituloGrupo(evento.target.dataset.id);
        });
    });
}

//De primeras pongo el titulo en el html
function mostrarTituloGrupo(idGrupo) {
    //Guardo el id en el localStorage por si el usuario quiere crear un anuncio
    localStorage.setItem("idGrupo", idGrupo);
    $("#cajaAnuncios").removeAttr("style");
    $("#btn-flotante").removeAttr("style");
    let datosGrupo = idGrupo.split(" ");
    let cadenaTitulo = "";
    //Si el titulo esta con espacios aqui formateo el titulo
    formatearTitulo();
    cajaTotal.innerHTML = "";
    cajaTotal.innerHTML += `
        <div class="row">
            <div class="col px-4 py-5 tituloGrupo">
                <h1 class="text-center text-white" data-id="${idGrupo}">${$.trim(cadenaTitulo)}</h1>
            </div>
        </div>
        <div class="row text-white cajaIntroducirAnuncio" id="${$.trim(cadenaTitulo)}">
        </div>
    `;

    function formatearTitulo() {
        if (datosGrupo.length > 2) {
            for (let i = 1; i < datosGrupo.length; i++) {
                cadenaTitulo += datosGrupo[i] + " ";
            }
        }
        if (cadenaTitulo == "") {
            cadenaTitulo = datosGrupo[1];
        }
    }

    cargarAnuncios(idGrupo);
}

//Funcion para evitar que cuando se actualice se bugee visualmente
function cargarAnuncios(idGrupo) {
    const referenciaGruposAnuncios = collection(db, "Grupos/" + idGrupo + "/Anuncios");
    const consulta = query(referenciaGruposAnuncios, orderBy("fechaPublicado", "desc"));
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

//Funcion que se encarga de actualizarlo a tiempo real
function listaAnunciosActualizados(anuncios) {
    const cajaIntroducirAnuncio = document.getElementsByClassName("cajaIntroducirAnuncio")[0];
    let htmlComentariosEstructura = "";
    cajaIntroducirAnuncio.innerHTML = "";
    //Si hay anuncios en la subcoleccion
    if (anuncios.length > 0) {
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

            cajaIntroducirAnuncio.innerHTML += `
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
        });
        cajaIntroducirAnuncio.innerHTML += htmlComentariosEstructura;
    }
    else {
        cajaIntroducirAnuncio.innerHTML += `
        <div class="col px-4 py-5" id>
            <h2 class="text-center text-white">No hay anuncios disponibles</h2>
        </div>
        `;
    }
    const listaBotonesMandarComentario = document.querySelectorAll(".botonMandarComentario");
    enviarComentario(listaBotonesMandarComentario, inputComentario);
}




