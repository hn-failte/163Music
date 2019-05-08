
// 链式运动
function animate(ele,obj,fn){
	if(!obj.time){
		obj.time = 20;
	}
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var flag = true;//表示所有属性都到达了目标值了。
		for(var attr in obj.param){
			var current = 0;
			if(attr == "opacity"){
				current = getStyle(ele,attr)*100;
			}else{
				current = parseInt(getStyle(ele,attr));
			}
			var speed = (obj.param[attr] - current)/10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(current != obj.param[attr]){
				flag = false;
			}
			if(attr == "opacity"){
				ele.style[attr] = (current + speed)/100;
			}else if(attr == "zIndex"){
				ele.style[attr] = obj.param[attr];
			}else{
				ele.style[attr] = current + speed + "px";
			}
			
		}
		
		if(flag){//所有属性都到达了目标值了。
			clearInterval(ele.timer);
			if(fn){
				fn();
			}
		}
	},obj.time);
}
function getStyle(ele,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}