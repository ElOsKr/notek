document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    comprobarApuntes();
    document.getElementById("crearApuntes").addEventListener("click",function(){location.href="./apuntes.php"});
}

function comprobarApuntes(){
    var cadena='x=1';
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if(this.readyState==4 && this.status==200){
        var comprobar=JSON.parse(this.responseText);
        if(comprobar[0]==1){
            if(comprobar[1]!=""){
                var html="";
                comprobar[1].forEach(apunte=>{
                    html +=`
                    <p>${apunte["title"]} <a href='apuntes.php?id=${apunte["id"]}' class="text-light">Editar</a> <a href='verApuntes.php?id=${apunte["id"]}' class="text-light">Ver</a><p>
                    `;
                })
                document.getElementById("content").innerHTML=html;
            }else{
                $('#titulo').html("Parece que todavía no hay nada por aquí~~");
            }
        }else{
          alert("Error");
        }
      }
    }
    xhttp.open("POST", "comprobarApuntes.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(cadena);    
}