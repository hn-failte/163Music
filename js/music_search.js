var playIndex=0;
var playList = [];
document.domain = document.domain;

$(document).on("click", function(e){ //点击其他地方使列表隐藏
    var dom = top.document.querySelector(".audio>#asideList");
    $(dom).hide();
})

var li = "";
$("#search").click(function(){ //获取搜索结果并展示为列表
    if($("#input").val()=="") return;
    li = "";
    $.ajax({
        url: "http://10.36.133.110:3000/search",
        type: "get",
        dataType: "json",
        data: "keywords="+$("#input").val()+"&limit=50",
        success: function(res){
            var songs = res.result.songs;
            playList = [];
            for(let i=0;i<songs.length;i++){
                let item = songs[i];
                playList.push({ //暂存播放列表
                    id: item['id'],
                    name: item['name'],
                    artists: item['artists'][0]['name']
                });
                li+=`<tr m_id="${item['id']}" index="${i}">
                        <td>${item['name']}</td>
                        <td>${item['artists'][0]['name']}</td>
                        <td>
                            <a href="javascript: void(0);" class="glyphicon glyphicon-play text-primary"></a>
                            &nbsp;
                            <a href="javascript: void(0);" class="glyphicon glyphicon-plus text-primary" onclick="showList(${i})"></a></td>
                    </tr>`;
            }
            $("#list>tbody").html(li); //显示结果列表
        }
    })
})

$("#list>tbody").on("click", function(e){ //结果列表事件监听
    if($(e.target).parent().parent().attr("m_id")){
        if($(e.target).hasClass("glyphicon-play")){
            var dealTr;
            dealTr = $(e.target).parent().parent();
            playIndex = $(e.target).parent().parent().attr("index");
            top.playIndex = playIndex;
            top.playList = playList;
            top.getChildData(); //与父框架交互
            top.play(playIndex); //播放
        }
    }
})

function showList(index){ //添加歌单时显示我的歌单
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gl&u_id=1",
        dataType: "json",
        success: function(res){
            var data="<ul>";
            for(let item in res){
                data+=`<li class="my-list-li" list_id="${res[item]["list_id"]}" onclick="addToList(${res[item]["list_id"]}, ${index})">${res[item]["list_name"]}</li>`;
            }
            data+="</ul>";
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


function addToList(list_id, index){ //添加到歌单
    let song = playList[index];
    $.ajax({
        url: "/php/crud.php",
        data: {"action": "as",
                "list_id": list_id,
                "u_id": 1,
                "m_id": song.id,
                "m_name": song.name,
                "m_author": song.artists
        },
        type: "get",
        dataType: "json",
        success: function(res){
            if(res.state==1) layer.msg("添加成功", {icon: 1});
            else layer.msg("添加失败", {icon: 2});
        }
    })
}