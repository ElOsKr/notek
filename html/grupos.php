<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grupos</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
    <link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/grupos.css">

</head>

<body>
    <div class="page">
        <?php
        include "sidebar.php";
        ?>
        <div class="content">
            <div class="container cajaTotal text-white mt-5 px-5">
                <div class="row">
                    <div class="col p-4">
                        <h1 class="text-center">Lista de Grupos</h1>
                        <div class="dropdown float-end">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ordenar por
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <a class="dropdown-item">
                                        Título
                                    </a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li>
                                            <a class="dropdown-item" id="tituloAscendente">Menor a Mayor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" id="tituloDescendente">Mayor a menor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                                </svg></a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="dropdown-item">
                                        Fecha Creación
                                    </a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li>
                                            <a class="dropdown-item" id="fechaAscendente">Menor a mayor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" id="fechaDescendente">Mayor a menor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                                </svg></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row cajaIntroducirLista">
                    <div class="list-group pe-0 " id="cajaListaGrupo">
                    </div>
                    <button type="button" id="preCrearGrupo" data-bs-toggle="modal" data-bs-target="#panelCrearGrupo" class="btn btn-info text-white mt-4 mx-auto ">Crear Grupo</button>
                    <div class="modal fade" id="panelCrearGrupo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content" style="background-color: #222831;">
                                <div class="modal-body">
                                    <div class="container cajaTotalComentarios">
                                        <div class="row">
                                            <div class="col-12">
                                                <h2 class="my-3 text-center text-white">Crear Grupo</h2>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 py-2 px-2">
                                                <div class="mb-3">
                                                    <p class="my-3">Nombre del Grupo</p>
                                                    <input type="text" class="form-control" id="tituloGrupo">
                                                    <p class="errores"></p>
                                                    <p class="my-3">Añada usuarios al grupo</p>
                                                    <input type="text" class="form-control" id="usuarioGrupo">

                                                    <div class="listaUsuarios my-2">

                                                    </div>

                                                    <div class="miembrosGrupo my-2">

                                                    </div>
                                                    <p class="errores"></p>
                                                </div>
                                                <button class="btn btn-info text-white" id="crearGrupo">Crear</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" id="cajaAnuncios" style="display: none;">
            <div class="container cajaTotal mt-5">
                <div class="row">
                    <div class="col p-4">
                        <h1 class="text-center text-white" id="lista1">Lista 1</h1>
                    </div>
                </div>
                <div class="row text-white cajaIntroducirAnuncio">
                    <div class="col-md-6 my-3">
                        <div class="card cajasContenido">
                            <div class="card-body ">
                                <div class="w-100 text-center">
                                    <img class="rounded-circle imagenAutor" src="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenAutor">
                                    <h3 class="text-center py-3 mt-1 w-100">Davman15</h3>
                                </div>
                                <h4 class="card-title float-start ">Un buen titulo</h4>
                                <br>
                                <br>
                                <div class="cajaIntroducirContenido p-1 bg-white text-black">
                                    <p class="card-text">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Quaerat officia
                                        ipsum fugiat esse enim optio ad non vitae facere deserunt, voluptas animi obcaecati itaque
                                        consectetur! Earum non rerum alias eum?
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat id, totam quaerat mollitia
                                        ipsam alias excepturi eaque inventore molestiae, ratione, delectus cupiditate aliquid!
                                        Ducimus quos soluta sequi dicta tempore molestiae.
                                    </p>
                                </div>
                                <br>
                                <br>
                                <br>
                                <a href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-3 text-white me-3">Enlace descargar archivo auxiliar</a>
                                <h6 class="mt-3 text-white float-end">16/5/2022 17:25</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 my-3">
                        <div class="card cajasContenido">
                            <div class="card-body ">
                                <div class="w-100 text-center">
                                    <img class="rounded-circle imagenAutor" src="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenAutor">
                                    <h3 class="text-center py-3 mt-1 w-100">Davman15</h3>
                                </div>
                                <h4 class="card-title  float-start ">Un buen titulo</h4>
                                <br>
                                <br>
                                <div class="cajaIntroducirContenido p-1 bg-white text-black">
                                    <p class="card-text">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Quaerat officia
                                        ipsum fugiat esse enim optio ad non vitae facere deserunt, voluptas animi obcaecati itaque
                                        consectetur! Earum non rerum alias eum?
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat id, totam quaerat mollitia
                                        ipsam alias excepturi eaque inventore molestiae, ratione, delectus cupiditate aliquid!
                                        Ducimus quos soluta sequi dicta tempore molestiae.
                                    </p>
                                </div>
                                <br>

                                <br>
                                <br>
                                <a href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-3 text-white me-3">Enlace descargar archivo auxiliar</a>
                                <h6 class="mt-3 text-white float-end">16/5/2022 17:25</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a href="crearAnuncio.php" class="btn-flotante text-white rounded-circle" id="btn-flotante" style="display: none;">+</a>
    <script type="module" src="../js/grupos.js"></script>
    <script type="module" src="../js/sidebar.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/bootstrap.bundle.min.js"></script>
</body>

</html>