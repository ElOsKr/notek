document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("checkInicio").addEventListener("click",checkInicioE);
  document.getElementById("checkFin").addEventListener("click",checkFinE);
  document.getElementById("checkDesc").addEventListener("click",checkDesc);
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
    events:'calendario2.php',
    editable: true,
    buttonText:{
      today:'Hoy',
      month:'Mes',
      week:'Semana',
      day: 'Dia',
      list:'Lista'
    } , 
    dateClick: function (datos) {
      $('#idEvento').val("");
      $('#nombreEvento').val("");
      $("#fechaInicio").val(datos.dateStr);
      $("#fechaFin").val(datos.dateStr);
      $("#fechaInicioT").val(datos.dateStr+"T00:00");
      $("#fechaFinT").val(datos.dateStr+"T00:00");
      $("#colorEvento").val("");
      $("#descripcion").val("");
      $('#errorEvento').css('display','none');
      $('#errorNombre').css('display','none');
      $('#errorFechaIni').css('display','none');
      $('#errorFechaFin').css('display','none');
      myModal.show();
    },
    eventClick: function(datos){
      $('#idEvento').val(datos.event.id)
      $('#nombreEvento').val(datos.event.title);
      $("#fechaInicio").val(datos.event.startStr.split("T",1));
      if(datos.event.endStr==""){
        $("#fechaFin").val(datos.event.startStr.split("T",1));
        $("#fechaFinT").val(datos.event.startStr.split("+",1));
      }else{
        $("#fechaFin").val(datos.event.endStr.split("T",1));
        $("#fechaFinT").val(datos.event.endStr.split("+",1));
      }
      $("#fechaInicioT").val(datos.event.startStr.split("+",1));
      $("#colorEvento").val(datos.event.backgroundColor);
      $("#descripcion").val(datos.event.extendedProps.description);
      $('#errorEvento').css('display','none');
      $('#errorNombre').css('display','none');
      $('#errorFechaIni').css('display','none');
      $('#errorFechaFin').css('display','none');
      myModal.show();
    },
    eventDrop: function(datos){
      var idEvento=datos.event.id;
      var fechaInicio=datos.event.startStr.split("+",1).toString()
      var fechaFin=datos.event.endStr.split("+",1).toString();
      var datos=[fechaInicio,fechaFin,idEvento];
      var cadenaDatos=JSON.stringify(datos);
      var cadena='d='+cadenaDatos;
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if(this.readyState==4 && this.status==200){
          var comprobar=JSON.parse(this.responseText);
          if(comprobar==1){
            calendar.refetchEvents();
          }else{
            alert("Error");
          }
        }
      }
      xhttp.open("POST", "calendario.php");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(cadena);
    }
  });
  calendar.render();
  document.getElementById('aniadirFechas').addEventListener('click',function(){
    var tituloEvento=$('#nombreEvento').val();
    if($("#checkInicio").prop("checked")){
      var fechaInicio=$('#fechaInicioT').val();
    }else{
      var fechaInicio=$('#fechaInicio').val();
    }
    if($("#checkFin").prop("checked")){
      var fechaFin=$('#fechaFinT').val();
    }else{
      var fechaFin=$('#fechaFin').val();
    }
    var colorEvento=$('#colorEvento').val();
    var idEvento=$('#idEvento').val();
    var descEvento=$('#descripcion').val();
    var bandera=validarEvento();
    if(bandera==true){
      var datos=[tituloEvento,fechaInicio,fechaFin,colorEvento,descEvento,idEvento];
      var cadenaDatos=JSON.stringify(datos);
      var cadena='x='+cadenaDatos;
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if(this.readyState==4 && this.status==200){
          var comprobar=JSON.parse(this.responseText);
          if(comprobar==1){
            calendar.refetchEvents();
            myModal.hide();
          }else{
            alert("Error");
          }
        }
      }
      xhttp.open("POST", "calendario.php");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(cadena);    
    }
  });
  document.getElementById("borrarFechas").addEventListener("click",function(){
    var idEvento=$('#idEvento').val();
    if(idEvento==""){
      $('#errorEvento').css('display','block');
      $('#errorEvento').html("No existe ningun evento");
    }else{
      var cadenaDatos=JSON.stringify(idEvento);
      var cadena='b='+cadenaDatos;
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if(this.readyState==4 && this.status==200){
          var comprobar=JSON.parse(this.responseText);
          if(comprobar==1){
            calendar.refetchEvents();
            myModal.hide();
          }else{
            alert("Error");
          }
        }
      }
      xhttp.open("POST", "calendario.php");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(cadena);    
    }
  })
});

function validarEvento(){
  var bandera=true;
  var tituloEvento=$('#nombreEvento').val();
  if($("#checkInicio").prop("checked")){
    var fechaInicio=$('#fechaInicioT').val();
  }else{
    var fechaInicio=$('#fechaInicio').val();
  }
  if($("#checkFin").prop("checked")){
    var fechaFin=$('#fechaFinT').val();
  }else{
    var fechaFin=$('#fechaFin').val();
  }

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

function checkInicioE(){
  if($("#checkInicio").prop("checked")){
    $("#fechaInicioT").css("display","block");
    $("#fechaInicio").css("display","none");
  }else{
    $("#fechaInicioT").css("display","none");
    $("#fechaInicio").css("display","block");
  }
}

function checkFinE(){
  if($("#checkFin").prop("checked")){
    $("#fechaFinT").css("display","block");
    $("#fechaFin").css("display","none");
  }else{
    $("#fechaFinT").css("display","none");
    $("#fechaFin").css("display","block");
  }
}

function checkDesc(){
  if($("#checkDesc").prop("checked")){
    $("#descripcion").css("display","block");
  }else{
    $("#descripcion").css("display","none");
  }
}

