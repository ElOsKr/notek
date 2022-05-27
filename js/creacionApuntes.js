import {
  db, onSnapshot, doc, setDoc, deleteDoc, updateDoc
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);
const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const inputTituloApunte = document.getElementById("tituloApuntes");
function cargarEventos() {
  obtenerApuntes();
  document.getElementById("botonVer").addEventListener("click", verApuntes);
  document.getElementById("regresarApuntes").addEventListener("click", function () { location.href = "./inicioApuntes.php" })
  document.getElementById("botonGuardar").addEventListener("click", guardarApuntes);
  cargarTextarea();
}

function cargarTextarea() {
  tinymce.init({
    selector: 'textarea#default-editor',
    plugins: 'autoresize',
    language: 'es',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
  });
}

//Estaba en validar el titulo de los apuntes
async function verApuntes() {
  if (inputTituloApunte.value == "") {
    mostrarErrores(0, "Introduzca un título");
  }
  else {
    quitarErrores(0);
    guardarApuntes();
    location.href = "./verApuntes.php";
  }

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

async function obtenerApuntes() {
  //Aqui va a dar un error momentaneo ya que en el momento que borro el archivo va a decirte Firebase que no existe,
  //Pero la cosa es que como creo a su vez otro documento enseguida pues el usuario no ve el error 
  let idApunte = localStorage.getItem("idApunte");
  if (idApunte != "") {
    const referenciaApunte = doc(db, "Usuarios", localStorage.getItem("id"),'Apuntes',localStorage.getItem("idApunte"));
    await updateDoc(referenciaApunte, {
      fechaApunte: Date.now()
    });
    const unsub = onSnapshot(doc(db, "Usuarios",localStorage.getItem("id"),'Apuntes', idApunte), (doc) => {
      inputTituloApunte.value = doc.data().titulo;
      tinymce.get("default-editor").setContent(doc.data().contenido);
    });
  }
}

async function guardarApuntes() {
  let id = localStorage.getItem("idApunte");
  let titulo = inputTituloApunte.value;
  let contenido = tinymce.get("default-editor").getContent();

  if (id == "") {
    localStorage.setItem("idApunte", titulo);
    id = localStorage.getItem("idApunte");
  }
  if (id != titulo) {
    await deleteDoc(doc(db, "Usuarios",localStorage.getItem("id"),'Apuntes', id));
    id = localStorage.getItem("idApunte");
  }
  const apunte = {
    id: id,
    titulo: titulo,
    fechaApunte: Date.now(),
    contenido: contenido,
    usuario: localStorage.getItem("id")
  }
  //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos
  await setDoc(doc(db, "Usuarios",localStorage.getItem("id"),"Apuntes", id), apunte);
  $("#botonVer").prop("disabled", false);
}