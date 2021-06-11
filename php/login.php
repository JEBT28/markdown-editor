<?php
include_once "cors.php";

session_start();
$servername = "localhost";
$username = "admin";
$password_db = "14091105Nike@";
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
    
    $obj->code = 1;

    $obj->msg = "Bienvenido";

    $row = mysqli_fetch_assoc($result);
    $first_name = $row['FIRST_NAME'];
    $last_name = $row['LAST_NAME'];

    $obj->name = "$first_name $last_name";
	$obj->user=$user;
    $obj->sessid=session_id();
    $_SESSION['user']=$user;

    echo json_encode($obj);
} else {
    $obj->code = 5;

    $obj->msg = "Datos incorrectos";

    echo json_encode($obj);
}

$connection->close();

