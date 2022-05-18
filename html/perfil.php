<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/perfil.css">
    <link rel="stylesheet" href="../css/animate.css">

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="../css/sidebar.css">
    <script src="../js/jquery-3.6.0.min.js"></script>
    <style>
        .page {
            position: relative;
        }
    </style>
</head>

<body>
    <div class="page">
        <?php
        include "sidebar.php";
        ?>
        <div class="content">
            <div class="container">
                <div class="row d-flex justify-content-lg-center">
                    <div class="col-md-10 mt-5 pt-5">
                        <div class="row z-depth-3">
                            <div class="col-sm-4 caja-Izquierda rounded-left">
                                <div class="card-block text-center text-white">
                                    <div class="subirImagen">
                                        <label for="seleccionImagen">
                                            <img src="" alt="imagen Perfil Usuario" srcset="" class="imagenPerfilActual mt-4 rounded-circle">
                                        </label>
                                        <input type="file" accept="image/*" id="seleccionImagen" disabled>
                                    </div>
                                    <h2 class="font-weight-bold mt-4 text-center nicknameActual"></h2>
                                    <p>Editar Perfil</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square iconoEditar mb-4" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="col-sm-8 caja-Derecha rounded-right">
                                <h3 class="mt-4 text-center text-white">Datos del perfil</h3>
                                <br>
                                <div class="row">
                                    <div class="col-sm-6 mb-2">
                                        <p class="font-weight-bold text-white">Nickname:</p>
                                        <input type="text" class="form-control campoNickname" value="" disabled>
                                        <p class="errores"></p>
                                    </div>
                                    <div class="col-sm-6 mb-2">
                                        <p class="font-weight-bold text-white">Nombre:</p>
                                        <input type="text" class="form-control campoNombre" value="" disabled>
                                        <p class="errores"></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 mt-5 cajasCambiar">
                                        <p class="font-weight-bold text-white">Apellidos:</p>
                                        <input type="text" class="form-control campoApellidos" value="" disabled>
                                        <p class="errores"></p>
                                    </div>
                                    <div class="col-sm-6 mt-5 cajasCambiar">
                                        <p class="font-weight-bold text-white">Contraseña</p>
                                        <button type="button" id="resetearContra" class="btn btn-info text-white" disabled>Resetear Contraseña</button>
                                    </div>
                                    <div class="col-sm mt-3 text-center">
                                        <button type="button" id="botonConfirmar" class="btn btn-success d-none">Confirmar
                                            cambios</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../js/perfil.js"></script>
    <script type="module" src="../js/sidebar.js"></script>
</body>

</html>