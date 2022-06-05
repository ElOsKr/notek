import {
  db, onSnapshot, doc, setDoc, deleteDoc, updateDoc, getDoc
} from "./firebase.js"

document.addEventListener("readystatechange", cargarEventos, false);
const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const inputTituloApunte = document.getElementById("tituloApuntes");
function cargarEventos() {
  obtenerApuntes();
  verApunte();
  document.getElementById("botonVer").addEventListener("click", function () { location.href = "./verApuntes.php" });
  document.getElementById("botonVer").addEventListener("click",validarApuntes);
  document.getElementById("botonGuardar").addEventListener("click", validarApuntes);
  cargarTextarea();
}

function cargarTextarea() {
  tinymce.init({
    selector: 'textarea#default-editor',
    height: 500,
    language: 'es',
    toolbar: 'undo redo | styleselect | bold italic | outdent indent ',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
  });
}

async function verApunte() {
  const referenciaApunte = doc(db, "Usuarios/" + localStorage.getItem("id") + "/Apuntes", localStorage.getItem("idApunte"));
  const apunte = await getDoc(referenciaApunte);
  if(apunte.exists()) {
    $("#botonVer").prop("disabled", false);
  }
  else{
    $("#botonVer").prop("disabled", true);
  }
}

//Estaba en validar el titulo de los apuntes
async function validarApuntes() {  
  if (inputTituloApunte.value == "") {
    mostrarErrores(0, "Introduzca un título");
  }else{
    const referenciaApunte = doc(db, "Usuarios/" + localStorage.getItem("id") + "/Apuntes", inputTituloApunte.value);
    const apunte = await getDoc(referenciaApunte);
    if(apunte.exists() && localStorage.getItem("idApunte")=="") {
        mostrarErrores(0, "Este título de apunte introducido ya existe");
    }else {
        quitarErrores(0);
        guardarApuntes();
      }    
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
    const referenciaApunte = doc(db, "Usuarios", localStorage.getItem("id"), 'Apuntes', localStorage.getItem("idApunte"));
    await updateDoc(referenciaApunte, {
      fechaApunte: Date.now()
    });
    const unsub = onSnapshot(doc(db, "Usuarios", localStorage.getItem("id"), 'Apuntes', idApunte), (doc) => {
      inputTituloApunte.value = doc.data().titulo;
      tinymce.get("default-editor").setContent(doc.data().contenido);
      document.title=idApunte;
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
  await setDoc(doc(db, "Usuarios/", localStorage.getItem("id"), "/Apuntes", id), apunte);
  $("#botonVer").prop("disabled", false);
  var alerta=document.getElementById("alertaGuardado")
  $(alerta).css("display","inline-block");
  $(alerta).fadeOut(2000);
}