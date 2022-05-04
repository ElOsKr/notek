import { doc, setDoc, db } from "/js/firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    // Add a new document in collection "cities"
    setDoc(doc(db, "ciudades", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    });
    console.log("Hola")
}
