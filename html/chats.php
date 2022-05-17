<!DOCTYPE html>
<html lang="es">

<head >
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chats</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/chats.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <script src="../js/jquery-3.6.0.min.js"></script>
    <style>
        .page{
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
            <div class="container-fluid my-4 p-0">
                <div class="row p-0">
                    <div class="col cajaTotal p-0">
                        <div class="configuracion mb-2">
                            <img class="imagenPerfil p-2 ms-3 imagenPerfilActual" alt="miimagen" srcset="" src="">
                            <span class="ajustesUsuario float-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left volverAtras iconos" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill verPerfil iconos" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </span>
                        </div>
                        <div class="cajaBuscarChat mb-4 px-4">
                            <input placeholder="Buscar Chat" id="inputBuscar" class="w-100 px-3" type="text">
                        </div>
                        <div class="cajaListaChatsActivos text-center  pt-0 w-100">
                        </div>
                    </div>
                    <div class="col cajaDerecha col-sm-8 p-0">
                        <div class="cabeceraUsuario">
                        </div>
                        <div class="cajaChat mt-1">
                        </div>
                        <div id="formulario" autocomplete="off" class="px-1 pt-1">
                            <input type="text" class="form-control" placeholder="Enviar mensaje" id="inputChat" />
                            <div class="input-group-append">
                                <button class="btn botonEnviar" type="submit">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/chats.js" type="module"></script>
    <script src="../js/sidebar.js"></script>
</body>

</html>