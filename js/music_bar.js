var modeArr = ["glyphicon glyphicon-th-list", "glyphicon glyphicon-refresh", "glyphicon glyphicon glyphicon-random"];
var modeindex = 0;
var playList = [];
var playIndex=0;
var playDuration = 0;
var timer = null;  //播放器运行时

function play(jqobj){
    $.ajax({
        url: "http://10.36.133.110:3000/song/url",
        data: "id="+jqobj.attr("m_id"),
        type: "get",
        dataType: "json",
        success: function(res){
            let obj = res.data;
            $(".audio>p").text(jqobj.children().eq(1).text()+" - "+jqobj.children().eq(0).text());
            $("#audio").attr("src", obj[0].url).prop("autoplay", true);
            timerRun();
        }
    });
    playIndex = jqobj.attr("index");
}

$(document).on("click", function(e){ //点击其他地方使列表隐藏
    if($(e.target).hasClass("glyphicon-align-justify")) return;
    else if($(e.target).attr("id")==="asideList") return;
    else if($(e.target).parent().attr("id")==="asideList") return;
    else if($(e.target).parent().parent().attr("id")==="asideList") return;
    else if($(e.target).parent().parent().parent().attr("id")==="asideList") return;
    $(".audio>ul").hide();
});

$(".audio>.glyphicon-align-justify").click(function(){
    $("#asideList").show();
});

$(".audio>.glyphicon-plus").click(function(){
    //添加到歌单
});

$("#playMode").click(function(){ //播放模式
    modeindex = $("#playMode").attr("mode");
    modeindex++;
    if(modeindex == 3) modeindex = 0;
    $("#playMode").attr("mode", modeindex);
    $("#playMode")[0].className=modeArr[modeindex];
});

$(".audio>.glyphicon-forward").click(function(){ //下一首
    playIndex++;
    if(playIndex == $("#list>tbody>tr").length) playIndex = 0;
    play($("#list>tbody>tr").eq(playIndex));
});

$(".audio>.glyphicon-backward").click(function(){ //上一首
    playIndex--;
    if(playIndex < 0) playIndex = 0;
    play($("#list>tbody>tr").eq(playIndex));
});

function timerRun(){ //运行播放器
    timer = setInterval(() => {
        playDuration = parseInt($("#audio")[0].duration);
        console.log($("#audio")[0].currentTime , playDuration);
        
        if($("#audio")[0].currentTime >= playDuration){
            $(".audio>.glyphicon-forward").click();
            timeStop();
        }
    }, 800);
}

function timeStop(){ //运行播放器
    clearInterval(timer);
    timer = null;
}