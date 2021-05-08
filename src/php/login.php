<?php
$servername = "localhost";
$username = "root";
$password_bd = "";
$db = "POSTDB";

$connection = new mysqli($servername, $username, $password_bd, $db);

if ($connection->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}



$user = $_POST['user'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE  user='$user') AND password='$password' LIMIT 1;";
$result = $connection->query($sql);
$data = mysqli_num_rows($result);
if ($data == 1) {
    
    $code = 1;

    $msg = "Bienvenido";

    $row = mysqli_fetch_assoc($result);
    $first_name = $row['FIRST_NAME'];
    $last_name = $row['LAST_NAME'];

    $name = "$first_name $last_name";

    echo json_encode([
        'code'=>$code,
        'user' => $user,
        'password' => $password,
        'name' => $name,
        'msg' => $msg
    ]);
} else {
    $code = 5;

    $msg = "Datos incorrectos";

    echo json_encode([
        'code'=>$code,
        'msg' => $msg
        ]);
}

$connection->close();
