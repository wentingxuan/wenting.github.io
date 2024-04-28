
>  原理

在按下的时候开始画线，移动的过程中跟随鼠标坐标持续画线,
所以，我们需要监听鼠标按下移动事件， `mouse`

>  雏形

首先需要创建一个canvas

```html
<canvas id="cvs"></canvas>
```

然后我们获取到这个元素并对其挂载上按下移动抬起的事件
```js
const cvs = document.getElementById('cvs')
cvs.addEventListener('mousedown', (e) => {})
cvs.addEventListener('mousemove', (e) => {})
cvs.addEventListener('mouseup', (e) => {})
```

我们需要在鼠标按下状态时，再对移动事件进行处理，所以定义一个变量来存储是否是按下状态
```js
const cvs = document.getElementById('cvs')
let isDown = false
cvs.addEventListener('mousedown', (e) => {
  isDown = true
})
cvs.addEventListener('mousemove', (e) => {
  if(!isDown) {
    return
  }
})
cvs.addEventListener('mouseup', (e) => {
  isDown = false
})
```

>  开始绘制

在我们按下鼠标移动的过程中，会记录下非常多的点，将这些点连成线，就可以描绘出鼠标移动的轨迹

```js
const cvs = document.getElementById('cvs')
const ctx = cvs.getContext('2d')
let isDown = false
cvs.addEventListener('mousedown', (e) => {
  isDown = true
  console.log(e)
  ctx.moveTo(e.pageX, e.pageY)
})
cvs.addEventListener('mousemove', (e) => {
  if(!isDown) {
    return
  }
  ctx.lineTo(e.pageX, e.pageY)
  ctx.stroke()
})
cvs.addEventListener('mouseup', (e) => {
  isDown = false
})
```
![avatar](./../images/css/canvas/1.png)

> 自定义样式

```js
const drawLine = (x,y) => {
  ctx.beginPath();
  ctx.lineWidth = 8;  // 线宽度
  ctx.strokeStyle = 'brown';  //线颜色
  ctx.lineCap = 'round'
  ctx.lineJoin = "round";
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x;
  lastY = y;
}

```

![avatar](./../images/css/canvas/2.png)

> 回撤

回撤需要先对之前绘制的图形进行保存，按下到抬起算一次操作

先定义一个`historyArr`对操作过程进行存储, 定义一个变量保存当前操作信息

```js
let historyArr = []
let currentPath = {}
```

鼠标按下时，开始记录当前操作
```js
currentPath = {
  color: ctx.strokeStyle,
  width: ctx.lineWidth,
  points: [{ x: e.pageX, y: e.pageY }]
}
```

鼠标移动过程中，对绘制的点进行存储

```js
currentPath.points.push({ x: e.pageX, y: e.pageY });
```

鼠标抬起时，将本次绘制记录存储到`historyArr`中
```js
historyArr.push(currentPath)
```

进行回退操作，需要在历史记录中从最后一条进行删除
```js
revoke.addEventListener('click', function() {
  if (historyArr.length === 0) return;
  // 删除最后一条的记录
  historyArr.pop()
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawPaths(historyArr);
})

function drawPaths(paths) {
  paths.forEach(path => {
    ctx.beginPath();
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.width;
    ctx.moveTo(path.points[0].x, path.points[0].y);
    // path.points.slice(1) 少画 与  path.points 区别是少画一笔和正常笔数
    path.points.slice(1).forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  });
}
```

> 保存

保存图片主要是通过 canvas.toDataURL 生成的是base64，
然后通过a标签进行下载

```js
saveBtn.addEventListener('click',()=>{
  let imgURL = canvas.toDataURL({format: "image/png", quality:1, width:600, height:400});
  let link = document.createElement('a');
  link.download = "tupian";
  link.href = imgURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})

```