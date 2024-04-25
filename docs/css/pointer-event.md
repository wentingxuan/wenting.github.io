`pointer-events`是一个CSS属性，它定义了在何种情况下元素可以成为鼠标事件（或触摸事件）的目标。这个属性可以控制元素是否可以被点击、是否可以触发鼠标事件，或者是否应该忽略鼠标事件，让事件传递给下面的元素。

**`使用场景`**


`pointer-events`属性主要用于以下几种场景：

`None`: 元素不会成为鼠标事件的目标。例如，如果想让一个元素透明对用户的点击，可以将其`pointer-events`设置为`none`。

`Auto`: 默认值。元素正常响应鼠标事件。

`VisiblePainted`: 元素仅在可见部分响应鼠标事件。

`其他值`: 还有一些其他值用于SVG元素，如`visibleFill`, `visibleStroke`, `painted`等。

当一个网站使用水印时，直接加一层透明背景，`pointer-events:none`即可

比如一要给一个元素添加一个伪元素，而且伪元素又刚好盖在本身元素的上方，且不影响本身元素的点击事件，可以给伪类添加`pointer-events:none`

**`示例`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  .outer{
    position: relative;
    width: 200px;
    height: 200px;
  }
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, .7);
    pointer-events: none; /* 重要 */
  }
</style>
<body>
  <div class="outer">
    <div class="mask"></div>
    <button id="btn">click</button>
  </div>
  <script>
    const btn = document.getElementById('btn')
    btn.addEventListener('click', function(e){
      alert('111')
    })
  </script>
</body>
</html>

```
`btn`被`mask`覆盖，给`mask`增加`pointer-events: none`属性后，`btn`的点击事件会被捕获
