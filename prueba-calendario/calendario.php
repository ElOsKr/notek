<?php
    class conexion{

        private $conn=null;
        public function __construct()
        {
            $dsn="mysql:host=localhost;charset=utf8;";
            $this->conn=new PDO($dsn,'root','');
        }

        public function agregarFechas($titulo,$fechaIni,$fechaFin,$color){
            $datos=array(':titulo'=>$titulo,':fechaIni'=>$fechaIni,':fechaFin'=>$fechaFin,':color'=>$color);
            $sql='insert into calendario.fechas (title,start,end,color) values (:titulo,:fechaIni,:fechaFin,:color)';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function listarEventos(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from calendario.fechas");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }




    }

    $conexion=new conexion();


    if(isset($_POST['x'])){
        $datos=json_decode($_POST['x']);

        if($conexion->agregarFechas($datos[0],$datos[1],$datos[2],$datos[3])){
            echo json_encode(1);
        }else{
            echo json_encode(0);
        }

    }

    function listar(){
        $conexion=new conexion();
        $eventos=$conexion->listarEventos();
        echo (json_encode($eventos, JSON_UNESCAPED_UNICODE));
        die;
    }

    listar();
?>