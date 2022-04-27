document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    document.getElementById("btn-sidebar").addEventListener("click", sidebar)
}

function sidebar() {
    document.querySelector("body").classList.toggle("active");
    document.getElementById("btn-sidebar").classList.toggle("active");
    if (document.getElementById("btn-sidebar").classList.contains("active")) {
        document.getElementById("flecha-ocultar").animate([
            {transform: 'rotate(0deg)'},
            {transform: 'rotate(180deg)'}
        ],{duration:300})
        document.getElementById("flecha-ocultar").style.transform="rotate(180deg)"
        $("#logoImagen-navbar").fadeIn(300);
        $(".logo-container").fadeOut(300);
    } else {
        document.getElementById("flecha-ocultar").animate([
            {transform: 'rotate(180deg)'},
            {transform: 'rotate(360deg)'}
        ],{duration:300})
        document.getElementById("flecha-ocultar").style.transform="rotate(360deg)"
        $("#logoImagen-navbar").fadeOut(300);
        $(".logo-container").fadeIn(500);
    }
}