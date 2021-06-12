<?php
include_once "cors.php";
$servername = "localhost";
$username = "root";
$password_db = "";
$db = "POSTSDB";

$connection = new mysqli($servername, $username, $password_db, $db);


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $json = file_get_contents("php://input");

  $data = json_decode($json);  
  
  session_id($_GET['sessid']);
  session_start();
  if (!isset($_SESSION['user'])) {

    $obj->msg = "ERROR";
    $obj->error = "Session not found";
    echo json_encode($obj);
    exit();
  }

  $id_user = $_SESSION['user'];
  if (isset($data->body->id)) {
    //Mostrar un post
    $id = $data->body->id;
    $sql = "Select * from posts where id=$id;";
    $result = $connection->query($sql);;
    $row =  $result->fetch_assoc();

    $post = new \stdClass();;

    $post->id = $row['id'];
    $post->title = $row['title'];
    $post->content = $row['content'];
    $post->postDate = $row['creation'];
    $post->modifiedDate = $row['last_modified'];
    $post->user = $row['id_user'];
    $post->disabled = $row['disabled'];

    $obj = new \stdClass();
    $obj->msg = "OK";
    $obj->body = $post;
    echo json_encode($obj);
    exit();
  } else {
    //Mostrar lista de post

  
    $posts = [];
    $sql = "SELECT p.id, p.title, p.content, DATE(p.creation) as creation,DATE(p.last_modified) as last_modified,p.id_user,p.disabled,concat(u.first_name,' ',u.last_name) as autor 
            FROM POSTS as p 
            JOIN USERS as u on p.id_user = u.ID 
            WHERE disabled = 0 and p.id_user = $id_user;";
    $result = $connection->query($sql);

    foreach ($result as $row) {
      $post = new \stdClass();

      $post->id = $row['id'];
      $post->title = $row['title'];
      $post->content = $row['content'];
      $post->postDate = $row['creation'];
      $post->modifiedDate = $row['last_modified'];
      $post->id_user = $row['id_user'];
      $post->autor = $row['autor'];
      $post->disabled = $row['disabled'];

      array_push($posts, $post);
    }
    $obj = new \stdClass();
    $obj->msg = "OK";
    $obj->body = $posts;
    echo json_encode($obj);
    exit();
  }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $json = file_get_contents("php://input");

  $data = json_decode($json);  

  session_id($data->sessid);
  session_start();
  if (!isset($_SESSION['user'])) {

    $obj->msg = "ERROR";
    $obj->error = "Session not found";
    echo json_encode($obj);
    exit();
  }

  $id_user = $_SESSION['user'];

  $title = $data->post->title;
  $content = $data->post->content;

  $sql = "INSERT INTO POSTS(title,content,id_user) values (?,?,?);";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('ssi', $title, $content, $id_user);
  $result = $cmd->execute();


  if ($result == true) {

    $post_Id = $connection->insert_id;

    $sql = "SELECT p.id, p.title, p.content, DATE(p.creation) as creation,DATE(p.last_modified) as last_modified,p.id_user,p.disabled,concat(u.first_name,' ',u.last_name) as autor 
    FROM POSTS as p 
    JOIN USERS as u on p.id_user = u.ID 
     order by p.id desc Limit 1 ";

    $result = $connection->query($sql);
foreach ($result as $row){

    $post = new \stdClass();

    $post->id = $row['id'];
    $post->title = $row['title'];
    $post->content = $row['content'];
    $post->postDate = $row['creation'];
    $post->modifiedDate = $row['last_modified'];
    $post->id_user = $row['id_user'];
    $post->autor = $row['autor'];
    $post->disabled = $row['disabled'];
}
    $obj = new \stdClass();
    $obj->msg = "OK";
    $obj->body = $post;

    echo json_encode($obj);
  } else {
    $obj = new \stdClass();
    $obj->msg = "ERROR";
    $obj->error = $connection->error;
    echo json_encode($obj);
  }
  $connection->close();
  exit();
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

  $json = file_get_contents("php://input");

  $data = json_decode($json);  
  session_id($data->sessid);
  session_start();
  if (!isset($_SESSION['user'])) {

    $obj->msg = "ERROR";
    $obj->error = "Session not found";
    echo json_encode($obj);
    exit();
  }

  $id_user = $_SESSION['user'];

  $title = $data->post->title;
  $content = $data->post->content;
  $id = $data->post ->id;


  $sql = "UPDATE POSTS SET title = ?,content = ?,last_modified=current_timestamp() WHERE id= ? and id_user = $id_user;";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('ssi', $title, $content, $id);


  if ($cmd->execute()) {
    $obj = new \stdClass();
    $obj->msg = "OK";
    $obj->str = $connection->error;
    echo json_encode($obj);
  } else {
    $obj = new \stdClass();
    $obj->msg = "ERROR";
    $obj->error = $connection->error;
    echo json_encode($obj);
  }
  $connection->close();
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

  $json = file_get_contents("php://input");

  $data = json_decode($json);  

  session_id($data->sessid);
  session_start();
  if (!isset($_SESSION['user'])) {

    $obj->msg = "ERROR";
    $obj->error = "Session not found";
    echo json_encode($obj);
  exit();
  }

  $id_user = $_SESSION['user'];


  $id = $data->id;

  $sql = "UPDATE POSTS SET last_modified=current_timestamp(),disabled=1 WHERE id=? and id_user = $id_user";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('i', $id);
  $result = $cmd->execute();


  if ($result == true) {
    $obj = new \stdClass();
    $obj->msg = "OK";
    echo json_encode($obj);
  } else {
    $obj = new \stdClass();
    $obj->msg = "ERROR";
    $obj->error = $cmd->error;
    echo json_encode($obj);
  }
  $connection->close();
  exit();
}
