<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introduzca Codigo</title>
</head>

<body>
    <?php
    if (!isset($_COOKIE['numeroRandom'])) {
        header('Location: prueba.php');
    } 
    if(isset($_POST['numeroIntroducido'])&& isset($_COOKIE['numeroRandom'])){
        if($_POST['numeroIntroducido']==$_COOKIE['numeroRandom']){
            echo "<h1>El codigo introducido es correcto se le redigirá a su cuenta</h1>";
            header('Refresh: 3; URL=prueba.php');
        }
    }
    else {
    ?>
        <h1>Introduzca el codigo generado</h1>
        <form action="IntroduzcaCodigo.php" method="post">
            <input type="text" name="numeroIntroducido">
            <input type="submit" value="Enviar">
        </form>
    <?php

    }
    ?>

</body>

</html>