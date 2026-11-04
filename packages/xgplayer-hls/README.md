# xgplayer-hls

`xgplayer-hls` is an MSE streaming plugin for xgplayer that supports HLS VOD
and live streams.

## Installation

```bash
npm install xgplayer xgplayer-hls
```

## Usage

```js
import Player from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.m3u8',
  plugins: [HlsPlugin]
})
```

Set `isLive: true` on the player for live streams. The plugin supports media
and multivariant playlists, MPEG-TS and fragmented MP4 segments, alternate
audio, and subtitle playlists.

All cross-origin playlists, segments, keys, audio renditions, and subtitle
resources must allow the page origin through CORS.

## Runtime support

`HlsPlugin.isSupported()` checks the plugin's MSE path. In an MMS-only runtime,
the plugin leaves source handling to browser-native HLS unless
`preferMMS: true` is configured.

## Options

Pass options through the player's `hls` field.

| Option | Default | Description |
| --- | ---: | --- |
| `retryCount` | `3` | Number of segment request retries |
| `retryDelay` | `1000` | Retry delay, in milliseconds |
| `loadTimeout` | `10000` | Segment request timeout, in milliseconds |
| `manifestLoadTimeout` | `10000` | Playlist request timeout, in milliseconds |
| `preloadTime` | `30` | Target forward buffer, in seconds |
| `bufferBehind` | `10` | Buffered history retained behind the current time, in seconds |
| `targetLatency` | `10` | Target live latency, in seconds |
| `maxLatency` | `20` | Live latency threshold that triggers chase-frame correction |
| `useLowLatency` | `true` | Enable low-latency playlist handling |
| `fetchOptions` | `undefined` | Request headers, credentials, and other fetch options |
| `preferMMS` | `false` | Prefer `ManagedMediaSource` when available |
| `mseAttachMode` | `'auto'` | MediaSource attachment mode: `auto`, `src`, or `source-element` |

Advanced hooks for playlist preprocessing, custom decryption, and timestamp
repair are available through the typed `hls` configuration.

## Runtime access

```js
const hls = player.plugins.hls

await player.switchURL('https://example.com/next.m3u8')

console.log(hls.core.streams)
await hls.core.switchStream(streamId)
await hls.core.switchAudioStream(audioStreamId)
await hls.core.switchSubtitleStream('en')

const stats = hls.getStats()
const speed = hls.core.speedInfo()
const buffer = hls.core.bufferInfo()
```

Streaming diagnostics are forwarded through `core_event`; fatal errors are
forwarded through the player's `error` event.
