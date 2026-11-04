# xgplayer-subtitles

`xgplayer-subtitles` provides external subtitle loading, synchronization, and
rendering for xgplayer.

## Installation

```bash
npm install xgplayer xgplayer-subtitles
```

## Usage

```js
import Player from 'xgplayer'
import Subtitle from 'xgplayer-subtitles'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.mp4'
})

const subtitle = new Subtitle({
  player,
  defaultOpen: true,
  subTitles: [
    {
      id: 'zh',
      language: 'zh',
      label: '中文',
      isDefault: true,
      url: 'https://example.com/subtitles/zh.vtt'
    },
    {
      id: 'en',
      language: 'en',
      label: 'English',
      url: 'https://example.com/subtitles/en.vtt'
    }
  ]
})
```

Each subtitle item can provide one of the following content sources:

- `url`: one URL, multiple fallback URLs, or segmented URL descriptors.
- `stringContent`: subtitle source text.
- `list`: parsed items with `start`, `end`, and `text` fields.

## Options

| Option | Default | Description |
| --- | ---: | --- |
| `player` | `undefined` | Player or media element to attach |
| `subTitles` | `[]` | Available subtitle tracks |
| `defaultOpen` | `false` | Open the default track during initialization |
| `domRender` | `true` | Render subtitle DOM; disable to consume events only |
| `mode` | `'stroke'` | Subtitle style mode: `stroke` or `bg` |
| `line` | `'double'` | Maximum displayed lines: `single`, `double`, or `three` |
| `updateMode` | `'vod'` | Subtitle lifecycle mode: `vod` or `live` |
| `renderMode` | `''` | Set to `step` for word-by-word rendering |
| `fitVideo` | `true` | Position subtitles relative to the video picture |
| `offsetBottom` | `2` | Bottom offset as a percentage |
| `debugger` | `false` | Enable subtitle debug logs |

## API

| Method | Description |
| --- | --- |
| `attachPlayer(player)` | Attach a player or media element |
| `detachPlayer()` | Detach the current player |
| `switch({ id, language })` | Select and open a subtitle track |
| `switchExt({ id, language })` | Select a secondary subtitle track |
| `switchOn()` | Open the current track |
| `switchOff()` | Close subtitle updates |
| `setSubTitles(subTitles, isOpen)` | Replace the available tracks |
| `destroy()` | Remove listeners, rendering state, and player references |

## Events

Listen with `subtitle.on(event, handler)`.

| Event | Description |
| --- | --- |
| `update` | Active subtitle text changed |
| `change` | Selected track or open state changed |
| `off` | Subtitle rendering was closed |
| `error` | Subtitle loading or parsing failed |

## Safe rendering

DOM rendering accepts basic subtitle formatting tags such as `b`, `i`, `u`,
`ruby`, and `br`. Unsupported tags are rendered as text, and executable or
external attributes such as event handlers, `style`, `href`, and `src` are
discarded.
