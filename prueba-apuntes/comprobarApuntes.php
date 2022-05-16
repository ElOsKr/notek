<?php
    class conexion2{

        private $conn=null;
        public function __construct()
        {
            $dsn="mysql:host=localhost;charset=utf8;";
            $this->conn=new PDO($dsn,'root','');
        }

        public function agregarApuntes($titulo,$contenido){
            $datos=array(':titulo'=>$titulo,':contenido'=>$contenido);
            $sql='insert into apuntes.apuntes (title,content) values (:titulo,:contenido)';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function ultimoAgregado(){
            $sentencia=$this->conn->prepare("select * from apuntes.apuntes order by id desc limit 1");
            $sentencia->execute();
            $result = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $result['id'];
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
            $sentencia=$this->conn->prepare("select * from apuntes.apuntes");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }
    }

    if(isset($_POST['x'])){
        $cone=new conexion2();
        $apuntes=$cone->listarApuntes();
        $datos=[1,$apuntes];
        echo json_encode($datos);
        die();
    }



    if(isset($_POST['i'])){
        $datos=json_decode($_POST['i']);
        $cone=new conexion2();
        if($datos[2]==""){
            if($cone->agregarApuntes($datos[0],$datos[1])){
                echo json_encode($cone->ultimoAgregado());
            }else{
                echo json_encode("error");
            }            
        }else{
            if($cone->modificarApuntes($datos[0],$datos[1],$datos[2])){
                echo json_encode("correcto");
            }else{
                echo json_encode("error");
            }
        }
    }

?>