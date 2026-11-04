<div align="center">
  <img src="https://raw.githubusercontent.com/bytedance/xgplayer/master/xgplayer.png" width="384" height="96">
</div>
<div align="center">
  <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
    <img src="https://img.shields.io/npm/v/xgplayer.svg" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/xgplayer">
    <img src="https://img.shields.io/npm/dm/xgplayer.svg" alt="downloads">
  </a>
  <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
    <img src="https://img.shields.io/npm/l/xgplayer.svg" alt="license">
  </a>
  <a href="https://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen">
  </a>
</div>

# xgplayer

xgplayer 为 Web 应用提供灵活、插件化的媒体播放器。UI 组件、加载策略和媒体格式能力
均可按需组合。

[文档](https://h5player.bytedance.com/)

## 安装

```bash
npm install xgplayer
```

## 使用

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
})
```

更多播放器选项参见[配置文档](https://h5player.bytedance.com/config/)。

## 插件

xgplayer 提供内置 UI 插件以及可选的流媒体和功能包。可用能力参见
[插件文档](https://h5player.bytedance.com/plugins/)。

## 开发调试

仓库使用 Yarn 1.x。以下命令用于启动各格式的本地示例：

```bash
yarn
yarn dev:xgplayer
```

```bash
yarn dev:hls
yarn dev:flv
yarn dev:mp4
```

## 发布流程

稳定版本、预发布版本及发版命令参见[发布指南](.github/release-guideline.zh-CN.md)。

## 使用协议

使用 xgplayer 即表示同意以下条款：

1. 本项目基于 [MIT License](https://opensource.org/licenses/MIT) 发布。
2. 您授权 xgplayer 项目在官网展示使用 xgplayer 的业务 Logo。
