var modeArr = ["glyphicon glyphicon-th-list", "glyphicon glyphicon-refresh", "glyphicon glyphicon glyphicon-random"]; //播放模式图标
var modeindex = 0; //播放模式
var playList = []; //播放列表
var playIndex = 0; //播放序列
var playDuration = 0; //播放时间
var timer = null; //播放器运行时
var tempobj = null; //临时对象

if (getCookie("playList")) { //读取Cookie中的播放数据
    playList = JSON.parse(getCookie("playList"));
    playIndex = getCookie("playIndex") != undefined ? getCookie("playIndex") : 0;
    $("#info").text(playList[playIndex].artists + " - " + playList[playIndex].name);
    var data = `<dt>正在播放</dt>`;
    $("#asideList").html();
    for (let i = 0; i < playList.length; i++) {
        data += `<dd m_id="${playList[i]['id']}" index="${i}" onclick="play(${i})">
        ${playList[i]['artists']} - ${playList[i]['name']}
                </dd>`;
    }
    $("#asideList").html(data);
    $("#asideList>dd").attr("class", "");
    $("#asideList>dd").eq(playIndex).addClass("glyphicon glyphicon-music");
}

var user = getUser(); //获取用户缓存

function getUser() {
    let u_name = top.getCookie("u_name");
    console.log(u_name);

    if (!u_name) top.document.getElementById("main").src = "/html/login-T.html";
    return u_name;
}

function play(index, flag) { //播放：index - 播放序列，flag - 是否暂停
    if (timer) timeStop(); //杜绝出现两个定时器
    playIndex = Number(index);
    setCookie("playList", JSON.stringify(playList)); //存储播放Cookie
    setCookie("playIndex", playIndex);
    console.log(playIndex, playList, playList[playIndex]);
    $.ajax({
        url: "http://10.36.133.110:3000/song/url",
        data: "id=" + playList[playIndex].id,
        type: "get",
        dataType: "json",
        success: function (res) {
            let obj = res.data;//优先进行播放
            if (obj[0].url == null) {
                layer.msg("URL无效或暂无版权", {
                    icon: 2
                });
                $(".audio>.glyphicon-forward").click();
            } else {
                $("#info").text(playList[playIndex].artists + " - " + playList[playIndex].name);
                $("#audio").attr("src", obj[0].url).prop("autoplay", true);
                timerRun();
            }
            if (flag) {
                $("#audio").attr("src", $("#audio").attr("src")).prop("autoplay", false);
                timeStop();
            }
            $("#asideList").html();
            $("#asideList>dd").attr("class", "");
            $("#asideList>dd").eq(playIndex).addClass("glyphicon glyphicon-music"); //给正在播放的列添加正在播放的图标
        }
    });
}

$(document).on("click", function (e) { //点击其他地方使列表隐藏
    if ($(e.target).hasClass("glyphicon-align-justify")) return;
    else if ($(e.target).attr("id") === "asideList") return;
    else if ($(e.target).parent().attr("id") === "asideList") return;
    else if ($(e.target).parent().parent().attr("id") === "asideList") return;
    else if ($(e.target).parent().parent().parent().attr("id") === "asideList") return;
    $(".audio>#asideList").hide();
});

$(".audio>.glyphicon-align-justify").click(function () {
    $("#asideList").show();
});

$(".audio>.glyphicon-plus").click(showList);

function showList(obj, flag) { //flag: 是否是子框架的添加
    if (flag) tempobj = obj; // tempobj: 存储子框架的歌曲信息
    if (playList.length == 0) return;
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gl&u_name=" + user,
        dataType: "json",
        success: function (res) {
            var data = "<ul>";
            for (let item in res) {
                data += `<li class="my-list-li" list_id="${res[item]["list_id"]}" onclick="addToList(${res[item]["list_id"]}, ${flag})">${res[item]["list_name"]}</li>`;
            }
            data += "</ul>";
            layer.open({
                title: ["添加到歌单"],
                closeBtn: 1,
                type: 0,
                anim: 2,
                move: false,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: data,
                btn: []
            });
        }
    });
}

function addToList(list_id, flag) { //歌曲添加到表单   flag：是否是子框架的添加
    let song = flag ? tempobj : playList[playIndex];
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

$("#playMode").click(function () { //播放模式
    modeindex = $("#playMode").attr("mode");
    modeindex++;
    if (modeindex == 3) modeindex = 0;
    $("#playMode").attr("mode", modeindex);
    $("#playMode")[0].className = modeArr[modeindex];
});

$(".audio>.glyphicon-forward").click(function () { //下一首
    playIndex++;
    switch (modeindex) { //播放模式控制
        case 2:
            playIndex = Math.floor(Math.random() * playList.length);
            console.log(playIndex);

            break;
        case 1:
            if (playIndex == playList.length) {
                playIndex = 0;
            }
            break;
        case 0:
            if (playIndex == playList.length) {
                playIndex = 0;
                play(playIndex, true);
                return;
            }
            break;
    }
    play(playIndex);
});

$(".audio>.glyphicon-backward").click(function () { //上一首
    playIndex--;

    switch (modeindex) { //播放模式控制
        case 2:
            playIndex = Math.floor(Math.random() * playList.length);
            break;
        case 1:
            if (playIndex < 0) {
                playIndex = 0;
            }
            break;
        case 0:
            if (playIndex < 0) {
                playIndex = 0;
                play(playIndex, true);
                return;
            }
            break;
    }
    play(playIndex);
});

function timerRun() { //运行播放器
    timer = setInterval(() => {
        playDuration = parseInt($("#audio")[0].duration);
        console.log($("#audio")[0].currentTime, playDuration);
        if (playDuration)
            if ($("#audio")[0].currentTime >= playDuration) {
                $(".audio>.glyphicon-forward").click();
            }
    }, 800);
}

function timeStop() { //运行播放器
    clearInterval(timer);
    timer = null;
}