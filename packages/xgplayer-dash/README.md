# xgplayer-dash

`xgplayer-dash` is an MSE streaming plugin for xgplayer that supports
MPEG-DASH streams.

## Installation

```bash
npm install xgplayer xgplayer-dash
```

## Usage

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import DashPlugin from 'xgplayer-dash'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.mpd',
  plugins: [DashPlugin]
})
```
