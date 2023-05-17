<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);

	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=nueva', "root", "");
  		$sentencia = $mbd->prepare("INSERT INTO ciudades (ciudad) VALUES (:ciudad)");
		$sentencia->bindParam(':ciudad', $ciudad);
		$ciudad=$params->ciudad;
		$sentencia->execute();
		$error=$sentencia->errorInfo();
		header('Content-Type: application/json');
		echo json_encode(array(
			'error'=> array(
				'sqlstate'=>current($error),
				'code'=>next($error),
				'msg'=>next($error))));
		$mbd = null;
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}


?>