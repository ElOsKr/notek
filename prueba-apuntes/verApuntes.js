document.addEventListener("readystatechange", cargarEventos, false);
function cargarEventos() {
    obtenerApuntes();
    document.getElementById('botonEditar').addEventListener("click",function(){location.href="./apuntes.php?id="+document.getElementById("idApuntes").value})
    document.getElementById("regresarApuntes").addEventListener("click",function(){location.href="./inicioApuntes.php"})
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
          if(comprobar[1]!=false){
            document.getElementById("tituloApuntes").innerHTML=comprobar[1]['title'];
            document.getElementById('contenidoApuntes').innerHTML=comprobar[1]['content'];
          }else{
            location.href="./inicioApuntes.php";
          }
        }
      }
      xhttp.open("POST", "comprobarApuntes.php");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(cadena); 
    }else{
      location.href="./inicioApuntes.php";
    }
  }