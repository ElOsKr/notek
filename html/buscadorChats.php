<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css.map">
	<link rel="stylesheet" href="../css/bootstrap.css.map">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/BuscadorChats.css">
    <script src="../js/jquery-3.6.0.min.js"></script>
</head>

<body class="colorFondo">
    <div class="page">
        <?php
        include "sidebar.php";
        ?>
        <div class="content">
            <div class="container mt-5">
                <h1 class="text-center text-white">Lista de Chats</h1>
                <br>
                <input type="text" id="input_buscador" class="form-control my-2" placeholder="Buscar chat">
                <button class="btn mt-2 text-white fondo" id="btn_Buscar">Buscar</button>
                <br>
                <div id="listaUsuarios" class="col-12 row my-3">
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../js/buscadorChats.js"></script>
    <script type="module" src="../js/sidebar.js"></script>
</body>

</html>