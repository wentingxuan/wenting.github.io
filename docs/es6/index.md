
# `es6`
 "ES6" 泛指 ES5 之后的新语法
# `使用flat`
`flat`会按照一个可指定的深度去递归遍历数组，将所有遍历到的子数组中的元素合并为一个新的数组
###### 语法  `var newArray = arr.flat([depth]) `
###### 参数：depth（可选）默认为1
###### 使用示例

```js
let arr = [1,2,[3,[4,[5]]]]
const reasut = arr.flat()
console.log(reasut) // [1, 2, 3, [4,[5]]]
const result1 = arr.flat(Infinity) 
console.log(reasut1) // [1, 2, 3, 4, 5]
```
# `flatMap`
`flatMap()` 方法首先映射数组的所有元素，然后通过展平数组来创建新数组

```js
const myArr = [1, 2, 3, 4, 5, 6];
const newArr = myArr.flatMap((x) => x % 2 !== 0 ? [x * 2] : []);
console.log(newArr) // [2, 6, 10]
```

```js
const myArr = [1, 2, 3, 4, 5, 6,[7,8]];
const newArr = myArr.flatMap(x => x)
console.log(newArr) // [1, 2, 3, 4, 5, 6, 7, 8]
```
# `includes`
`includes` 可以判断一个数组中是否包含某一个元素，并返回true 或者false
如

```js
if( type === 1 || 
    type === 2 || 
    type === 3 ||
  ){  }
```
可写为

```js
const condition = [1,2,3]; 
if( condition.includes(type) ){}
```
# `空值合并运算符(??)`
判断输入框为输入的场景还在这样写吗？

```js
if(value !== null && value !== undefined && value !== ''){ 
    }
```
es6的空值合并运算符

```js
if((value??'') !== ''){ 
    }
```
# `逻辑空赋值(??=)`
逻辑空赋值运算符（`x ??= y`）仅在 `x` 是空值（`null` 或 `undefined`）时对其赋值。

```js
const a = { duration: 50 };
a.duration ??= 10;
console.log(a.duration);
// Expected output: 50

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25
```
# `Object.values`
返回对象的全部属性

```js
const deps = { 
    'a':[1,2,3],
    'b':[5,8,12],
    'c':[5,14,79],
    'd':[3,64,105] 
}
console.log(Object.values(deps)) // [[1,2,3],[5,8,12],[5,14,79], [3,64,105]]
```
再使用flat进行扁平化
```js
Object.values(deps).flat(Infinity)
```
new Set()进行去重

```js
[...new Set(Object.values(deps).flat(Infinity))]
```
# `async/await`

```js
const fn1 = () =>{ 
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("I love You !!"); }, 300);
    }); 
} 
const fn2 = () =>{ 
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("I love You too !!"); }, 500); 
    }); 
}
const fn = () =>{ 
    fn1().then(res1 =>{
        // ...
        fn2().then(res2 =>{ 
           // ....
        }) 
    }) 
}
 
```
可以使用async/await进行改进，避免地狱回调

```js
const fn = async () =>{ 
    const res1 = await fn1(); 
    const res2 = await fn2();  
}
```
# `Rest 属性`
允许我们破坏一个对象并将剩余物收集到一个新对象上

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```
# `reduce`
reduce() 方法对数组中的每个元素执行一个由我们提供的**reducer**函数，且该函数为升序执行，并将其结果汇总为单个返回值

###### 语法 `arr.reduce(callback(accumulator, currentValue, currentIndex , array), initialValue)`
###### 参数 accumulator：累计回调的返回值 currentValue：正在处理的元素 currentIndex：当前索引 array：原数组 initialValue(可选)：第一次调用callback的参数值，如果不设置则从1开始索引，否则从0开始


```js
[0, 1, 2, 3, 4, 5, 6, 7, 8].reduce(function(accumulator, currentValue, currentIndex, array){
  console.log(accumulator,currentValue, currentIndex,  array)
  //0 1 1 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //1 2 2 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //3 3 3 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // 6 4 4 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //10 5 5 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //15 6 6 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //21 7 7 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //28 8 8 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return accumulator + currentValue;
});  // 36
```

```js
[0, 1, 2, 3, 4, 5, 6, 7, 8].reduce(function(accumulator, currentValue, currentIndex, array){
    console.log(accumulator,currentValue, currentIndex,  array)
    //10 0 0 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //10 1 1 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //11 2 2 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //13 3 3 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //16 4 4 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //20 5 5 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //25 6 6 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //31 7 7 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //38 8 8 (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return accumulator + currentValue;
}, 10);  // 46
```
