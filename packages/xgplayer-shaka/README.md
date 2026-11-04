# xgplayer-shaka

`xgplayer-shaka` integrates
[Shaka Player](https://www.npmjs.com/package/shaka-player) with xgplayer.

## Installation

```bash
npm install xgplayer xgplayer-shaka
```

## Usage

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import ShakaPlugin from 'xgplayer-shaka'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.mpd',
  plugins: [ShakaPlugin]
})
```
