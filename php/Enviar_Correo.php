<?php
//Importo los metodos de las librerias
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
//Pongo la ruta de donde se ecnuentran los archivos
require 'PHP_Mail/Exception.php';
require 'PHP_Mail/PHPMailer.php';
require 'PHP_Mail/SMTP.php';

$correoEnviado = $_POST['correo'];
$codigoGenerado=rand(1000, 9999);
if (isset($correoEnviado) && !empty($correoEnviado)) {
    $correo = new PHPMailer(true);
    try {
        $correo->SMTPDebug = 0;
        $correo->isSMTP();
        //Poner a cual tipo de correo vamos a enviar
        $correo->Host = 'smtp.mail.yahoo.com';
        $correo->SMTPAuth   = true;
        //Se pone aqui las credenciales del correo para que la app pueda acceder a este cuenta
        $correo->Username   = 'anonimogigachad@yahoo.com';
        $correo->Password   = 'yrwwsgdbubfxsray';

        $correo->SMTPSecure = 'tls';
        //TCP port to connect to; use 587
        $correo->Port = 587;

        //Introducir aqui el correo con el que vamos a enviar el codigo, junto con el titulo
        $correo->setFrom('anonimogigachad@yahoo.com', 'Equipo de soporte de Notek'); 
        $correo->addAddress('davidmanrique15@gmail.com');   //Introducir el correo al que vamos a enviar el codigo

        //Contenido
        $correo->isHTML(true);
        $correo->Subject = 'Contraseña Extraviada de Notek';
        $correo->Body    = "Hola:
        <br>Introduzca el siguiente código para poder saber que eres tú" . "<br><b>$codigoGenerado</b>";
        $correo->CharSet="UTF-8";
        $correo->send();
        ?>
        
        <?php
        //Durara el codigo 5 minutos
        setcookie("numeroRandom", $codigoGenerado, time()+300); 
        header('Location: IntroduzcaCodigo.php');
    } catch (Exception $e) {
        echo "Hubo un error al enviar el mensaje: {$correo->ErrorInfo}";
    }
} else {
    header('Location: prueba.php');
}
