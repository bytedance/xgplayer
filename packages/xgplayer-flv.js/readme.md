# Introduction
  A extension plugin which integrated [hls.js](https://github.com/video-dev/hls.js) based on xgplayer, it can support play hls video

# How to use
### install

```shell
$ npm istall xgplayer@alpha
$ npm istall xgplayer-flv.js@alpha
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
import FlvJsPlugin from 'xgplayer-flv.js'

const player = new Player({
        id: 'vs',
        url: '../xgplayer-demo.hls',
        plugins: [FlvJsPlugin],
        flvJsPlugin: {} // config for plugin FlvJsPlugin
        // If use CDN loading,you can Get the plugin through window.FlvJsPlugin
    })
```
