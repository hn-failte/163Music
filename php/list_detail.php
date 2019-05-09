<?php

if(isset($_GET["id"])){
    $id = $_GET["id"];
    echo "<script>var id=$id;</script>";
}
else{
    echo "<script>location.href='http://10.36.133.110:8086/html/music_search.html'</script>";
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
    <div class="audio">
        <p></p>
        <audio id="audio" src="" controls="controls"></audio>
        <button class="glyphicon glyphicon-align-justify"></button>
        <ul id="asideList">
        </ul>
    </div>
</body>
<script src="../js/music_bar.js"></script>
<script>
    $.ajax({
        url: "http://10.36.133.110:3000/playlist/detail",
        data: "id="+id,
        dataType: "json",
        type: "get",
        success: function(res){
            if(res.code!=200) {
                alert('error');
                return;
            }
            var list=res.playlist;
            $("#cover").attr("src", list.coverImgUrl);
            $("#name").text(list.name);
            $("#createTime").text(parseTime(list.createTime));
            $("#tags").html(list.tags.toString());
            $("#desc").text(list.description);
            var data="";
            for(let item of list.tracks){
                data+=`<li m_id="${item.id}">${item.name} ${item.ar[0].name}</li>`;
            }
            $("#ul").html(data);
        }
    })

    function parseTime(ms){
        var hours=(ms)/3600000;
        var days=hours/24;
        var years=parseInt(days/365);
        var year=1970+years;
        var rest=ms-3600000*24*365*years;
        var month=parseInt(rest/(3600000*24*30))+1;
        var day=parseInt((rest-parseInt(rest/(3600000*24*30))*3600000*24*30)/(3600000*24));
        return year+"-"+month+"-"+day;
    }

    
    $("#ul").on("click", function(e){
        if($(e.target).parent().attr("m_id") || $(e.target).attr("m_id")){
            var dealUl;
            if($(e.target).parent().attr("m_id")) dealUl = $(e.target).parent();
            else dealUl = $(e.target)
            play(dealUl);
        }
    })
</script>
</html>