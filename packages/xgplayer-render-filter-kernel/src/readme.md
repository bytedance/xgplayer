# 滤镜渲染机制

xgplayer-render 支持三种滤镜机制

1. lookuptable 

参照 xgplayer-render-filter-lut

2. kernel 

通过卷积操作设置图像滤镜

```js
new FilterRender({
    canvas: targetCanvas,
    format:'RGBA',
    filters:[
        new FilterRender.getFilterInstanceFromKernels({
            kernel: new Array(9)
        })
    ]
});
```

3. 自定义滤镜

自定义传入 filters 的滤镜类，参照basic.js
