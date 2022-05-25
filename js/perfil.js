import {
    db, doc, onSnapshot, getStorage, ref, getDownloadURL, uploadBytes, resetContrasena, updateDoc,
    getAuth, updateProfile, onAuthStateChanged, collection, query, where, getDocs
} from "./firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);

const iconoEditar = document.getElementsByClassName("iconoEditar")[0];
const campoNickname = document.getElementsByClassName("campoNickname")[0];
const campoNombre = document.getElementsByClassName("campoNombre")[0];
const campoApellidos = document.getElementsByClassName("campoApellidos")[0];
const divsCambiar = document.getElementsByClassName("cajasCambiar")[0];
const divsCambiar2 = document.getElementsByClassName("cajasCambiar")[1];
const botonConfirmar = document.getElementById("botonConfirmar");
const imagenPerfilActual = document.getElementsByClassName("imagenPerfilActual")[0];
const nicknamePerfilActual = document.getElementsByClassName("nicknameActual")[0];
const seleccionarImagen = document.getElementById("seleccionImagen");
const btnResetearContra = document.getElementById("resetearContra");
let urlImagen = localStorage.getItem("imagenPerfil");
let urlImagenAnterior = "";

//Id usuario
const idUsuario = localStorage.getItem("id");
//Referencia al bucket de Firebase, storage (para subir archivos a Firebase)
const storage = getStorage();

function cargarEventos() {
    iconoEditar.addEventListener("click", editarPerfil);
    //Guardar cambios
    botonConfirmar.addEventListener("click", (e) => {
        let arrayFallos = comprobarFallos();
        //Si no hay algun campo que falla, que esta vacio
        if (arrayFallos.filter(x => x === true).length === 3) {
            e.preventDefault();
            guardarCambios();
            actualizarPerfil();
        }
        else {
            console.log("datos NO enviados");
        }
    });

    //Resetear Contraseña Usuario
    btnResetearContra.addEventListener("click", (e) => {
        resetContrasena(localStorage.getItem("id"));
    });

    seleccionarImagen.addEventListener("change", preseleccionarFoto);

    //Coge los datos desde el firebase del Usuario
    cargarDatosUsuario();
}

//Funcion para que pueda ver el usuario la imagen que esta seleccionando (aqui auns no se sube a Firebase)
function preseleccionarFoto() {
    let foto = seleccionarImagen.files[0];
    imagenPerfilActual.setAttribute('src', window.URL.createObjectURL(foto));
}

function cargarDatosUsuario() {
    const usuario = onSnapshot(doc(db, "Usuarios", idUsuario), (doc) => {
        urlImagenAnterior = doc.data().imagenUsuario;
        imagenPerfilActual.src = doc.data().imagenUsuario;
        nicknamePerfilActual.innerHTML = doc.data().idUsuario;
        campoApellidos.value = doc.data().apellidos;
        campoNombre.value = doc.data().nombre;
        campoNickname.value = doc.data().idUsuario;
    });
}

function editarPerfil() {
    imagenPerfilActual.classList.add('hacerHover');
    seleccionarImagen.removeAttribute('disabled');

    campoNombre.removeAttribute('disabled');
    campoNickname.removeAttribute('disabled');
    campoApellidos.removeAttribute('disabled');
    btnResetearContra.removeAttribute("disabled");

    divsCambiar.classList.remove("mt-5");
    divsCambiar.classList.add("mt-3");
    divsCambiar2.classList.remove("mt-5");
    divsCambiar2.classList.add("mt-3");

    botonConfirmar.classList.remove("d-none");
}

function guardarCambios() {
    seleccionarImagen.disabled = true;
    imagenPerfilActual.classList.remove("hacerHover");

    campoNombre.disabled = true;
    campoNickname.disabled = true;
    campoApellidos.disabled = true;
    btnResetearContra.disabled = true;

    divsCambiar.classList.add("mt-5");
    divsCambiar.classList.remove("mt-3");
    divsCambiar2.classList.add("mt-5");
    divsCambiar2.classList.add("mt-3");

    botonConfirmar.classList.add("d-none");
}

