# Introduction
  A extension plugin which integrated [shaka-player](https://www.npmjs.com/package/shaka-player) based on xgplayer

# How to use
### install

```shell
$ npm istall xgplayer@alpha
$ npm istall xgplayer-shaka@alpha
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
import ShakaPlugin from 'xgplayer-shaka'

const player = new Player({
    id: 'vs',
    url: '../xgplayer-demo.hls',
    plugins: [ShakaPlugin],
    shakaPlugin: {} // config for plugin ShakaPlugin
    // If use CDN loading,you can Get the plugin through window.ShakaPlugin
})
```
