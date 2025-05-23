## 3.0.22
>* fix: 修复reader长任务阻塞
>* fix: 同步音频
>* feat: 支持对首次加流进行裁剪
>* fix: 支持初始化传入stream res
>* feat: 支持flv预拉流
>* fix: firstMaxChunkSize可动态变化

## 3.0.21
>* test: 💍 add test case for annex-b nalu split
>* fix: 调整插件内软解判断

## 3.0.20
feat: 🎸 (xgplayer-transmuxer) support opus codec for audio
feat: 🎸 (flv&hls) support g711 play by AudioContext

## 3.0.19
>* refactor: update download speed evaluate strategy, export configuration for speed evaluate
```
const player = new Player({
    isLive: true,
    plugins: [FlvPlugin],
    flv: {
        chunkCountForSpeed?: number, // default: 50, 累计最近多少次接受的chunk用于平均速度计算
        skipChunkSize?: number,  // default: 1000 Byte, 过滤数据量小于1000字节的chunk，不用于速度计算
        longtimeNoReceived?: number, // default: 3000ms, 超过一定间隔无新数据接收时，增加数据量为0的chunk用于速度计算
    }
})
```
>* fix: disconnetcTime use buffer time instead buffer edge
>* fix: (xgplayer-flv) preProcessUrl 容错处理

## xgplayer-flv@3.0.17
>* fix: firstframe slow on lg webos
>* fix: autoplay=false 不断流
>* feat: add chaseframe event
>* feat: loadstart event add seamless switch status

```

const player = new Player({
    plugins: [FlvPlugin],
    flv: {
        mseLowLatency: false // default true. off on lg webos
    }
})

player.on('core_event', e => {
    if(e.eventName === 'core.loadstart) {
        // e.url
        // e.seamlessSwitching ?: boolean // 标识冲拉流是否处于无缝切换阶段
    }
    if(e.eventName === 'core.chaseframe') {
        // 追帧时触发
    }
})
```


## xgplayer-flv@3.0.14
>* feat: support mms on safari 17.1+
>* feat: newly increased api and props

```
import FlvPlugin from "xgplayer-flv"

FlvPlugin.isSupportedMMS(): boolean // 环境是否支持ManagedMediaSource

new Player({
    plugins: [FlvPlugin],
    flv: {
        preferMMS: true // default:false, 对于支持MMS的环境优先使用MMS
    }
})


```


## xgplayer-flv@3.0.11
>* feat: 断网、弱网增加重试配置
>* refact: 点播流播放重构

## xgplayer-flv@3.0.10
>* fix: gop statistics

## xgplayer-flv@3.0.9

## xgplayer-flv@3.0.8

## xgplayer-flv@3.0.7

## xgplayer-flv@3.0.6

## xgplayer-flv@3.0.5

## xgplayer-flv@3.0.4
>* fix: (xgplayer-flv) play error with only script tag received first fetch

## xgplayer-flv@3.0.3
>* fix: (xgplayer-flv) play stall with start gap meet
>* feat: (xgplayer-flv) add onlyVideo、onlyAudio options
>* fix: (xgplayer-flv) audio timestamp breaked before video long time case play stall refact: core.demuxedtrack export demuxed video & audio track 

## xgplayer-flv@3.0.2
-
## xgplayer-flv@3.0.1
-

## xgplayer-flv@next.24-1
chore: 更新 xgplayer-streaming-shared@3.0.0-next.33
fix: getStats() 统计帧率不准确问题

## xgplayer-flv@next.24
chore: 更新 xgplayer-streaming-shared@3.0.0-next.32
fix: getStats() 统计帧率不准确问题

## xgplayer-flv@next.23
chore: 更新 xgplayer-streaming-shared@3.0.0-next.31

## xgplayer-flv@next.20
fix: catch for play() call

## xgplayer-flv@next.20
fix: catch for play() call

## xgplayer-flv@next.19
fix: flv h265流内seek时间戳跳变卡住修复, transmuxer中 refSampleDuration获取错误

## xgplayer-flv@next.18
chore:  同步hls依赖更新，isSupported()检测调整

## xgplayer-flv@next.17
fix: stream request not canceled case

## xgplayer-flv@next.16
refactor: getStats api 重构

## xgplayer-flv@next.15
fix: ttfb, responseheader event not emit fix
fix: (xgplayer-transmuxer) flv 时移seek，时间戳正负跳变兼容

## xgplayer-flv@next.14
fix: H265流Sei  payload type 解析错误

## xgplayer-flv@next.13
fix: 4xx错误指定重试次数失效

