// Canvas Init
var c = document.getElementById('bubbles'),
    ctx = c.getContext('2d'),
    width = window.innerWidth,//返回窗口的文档显示区的宽度
    height = window.innerHeight,//返回窗口的文档显示区的高度
    particles = 60,//水泡数量
    minRadius = 5,//最小半径
    maxRadius = 20,//最大半径
    speed = 0.01,//速度
    x = width / particles;//初始坐标。60/窗口宽度

// Bubbles-泡沫
var Bubbles = [];//建立一个空数组

for (var i = 0; i < particles; i++) {//循环水泡随机出现的数量（即Bubbles数组的长度，60）
    Bubbles.push({//用json把下面变量作为一个水泡的总属性
        x: i * x,//水泡出现的横坐标(不断增大)
        y: height * Math.random(),//水泡随机出现的纵坐标
        r: minRadius + Math.random() * (maxRadius - minRadius),//水泡随机出现的半径,Math.random()返回一个[0,1)的随机数
        speed: 10 * Math.random()//水泡出现的随机速度
    });
}

function bubble() {//水泡函数

    c.width = width;//画布宽度=窗口宽度
    c.height = height;//画布高度=窗口高度
    for (var i = 0; i < Bubbles.length; i++) {//循环出现保证水泡都在画布之内(1/60),超过为false--为水泡横坐标
        var b = Bubbles[i];//把水泡赋值到b上
        console.log(i, b);
        ctx.beginPath();//开始画水泡
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);//随机画水泡

        b.alpha = 0.5 * (b.y / height);//水泡圈内的颜色变随机透明，数值非常小
        b.speed += speed;//水泡随机速度＋0.01--加快一点

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";//填充边框白色，透明度为0.5
        ctx.stroke();
        ctx.fillStyle = "hsla(203, 75%, 69%," + b.alpha + ")";//203蓝色，75%饱和度，69%亮度
        ctx.fill();
        b.y -= b.speed;//形成水泡向上走，控制纵坐标
        if (b.y < 0) {//如果超过窗口-高度，重新回到让纵坐标原始位置（下面）
            b.y = height;
            b.speed = Math.random() * 5;//给回来的水泡随机速度
        }
    }
}

// Draw
function draw() {
    bubble();//调用画水泡函数
    window.requestAnimationFrame(draw);//用一个窗口调用requestAnimationFrame功能，回调draw函数功能，形成一个循环，类似定时器
}

// Resize Canvas
function resizeCanvas() {//该函数功能：调用draw函数，让其能够在画布中实现定时器的功效以及画出水泡
    width = window.innerWidth,
        height = window.innerHeight;
    c.width = width;
    c.height = height;
    draw();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);//监听事件，参数一是事件类型，参数二是事件触发后调用的函数，false为冒泡传递