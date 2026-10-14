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
    mp4: {
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
| maxBufferLength | 40 | 播放态预加载的最大 buffer 长度（s） |
| minBufferLength | 5 | 暂停态预加载的最小 buffer 长度（s） |
| bufferBehind | 10 | 当前时间之后保留的历史 buffer 长度（s），超出部分清除 |
| disableBufferBreakCheck | false | 是否关闭卡顿超时检测 |
| waitingTimeOut | 15000 | 卡死超时时间（ms），超时后抛错并（默认）降级 |
| waitingInBufferTimeOut | 5000 | 在 buffer 区间内卡顿的自救等待时间（ms） |
| waitJampBufferMaxCnt | 3 | 一次播放中在 buffer 区间内卡顿时最多 seek 自救的次数 |
| tickInterval | 500 | 驱动下载的 timer 间隔（ms）；兼容旧键 `tickInSeconds`（秒） |
| segmentDuration | - | 一次下载数据的最小视频时长（s） |
| onProcessMinLen | 1024 | fetch 每次回调数据的最小长度 |
| retry | 3 | loader 请求失败时的重试次数；兼容旧键 `retryCount` |
| retryDelay | 1000 | 重试的时间间隔（ms） |
| timeout | 3000 | loader 请求的超时时间（ms） |
| reqOptions | null | 透传给 loader 的请求配置（headers/method/mode/credentials 等） |
| closeDowngrade | false | 关闭「出错时降级到原生 video」能力；为 false 时致命错误会降级并 emit `playCatch` |
| preferMMS | false | 优先使用 ManagedMediaSource（iOS 17.1+），用于 Safari / iOS MMS 场景 |
| mseAttachMode | 'auto' | MediaSource 绑定方式：'auto' / 'source-element' / 'src' |
| enableWorker | false | transmux（demux + remux）是否放到 Worker 线程执行 |

> 说明
> - **MMS（issue #1932）**：在仅支持 `ManagedMediaSource` 的环境（如 iOS 17.1+ Safari），开启 `preferMMS: true` 后插件会用 MMS 完成转封装播放。
> - **仅 MMS 环境的黑屏兜底（issue #1872）**：当浏览器仅有 `ManagedMediaSource` 且未开启 `preferMMS` 时，插件不再接管，交由播放器用原生 video 播放，避免黑屏不播放。
> - **出错降级**：默认开启。初始化阶段失败 `vtype='MP4_1'`，运行时失败 `vtype='MP4_2'`，均通过 `player.emit('playCatch', vtype, err)` 对外抛出，并把原始 url 赋回 `video.src` 继续播放。


