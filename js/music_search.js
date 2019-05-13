var playIndex = 0;
var playList = [];
document.domain = document.domain;

$(document).on("click", function (e) { //点击其他地方使列表隐藏
    var dom = top.document.querySelector(".audio>#asideList");
    $(dom).hide();
})

//获取用户缓存
var user = getUser();

function getUser() {
    let u_name = top.getCookie("u_name");
    console.log(u_name);

    if (!u_name) top.document.getElementById("main").src = "/html/login-T.html";
    return u_name;
}

var li = "";
$("#search").click(function () { //获取搜索结果并展示为列表
    if ($("#input").val() == "") return;
    li = "";
    $.ajax({
        url: "http://127.0.0.1:3000/search",
        type: "get",
        dataType: "json",
        data: "keywords=" + $("#input").val() + "&limit=50",
        success: function (res) {
            var songs = res.result.songs;
            playList = [];
            for (let i = 0; i < songs.length; i++) {
                let item = songs[i];
                playList.push({ //暂存播放列表
                    id: item['id'],
                    name: item['name'],
                    artists: item['artists'][0]['name']
                });
                li += `<tr m_id="${item['id']}" index="${i}">
                        <td>${item['name']}</td>
                        <td>${item['artists'][0]['name']}</td>
                        <td>
                            <a href="javascript: void(0);" class="glyphicon glyphicon-play text-primary"></a>
                            &nbsp;
                            <a href="javascript: void(0);" class="glyphicon glyphicon-plus text-primary" onclick="toParent(${i})"></a></td>
                    </tr>`;
            }
            $("#list>tbody").html(li); //显示结果列表
        }
    })
})

function toParent(index) {
    top.showList(playList[index], true);
}
$("#list>tbody").on("click", function (e) { //结果列表事件监听
    if ($(e.target).parent().parent().attr("m_id")) {
        if ($(e.target).hasClass("glyphicon-play")) {
            dealTr = $(e.target).parent().parent();
            playIndex = $(e.target).parent().parent().attr("index");
            top.playIndex = playIndex;
            top.playList = playList;
            top.getChildData(); //与父框架交互
            top.play(playIndex); //播放
        }
    }
})

function addToList(list_id, index) { //添加到歌单
    let song = playList[index];
    $.ajax({
        url: "/php/crud.php",
        data: {
            "action": "as",
            "list_id": list_id,
            "u_name": user,
            "m_id": song.id,
            "m_name": song.name,
            "m_author": song.artists
        },
        type: "get",
        dataType: "json",
        success: function (res) {
            if (res.state == 1) layer.msg("添加成功", {
                icon: 1
            });
            else layer.msg("添加失败", {
                icon: 2
            });
        }
    })
}