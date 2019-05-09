<?php

if(isset($_GET["content"])){
    $content = $_GET["content"];
    echo "<script>var content = '$content';</script>";
}
else{
    echo "<script>location.href='http://10.36.133.110:8086/html/music_search.html'</script>";
    die();
}

?>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../lib/bootstrap-3.3.7-dist/css/bootstrap.css">
    <link rel="stylesheet" href="../css/music_bar.css">
    <link rel="stylesheet" href="../css/music_search.css">
    <script src="../lib/jquery.js"></script>
    <script src="../lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <span class="glyphicon glyphicon-music text-primary"></span>
            <input type="text" id="input" placeholder="搜索音乐">
            <input type="button" id="search" class="btn btn-primary" value="搜索" />
        </div>
        <table id="list" style="margin-bottom: 80px;" class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th class="text-center">歌曲</th>
                    <th class="text-center">歌手</th>
                    <td class="text-center">操作</td>
                </tr>
            </thead>
            <tbody class="text-center"></tbody>
        </table>
    </div>
    <div class="audio">
        <p class="text-primary">  -------- </p>
        <audio id="audio" src="" controls="controls"></audio>
        <button class="glyphicon glyphicon-backward"></button>
        <button id="playMode" class="glyphicon glyphicon-th-list" mode="0"></button>
        <button class="glyphicon glyphicon-plus"></button>
        <button class="glyphicon glyphicon-align-justify"></button>
        <button class="glyphicon glyphicon-forward"></button>
        <ul id="myList"></ul>
        <ul id="asideList"></ul>
    </div>
</body>
<script src="../js/music_bar.js"></script>
<script src="../js/music_search.js"></script>
<script>
    $("#input").val(content);
    $("#search").click();
</script>
</html>