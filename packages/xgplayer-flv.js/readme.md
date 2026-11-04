# xgplayer-flv.js

`xgplayer-flv.js` integrates [flv.js](https://github.com/Bilibili/flv.js/)
with xgplayer.

## Installation

```bash
npm install xgplayer xgplayer-flv.js
```

## Usage

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import FlvJsPlugin from 'xgplayer-flv.js'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.flv',
  plugins: [FlvJsPlugin]
})
```
