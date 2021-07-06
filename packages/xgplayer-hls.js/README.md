# Introduction
  A extension plugin which integrated [hls.js](https://github.com/video-dev/hls.js) based on xgplayer

# How to use
### install

```shell
$ npm istall xgplayer@alpha
$ npm istall xgplayer-hls.js@alpha
```
### Usage
html
```html
  <div id="vs"></div>
```
js
```javascript
import Player from 'xgplayer'
import 'xgplayer/dist/xgplayer.min.css'
import HlsJsPlugin from 'xgplayer-hls.js'

const player = new Player({
        id: 'vs',
        url: '../xgplayer-demo.hls',
        plugins: [HlsJsPlugin],
        hlsJsPlugin: {} // config for plugin HlsJsPlugin
        // If use CDN loading,you can Get the plugin through window.HlsJsPlugin
    })
```
