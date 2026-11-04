<div align="center">
  <img src="https://raw.githubusercontent.com/bytedance/xgplayer/master/xgplayer.png" width="384" height="96" />
</div>
<div align="center">
  <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
    <img src="https://img.shields.io/npm/v/xgplayer.svg" alt="npm" />
  </a>
  <a href="https://www.npmjs.com/package/xgplayer" target="_blank">
    <img src="https://img.shields.io/npm/l/xgplayer.svg" alt="license" />
  </a>
  <a href="https://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen" />
  </a>
</div>

# xgplayer

xgplayer provides a flexible, plugin-based media player for web applications.
Its UI components, loading strategies, and format integrations can be composed
independently.

[Documentation](https://h5player.bytedance.com/en/)

## Installation

```bash
npm install xgplayer
```

## Usage

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
})
```

See the [configuration documentation](https://h5player.bytedance.com/en/config/)
for additional player options.

## Plugins

xgplayer provides built-in UI plugins and optional streaming or feature
packages. See the [plugin documentation](https://h5player.bytedance.com/en/plugins/)
for available integrations.

## Development

```bash
yarn
yarn dev:xgplayer
```

Other format demos:

```bash
yarn dev:hls
yarn dev:flv
yarn dev:mp4
```

## License

[MIT](https://opensource.org/licenses/MIT)