//Actualizo los campos del Usuario referenciados en Firestore
async function actualizarCampos() {
    //Aqui controlo si el usuario no selecciona nada 
    console.log("iMAGEN 1=> "+urlImagenAnterior)
    console.log("iMAGEN 2=> "+urlImagen)
    if (urlImagen == "") {
        urlImagen = urlImagenAnterior;
    }
    actualizarAnuncios();
    actualizarComentarios();
    actualizarAnunciosGrupos();
    actualizarAnunciosGruposComentarios();
    actualizarDatosChat();
    const usuarioRef = doc(db, "Usuarios", localStorage.getItem("id"));
    return updateDoc(usuarioRef, {
        idUsuario: $.trim(campoNickname.value),
        nombre: $.trim(campoNombre.value),
        apellidos: $.trim(campoApellidos.value),
        imagenUsuario: urlImagen
    });

}

//1º
async function actualizarPerfil() {
    const auth = getAuth();
    //Se coge la imagen seleccionada del usuario
    let foto = seleccionarImagen.files[0];
    //Si el usuario no ha seleccionado nada, se le pone la imagen de Perfil que tenia
    if (foto == null) {
        actualizar(auth);
    }
    else {
        //Crear la referencia donde quiero que se guarde la foto 
        let storageRef = ref(storage, 'ImagenesPerfilUsuario/' + idUsuario + "/" + idUsuario);
        let cambiarImage = cambiarImagenDatos(storageRef, foto, auth);
    }

}
//Funcion para subir la imagen a Firebase Storage
function cambiarImagenDatos(storageRef, foto, auth) {
    //Se sube a Firebase 
    return uploadBytes(storageRef, foto).then(() => {
        //Si se subio correctamente se coge la url de la imagen subida y se la pone a la imagen
        getDownloadURL(storageRef)
            .then((url) => {
                urlImagen = url;
                imagenPerfilActual.setAttribute('src', urlImagen);
                actualizar(auth);
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

//Funcion para que cuando se haya subido la imagen se pueda luego actualizar
function actualizar(auth) {
    //Pongo el onAuthStateChanged para por asi decirlo recordar a Firebase los datos del actual usuario conectado sino sale null
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            Swal.fire({
                icon: "success",
                title: "Cambios Guardados",
                text: "Los datos se actualizaron correctamente",
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
            //Actualizo la foto actual
            await updateProfile(auth.currentUser, {
                displayName: $.trim(campoNickname.value),
                photoURL: urlImagen
            }).then(async () => {
                //Actualizo los campos de Firebase Firestore
                await actualizarCampos(user.photoURL);
                localStorage.setItem("idNickname", $.trim(campoNickname.value))
            });
        }
    });
}

function actualizarAnuncios() {
    //Actualiza todas las referencias del usuario en los anuncios
    const consultaAnuncios = query(collection(db, "Anuncios"), where("correoUsuario", "==", localStorage.getItem("id")));
    const unsubscribe = onSnapshot(consultaAnuncios, (querySnapshot) => {
        querySnapshot.forEach((docu) => {
            let refAnuncio = doc(db, "Anuncios", docu.id);
            updateDoc(refAnuncio, {
                idUsuario: $.trim(campoNickname.value),
                imagenUsuario: urlImagen
            });
        });
    });
}

//Actualizo todas las referencias de los comentarios de los usuarios
function actualizarComentarios() {
    const consultaAnuncios = query(collection(db, "Anuncios"));
    const unsubscribe = onSnapshot(consultaAnuncios, (querySnapshot) => {
        querySnapshot.forEach((docu) => {
            let consultaComentarios = query(collection(db, "Anuncios/" + docu.id + "/Comentarios"), where("correoUsuario", "==", localStorage.getItem("id")));
            let idAnuncio = docu.id;
            const unsubscribe2 = onSnapshot(consultaComentarios, (querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    let refComentario = doc(db, "Anuncios/" + idAnuncio + "/Comentarios", docu.id);
                    updateDoc(refComentario, {
                        idUsuario: $.trim(campoNickname.value),
                        imagenUsuario: urlImagen
                    });
                });
            });
        });
    });
}

//Actualizar todas las referencias que hay del usuario actual en cada anuncio hecho por el en cada grupo de la base de datos
function actualizarAnunciosGrupos() {
    const consultaGrupos = query(collection(db, "Grupos"));
    const unsubscribe = onSnapshot(consultaGrupos, (querySnapshot) => {
        querySnapshot.forEach((docu) => {
            let consultaAnunciosGrupos = query(collection(db, "Grupos/" + docu.id + "/Anuncios"), where("correoUsuario", "==", localStorage.getItem("id")));
            let idGrupo = docu.id;
            const unsubscribe2 = onSnapshot(consultaAnunciosGrupos, (querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    let refAnuncio = doc(db, "Grupos/" + idGrupo + "/Anuncios", docu.id);
                    updateDoc(refAnuncio, {
                        idUsuario: $.trim(campoNickname.value),
                        imagenUsuario: urlImagen
                    });
                });
            });
        });
    });
}

