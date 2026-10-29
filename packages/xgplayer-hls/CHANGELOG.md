# Changelog

## [3.0.27](https://github.com/bytedance/xgplayer/compare/v3.0.26...v3.0.27) (2026-10-28)

### Bug Fixes

- **hls:** preserve playlist path for query-only URIs ([5af9e7d](https://github.com/bytedance/xgplayer/commit/5af9e7d7c98b76f33b35a9c8e7b729664923862b))
- **monorepo:** Include package changelogs in npm distributions. ([87cf0de](https://github.com/bytedance/xgplayer/commit/87cf0ded4749631e650dc8517c6bff38557d5e36))
- **transmuxer:** Fix HEVC decode failures across implicit stream discontinuities. ([d72119a](https://github.com/bytedance/xgplayer/commit/d72119a14514711b5cf4ea35a33e2a6fcc53a4fc))

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Bug Fixes

- 🐛 (hls) 修复时间轴偏移导致启播位置未从0开始、duration较大问题 fixed [#1897](https://github.com/bytedance/xgplayer/issues/1897) ([03d648b](https://github.com/bytedance/xgplayer/commit/03d648b4601ee426712fa17ed8475acfe52695ba))
- bind hls media event listeners ([d2f480d](https://github.com/bytedance/xgplayer/commit/d2f480df2552d98a92d77504ae19bf5842b8cc49))
- **cast:** preserve AirPlay fallback with MSE attach mode ([40de9b7](https://github.com/bytedance/xgplayer/commit/40de9b7c15a0db5fa32cfc6eec9e2735a5f9aa04))
- **cast:** restore local MSE after AirPlay exit ([e8ef93f](https://github.com/bytedance/xgplayer/commit/e8ef93f1b1c4bf593ef6abc6c70339efd1d86671))
- **cast:** update cast icon to standard Cast/Chromecast shape ([ba8ee1c](https://github.com/bytedance/xgplayer/commit/ba8ee1cc2e3421a19ccc63a156ba40b01f8a8bcb))
- **hls:** guard cast plugin lookup ([ac57f93](https://github.com/bytedance/xgplayer/commit/ac57f931ca7daf26fc6bc1da8235a5be90c6e8df))
- **hls:** limit preload across buffered islands ([1d66dd6](https://github.com/bytedance/xgplayer/commit/1d66dd6456c9bad68eecd3f009561b1ff328625c)), closes [#1906](https://github.com/bytedance/xgplayer/issues/1906)
- **hls:** preserve player url media src semantics ([83a042d](https://github.com/bytedance/xgplayer/commit/83a042d4ea6e850efc7740d767a12578ae888b5e))
- **hls:** use source element for Safari AirPlay auto MSE ([5a22d6c](https://github.com/bytedance/xgplayer/commit/5a22d6c801d989cbd1000c29ecba01f7c33b0e6c))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 (hls) 修复结尾ts文件一直不加载，导致播放卡住问题 ([5725e19](https://github.com/bytedance/xgplayer/commit/5725e19c83e26dae69e4fda59dc5063330e27843))
- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Maintenance

- No user-facing changes.

## [3.0.22](https://github.com/bytedance/xgplayer/compare/v3.0.21...v3.0.22) (2025-05-06)

### Bug Fixes

- **hls:** fix sample duration less zero bug

## [3.0.21](https://github.com/bytedance/xgplayer/compare/v3.0.20...v3.0.21) (2025-02-24)

### Features

- 🎸 (xgplayer-hls) 支持MP3

### Bug Fixes

- 🐛 (xgplayer-hls) 非MMS应支持软解
- 调整插件内软解判断
- 🐛 (xgplayer-hls) llhls loading

## [3.0.20](https://github.com/bytedance/xgplayer/compare/v3.0.19...v3.0.20) (2024-08-22)

### Bug Fixes

- 🐛 (xgplayer-hls) 修复HlsOption类型未导出问题
- 🐛 (xgplayer-hls) 修复hls switchUrl指定切换点时不生效的问题
- 🐛 (xgplayer-hls) load函数参数变更为可选

### Code Refactoring

- 💡 (xgplayer-hls) 对外提供 APPEND_BUFFER 时机
- 💡 支持hls abr能力
- 💡 (xgplayer) 对外提供switchUrl接口参数类型
- 💡 (xgplayer-hls) 提供abr切换时间点位
- 💡 (xgplayer-hls) 重构load接口，支持删除switchURL执行之后的状态
- 💡 (xgplayer-hls) 提供 detachMedia 接口

## [3.0.19](https://github.com/bytedance/xgplayer/compare/v3.0.18...v3.0.19) (2024-07-19)

### Features

- **xgplayer-hls xgplayer-transmuxer:** HLS 音视频LargeGAP优化处理

### Bug Fixes

- adts parser兼容异常case造成页面crash
- m3u8 parser 兼容 EXT-X-ENDLIST出现在任意位置
- 🐛 (xgplayer-hls) 修复重播时，视频播放到结尾一直loading的问题（重播时末尾buffer已下载）
- (xgplayer-hls) m3u8 parser 兼容 EXT-X-ENDLIST出现在任意位置
- (xgplayer-hls) playlist Live state
- 🐛 (xgplayer-hls）修复hls最后一帧不渲染，并且播放到最后一直loading的问题
- **xgplayer-hls:** 修复HLS点播场景空列表时未触发报错问题
- 🐛 (xgplayer-hls) 修复播放到结尾一直loading的问题

## [3.0.18](https://github.com/bytedance/xgplayer/compare/v3.0.17...v3.0.18) (2024-05-21)

### Code Refactoring

- 💡 (xgplayer-hls) DRM支持更多的identifiers
- 💡 (xgplayer-hls) MSE ChangeType不支持时，对外抛出错误

## [3.0.17](https://github.com/bytedance/xgplayer/compare/v3.0.16...v3.0.17) (2024-04-28)

### Features

- add core.mediasourceopend event

### Bug Fixes

- 🐛 (xgplayer-hls) safari下无缝切流播放报错
- 🐛 (xgplayer-hls) 修复preferMMS未开启时，集成hls插件播放失败的问题
- 🐛 (xgplayer-hls) 强化MSE endOfStream触发的时机，防止卡在最后不发end事件问题
- 🐛 (xgplayer-hls) 修复hls最后一个segment被过滤后，播放到结尾卡住问题
- firstframe slow on lg webos
- (xgplayer-hls) live stream feedback liveEdge by appended segment
- (xgplayer-transmuxer) video expected nextDts incorrect cased by fps inaccuracy (case av unsync)

```
const player = new Player({
    plugins: [HlsPlugin],
    hls: {
        mseLowLatency: false // default true. off on lg webos
    }
})
```

## [3.0.16](https://github.com/bytedance/xgplayer/compare/v3.0.15...v3.0.16) (2024-04-03)

### Maintenance

- No changes recorded.

## [3.0.15](https://github.com/bytedance/xgplayer/compare/v3.0.14...v3.0.15) (2024-03-28)

### Features

- 🎸 (xgplayer-hls) hls支持MMS

### Bug Fixes

- 🐛 (xgplayer-hls) 加密HLS播放失败问题

## [3.0.14](https://github.com/bytedance/xgplayer/compare/v3.0.13...v3.0.14) (2024-03-07)

### Features

- 🎸 (xgplayer-hls) 加密hls支持更多的Key System

### Bug Fixes

- **xgplayer-hls:** 修复当末尾碎片sn=0时，sn被错误的兜底为-1的问题

## [3.0.13](https://github.com/bytedance/xgplayer/compare/v3.0.12...v3.0.13) (2024-02-20)

### Maintenance

- No changes recorded.

## [3.0.12](https://github.com/bytedance/xgplayer/compare/v3.0.11...v3.0.12) (2024-01-30)

### Maintenance

- No changes recorded.

## [3.0.11](https://github.com/bytedance/xgplayer/compare/v3.0.10...v3.0.11) (2023-12-20)

### Features

- **xgplayer-hls:** update manifestLoadTimeout to audio\subtitle manifest
- **xgplayer-hls:** 新增参数支持单独设置m3u8文件请求超时时间

## 3.0.11-alpha.3

### Features

- support m3u8 manifest loadtimeout

## 3.0.11-alpha.2

### Bug Fixes

- m3u8 302 redirect

## 3.0.11-alpha.1

### Bug Fixes

- 首个分片timestamp breaked case duration large value

## [3.0.10](https://github.com/bytedance/xgplayer/compare/v3.0.9...v3.0.10) (2023-11-15)

### Features

- add PROGRAM-DATE-TIME tag parse

### Bug Fixes

- preloadTime not work for vod stream when start gap meet
- subtitle segments not throw
- handle buffer full play problem
- 修复重播时，同一个请求请求两次问题

## 3.0.9-alpha.2

### Features

- llhls支持(ts分片格式)
- 增加`useLowLatency`配置参数可以主动关闭低延迟模式

## [3.0.8](https://github.com/bytedance/xgplayer/compare/v3.0.7...v3.0.8) (2023-08-15)

### Features

- manifest option chang to manifestList

```typescript
new Player({
    url,
    plugins: [HlsPlugin]
    hls: {
        manifestList: Array<{url: string, manifest: string}>
    }
})
```

### Bug Fixes

- m3u8文本累计duration与实际视频duration不一致结尾seek不触发end
- 起播seek存在并行重复下载分片case

## [3.0.7](https://github.com/bytedance/xgplayer/compare/v3.0.6...v3.0.7) (2023-07-27)

### Features

- `setInTime` option not open default

### Bug Fixes

- 分片时长与m3u8中指定不一致漏下载分片case
- play ended stall case

## [3.0.6](https://github.com/bytedance/xgplayer/compare/v3.0.5...v3.0.6) (2023-07-21)

### Features

- 增加m3u8请求的`core.speed`、`core.loadcomplete`事件，增加buffer添加耗时事件`core.appendcost`
- 初始化播放支持直接传入m3u8文本内容

```typescript
new Player({
    url,
    plugins: [HlsPlugin]
    hls: {
        manifest: 'm3u8 txt'
    }
})
```

### Bug Fixes

- fetch response导出结构改动对speed、loadcomplete事件的影响
- buffer内seek重复下载分片

## [3.0.5](https://github.com/bytedance/xgplayer/compare/v3.0.4...v3.0.5) (2023-07-05)

### Maintenance

- No changes recorded.

## [3.0.4](https://github.com/bytedance/xgplayer/compare/v3.0.3...v3.0.4) (2023-06-02)

### Maintenance

- No changes recorded.

## [3.0.3](https://github.com/bytedance/xgplayer/compare/v2.3.5...v3.0.3) (2023-06-02)

### Features

- (xgplayer-hls) add keepStatusAfterSwitch option

### Bug Fixes

- (xgplayer-hls) play stall with start gap meet
- (xgplayer-hls) 过滤duration为0的分片
- (xgplayer-hls) beforePlayerInit()钩子去除异步返回值

## 3.0.2

### Bug Fixes

- 🐛 (xgplayer-hls) destroy api supported as a subclass

### Code Refactoring

- 💡 (xgplayer-hls) hls destroy will kill decryptor

## 3.0.1

### Maintenance

- No changes recorded.

## 3.0.0-next.37-1

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.33
- 更新 xgplayer-streaming-shared@3.0.0-next.33

## 3.0.0-next.23-0

### Bug Fixes

- 🐛 (xgplayer-hls) 修复hls内速度统计一直为0的问题

## 3.0.0-next.37

### Bug Fixes

- track发生变化判断影响软解播放

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.32

## 3.0.0-next.36

### Bug Fixes

- (xgplayer-hls) track发生变化检测默认开启`allowedStreamTrackChange`, 兼容seek场景

### Maintenance

- 更新 xgplayer-streaming-shared@3.0.0-next.31

## 3.0.0-next.35

### Bug Fixes

- 🐛 (xgplayer-hls) 支持无缝切换码率

## 3.0.0-next.34

### Bug Fixes

- 🐛 (xgplayer-hls) HLS直播支持显示 webvtt

## 3.0.0-next.33

### Bug Fixes

- 🐛 (xgplayer-hls) 兼容m3u8 endlist之后有冗余内容的情况

## 3.0.0-next.32

### Maintenance

- 更新 xgplayer-transmuxer 至 3.0.0-next.25，解决265流seek时卡住问题

## 3.0.0-next.31

### Bug Fixes

- 🐛 (xgplayer-hls) 修复开播时buffer检测未空的问题

## 3.0.0-next.30

### Code Refactoring

- 💡 (xgplayer-hls) 调整剩余未播buf数值，过低阈值会产生waiting无法触发error

## 3.0.0-next.29

### Features

- (xgplayer-hls) 兼容分片track数量变化

### Code Refactoring

- 💡 (xgplayer-hls) 增加 getStats API

## 3.0.0-next.28

### Bug Fixes

- 🐛 (xgplayer-hls) 支持hls插件空url初始化
- mediaType支持audio标签

## 3.0.0-next.27

### Bug Fixes

- (xgplayer-transmuxer) H265流Sei payload type 解析错误
- (xgplayer-hls) 起播gap

## 3.0.0-next.26

### Bug Fixes

- (flv、hls) empty player url ignore plugin init

### Tests

- 💍 (xgplayer-hls) 增加BufferService单测用例

## 3.0.0-next.25

### Features

- 🎸 (xgplayer-hls) 支持流内codec变更

### Code Refactoring

- 💡 (xgplayer-hls) 升级 share 库版本

## 3.0.0-next.24

### Bug Fixes

- 音频异常sampleIndex当做无音频流播放
- (xgplayer-transmuxer) hls流忽略使用分割nal拆分sample

## 3.0.0-next.23

### Bug Fixes

- 🐛 修复hls切码率时时间点未续播问题

## 3.0.0-next.21

### Bug Fixes

- (hls) 长时间切后台播放, ts请求失败
- (hls) 点播流时间戳处理导致duration变化

## 3.0.0-next.20

### Features

- **core:** 更新根目录依赖的core-js版本为3.12.1; packages下各个包peerDependencies中增加core-js

## 3.0.0-next.19

### Bug Fixes

- 🐛 (xgplayer-hls) suppress uncaptured errors in promise

## 3.0.0-next.18

### Bug Fixes

- 🐛 (xgplayer-hls) package.json files

## 3.0.0-next.16

### Maintenance

- 升级 xgplayer-transmuxer 至 3.0.0-next.10
  升级 xgplayer-streaming-shared 至 3.0.0-next.11

## 3.0.0-next.15

### Maintenance

- 修复 eslint 不合规代码

## 3.0.0-next.14

### Maintenance

- 升级 xgplayer-transmuxer 至 3.0.0-next.9
  升级 xgplayer-streaming-shared 至 3.0.0-next.10

## 3.0.0-next.13

### Bug Fixes

- 🐛 (xgplayer-hls) 第一次开播时MSE两次bindMedia流程精简为一次

## ~~xgplayer-hls@3.0.0-next.17~~（deprecated）

### Maintenance

- 包发布有问题，缺失 dist 目录

## next.12-2

### Bug Fixes

- video、audio metadata changed in the middle
- video、audio metadata changed in the middle

## next.12-1

### Features

- add getStats() API

## xgplayer-flv@next.9-2

### Bug Fixes

- videoInit = false 时起播异常

## next.12

### Bug Fixes

- beforePlayerInit增加异步处理逻辑

## next.11

### Bug Fixes

- 点播流调用replay()后 seeked event no emit anymore

## next.10

### Bug Fixes

- (hls) 切换流地址后，replay()时播放旧流

## next.9

### Features

- (hls) add noaudiotrack event
- (hls & flv) 去掉sourcemap

### Bug Fixes

- (hls) 直播刷新m3u8失败不对外emit error
- (xgvideo) 兼容音频metadata change

## next.8

### Features

- (flv & hls) 过滤G711音频，当做无音频流播放
- (mp4-new) isSupported()判断逻辑调整, 发布 next.1

## next.7

### Features

- (xgplayer-livevideo) 软解适配encrypted-mp4、点播seek优化、 `6-2之后改成发内部包`

### Bug Fixes

- (flv & hls) safari下直播 pip失效, video duration设置成Infinity safair下有问题

## next.6-3

### Bug Fixes

- (flv & hls) isSupported()判断逻辑调整

## next.6

### Features

- (xgplayer-livevideo) seek精准度优化
- (xgplayer-livevideo) support pass decoder url
- (xgplayer-hls) add seiintime event
- (xgplayer-hls) 支持设置外部解密模块

### Bug Fixes

- (hls & flv) changeDefinition
- (xgplayer-hls) load events not emit
- (xgplayer-hls, livevideo) degrade not work

## next.5

### Features

- (xgplayer-hls) 对外emit的sei信息 originPts统一成ms为单位
- (flv & hls) 错误码最终版

### Bug Fixes

- (hls & flv) chrome兼容v50以下版本

## next.4

### Features

- (xgplayer-hls) 音视频分离 & fmp4 软解 & 提取 h265 流信息
- (xgplayer-hls) 重拉流时刷新主 m3u8 文件

### Bug Fixes

- (xgplayer-hls) 音视频未分离时 fmp4 音频 codec 字符串没找到
- (xgplayer-streaming-shared) fmp4 moof中解析不到defaultDuration，默认值计算

## next.3

### Features

- (hls & flv) add baseDts to live core

## next.2

### Features

- (xgplayer-hls) hls preloadTime 参数设置为 30 秒
- (xgplayer-hls) 可配置最大播放列表分片数量 & 修复空m3u8会丢失第一个分片
