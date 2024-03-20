# Introduction

A extension plugin which integrated [mpegts.js](https://github.com/xqq/mpegts.js) based on
xgplayer, it can support play flv video

# How to use

### install

```shell
$ npm istall xgplayer
$ npm istall xgplayer-mpegts.js
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
import MpegTsJSPlugin from 'xgplayer-mpegts.js'

const player = new Player({
  id: 'vs',
  url: '../xgplayer-demo.flv',
  plugins: [MpegTsJSPlugin],
  mpegTsJSPlugin: {} // config for plugin FlvJsPlugin
  // If use CDN loading,you can Get the plugin through window.FlvJsPlugin
})
```
