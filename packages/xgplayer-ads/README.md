# xgplayer-ads

## 简介

xgplayer-ads 插件内提供了对 'Google IMA', 'Google DAI' 符合VAST、VMAP、VPAID等标准的广告快捷的接入能力

### 使用方式

```javascript
import Player from "xgplayer"
import { IMAPlugin } from "xgplayer-ads"
import "xgplayer/dist/xgplayer.min.css"

const player = new Player({
    url,
    id,
    autoplay: true,
    height: window.innerHeight,
    width: window.innerWidth,
    plugins: [IMAPlugin],
    ima: {
      
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

