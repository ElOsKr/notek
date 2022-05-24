import {
  db, onSnapshot, doc, updateDoc
} from "./firebase.js";
document.addEventListener("readystatechange", cargarEventos, false);
const botonEditar = document.getElementById('botonEditar');
const regresarApuntes = document.getElementById("regresarApuntes");
const inputTituloApunte = document.getElementById("tituloApuntes");

function cargarEventos() {
  obtenerApunte();
  botonEditar.addEventListener("click", irHaciaApunte)
  regresarApuntes.addEventListener("click", function () { location.href = "./inicioApuntes.php"; })
}

function irHaciaApunte() {
  location.href = "./apuntes.php";
}

async function obtenerApunte() {
  let idApunte = localStorage.getItem("idApunte");
  //Actualizo la fecha
  const referenciaApunte = doc(db, "Apuntes", localStorage.getItem("idApunte"));
  await updateDoc(referenciaApunte, {
    fechaApunte: Date.now()
  });
  const unsub = onSnapshot(doc(db, "Apuntes", idApunte), (doc) => {
    inputTituloApunte.innerHTML = doc.data().titulo;
    document.getElementById('contenidoApuntes').innerHTML = doc.data().contenido;
  });

}