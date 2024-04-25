## 3.0.17
>* feat: add core.mediasourceopend event
>* fix: 🐛 (xgplayer-hls) safari下无缝切流播放报错
>* fix: 🐛 (xgplayer-hls) 修复preferMMS未开启时，集成hls插件播放失败的问题
>* fix: 🐛 (xgplayer-hls) 强化MSE endOfStream触发的时机，防止卡在最后不发end事件问题
>* fix: 🐛 (xgplayer-hls) 修复hls最后一个segment被过滤后，播放到结尾卡住问题
>* fix: firstframe slow on lg webos
>* fix: (xgplayer-hls) live stream feedback liveEdge by appended segment
>* fix: (xgplayer-transmuxer) video expected nextDts incorrect cased by fps inaccuracy (case av unsync)

```
const player = new Player({
    plugins: [HlsPlugin],
    hls: {
        mseLowLatency: false // default true. off on lg webos
    }
})
```


## 3.0.16
-

## 3.0.15
>* feat: 🎸 (xgplayer-hls) hls支持MMS
>* fix: 🐛 (xgplayer-hls) 加密HLS播放失败问题

## 3.0.14
>* feat: 🎸 (xgplayer-hls) 加密hls支持更多的Key System
>* fix(xgplayer-hls): 修复当末尾碎片sn=0时，sn被错误的兜底为-1的问题

## 3.0.13
-

## 3.0.12
-

## 3.0.11
>* feat(xgplayer-hls): update manifestLoadTimeout to audio\subtitle manifest
>* feat(xgplayer-hls):新增参数支持单独设置m3u8文件请求超时时间

## xgplayer-hls@3.0.11-alpha.3
>* feat: support m3u8 manifest loadtimeout
## xgplayer-hls@3.0.11-alpha.2
>* fix: m3u8 302 redirect

## xgplayer-hls@3.0.11-alpha.1
>* fix: 首个分片timestamp breaked case duration large value

## xgplayer-hls@3.0.10
>* fix: preloadTime not work for vod stream when start gap meet
>* fix: subtitle segments not throw
>* fix: handle buffer full play problem
>* fix: 修复重播时，同一个请求请求两次问题
>* feat: add PROGRAM-DATE-TIME tag parse


## xgplayer-hls@3.0.9-alpha.2
>* feat: llhls支持(ts分片格式)
>* feat: 增加`useLowLatency`配置参数可以主动关闭低延迟模式


## xgplayer-hls@3.0.8
>* fix: m3u8文本累计duration与实际视频duration不一致结尾seek不触发end
>* fix: 起播seek存在并行重复下载分片case
>* feat: manifest option chang to manifestList

```typescript
new Player({
    url,
    plugins: [HlsPlugin]
    hls: {
        manifestList: Array<{url: string, manifest: string}>
    }
})
```


## xgplayer-hls@3.0.7
>* fix: 分片时长与m3u8中指定不一致漏下载分片case
>* fix: play ended stall case
>* feat: `setInTime` option not open default


## xgplayer-hls@3.0.6
>* fix: fetch response导出结构改动对speed、loadcomplete事件的影响
>* fix: buffer内seek重复下载分片
>* feat: 增加m3u8请求的`core.speed`、`core.loadcomplete`事件，增加buffer添加耗时事件`core.appendcost`
>* feat: 初始化播放支持直接传入m3u8文本内容

```typescript
new Player({
    url,
    plugins: [HlsPlugin]
    hls: {
        manifest: 'm3u8 txt'
    }
})
```

## xgplayer-hls@3.0.5
- 

## xgplayer-hls@3.0.4
- 

## xgplayer-hls@3.0.3
fix: (xgplayer-hls) play stall with start gap meet
feat: (xgplayer-hls) add keepStatusAfterSwitch option
fix: (xgplayer-hls) 过滤duration为0的分片 
fix: (xgplayer-hls) beforePlayerInit()钩子去除异步返回值 

## xgplayer-hls@3.0.2
fix: 🐛 (xgplayer-hls) destroy api supported as a subclass
refactor: 💡 (xgplayer-hls) hls destroy will kill decryptor

## xgplayer-hls@3.0.1
-

## xgplayer-hls@3.0.0-next.37-1
chore: 更新 xgplayer-streaming-shared@3.0.0-next.33

## xgplayer-hls@3.0.0-next.37-1
chore: 更新 xgplayer-streaming-shared@3.0.0-next.33

## xgplayer-hls@3.0.0-next.37
chore: 更新 xgplayer-streaming-shared@3.0.0-next.32
fix: track发生变化判断影响软解播放

## xgplayer-hls@3.0.0-next.36
chore: 更新 xgplayer-streaming-shared@3.0.0-next.31
fix: (xgplayer-hls) track发生变化检测默认开启`allowedStreamTrackChange`, 兼容seek场景

## xgplayer-hls@3.0.0-next.35
fix: 🐛 (xgplayer-hls) 支持无缝切换码率

## xgplayer-hls@3.0.0-next.34 
fix: 🐛 (xgplayer-hls) HLS直播支持显示 webvtt

## xgplayer-hls@3.0.0-next.33 
fix: 🐛 (xgplayer-hls) 兼容m3u8 endlist之后有冗余内容的情况 

## xgplayer-hls@3.0.0-next.32
更新 xgplayer-transmuxer 至 3.0.0-next.25，解决265流seek时卡住问题

