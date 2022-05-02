document.addEventListener('DOMContentLoaded', function () {
  var myModal = new bootstrap.Modal(document.getElementById('modalCalendario'))
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locales: 'es',
    headerToolbar: {
      left: "prev,sigu,hoy",
      center: "title",
      right: "dayGridMonth, timeGridWeek, listWeek"

    },
    dateClick: function (datos) {
      document.getElementById("fechaInicio").value = datos.dateStr;
      myModal.show();

    }
  });
  calendar.render();
});