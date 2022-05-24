import { collection, query, where, onSnapshot, db, setDoc, doc, updateDoc } from "../js/firebase.js";
const myModal = new bootstrap.Modal(document.getElementById('modalCalendario'));
let id = 0;
document.addEventListener('DOMContentLoaded', function () {
  mostrarFirebaseCalendario();
  document.getElementById("checkInicio").addEventListener("click", checkInicioE);
  document.getElementById("checkFin").addEventListener("click", checkFinE);
  document.getElementById("checkDesc").addEventListener("click", checkDesc);
});

function validarEvento() {
  var bandera = true;
  var tituloEvento = $('#nombreEvento').val();
  if ($("#checkInicio").prop("checked")) {
    var fechaInicio = $('#fechaInicioT').val();
  } else {
    var fechaInicio = $('#fechaInicio').val();
  }
  if ($("#checkFin").prop("checked")) {
    var fechaFin = $('#fechaFinT').val();
  } else {
    var fechaFin = $('#fechaFin').val();
  }

  if (tituloEvento == '') {
    $('#errorNombre').css('display', 'block');
    $('#errorNombre').html('Debe introducir un titulo al evento')
    bandera = false;
  } else {
    $('#errorNombre').css('display', 'none');
  }
  if (fechaInicio == '') {
    $('#errorFechaIni').css('display', 'block');
    $('#errorFechaIni').html('Debe introducir una fecha de inicio al evento')
    bandera = false;
  } else {
    $('#errorFechaIni').css('display', 'none');
  }
  if (fechaFin == '') {
    $('#errorFechaFin').css('display', 'block');
    $('#errorFechaFin').html('Debe introducir una fecha de fin al evento')
    bandera = false;
  } else {
    $('#errorFechaFin').css('display', 'none');
  }
  if (fechaInicio == '') {
    $('#errorFechaIni').css('display', 'block');
    $('#errorFechaIni').html('Debe introducir una fecha de inicio al evento')
    bandera = false;
  } else {
    $('#errorFechaIni').css('display', 'none');
  }
  if (fechaFin == '') {
    $('#errorFechaFin').css('display', 'block');
    $('#errorFechaFin').html('Debe introducir una fecha de fin al evento')
    bandera = false;
  } else {
    $('#errorFechaFin').css('display', 'none');
  }

  if (fechaInicio > fechaFin) {
    $('#errorFechaFin').css('display', 'block');
    $('#errorFechaFin').html('La fecha de fin no puede ser menor a la de inicio de un evento')
    bandera = false;
  } else {
    $('#errorFechaFin').css('display', 'none');
  }

  return bandera;
}

function checkInicioE() {
  if ($("#checkInicio").prop("checked")) {
    $("#fechaInicioT").css("display", "block");
    $("#fechaInicio").css("display", "none");
  } else {
    $("#fechaInicioT").css("display", "none");
    $("#fechaInicio").css("display", "block");
  }
}

function checkFinE() {
  if ($("#checkFin").prop("checked")) {
    $("#fechaFinT").css("display", "block");
    $("#fechaFin").css("display", "none");
  } else {
    $("#fechaFinT").css("display", "none");
    $("#fechaFin").css("display", "block");
  }
}

function checkDesc() {
  if ($("#checkDesc").prop("checked")) {
    $("#descripcion").css("display", "block");
  } else {
    $("#descripcion").css("display", "none");
  }
}

function mostrarFirebaseCalendario() {
  const referenciaCalendario = collection(db, "Calendario");
  const consulta = query(referenciaCalendario,where("usuario", "==", localStorage.getItem("id")));
  const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
    const calendario = [];
    querySnapshot.forEach((doc) => {
      calendario.push({
        id: doc.id,
        title: doc.data().title,
        start: doc.data().start,
        end: doc.data().end,
        color: doc.data().color,
        description: doc.data().description,
        usuario: doc.data().usuario
      });
    });
    console.log(calendario);
    id = calendario.length;
    devolverDatoCalendario(calendario);
  });
}

