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


### Introduction

Xgplayer is a web video player library. It has designed a separate, detachable UI component based on the principle that everything is componentized. More importantly, it is not only flexible in the UI layer, but also bold in its functionality: it gets rid of video loading, buffering, and format support for video dependence. Especially on mp4
it can be staged loading for that does not support streaming mp4. This means seamless switching with clarity, load control, and video savings. It also integrates on-demand and live support for FLV, HLS and MPEG-DASH. [Document](http://h5player.bytedance.com/)

### Start

1. Install

    ```
    $ npm install xgplayer
    ```

2. Usage

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer'

    let player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    This is the easiest way to configure the player, then it runs with video. For more advanced content, see the plugin section or documentation. [more config](https://h5player.bytedance.com/en/config/)




### Plugins

Xgplayer provides more plugins which are divided into two categories: one is self-starting, and another inherits the player's core class named xgplayer. In principle, the officially provided plugins are self-starting and the packaged third-party libraries are inherited. Some feature plugins themselves can provide a downgrade scenario that suggests a self-start approach, or an inheritance approach if not. The player supports custom plugins for more content viewing. [plugins](https://h5player.bytedance.com/en/plugins/)

The following is how to use a self-starting plugin：

```js
import Player from 'xgplayer'
import 'xgplayer-mp4'

let player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
})
```

<code>xgplayer-mp4</code> plugin is self-starting. It can load mp4 video itself, parse mp4 format and implement custom loading, buffering, seamless switching and so on. It will automatically downgrade when using devices that do not support [MSE](https://www.w3.org/TR/media-source/).  [details](https://h5player.bytedance.com/en/plugins/#xgplayer-mp4)



### Mobile Support

Xgplayer supports mobile terminal, but android device brand and system are numerous, there are much compatibility problems, the player provides whitelist mechanism to ensure the perfect operation in mobile terminal. [whitelist](https://h5player.bytedance.com/en/config/#whitelist)



### Dev

```
$ git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

Please visit [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)

### License

[MIT](http://opensource.org/licenses/MIT)
