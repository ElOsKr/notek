document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    tinymce.init({
        selector: 'textarea#default-editor',
        plugins: 'autoresize',
        autoresize_on_init: false,
        language:'es',
      });
}
