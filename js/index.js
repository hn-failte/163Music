$("#main").css("height", window.innerHeight-91-80+"px");

document.domain = window.location.hostname;

$(".dropdown-menu>li").mouseenter(function(){
    $(this).find("a").css({
        "color":"white",  
        // "background": "url(../img/images/b2_03.jpg) no-repeat",
        // "background-size": "20px 25px"
        "background":"black"
    });
});

$(".dropdown-menu>li").mouseleave(function(){
    $(this).find("a").css({
        "color":"white",
        "background":"#2d2d2d"
    });

});

$(".btn").click(function(){
    $("#main").attr("src", "/html/login-T.html");
})
$("#go_index").click(function(){
    $("#main").attr("src", "/html/sj-home.html");
})
function goToLogin(){
    $("#main")[0].src="/html/login-T.html";
}
$(".btn").mouseenter(function(){
    $(".dropdown-menu").css("display","block");
});
$(".dropdown-menu").mouseleave(function(){
    $(".dropdown-menu").css("display","none");
});
$(".dropdown").mouseenter(function(){
    $(this).css("display","block");
});
$("#search").keydown(function(e){
    if($("#search").val()=="") return;
    if(e.keyCode==13){
        $("#main")[0].src="/php/music_search.php?content="+$("#search").val();
    }
})
function getChildData(){ //与子框架交互
    playIndex = top.playIndex;
    playList = top.playList;
    var data = `<dt>正在播放</dt>`;
    $("#asideList").html();
    for(let i=0;i<playList.length;i++){
        data += `<dd m_id="${playList[i]['id']}" index="${i}" onclick="play(${i})">
        ${playList[i]['artists']} - ${playList[i]['name']}
                </dd>`;
    }
    $("#asideList").html(data); //显示正在播放列表
}

$("#go_my_list").click(function(){
    $("#main").attr("src", "/html/my_list.html");
})