# xgplayer-flv

`xgplayer-flv` is an MSE streaming plugin for xgplayer that supports HTTP-FLV
live streams and files.

## Installation

```bash
npm install xgplayer xgplayer-flv
```

## Usage

```js
import Player from 'xgplayer'
import FlvPlugin from 'xgplayer-flv'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/live.flv',
  isLive: true,
  plugins: [FlvPlugin],
  flv: {
    retryCount: 3,
    preloadTime: 5
  }
})
```

Omit `isLive` for FLV files. Cross-origin sources must allow the page origin
through CORS. VOD Range seeking additionally requires keyframe metadata and
readable `Accept-Ranges` or `Content-Range` response headers.

Use `FlvPlugin.isSupported()` to check the standard MSE path. Set
`preferMMS: true` to prefer Managed Media Source when available.

## Options

Pass options through the player's `flv` field.

| Option | Default | Description |
| --- | ---: | --- |
| `retryCount` | `3` | Number of request retries |
| `retryDelay` | `1000` | Retry delay, in milliseconds |
| `loadTimeout` | `10000` | Request timeout, in milliseconds |
| `preloadTime` | `5` | Target preload duration, in seconds |
| `bufferBehind` | `10` | Buffered history retained behind the current time, in seconds |
| `targetLatency` | `5` | Target live latency, in seconds |
| `maxLatency` | `10` | Live latency threshold that triggers chase-frame correction |
| `fetchOptions` | `undefined` | Request headers, credentials, and other fetch options |
| `preferMMS` | `false` | Prefer `ManagedMediaSource` when available |
| `manualLoad` | `false` | Defer loading until `player.plugins.flv.loadSource()` is called |
