<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);

function permisos() {  
  if (isset($_SERVER['HTTP_ORIGIN'])){
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
      header('Access-Control-Allow-Credentials: true');      
  }  
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))          
        header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
    exit(0);
  }
}
permisos();


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$id_usuario = (isset($_POST['id_usuario'])) ? $_POST['id_usuario'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$distancia = (isset($_POST['distancia'])) ? $_POST['distancia'] : '';
$dificultad = (isset($_POST['dificultad'])) ? $_POST['dificultad'] : '';
$tipo = (isset($_POST['tipo'])) ? $_POST['tipo'] : '';
$max_personas = (isset($_POST['max_personas'])) ? $_POST['max_personas'] : '';
$direccion = (isset($_POST['direccion'])) ? $_POST['direccion'] : '';
$fecha = (isset($_POST['fecha'])) ? $_POST['fecha'] : '';
$hora = (isset($_POST['hora'])) ? $_POST['hora'] : '';
$latitud = (isset($_POST['latitud'])) ? $_POST['latitud'] : '';
$longitud = (isset($_POST['longitud'])) ? $_POST['longitud'] : '';
$provincia = (isset($_POST['provincia'])) ? $_POST['provincia'] : '';


switch($opcion){
	case 1:
        $consulta = "SELECT * FROM rutas ORDER BY fecha ASC";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2:
        $consulta = "INSERT INTO rutas (id_usuario, nombre, descripcion, distancia, dificultad, tipo, max_personas, direccion, fecha, hora, latitud, longitud, provincia) VALUES('$id_usuario', '$nombre', '$descripcion', '$distancia', '$dificultad', '$tipo', '$max_personas', '$direccion', '$fecha', '$hora', '$latitud', '$longitud', '$provincia') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 3:
        $consulta = "UPDATE rutas SET nombre='$nombre', descripcion='$descripcion', distancia='$distancia', dificultad='$dificultad', tipo='$tipo', max_personas='$max_personas', direccion='$direccion', fecha='$fecha', hora='$hora', latitud='$latitud', longitud='$longitud', provincia='$provincia' WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "DELETE FROM rutas WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 5:
        $consulta = "SELECT * FROM rutas WHERE id_usuario='$id_usuario' ORDER BY fecha ASC";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6:
        $consulta = "SELECT * FROM rutas WHERE fecha <= '$fecha' ORDER BY fecha ASC";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "SELECT COUNT(id) AS numRutas FROM rutas";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;