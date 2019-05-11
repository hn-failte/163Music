<?php
if(isset($_GET["id"])){
    $id = $_GET["id"];
    echo "<script>var id=$id;</script>";
}
else{
    echo "<script>location.href='/html/music_search.html'</script>";
    die();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../lib/jquery.js"></script>
    <link rel="stylesheet" href="../css/music_bar.css">
    <title>Document</title>
</head>
<body>
    <img id="cover" src="" width="200" height="200">
    <h2 id="name"></h2>
    <p id="createTime">创建日期</p>
    <p id="tags">标签：</p>
    <p id="desc">介绍：</p>
    <ul id="ul"></ul>
</body>
<script src="/js/list_detail.js"></script>
</html>