function sendAjax(param){
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
            xhr.open(param.method, param.url, true)
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


var $ajaxDoc = document.querySelector('.ajaxDoc');
var $todayWeek = document.querySelector('.todayWeek');
var $todayDay = document.querySelector('.todayDay');

var mydate=new Date();
var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
console.log(weekday[mydate.getDay()]);
console.log(mydate.getDate());
$todayWeek.innerText = weekday[mydate.getDay()];
$todayDay.innerText = mydate.getDate();

sendAjax({
    method: 'post',
    url: '../json/sj-json.json'
}).then(data => {
    console.log(data);
    var str = ``;
    data.forEach(x => {
        console.log(x);
        str += `
            <div class="photoAj">
                <img src="${x.src}">
                <span>${x.count}</span>
                <h3>${x.content}</h3>
            </div>
        `
    });
    $ajaxDoc.innerHTML = str;
    var $photoAj = $ajaxDoc.children;
    // $ajaxDoc.children.style.float = 'left';
    // $ajaxDoc.children.style.width = 140;
    console.log($photoAj)
    for(var i = 0; i < $photoAj.length; i++){
        $photoAj[i].style.float = 'left';
        $photoAj[i].style.width = "140px";
    }
})