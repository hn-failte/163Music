document.domain = document.domain;
var playIndex = 0;
var playList = [];
var user;
var currentListId = "";

$().ready(function () {
    user = getUser();
    if (user) getList(user);
})

//我的页面联动
$(".dropdown").mouseenter(function () {
    $(".dropdown-menu").show();
})
$(".dropdown-menu").mouseleave(function () {
    $(".dropdown-menu").hide();
})

function getUser() {
    let u_name = top.getCookie("u_name");
    if (!u_name) top.document.getElementById("main").src = "/html/login-T.html";
    return u_name;
}

$(document).on("click", function (e) { //点击其他地方使列表隐藏
    var dom = top.document.querySelector(".audio>#asideList");
    $(dom).hide();
})

function getList(user) {
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gl&u_name=" + user,
        dataType: "json",
        success: function (res) {
            var data = "";
            $(".left-ul").html("");
            for (let item in res) {
                data += `
                        <li list_id="${res[item]["list_id"]}" list_name="${res[item]["list_name"]}" onclick="listExtend(this)">
                            <div class="list-pic"></div>
                            <div class="list-content">
                                <p class="list-name">${res[item]["list_name"]}</p>
                                <p class="songs-number">${user}</p>
                            </div>
                        </li>
                        `
            }
            $(".left-ul").html(data);
            if ($(".left-ul").html() != "") $(".left-ul>li").eq(0).click();
        }
    });
}

$("#btn").click(function () {
    layer.prompt({
        title: "输入歌单名",
        formType: 0
    }, function (pass, index) {
        if (pass != "") {
            layer.close(index);
            $.ajax({
                url: "/php/crud.php",
                data: "action=cl&list_name=" + pass + "&u_name=" + user,
                type: "get",
                dataType: "json",
                success: function (res) {
                    getList(user);
                    if (res.state == 1) {
                        layer.msg("添加成功", {
                            icon: 1
                        });
                    } else {
                        layer.msg("添加失败", {
                            icon: 2
                        });
                    }
                }
            });
        }
    });
});

function replaceList() {
    top.playIndex = playIndex;
    top.playList = playList;
    top.getChildData();
}

function listExtend(el) {
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gs&list_id=" + $(el).attr("list_id") + "&u_name=" + user,
        dataType: "json",
        success: function (res) {
            var data = "<dt>歌曲列表</dt>";
            playList = [];
            for (let i = 0; i < res.length; i++) {
                playList.push({ //暂存播放列表
                    id: res[i]['m_id'],
                    name: res[i]['m_name'],
                    artists: res[i]["m_author"]
                });
                data += `<dd>
                            <p class="operation">
                                <span class="glyphicon glyphicon-play"  onclick="toParent(${i})" index="${i}">&nbsp;</span>
                                <span class="glyphicon glyphicon-trash" onclick="deleteSong(${i})">&nbsp;</span>
                                <span class="glyphicon glyphicon-download-alt" onclick="doDownload(${i})"></span>
                            </p>
                            <p class="player">${res[i]["m_name"]}</p>
                            <p class="song-name">${res[i]["m_author"]}</p>
                        </dd>`
            }
            $("#song-list").html(data); //写入table
            $(".half-right>div>h2").html($(el).attr("list_name") + "&nbsp;<span class='glyphicon glyphicon-pencil'></span>"); //重写标题
            $(".half-right>div>h2>span").attr("list_id", $(el).attr("list_id")); //写入id属性
            $(".half-right>div>h2>span")[0].onclick = editListName; //添加监听
            currentListId = $(el).attr("list_id");
        }
    });
}

function toParent(index) { //在父框架进行播放
    playIndex = index;
    top.playIndex = playIndex;
    top.playList = playList;
    top.getChildData();
    top.play(playIndex);
}

function doDownload(i) { //下载
    $.ajax({
        url: "http://127.0.0.1:3000/song/url",
        data: "id=" + playList[i].id,
        type: "get",
        dataType: "json",
        success: function (res) {
            saveAs(res.data[0].url, playList[i].artists + " - " + playList[i].name + ".mp3");
        }
    });
}

function editListName() { //编辑歌单名
    layer.prompt({
        title: "输入歌单名",
        formType: 0
    }, function (pass, index) {
        if (pass != "") {
            layer.close(index);
            $.ajax({
                url: "/php/crud.php",
                data: {
                    action: "ul",
                    list_id: $(".half-right>div>h2>span").attr("list_id"),
                    list_name: pass,
                    u_name: user
                },
                type: "get",
                dataType: "json",
                success: function (res) {
                    if (res.state == 1) {
                        getList(user);
                        layer.msg("修改成功", {
                            icon: 1
                        });
                    } else {
                        layer.msg("修改失败", {
                            icon: 2
                        });
                    }
                }
            });
        }
    });
}

function deleteSong(i) {
    layer.confirm('确定删除?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        $.ajax({
            url: "/php/crud.php",
            data: {
                action: "rs",
                m_id: playList[i].id,
                list_id: currentListId,
                u_name: user
            },
            type: "get",
            dataType: "json",
            success: function (res) {
                if (res.state == 1) {
                    listExtend($(".left-ul>li"));
                    layer.msg("删除成功", {
                        icon: 1
                    });
                } else {
                    layer.msg("删除失败", {
                        icon: 2
                    });
                }
            }
        });
        layer.close(index);
    });
}