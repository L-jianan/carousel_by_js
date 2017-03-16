// 该动画函数通过修改对象的offsetLeft值达到和设置的目标target一致来完成动画
// 封装动画函数，传入需要动画的对象，和动画终点
function animate(obj,target,fn){   
    // 如果该对象已经处在动画中，动画尚未完成，再次动画，清除之前未完成的动画
    if(obj.timer){
        clearInterval(obj.timer);
    }
    // 定时器控制动画
    obj.timer = setInterval(function(){
        // 获取元素相对父元素的距离
        var leader = obj.offsetLeft;
        // 定义每次移动的距离
        var step = 15;
        // 控制方向
        if(target < leader){
            step = -step;
        }
        // 判断距离终点的距离够不够一步，如果够，就走一步，不够就清除定时器，直接设置达到终点
        var distance = Math.abs(leader - target);
        if(distance > Math.abs(step)){
            leader = leader + step;
            obj.style.left = leader + 'px';
        }else{
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
            fn&fn();
        }
    },15)
}