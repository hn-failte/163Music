
var home = (function(){
    var $ajaxDoc = document.querySelector('.ajaxDoc');
    var $todayWeek = document.querySelector('.todayWeek');
    var $todayDay = document.querySelector('.todayDay');
    var $backTop = document.querySelector('.backTop');
    var $reco2 = document.querySelector('.reco2');
    var $pub = document.querySelector('.pub');
    var $anchoData = document.querySelector('.anchoData');
    var $newSing = document.querySelector('.newSing');
    var $rankDoc = document.querySelector('.rankDoc');
    var $rankDoc2 = document.querySelector('.rankDoc2');
    var $rankDoc3 = document.querySelector('.rankDoc3');
    return {
        init() {
            this.event();
            this.backTop();
            this.getDay();
            // 请求热门推荐数据
            // this.sendAjax({
            //     method: 'post',
            //     url: '../json/sj-json.json'
            // }).then(data => {
            //     var str = ``;
            //     data.forEach(x => {
            //         str += `
            //             <div class="photoAj">
            //                 <img class="imgph" src="${x.src}">
            //                 <div class="music">
            //                     <span class="music1"></span>
            //                     <span class="music2">${x.count}</span>
            //                     <span class="music3"></span>
            //                 </div>
            //                 <h3 class="conph">${x.content}</h3>
            //             </div>
            //         `
            //     });
            //     $ajaxDoc.innerHTML = str;
            //     var $photoAj = $ajaxDoc.children;
            //     for(var i = 0; i < $photoAj.length; i++){
            //         $photoAj[i].style.float = 'left';
            //         $photoAj[i].style.width = "140px";
            //     };
            // });
            // 请求个性化推荐数据
            this.sendAjax({
                method: 'post',
                url: '../json/sj-json.json'
            }).then(data => {
                var str = ``;
                for(var i = 0; i < 3; i++){
                    str += `
                        <li class="photoAj">
                            <img class="imgph" src="${data[i].src}">
                            <div class="music">
                                <span class="music1"></span>
                                <span class="music2">${data[i].count}</span>
                                <span class="music3"></span>
                            </div>
                            <h3 class="conph">${data[i].content}</h3>
                        </li>
                    `
                };
                $reco2.innerHTML = str;
                var $photoAj = $reco2.children;
                // console.log($photoAj)
                for(var i = 0; i < 3; i++){
                    $photoAj[i].style.float = 'left';
                    $photoAj[i].style.width = "140px";
                };
            });
            // 请求新歌曲
            this.sendAjax({
                method: 'post',
                url: '../json/sj-json.json'
            }).then(data => {
                var str = ``;
                for(var j = 0; j < 4; j++){
                    str += `
                        <div class="photoAj">
                            <img class="imgph" src="${data[j].src}">
                            <div class="music">
                                <span class="music1"></span>
                                <span class="music2">${data[j].count}</span>
                                <span class="music3"></span>
                            </div>
                            <h3 class="conph">${data[j].content}</h3>
                        </div>
                    `
                };
                $newSing.innerHTML = str;
                var $photoAj = $newSing.children;
                for(var i = 0; i < $photoAj.length; i++){
                    $photoAj[i].style.float = 'left';
                    $photoAj[i].style.width = "140px";
                };
            });
            // 请求歌手信息数据
            this.sendAjax({
                method: 'post',
                url: '../json/sj-singer.json'
            }).then(data => {
                var str = ``;
                data.forEach(x => {
                    str += `
                        <div class="pubBox">
                            <img class="pubImg" src="${x.src}">
                            <div class="pubRight">
                                <span class="pubTit">${x.title}</span>
                                <span class="pubCon">${x.content}</span>
                            </div>
                        </div>
                    `
                });
                $pub.innerHTML = str;
            });
            // 请求主播信息
            this.sendAjax({
                method: 'post',
                url: '../json/sj-singer.json'
            }).then(data => {
                var str = ``;
                for(var i = 0; i < data.length; i++){
                    str += `
                    <div class="anchoBox">
                        <img class="anchoImg" src="${data[i].src}">
                        <div class="anchoRight">
                            <span class="anchoTit">${data[i].title}</span>
                            <span class="anchoCon">${data[i].content}</span>
                        </div>
                    </div>
                    `
                };
                $anchoData.innerHTML = str;
            });
            // 请求歌单
            this.sendAjax({
                method: 'post',
                url: '../json/sj-song.json'
            }).then(data => {
                console.log(data);
                var str = ``;
                data.forEach(x => {
                    str += `
                        <div class="song">
                            <span class="song1">${x.id}</span>
                            <span class="song2">${x.name}</span>
                            <span class="song3 songPic"></span>
                            <span class="song4 songPic"></span> 
                            <span class="song5 songPic"></span>
                        </div>
                    `
                });
                $rankDoc.innerHTML = str;
                $rankDoc2.innerHTML = str;
                $rankDoc3.innerHTML = str;

                $('.ranking').on("mouseenter",".song",function(){
                    this.children[2].style.display = 'block';
                    this.children[3].style.display = 'block';
                    this.children[4].style.display = 'block';
                })
                $('.ranking').on("mouseleave",".song",function(){
                    this.children[2].style.display = 'none';
                    this.children[3].style.display = 'none';
                    this.children[4].style.display = 'none';
                })
            });
        },
        event() {

        },
        backTop(){
            $backTop.onclick = function(){
                document.documentElement.scrollTop = 0;
            }
            window.onscroll = function(){
                if(document.documentElement.scrollTop == 0){
                    $backTop.style.display = 'none';
                }
                if(document.documentElement.scrollTop > 0){
                    $backTop.style.display = 'block';
                }
            }
        },
        getDay(){
            var mydate=new Date();
            var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            $todayWeek.innerText = weekday[mydate.getDay()];
            $todayDay.innerText = mydate.getDate();
        },
        sendAjax(param){
            var promise = new Promise(function(resolve, reject){
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        resolve(JSON.parse(this.responseText));
                    }
                }
                if(param.method == 'get' && param.data){
                    xhr.open(param.mathod, param.url + '?' + param.data, true);
                }else{
                    xhr.open(param.method, param.url, true);
                }
                if(param.method == 'post'){
                    xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
                    xhr.send(param.data || '');
                }else{
                    xhr.send(null);
                }
            })
            return promise;
        }
    }
}())

home.init();