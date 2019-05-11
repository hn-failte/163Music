document.domain = document.domain;
var playIndex=0;
var playList = [];
var user;

$().ready(function(){
    user = getUser();
    if(user) getList(user);
})

function getUser(){
    let u_name = top.getCookie("u_name");
    console.log(u_name);
    
    if(!u_name) top.document.getElementById("main").src = "/html/login-T.html";
    return u_name;
}

$(document).on("click", function(e){ //点击其他地方使列表隐藏
    var dom = top.document.querySelector(".audio>#asideList");
    $(dom).hide();
})

function getList(user) {
    console.log(user);
    
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gl&u_name="+user,
        dataType: "json",
        success: function(res){
            var data="";
            for(let item in res){
                data+=`<li list_id="${res[item]["list_id"]}"><span class="glyphicon glyphicon-chevron-right"></span>${res[item]["list_name"]}<ul class="song_ul"></ul></li>`;
            }
            $("#ul").html(data);
        }
    });
}

$("#btn").click(function(){
    layer.prompt({title: "输入歌单名", formType: 0}, function(pass, index){
        if(pass!=""){
            layer.close(index);
            $.ajax({
                url: "/php/crud.php",
                data: "action=cl&list_name="+pass+"&u_name="+user,
                type: "get",
                dataType: "json",
                success: function(res){
                    if(res.state==1){
                        layer.msg("添加成功", {icon: 1}, function(){
                            getList(user);
                        });
                    }
                    else{
                        layer.msg("添加失败", {icon: 2});
                    }
                }
            });
        }
    });
});

$("#ul").on("click", function(e){
    if($(e.target).parent().attr("list_id") || $(e.target).attr("list_id")){
        var dealUl;
        if($(e.target).parent().attr("list_id")) dealUl = $(e.target).parent().children().eq(1);
        else dealUl = $(e.target).children().eq(1);
        var icon = dealUl.parent().children().eq(0);
        
        if(icon.hasClass("glyphicon-chevron-right")){
            icon[0].className="";
            icon.addClass("glyphicon glyphicon-chevron-down");
        }
        else if(icon.hasClass("glyphicon-chevron-down")){
            icon[0].className="";
            icon.addClass("glyphicon glyphicon-chevron-right");
        }
        if(dealUl.html()=="") listExtend(dealUl);
        else dealUl.toggle();
    }
    else if($(e.target).attr("m_id")){
        playIndex = $(e.target).attr("index");
        top.playIndex = playIndex;
        top.playList = playList;
        top.play(playIndex);
    }
})


function listExtend(jqobj){
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gs&list_id="+jqobj.parent().attr("list_id")+"&u_name="+user,
        dataType: "json",
        success: function(res){
            var data = "";
            playList = [];
            for(let i=0; i<res.length; i++){
                playList.push({
                    id: res[i]['m_id'],
                    name: res[i]['m_name'],
                    artists: res[i]["m_author"]

                });
                data+=`<li m_id="${res[i]["m_id"]}" index="${i}">${res[i]["m_name"]} ${res[i]["m_author"]}</li>`;
            }
            jqobj.html(data);
        }
    });
}