## xgplayer-flv@next.12
fix: 音频异常sampleIndex当做无音频流播放

## xgplayer-flv@next.11
feat: 更新deps

## xgplayer-hls@next.12-2
fix: video、audio metadata changed in the middle

## xgplayer-hls@next.12-1
feat: add getStats() API

## xgplayer-flv@next.9-2
fix: videoInit = false 时起播异常

## xgplayer-hls@next.12
fix: beforePlayerInit增加异步处理逻辑

## xgplayer-hls@next.11
fix: 点播流调用replay()后 seeked event no emit anymore

## xgplayer-hls@next.10
fix: (hls) 切换流地址后，replay()时播放旧流

## live@next.9
fix: (hls) 直播刷新m3u8失败不对外emit error
feat: (hls) add noaudiotrack event
fix: (xgvideo) 兼容音频metadata change
feat: (hls & flv) 去掉sourcemap

## live@next.8
>feat: (flv & hls) 过滤G711音频，当做无音频流播放
>feat: (mp4-new) isSupported()判断逻辑调整, 发布 next.1

## live@next.7
>* fix: (flv & hls) safari下直播 pip失效, video duration设置成Infinity safair下有问题
>* feat: (xgplayer-livevideo) 软解适配encrypted-mp4、点播seek优化、 `6-2之后改成发内部包`

## live@next.6-3
>* fix: (flv & hls) isSupported()判断逻辑调整

## live@next.6-2
>* feat: (xgplayer-livevideo) 音频支持mse方式播放
>* feat: (xgplayer-livevideo) 265增加simd解码器
>* feat: (xgplayer-livevideo) 支持自定义元素名
>* fix: (flv + livevideo) iOS下flv起播拉两次流

## live@next.6
>* feat: (xgplayer-livevideo) seek精准度优化
>* feat: (xgplayer-livevideo) support pass decoder url
>* feat: (xgplayer-hls) add seiintime event
>* feat: (xgplayer-hls) 支持设置外部解密模块
>* fix: (hls & flv) changeDefinition
>* fix: (xgplayer-hls) load events not emit
>* fix: (xgplayer-hls, livevideo) degrade not work


## live@next.5
>* feat: (xgplayer-hls) 对外emit的sei信息 originPts统一成ms为单位
>* feat:(flv & hls) 错误码最终版
>* fix: (hls & flv) chrome兼容v50以下版本

## live@next.4
>* feat: (xgplayer-hls) 音视频分离 & fmp4 软解 & 提取 h265 流信息
>* feat: (xgplayer-hls) 重拉流时刷新主 m3u8 文件
>* fix:  (xgplayer-hls) 音视频未分离时 fmp4 音频 codec 字符串没找到
>* fix:  (xgplayer-streaming-shared) fmp4 moof中解析不到defaultDuration，默认值计算

## live@next.3
>* feat: (hls & flv) add baseDts to live core
>* feat: (xgplayer-livevideo) add version info
>* feat: (xgplayer-livevideo) timeupdate event export pts info of frame just played
>* fix:  (xgplayer-streaming-shared) remove buffer with single track case play stall
>* fix:  (xgplayer-streaming-shared) not throw error info when retry request
>* fix:  (xgplayer-livevideo) MP4流samplerate和audioSpecificConfig中标识不一致时webaudio解码失败
>* fix:  (xglayer-livevideo) fill silence frame case decodeAduio duration error


## live@next.2
>* feat: (xgplayer-livevide) add webcodec decode mode for h264 stream
>* feat: (xgplayer-flv) 无缝重加载 `seamlesslyReload: boolean`
>* feat: (xgplayer-flv) 增加 `analyzeDuration: 20000`参数, 超过指定时长无音频数据当做无音频流播放
>* feat: (xgplayer-hls) hls preloadTime 参数设置为 30 秒
>* feat: (xgplayer-hls) 可配置最大播放列表分片数量 & 修复空m3u8会丢失第一个分片
>* feat: (flv & hls) 接入新 netloader & 修复 mse 状态判断
>* feat: (xgplayer-livevide) adapt xgplayer-mp4
>* feat: (xgplayer-mp4) new xgplayer-mp4 plugin, publish next.0
>* fix: (xgplayer-flv) H265流关键帧之前没有sps、pps、vps nal时播放失败
>* fix: (xgplayer-flv) seamless switch stall
>* fix: (xgplayer-livevideo) endOfStream not emit ended event in same case
>* fix: (hls & flv) witchURL not update player.config.url


## live@next.1
>* refact: (hls & flv) 插件层、transmuxer重构，livevideo适配新track结构