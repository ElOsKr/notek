function redirigir() {
    location.replace("../html/perfil.html");
}

function iniciarSesion() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email == "") {
        //Rellene el email
        Swal.fire({
            icon: 'error',
            title: 'Introduzca sus credenciales',
            text: 'Dejó el campo Contraseña vacío'
        });

    }
    else if (password == "") {
        //Rellene la contraseña
    }
    else {
        //Entra correctamente al sitio que le corresponde en este caso el index.html    
    }
}