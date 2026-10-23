# Changelog

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Bug Fixes

- **flv:** use audio track timescale for duration ([cb2505e](https://github.com/bytedance/xgplayer/commit/cb2505e3e713b14a5c4c2bd4cc14fef7223b52de))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Maintenance

- No user-facing changes.

## [3.0.22](https://github.com/bytedance/xgplayer/compare/v3.0.21...v3.0.22) (2025-05-06)

### Features

- 支持对首次加流进行裁剪
- 支持flv预拉流

### Bug Fixes

- 修复reader长任务阻塞
- 同步音频
- 支持初始化传入stream res
- firstMaxChunkSize可动态变化

## [3.0.21](https://github.com/bytedance/xgplayer/compare/v3.0.20...v3.0.21) (2025-02-24)

### Bug Fixes

- 调整插件内软解判断

### Tests

- 💍 add test case for annex-b nalu split

## [3.0.20](https://github.com/bytedance/xgplayer/compare/v3.0.19...v3.0.20) (2024-08-22)

### Features

- 🎸 (xgplayer-transmuxer) support opus codec for audio
- 🎸 (flv&hls) support g711 play by AudioContext

## [3.0.19](https://github.com/bytedance/xgplayer/compare/v3.0.18...v3.0.19) (2024-07-19)

### Bug Fixes

- disconnetcTime use buffer time instead buffer edge
- (xgplayer-flv) preProcessUrl 容错处理

### Code Refactoring

- update download speed evaluate strategy, export configuration for speed evaluate

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

## [3.0.17](https://github.com/bytedance/xgplayer/compare/v3.0.16...v3.0.17) (2024-04-28)

### Features

- add chaseframe event
- loadstart event add seamless switch status

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

### Bug Fixes

- firstframe slow on lg webos
- autoplay=false 不断流

## [3.0.14](https://github.com/bytedance/xgplayer/compare/v3.0.13...v3.0.14) (2024-03-07)

### Features

- support mms on safari 17.1+
- newly increased api and props

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

## [3.0.11](https://github.com/bytedance/xgplayer/compare/v3.0.10...v3.0.11) (2023-12-20)

### Features

- 断网、弱网增加重试配置

### Code Refactoring

- 点播流播放重构

## [3.0.10](https://github.com/bytedance/xgplayer/compare/v3.0.9...v3.0.10) (2023-11-15)

### Bug Fixes

- gop statistics

## [3.0.9](https://github.com/bytedance/xgplayer/compare/v3.0.8...v3.0.9) (2023-08-29)

### Maintenance

- No changes recorded.

## [3.0.8](https://github.com/bytedance/xgplayer/compare/v3.0.7...v3.0.8) (2023-08-15)

### Maintenance

- No changes recorded.

## [3.0.7](https://github.com/bytedance/xgplayer/compare/v3.0.6...v3.0.7) (2023-07-27)

### Maintenance

- No changes recorded.

## [3.0.6](https://github.com/bytedance/xgplayer/compare/v3.0.5...v3.0.6) (2023-07-21)

### Maintenance

- No changes recorded.

## [3.0.5](https://github.com/bytedance/xgplayer/compare/v3.0.4...v3.0.5) (2023-07-05)

### Maintenance

- No changes recorded.

## [3.0.4](https://github.com/bytedance/xgplayer/compare/v3.0.3...v3.0.4) (2023-06-02)

### Bug Fixes

- (xgplayer-flv) play error with only script tag received first fetch

## [3.0.3](https://github.com/bytedance/xgplayer/compare/v2.3.5...v3.0.3) (2023-06-02)

### Features

- (xgplayer-flv) add onlyVideo、onlyAudio options

### Bug Fixes

- (xgplayer-flv) play stall with start gap meet
- (xgplayer-flv) audio timestamp breaked before video long time case play stall refact: core.demuxedtrack export demuxed video & audio track

## 3.0.2

### Maintenance

- No changes recorded.

## 3.0.1

### Maintenance

- No changes recorded.

## next.24-1

### Bug Fixes

- getStats() 统计帧率不准确问题

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.33

## next.24

### Bug Fixes

- getStats() 统计帧率不准确问题

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.32

## next.23

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.31

## next.20

### Bug Fixes

- catch for play() call
- catch for play() call

## next.19

### Bug Fixes

- flv h265流内seek时间戳跳变卡住修复, transmuxer中 refSampleDuration获取错误

## next.18

### Maintenance

- 同步hls依赖更新，isSupported()检测调整

## next.17

### Bug Fixes

- stream request not canceled case

## next.16

### Code Refactoring

- getStats api 重构

## next.15

### Bug Fixes

- ttfb, responseheader event not emit fix
- (xgplayer-transmuxer) flv 时移seek，时间戳正负跳变兼容

## next.14

### Bug Fixes

- H265流Sei  payload type 解析错误

## next.13

### Bug Fixes

- 4xx错误指定重试次数失效

## next.12

### Bug Fixes

- 音频异常sampleIndex当做无音频流播放

## next.11

### Features

- 更新deps

## xgplayer-hls@next.12-2

### Bug Fixes

- video、audio metadata changed in the middle

## xgplayer-hls@next.12-1

### Features

- add getStats() API

## next.9-2

### Bug Fixes

- videoInit = false 时起播异常

## xgplayer-hls@next.12

### Bug Fixes

- beforePlayerInit增加异步处理逻辑

## xgplayer-hls@next.11

### Bug Fixes

- 点播流调用replay()后 seeked event no emit anymore

## xgplayer-hls@next.10

### Bug Fixes

- (hls) 切换流地址后，replay()时播放旧流

## live@next.9

### Features

- (hls) add noaudiotrack event
- (hls & flv) 去掉sourcemap

### Bug Fixes

- (hls) 直播刷新m3u8失败不对外emit error
- (xgvideo) 兼容音频metadata change

## live@next.8

### Features

- (flv & hls) 过滤G711音频，当做无音频流播放
- (mp4-new) isSupported()判断逻辑调整, 发布 next.1

## live@next.7

### Features

- (xgplayer-livevideo) 软解适配encrypted-mp4、点播seek优化、 `6-2之后改成发内部包`

### Bug Fixes

- (flv & hls) safari下直播 pip失效, video duration设置成Infinity safair下有问题

## live@next.6-3

### Bug Fixes

- (flv & hls) isSupported()判断逻辑调整

## live@next.6-2

### Features

- (xgplayer-livevideo) 音频支持mse方式播放
- (xgplayer-livevideo) 265增加simd解码器
- (xgplayer-livevideo) 支持自定义元素名

### Bug Fixes

- (flv + livevideo) iOS下flv起播拉两次流

## live@next.6

### Features

- (xgplayer-livevideo) seek精准度优化
- (xgplayer-livevideo) support pass decoder url
- (xgplayer-hls) add seiintime event
- (xgplayer-hls) 支持设置外部解密模块

### Bug Fixes

- (hls & flv) changeDefinition
- (xgplayer-hls) load events not emit
- (xgplayer-hls, livevideo) degrade not work

## live@next.5

### Features

- (xgplayer-hls) 对外emit的sei信息 originPts统一成ms为单位
- (flv & hls) 错误码最终版

### Bug Fixes

- (hls & flv) chrome兼容v50以下版本

## live@next.4

### Features

- (xgplayer-hls) 音视频分离 & fmp4 软解 & 提取 h265 流信息
- (xgplayer-hls) 重拉流时刷新主 m3u8 文件

### Bug Fixes

- (xgplayer-hls) 音视频未分离时 fmp4 音频 codec 字符串没找到
- (xgplayer-streaming-shared) fmp4 moof中解析不到defaultDuration，默认值计算

## live@next.3

### Features

- (hls & flv) add baseDts to live core
- (xgplayer-livevideo) add version info
- (xgplayer-livevideo) timeupdate event export pts info of frame just played

### Bug Fixes

- (xgplayer-streaming-shared) remove buffer with single track case play stall
- (xgplayer-streaming-shared) not throw error info when retry request
- (xgplayer-livevideo) MP4流samplerate和audioSpecificConfig中标识不一致时webaudio解码失败
- (xglayer-livevideo) fill silence frame case decodeAduio duration error

## live@next.2

### Features

- (xgplayer-livevide) add webcodec decode mode for h264 stream
- (xgplayer-flv) 无缝重加载 `seamlesslyReload: boolean`
- (xgplayer-flv) 增加 `analyzeDuration: 20000`参数, 超过指定时长无音频数据当做无音频流播放
- (xgplayer-hls) hls preloadTime 参数设置为 30 秒
- (xgplayer-hls) 可配置最大播放列表分片数量 & 修复空m3u8会丢失第一个分片
- (flv & hls) 接入新 netloader & 修复 mse 状态判断
- (xgplayer-livevide) adapt xgplayer-mp4
- (xgplayer-mp4) new xgplayer-mp4 plugin, publish next.0

### Bug Fixes

- (xgplayer-flv) H265流关键帧之前没有sps、pps、vps nal时播放失败
- (xgplayer-flv) seamless switch stall
- (xgplayer-livevideo) endOfStream not emit ended event in same case
- (hls & flv) witchURL not update player.config.url

## live@next.1

### Code Refactoring

- (hls & flv) 插件层、transmuxer重构，livevideo适配新track结构
