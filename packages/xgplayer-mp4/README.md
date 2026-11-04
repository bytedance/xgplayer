# xgplayer-mp4

`xgplayer-mp4` is an MSE streaming plugin for xgplayer that provides segmented
MP4 loading and buffer control.

## Installation

```bash
npm install xgplayer xgplayer-mp4
```

## Usage

```js
import Player from 'xgplayer'
import Mp4Plugin from 'xgplayer-mp4'
import 'xgplayer/dist/index.min.css'

const player = new Player({
  id: 'player',
  url: 'https://example.com/video.mp4',
  plugins: [Mp4Plugin],
  mp4: {
    maxBufferLength: 30,
    minBufferLength: 10,
    reqOptions: {
      headers: {
        'x-test-header': 'value'
      }
    }
  }
})
```

## Options

| Option | Default | Description |
| --- | ---: | --- |
| `maxBufferLength` | `40` | Target forward buffer while playing, in seconds |
| `minBufferLength` | `5` | Target forward buffer while paused, in seconds |
| `bufferBehind` | `10` | Buffered history retained behind the current time, in seconds |
| `tickInterval` | `500` | Download scheduling interval, in milliseconds |
| `segmentDuration` | `undefined` | Target duration for each downloaded segment, in seconds |
| `onProcessMinLen` | `1024` | Minimum streamed chunk size passed to the loader callback |
| `retry` | `3` | Number of request retries |
| `retryDelay` | `1000` | Retry delay, in milliseconds |
| `timeout` | `3000` | Request timeout, in milliseconds |
| `reqOptions` | `null` | Request headers, credentials, and other loader options |
| `disableBufferBreakCheck` | `false` | Disable stalled-stream recovery |
| `waitingTimeOut` | `15000` | Timeout before an out-of-buffer stall is treated as fatal |
| `waitingInBufferTimeOut` | `5000` | Delay before in-buffer seek recovery |
| `waitJampBufferMaxCnt` | `3` | Maximum in-buffer seek recovery attempts |
| `closeDowngrade` | `false` | Disable fallback to native video after a fatal plugin error |
| `preferMMS` | `false` | Prefer `ManagedMediaSource` when available |
| `mseAttachMode` | `'auto'` | MediaSource attachment mode: `auto`, `src`, or `source-element` |
| `enableWorker` | `false` | Run transmuxing in a Worker when available |

When fallback is enabled, fatal initialization and runtime errors emit
`playCatch` with `MP4_1` or `MP4_2`, then restore the native video source.
