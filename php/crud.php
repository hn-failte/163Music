<?php
header("Access-Control-Allow-Origin:*");
header("content-type:text/html;charset=utf8");

if(isset($_GET["action"])){
    $action = $_GET["action"];
}
else{
    echo json_encode(["state" => 0, "msg" => "need action"]);
    die();
}
if(isset($_GET["u_id"])){
    $u_id = $_GET["u_id"];
}
else{
    echo json_encode(["state" => 0, "msg" => "need id"]);
    die();
}


if($action=="cl"){ //创建歌单
    $list_name = $_GET["list_name"];
    connect();
    createList($list_name, $u_id);
}
else if($action=="as"){ //创建歌单歌曲
    $m_id = $_GET["m_id"];
    $m_name = $_GET["m_name"];
    $m_author = $_GET["m_author"];
    $list_id = $_GET["list_id"];
    connect();
    addSongs($m_id, $m_name, $m_author, $list_id);
}
else if($action=="gl") { //获取用户歌单
    connect();
    getLists($u_id);
}
else if($action=="gs") { //获取歌单歌曲
    $list_id = $_GET["list_id"];
    connect();
    getSongs($list_id);
}
else if($action=="ul") { //更新用户歌单
    $list_id = $_GET["list_id"];
    $list_name = $_GET["list_name"];
    connect();
    updateList($list_id, $list_name);
}
else if($action=="rs") { //移除歌单歌曲
    $m_id = $_GET["m_id"];
    $list_id = $_GET["list_id"];
    connect();
    removeSong($m_id, $list_id);
}
else if($action=="dl") { //删除用户歌单
    $list_id = $_GET["list_id"];
    connect();
    deleteList($u_id, $list_id);
}
else die();

function connect(){
    mysql_connect("10.36.133.110", "madmin", '163music');
    mysql_query("use 163music");
}

function createList($list_name, $u_id){ // 创建歌单
    //http://127.0.0.1:8086/php/crud.php?action=cl&list_name=Love&u_id=1
    $sql = "insert into lists(list_name, u_id) values('$list_name', $u_id)";
    mysql_query($sql);
    $rows = mysql_affected_rows();
    if($rows > 0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}

function addSongs($m_id, $m_name, $m_author, $list_id){ // 歌单添加歌曲
    //http://127.0.0.1:8086/php/crud.php?action=as&list_name=Love&u_id=1&m_name=chushan&m_author=hz&m_duration=36000&m_album=1&list_id=1&m_url=http:\/\/www.baiduscom
    $sql = "insert into songs(m_id, m_name, m_author,  list_id) values($m_id, '${m_name}', '${m_author}',  ${list_id})";
    mysql_query($sql);
    $rows = mysql_affected_rows();
    if($rows > 0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}

function getSongs($list_id){ // 获取歌单歌曲
    //http://127.0.0.1:8086/php/crud.php?action=gs&list_id=1&u_id=1
    $sql = "select * from songs where list_id=${list_id}";
    $result = mysql_query($sql);
    $rows = [];
    while($row = mysql_fetch_assoc($result)){
        $rows[] = $row;
    }
    echo json_encode($rows);
}

function getLists($u_id){ // 获取用户歌单
    //http://127.0.0.1:8086/php/crud.php?action=gl&u_id=1
    $sql = "select list_id,list_name from lists where u_id=$u_id";
    mysql_query($sql);
    $result = mysql_query($sql);
    $rows = [];
    while($row = mysql_fetch_assoc($result)){
        $rows[] = $row;
    }
    if(sizeof($rows)>0) echo json_encode($rows);
    else echo "";
}

function updateList($list_id, $list_name){ // 更新用户歌单（重命名）
    //http://127.0.0.1:8086/php/crud.php?action=ul&list_id=2&list_name=1&u_id=1
    $sql = "update lists set list_name='$list_name' where list_id=$list_id";
    mysql_query($sql);
    $rows = mysql_affected_rows();
    if($rows > 0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);

}

function removeSong($m_id, $list_id){ // 移除歌单歌曲
    //http://127.0.0.1:8086/php/crud.php?action=rs&m_id=3&list_id=1&u_id=1
    $sql = "delete from songs where m_id=${m_id} and list_id=${list_id}";
    mysql_query($sql);
    $result = mysql_affected_rows();
    if($result>0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}

function deleteList($u_id, $list_id){ // 删除用户歌单
    //http://127.0.0.1:8086/php/crud.php?action=dl&list_id=13&u_id=1
    $sql = "delete from lists where list_id=${list_id} and u_id=${u_id}";
    mysql_query($sql);
    $result = mysql_affected_rows();
    if($result>0) echo json_encode(["state" => 1]);
    else echo json_encode(["state" => 0]);
}
?>