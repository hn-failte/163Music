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
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gl&u_name="+user,
        dataType: "json",
        success: function(res){
            var data="";
            $("#ul").html("");
            for(let item in res){
                data += `
                        <li class="my-li" list_id="${res[item]["list_id"]}" onclick="listExtend(${res[item]["list_id"]})">
                            <img src="../img/images/c_06.jpg" alt="" class="myli-img">
                            <span>${res[item]["list_name"]}</span>
                            <p>${user}</p>
                            <ul></ul>
                        </li>
                        `
                // data+=`<li list_id="${res[item]["list_id"]}"><span class="glyphicon glyphicon-chevron-right"></span>${res[item]["list_name"]}<ul class="song_ul"></ul></li>`;
            }
            $("#ul").html(data);
            if($("#ul").html()!="") $("#ul>li").eq(0).click();
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

function listExtend(list_id){
    $.ajax({
        url: "/php/crud.php",
        type: "get",
        data: "action=gs&list_id="+list_id+"&u_name="+user,
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
                data += `
                        <li>
                            <span onclick="toParent(${i})" index="${i}">操作</span>
                            <b>${res[i]["m_name"]}</b>
                            <em>${res[i]["m_author"]}</em>
                            <div>专辑名称</div>
                        </li>
                        `
            }
            $("#songs").html(data);
            console.log(playList);
            
        }
    });
}

function toParent(index){
    playIndex = index;
    top.playIndex=playIndex;
    top.playList=playList;
    top.getChildData();
    top.play(playIndex);
}