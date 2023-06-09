# Introduction

A extension plugin which integrated [flv.js](https://github.com/Bilibili/flv.js/) based on
xgplayer, it can support play flv video

# How to use

### install

```shell
$ npm istall xgplayer
$ npm istall xgplayer-flv.js
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
  url: '../xgplayer-demo.flv',
  plugins: [FlvJsPlugin],
  flvJsPlugin: {} // config for plugin FlvJsPlugin
  // If use CDN loading,you can Get the plugin through window.FlvJsPlugin
})
```
