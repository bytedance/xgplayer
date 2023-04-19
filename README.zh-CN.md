<div align="center">
    <img src="https://raw.githubusercontent.com/bytedance/xgplayer/master/xgplayer.png" width="384" height="96">
</div>
<div align="center">
    <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
        <img src="https://img.shields.io/npm/v/xgplayer.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/xgplayer">
        <img src="https://img.shields.io/npm/dm/xgplaer.svg" alg="download">
    </a>
    <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
        <img src="https://img.shields.io/npm/l/xgplayer.svg" alt="license">
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
        <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen">
    </a>
</div>


### 概述


西瓜播放器是一个Web视频播放器类库，它本着一切都是组件化的原则设计了独立可拆卸的 UI 组件。更重要的是它不只是在 UI 层有灵活的表现，在功能上也做了大胆的尝试：摆脱视频加载、缓冲、格式支持对 video 的依赖。尤其是在 mp4 点播上做了较大的努力，让本不支持流式播放的 mp4 能做到分段加载，这就意味着可以做到清晰度无缝切换、加载控制、节省视频流量。同时，它也集成了对 flv、hls、dash 的点播和直播支持。[文档](http://h5player.bytedance.com/)



### 起步

1. 安装

    ```bash
    $ npm install xgplayer
    ```

2. 使用

- Step 1:

    ```html
    <div id="vs"></div>
    ```

- Step 2:

    ```js
    import Player from 'xgplayer'

    let player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    这是最简单的播放器配置方法，基本功能可以跑起来，如果想使用高级功能参考插件一节或者文档。[更多配置](http://h5player.bytedance.com/config/)


### 插件

西瓜播放器提供了较多的插件，并支持自定义插件，更多内容查看 [插件](http://h5player.bytedance.com/plugins/)。播放器内有不少内置插件，如果需要关闭某些插件可以通过 [ignores](https://h5player.bytedance.com/config/#ignores) 配置禁用


### 开发调试

为了方便开发者调试，我们在仓库 fixtures 目录内提供了示例代码。播放器使用 yarn 进行包管理，只需简单几步即可开始在仓库内启动调试

```bash
$ cd xgplayer
$ yarn
$ yarn dev:xgplayer
```

其它插件启动，请参考仓库根目录内 package.json 提供 scripts 命令，比如：

```bash
$ yarn dev:hls
$ yarn dev:flv
$ yarn dev:mp4
```

### 使用协议

欢迎使用西瓜播放器技术团队提供的开源音视频解决方案！请您仔细阅读以下条款。通过使用西瓜播放器，您表示同意接受以下所有条款。
1. 本开源项目中所有代码基于 [MIT](http://opensource.org/licenses/MIT) 许可协议，您默认遵守许可协议中约定的义务。
2. 您默认授权我们将您使用西瓜播放器所在业务的Logo放置在本官网展示。
若您有任何问题，请联系我们。
