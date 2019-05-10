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
    <script src="../lib/layer/layer.js"></script>
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <span class="glyphicon glyphicon-music text-default"></span>
            <input type="text" id="input" placeholder="搜索音乐">
            <button id="search" class="btn btn-default glyphicon glyphicon-search"></button>
        </div>
        <table id="list" class="table table-bordered table-striped table-hover">
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
</body>
<script src="../js/music_search.js"></script>
</html>
<script>
    $("#input").val(content);
    $("#search").click();
</script>
</html>