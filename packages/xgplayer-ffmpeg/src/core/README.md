# FFmpeg WASM 核心

核心由本项目原创的 [native/pipeline.cpp](../../native/pipeline.cpp) 和 FFmpeg 8.0 的 libavformat、libavcodec、libswresample、libavutil 组成。Emscripten 6.0.10 构建单线程模块，仅 `source_read` 应用 Asyncify。没有 CLI、FFprobe、MEMFS 输入文件、线程或原生网络协议。

## 职责与生命周期

| 层 | 职责 | 生命周期 |
|---|---|---|
| `Transcoder` | Worker 命令、epoch、取消和故障超时 | 一个播放器核心 |
| `StreamingWorker` | 核心加载复用、原生命令串行队列 | 一个 Worker |
| `HTTPSource` / `BlockCache` | 绝对偏移读取、206 验证、128 KiB 请求、8 MiB LRU | 一条源 |
| `NativePipeline` | 源与原生 handle、输出策略、操作取消和预算 | 一条源 |
| `NativeBindings` | 固定签名的 C ABI、同步与 Asyncify 入口、输出复制与释放 | 无独立资源生命周期 |
| 原生 `Pipeline` | AVIO、解复用、Seek、codec、FIFO、原生 fMP4 | 一条源；转换与封装在 Seek 时重建 |
| `LoadSession` | 当前目标与连续缓冲水位、启动、Seek、MMS 回收 | 一次加载 |
| `MSEBuffer` | 串行属性、append、remove、duration、EOS | 一次媒体绑定 |

`open / pull / seek / close` 是有回复的命令。`cancel` 是立即生效的 JS 控制消息：中断 HTTP 读取并使旧 epoch 失效，不在原生调用暂停期间进入另一个 WASM 函数。下一条原生命令等旧调用返回后执行。切换源释放原生源和缓存，保留核心模块；普通 Seek 同时保留源、缓存和媒体绑定。

`LoadSession` 保持一个需求循环，初始化、待执行 Seek、生产需求和输出消费由类内方法组织。`pendingSeek` 表示尚未完成原生定位，`awaitingPlayableTarget` 表示目标尚未被实际缓冲覆盖；两者可以同时存在。`producing` 保留高低水位之间的历史决策。

## 原生 I/O 与时间

`avio_alloc_context` 的 read 回调通过 `readSource(offset, destination, length)` 异步读源；seek 回调维护独立 cursor，并实现 SET、CUR、END 和 AVSEEK_SIZE。HTTP 块边界允许短读。真实 EOF、AVERROR_EXIT 取消和网络错误保持不同结果。

`avformat_seek_file` 使用 FFmpeg 自己的容器索引，向前保留解码预滚。Seek 清理 codec、FIFO、resampler 和 mux 状态，并清除上一次取消留下的 AVIO error。流 origin 在打开时确定，所有 epoch 使用同一源时钟。无 PTS 的 decoder drain 样本延续此前真实帧 PTS 与样本数构成的时钟。

原生资源和处理方法由 `Pipeline` 私有持有，C 导出只调用操作入口和输出访问器。`resetProcessing` 协调封装、音频转换及暂存包帧的清理，保留输入与输出配置；各 drain 标志分别记录实际处理阶段。`NativeBindings.takeOutput` 先复制堆数据再释放原生输出，下一次原生调用不影响已交付的分片。

AAC 输出按实际包 DTS 得到 fMP4 bias，主线程以 `timestampOffset = -bias` 恢复源时间。mux 使用 `frag_custom`，init 和完整媒体分片分别返回；不解析或改写 MP4 box，不用目标时间作为输出时间原点。预滚包保持可解码性，用户 currentTime 指向实际目标。

## 有界生产与缓冲

一次原生 pull 最多 64 个处理步骤或 256 KiB 输入包数据，返回 init、media、yield 或 eof。JS 每次 IO（包括缓存命中）让出事件循环；纯计算批次也通过有回复的 pull 返回主线程。输出最多 8 MiB，WASM 堆初始 32 MiB、上限 256 MiB。输入打开预算 256 KiB，Seek 首段额外预算 4 MiB，原生操作耗时 30 秒，无媒体输出最多 1024 批次；无法返回的故障由主线程超时终止。

主线程只在需要补缓冲时发出下一次 pull，避免把整个源交给一个长转码命令。高低水位检查当前位置的连续 SourceBuffer 区间。MMS 回收后从缺口发起同源 Seek；普通 endstreaming 停止额外生产，未缓冲目标允许有限准备。

MSEBuffer 自己串行化完整追加和 SourceBuffer 属性，避免共享 MSE 的负偏移 1 ms 修正。旧追加一旦开始就先等待完成；新 epoch 在队列边界重置 parser 和精确时间属性。配额不足只在存在可释放的真实区间时重试一次，不让共享追加队列保留并重复执行失败段。

## 构建与扩展

[prepare-runtime.cjs](../../prepare-runtime.cjs) 固定官方源码 URL、SHA256、Emscripten 版本、configure/link 参数和桥接源码指纹。输出 JS/WASM 校验哈希后与 manifest、LGPL 许可证一起原子进入外部缓存；首次构建需要工具链、网络和数分钟，后续直接复用已校验产物。

```bash
yarn ffmpeg:runtime
node packages/xgplayer-ffmpeg/native/verify.mjs <runtime目录> <媒体路径>
```

扩展输入 codec 时改原生 configure 能力和类型化 audio policy。扩展 ABI 时同时改原生导出与 Worker 契约；配套核心 JS/WASM 不可混用。上游方案只借鉴架构与标准接口，未复制缺少许可证的 libav-wasm 代码。FFmpeg 本身的 LGPL 要求随部署保留来源、构建和许可证；本包仍是实验性 private 包。

接入选项见 [包说明](../../README.zh-CN.md)，完整架构约束与研究依据见 [IO-DESIGN](../../IO-DESIGN.md) 和 [开源评估](../../OPEN-SOURCE-MSE.md)。
