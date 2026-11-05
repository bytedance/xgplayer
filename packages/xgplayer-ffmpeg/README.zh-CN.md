# xgplayer-ffmpeg

原生 FFmpeg + MSE 音频插件，支持 WMA/ASF、FLAC、WAV 和明确配置的无头 PCM。当前为仓库内 private 包，尚未发布到 npm。输入采用有界 HTTP Range，Worker 保留解复用会话，主线程按连续缓冲需求拉取 fMP4。

## 接入

```js
import Player from 'xgplayer'
import FFmpegPlugin from 'xgplayer-ffmpeg'

const player = new Player({
  id: 'player',
  mediaType: 'audio',
  url: '/audio/example.wma',
  plugins: [FFmpegPlugin],
  ffmpeg: {
    ffmpeg: {
      workerURL: '/runtime/worker.js',
      coreURL: '/runtime/ffmpeg-core.js',
      wasmURL: '/runtime/ffmpeg-core.wasm'
    },
    bufferAhead: 20,
    bufferLow: 10,
    bufferBehind: 20,
    audio: { outputCodec: 'auto' }
  }
})
```

`player.currentTime` 触发原生 Seek；`switchURL`、直接 `src` 赋值和清晰度切换由插件接管。更换地址保留进度及播放意图；同一源内 Seek 不重新绑定媒体，也不调用 `play()` 改变暂停状态。

## 输出策略

默认 `auto`：FLAC 输入且目标 MSE 支持时原样封装 FLAC，否则输出 AAC-LC。AAC 尽量保留源采样率和声道布局；不支持的采样率选择最近的 AAC 采样率，默认码率为每声道 64 kbps。指定 `sampleRate`、`channels` 或 `bitrate` 会进入编码路径。

```js
// 无文件头的 PCM：明确传入真实源参数。
audio: {
  inputFormat: 's16le', inputSampleRate: 16000, inputChannels: 1,
  outputCodec: 'aac', sampleRate: 16000, channels: 1, bitrate: 64000
}
```

`inputFormat` 支持 `s16le`、`s16be`、`s8`、`u8`、`alaw`、`mulaw`。`outputCodec: 'flac'` 强制透传，要求 FLAC 输入和兼容 MSE，不能改变编码参数。`profile` 接受 `createAudioProfile()` 生成的类型化音频策略；本原生核心不接受任意 CLI 参数或视频编码 profile。

## 下载与调度

| 配置 | 默认值 | 含义 |
|---|---|---|
| `bufferAhead` | 20 秒 | 达到高水位后停止下一次 pull |
| `bufferLow` | 高水位的一半 | 低于此水位恢复生产 |
| `bufferBehind` | 20 秒 | 清理播放位置之前的旧缓冲 |
| `segmentDuration` | 1 秒 | 按真实包时长形成分片，可能有限超量 |
| `cacheBytes` | 8 MiB | 源的 LRU 字节缓存上限 |
| `maxInputBytes` | 无默认限制 | 可选源文件总长度上限，与缓存独立 |
| `timeout` | 120 秒 | 首次可播放和 Worker 命令等待期限 |
| `requestOptions` | 无 | 请求头、credentials 等 GET 选项 |
| `preferMMS` / `mseAttachMode` | 共享 MSE 默认值 | MSE/MMS 选择与绑定方式 |

每次请求最多 128 KiB，最多一个进行中的读取。源必须具有固定长度、返回准确的 206 和字节范围；不支持服务器忽略 Range 后全量下载的降级。跨域服务器应暴露 `Content-Range`、`Content-Length` 和 `ETag`。若仅隐藏 `Content-Range`，允许通过 HEAD 的长度加 206、精确正文长度校验建立兼容契约。File/Blob、上传正文和动态长度直播源不受支持。

FFmpeg 打开输入的下载预算为 256 KiB；Seek 到目标首段的额外下载预算为 4 MiB。每次原生批次最多 64 个处理步骤和 256 KiB 输入包数据，另有耗时和无输出批次限制。预算耗尽明确报错。缓冲充足时不发起新的 pull，正在读取的有限 Range 和原生必要预读可以完成。

MMS 普通 `endstreaming` 停止生产；未缓冲 Seek 允许准备目标首个可播放窗口，随后恢复 streaming 策略。缓冲回收、等待和播放进度事件均重新检查当前位置的连续区间，后面的不连续缓冲不会掩盖缺口。

## 时间与结束

源时间来自原生包和解码帧 PTS，fMP4 偏移来自真实输出 DTS，精确映射到 SourceBuffer。保留必要音频预滚；不按 URL、字节比例或 Seek 目标估算时间，也不修改 MP4 box。

有些源的首个可播放时间略晚于零，例如验证过的 WMA 从约 0.0688 秒开始。初始化和回跳到零都选择实际首个可播放边界，不移动整条源时间线。时长由原生 demuxer 给出；源已知时长不会被一次 Seek 的局部输出末尾或 EOS 后重新追加的编码 padding 覆盖。未知时长到真实 EOF 才确定。最后分片追加和各级 drain 完成后执行 EOS。

事件为 `ffmpegReady`（duration、MIME、输出 codec、采样率和声道）、`ffmpegProgress`（媒体时间、下载量、总长度、缓存量和 Range 请求数）以及播放器标准错误事件（含 stage）。

## 构建与验证

先激活 Emscripten 6.0.10，再执行 `yarn ffmpeg:runtime` 或 `yarn dev:ffmpeg`。首次从固定 SHA256 的 FFmpeg 8.0 官方源码构建；后续命中指纹缓存。输出及中间文件留在系统临时目录，不写进仓库。部署匹配的 JS/WASM、`worker.js`，并保留许可证和构建来源信息。不要求 COOP/COEP 或 SharedArrayBuffer。

```bash
yarn typecheck
yarn test packages/xgplayer-ffmpeg --runInBand --verbose=false --silent
node packages/xgplayer-ffmpeg/native/verify.mjs <runtime目录> <本地媒体>
# PCM 可追加：s16le 16000 1
```

原生验证使用真实 WASM 完成 Seek、编码和封装，再用 ffprobe 检查包 PTS、用 FFmpeg 完整解码。独立 Chrome 已验证有界暂停加载、前后及连续 Seek、源切换、三种音频路径的结束和 EOS 后回跳；Demo 按钮操作也已验证。MMS 回收等场景另有单测，Safari/MMS 实机、接缝听感和低端设备资源仍待验收。架构与来源见 [IO-DESIGN](./IO-DESIGN.md) 和 [开源评估](./OPEN-SOURCE-MSE.md)。
