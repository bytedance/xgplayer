# xgplayer-ffmpeg

FFmpeg + MSE 流式插件，边下载、边转码、边播放。默认将第一条音轨转为 AAC-LC、48 kHz、双声道、128 kbps。当前为仓库内的 private 包，尚未发布到 npm。

## 接入

```js
import Player from 'xgplayer'
import FFmpegPlugin from 'xgplayer-ffmpeg'

const player = new Player({
  id: 'player',
  mediaType: 'audio',
  url: '/audio/example.wma',
  autoplay: false,
  plugins: [FFmpegPlugin],
  ffmpeg: {
    ffmpeg: {
      workerURL: '/ffmpeg/worker.js',
      coreURL: '/ffmpeg/ffmpeg-core.js',
      wasmURL: '/ffmpeg/ffmpeg-core.wasm'
    }
  }
})

player.on('ffmpegReady', ({ duration }) => console.log(duration))
player.on('error', console.error)
```

媒体源支持 HTTP(S) URL 和页面相对路径，不支持 File、Blob、源列表或 DRM。跨域媒体需允许 `fetch` CORS 请求。

## 运行与部署

在仓库根目录运行 Demo：

```bash
yarn
yarn dev:ffmpeg
```

默认端口 8081，可通过 `FFMPEG_PORT` 修改。Worker 源码修改后需重启 Demo。

准备部署资源：

```bash
yarn ffmpeg:runtime
yarn build xgplayer-ffmpeg
```

准备核心需要 Binaryen 的 `wasm-opt`，也可用 `WASM_OPT` 指定工具路径。将命令返回目录中的 `ffmpeg-core.js`、`ffmpeg-core.wasm` 与构建后的 `dist/worker.js` 部署到示例配置的 URL。JS / WASM 必须来自同一构建；普通或多线程核心不能直接替换准备后的核心。

页面需要 WebAssembly、模块 Worker 和目标 MIME 的 MSE 支持，无需 COOP/COEP 或 `SharedArrayBuffer`。建议同源部署 Worker 和核心，WASM 使用 `application/wasm`，CSP 需允许对应资源执行。核心组成、生成方式与扩展见[核心说明](./src/core/README.md)。

## 配置与事件

以下配置位于 `Player` 的 `ffmpeg` 选项中：

| 配置 | 默认值 / 用途 |
| --- | --- |
| `ffmpeg.workerURL`、`coreURL`、`wasmURL` | 必填，Worker 与配对的核心资源 |
| `maxInputBytes` | 默认不限，可设置输入总字节上限 |
| `timeout` | 120000 ms，首次可播放前的等待上限 |
| `segmentDuration` | 1 秒，目标分片时长 |
| `bufferAhead` / `bufferBehind` | 20 / 20 秒，前向与历史缓冲窗口 |
| `requestOptions` | HTTP 请求参数，支持 headers、credentials 和普通 POST body |
| `preferMMS` / `mseAttachMode` | 共享 MSE 的媒体源选择与绑定方式 |
| `audio.inputFormat` | 原始音频格式：`s16le`、`s16be`、`s8`、`u8`、`alaw`、`mulaw` |
| `audio.inputSampleRate` / `audio.inputChannels` | 原始音频必填，须与源数据一致 |
| `profile` | 自定义输入 / 编码参数，须与 media 类型及 MIME 一致 |

`ffmpegReady` 在首个目标缓冲可播放后触发，提供 `{ duration, mimeType }`。此时下载和转码可能仍在继续。

`ffmpegProgress` 提供 `{ progress, time, downloadedBytes, totalBytes?, inputEnded }`，`time` 单位为微秒。`progress` 是 FFmpeg 进度，`downloadedBytes` 是 Worker 已读取的字节数。

错误通过播放器 `error` 事件上报，`ext.stage` 为 `download`、`runtime`、`transcode` 或 `buffer`。

## 播放行为

- FFprobe 获取已知时长，通过 MSE API 设置；未知时长先保持 `Infinity`，转码结束后按实际缓冲末尾确定。
- 缓冲内跳转直接生效；前向未缓冲位置需等待转码到达目标，回退到已清理的位置会重新读取并转码。历史回退恢复原播放状态，进度条行为遵循播放器 seek 配置；不支持 HTTP Range 随机定位。
- `switchURL()` / `changeDefinition()` 保留播放状态和目标进度；`playNext()` 从头开始。退出播放页时调用 `player.destroy()`。
- 默认转换有损，丢弃视频、字幕和其他音轨。当前提供音频 profile，视频策略需另行实现。
- 格式支持取决于核心的解封装器、解码器和输入参数；依赖尾部索引或必须 seek 的容器不能保证提前播放。
- WASM 转码会占用 CPU 和内存，流式读取不能消除核心下载、初始化与编解码开销。FFmpeg 及编码库的许可证按实际核心构建处理。
