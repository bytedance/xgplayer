<div align="center">
    <img src="https://raw.githubusercontent.com/bytedance/xgplayer/master/xgplayer.png" width="384" height="96">
</div>
<div align="center">
    <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
        <img src="https://img.shields.io/npm/v/xgplayer.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
        <img src="https://img.shields.io/npm/l/xgplayer.svg" alt="license">
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
        <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen">
    </a>
</div>


### Introduction

xgplayer is a web video player library. It has designed a separate, detachable UI component based on the principle that everything is componentized. More importantly, it is not only flexible in the UI layer, but also bold in its functionality: it gets rid of video loading, buffering, and format support for video dependence. Especially on mp4
it can be staged loading for that does not support streaming mp4. This means seamless switching with clarity, load control, and video savings. It also integrates on-demand and live support for FLV, HLS, and dash. [Document](http://h5player.bytedance.com/en/)

### Start

1. Install

    ```bash
    $ npm install xgplayer
    ```

2. Usage

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer';

    const player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    This is the easiest way to configure the player, then it runs with video. For more advanced content, see the plug-in section or documentation. [more config](http://h5player.bytedance.com/en/config/)




### Plugins

xgplayer provides more plugins and supports custom plugins, for more content viewing [plugins](http://h5player.bytedance.com/en/plugins/). There are many built-in plugins in the player, if you need to close specific plugins, you can disable them by [ignores](https://h5player.bytedance.com/config/#ignores) configuration


### Dev

In order to debug by developers, we provide demos code in the fixtures directory of the repo. The player uses yarn for package management, and it only takes a few simple steps to start debugging in the repo

```bash
$ cd xgplayer
$ yarn
$ yarn dev:xgplayer
```

To debug other plugins, please refer to the scripts command provided in package.json in the root directory of the repo, such as:

```bash
$ yarn dev:hls
$ yarn dev:flv
$ yarn dev:mp4
```

### License

Welcome to use xgplayer! Please read the following terms carefully. Using xgplayer means that you accept and agree to the terms.
1. Xgplayer is licensed under the [MIT](http://opensource.org/licenses/MIT) License. You comply with its obligations by default.
2. By default, you authorize us to place your logo in xgplayer website, which using xgplayer.
If you have any problem, please let us know.
