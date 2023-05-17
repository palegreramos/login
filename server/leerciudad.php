<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

header('Content-Type: application/json');

$json = file_get_contents('php://input');
 
$params = json_decode($json);

try {
    $mbd = new PDO('mysql:host=localhost;dbname=nueva', "root", "");

	$res = $mbd->prepare('SELECT ciudad FROM ciudades where ciudad=:ciudad' );
	$res->bindParam(':ciudad', $ciudad);
    $ciudad=$params->ciudad;
    $res->execute();
	$error=$res->errorInfo();
	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
    	echo json_encode($rows);
	}
    $mbd = null;
} catch (PDOException $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
    die();
    }
?>