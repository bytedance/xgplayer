# xgplayer-mp4

## 简介

xgplayer-mp4模块基于MSE方式实现mp4的播放控制。

### MP4播放

```javascript
import Player from "xgplayer"
import Mp4Plugin from "xgplayer-mp4"
import "xgplayer/dist/xgplayer.min.css"



const player = new Player({
    url,
    id,
    autoplay: true,
    height: window.innerHeight,
    width: window.innerWidth,
    plugins: [Mp4Plugin],
    mp4plugin: {
      maxBufferLength: 30,
      minBufferLength: 10, 
      reqOptions:{
        mode: 'cors',
        method: 'POST',
        headers: { // 需要带的自定义请求头
          'x-test-header': 'rrrr'
        },
      }  
      // ... 其他配置
    }
})

player.on('canplay', ()=>{
    // do something
})

```


可配置的能力

| 配置字段 | 默认值 | 含义 |
| ------ | -------- | ----- |
| maxBufferLength | 40 | 播放的最大的buffer长度（s） |
| minBufferLength | 5 |  播放的最小的buffer长度（s）|
| disableBufferBreakCheck | false | 是否开启卡顿超时检测 |
| waitingTimeOut | 15s | 卡顿超时时间 |
| waitingInBufferTimeOut | 5s | 在buffer区间内的卡顿超时时间 |
| waitJampBufferMaxCnt | 3 | 一次播放中在buffer区间内卡顿超时最多可以seek调整几次 |
| chunkSize | 15625 | 第一次请求的数据的size长度 |
| tickInSeconds | 0.1 | 驱动下载的timer的时间间隔 |
| segmentDuration | 5s | 一次下载数据的最小视频时长|
| onProcessMinLen | 1024 | fetch每次回调数据的最小长度|
| retryCount | 2 | loader请求失败时的重试次数 |
| retryDelay | 1000 | 重试的时间间隔（ms） |
| timeout | 3000 | loader请求的超时时间(ms) |
| enableWorker | false | transmux是否使用worker|

