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

[English](README.md) | 简体中文

### 概述


西瓜播放器是一个Web视频播放器类库，它本着一切都是组件化的原则设计了独立可拆卸的 UI 组件。更重要的是它不只是在 UI 层有灵活的表现，在功能上也做了大胆的尝试：摆脱视频加载、缓冲、格式支持对 video 的依赖。尤其是在 mp4 点播上做了较大的努力，让本不支持流式播放的 mp4 能做到分段加载，这就意味着可以做到清晰度无缝切换、加载控制、节省视频流量。同时，它也集成了对 flv、hls、dash 的点播和直播支持。[文档](http://h5player.bytedance.com/)



### 起步

1. 安装

    ```
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
        url: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    这是最简单的播放器配置方法，基本功能可以跑起来，如果想使用高级功能参考插件一节或者文档。[更多配置](http://h5player.bytedance.com/config/)


### 插件

西瓜播放器提供了较多的插件，插件分两类：一部分是自启动的，一部分是继承播放器核心类 xgplayer 的。原则上官方提供插件都是自启动的，封装的第三方类库都是继承方式。有些功能插件本身能提供降级方案建议使用自启动方式，否则建议使用继承方式。播放器支持自定义插件，更多内容查看 [插件](http://h5player.bytedance.com/plugins/)

对于自启动的插件使用方法如下：

```js
import Player from 'xgplayer'
import 'xgplayer-mp4'

let player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
})
```

<code>xgplayer-mp4</code>插件就是自启动的，它会自己加载 mp4 视频、解析 mp4 格式，实现自定义加载、缓冲、无缝切换等[详情]((http://h5player.bytedance.com/plugins/#xgplayer-mp4))。对于不支持 [MSE](https://www.w3.org/TR/media-source/) 的设备自动降级。


### Mobile Support

西瓜播放器支持移动端，不过安卓设备品牌和系统众多，兼容性问题很多，播放器提供白名单机制保证在移动端完美的运行。[白名单机制](http://h5player.bytedance.com/config/#%E7%99%BD%E5%90%8D%E5%8D%95)


### Dev

为了方便开发者调试，我们提供了示例视频资源。示例文件较大，可使用 git clone --recurse-submodules -j8 命令完整拉取源码和示例文件；如果你只对源码感兴趣可以使用 git clone 命令仅拉取源码部分。

```
$ git clone --recurse-submodules -j8 git@github.com:bytedance/xgplayer.git # 或者：git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

访问 [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)


### 使用协议

欢迎使用西瓜播放器技术团队提供的开源音视频解决方案！请您仔细阅读以下条款。通过使用西瓜播放器，您表示同意接受以下所有条款。
1. 本开源项目中所有代码基于 [MIT](http://opensource.org/licenses/MIT) 许可协议，您默认遵守许可协议中约定的义务。
2. 您默认授权我们将您使用西瓜播放器所在业务的Logo放置在本官网展示。
若您有任何问题，请联系我们。

### 加入我们
欢迎各位对前端音视频感兴趣的小伙伴加入我们的技术团队！

工作地点：北京、上海、深圳等

岗位类型：社招、校招、实习

发送简历：yinguohui@bytedance.com

邮件标题格式：【简历】+ 姓名 ＋ 前端开发工程师 + 来源：xgplayer github
