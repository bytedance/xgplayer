# Player DevTools 浏览器扩展设计方案

> 目标:为 Web 播放器提供一个**零侵入、运行时注入**的浏览器扩展，用于定位播放、缓冲、网络、解码、ABR、加密等问题，并支持事件录制 / 快照导出以生成可复现 case。
>
> 适用范围:开源内核 monorepo `bytedance/xgplayer`。对于在内核之上提供增强能力的播放器发行版，通过**可选探针适配**接入，探测失败时自动降级为开源精简形态。

---

## 1. 背景与可利用的 hook 点

扩展的运行时注入侧**零侵入**，采集完全依赖已存在接口。唯一例外是实例发现：在「页面未向全局暴露 `Player`」的场景需要一个**默认关闭、可选**的播放器侧接入点，其完整设计（握手门控、源码改动、时序与验证）为单一事实来源，见 [实例发现接入点设计](./devtools-beacon-design.md)，未接入调试器时对播放器零影响。可利用的运行时稳定锚点如下：

| 能力 | 来源 | 说明 |
|------|------|------|
| 实例注册表 | `Player.instManager`（静态，`InstManager`） | `forEach / find / findAll / getActiveId / setActive`，可枚举全部实例 ([instManager.ts](../../packages/xgplayer/src/instManager.ts)) |
| DOM 标记 | `data-xgplayerid` 属性 | media 元素上携带，可反查实例 ([constant.js](../../packages/xgplayer/src/constant.js)) |
| 事件总线 | 每个 `player` / `hls` 实例均为 `EventEmitter` | `on/emit`，可全量订阅 ([events.js](../../packages/xgplayer/src/events.js)) |
| 流核心事件 | `EVENT.core.*` | TTFB、load、appendbuffer、speed、gap/overlap 检测等 ([event.js](../../packages/xgplayer-streaming-shared/src/event.js)) |
| 调试开关 | `XG_DEBUG` / URL `?xgplayerdebugger=1` | 控制内核调试日志级别 ([debug.js](../../packages/xgplayer/src/utils/debug.js)) |
| 日志缓存 | `Logger`（`logCache` 环形缓冲 + `getLogCache()`） | 默认 `Logger.disabled=true`，可 `Logger.enable()` ([logger.js](../../packages/xgplayer-streaming-shared/src/logger.js)) |
| 运行指标 | `hls.getStats()` / `hls.bufferInfo()` / `hls.speedInfo()` | 下载速度、buffer 空洞、分片耗时 ([hls/index.js](../../packages/xgplayer-hls/src/hls/index.js)) |
| 行为统计 | `stats` 插件 | 已采集 userAction / download / info ([plugins/stats](../../packages/xgplayer/src/plugins/stats/index.js)) |
| 调试信标（可选，默认关闭） | `InstManager` 广播 + 握手标记 `__PLAYER_DEVTOOLS_HOOK__` | 零业务耦合发现/订阅实例增删，不依赖全局 `Player`，详见 [接入点设计](./devtools-beacon-design.md) |

**增强发行版的差异化维度**（可选）：ABR 决策、加密/解密、埋点上报、预加载命中率等。这些由**可选探针适配器**接入，能力探测失败即隐藏对应面板，开源内核下自动降级。

---

## 2. 整体架构

```
网页 (MAIN world)                         扩展 (隔离环境)
┌───────────────────────┐                ┌─────────────────────────┐
│ 播放器实例            │                │ background (SW)         │
│  InstManager · events │◄──┐            │  会话路由 / 存储 / 中转  │
│ HLS/FLV/Dash core     │   │            └───────────┬─────────────┘
│  EVENT · Logger       │   │                        │
└───────────────────────┘   │ 采集                   │
          ▲                 │                        ▼
   ┌──────┴──────┐   postMessage   ┌─────────────────────────────┐
   │ inject.js   │─────────────────► content-script ─────────────►│ DevTools 面板 │
   │ (注入探针)  │                                                 │ (概览/事件/… )│
   └─────────────┘                                                 └──────────────┘
```

### 2.1 分层职责

1. **inject.js（注入到页面 MAIN world）** — 核心采集探针。负责实例发现、事件订阅、指标轮询。必须运行在 MAIN world 才能访问页面的 `Player` / 实例对象（内容脚本的隔离世界访问不到页面 JS 变量）。
2. **content-script.js（隔离世界）** — 用 `window.postMessage` 与 inject 通信，再经 `chrome.runtime` 转发给扩展侧；按 tab 路由。负责把 inject 脚本以 `<script>` 形式注入 MAIN world。
3. **background（MV3 service worker）** — 会话存储、面板↔页面消息中转、录制缓冲落盘。
4. **devtools panel** — 多标签 UI（主交互）。

### 2.2 实例发现策略（信标优先 + 三级兜底）

