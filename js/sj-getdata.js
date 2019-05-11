$.ajax({
    // url: "http://10.36.133.110:3000/playlist/detail",
    url: "http://10.36.133.110:3000/top/playlist/highquality",
    //limit: 获取的歌单个数
    data: "limit=8&cat=华语",
    dataType: "json",
    type: "get",
    success: function (res) {
        var data = "";
        var lists = res.playlists;
        console.log(res)
        console.log(lists);

        var str = ``;
        for(var j = 0; j < lists.length; j++){
            str += `
                
                <div class="photoAj">
                    <img style="width:140px" class="imgph" src="${lists[j].coverImgUrl}">
                    <div class="music">
                        <span class="music1"></span>
                        <span class="music2">${parseInt(lists[j].playCount / 10000)}万</span>
                        <span class="music3"></span>
                    </div>
                    <h3 class="conph">${lists[j].copywriter}</h3>
                </div>
            `
        }
        
        var $ajaxDoc = document.querySelector('.ajaxDoc');
        $ajaxDoc.innerHTML = str;
            var $photoAj = $ajaxDoc.children;
            for(var i = 0; i < $photoAj.length; i++){
                $photoAj[i].style.float = 'left';
                $photoAj[i].style.width = "140px";
            };
        // $('#ul').html(str);
        // var time;
        // for (let item of lists) {
        //     time=parseTime(item.createTime);
        //     data+=`<li list_id="${item.id}"><p>歌单名：${item.name}</p><img src="${item.coverImgUrl}" /><p>播放次数：${item.playCount} 创建时间${time} 播放次数：${item.playCount} 类型：${item.tag}</p><p>歌单简介：${item.copywriter}</p><p><a href="http://10.36.133.110:8086/php/list_detail.php?id=${item.id}">进入歌单</a></p></li>`;
        // }
        // $("#ul").html(data);
        // setCookie("id", lists[0].id);//获取后默认将第一个设置为歌单列表的cookie，避免出现使用输入网页进入页面
    }
})

// function parseTime(ms){
//     var hours=(ms)/3600000;
//     var days=hours/24;
//     var years=parseInt(days/365);
//     var year=1970+years;
//     var rest=ms-3600000*24*365*years;
//     var month=parseInt(rest/(3600000*24*30))+1;
//     var day=parseInt((rest-parseInt(rest/(3600000*24*30))*3600000*24*30)/(3600000*24));
//     return year+"-"+month+"-"+day;
// }