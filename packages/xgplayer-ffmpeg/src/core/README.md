# FFmpeg WASM 核心

本目录的 `FFmpeg` 和 `LoadSession` 管理播放会话。真正执行媒体处理的 FFmpeg 核心在 Worker 内运行，由部署的 JS / WASM 资源加载。

## 核心里有什么

FFmpeg WASM 是 FFmpeg C/C++ 代码及其依赖经 Emscripten 编译后的产物。支持哪些容器、编解码器和滤镜，在编译时决定。

| 组成 | 职责 |
| --- | --- |
| `ffmpeg-core.wasm` | FFmpeg / FFprobe 原生入口、解封装、编解码、重采样、封装等已编入的能力 |
| `ffmpeg-core.js` | Emscripten 运行时：加载 WASM、管理线性内存和虚拟文件系统、连接 JS 回调 |
| `worker.js` | 本插件的 Worker：HTTP 读取、核心调用、Asyncify 暂停 / 恢复、输出传输和 ACK |
| `src/core` | 主线程会话：源切换、MSE 追加、时长、缓冲窗口及销毁 |

当前使用单线程 `@ffmpeg/core` 0.12.10，不使用上游 `@ffmpeg/ffmpeg` 的文件任务封装。这里导出的 `FFmpeg` 类是本插件的播放接口。

转码由 WASM 执行，不会自动调用浏览器的 WebCodecs 或 GPU 编码器。浏览器通过 MSE 播放转码后的媒体，是另一个阶段。

## 为什么能边下载边播放

```text
HTTP reader → FFprobe 探测 → 重放输入前缀 → FFmpeg → fMP4 → MSE
                                             ↑            │
                                             └──── ACK ───┘
```

Worker 将 HTTP reader 和输出回调注册为虚拟文件系统设备，FFmpeg 通过文件 I/O 使用它们。输出显式采用 `pipe` 协议，告知 FFmpeg 数据不可 seek。

原生 I/O 是同步的，`fetch` 和 MSE 消费是异步的。Asyncify 对 WASM 做转换，使执行可以在读写处暂停，等待数据或 ACK 后恢复。缓冲达到上限时，主线程延后 ACK，核心随之停止读写；无需 `SharedArrayBuffer` 或 COOP/COEP。代价是 WASM 体积和执行开销增加。

FFprobe 使用 profile 的输入参数读取最多 64 KiB 前缀，获取 JSON 时长；随后 FFmpeg 重放这些字节并继续同一 HTTP reader。已知时长通过 `MSE.updateDuration()` 设置 `MediaSource.duration`，输出字节保持 FFmpeg 原样。探测不到时长则先保持 `Infinity`，最后一次追加完成后按实际缓冲末尾确定时长，再调用 EOS。

每次加载独占一个 Worker 和核心实例。切换、取消或销毁会终止 Worker，释放该次执行的 WASM 内存。

缓冲内 seek 由媒体元素处理；前向未缓冲目标唤醒原有转码，回退到已清理的数据则由 `FFmpeg` 重建加载会话。新会话转码到目标位置后恢复原播放状态，源切换或销毁会取消待完成的跳转。

## 生成与部署

在仓库根目录执行：

```bash
yarn
yarn ffmpeg:runtime
yarn build xgplayer-ffmpeg
```

`ffmpeg:runtime` 调用 [prepare-runtime.cjs](../../prepare-runtime.cjs)，读取已安装核心的 ESM JS / WASM，校验入口和 I/O 导入，用 Binaryen `wasm-opt --asyncify -O2` 转换 WASM，并为 JS 增加流式执行入口。它适配已有核心，不会从源码重新编译 FFmpeg，也不会增加编解码器。

准备机需要 `wasm-opt`；工具也可从 Emscripten 的 `BINARYEN_ROOT` 定位，或由 `WASM_OPT` 指定。业务页面无需这些构建工具。

命令返回系统临时目录中的摘要子目录，包含 `ffmpeg-core.js`、`ffmpeg-core.wasm` 和用于缓存校验的 `runtime.json`。可用 `yarn ffmpeg:runtime /tmp/my-ffmpeg-runtime` 指定产物父目录。部署该目录中的 JS / WASM 配对资源及本包构建的 `dist/worker.js`；`runtime.json` 不参与浏览器加载。

