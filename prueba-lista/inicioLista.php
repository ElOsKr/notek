<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./inicioLista.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="./inicioLista.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <script type="module" src="../js/sidebar.js"></script>
</head>
<body>
    <div class="page">
        <?php
            include '../html/sidebar.php';
        ?>
        <div class="content">
            <div class="container mt-2">
            <h1 id="titulo">Lista</h1> 
                <div class="input-group"> 
                    <input type="text" id="listaItemNombre" class="form-control">
                    <button class="btn btn-outline-secondary text-light" id="botonAniadir">Añadir</button>
                </div>
                <p class="errorItem oculto text-danger">No puede estar vacio este campo</p> 
                <div class="mt-3" id="tareas">
                </div>      
            </div>            
        </div>
        <div class="modal fade" id="modalEditar" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalCalendarioLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <input type="hidden" id="idEvento">
              <div id="errorEvento" class="oculto text-danger"></div>
              <h4>Nombre</h4>
              <input type="Text" id="nombreEvento" class="form-control">
              <div id="errorNombre" class="oculto text-danger"></div>
              <div id="fecha">
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
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary col-3" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary col-3" id="aniadirFechas">Registrar</button>
              <button type="button" class="btn btn-danger col-3" id="borrarFechas">Borrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</body>
</html>