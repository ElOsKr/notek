<?php
    class conexion3{

        private $conn=null;
        public function __construct()
        {
            $dsn="mysql:host=localhost;charset=utf8;";
            $this->conn=new PDO($dsn,'root','');
        }

        public function agregarItem($nombre){
            $datos=array(':titulo'=>$nombre);
            $sql='insert into lista.items (title) values (:titulo)';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function ultimoAgregado(){
            $sentencia=$this->conn->prepare("select * from lista.items order by id desc limit 1");
            $sentencia->execute();
            $result = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $result['id'];
        }

        public function obtenerInfo($id){
            $datos=array(':id'=>$id);
            $sentencia=$this->conn->prepare("select title,content from apuntes.apuntes where id=:id");
            $sentencia->execute($datos);
            $result = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $result;
        }


        public function modificarApuntes($titulo,$contenido,$id){
            $datos=array(':titulo'=>$titulo,':contenido'=>$contenido,':id'=>$id);
            $sql='update apuntes.apuntes set title=:titulo, content=:contenido where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function drop($fechaIni,$fechaFin,$id){
            $datos=array(':fechaIni'=>$fechaIni,':fechaFin'=>$fechaFin,':id'=>$id);
            $sql='update calendario.fechas set start=:fechaIni, end=:fechaFin where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function eliminarFechas($id){
            $datos=array(':id'=>$id);
            $sql='delete from calendario.fechas where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function listarApuntes(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }
    }

    if(isset($_POST['x'])){
        $cone=new conexion3();
        $apuntes=$cone->listarApuntes();
        $datos=[1,$apuntes];
        echo json_encode($datos);
        die();
    }


    if(isset($_POST['a'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['a']);
        if($conexion->agregarItem($datos)){
            $id=$conexion->ultimoAgregado();
            echo(json_encode($id));
        }else{
            echo(json_encode(0));
        }
    }

?>