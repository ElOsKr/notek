<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario</title>
</head>
<body>
    <?php 
    //Importo los metodos de las librerias
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    //Pongo la ruta de donde se ecnuentran los archivos
    require 'PHP_Mail/Exception.php';
    require 'PHP_Mail/PHPMailer.php';
    require 'PHP_Mail/SMTP.php';
    ?>
    <form action="Enviar_Correo.php" method="post">
        <h1>Olvidaste la contraseña</h1>
        Introduzca su correo:
        <br>
        <input type="text" name="correo" >
        <br>
        <input type="submit" value="Enviar Código">
    </form>
</body>
</html>
<?php 

 
?>