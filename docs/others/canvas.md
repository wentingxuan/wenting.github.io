记录曾经做过的一个需求，对图片进行二次编辑，其中包括对png图进行填充、描边、增加阴影的效果。

首先获取绘图2D上下文

```
// create canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// create image
const image = new Image();
image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
};
image.src = url;
image.crossOrigin = "Anonymous";
```

一、`填充`

图片的填充比较简单，首先设置在绘制新形状时要应用的合成操作的类型为'source-in'，

```
ctx.globalCompositeOperation = 'source-in'
ctx.fillStyle = 'red'  // 想要填充的颜色
ctx.fillRect(0, 0, canvas.width, canvas.height)
```

二、`描边`

描边实现的逻辑是将原图进行一个偏移，比如描边2px，则将原图向上、下、左

右、左上、左下、右上、右下进行偏移后，对偏移生成后的图进行填充，最后将原图放置原位置。

但是经过测试，当描边像素很大时，会出现锯齿，不符合生产条件。

偏移的角度越密集，画出来的图越平滑。

```
let borderWidth = 0;  // 定义描边像素
canvas.width = image.width + borderWidth * 2;  // 描边分左右上下，重新计算canvas的宽高
canvas.height = image.height + borderWidth * 2;
// 进行一个360度的偏移
let [a, b] = [1, 1];
for(let times=0; times < 360; times++) {    
    const hudu = (2 * Math.PI / 360) * 6 * times;    
    const X = a + Math.sin(hudu);
    const Y = b - Math.cos(hudu);    //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
    ctx.drawImage(image, X * borderWidth , Y * borderWidth, image.width, image.height);
}
// 填充描边色

ctx.globalCompositeOperation = 'source-in'; // 先设置globalCompositeOperation 为'source-in'
ctx.fillStyle = strokecolor; // 填充
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = 'source-over'; // 设置globalCompositeOperation = 'source-over'意思为在现有画布内容的顶部绘制新形状
ctx.drawImage(mage1, borderWidth, borderWidth);
```

当偏移像素越大，锯齿越明显，所以偏移度可以进行动态设置，当偏移像素越小时，可只对8个方位进行偏移。

三、`绘制阴影`

```
ctx.shadowColor = "gray"; 	// 颜色
ctx.shadowOffsetX = 20;  // X 位移 
ctx.shadowOffsetY = 20;  // Y 位移
ctx.shadowBlur = 5;		// 模糊

ctx.fillRect(0, 0, canvas.width, canvas.height)
```