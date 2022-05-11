import { doc, setDoc, db } from "/js/firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    document.getElementById("descargar").addEventListener("click", descargar)
}

function descargar() {
    let link = document.getElementById("a");
    link.download = 'hello.txt';

    let blob = new Blob(['Hello, world!'], { type: 'text/plain' });

    link.href = URL.createObjectURL(blob);

    link.click();

    URL.revokeObjectURL(link.href);
}