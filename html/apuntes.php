<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tiny.cloud/1/erx4vmsb6lfpf3wwptirz94rd566n48b7g5sesg5qgibydg0/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script type="module" src="../js/creacionApuntes.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="../css/creacionApuntes.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <script type="module" src="../js/sidebar.js"></script>
</head>

<body>
    <div class="page">
        <?php
        include '../html/sidebar.php'
        ?>
        <div class="content">
            <div class="container mt-4 text-center">
                <h1 class="text-center">
                    <button class="btn text-light text-center me-2 mt-3" id="regresarApuntes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                    <input type="text" id="tituloApuntes" class="bg-transparent text-light border-0 border-bottom border-light" placeholder="Escriba el Título">
                </h1>
                <h3 class="errores"></h3>
                <div class="mt-4">
                    <div class="alert alert-info oculto me-3" role="alert" id="alertaGuardado" style="margin-bottom: 0!important;">
                        Guardado con <strong>exito</strong>
                    </div>
                    <button class="btn text-light text-center" id="botonGuardar">
                        <span class="material-symbols-outlined">
                            save
                        </span>
                    </button>
                    <button class="btn text-light text-center" disabled id="botonVer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </button>
                </div>

                <div class="container mt-1">
                    <textarea id="default-editor"></textarea>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>