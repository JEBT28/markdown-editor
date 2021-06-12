<?php
include_once "cors.php";

session_start();
$servername = "localhost";
$username = "root";
$password_db = "";
$db = "POSTSDB";

$connection = new mysqli($servername, $username, $password_db, $db);

if ($connection->connect_error) {
    die("Conexion fallida: " . $connection->connect_error);
}

$_POST = json_decode(file_get_contents("php://input"),true);


$user = $_POST['user'];
$password = $_POST['password'];


$sql = "SELECT * FROM USERS WHERE user='$user' AND password='$password'";
$result = $connection->query($sql);
if ($result->num_rows>0) {
    $obj = new \stdClass();
    $obj->code = 1;

    $obj->msg = "Bienvenido";

    $row = mysqli_fetch_assoc($result);
    
    $id_user = $row['ID'];
    $obj->body = new \stdClass();
	$obj->body->user=$id_user;
    $obj->body->sessid=session_id();
    $_SESSION['user']=$id_user;

    echo json_encode($obj);
} else {
    $obj->code = 5;

    $obj->msg = "Datos incorrectos";

    echo json_encode($obj);
}

$connection->close();

