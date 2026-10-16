# Player DevTools

零侵入的 **Web 播放器浏览器调试扩展**（Chrome / Edge, Manifest V3）。运行时注入探针，自动发现页面中的播放器实例，并提供事件时间轴、MSE / 网络 / 媒体 / 日志面板、事件录制回放、快照导出。

> 设计方案见 [docs/devtools/devtools-extension-design.md](../../docs/devtools/devtools-extension-design.md)。

## 安装（开发者模式加载）

1. 打开 `chrome://extensions`，开启「开发者模式」。
2. 「加载已解压的扩展程序」，选择本目录 `packages/xgplayer-devtools-extension`。
3. 打开任意使用播放器的页面，F12 打开 DevTools，切到 **Player** 面板。

无需构建步骤——纯原生 JS，直接加载。

## 功能

| 面板 | 说明 |
|------|------|
| 概览 | 实例列表（区分 playing/active/idle、可切换并在页面中定位）、播放状态、config |
| 事件 | 实时事件时间轴，按类别过滤（playback/buffer/network/error/abr），点击展开 payload |
| MSE | MSE/MMS 状态、分轨 buffered、SourceBuffer 属性与操作队列、最近 MSE 事件 |
| 网络 | 速度 / 流信息、最近网络事件（TTFB / load / switchURL / append） |
| 媒体 | HTMLMediaElement 状态、buffered/seekable 区间、播放与渲染属性 |
| 日志 | 远程开关 `XG_DEBUG` 级别与 `Logger`（需播放器暴露 Logger） |

工具栏：
- **录制 / 停止**：录制窗口内全部事件，停止后自动导出 `.json`，可用于复现 case。
- **快照**：聚合 config + stats + 最近事件 + 环境信息，导出 `.json`。
- **日志**：一键 `Logger.enable()/disable()`。
- **清空**：清空面板事件缓冲。

## 工作原理

```
inject.js (MAIN world 探针)
  → window.postMessage →  content-script (隔离世界)
  → chrome.runtime     →  background (按 tabId 路由)
  → port               →  DevTools 面板
```

实例发现三级兜底：`Player.instManager` → `[data-xgplayerid]` media 元素反查 → `EventEmitter.prototype.emit` 补丁。

探针（probe）按能力探测动态显隐：`core`（播放器）、`hls`（流核心）始终可用；`mse` 优先消费播放器或插件提供的能力契约，旧包则通过有界只读结构识别活动 MSE/MMS 实例；`abr` 等增强探针仅在对应能力存在时启用，缺失时自动降级。

### Probe 能力契约

播放器或任意 `player.plugins` 实例可通过共享 Symbol 提供标准化探针。扩展不会依赖插件名或包内私有路径：

```js
const provider = Symbol.for('player.devtools.provider')

plugin[provider] = {
  version: 1,
  probes: {
    mse: {
      collect: () => normalizedMseSnapshot,
      subscribe: (emit) => cleanup
    }
  }
}
```

`collect` 返回面板使用的标准化快照；可选的 `subscribe` 接收事件回调并返回清理函数。没有契约的旧包会进入兼容扫描：仅允许读取播放器公共 `plugins` / `media` / `video` getter，进入插件对象图后只读取 property descriptor 的 data value 并忽略内部 getter；最多扫描 10 层、400 个对象和每个对象 256 个属性，首个满足 MSE 特征阈值的候选会立即返回。

兼容扫描命中后由独立 adapter 负责归一化：`xg-mse` 读取 xgplayer-streaming 的 SourceBuffer/操作队列，`method-wrapper` 通过 `getSourceBuffer()` / `buffered()` 等只读方法采集，`native-media-source` 直接读取标准 `MediaSource.sourceBuffers`。resolver 本身不包含具体采集逻辑。

`xg-mse` 和 `method-wrapper` 会在已识别的 wrapper **实例**上观测 `append`、`remove`、`createSource`、`changeType`、`endOfStream`、`abort` 等操作，并生成 `mse.*` 事件；销毁探针时恢复原方法。`native-media-source` 只监听标准 MediaSource / SourceBuffer 事件，不修改浏览器原生 prototype，因此不会触发加密播放的 MSE 劫持检测。

## 目录

```
src/
├── inject/inject.js          # MAIN world 探针：发现 + 订阅 + 采集
├── content/content-script.js # postMessage ↔ chrome.runtime 桥接
├── background/service-worker.js # 按 tabId 路由
├── devtools/                 # devtools 页 + 面板注册 + panel.html
├── panel/                    # 面板 UI（主控制器、独立视图模块、样式）
└── shared/                   # 消息协议、序列化工具
```

## 限制 / 已知事项

- 探针以声明式 `world: "MAIN"` + `document_start` 注入，在页面脚本前同步执行；对同页创建的播放器可在其出生前就位。
- DevTools 晚于播放器打开时，一次性原生事件（loadstart/canplay 等）已 emit 且不重放：探针维护常驻有界事件缓冲，面板连接时回放历史；信标 `scan` 同步当前实例与状态。
- 高频事件（timeupdate / core.speed）在探针侧节流（250ms）。
- `Logger` 缓存读取需播放器在 `window` 暴露 `Logger`；否则日志面板仅能开关 `XG_DEBUG`。
- 远程 `invoke` 严格白名单（play/pause/seek/switchURL/reload/destroy）。
- 图标为占位 PNG，可按需替换 `public/icon*.png`。
