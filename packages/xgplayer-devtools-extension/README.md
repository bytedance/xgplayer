# Player DevTools

零侵入的 **Web 播放器浏览器调试扩展**（Chrome / Edge, Manifest V3）。运行时注入探针，自动发现页面中的播放器实例，并提供事件时间轴、缓冲 / 网络 / 媒体 / 日志面板、事件录制回放、快照导出。

> 设计方案见 [docs/devtools/devtools-extension-design.md](../../docs/devtools/devtools-extension-design.md)。

## 安装（开发者模式加载）

1. 打开 `chrome://extensions`，开启「开发者模式」。
2. 「加载已解压的扩展程序」，选择本目录 `packages/xgplayer-devtools-extension`。
3. 打开任意使用播放器的页面，F12 打开 DevTools，切到 **Player** 面板。

无需构建步骤——纯原生 JS，直接加载。

## 功能

| 面板 | 说明 |
|------|------|
| 概览 | 实例列表（active 高亮、可切换）、播放状态、config |
| 事件 | 实时事件时间轴，按类别过滤（playback/buffer/network/error/abr），点击展开 payload |
| 缓冲 | buffered 区间可视化 + currentTime 游标、HLS bufferInfo |
| 网络 | 速度 / 流信息、最近网络事件（TTFB / load / switchURL / append） |
| 媒体 | 分辨率、readyState、currentStream、ABR（增强探针可选） |
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

探针（probe）按能力探测动态显隐：`core`（播放器）、`hls`（流核心）始终可用；`abr` 等增强探针仅在对应能力存在时启用，缺失时自动降级。

## 目录

```
src/
├── inject/inject.js          # MAIN world 探针：发现 + 订阅 + 采集
├── content/content-script.js # 注入 + postMessage 桥接
├── background/service-worker.js # 按 tabId 路由
├── devtools/                 # devtools 页 + 面板注册 + panel.html
├── panel/                    # 面板 UI (panel.js / panel.css)
└── shared/                   # 消息协议、序列化工具
```

## 限制 / 已知事项

- 探针运行在 MAIN world；若实例在 inject 注入前已创建，依赖 `InstManager` 新增事件或轮询补发。
- 高频事件（timeupdate / core.speed）在探针侧节流（250ms）。
- `Logger` 缓存读取需播放器在 `window` 暴露 `Logger`；否则日志面板仅能开关 `XG_DEBUG`。
- 远程 `invoke` 严格白名单（play/pause/seek/switchURL/reload/destroy）。
- 图标为占位 PNG，可按需替换 `public/icon*.png`。