```
⓪ 播放器调试信标（首选，需带信标版本）     → 握手后监听实例增删，实时、精准、零业务耦合
① window 上的 Player.instManager 可用     → 直接 forEach 枚举
② 扫描 [data-xgplayerid] media 元素       → 反查 checkPlayerRoot / 关联实例
③ monkey-patch EventEmitter.prototype.emit → 捕获 emit 来源对象（最后兜底）
```

①②③ 是面向「未升级到信标版本播放器」的降级链。⓪ 信标的完整设计（握手门控、`instManager.ts` 源码改动、`inject.js` 改造、时序与验证）为单一事实来源，见 [实例发现接入点设计](./devtools-beacon-design.md)，此处不重复。发现后为每个实例分配稳定 `playerId`。

---

## 3. 消息协议

统一走结构化消息，`source` 用于区分方向，避免与页面自身 postMessage 冲突。

```ts
// 页面 → 扩展（inject → content → panel）
interface OutboundMessage {
  source: 'player-devtools-inject'
  v: 1
  sessionId: string          // 页面加载会话
  type: 'instances' | 'event' | 'metrics' | 'logs' | 'snapshot' | 'error'
  playerId?: string
  ts: number                 // performance.now() + timeOrigin
  payload: unknown
}

// 扩展 → 页面（panel → content → inject）
interface InboundMessage {
  source: 'player-devtools-panel'
  v: 1
  type:
    | 'select-instance'      // 切换当前关注实例
    | 'set-debug'            // 开/关 XG_DEBUG 级别
    | 'enable-logger'        // Logger.enable / disable
    | 'start-record' | 'stop-record'
    | 'request-snapshot'     // 聚合快照
    | 'invoke'               // 远程调用白名单方法（play/pause/seek…）
  playerId?: string
  payload?: unknown
}
```

**可靠性约束**：
- 事件高频（如 `timeupdate`、`core.speed`）在 inject 侧**节流 + 批量**后再发送，避免压垮消息通道。
- 大对象（buffered ranges、stats）**结构化裁剪**后传输，禁止直接传 DOM / 循环引用对象（复用 `Logger.logable` 的降维思路）。
- 面板断开（DevTools 关闭）时 inject 侧进入**低频缓存模式**，重连后补发最近 N 条。

---

## 4. 面板模块（按排查维度聚合）

> 分类聚合、拒绝信息堆砌：每个面板只服务一个排查维度。

| 面板 | 数据来源 | 典型排查场景 |
|------|----------|--------------|
| **概览 Overview** | instManager + player 状态/config | 多实例列表、当前 active 实例、url、codec、`readyState`、画面尺寸、关键 config |
| **事件时间轴 Timeline** | player events + `core.*` | seek/waiting/stall/error 时序，定位卡顿与状态竞争 |
| **缓冲 Buffer** | `bufferInfo()` / `player.buffered` / MSE SourceBuffer | buffer hole、evict、append 节奏、DTS gap/overlap 检测 |
| **网络 Network** | `core.ttfb` / `core.loadcomplete` / `core.speed` / `core.appendcost` | 分片下载耗时、带宽、重试、首帧 |
| **日志 Logs** | `Logger.getLogCache()` + console 捕获 | 一键 `Logger.enable()`、按 tag/级别过滤、导出 |
| **媒体/解码 Media** | `getStats()` + video 元素属性 | 分辨率切换、低帧、hvcC/avcC codec、HEVC CRA/RASL 线索 |
| **ABR**（可选探针） | ABR 探针 | 清晰度决策轨迹、带宽估计、切换原因 |
| **加密**（可选探针） | 加密探针 | key 加载、解密失败点、SAMPLE-AES 场景 |
| **埋点**（可选探针） | 埋点探针 | 上报事件流、字段校验 |

### 4.1 概览 Overview
- 实例卡片列表（active 高亮，对应 `getActiveId()`），点击切换 panel 关注实例。
- 展示：`playerId`、`url`、`config` 摘要（autoplay/isLive/preloadTime/mseAttachMode 等）、当前 state、`videoWidth×videoHeight`、`currentTime/duration`。

### 4.2 事件时间轴 Timeline
- 横向时间轴，泳道按事件类别分组（播放状态 / 缓冲 / 网络 / 错误）。
- 支持过滤、放大、hover 查看 payload。
- **录制 / 回放**:录制窗口内全部事件 → 导出 JSON，可配合 `fixtures/<format>/` 做可复现 case。

### 4.3 缓冲 Buffer
- 可视化 `player.buffered` 多区间 + currentTime 游标。
- `hls.bufferInfo()` 的 `start/end/remaining/nextStart` 实时读数。
- 标注 `core.appendbuffer` / `core.removebuffer` / gap-overlap 检测事件，便于定位空洞与 evict。

### 4.4 网络 Network
- 分片表:url、`ttfb`、下载耗时、大小、速度、重试次数、append 耗时。
- 速度曲线(`core.speed` / `real_time_speed`)。

