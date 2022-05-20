<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablon de anuncios</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/tablonAnuncios.css">
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
            <div class="container cajaTotal mt-5">
                <div class="row">
                    <div class="col p-4 cajaSuperior">
                        <h1 class="text-center text-white">Tablon de Anuncios</h1>
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
                                <h4 class="card-title  float-start d-block">Un buen titulo muyyyy larguito</h4>
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

                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#panel">
                                    Comentarios
                                </button>

                                <!-- Modal -->
                                <div class="modal fade " id="panel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content" style="background-color: #222831;">

                                            <div class="modal-body">
                                                <div class="container cajaTotalComentarios">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <h2 class="my-3 text-center text-white">Comentarios</h2>
                                                        </div>
                                                    </div>
                                                    <div class="row cajaComentarios">
                                                        <div class="col-12 py-2 px-2">
                                                            <div data-id="${chat.id}" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                                                                <div class="texto text-white" data-id="${chat.id}">
                                                                    <img data-id="${chat.id}" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                                                                    <h4 class="text-md-start" data-id="${chat.id}">Davman15</h4>
                                                                    <p class=" ultimoMensaje text-md-start" data-id="${chat.id}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                                                                    <span class="tiempo text-md-end float-end" data-id="${chat.id}">16/5/2022 17:25</span>
                                                                    <br>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12 py-2 px-2">
                                                            <div data-id="${chat.id}" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                                                                <img data-id="${chat.id}" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                                                                <div class="texto text-white" data-id="${chat.id}">
                                                                    <h4 class="text-md-start" data-id="${chat.id}">Davman15</h4>
                                                                    <p class=" ultimoMensaje text-md-start" data-id="${chat.id}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                                                                    <span class="tiempo text-md-end float-end" data-id="${chat.id}">16/5/2022 17:25</span>
                                                                    <br>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="formulario" class="px-0 pb-1 pt-2">
                                                        <input type="text" class="form-control" placeholder="Enviar comentario" id="inputChat" />
                                                        <div class="input-group-append">
                                                            <button class="btn btn-success botoncillo">Enviar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade " id="${anuncios.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content" style="background-color: #222831;">

                                            <div class="modal-body">
                                                <div class="container cajaTotalComentarios">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <h2 class="my-3 text-center text-white">Comentarios</h2>
                                                        </div>
                                                    </div>
                                                    <div class="row cajaComentarios">

                                                    </div>
                                                    <div id="formulario" class="px-0 pb-1 pt-2">
                                                        <input type="text" class="form-control" placeholder="Enviar comentario" id="inputChat" />
                                                        <div class="input-group-append">
                                                            <button class="btn btn-success botonMandarComentario" data-id="${anuncios.id}">Enviar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                    <a href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-5 text-white">Enlace descargar archivo auxiliar</a>
                                    <h6 class="mt-5 text-white float-end">16/5/2022 17:25</h6>
                                </div>
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
                                    <a href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-5 text-white">Enlace descargar archivo auxiliar</a>
                                    <h6 class="mt-5 text-white float-end">16/5/2022 17:25</h6>
                                </div>
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
                                    <a href="${anuncios.archivoSeleccionado}" download target="_blank" class="float-start mt-5 text-white">Enlace descargar archivo auxiliar</a>
                                    <h6 class="mt-5 text-white float-end">16/5/2022 17:25</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!----------------------Panel de comentarios---------------------------------->
    <!--<div id="panel" style="display:none; " class="modal-dialog modal-xl">
        <div class="container cajaTotalComentarios">
            <div class="row">
                <div class="col-12">
                    <h2 class="my-3 text-center text-white">Comentarios</h2>
                </div>
            </div>
            <div class="row cajaComentarios">
                <div class="col-12 py-2 px-2">
                    <div data-id="${chat.id}" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                        <div class="texto text-white" data-id="${chat.id}">
                            <img data-id="${chat.id}" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                            <h4 class="text-md-start" data-id="${chat.id}">Davman15</h4>
                            <p class=" ultimoMensaje text-md-start" data-id="${chat.id}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                            <span class="tiempo text-md-end float-end" data-id="${chat.id}">16/5/2022 17:25</span>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="col-12 py-2 px-2">
                    <div data-id="${chat.id}" class="d-block w-100 p-3 comentario" style="display:inline-flex;">
                        <img data-id="${chat.id}" class="imagenPerfil" srcset="https://firebasestorage.googleapis.com/v0/b/proyectonotek.appspot.com/o/ImagenesPerfilUsuario%2Fdavidmanrique15%40gmail.com%2Fdavidmanrique15%40gmail.com?alt=media&token=a3b889ea-747e-4d55-b0d7-dfe62cd42485" alt="imagenChat" />
                        <div class="texto text-white" data-id="${chat.id}">
                            <h4 class="text-md-start" data-id="${chat.id}">Davman15</h4>
                            <p class=" ultimoMensaje text-md-start" data-id="${chat.id}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ipsum totam delectus explicabo possimus nihil perferendis neque atque quaerat deserunt reprehenderit, in praesentium iusto. Nam voluptatibus vero sequi quidem ut?</p>
                            <span class="tiempo text-md-end float-end" data-id="${chat.id}">16/5/2022 17:25</span>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <div id="formulario" class="px-0 pb-1 pt-2">
                <input type="text" class="form-control" placeholder="Enviar comentario" id="inputChat" />
                <div class="input-group-append">
                    <button class="btn btn-success botoncillo">Enviar</button>
                </div>
            </div>
        </div>
    </div>-->
    <!----------------------------------------------------------------------------->
    <a href="crearAnuncio.php" class="btn-flotante text-white rounded-circle">+</a>

    <!--<script type="module" src="../js/tablonAnuncios.js"></script>-->
    <script type="module" src="../js/sidebar.js"></script>
    <script src="/js/bootstrap.bundle.min.js"></script>
</body>

</html>