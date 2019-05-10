<?php
header("Access-Control-Allow-Origin:*");
header("content-type:text/html;charset=utf8");

if(isset($_POST["action"])){
    $action = $_POST["action"];
}
else{
    echo json_encode(["state" => 0, "msg" => "need action"]);
    die();
}
if(isset($_POST["u_name"])){
    $u_name = $_POST["u_name"];
}
if(isset($_POST["u_pwd"])){
    $u_pwd = $_POST["u_pwd"];
}
else{
    echo json_encode(["state" => 0, "msg" => "need u_pwd"]);
    die();
}

if($action=="r"){ // 注册
    connect();
    register($u_name,$u_pwd);
}
else if($action=="l") { // 登录
    connect();
    login($u_name,$u_pwd);
}
else die();

function connect(){
    mysql_connect("10.36.133.110", "madmin", '163music');
    mysql_query("use 163music");
}

function login($u_name,$u_pwd){
    $sql = "select * from users where u_name=$u_name";
    $result = mysql_query($sql);
    $row = mysql_fetch_assoc($result);
    if($row["u_pwd"]==$u_pwd){
        echo json_encode(["state" => 1]);
    }
    else echo json_encode(["state" => 0]);
}

function register($u_name,$u_pwd){
    $sql = "insert into users(u_name, u_pwd) values('$u_name', '$u_pwd')";
    mysql_query($sql);
    $result = mysql_affected_rows();
    if($result>0){
        
        $sql = "update users set u_id= ";
        echo json_encode(["state" => 1]);

    }
    else echo json_encode(["state" => 0]);
}
?>