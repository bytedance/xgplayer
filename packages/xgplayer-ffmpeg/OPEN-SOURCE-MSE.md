# 开源 FFmpeg I/O 与 MSE 接入方案评估

核对日期：2026-11-04。结论针对本包的 HTTP 音频 → MSE 场景：WMA、FLAC、显式参数 PCM，有限下载、前后 seek、MMS 回收恢复，以及无需跨源隔离。

## 结论

更适合此需求的处理模型是 **有界字节源 + 常驻解复用会话 + 按 MSE 需求拉取完整分片**。libav.js、libav-wasm 和 libmedia 从不同层面提供了可借鉴的实现；没有核对到一个现成依赖同时覆盖本包的格式、下载预算和 MSE 生命周期。

在允许重新设计内部实现后，本项目选择 **定制 FFmpeg 库 + 小型原生桥接 + 原生 fMP4** 作为重写方向：输入格式、包时间、编解码与封装在同一原生会话内连接。libav.js 的文件、异步与所有权实现仍是参考；不将其与 xgplayer 封装器绑定为唯一架构。选择依据是适配层简化，不是尚未测量的性能优势。完整重写架构见 [IO-DESIGN.md](./IO-DESIGN.md)。

重构前的 CLI 实验修正了时间戳判断：正确 mux 参数可以保留 seek 后的源时间，**不必依赖 framecrc 才能实现时间映射**。该实验仅验证原生 mux 方向，详见[实验](#重构前核心的时间戳实验)。新核心的真实 WASM 与 Chrome 结果见[当前验证](#新核心与-chrome-验证)。

## 相同维度比较

下表均为核对日期的源码事实。各方案没有同条件的 WMA / FLAC / PCM 性能对照，不能排序 CPU 或总内存优劣。

| 方案 | 输入与随机读取 | seek 生命周期 | MSE 与背压 | 本包格式适配 | 采用判断 |
| --- | --- | --- | --- | --- | --- |
| 重构前插件 | 单次完整 GET、不可 seek 字符设备 | 未缓冲前跳顺序补齐；后跳重建 | 输出 ACK 控制应用消费，不能限制完整响应下载 | 三类输入已有实现 | 已替换为有界 Range、原生桥与需求拉取 |
| libav.js | 普通虚拟文件式块设备、异步回调；有限 Range / LRU 由调用者实现 | 原生 seek API；上下文及状态管理由调用者负责 | 有界 packet API；无现成 MSE 调度，`onwrite` 不等待 Promise | 需要包含 ASF/WMA、AAC、PCM 的定制构建 | 首个库级验证基线 <a href="#source-1">[cite:1]</a> |
| banou26/libav-wasm | 自定义 AVIO `read(offset, size)`，不经文件系统 | 当前源码保留输入上下文，重建输出及音频处理状态 | 原生 fMP4、按段读取、播放器侧追加 | 当前拒绝纯音频，也没有裸 PCM 输入参数入口 | 最接近目标管线，参考设计；不能直接替换 <a href="#source-2">[cite:2]</a> |
| libmedia | TS 异步 I/O；Fetch 支持有限 preload 范围 | 等待在途 pull，清空相关状态后定位 | packet pull、MSE 高低水位，编解码与渲染另有管线 | 有 WMA decoder，但未发现 ASF demuxer；裸 PCM 待验证 | 借鉴调度；整体接入会扩大替换范围 <a href="#source-3">[cite:3]</a> |
| matroska.js | 面向 MKV / WebM 的解析与读取 | 分窗口处理，任务身份隔离旧输出 | Rust remux → MSE；不支持的音轨用 ffmpeg.wasm 独立转码 | 输入容器范围不能替代 WMA / FLAC 文件入口 | 借鉴按轨透传与取消，不复制独立重启编码器的拼接方式 <a href="#source-4">[cite:4]</a> |
| movi-player | `SourceAdapter` 的读取、长度、缓存和非 Range 回退 | 源与解码定位配合 | 主路径 WebCodecs / Canvas，与我们的 MSE 播放出口不同 | 未验证三类输入的完整 MSE 路径 | 参考源抽象，不作 MSE 插件替代 <a href="#source-5">[cite:5]</a> |
| ffmpeg.wasm 官方封装 | Worker 中的文件、mount 与 CLI 任务接口 | 再执行命令，未提供常驻播放上下文 | 没有直接提供有界 Range → MSE 调度 | 取决于核心构建 | 合适文件任务，不直接解决播放生命周期 <a href="#source-6">[cite:6]</a> |

`ffmpegwasm/libav.wasm` 是另一个旧项目，不等同于 Yahweasel/libav.js 或 banou26/libav-wasm；选型时必须核对仓库与实际 API，不能按名称归为同一实现。

## 可借鉴的具体实现

### libav-wasm：常驻 AVIO 与原生 fMP4

其原生代码把 JS 异步读取桥接到 AVIO，并在一次读取操作中解复用、处理必要音频和封装 fMP4。调用者决定何时读取下一段，PCM 不必为了逐帧调用往返 Worker。当前 seek 保留解复用上下文和已建立的索引，释放旧 packet、音频 codec、重采样状态与输出上下文，然后重新定位。<a href="#source-2">[cite:2]</a>

这比当前“重新执行整个 CLI + 重绑 MSE”更接近播放器的资源生命周期。但以下源码边界阻止直接采用：

- 没有可用视频轨时，初始化明确抛出 `No playable video track`；本包的纯 WMA / FLAC 不能直接进入该管线。
- 输入没有本包所需的裸 PCM 格式、采样率、声道参数接口。
- AVIO 的 `SEEK_END` 分支使用 `input_length - offset`，与标准文件偏移的 `size + offset` 不同；我们的读取位置和 seek 回调独立实现、独立验证。
- README 中仍有“seek 重开输入”的旧描述，当前代码已保留输入；文档与代码不能互相代替验证。
- 本次根目录未发现许可证文件，package.json 也未声明 license；无法据此确认可直接复用其代码。
- Makefile 声明 `INITIAL_MEMORY=125mb`、`STACK_SIZE=50mb`；这是构建配置，不是浏览器 RSS，但说明不能直接照搬内存策略。<a href="#source-2">[cite:2]</a>

另一个关键细节是取消后的 AVIO 错误：旧 read 留下 `AVERROR_EXIT` 时，`avio_seek` 不会自动清除 `pb->error`。其 seek 在定位前显式重置该字段。我们的后端验收必须覆盖“等待 I/O → 取消 → 继续 seek → 正常 EOF”，而不仅是静态检查 epoch。<a href="#source-2">[cite:2]</a>

### libmedia：把输入需求与媒体缓冲分开控制

它把解封装放在 TS，将 FFmpeg 编解码器做成独立 WASM 模块，也可以连接 WebCodecs；异步文件 I/O 不需要整个原生解复用栈暂停。Fetch 的 preload 在已知长度和支持 Range 的路径限制请求终点，消费完才打开下一范围。MSEPipeline 通过当前可播放缓冲控制 packet pull，并在 seek 前等待在途操作和释放旧队列。<a href="#source-3">[cite:3]</a>

可采用的原则是“停止下一次生产和读取”，而不是启动一个全文件转码任务后无限积压输出。但它不是直接替代 FFmpeg 全部 demuxer 的库：源码格式集合没有 ASF，存在 WMA decoder 不能推出 WMA 文件可播放。其 MSE 能力判断失败后可切换软解渲染，也不等于自动转 AAC 再走 MSE。协议为 LGPLv3，具体 codec 依赖另有许可范围。<a href="#source-3">[cite:3]</a>

### matroska.js：按轨透传，以及独立转码窗口的代价

视频包通过 MKV remuxer 直接封装，只有不支持的音轨进入 FFmpeg。这个方向有助于未来的视频扩展：容器不支持不意味着所有轨道都要重新编码。<a href="#source-4">[cite:4]</a>

其独立音频窗口和 MSE 代码也显式讨论编码 priming 与间隙容忍。不能据此把“每几秒重启一次 AAC 编码器”视为连续音频的默认方案，更不能扩大 gap 容忍来隐藏错误时间轴。普通连续拉取应保持编码状态；seek 后再重建并处理预滚、padding 与窗口边界。parser 与 player/remux 采用不同许可证，整体不是可默认按 MIT 引入的播放器。<a href="#source-4">[cite:4]</a>

### hls.js：MMS 停止读取与 seek 准备之间的边界

hls.js 不是 FFmpeg 后端，但其 MSE 控制更直接相关。当前 `endstreaming` 处理在 `media.seeking` 时返回，并在 seeking 时恢复 buffering，代码引用 WebKit #321919。它也将清理、追加和配额恢复放入缓冲操作队列。<a href="#source-7">[cite:7]</a>

因此，本包不能绝对规定 `streaming=false` 时连未缓冲目标的首段都不准备。应给最新 seek 一个有字节、处理和时间预算的准备窗口；目标可播放后恢复普通 MMS 与水位策略。回收事件仍必须重新检查当前位置的连续缓冲，不能依赖“整个媒体已经转码过”。

## 我们的实现选择

稳定的外部结构是：

```text
LoadSession：当前连续缓冲、用户 seek、MMS、串行追加
    ↓ open / pull / seek / close
Worker 内 NativePipeline：解复用、必要编解码、完整分片与源时间
    ↓ readAt(offset, length)
Worker 内 HTTPSource：有限 Range、资源版本、有界缓存、取消
```

实现原则如下：

1. **MSE 决定生产许可。** 缓冲达到高水位后不再 pull。packet/frame 队列与输入字节分别有界；HTTP 不使用开放式 `bytes=offset-`。libav.js 的 jsfetch 即使支持 seek，也不能替代有限 Range 源。<a href="#source-1">[cite:1]</a>
2. **普通播放保持编解码状态。** seek 在有界操作结束后定位，保留 demuxer，重置有历史状态的 decoder / resampler / encoder / muxer；源切换才关闭整个会话。
3. **按输出计划 remux 优先。** 同时检测目标浏览器和封装器支持。重写以自动策略为方向，AAC-LC 为兼容输出；采样率、声道与码率由明确策略决定，不将当前固定配置作为全部输入的约束。WMA 和裸 PCM 仍需转换。
4. **源时间是输出契约。** libav.js 可返回编码包，由 xgplayer 封装；窄 bridge 可直接返回原生 fMP4。两条路径都明确 bias、真实 PTS、分片边界与 append window，不以 `seekTime` 代替首个包的时间。
5. **用一次媒体绑定完成普通 seek。** 保留可复用缓冲，串行完成 parser reset、精确 timestampOffset 与窗口设置、init 和媒体追加；当前共享 `setTimeoffset()` 的隐式 1 ms 修正不能进入新时间契约。时长使用 MSE API。
6. **当前交付单线程 Asyncify，JSPI 留作后续优化。** 后续增加配对构建时，在 Worker 中同时检测 `WebAssembly.Suspending` 和 `WebAssembly.promising`。MDN 当前资料列出了 Safari 27 支持，与部分项目“Safari 无 JSPI”的注释不同；以实际能力和配对构建为准。JSPI 不能替代 HTTP / MSE 控制。<a href="#source-10">[cite:10]</a>

libav.js 的优势是已有绑定、文件设备和可定制构建，减少自行维护原生接口；窄 bridge 的优势是原生处理闭环、自然分片边界和更少的通用绑定。重写选择后者，接受 C/C++ ABI、构建、取消与资源释放的维护责任。没有相同 codec 配置的运行数据，不能宣布其性能优于 libav.js。

现阶段不整体接入 libmedia、不直接依赖 libav-wasm，也不引入多个生产后端的注册框架。完整 Range、缓存、seek、MMS 与验收要求见 [IO-DESIGN.md](./IO-DESIGN.md)。

## 重构前核心的时间戳实验

<a id="local-proof"></a>
使用本包准备后的单线程 `@ffmpeg/core` 0.12.10、同一真实 WMA 输入，按原路径从不可 seek 的 pipe 输出 fMP4。测试在 Node 上执行实际 WASM，以 ffprobe 检查生成包；没有使用本机 FFmpeg 代替 WASM 转码。输入通过 MEMFS 供给，只隔离验证 mux 时间语义，不测有界 HTTP。

源为既有验证 URL `https://tosv.byted.org/obj/media-fe/lark/test.wma`，长度 `12,544,992 bytes`，时长 `728.084 s`。输出 AAC-LC、48 kHz、双声道、128 kbps，限制为 95 个编码包。<a href="#local-proof">[本地验证]</a>

关键参数：

```text
-copyts -start_at_zero -ss 600 -i /input
-map 0:a:0 -frames:a 95 -vn -sn -dn
-c:a aac -profile:a aac_low -ar 48000 -ac 2 -b:a 128k
-f mp4
-movflags +empty_moov+default_base_moof+frag_keyframe+frag_discont
-use_editlist 0 -avoid_negative_ts disabled -output_ts_offset 1
-frag_duration 1000000 -flush_packets 1 pipe:<fd>
```

其他参数保持相同，仅切换 `frag_discont`。结果：<a href="#local-proof">[本地验证]</a>

| 输入定位 | `frag_discont` | fMP4 首包 PTS（秒） | 减去显式 1 秒偏置 |
| --- | --- | --- | --- |
| `-ss 0` | 无 | 0.000000 | 不保留该源时钟 |
| `-ss 0` | 有 | 1.070667 | 0.070667 |
| `-ss 600` | 无 | 0.000000 | 不保留该源时钟 |
| `-ss 600` | 有 | 600.978667 | 599.978667 |
| 省略 `-ss` | 有 | 1.070667 | 0.070667 |

该参数组合参考 libav-wasm 原生 mux 设置，并与 FFmpeg 选项语义交叉核对。它确认当前核心不必借助 tee/framecrc 才能输出保留本样本源时间的分片；1 秒是实验 bias，不能当作所有 codec 的通用编码延迟。首次真实内容也不保证从精确 0 开始。<a href="#source-2">[cite:2]</a> <a href="#source-8">[cite:8]</a>

不能由此宣称最终 MSE 时间轴正确：这次重构前的 Chrome 验证页未收到 `sourceopen`，没有进入追加阶段，也没有边界听感或 Safari/MMS 结果。新核心通过独立 Chrome 进程完成了下文记录的追加与播放验证；两次实验的证据范围分别记录。<a href="#source-9">[cite:9]</a>

下一步后端验证用同一媒体集合和相同输出配置比较：

| 验证项 | 记录内容 |
| --- | --- |
| 提前播放与暂停 | 首段实际响应字节、暂停后的新增 Range、缓存与队列峰值 |
| 远距离前后 seek | 新增下载、目标内容是否正确、首个目标可播放延迟 |
| 取消与复用 | I/O 挂起时覆盖 seek，旧错误清除，最终正常 EOF，反复操作资源占用 |
| 连续音频 | 开头、尾部、分片与 seek 接缝的缺失、重复、priming / padding |
| MSE / MMS | 保持绑定、目标回收补回、seek 与 endstreaming 交错、配额恢复 |
| 构建与运行 | 相同 codec 配置的 JS / WASM 大小、原生堆、浏览器媒体内存、低端设备 CPU |

## 新核心与 Chrome 验证

2026-11-05，使用独立实现的 `native/pipeline.cpp`、固定 FFmpeg 8.0 与 Emscripten 6.0.10，完成单线程 Asyncify 构建。实际 JS/WASM 合计约 2.1 MiB，原生初始堆及本次原生验证堆为 32 MiB；这些数字不包含 HTTP 缓存、浏览器媒体缓冲或进程 RSS。构建缓存校验 JS/WASM 哈希，后续调用已验证命中缓存。

原生验证脚本用真实 WASM 输出 fMP4，以 ffprobe 核对首包 PTS 与导出的源时间、偏置，再用 FFmpeg 完整解码：

| 输入与路径 | 已验证结果 |
| --- | --- |
| 既有 728.084 秒 WMA → AAC | 打开、定位约 582.467 / 72.808 / 727.584 秒、回到开头、I/O 取消后再定位；五次目标准备共读取 486,368 字节、四个缓存块 |
| 16 kHz 单声道、3 秒 FLAC → FLAC | 原生透传、最终 drain、完整解码，实际输出末尾为 3 秒 |
| 同一 FLAC → AAC | 编码与 drain；首包源 PTS 为 -0.064 秒，真实 mux bias 为 0.064 秒，末尾完整 |
| 同参数显式 s16le PCM → AAC | 原生探测参数、编码、时间映射与最终 drain |

浏览器验证使用独立 Chrome、真实 HTTP Range 服务、当前 Worker 与 MSE 源码，不以 mock 证明播放正确。页面未配置 COOP/COEP，`crossOriginIsolated=false`。

| 场景 | 实际结果 |
| --- | --- |
| WMA 暂停填充 8 秒窗口 | 两个有限 Range，共 262,144 字节；缓冲约 0.068775–8.242198 秒，等待后没有新增下载 |
| 播放与前后定位 | 媒体时间推进；582.467、72.808 秒目标均进入真实 TimeRanges |
| 连续覆盖 Seek | 500 → 120 → 300 秒，最终 300 秒目标可播放 |
| 尾部与 EOS 后回跳 | 播放到 728.084 秒触发 ended；回跳精确 0 秒时恢复到实际首样本边界并再次推进媒体时间，没有新增下载，duration 保持 728.084 秒 |
| 同一实例更换源 | 重新打开源并定位 50 秒；上述 Seek 与源切换始终复用一个 Worker |
| FLAC 透传、FLAC 转 AAC、显式 PCM | 三条路径均到达 3 秒并触发 ended |
| xgplayer Demo 按钮 | 实际输入事件完成加载、播放/暂停、Seek、保留进度切换 URL、从头加载和销毁 |

浏览器验证发现并修复了三处真实边界错误：无返回值原生释放函数必须以 `ccall(..., null, ...)` 调用；EOS 后追加可能恢复包含编码 padding 的 coded-frame end，MSE 队列需要在重新追加后恢复已声明源时长；Seek 到精确零而首帧晚于零时，需要使用实际首样本边界，否则需求循环会持续读完整份文件。均已加入对应回归用例。

当前 145 个包测试通过，严格 TypeScript、触及源码的 Biome 和 ES/UMD/Worker 构建通过。覆盖率使用相同源码范围和 Babel instrumentation 对照重写前后，语句 94.82% → 96.06%、分支 87.08% → 87.40%、函数 91.53% → 97.57%、行 97.72% → 98.37%。另外核对了默认 V8 报告：它将纯类型协议计为未执行，并在多测试汇总中漏记了音频参数分支；单独运行该参数测试得到 100% 覆盖，因此未用异常汇总值替代同条件对照，也未改变仓库覆盖配置或收缩范围。

这些结果验证当前样本的处理闭环，不构成与 libav.js 的性能对照。Safari/MMS 实机回收及 endstreaming 交错、边界听感、任意 codec 的无缝拼接、低端设备 CPU/RSS 和更多 WMA 变体仍需后续验收。

## 源码与规范

<a id="source-1"></a>
**[cite:1] libav.js**，核对基线 `36e818c2ed4577517599976c51202b282f2edb49`：[块读取与 packet API](https://github.com/Yahweasel/libav.js/blob/36e818c2ed4577517599976c51202b282f2edb49/src/p-avformat.in.js)、[异步读取补丁](https://github.com/Yahweasel/libav.js/blob/36e818c2ed4577517599976c51202b282f2edb49/patches/ffmpeg/01-blocking-reader.diff)、[jsfetch 协议](https://github.com/Yahweasel/libav.js/blob/36e818c2ed4577517599976c51202b282f2edb49/patches/ffmpeg/07-jsfetch-protocol.diff)、[构建配置](https://github.com/Yahweasel/libav.js/blob/36e818c2ed4577517599976c51202b282f2edb49/docs/CONFIG.md)。

<a id="source-2"></a>
**[cite:2] banou26/libav-wasm**，基线 `20ba3461cfb065203c543020131c0fc260223e24`：[AVIO、纯音频限制与 seek](https://github.com/banou26/libav-wasm/blob/20ba3461cfb065203c543020131c0fc260223e24/src/main.cpp)、[构建与内存配置](https://github.com/banou26/libav-wasm/blob/20ba3461cfb065203c543020131c0fc260223e24/Makefile)、[package 元数据](https://github.com/banou26/libav-wasm/blob/20ba3461cfb065203c543020131c0fc260223e24/package.json)。

<a id="source-3"></a>
**[cite:3] libmedia**，基线 `152f629d3021fd8013efa464fcb7b55f9fbe7753`：[FetchIOLoader](https://github.com/zhaohappy/libmedia/blob/152f629d3021fd8013efa464fcb7b55f9fbe7753/packages/avnetwork/src/ioLoader/FetchIOLoader.ts)、[MSEPipeline](https://github.com/zhaohappy/libmedia/blob/152f629d3021fd8013efa464fcb7b55f9fbe7753/packages/avplayer/src/mse/MSEPipeline.ts)、[输入格式实现](https://github.com/zhaohappy/libmedia/tree/152f629d3021fd8013efa464fcb7b55f9fbe7753/packages/avformat/src/formats)、[AVPlayer 能力分流](https://github.com/zhaohappy/libmedia/blob/152f629d3021fd8013efa464fcb7b55f9fbe7753/packages/avplayer/src/AVPlayer.ts)、[设计与协议](https://github.com/zhaohappy/libmedia/blob/152f629d3021fd8013efa464fcb7b55f9fbe7753/README.md)。

<a id="source-4"></a>
**[cite:4] matroska.js**，基线 `539347f53981f34f9831dfbb38381235f36d5edc`：[MSE 与音频窗口实现](https://github.com/davidprojekt/matroska.js/blob/539347f53981f34f9831dfbb38381235f36d5edc/player-lib/src/mse.js)、[player 使用范围](https://github.com/davidprojekt/matroska.js/blob/539347f53981f34f9831dfbb38381235f36d5edc/player-lib/README.md)、[组件与协议说明](https://github.com/davidprojekt/matroska.js/blob/539347f53981f34f9831dfbb38381235f36d5edc/README.md)。

<a id="source-5"></a>
**[cite:5] movi-player**，基线 `8bd0b50d7cdfcef635e015ea93e365876088969d`：[SourceAdapter](https://github.com/MrUjjwalG/movi-player/blob/8bd0b50d7cdfcef635e015ea93e365876088969d/src/source/SourceAdapter.ts)、[HTTP 源](https://github.com/MrUjjwalG/movi-player/blob/8bd0b50d7cdfcef635e015ea93e365876088969d/src/source/HttpSource.ts)、[播放架构](https://github.com/MrUjjwalG/movi-player/blob/8bd0b50d7cdfcef635e015ea93e365876088969d/README.md)。

<a id="source-6"></a>
**[cite:6] ffmpeg.wasm 官方资料**：[运行架构](https://ffmpegwasm.netlify.app/docs/overview/)、[文件任务 API](https://ffmpegwasm.netlify.app/docs/api/ffmpeg/classes/FFmpeg/)。

<a id="source-7"></a>
**[cite:7] hls.js**，基线 `205cba1ab6961e687e56a07c2196ac4ecb1250c2`：[MMS 事件、缓冲队列与清理](https://github.com/video-dev/hls.js/blob/205cba1ab6961e687e56a07c2196ac4ecb1250c2/src/controller/buffer-controller.ts)、[缓冲需求与片段选择](https://github.com/video-dev/hls.js/blob/205cba1ab6961e687e56a07c2196ac4ecb1250c2/src/controller/stream-controller.ts)。

<a id="source-8"></a>
**[cite:8] FFmpeg 官方选项**：[movflags 与 fragmentation](https://ffmpeg.org/ffmpeg-formats.html)、[copyts、start_at_zero 与输入 seek](https://ffmpeg.org/ffmpeg.html)。

<a id="source-9"></a>
**[cite:9] W3C MSE 规范**：[ISO BMFF 字节流](https://www.w3.org/TR/mse-byte-stream-format-isobmff/)、[SourceBuffer、窗口与 ManagedMediaSource](https://www.w3.org/TR/media-source-2/)。

<a id="source-10"></a>
**[cite:10] MDN JSPI 接口与兼容性**：[WebAssembly.Suspending / promising](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Suspending)，本次读取的页面修改日期为 2026-07-09。
