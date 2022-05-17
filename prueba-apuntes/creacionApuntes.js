document.addEventListener("readystatechange", cargarEventos, false);
const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
function cargarEventos() {
  obtenerApuntes();
  document.getElementById("botonVer").addEventListener("click",verApuntes);
  document.getElementById("regresarApuntes").addEventListener("click",function(){location.href="./inicioApuntes.php"})
  document.getElementById("botonGuardar").addEventListener("click",guardarApuntes);
  tinymce.init({
      selector: 'textarea#default-editor',
      plugins: 'autoresize',
      language:'es',
      skin: useDarkMode ? 'oxide-dark' : 'oxide',
      content_css: useDarkMode ? 'dark' : 'default',
  });
}

function verApuntes(){
  guardarApuntes();
  location.href="./verApuntes.php?id="+document.getElementById("idApuntes").value
}


function obtenerApuntes(){
  var id=document.getElementById("idApuntes").value;

  if(id!=""){
    var datos=id;
    var cadenaDatos=JSON.stringify(datos);
    var cadena='o='+cadenaDatos;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if(this.readyState==4 && this.status==200){
        var comprobar=JSON.parse(this.responseText);
        if(comprobar[0]==1){
          document.getElementById("tituloApuntes").value=comprobar[1]['title'];
          tinymce.get("default-editor").setContent(comprobar[1]['content']);
          document.getElementById("botonVer").disabled=false;
        }else{
          alert("Error");
        }
      }
    }
    xhttp.open("POST", "comprobarApuntes.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(cadena); 
  }
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
        document.getElementById("botonVer").disabled=false;
        location.href='./apuntes.php?id='+comprobar;
      }else if(comprobar=="error"){
        alert("Error");
      }
    }
  }
  xhttp.open("POST", "comprobarApuntes.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(cadena);   
}
