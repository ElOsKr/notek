document.addEventListener('DOMContentLoaded', function () {
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
      myModal.show();

    }
  });
  calendar.render();


});




function guardarEvento(){
  var tituloEvento=document.getElementById('nombreEvento').value;
  var fechaInicio=document.getElementById('fechaInicio').value;
  var fechaFin=document.getElementById('fechaFin').value;
  var colorEvento=document.getElementById('colorEvento').value;
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