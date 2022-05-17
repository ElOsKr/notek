document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    comprobarApuntes();
    document.getElementById("crearApuntes").addEventListener("click",function(){location.href="./apuntes.php"});
}