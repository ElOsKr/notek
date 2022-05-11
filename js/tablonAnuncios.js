import {
    db, onSnapshot,
    collection, query, orderBy
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);

const cajaIntroducirAnuncio = document.getElementsByClassName("cajaIntroducirAnuncio")[0];
const cajaIntroducirContenido = document.getElementsByClassName("cajaIntroducirContenido")[0];

function cargarEventos() {
    actualizaBienanuncioss();
}

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
                contenido: doc.data().contenido
            })
        });
        console.log(anuncios);
        listaAnunciosActualizados(anuncios);
    });
}

function listaAnunciosActualizados(anuncios) {
    let html = "";
    anuncios.forEach(anuncios => {
        let fecha = new Date(anuncios.fechaPublicado);
        let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
        html += `
                <div class="col-md-6 my-3">
                    <div class="card cajasContenido">
                        <div class="card-body ">
                            <div class="w-100 ">
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
                                <a href="#" class="float-start mt-5 text-white">Enlace descargar archivo auxiliar</a>
                                <h6 class="mt-5 text-white float-end">${formatearFecha}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    });
    cajaIntroducirAnuncio.innerHTML = html;
}