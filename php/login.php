<?php
if($_GET==[]) die();

$action = $_GET["action"];
$u_pwd = $_GET["u_pwd"];

if($action=="r"){ // 注册
    $u_name = $_GET["u_name"];
    connect();
    register($u_name,$u_pwd);
}
else if($action=="l") { // 登录
    $u_id = $_GET["u_id"];
    connect();
    login($u_id,$u_pwd);
}
else die();

function connect(){
    mysql_connect("10.36.133.110", "madmin", '163music');
    mysql_query("use 163music");
}

function login($u_id,$u_pwd){
    $sql = "select * from users where u_id=$u_id";
    $result = mysql_query($sql);
    $row = mysql_fetch_assoc($result);
    if($row["u_pwd"]==$u_pwd) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}

function register($u_name,$u_pwd){
    $sql = "insert into users(u_name, u_pwd) values('$u_name', '$u_pwd')";
    mysql_query($sql);
    $result = mysql_affected_rows();
    if($result>0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}
?>