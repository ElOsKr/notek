<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario</title>
    <link rel="icon" href="../img/Icono_Notek.png">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/calendario.css">
    <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>
    <link rel="stylesheet" href="../css/main.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <script src="../js/main.min.js"></script>
    <script type="module" src="../js/calendario.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/es.js"></script>
</head>
<body>
    <div class="page">
        <?php
        include "sidebar.php";
        ?>
        <div class="content">
            <div class="container p-5">
                <div id="calendar">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalCalendario" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalCalendarioLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <input type="hidden" id="idEvento">
                            <div id="errorEvento" class="oculto text-danger"></div>
                            <h4>Nombre</h4>
                            <input type="Text" id="nombreEvento" class="form-control">
                            <div id="errorNombre" class="oculto text-danger"></div>
                            <h4 class="mt-2">Fecha de inicio</h4>
                            <input type="date" id="fechaInicio" class="form-control">
                            <input type="datetime-local" id="fechaInicioT" class="oculto form-control">
                            Seleccionar hora <input type="checkbox" id="checkInicio">
                            <div id="errorFechaIni" class="oculto text-danger"></div>
                            <h4 class="mt-2">Fecha de fin</h4>
                            <input type="date" id="fechaFin" class="form-control">
                            <input type="datetime-local" id="fechaFinT" class="oculto form-control">
                            Seleccionar hora <input type="checkbox" id="checkFin">
                            <div id="errorFechaFin" class="oculto text-danger"></div>
                            <h4 class="mt-2">Color</h4>
                            <input type="color" id="colorEvento" class="form-control mt-1">
                            Descripción <input type="checkbox" id="checkDesc" class="mt-2">
                            <textarea class="oculto form-control" id="descripcion" cols="10" rows="2" style="resize:none;"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary col-3" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary col-3" id="aniadirFechas">Registrar</button>
                            <button type="button" class="btn btn-danger col-3" id="borrarFechas">Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
    <script type="module" src="../js/sidebar.js"></script>
    <script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>