### 4.5 日志 Logs
- 一键远程 `Logger.enable()` / 调级别。
- 拉取 `getLogCache()` 环形缓冲 + 捕获 `console.*`，按 `[tag]` / 级别过滤、搜索、导出。

### 4.6 媒体/解码 Media
- `getStats()` 汇总 + video 元素(`videoWidth/Height`、`playbackQuality`、`error`)。
- codec 变化记录(hvcC/avcC、`changeType` 时机),辅助 HEVC 开放 GOP / 参考帧类问题初筛。

---

## 5. 核心能力

1. **实例自动发现 + 多实例切换**（active 高亮）。
2. **事件录制 / 回放**：时间轴可导出 JSON，直接喂给 fixtures 做可复现 case。
3. **一键开关**：远程开启 `XG_DEBUG` / `Logger`，无需改页面、无需加 URL 参数重载。
4. **快照导出**：聚合 `config + getStats() + Logger 缓存 + 最近事件 + 环境信息` → 单个 `.json` / `.md`，可直接贴到 issue。
5. **远程调用（白名单）**：`play/pause/seek/switchURL` 等，便于复现特定操作序列（如 iOS seek 竞态）。

---

## 6. 探针适配层（开源 / 增强统一）

```ts
interface InstanceProbe {
  id: string
  detect(player): boolean           // 能力探测，失败则该面板隐藏
  collect(player): ProbeSnapshot     // 轮询采集
  subscribe(player, emit): () => void // 事件订阅，返回取消函数
}
```

- 内核探针:`CoreProbe`（player 事件/状态）、`HlsProbe`（core.* / bufferInfo / stats）。
- 可选探针:`AbrProbe`、`EncryptProbe`、`AppLoggerProbe`、`PreloadProbe` —— 仅当对应增强能力在运行时存在时 `detect` 通过。
- 探针注册表集中管理，面板根据探针可用性动态显隐，实现「开源精简 / 增强形态」的平滑降级。

---

## 7. 工程落位

```
packages/xgplayer-devtools-extension/
├── manifest.json              # MV3
├── src/
│   ├── inject/                # MAIN world 探针 + 发现 + 订阅
│   │   ├── index.ts
│   │   ├── discovery.ts       # instManager / data-xgplayerid / emit patch
│   │   ├── probes/            # core / hls / abr / encrypt / app-logger / preload
│   │   └── bridge.ts          # postMessage
│   ├── content/               # 注入 inject.js + 消息转发
│   ├── background/            # service worker:会话/存储/中转
│   ├── devtools/              # devtools 页 + 面板注册
│   ├── panel/                 # UI(Overview/Timeline/Buffer/Network/Logs/Media/…)
│   └── shared/                # 消息协议、裁剪/节流工具
├── public/                    # 图标等
└── README.md
```

- 作为独立包，与播放器源码**解耦**；`yarn build` 产出可加载的 MV3 目录。
- UI 技术栈建议轻量(Preact/原生 + Vite)，避免给调试工具引入过重依赖。
- 遵循仓库约束：Yarn 1.x、不新增未审计的运行时网络请求（扩展仅本地通信）。

---

## 8. 隐私与安全

- 扩展仅在**本地页面↔扩展**间通信，无外发网络请求。
- 快照导出前对 url / token 做**脱敏可选项**（加密/鉴权 URL 可能含短时签名）。
- `invoke` 远程调用严格白名单，禁止任意方法执行。

---

## 9. 分阶段落地

| 阶段 | 内容 | 产物 |
|------|------|------|
| **M1 MVP** | MV3 骨架 + 实例发现（信标 + 三级兜底，见 §2.2）+ 概览面板 + 基础事件时间轴 | 可加载扩展，能看到实例与事件流 |
| **M2** | 缓冲 / 网络 / 日志面板 + Logger/XG_DEBUG 一键开关 | 覆盖开源内核主要排查维度 |
| **M3** | 事件录制 / 回放 + 快照导出 | 可复现 case |
| **M4（增强）** | ABR / 加密 / 埋点 / preload 可选探针与面板 | 对接增强发行版 |

---

## 10. 待确认 / 风险

1. **增强探针面板范围**:当前文档按「可选探针适配、开源自动降级」处理;若需深度对接 ABR/加密等增强字段,需进一步确认各能力暴露的可观测接口（核对其 public API）。
2. **MAIN world 注入时机**:信标方案的 `__player_devtools_scan__` 回放已覆盖「调试器晚于播放器加载」的历史实例补发（见 [接入点设计](./devtools-beacon-design.md)）；降级链（①②③）下仍建议尽早注入。
3. **高频事件通道压力**:`timeupdate` / `core.speed` 必须节流,否则 postMessage 会成为瓶颈。
4. **跨源 iframe**:若播放器在 iframe 内,content-script 需声明 `all_frames` 并处理 frame 路由。
