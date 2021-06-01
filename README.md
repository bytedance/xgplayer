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
<br>

English | [简体中文](README.zh-CN.md)

### Introduction

xgplayer is a web video and audio player library, designed with separate, detachable UI components.  Since everything is componentized. the UI layer is very flexable.  
xgplayer is bold in its functionality: it gets rid of video loading, buffering, and format support for video dependence.
For mp4 that does not support streaming, you can use staged loading. This means load control, seamless switching without artifacts, and video bandwidth savings. It also integrates on-demand and live support for FLV, HLS, and dash.

For more details, please read the  [Documentation](http://h5player.bytedance.com/en/).

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
    import Player from 'xgplayer';

    const player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    This is the easiest way to configure the video player. For more advanced content, see the plug-in section or documentation. [more config](http://h5player.bytedance.com/en/config/)




### Plugins

xgplayer provides more plugins. Plugins are divided into two categories: one is self-starting, and another inherits the player's core class named xgplayer. In principle, the officially provided plug-ins are self-starting and the packaged third-party libraries are inherited. Some feature plug-ins themselves can provide a downgrade scenario that suggests a self-start approach, or an inheritance approach if not. The player supports custom plugins for more content viewing [plugins](http://h5player.bytedance.com/en/plugins/)

The following is how to use a self-starting plug-in：

```js
import Player from 'xgplayer';
import 'xgplayer-mp4';

const player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
})
```

<code>xgplayer-mp4</code>plugin is self-starting, It loads mp4 video itself, parses mp4 format, implements custom loading, buffering, seamless switching, and so on. it will automatically downgrade devices that do not support [MSE](https://www.w3.org/TR/media-source/). [details](http://h5player.bytedance.com/en/plugins/#xgplayer-mp4)



### Dev

For debugging, we provide example video files in github. You can clone the whole git repository, which includes both code and example videos with 'git clone --recurse-submodules -j8'. With 'git clone' you will pull only xgplayer code and its plugins.

```
$ git clone --recurse-submodules -j8 git@github.com:bytedance/xgplayer.git # OR git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

Then visit [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)


### Agreement

Welcome to use xgplayer! Please read the following terms carefully. Using xgplayer means that you accept and agree to the terms.
1. Xgplayer is licensed under the [MIT](http://opensource.org/licenses/MIT) License. You comply with its obligations by default.
2. By default, you authorize us to place your logo in xgplayer website, which using xgplayer.
If you have any problem, please let us know.


### Join Us
We welcome anyone with an interest in web media technology to join! Please contact us at  yinguohui@bytedance.com
