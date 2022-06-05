import {
  db, onSnapshot, doc, updateDoc
} from "./firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);
const inputTituloApunte = document.getElementById("tituloApuntes");
const botonDescargar = document.getElementById("botonDescargar");

function cargarEventos() {
  obtenerApunte();
  botonDescargar.addEventListener("click", guardarPdf)
}
function guardarPdf(){
  var pdf = new jsPDF({format:'a4'});
  for(var i=0;i<document.getElementsByTagName("p").length;i++){
    if(document.getElementsByTagName("p")[i].innerHTML=="&nbsp;"){
      $(document.getElementsByTagName("p")[i]).replaceWith("<br/>");
    }
  }
  var specialElementHandlers = {
    '#contenidoApuntes': function (element, renderer) {
        return true;
    },    
};
pdf.fromHTML($("#contenidoApuntes").html(), 10, 10, {
  'width': 170,
  'elementHandlers': specialElementHandlers
});
pdf.save(document.getElementById("tituloApuntes").innerHTML+'.pdf');
}

async function obtenerApunte() {
  let idApunte = localStorage.getItem("idApunte");
  const unsub = onSnapshot(doc(db, "Usuarios",localStorage.getItem("id"),'Apuntes', idApunte), (doc) => {
    inputTituloApunte.innerHTML = doc.data().titulo;
    document.getElementById('contenidoApuntes').innerHTML += doc.data().contenido;
    document.title=idApunte;
  });

}