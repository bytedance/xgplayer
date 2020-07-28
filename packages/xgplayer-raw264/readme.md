# 264软解播放器
## 安装方式

```javascript
npm i xgplayer-raw264 
```

## 使用方式
```javascript

const player = new H264Player({
    ignores: ['replay', 'time', 'fullscreen', 'volume', 'play', 'progress', 'loading'],
    id: 'player',
    width: 300,
    height: 500,
    isLive: true,
    autoplay: true,
    videoInit: false,
    preloadTime: 100000,
    fps: 30, // 可以设定帧率
    url: [],
    videoConfig: {
      noAudio: true,
    }
  })

player.pushBuffer(resolved)

```

##参数
大部分参数在xgplayer配置上可以找到

|名称|类型|解释|
|------|------|------|
|fps|number|渲染帧率|
|quality|number|渲染质量，0~1|


## 事件
大部分事件对齐xgplayer，这里只写扩展的部分

|名称|类型|解释|
|------|------|------|
|SEI_PARSED|sei|视频流中的SEI信息|