## xgplayer-hls@3.0.0-next.31
fix: 🐛 (xgplayer-hls) 修复开播时buffer检测未空的问题

## xgplayer-hls@3.0.0-next.30
refactor: 💡 (xgplayer-hls) 调整剩余未播buf数值，过低阈值会产生waiting无法触发error

## xgplayer-hls@3.0.0-next.29
feat: (xgplayer-hls) 兼容分片track数量变化
refactor: 💡 (xgplayer-hls) 增加 getStats API

## xgplayer-hls@3.0.0-next.28
fix: 🐛 (xgplayer-hls) 支持hls插件空url初始化
fix: mediaType支持audio标签

## xgplayer-hls@3.0.0-next.27
fix: (xgplayer-transmuxer) H265流Sei payload type 解析错误
fix: (xgplayer-hls) 起播gap

## xgplayer-hls@3.0.0-next.26
fix: (flv、hls) empty player url ignore plugin init 
test: 💍 (xgplayer-hls) 增加BufferService单测用例

## xgplayer-hls@3.0.0-next.25
feat: 🎸 (xgplayer-hls) 支持流内codec变更
refactor: 💡 (xgplayer-hls) 升级 share 库版本

## xgplayer-hls@3.0.0-next.24
fix: 音频异常sampleIndex当做无音频流播放
fix: (xgplayer-transmuxer) hls流忽略使用分割nal拆分sample 

## xgplayer-hls@3.0.0-next.23
fix: 🐛 修复hls切码率时时间点未续播问题

## xgplayer-hls@3.0.0-next.23-0
fix: 🐛 (xgplayer-hls) 修复hls内速度统计一直为0的问题

## xgplayer-hls@3.0.0-next.21
fix: (hls) 长时间切后台播放, ts请求失败 
fix: (hls) 点播流时间戳处理导致duration变化

## xgplayer-hls@3.0.0-next.20
feat(core): 更新根目录依赖的core-js版本为3.12.1; packages下各个包peerDependencies中增加core-js

## xgplayer-hls@3.0.0-next.19
fix: 🐛 (xgplayer-hls) suppress uncaptured errors in promise 

## xgplayer-hls@3.0.0-next.18
fix: 🐛 (xgplayer-hls) package.json files

## ~~xgplayer-hls@3.0.0-next.17~~（deprecated）
包发布有问题，缺失 dist 目录

## xgplayer-hls@3.0.0-next.16
升级 xgplayer-transmuxer 至 3.0.0-next.10
升级 xgplayer-streaming-shared 至 3.0.0-next.11

## xgplayer-hls@3.0.0-next.15
修复 eslint 不合规代码

## xgplayer-hls@3.0.0-next.14
升级 xgplayer-transmuxer 至 3.0.0-next.9
升级 xgplayer-streaming-shared 至 3.0.0-next.10

## xgplayer-hls@3.0.0-next.13
fix: 🐛 (xgplayer-hls) 第一次开播时MSE两次bindMedia流程精简为一次

## xgplayer-hls@next.12-2
fix: video、audio metadata changed in the middle

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

## xgplayer-hls@next.9
fix: (hls) 直播刷新m3u8失败不对外emit error
feat: (hls) add noaudiotrack event
fix: (xgvideo) 兼容音频metadata change
feat: (hls & flv) 去掉sourcemap

## xgplayer-hls@next.8
>feat: (flv & hls) 过滤G711音频，当做无音频流播放
>feat: (mp4-new) isSupported()判断逻辑调整, 发布 next.1

## xgplayer-hls@next.7
>* fix: (flv & hls) safari下直播 pip失效, video duration设置成Infinity safair下有问题
>* feat: (xgplayer-livevideo) 软解适配encrypted-mp4、点播seek优化、 `6-2之后改成发内部包`

## xgplayer-hls@next.6-3
>* fix: (flv & hls) isSupported()判断逻辑调整


## xgplayer-hls@next.6
>* feat: (xgplayer-livevideo) seek精准度优化
>* feat: (xgplayer-livevideo) support pass decoder url
>* feat: (xgplayer-hls) add seiintime event
>* feat: (xgplayer-hls) 支持设置外部解密模块
>* fix: (hls & flv) changeDefinition
>* fix: (xgplayer-hls) load events not emit
>* fix: (xgplayer-hls, livevideo) degrade not work


## xgplayer-hls@next.5
>* feat: (xgplayer-hls) 对外emit的sei信息 originPts统一成ms为单位
>* feat:(flv & hls) 错误码最终版
>* fix: (hls & flv) chrome兼容v50以下版本

## xgplayer-hls@next.4
>* feat: (xgplayer-hls) 音视频分离 & fmp4 软解 & 提取 h265 流信息
>* feat: (xgplayer-hls) 重拉流时刷新主 m3u8 文件
>* fix:  (xgplayer-hls) 音视频未分离时 fmp4 音频 codec 字符串没找到
>* fix:  (xgplayer-streaming-shared) fmp4 moof中解析不到defaultDuration，默认值计算

## xgplayer-hls@next.3
>* feat: (hls & flv) add baseDts to live core


## xgplayer-hls@next.2
>* feat: (xgplayer-hls) hls preloadTime 参数设置为 30 秒
>* feat: (xgplayer-hls) 可配置最大播放列表分片数量 & 修复空m3u8会丢失第一个分片

