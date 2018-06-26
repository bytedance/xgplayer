<div align="center">
    <img src="./xgplayer.png" width="384" height="96">
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


西瓜播放器是一个Web视频播放器类库，它本着一切都是组件化的原则设计了独立可拆卸的 UI 组件。更重要的是它不只是在 UI 层有灵活的表现，在功能上也做了大胆的尝试：摆脱视频加载、缓冲、格式支持对 video 的依赖。尤其是在 mp4 点播上做了较大的努力，让本不支持流式播放的 mp4 能做到分段加载，这就意味着可以做到清晰度无缝切换、加载控制、节省视频流量。同时，它也集成了对 FLV、HLS、MPEG-DASH 的点播和直播支持。[文档](https://h5player.bytedance.com/)



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
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    这是最简单的播放器配置方法，基本功能可以跑起来，如果想使用高级功能参考插件一节或者文档。[更多配置](https://h5player.bytedance.com/config/)


### 插件

西瓜播放器提供了较多的插件，插件分两类：一部分是自启动的，一部分是继承播放器核心类 xgplayer 的。原则上官方提供插件都是自启动的，封装的第三方类库都是继承方式。有些功能插件本身能提供降级方案建议使用自启动方式，否则建议使用继承方式。播放器支持自定义插件，更多内容查看 [插件](https://h5player.bytedance.com/plugins/)

对于自启动的插件使用方法如下：

```js
import Player from 'xgplayer'
import 'xgplayer-mp4'

let player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
})
```

<code>xgplayer-mp4</code> 插件就是自启动的，它会自己加载 mp4 视频、解析 mp4 格式，实现自定义加载、缓冲、无缝切换等[详情](https://h5player.bytedance.com/plugins/#xgplayer-mp4)。对于不支持 [MSE](https://www.w3.org/TR/media-source/) 的设备自动降级。


### Mobile Support

西瓜播放器支持移动端，不过安卓设备品牌和系统众多，兼容性问题很多，播放器提供白名单机制保证在移动端完美运行。[白名单机制](https://h5player/bytedance.com/config/#白名单)


### Dev

```
$ git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

访问 [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)

### License

[MIT](http://opensource.org/licenses/MIT)
