<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=nueva', "root", "");

	$res = $mbd->query('SELECT * FROM login' );
	
	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
		header('Content-type: application/json');
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