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


        public function modificarItem($id,$titulo){
            $datos=array(':titulo'=>$titulo,':id'=>$id);
            $sql='update lista.items set title=:titulo where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function enProceso($id){
            $datos=array(':id'=>$id);
            $sql='update lista.items set status="enProceso" where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function enPausa($id){
            $datos=array(':id'=>$id);
            $sql='update lista.items set status="enPausa" where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function completado($id){
            $datos=array(':id'=>$id);
            $sql='update lista.items set status="completado" where id=:id';
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

        public function eliminarItem($id){
            $datos=array(':id'=>$id);
            $sql='delete from lista.items where id=:id';
            $q=$this->conn->prepare($sql);
            $q->execute($datos);
            return $q;
        }

        public function listarApuntes(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items order by id desc");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }

        public function buscarApuntes($filtro){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items where title like '%{$filtro}%' order by id desc");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }

        public function enProcesoListar(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items where status='enProceso' order by id desc");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }

        public function enPausaListar(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items where status='enPausa' order by id desc");
            $sentencia->execute();
            while($result = $sentencia->fetch(PDO::FETCH_ASSOC)){
                array_push($array,$result);
            }
            return $array;
        }
        
        public function acabadosListar(){
            $array=[];
            $sentencia=$this->conn->prepare("select * from lista.items where status='completado' order by id desc");
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

    if(isset($_POST['b'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['b']);
        if($conexion->eliminarItem($datos)){
            echo(json_encode(1));
        }else{
            echo(json_encode(0));
        }
    }

    if(isset($_POST['e'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['e']);
        if($conexion->modificarItem($datos[0],$datos[1])){
            echo(json_encode(1));
        }else{
            echo(json_encode(0));
        }
    }

    if(isset($_POST['p'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['p']);
        if($conexion->enProceso($datos)){
            echo(json_encode(1));
        }else{
            echo(json_encode(0));
        }
    }

    if(isset($_POST['s'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['s']);
        if($conexion->enPausa($datos)){
            echo(json_encode(1));
        }else{
            echo(json_encode(0));
        }
    }

    if(isset($_POST['c'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['c']);
        if($conexion->completado($datos)){
            echo(json_encode(1));
        }else{
            echo(json_encode(0));
        }
    }

    if(isset($_POST['f'])){
        $conexion=new conexion3();
        $datos=json_decode($_POST['f']);
        $filtrados=$conexion->buscarApuntes($datos);
        echo(json_encode($filtrados));
    }

    if(isset($_POST['enP'])){
        $conexion=new conexion3();
        $filtrados=$conexion->enProcesoListar();
        echo(json_encode($filtrados));
    }

    if(isset($_POST['enS'])){
        $conexion=new conexion3();
        $filtrados=$conexion->enPausaListar();
        echo(json_encode($filtrados));
    }

    if(isset($_POST['enA'])){
        $conexion=new conexion3();
        $filtrados=$conexion->acabadosListar();
        echo(json_encode($filtrados));
    }
?>