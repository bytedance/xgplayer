# xgplayer-hls.js

`xgplayer-hls.js` integrates [hls.js](https://github.com/video-dev/hls.js)
with xgplayer.

## Installation

```bash
npm install xgplayer xgplayer-hls.js
```

## Usage

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import HlsJsPlugin from 'xgplayer-hls.js'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.m3u8',
  plugins: [HlsJsPlugin]
})
```
