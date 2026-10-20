# xgplayer-mp3

[English](./README.md) | 简体中文

`xgplayer-mp3` 是面向独立 MP3 文件的 xgplayer 流式播放插件。它通过 HTTP
Range 按需加载，并为 CBR 和带索引的 VBR 文件提供基于 MSE 的 seek 能力。
当运行环境或文件不满足要求时，默认交由浏览器原生 `<audio>` 播放。

## 安装

```bash
npm install xgplayer xgplayer-mp3
```

或者：

```bash
yarn add xgplayer xgplayer-mp3
```

## 基础用法

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import MP3Plugin from 'xgplayer-mp3'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/audio.mp3',
  mediaType: 'audio',
  plugins: [MP3Plugin]
})
```

未传入 `mp3` 配置时，插件使用默认的 buffer、分段和重试策略。

## HTTP 和 CORS 要求

为实现按需加载和 seek，建议资源服务器支持 HTTP Range。跨域资源的 `206`
响应示例：

```http
HTTP/1.1 206 Partial Content
Content-Type: audio/mpeg
Accept-Ranges: bytes
Content-Range: bytes 0-131071/2892276
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Content-Range, Content-Length, Accept-Ranges
```

如果服务器忽略 Range 并返回 `200` 完整文件，插件仍可播放，但会下载并在内存中
保留完整文件。

如果服务器返回 `206`，JavaScript 必须能够读取包含完整文件大小的
`Content-Range`，否则插件会降级到原生播放。

## 配置

通过播放器的 `mp3` 字段传入插件配置：

```js
const player = new Player({
  // ...
  plugins: [MP3Plugin],
  mp3: {
    maxBufferLength: 60,
    bufferBehind: 20,
    segmentDuration: 15,
    timeout: 10000
  }
})
```

常用配置：

| 配置 | 默认值 | 说明 |
| --- | ---: | --- |
| `maxBufferLength` | `40` | 播放时向前预加载的目标时长，单位秒 |
| `minBufferLength` | `5` | 暂停时向前预加载的目标时长，单位秒 |
| `bufferBehind` | `30` | 当前时间之前保留的历史 buffer，单位秒 |
| `segmentDuration` | `10` | 每个 Range 分段期望覆盖的音频时长，单位秒 |
| `retry` | `3` | 网络请求重试次数 |
| `retryDelay` | `1000` | 网络请求重试间隔，单位毫秒 |
| `timeout` | `5000` | 单次网络请求超时，单位毫秒 |
| `reqOptions` | `null` | 请求的 method、headers、credentials 等选项 |
| `closeDowngrade` | `false` | 是否关闭出错时的原生播放降级 |

高级配置：

| 配置 | 默认值 | 说明 |
| --- | ---: | --- |
| `tickInterval` | `500` | buffer 调度周期，单位毫秒 |
| `probeSize` | `131072` | 首次格式探测字节数 |
| `maxProbeSize` | `1048576` | 跳过大 ID3 标签时允许扩展的最大探测字节数 |
| `syncSearchSize` | `4096` | seek 时向前搜索 MP3 帧同步字的字节数 |
| `preferMMS` | `false` | 优先选择 ManagedMediaSource |
| `mseAttachMode` | `'auto'` | MediaSource 绑定方式：`auto`、`src`、`source-element` |

同时兼容 `retryCount`，其值会映射到 `retry`。

## 支持范围

`xgplayer-mp3` 仅支持 MPEG Audio Layer III；Layer I 和 Layer II 不在支持范围内。

| 能力 | 状态 | 说明 |
| --- | --- | --- |
| 独立 `.mp3` URL | 支持 | HTTP(S)、Blob URL 或返回完整文件的普通请求 |
| MPEG-1 Audio Layer III | 支持 | 常见音乐 MP3，1152 samples/frame |
| MPEG-2 Audio Layer III | 支持 | 低采样率 MP3，576 samples/frame |
| MPEG-2.5 Audio Layer III | 支持 | 广泛兼容的非正式扩展，576 samples/frame |
| CBR | 支持 | 初始时长按文件字节数估算，顺序下载完成后按实际帧修正 |
| Xing / Info | 支持 | Xing VBR 需要 TOC；Info CBR 使用 frame/byte count |
| VBRI VBR | 支持 | 使用 VBRI 表建立 seek 映射 |
| 无 Xing/Info/VBRI 的 VBR | 原生降级 | 不承诺未经完整扫描的精确 Range seek |
| Free-format MP3 | 原生降级 | 帧头没有可直接查询的标准码率索引 |
| ID3v1 / ID3v2 | 支持 | 可位于音频帧之前、之后或帧与帧之间 |
| DRM / EME | 不支持 | 当前仅处理明文 MP3 |

AAC / ADTS 不属于 MP3，本插件不处理这些格式。本插件也不提供软件解码，最终解码
能力取决于浏览器对 `audio/mpeg` 的支持。

## 兼容性与降级

可以在运行时检测当前环境是否支持 MP3 MSE：

```js
if (MP3Plugin.isSupported()) {
  // 支持 audio/mpeg SourceBuffer
}
```

通常不需要在初始化前手动检测。出现以下情况时，插件默认恢复原始 URL 和播放状态，
并交由浏览器原生 `<audio>` 继续处理：

- 当前环境不支持 `audio/mpeg` MSE。
- 文件不属于支持范围，或者无法建立可靠的 seek 映射。
- MSE 初始化、加载或追加数据时发生致命错误。

设置 `closeDowngrade: true` 后，插件不会切换到原生播放，而是向播放器发出终止错误。

## MP3 格式说明

MP3 是 MPEG Audio Layer III 的简称，不是 MPEG-3，也不是类似 MP4 的多轨容器：

```text
[ID3v2，可选]
[MP3 Frame 1]
[MP3 Frame 2]
...
[ID3v1，可选]
```

MPEG Audio Version 与 Layer 是两个独立维度：

| MPEG Audio Version | 采样率 | Layer III 每帧采样数 | 常见定位 |
| --- | --- | ---: | --- |
| MPEG-1 | 32 / 44.1 / 48 kHz | 1152 | 音乐、高质量音频 |
| MPEG-2 | 16 / 22.05 / 24 kHz | 576 | 语音、低带宽音频 |
| MPEG-2.5 | 8 / 11.025 / 12 kHz | 576 | 超低带宽语音 |

这里的 Version 是 MPEG Audio 帧头字段，与 MPEG-4 等标准家族的版本号无关。

## 工作原理

![xgplayer-mp3 playback pipeline](./docs/mp3-mse-flow.svg)

插件首先探测 ID3、MP3 帧和 Xing/Info/VBRI 索引，再将播放时间映射到文件字节
位置，通过 HTTP Range 加载帧对齐的数据。

`xgplayer-mp3` 遵循
[MPEG Audio MSE Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-mpeg-audio/)，
将帧对齐的 MP3 数据直接追加到 `audio/mpeg` SourceBuffer，无需转封装为 MP4。
按照该规范，`audio/mpeg` 不附加 `codecs` 参数。

## 错误标识

致命错误会通过 `playCatch` 事件对外通知：

| `vtype` | 阶段 |
| --- | --- |
| `MP3_1` | 首次数据追加完成前 |
| `MP3_2` | 首次数据追加完成后 |

默认配置下，事件发出后插件会继续执行原生播放降级。
