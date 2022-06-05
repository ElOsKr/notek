<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio Apuntes</title>
    <script src="https://cdn.tiny.cloud/1/erx4vmsb6lfpf3wwptirz94rd566n48b7g5sesg5qgibydg0/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script type="module" src="../js/inicioApuntes.js"></script>
    <script src="../js/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="../css/apuntes.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <script type="module" src="../js/sidebar.js"></script>
    <style>
        .apuntesLista {
            background: #393E46;
            color: #00FFF5;
            border: none;
        }
    </style>
</head>
<body>
    <div class="page">
        <?php
        include 'sidebar.php'
        ?>
        <div class="content">
            <div class="container mt-2">
                <h1 id="titulo" class="text-center py-3">Apuntes</h1>
                <div class="d-grid gap-2">
                    <button class="mt-2 btn-dark btn-sm text-light" id="crearApuntes">+Crear Apuntes</button>
                </div>
                <div id="cajaApuntes" class="list-group pe-0 mt-4">
                </div>
            </div>
        </div>
    </div>
</body>
</html>