function devolverDatoCalendario(calendarioArray) {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locales: 'es',
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "dayGridMonth timeGridWeek timeGridDay listWeek",
    },
    themeSystem: 'bootstrap5',
    events: calendarioArray,
    editable: true,
    eventResizableFromStart: true,
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista'
    },
    dateClick: function (datos) {
      $('#idEvento').val("");
      $('#nombreEvento').val("");
      $("#fechaInicio").val(datos.dateStr);
      $("#fechaFin").val(datos.dateStr);
      $("#fechaInicioT").val(datos.dateStr + "T00:00");
      $("#fechaFinT").val(datos.dateStr + "T00:00");
      $("#colorEvento").val("");
      $("#descripcion").val("");
      $('#errorEvento').css('display', 'none');
      $('#errorNombre').css('display', 'none');
      $('#errorFechaIni').css('display', 'none');
      $('#errorFechaFin').css('display', 'none');
      myModal.show();
    },
    eventClick: function (datos) {
      $('#idEvento').val(datos.event.id)
      $('#nombreEvento').val(datos.event.title);
      $("#fechaInicio").val(datos.event.startStr.split("T", 1));
      if (datos.event.endStr == "") {
        $("#fechaFin").val(datos.event.startStr.split("T", 1));
        $("#fechaFinT").val(datos.event.startStr.split("+", 1));
      } else {
        $("#fechaFin").val(datos.event.endStr.split("T", 1));
        $("#fechaFinT").val(datos.event.endStr.split("+", 1));
      }
      $("#fechaInicioT").val(datos.event.startStr.split("+", 1));
      $("#colorEvento").val(datos.event.backgroundColor);
      $("#descripcion").val(datos.event.extendedProps.description);
      $('#errorEvento').css('display', 'none');
      $('#errorNombre').css('display', 'none');
      $('#errorFechaIni').css('display', 'none');
      $('#errorFechaFin').css('display', 'none');
      myModal.show();
    },
    eventDrop: async function (datos) {
      var idEvento = datos.event.id;
      var fechaInicio = datos.event.startStr.split("+", 1).toString()
      var fechaFin = datos.event.endStr.split("+", 1).toString();

      const referenciaCalendario = doc(db, "Calendario", idEvento);
      await updateDoc(referenciaCalendario, {
        start: fechaInicio,
        end: fechaFin
      });
      calendar.refetchEvents();
      myModal.hide();
    },
    eventResize: async function (datos) {
      var idEvento = datos.event.id;
      var fechaInicio = datos.event.startStr.split("+", 1).toString()
      var fechaFin = datos.event.endStr.split("+", 1).toString();

      const referenciaCalendario = doc(db, "Calendario", idEvento);
      await updateDoc(referenciaCalendario, {
        start: fechaInicio,
        end: fechaFin
      });
      calendar.refetchEvents();
      myModal.hide();
    }
  });
  calendar.render();
  document.getElementById('aniadirFechas').addEventListener('click', async function () {
    var tituloEvento = $('#nombreEvento').val();
    if ($("#checkInicio").prop("checked")) {
      var fechaInicio = $('#fechaInicioT').val();
    } else {
      var fechaInicio = $('#fechaInicio').val();
    }
    if ($("#checkFin").prop("checked")) {
      var fechaFin = $('#fechaFinT').val();
    } else {
      var fechaFin = $('#fechaFin').val();
    }
    var colorEvento = $('#colorEvento').val();
    var idEvento = $('#idEvento').val();
    var descEvento = $('#descripcion').val();
    var bandera = validarEvento();
    if (bandera == true) {
      const docRef = {
        id: id,
        title: tituloEvento,
        start: fechaInicio,
        end: fechaFin,
        color: colorEvento,
        description: descEvento,
        usuario: localStorage.getItem("id")
      }
      //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos
      await setDoc(doc(db, "Calendario", localStorage.getItem("id") + " " + id), docRef);
      id++;
      myModal.hide();
    }
  });
  document.getElementById("borrarFechas").addEventListener("click", function () {
    var idEvento = $('#idEvento').val();
    if (idEvento == "") {
      $('#errorEvento').css('display', 'block');
      $('#errorEvento').html("No existe ningun evento");
    } else {
      var cadenaDatos = JSON.stringify(idEvento);
      var cadena = 'b=' + cadenaDatos;
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var comprobar = JSON.parse(this.responseText);
          if (comprobar == 1) {
            calendar.refetchEvents();
            myModal.hide();
          } else {
            alert("Error");
          }
        }
      }
      xhttp.open("POST", "calendario.php");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(cadena);
    }
  })
}
