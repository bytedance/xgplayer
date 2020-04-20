# xgplayer-render

是西瓜播放器的一套支持多个颜色压缩格式的渲染机，基于webgl实现。

## 目前支持的格式

- rgb
- rgba
- rgb32
- rgb24
- yuv420
- i420
- yuv422
- nv12

## version Log

2.2.1 修正nv12的渲染效果


## api

### example
```js
import Render, {rgb2yuv} from "xgplayer-render";

const render = Render({
    format:'YUV420'
});


```

2. rgb2yuv

```js
let {y,u,v} = rgb2yuv(imageData,type);
```
- @PARAM
    - imageData
        - type:ImageData DOM的imageData实例
    - type
        - type:String 支持的格式默认yuv444
            - 支持 YUV420\YUV444
- @return 
    - yuv
        - type:Object 包括yuv三个属性
            - yuv为Uint8Array

    
