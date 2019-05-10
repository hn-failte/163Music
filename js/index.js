$("#main").css("height", window.innerHeight-91-80+"px");

var iWindow=top.frames["main"];
var iDocument=iWindow.document;

document.domain = window.location.hostname;

function getChildData(){
    playIndex = top.playIndex;
    playList = top.playList;
    var data = `<dt>正在播放</dt>`;
    $("#asideList").html();
    for(let i=0;i<playList.length;i++){
        data += `<dd m_id="${playList[i]['id']}" index="${i}" onclick="play(${i})">
        ${playList[i]['artists']} - ${playList[i]['name']}
                </dd>`;
    }
    $("#asideList").html(data);
}

$("#go_my_list").click(function(){
    $("#main").attr("src", "/html/my_list.html");
})