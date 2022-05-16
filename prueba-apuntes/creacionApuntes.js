document.addEventListener("readystatechange", cargarEventos, false);
const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
function cargarEventos() {
    document.getElementById("botonGuardar").addEventListener("click",guardarApuntes);
    tinymce.init({
        selector: 'textarea#default-editor',
        plugins: 'autoresize',
        language:'es',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
      });
}

function guardarApuntes(){
  var id=document.getElementById("idApuntes").value;
  var titulo=document.getElementById("tituloApuntes").value;
  var contenido= tinymce.get("default-editor").getContent();

  var datos=[titulo,contenido,id];
  var cadenaDatos=JSON.stringify(datos);
  var cadena='i='+cadenaDatos;
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if(this.readyState==4 && this.status==200){
      var comprobar=JSON.parse(this.responseText);
      if(isNaN(comprobar)==false){
        document.getElementById("idApuntes").value=comprobar
        alert("Todo bien pa")
      }else if(comprobar=="error"){
        alert("Error");
      }
    }
  }
  xhttp.open("POST", "comprobarApuntes.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(cadena);   
}
