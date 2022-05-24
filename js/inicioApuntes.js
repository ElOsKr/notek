import { doc, db, onSnapshot, collection, query, where, orderBy } from "./firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);
const cajaApuntes = document.getElementById("cajaApuntes");
function cargarEventos() {
  //comprobarApuntes();
  document.getElementById("crearApuntes").addEventListener("click", crearApunte);
  actualizaBienApuntes();
}

function crearApunte() {
  localStorage.setItem("idApunte", "");
  location.href = "./apuntes.php";
}

function actualizaBienApuntes() {
  const referenciaApuntes = collection(db, "Apuntes");
  //Consulta que se encarga de saber en cuantos grupos se encuentra el actual usuario
  //Se fija esta consulta en el campo miembrosGrupo que es un array con los id de los miembros que pertenecen a ese grupo
  //Para realizar esta doble consulta se deben crear indices en firebase
  const consulta = query(referenciaApuntes, where("usuario", "==", localStorage.getItem("id")), orderBy("fechaApunte", "desc"));
  const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
    const apuntes = [];
    querySnapshot.forEach((doc) => {
      apuntes.push({
        id: doc.id,
        fechaApunte: doc.data().fechaApunte,
        titulo: doc.data().titulo,
        usuario: doc.data().usuario,
        contenido: doc.data().contenido
      });
    });
    actualizarApuntes(apuntes);
  });
}

function actualizarApuntes(apuntes) {
  cajaApuntes.innerHTML = "";
  let html = "";
  apuntes.forEach(apunte => {
    let fecha = new Date(apunte.fechaApunte);
    let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
    html += `
            <div data-id="${apunte.id}" class="list-group-item list-group-item-action apuntesLista pt-3" aria-current="true">
            ${apunte.titulo}
            <span class="float-end pb-1 fechaGrupo d-flex"><button type="button" class="btn btn-outline-info me-5 btn-sm px-3 apuntesVistaVer" data-id="${apunte.id}">Ver</button>${formatearFecha}</span>
            </div>
        `;
  });
  cajaApuntes.innerHTML = html;
  //Selecciono todos los elementos del html que tengan esa clase
  const listaApuntes = document.querySelectorAll(".apuntesLista");
  const listaApuntesVer = document.querySelectorAll(".apuntesVistaVer");
  seleccionarGrupo(listaApuntes, listaApuntesVer);
}

function seleccionarGrupo(listaApuntes, listaApuntesVer) {
  //Recorro todos los botones seleccionados
  listaApuntes.forEach(apunte => {
    //Lista de botones para solo editar el apunte
    apunte.addEventListener("click", async (evento) => {
      console.log(evento.target.dataset.id);
      localStorage.setItem("idApunte", evento.target.dataset.id);
      location.href = "apuntes.php";
    }, true);
  });
  //Lista de botones para solo ver el apunte
  listaApuntesVer.forEach(apunte => {
    //Saco el id que lleva cada uno
    apunte.addEventListener("click", async (evento) => {
      console.log(evento.target.dataset.id);
      localStorage.setItem("idApunte", evento.target.dataset.id);
      location.href = "verApuntes.php";
    }, true);
  });
}