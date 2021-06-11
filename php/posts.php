<?php

include_once "cors.php";
$servername = "localhost";
$username = "admin";
$password_db = "14091105Nike@";
$db = "POSTSDB";

$connection = new mysqli($servername, $username, $password_db, $db);


//if (isset($_SESSION['user'])) {
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $json = file_get_contents("php://input");

  $data = json_decode($json);
  if (isset($data->body->id)) {
    //Mostrar un post
    $id = $data->body->id;
    $sql = "Select * from posts where id=$id;";
    $result = $connection->query($sql);;
    $row =  $result->fetch_assoc();

    $post;

    $post->id = $row['id'];
    $post->title = $row['title'];
    $post->content = $row['content'];
    $post->postDate = $row['creation'];
    $post->modifiedDate = $row['last_modified'];
    $post->user = $row['id_user'];
    $post->disabled = $row['disabled'];

    $obj->msg = "OK";
    $obj->body = $post;
    echo json_encode($obj);
    exit();
  } else {
    //Mostrar lista de post

    class Post
    {
      public $id;
      public $title;
      public $content;
      public $postDate;
      public $modifiedDate;
      public $user;
      public $disabled;
    }
    $posts = [];
    $sql = "SELECT p.id, p.title, p.content, DATE(p.creation) as creation,DATE(p.last_modified) as last_modified,p.id_user,p.disabled,concat(u.first_name,' ',u.last_name) as autor 
            FROM POSTS as p 
            JOIN USERS as u on p.id_user = u.ID 
            WHERE disabled = 0;";
    $result = $connection->query($sql);

    foreach ($result as $row) {
      $post = new Post();

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
    $obj->msg = "OK";
    $obj->body = $posts;
    echo json_encode($obj);
    exit();
  }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $json = file_get_contents("php://input");


  $data = json_decode($json);


  $title = $data->title;
  $content = $data->content;
  $id_user = $data->user;

  $sql = "INSERT INTO POSTS(title,content,id_user) values (?,?,?);";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('ssi', $title, $content, $id_user);
  $result = $cmd->execute();


  if ($result == true) {

    $post_Id = $connection->insert_id;
    
    
    $sql = "SELECT p.id, p.title, p.content, DATE(p.creation) as creation,DATE(p.last_modified) as last_modified,p.id_user,p.disabled,concat(u.first_name,' ',u.last_name) as autor 
    FROM POSTS as p 
    JOIN USERS as u on p.id_user = u.ID 
    WHERE id =$post_Id";
    $result = $connection->query($sql);

    $post = new Post();

    $post->id = $row['id'];
    $post->title = $row['title'];
    $post->content = $row['content'];
    $post->postDate = $row['creation'];
    $post->modifiedDate = $row['last_modified'];
    $post->id_user = $row['id_user'];
    $post->autor = $row['autor'];
    $post->disabled = $row['disabled'];
    
    $obj->msg = "OK";
    $obj->body = $post;

    echo json_encode($obj);
  } else {
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

  $title = $data->title;
  $content = $data->content;
  $id = $data->id;


  $sql = "UPDATE POSTS SET title = ?,content = ?,last_modified=current_timestamp() WHERE id= ?;";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('ssi', $title, $content, $id);


  if ($cmd->execute()) {
    $obj->msg = "OK";
    $obj->str = $connection->error;
    echo json_encode($obj);
  } else {
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



  $id = $data;

  $sql = "UPDATE POSTS SET last_modified=current_timestamp(),disabled=1 WHERE id=?";

  $cmd = $connection->prepare($sql);
  $cmd->bind_param('i', $id);
  $result = $cmd->execute();


  if ($result == true) {

    $obj->msg = "OK";
    echo json_encode($obj);
  } else {
    $obj->msg = "ERROR";
    $obj->error = $cmd->error;
    echo json_encode($obj);
  }
  $connection->close();
  exit();
}
/*}
else
{
  $obj->msg = "ERROR";
  $obj->error = "Session not found";
  echo json_encode($obj);
}*/
