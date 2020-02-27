var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;//clientWidth:对象内容的可视区宽度，会随对象显示大小变化而变化
canvas.height = document.body.clientHeight;

var width = canvas.width;
var height = canvas.height;
var leaf = document.querySelector('#leaf');//返回文档中与指定选择器或选择器组匹配的第一个html元素Element(即树叶)
var leafs = [];//定义一个为leafs的空数组
var count = 100;//树叶飘落的次数以及树叶的数量（随机出现在定义的数量范围内）

for (var i = 0; i < count; i++) {//循环出现树叶飘落的次数和随机树叶数量
    var angle = 15 + Math.random() * 45; //树叶偏移的角度（原始参数）
    var dir = [-1, 1][Math.floor(Math.random() * 2)];//[-1,1]表示树叶偏移速率，[Math.floor(Math.random()*2)]向下取整保证叶子能够随机偏移（按角度随机）

    leafs.push({//用了json方法
        x: Math.random() * width,//树叶随机出现的x坐标，*width保证在整个画布最上面的x坐标出现
        y: Math.random() * height,//树叶随机出现的y坐标，*height保证在整个画布随机出现
        w: 30,//树叶宽度
        h: 30 * (leaf.height / leaf.width),//树叶高度，*(leaf.height / leaf.width)
        v: 35 / angle,//树叶垂直下落的速度
        a: angle,
        d: dir,
        anim: true
    });
}

function update(dt) {
    for (var i = 0; i < leafs.length; i++) {
        if (leafs[i].anim) {//在为true状态下，当前树叶y坐标＋下降速率(y坐标)，保证树叶向下运动
            leafs[i].y += leafs[i].v;
            if (leafs[i].y > height) {//如果超过了画布宽度让树叶重新回到起点位置下落
                leafs[i].y = -120;
                leafs[i].x = Math.random() * width;
            }
        }
    }
}

function draw(dt) {
    requestAnimationFrame(draw); //requestAnimationFrame类似于setTimeout,针对帧动画,但使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。主要用途是按帧对网页进行重绘
    update(dt);//功能：让树叶下落

    ctx.clearRect(0, 0, width, height);//每次画之前清除画布，保证树叶能够画出

    for (var i = 0; i < leafs.length; i++) {
        ctx.save();//保存画布原始坐标

        if (leafs[i].anim) {
            ctx.translate(leafs[i].x, leafs[i].y);//改变画布原点，随树叶随机出现而作画（新画布）

            ctx.rotate(
                leafs[i].d * Math.sin(dt * 0.005 * i * 0.005) * (leafs[i].a) * Math.PI / 180   //dt是会旋转的树叶（对象）
            );
        }

        ctx.globalAlpha = Math.max(0, leafs[i].y * 0.1);//树叶不再可视窗时到可视窗有一个过渡效果，相当于alpha
        ctx.drawImage(leaf, leafs[i].w, 70, leafs[i].w, leafs[i].h);//绘制图片，第二个参数和第三个参数是绘制图片的左上角位置

        ctx.restore();
    }
}

draw();