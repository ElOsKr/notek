<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Anuncio</title>
    <link rel="icon" href="../img/Icono_Notek.png">
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/crearAnuncio.css">
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.tiny.cloud/1/bbshcv8t1k700dn3b19t3tf8gw9ktystwdazopzg96nse7fw/tinymce/6/tinymce.min.js"
        referrerpolicy="origin"></script>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col p-2">
                <h1 class="text-center text-white">Crear Anuncio</h1>
            </div>
        </div>
        <div class="row text-white">
            <div class="col p-3">
                <h3 class="mt-4 mb-3">Título</h3>
                <input type="text" class="form-control my-3" id="tituloAnuncio" placeholder="Introduzca un titulo">
                <p class="errores"></p>
                <h3 class="mt-4 mb-3">Contenido</h3>
                <textarea class="form-control my-2" rows="7" id="contenidoAnuncio"></textarea>
                <p class="errores"></p>
                <h3 class="mt-4 mb-3">Archivo adicional</h3>
                <input type="file" id="seleccionarArchivo" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .zip, .rar,.txt">
                <div class="col-sm mt-3 text-center">
                    <button type="button" class="btn btn-success" id="btnCrearAnuncio">Crear anuncio</button>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../js/crearAnuncio.js"></script>
</body>

</html>