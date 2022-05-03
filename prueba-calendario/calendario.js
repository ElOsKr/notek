document.addEventListener('DOMContentLoaded', function () {
  //cargarEventos();
  document.getElementById('aniadirFechas').addEventListener('click',guardarEvento);
  var myModal = new bootstrap.Modal(document.getElementById('modalCalendario'))
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locales: 'es',
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "dayGridMonth timeGridWeek timeGridDay listWeek",
    },
    events:'index.html/calendario.php?r=1',
    buttonText:{
      today:'Hoy',
      month:'Mes',
      week:'Semana',
      day: 'Dia',
      list:'Lista'
    } , 
    dateClick: function (datos) {
      document.getElementById("fechaInicio").value = datos.dateStr;
      document.getElementById("fechaFin").value = datos.dateStr;
      $('#errorNombre').css('display','none');
      $('#errorFechaIni').css('display','none');
      $('#errorFechaFin').css('display','none');
      myModal.show();

    }
  });
  calendar.render();


});
/*
var datosEventos;
function cargarEventos(){
  var cadena='r=1';
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if(this.readyState==4 && this.status==200){
        datosEventos=(this.responseText);
      }
    }
    xhttp.open("POST", "calendario.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(cadena);  
}
*/
function guardarEvento(){
  var tituloEvento=document.getElementById('nombreEvento').value;
  var fechaInicio=document.getElementById('fechaInicio').value;
  var fechaFin=document.getElementById('fechaFin').value;
  var colorEvento=document.getElementById('colorEvento').value;
  var bandera=validarEvento();
  if(bandera==true){
    var datos=[tituloEvento,fechaInicio,fechaFin,colorEvento];
    var cadenaDatos=JSON.stringify(datos);
    var cadena='x='+cadenaDatos;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if(this.readyState==4 && this.status==200){
        var comprobar=JSON.parse(this.responseText);
        if(comprobar==1){
          alert ("Correcto")
        }else{
          alert("Error")
        }
      }
    }
    xhttp.open("POST", "calendario.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(cadena);    
  }
}

function validarEvento(){
  var bandera=true;
  var tituloEvento=document.getElementById('nombreEvento').value;
  var fechaInicio=document.getElementById('fechaInicio').value;
  var fechaFin=document.getElementById('fechaFin').value;



  if(tituloEvento==''){
    $('#errorNombre').css('display','block');
    $('#errorNombre').html('Debe introducir un titulo al evento')
    bandera=false;
  }else{
    $('#errorNombre').css('display','none');
  }
  if(fechaInicio==''){
    $('#errorFechaIni').css('display','block');
    $('#errorFechaIni').html('Debe introducir una fecha de inicio al evento')
    bandera=false;
  }else{
    $('#errorFechaIni').css('display','none');
  }
  if(fechaFin==''){
    $('#errorFechaFin').css('display','block');
    $('#errorFechaFin').html('Debe introducir una fecha de fin al evento')
    bandera=false;
  }else{
    $('#errorFechaFin').css('display','none');
  }

  if(fechaInicio>fechaFin){
    $('#errorFechaFin').css('display','block');
    $('#errorFechaFin').html('La fecha de fin no puede ser menor a la de inicio de un evento')
    bandera=false;
  }else{
    $('#errorFechaFin').css('display','none');
  }



  return bandera;
}