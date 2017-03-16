// 获取所需元素
var carousel = document.getElementById('carousel');
var ulList = carousel.children;
var pageControl = document.getElementById('page-control');

// 动态创建li并添加给ol
for(var i = 0; i < ulList.length; i++){
    var li = document.createElement('li');
    li.innerHTML = i + 1;
    pageControl.appendChild(li);
}

// 获取ol的li
var olList = pageControl.children;
olList[0].className = 'current';

// 创建假图片添加到ul中
var cloneLi = ulList[0].cloneNode(true);
carousel.appendChild(cloneLi);

// 处理箭头
var container = document.getElementById('container');
var arr = document.getElementById('arr');

var timer = null;

// 当鼠标移入容器，显示箭头，否则不显示
container.onmouseover = function(){
    arr.style.display = 'block';
    clearInterval(timer);
}
container.onmouseout = function(){
    arr.style.display = 'none';
    
    timer = setInterval(function(){
        arrRight.click();
    },2500);
}

// 获取轮播图可显示区域宽高
var box = document.getElementById('box');
var imgW = box.offsetWidth;

// 鼠标点击page-control实现轮播功能
// 用来同步
var square = 0;
for(var i = 0; i < olList.length; i++){
    olList[i].index = i;
    olList[i].onmouseover = function(){
        // 先把所有的li的current类去掉
        for(var j = 0; j < olList.length; j++){
            olList[j].className = '';
        }
        // 只给当前li添加current
        this.className = 'current';
        // 移动ul
        animate(carousel,- this.index * imgW);

        // 同步page-control
        square = this.index;
        picIndex = this.index;
    }
}

// 点击箭头实现轮播功能
// 点击右箭头
// 添加节流阀
var flag = false;
var picIndex = 0;
var arrRight = document.getElementById('arrRight');
arrRight.onclick = function(){
    if(flag){
        return;
    }
    flag = true;
    if(picIndex == ulList.length - 1){
        picIndex = 0;
        carousel.style.left = 0;
    }
    picIndex++;
    animate(carousel,-picIndex*imgW,function(){
        flag = false;
    });

    if(square == olList.length - 1){
        square = 0;
    }else{
        square++;
    }
    for(var i = 0; i < olList.length; i++){
        olList[i].className = '';
    }
    olList[square].className = 'current';
}
// 点击左箭头
var arrLeft = document.getElementById('arrleft');
arrLeft.onclick = function(){
    if(flag){
        return;
    }
    flag = true;
    if(picIndex == 0){
        picIndex = ulList.length - 1;
        carousel.style.left = - picIndex * imgW + 'px';
    }
    picIndex--;
    animate(carousel,-picIndex*imgW,function(){
        flag = false;
    });

    if(square == 0){
        square = olList.length - 1;
    }else{
        square--;
    }
    for(var i = 0; i < olList.length; i++){
        olList[i].className = '';
    }
    olList[square].className = 'current';
}

// 自动轮播功能
timer = setInterval(function(){
    arrRight.click();
},2500);