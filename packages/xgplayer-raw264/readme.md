# 264源流直播播放器

## 介绍
264源流播放器可以实现

## 基本使用
```javascript

const player = new H264Player({
  ignores: ['replay', 'fullscreen', 'play', 'loading'],
  id: 'player', // 容器的dom ID
  width: 300, //  播放器宽度
  height: 500,//  播放器宽度
  isLive: true, // 必传
  autoplay: true, // 必传
  stretch: true, // 画面拉伸，适应容器比例
  quality: 1, // 可以传入来调整渲染的
  fps: 30, // 可以设定帧率
  videoConfig: {
    noAudio: true,
  }
})

player.pushBuffer(264Buffer);
```

## 支持传入的参数
基本参数与xgplayer保持一致 可以参照xgplayer的配置：[xgplayer配置](https://h5player.bytedance.com/config/)

额外扩展了几个264播放的特有参数：

| 字段名 | 含义     |
| ------ | -------- |
| quality  | 解码时间 |
| pts    | 展示时间 |
| data   | 帧数据   |

## 支持的方法、属性
基本使用方法与xgplayer保持一致 可以参照xgplayer的配置：[xgplayerAPI](https://h5player.bytedance.com/api/)

扩展方法pushBuffer()可以将264裸流直接送入，播放器解码后会立即播放

```javascript
pushBuffer(264Buffer: Uint8Array)
```

关于解码帧率、码率的信息可以通过player.video来获取，

```javascript
 player.video.decodeFps // 性能指标，平均每秒可以解x帧
 player.video.decodeCost // 最近一帧的解码耗时，单位ms
 player.video.bitrate // 获取播放的码率，单位bps
```

同时可以通过监听video抛出的`lowdecode`可以捕捉到解码效率低事件，方法：

```javascript
player.video.addEventListener('lowdecode', () => {
  console.log(playaer.video.degradeInfo); // 可以获取解码效率情况
  // 解码效率低处理 
}, false)
```

