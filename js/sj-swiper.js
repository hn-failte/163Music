class Swiper{
    constructor(){
        this.$imageBox = this.getDom('.imageBox');
        this.$tipsBox = this.getDom('.tipsBox');
        this.$box = this.getDom('.box');
        this.$liAll = this.getDomA('.lil');
        this.$imageWidth = this.$box.clientWidth;
        this.$pAll = this.getDomA('.pl');
        this.leftBtn = this.getDom('.leftBtn');
        this.rightBtn = this.getDom('.rightBtn');
        this.$first = this.$liAll[0];
        this.$last = this.$liAll[this.$liAll.length - 1];
        this.showIndex = 0;
        this.timer = null;
        this.$color = ['rgb(24, 24, 24)', 'rgb(11, 87, 111)', 'rgb(2, 6, 7)', 'rgb(208, 164, 153)', 'rgb(180, 108, 153)', 'rgb(241, 242, 244)', 'rgb(255, 114, 0)', 'rgb(242, 237, 233)', 'rgb(82, 204, 153)'];
        this.$swiperBox = this.getDom('.swiperBox');
    }
    // 入口函数,相当于一个大总闸,控制所有的函数执行
    init(){
        this.addImg();
        this.getIndex();
        this.event();
        this.showImg(this.showIndex);
        this.autoPlay();
    }
    // 获取dom元素
    getDom(ele){
        return document.querySelector(ele);
    }
    getDomA(ele){
        return document.querySelectorAll(ele);
    }
    addImg(){
        // 克隆第一张图片并加到$imageBox里最后,伪造最后一张图片
        this.$imageBox.appendChild(this.$first.cloneNode(true));
        // 克隆最后一张图片并加到$imageBox里最前面,伪造第一张图片
        this.$imageBox.insertBefore(this.$last.cloneNode(true), this.$first);
        // 默认left,初始状态下显示真正的第一张图片
        this.$imageBox.style.left = -this.$imageWidth + 'px';
    }
    event(){
        var _this = this;
        // 鼠标移入小圆点,利用事件委托,获取当前圆点的index
        // 执行showImg()函数
        // 重新执行自动播放autoPlay()函数
        this.$tipsBox.onmouseover = function(e){
            var e = e || event;
            var target = e.target || e.srcElement;
            if(target.nodeName == 'P'){
                var index = target.index;
                _this.showImg(index);
                _this.autoPlay();
            }
        }
        // 点击下一张按钮
        // 执行showImg()函数,showIndex加1
        // 重新执行自动播放autoPlay()函数
        this.rightBtn.onclick = function(){
            _this.showImg(_this.showIndex + 1)
            _this.autoPlay();
        }
        // 点击上一张按钮
        //执行showImg()函数,showIndex减1
        // 重新执行自动播放autoPlay()函数
        this.leftBtn.onclick = function(){
            _this.showImg(_this.showIndex - 1)
            _this.autoPlay();
        }
    }

    // 循环$pAll对象,给每一个$pAll加一个index属性,属性值分别为0,1,2,3,4,5
    getIndex(){
        for(var i = 0; i < this.$pAll.length; i++){
            this.$pAll[i].index = i;
        }
    }
    showImg(index){
        // 最小值判断当index小于0时,图片位置立马跳到最后一张
        if(index < 0){
            index = this.$pAll.length - 1
            this.$imageBox.style.left = -this.$imageWidth * (this.$liAll.length + 1) + 'px';
        }
        // 最大值判断当index大于最大值时,图片跳到第一张,let为0
        if(index > this.$pAll.length - 1){
            index = 0
            this.$imageBox.style.left = 0;
        }
        

        // 没有过渡直接跳到下一张图片
        // this.$imageBox.style.left = -this.$imageWidth * (index + 1) + 'px';

        // move()调用了一个封装运动函数,实现图片之间的平滑过渡,代码在下方
        // move(this.$imageBox, 'left', -this.$imageWidth * (index + 1));
        animate(this.$imageBox, {
            param : {
                'left' : -this.$imageWidth * (index + 1),
            }
        })

        // 把index值赋给showIndex,方便给autoPlay()使用
        this.showIndex = index;
        // 循环$pAll,先将全部的小圆点的class名删除
        this.$pAll.forEach(x => {
            x.classList.remove('active');
        });
        // 将展示图片对应的小圆点class名加上
        this.$pAll[index].classList.add('active');
    };
    autoPlay(){
        clearInterval(this.timer);
        this.timer = setInterval( _ => {
            this.showImg(this.showIndex + 1);
            this.$swiperBox.style.background = this.$color[this.showIndex];
        },1500);
    }
}
// 实例化出来的对象
var swiper = new Swiper();
// 执行入口函数init()
