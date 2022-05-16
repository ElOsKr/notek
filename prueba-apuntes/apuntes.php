<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tiny.cloud/1/erx4vmsb6lfpf3wwptirz94rd566n48b7g5sesg5qgibydg0/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="./creacionApuntes.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="./creacionApuntes.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <script src="../js/sidebar.js"></script>
</head>
<body>

    <div class="page">
        <?php
            include '../html/sidebar.php'
        ?>
        <div class="content">
            <input type="hidden" id="idApuntes">
            <div class="container mt-4 text-center">
                <h1 class="text-center">
                    <button class="btn text-light text-center me-2 mt-3" id="regresarApuntes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </button>
                    <input type="text" id="tituloApuntes" class="bg-transparent text-light border-0 border-bottom border-light" placeholder="Escriba el Título">
                </h1>
                <div class="text-center mt-4">
                    <button class="btn text-light text-center" id="botonGuardar">
                        <span class="material-symbols-outlined">
                            save
                        </span>
                    </button>                    
                </div>
                <div class="container mt-1">
                    <textarea id="default-editor"></textarea>   
                </div>
            </div>              
        </div>        
    </div>
</body>
</html>