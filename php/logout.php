<?php
include_once "cors.php";

$json = file_get_contents("php://input");

$data = json_decode($json);  

session_id($_GET['sessid']);
session_start();
if (isset($_SESSION['user'])) {
    $obj = new \stdClass();
    session_destroy();

    $obj->msg = "OK";
    
  echo json_encode($obj);
  exit();
}else{
    $obj = new \stdClass();
  $obj->msg = "ERROR";
  $obj->error = "Session not found";
  echo json_encode($obj);
  exit();
}

?>