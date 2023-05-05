<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);

	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=nueva', "root", "");
  		$sentencia = $mbd->prepare("SELECT * FROM login where email=:email and password=:password");
		$sentencia->bindParam(':email', $email);
		$sentencia->bindParam(':password', $password);
		$email=$params->email;
		$password=$params->password;
		$sentencia->execute();
		$error=$sentencia->errorInfo();
		header('Content-Type: application/json');
		if ($res->errorCode()==0) {
			$rows=$res->fetchAll(PDO::FETCH_ASSOC);
			header('Content-type: application/json');
			echo json_encode($rows);
		}
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