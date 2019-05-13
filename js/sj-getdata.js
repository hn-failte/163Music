$.ajax({
    // url: "http://127.0.0.1:3000/playlist/detail",
    url: "http://127.0.0.1:3000/top/playlist/highquality",
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
        for (var j = 0; j < lists.length; j++) {
            str += `
                
                <div class="photoAj" onclick="goDetail(${lists[j].id})">
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
        for (var i = 0; i < $photoAj.length; i++) {
            $photoAj[i].style.float = 'left';
            $photoAj[i].style.width = "140px";
        };
    }
})

function goDetail(id) {
    location.href = "/php/list_detail.php?id=" + id;
}