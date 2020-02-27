window.onload=function(){
        showTime();
        xsyd();
        wfgd();
        wenzibb();
        hdp();
        xuanxxiangka();
        danrudanchu();
        fenxiangdao()
}

//top右侧时间变换
function showTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; //js获取的月份是从0开始；
    var day = now.getDate();

    var weekday = new Array(7);
    weekday[0] = "星期日";
    weekday[1] = "星期一";
    weekday[2] = "星期二";
    weekday[3] = "星期三";
    weekday[4] = "星期四";
    weekday[5] = "星期五";
    weekday[6] = "星期六";
    var w = weekday[now.getDay()]; //js获取的星期是0~6,0是星期天；
    document.getElementById("time").innerHTML = year + "年" + month + "月" + day + "日" + "  " + w;
}

//导航栏小树移动
function xsyd(){
    var oNav=document.getElementById('nav_id');
    var liArr=oNav.getElementsByTagName('li');
    var liWidth=liArr[0].offsetWidth;//offsetWidth:对象宽度，会随窗口而自动变化
    var span=document.getElementsByTagName('span')[0];
    var count=0;

    for(var i=0;i<liArr.length;i++){
        liArr[i].index=i;
        liArr[i].onmouseover=function (){
            animate(span,this.index*liWidth+7);
        }
        liArr[i].onmouseout=function (){
            animate(span, count * liWidth+7);
        }
    }

function animate(ele,target){//缓冲运动，距离越小，速度小，距离越大，速度越大
    clearInterval(ele.timer);//清理定时器，防效果重叠
    ele.timer=setInterval(function (){
          var speed=(target-ele.offsetLeft)/10;//物体运动速度=(目标点-当前左坐标)/10，/越大越慢 
          speed=speed>0?Math.ceil(speed):Math.floor(speed);//速度不能为小数，ceil向上取整
          ele.style.left=ele.offsetLeft+speed+"px";//目标点=当前左坐标+速度(每个18ms加一次)
          if(Math.abs(target-ele.offsetLeft)<Math.abs(speed)){//匀速运动的防止超越目标点，让它直接等于目标点
              ele.style.left=target+"px";
              clearInterval(ele.timer);
          }
    },18)
}
}


//图片无缝滚动
function  wfgd() {
    var oDiv1 = document.getElementById('wufenggundong');
    var oUl = oDiv1.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');

    oUl.innerHTML += oUl.innerHTML;//让ul里面的li能够不断从后面重复出现，叠加
    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';//ul的长度=一个li长度*个数
    var speed = -2;//向左
    function move() {
        if (oUl.offsetLeft < -oUl.offsetWidth / 2) {//oUl.offsetLeft为负值，-oUl.offsetWidth / 2滚到一半瞬速拉回
            oUl.style.left = '0';
        };
        oUl.style.left = oUl.offsetLeft + speed + 'px';//向左滚动，速度负值
    };

    var timer = setInterval(move, 30);
    oDiv1.onmouseover = function () {
        clearInterval(timer);
    }

    oDiv1.onmouseout = function () {
        timer = setInterval(move, 30);
    }
};


//文字播报
function wenzibb() {
    var oDiv1 = document.getElementById('wenzibb');
    var oUl = oDiv1.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');

    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    var speed = -2;
    function move() {
        if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
            oUl.style.left = '0';
        };
        if (oUl.offsetLeft > 0) {
            oUl.style.left = -oUl.offsetWidth / 2 + 'px';
        };
        oUl.style.left = oUl.offsetLeft + speed + 'px';
    };

    var timer = setInterval(move, 30);
    oDiv1.onmouseover = function () {
        clearInterval(timer);
    }

    oDiv1.onmouseout = function () {
        timer = setInterval(move, 30);
    }
};


/*幻灯片*/
function hdp() {
    var oDiv = document.getElementById("huandeng");
    var aBtn = oDiv.getElementsByTagName('ol')[0].getElementsByTagName('li');
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var now = 0;

    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;
        aBtn[i].onclick = function () {
            now = this.index;
            tab();
        };
    }
    function tab() {
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].className = '';
        }
        aBtn[now].className = 'actived';
        move(oUl, { top: -360 * now });
    }

    function next() {
        now++;
        if (now == aBtn.length) {
            now = 0;
        }

        tab();
    }

    var timer = setInterval(next, 3000);

    oDiv.onmouseover = function () {
        clearInterval(timer);
    };

    oDiv.onmouseout = function () {
        timer = setInterval(next, 3000);
    };
};


function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}

//move(oDiv,{width:300,height:300})
function move(obj, json, fnEnd) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var bStop = true;
        for (attr in json) {
            var cur = 0;
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[attr])
                bStop = false;

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
    }, 30);
}


/*选项卡*/
function xuanxxiangka() {
    var obj1 = document.getElementById("xxk");
    var obj2 = obj1.getElementsByTagName("input");
    var obj3 = obj1.getElementsByTagName("div");
    for (var i = 0; i < obj2.length; i++) {
        obj2[i].index = i;
        obj2[i].onmouseover = function () {
            for (var i = 0; i < obj2.length; i++) {
                obj2[i].className = "";
                obj3[i].style.display = "none";
            }
            this.className = "active";
            obj3[this.index].style.display = "block";
        }
    }
}



/*淡入淡出*/
function danrudanchu() {
    var dan = document.getElementById('huanbaobao')
    var oDiv =dan.getElementsByTagName('div');

    for (var i = 0; i < oDiv.length; i++) {
        oDiv[i].timera = null;
        oDiv[i].alpha = 30;
        oDiv[i].onmouseover = function () {
            danru(this, 100);
        }
        oDiv[i].onmouseout = function () {
            danru(this, 30);
        }
    }
}

var alpha=30;
var timera=null;
function danru(obj, iFrage) {
    clearInterval(obj.timera);

    obj.timera = setInterval(function () {
        var speed = (iFrage - obj.alpha) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (iFrage == obj.alpha) {
            clearInterval(timera);
        } else {
            obj.alpha += speed;
            obj.style.filter = 'alpha(opacity:' + obj.alpha + ')';
            obj.style.opacity = obj.alpha / 100;
        }
    }, 30)
}




/*侧边广告*/
window.onscroll = function () {
    var oDiv = document.getElementById('cebianlan');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;


    startMove((document.documentElement.clientHeight - oDiv.offsetHeight) / 2 + scrollTop);

}

var timerr = null;
function startMove(iFrage) {
    clearInterval(timerr);
    var oDiv = document.getElementById('cebianlan');
    timerr = setInterval(function () {
        var speed = (iFrage - oDiv.offsetTop) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (speed == iFrage) {
            clearInterval(timerr);
        } else {
            oDiv.style.top = oDiv.offsetTop + speed + 'px';
        }
    }, 30);

}


/*分享到*/
function fenxiangdao() {
    var oDiv = document.getElementById('fenxiangdao');

    oDiv.onmouseover = function () {
        startMove2(0);

        oDiv.onmouseout = function () {
            startMove2(-150);
        }
    }
};
var timer = null;
function startMove2(iFrage) {
    clearInterval(timer);
    var oDiv = document.getElementById('fenxiangdao');
    timer = setInterval(function () {
        var speed = 0;
        if (oDiv.offsetLeft > iFrage) {
            speed = -10;
        } else {
            speed = 10;
        }
        if (oDiv.offsetLeft == iFrage) {
            clearInterval(timer);
        } else {
            oDiv.style.left = oDiv.offsetLeft + speed + 'px';
        }
    }, 30)
}