建议同源托管 Worker 和核心，WASM 使用 `application/wasm`。跨域媒体需要 CORS，站点 CSP 需允许 Worker、模块及 WASM 执行。资源按版本部署，避免缓存混用 JS / WASM。Demo 用 `yarn dev:ffmpeg` 启动，Worker 源码修改后需重启。

## 接入与配置

```js
import { FFmpeg, createAudioProfile } from 'xgplayer-ffmpeg'

const core = new FFmpeg({
  media: document.querySelector('audio'),
  ffmpeg: {
    workerURL: '/ffmpeg/worker.js',
    coreURL: '/ffmpeg/ffmpeg-core.js',
    wasmURL: '/ffmpeg/ffmpeg-core.wasm'
  }
}, createAudioProfile())

core.on('error', console.error)
await core.load('/audio/example.wma')
// 退出播放页时调用 core.destroy()
```

三项 URL 分别指向本插件 Worker、准备后的 JS glue 和对应 WASM。`load()` 在目标位置的首个缓冲可播放时完成，不表示整文件转码完成。

`segmentDuration` 控制目标分片时长，`bufferAhead` / `bufferBehind` 控制 MSE 缓冲窗口，`requestOptions` 控制 HTTP 请求，`timeout` 限制首次可播放前的等待时间。完整配置和播放器插件接入见[包级说明](../../README.zh-CN.md)。

默认 [audio profile](../profiles/audio.ts) 输出第一条音轨，编码为 AAC-LC、48 kHz、双声道、128 kbps。无头 PCM 需要明确格式、采样率和声道数，例如 `createAudioProfile({ inputFormat: 's16le', inputSampleRate: 16000, inputChannels: 1 })`。

## 扩展改哪里

| 需求 | 修改位置 |
| --- | --- |
| 调整码率、采样率、声道或选择音轨 | `FFmpegOutputProfile` 的输入 / 输出参数 |
| 调整请求、缓冲或取消行为 | HTTP reader、`Transcoder` 或 `LoadSession` |
| 增加核心未包含的解封装器、编解码器或滤镜 | 重新编译 FFmpeg 核心 |
| 支持实际视频转码 | 视频 profile、输出 MIME、关键帧和音画同步策略，并验证目标设备性能 |

`inputArguments` 在 `-i` 前使用，也传给 FFprobe；`outputArguments` 描述选流和编码。MIME、media 类型及编码结果必须一致。输出设备和 fMP4 分片参数由公共链路管理。

仓库目前没有从 FFmpeg 源码重建核心的命令。需要新增或裁剪原生能力时，使用[上游构建脚本](https://github.com/ffmpegwasm/ffmpeg.wasm)，固定 FFmpeg、Emscripten 和依赖版本，调整原生构建选项，生成新的 ESM JS / WASM。保留 FFmpeg、FFprobe 及本插件依赖的运行时接口，再对齐准备脚本的输入来源、版本和入口校验、[Worker 核心契约](../worker/core.ts)。自定义核心不能只替换一个 `wasmURL`。

升级或扩展后，验证真实媒体的探测、完整解码、提前播放、暂停背压、取消和 EOS；同时检查核心体积、内存与目标浏览器的 MSE 支持。编译进了编码器，不等于插件已支持对应播放方案。

## 避免什么

- 不混用不同构建的 JS / WASM，不直接修改 `node_modules`，不将 stock 或多线程核心直接换进当前流式链路。
- 不为流式播放先下载完整文件写入 MEMFS，再等待完整输出；这会失去提前播放和有界输入的意义。
- 不在主线程执行核心，也不并发调用同一个核心实例；取消由 Worker 生命周期处理。
- 不靠解析日志文本或改写 MP4 box 设置时长；使用 FFprobe JSON 和 MSE API。
- 不以扩展名或本机 FFmpeg 的能力推断浏览器支持；输入取决于 WASM 构建，输出还取决于 MSE。

参考：[ffmpeg.wasm 组成与构建](https://ffmpegwasm.netlify.app/docs/overview/)、[Emscripten Asyncify](https://emscripten.org/docs/porting/asyncify.html)。
