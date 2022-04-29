document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    tinymce.init({
        selector: 'textarea#default-editor'
      });
}
