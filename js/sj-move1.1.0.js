// 如果多个参数需要选填, 把多个参数当成一个对象, 这样就没有先后顺序问题了
function move(ele, attr, target, options) {
    // 把options里面传入的参数, 替换__default
    const __default = {
        time: 400,
        callback: null,
        ...options
    }
    let $box = ele;
    if (typeof ele == 'string') {
        $box = $(ele);
    }
    clearInterval($box.timer);
    let init = parseFloat(getStyle($box, attr));
    if (attr == 'opacity') {
        init *= 100;
    }
    // (目标值 - 初始值) / 次 = (时间 / 频率)
    let speed = (target - init) / (__default.time / 10);
    $box.timer = setInterval(function () {
        init += speed;
        if ((speed <= 0 && init <= target) || (speed >= 0 && init >= target)) {
            // 终止运动条件
            init = target;
            clearInterval($box.timer);
            if (typeof __default.callback == 'function')
                __default.callback($box);
        }
        if (attr == 'opacity') {
            $box.style[attr] = init / 100
        } else {
            $box.style[attr] = init + 'px';
        }
    }, 10)
}

function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    } else {
        return ele.currentStyle[attr];
    }
}