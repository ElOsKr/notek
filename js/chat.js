import { listaUsuariosActualizado } from "./firebase.js"
const input_buscar = document.getElementById("input_buscador");
const btn_buscar = document.getElementById("btn_Buscar");
const listaUsuarios = document.getElementById("listaUsuarios");
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    btn_buscar.addEventListener("click", filtrar);
    input_buscar.addEventListener("keyup", filtrar);

}


function filtrar() {
    listaUsuarios.innerHTML = '';
    const textoUsuario = input_buscar.value.toLowerCase();
    listaUsuariosActualizado((usuarios) => {
        //Si el usuario ha empezado a escribir
        if (input_buscar.value != "") {
            listaUsuarios.classList.add("caja_ListaUsuarios");
            usuarios.forEach((doc) => {
                //Cogemos de la coleccion el nickname del usuario
                const usuario = doc.data();
                const idUsuario = doc.data().idUsuario;
                //Si encuentra alguna coincidencia
                if (idUsuario.toLowerCase().indexOf(textoUsuario) !== -1) {
                    listaUsuarios.innerHTML += `
                    <div class="col-2 ms-3 p-3" style="display:flex; align-items:center;">
                        <img style="width:60px; height:60px; " class="" src=" ${usuario.imagenUsuario}">
                    </div>
                    <div class="col-10 row pt-3">
                        <div class="col-8 centrarBoton">
                            <h4 class="text-white"> ${idUsuario}</h4>
                            <h5 class=" mb-0">${usuario.nombre + " " + usuario.apellidos} </h5>
                        </div>
                        <div class="col-4 centrarBoton">
                            <button class="btn btn-success mt-3">Abrir Chat</button>
                        </div>
                    </div>
                    <div class="col-12">
                        <hr>
                    </div>
                `;
                }
            });
            comprobarResultadosBusqueda();
        }
        else {
            listaUsuarios.classList.remove("caja_ListaUsuarios");
        }
    });
}

function comprobarResultadosBusqueda() {
    if (listaUsuarios.innerHTML == '') {
        listaUsuarios.innerHTML += `
            <div class="col-12 row pt-3">
                    <h4 class="text-white text-center">No hay resultados</h4>
            </div>
        `;
    }
}