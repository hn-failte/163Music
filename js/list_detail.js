var playList = [];
var playIndex = 0;
document.domain = document.domain;

$(document).on("click", function (e) { //点击其他地方使列表隐藏
    var dom = top.document.querySelector(".audio>#asideList");
    $(dom).hide();
})

$.ajax({
    url: "http://127.0.0.1:3000/playlist/detail",
    data: "id=" + id,
    dataType: "json",
    type: "get",
    success: function (res) {
        if (res.code != 200) {
            alert('error');
            return;
        }
        var list = res.playlist;
        $("#cover").attr("src", list.coverImgUrl);
        $("#name").text(list.name);
        $("#createTime").text(parseTime(list.createTime));
        $("#tags").html(list.tags.toString());
        $("#desc").text(list.description);
        var data = "";
        for (let i = 0; i < list.tracks.length; i++) {
            playList.push({ //暂存播放列表
                id: list.tracks[i]['id'],
                name: list.tracks[i]['name'],
                artists: list.tracks[i].ar[0].name
            });
            data += `<li onclick="goPlay(${i})">${list.tracks[i].name} ${list.tracks[i].ar[0].name}</li>`;
        }
        $("#ul").html(data);
    }
})

function parseTime(ms) {
    var hours = (ms) / 3600000;
    var days = hours / 24;
    var years = parseInt(days / 365);
    var year = 1970 + years;
    var rest = ms - 3600000 * 24 * 365 * years;
    var month = parseInt(rest / (3600000 * 24 * 30)) + 1;
    var day = parseInt((rest - parseInt(rest / (3600000 * 24 * 30)) * 3600000 * 24 * 30) / (3600000 * 24));
    return year + "-" + month + "-" + day;
}

function goPlay(index) {
    console.log(index);

    playIndex = index;
    top.playIndex = playIndex;
    top.playList = playList;
    top.getChildData(); //与父框架交互
    top.play(index); //播放
}