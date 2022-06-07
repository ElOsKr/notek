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
    <link rel="icon" href="../img/Icono_Notek.png">
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
                <div class="row">
                    <div class="col">
                        <p class="text-light">Seleccionar:</p>
                        <button class="btn btn-primary" id="btn-selectTodos">Todos</button>
                        <button class="btn btn-secondary" id="btn-selectMio">Mío</button>
                    </div>    
                </div>
                <div class="row text-white cajaIntroducirAnuncio">

                </div>
            </div>
        </div>
    </div>
    <a href="crearAnuncio.php" class="btn-flotante text-white rounded-circle">+</a>
    <script type="module" src="../js/sidebar.js"></script>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="../js/tablonAnuncios.js"></script>
</body>

</html>