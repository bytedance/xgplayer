# xgplayer-mp3

`xgplayer-mp3` 是面向独立 MP3 文件的 xgplayer streaming plugin。它解析 MP3
帧与文件级索引，通过 HTTP Range 按需加载，并将原始 MP3 字节直接追加到
`audio/mpeg` SourceBuffer。

它不会把 MP3 转封装成 MP4，也不负责 HLS/MPEG-TS 中的 MP3 音轨。后者仍由
`xgplayer-hls` 处理。

![xgplayer-mp3 playback pipeline](https://raw.githubusercontent.com/bytedance/xgplayer/main/packages/xgplayer-mp3/docs/mp3-mse-flow.svg)

```text
MP3 URL
  │
  ├─ probe: ID3 + MPEG Audio Layer III + Xing/Info/VBRI
  │
  ├─ time → byte offset → HTTP Range
  │
  └─ frame-aligned bytes → SourceBuffer("audio/mpeg") → <audio>

unsupported MSE / invalid MP3 / unindexed VBR
  └─ native <audio src="..."> fallback
```

## 安装

```bash
yarn add xgplayer xgplayer-mp3
```

## 使用

```js
import Player from 'xgplayer'
import MP3Plugin from 'xgplayer-mp3'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/audio.mp3',
  mediaType: 'audio',
  plugins: [MP3Plugin],
  mp3: {
    maxBufferLength: 40,
    minBufferLength: 5,
    bufferBehind: 30,
    segmentDuration: 10
  }
})
```

运行时能力检测：

```js
if (MP3Plugin.isSupported()) {
  // MediaSource.isTypeSupported('audio/mpeg') === true
}
```

当 MSE 不支持 `audio/mpeg`，或者文件超出本包支持范围时，默认会卸载 MSE，
恢复原始 URL，并交给浏览器原生 `<audio>` 播放。

## 支持范围

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
| MPEG Audio Layer I / II | 原生降级 | 不属于 MP3，即使 `audio/mpeg` 可能支持 |
| HLS / MPEG-TS 中的 MP3 | 不处理 | 使用 `xgplayer-hls` |
| AAC / ADTS | 不处理 | 不是 MP3 |
| DRM / EME | 不支持 | 当前仅处理明文 MP3 |
| 软件解码 | 不支持 | 依赖浏览器 `audio/mpeg` 解码能力 |

首版范围刻意限定为 **MPEG Audio Layer III**。内部复用 MPEG Audio 帧头解析，
但公共包不会因为解析器能够识别 Layer I/II，就把这些格式声明为已支持。

## MP3、Layer 和 MPEG Version

MP3 不是 MPEG-3，也不是类似 MP4 的多轨容器：

```text
[ID3v2，可选]
[MP3 Frame 1]
[MP3 Frame 2]
...
[ID3v1，可选]
```

MP3 的全称是 **MPEG Audio Layer III**。MPEG Audio 同时定义了 Layer I、
Layer II 和 Layer III；只有 Layer III 被称为 MP3。

MP3 帧头中的 MPEG Audio Version 是另一个独立维度：

| MPEG Audio Version | 采样率 | Layer III 每帧采样数 | 常见定位 |
| --- | --- | ---: | --- |
| MPEG-1 | 32 / 44.1 / 48 kHz | 1152 | 音乐、高质量音频 |
| MPEG-2 | 16 / 22.05 / 24 kHz | 576 | 语音、低带宽音频 |
| MPEG-2.5 | 8 / 11.025 / 12 kHz | 576 | 超低带宽语音 |

这里的 Version 只是 MP1/MP2/MP3 帧语法中的 2-bit 解析字段，不是
MPEG-4、MPEG-7 等完整标准家族的版本号：

- MPEG-4 是包含 AAC、Visual/AVC、Systems 和 MP4 File Format 的标准集合。
- MPEG-7 用于描述、分类和检索媒体内容，不是音频 codec。
- 当前包不解析 MPEG-4 AAC，也不处理 MPEG-7 metadata。

## 为什么可以直接使用 MSE

[MPEG Audio MSE Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-mpeg-audio/)
定义了：

- MPEG-1/2/2.5 Layer I/II/III 使用 MIME `audio/mpeg`。
- MIME **不得**附加 `codecs` 参数。
- 每个 MPEG Audio frame 都可以作为随机访问点。
- ID3v1、ID3v2 可以出现在帧之前、之后或帧与帧之间。

因此本包采用 passthrough：

```js
const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')
sourceBuffer.appendBuffer(frameAlignedMP3Bytes)
```

以下写法不属于本包的 SourceBuffer MIME：

```js
// 不使用
mediaSource.addSourceBuffer('audio/mpeg; codecs="mp3"')
mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.69"')
```

## 与历史 HLS MP3 支持的区别

xgplayer-transmuxer 中已有的 `MPEG` parser 最初服务于以下链路：

```text
.m3u8 → MPEG-TS → PMT stream_type 0x03/0x04 → PES + PTS → MP3 frames
```

在该链路中：

- MPEG-TS 提供分片边界。
- PES 提供时间戳。
- `xgplayer-hls` 负责下载、seek 和 buffer 生命周期。

独立 MP3 文件没有 TS/PES，因此 `xgplayer-mp3` 额外实现：

- 文件头与任意位置 ID3 扫描。
- Xing、Info、VBRI 索引。
- CBR 时间与字节映射。
- HTTP Range 分段。
- frame-aligned seek。
- SourceBuffer timestampOffset 管理。

## HTTP 和 CORS 要求

推荐服务器支持：

```http
Accept-Ranges: bytes
Content-Type: audio/mpeg
Content-Range: bytes 0-131071/2892276
```

跨域请求还应暴露 Range 相关响应头：

```http
Access-Control-Expose-Headers: Content-Range, Content-Length, Accept-Ranges
```

如果服务器忽略 Range 并返回 `200` 完整文件，本包仍可播放，但会失去按需下载的
带宽优势，并在内存中保留完整文件。

如果服务器返回 `206`，但 JavaScript 无法读取包含完整文件大小的
`Content-Range`，MSE 路径会失败并触发原生降级。

## 配置

| 配置 | 默认值 | 说明 |
| --- | ---: | --- |
| `maxBufferLength` | `40` | 播放时向前预加载的目标时长，单位秒 |
| `minBufferLength` | `5` | 暂停时向前预加载的目标时长，单位秒 |
| `bufferBehind` | `30` | 当前时间之前保留的历史 buffer，单位秒 |
| `segmentDuration` | `10` | 每个 Range 分段期望覆盖的音频时长 |
| `tickInterval` | `500` | buffer 调度周期，单位毫秒 |
| `probeSize` | `131072` | 首次格式探测字节数 |
| `maxProbeSize` | `1048576` | 为跳过大 ID3 标签允许扩展的最大探测字节数 |
| `syncSearchSize` | `4096` | seek 时向前搜索 MP3 帧同步字的字节数 |
| `retry` | `3` | 网络重试次数 |
| `retryDelay` | `1000` | 网络重试间隔，单位毫秒 |
| `timeout` | `5000` | 单次网络请求超时，单位毫秒 |
| `reqOptions` | `null` | 透传 method、headers、credentials 等请求参数 |
| `closeDowngrade` | `false` | 为 `true` 时关闭原生播放降级 |
| `preferMMS` | `false` | 优先选择 ManagedMediaSource |
| `mseAttachMode` | `'auto'` | MediaSource 绑定方式：`auto`、`src`、`source-element` |

兼容旧配置时，`retryCount` 会映射到 `retry`。

## 错误与降级

初始化阶段失败时：

```text
player.vtype = "MP3_1"
player.emit("playCatch", "MP3_1", error)
```

完成首次 append 后发生运行时失败：

```text
player.vtype = "MP3_2"
player.emit("playCatch", "MP3_2", error)
```

默认降级顺序：

1. 停止 Range 请求。
2. 清理 SourceBuffer 和 MediaSource。
3. 恢复 xgplayer 原生 `switchURL`、`playNext`、`changeDefinition`。
4. 将原始 URL 赋回 `<audio src>`。
5. 在 `loadedmetadata` 后恢复播放时间和暂停状态。

设置 `closeDowngrade: true` 后不会执行上述降级，而是向 player 发出终止错误。

## 导出

```js
import MP3Plugin, { MP3, MP3Plugin } from 'xgplayer-mp3'
```

TypeScript 同时导出：

```ts
import type { MP3Metadata, MP3Options } from 'xgplayer-mp3'
```
