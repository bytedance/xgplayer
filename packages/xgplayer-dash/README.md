# Introduction
  A extension plugin based on xgplayer, it can support play dash video

# How to use
### install

```shell
$ npm istall xgplayer@alpha
$ npm istall xgplayer-dash@alpha
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
import DashPlugin from 'xgplayer-dash'

const player = new Player({
        id: 'vs',
        url: '../xgplayer-demo.hls',
        plugins: [DashPlugin],
        DashPlugin: {} // config for plugin DashPlugin
        // If use CDN loading,you can Get the plugin through window.DashPlugin
    })
```