function actualizarAnunciosGruposComentarios() {
    const consultaGrupos = query(collection(db, "Grupos"));
    const unsubscribe = onSnapshot(consultaGrupos, (querySnapshot) => {
        querySnapshot.forEach((docu) => {
            let consultaAnunciosGrupos = query(collection(db, "Grupos/" + docu.id + "/Anuncios"));
            let idGrupo = docu.id;
            const unsubscribe2 = onSnapshot(consultaAnunciosGrupos, (querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    let idAnuncio = docu.id;
                    let consultaComentariosGrupos = query(collection(db, "Grupos/" + idGrupo + "/Anuncios/" + idAnuncio + "/Comentarios"), where("correoUsuario", "==", localStorage.getItem("id")));
                    const unsubscribe3 = onSnapshot(consultaComentariosGrupos, (querySnapshot) => {
                        querySnapshot.forEach((docum) => {
                            let refComentario = doc(db, "Grupos/" + idGrupo + "/Anuncios/" + idAnuncio + "/Comentarios/", docum.id);
                            updateDoc(refComentario, {
                                idUsuario: $.trim(campoNickname.value),
                                imagenUsuario: urlImagen
                            });
                        });
                    });

                });
            });
        });
    });
}

function actualizarDatosChat() {
    let consultaUsuarios = query(collection(db, "Usuarios"));
    const unsubscribe = onSnapshot(consultaUsuarios, (querySnapshot) => {
        querySnapshot.forEach((docu) => {
            let consultaChats = query(collection(db, "Usuarios/" + docu.id + "/Chats"), where("correoUsuario", "==", localStorage.getItem("id")));
            let idUsuario = docu.id;
            const unsubscribe2 = onSnapshot(consultaChats, (querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    let refChat = doc(db, "Usuarios/" + idUsuario + "/Chats", docu.id);
                    updateDoc(refChat, {
                        idNombre: $.trim(campoNickname.value),
                        imagenUsuario: urlImagen
                    });
                });
            });
        });
    });
}


function validarCampos() {
    let arrayErrores = [];
    if ($.trim(campoNickname.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(0, "Introduzca un nickname");
        cambiarEstilosCajas();
    } else
        arrayErrores.push(true);

    if ($.trim(campoNombre.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(1, "Introduzca un nombre");
        cambiarEstilosCajas();
    } else
        arrayErrores.push(true);

    if ($.trim(campoApellidos.value) == "") {
        arrayErrores.push(false);
        mostrarErrores(2, "Introduzca unos apellidos");
        botonConfirmar.classList.add("mb-1");
    } else
        arrayErrores.push(true);

    return arrayErrores;
}

function comprobarFallos() {
    let arrayErrores = validarCampos();
    for (let i = 0; i < arrayErrores.length; i++) {
        //Si el elemento es true se quitan los errores
        if (arrayErrores[i] == true) {
            quitarErrores(i);
        } else {
            console.log("Fallo " + i + " " + arrayErrores[i]);
        }
    }
    return arrayErrores;
}

function quitarErrores(indice) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = "";
    error.style.display = "none";
}

function mostrarErrores(indice, advertencia) {
    let error = document.getElementsByClassName("errores")[indice];
    error.innerText = advertencia;
    error.style.display = "block";
}

function cambiarEstilosCajas() {
    divsCambiar.classList.remove("mt-3");
    divsCambiar.classList.add("mt-1");
    divsCambiar2.classList.remove("mt-3");
    divsCambiar2.classList.add("mt-1");
}