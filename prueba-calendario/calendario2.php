<?php
include "calendario.php";

$conexion=new conexion();
$eventos=$conexion->listarEventos();
echo (json_encode($eventos, JSON_UNESCAPED_UNICODE));
die;

?>