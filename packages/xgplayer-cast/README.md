# xgplayer-cast

## Introduction



### Usage

```javascript
import Player from "xgplayer"
import CastPlugin from "xgplayer-cast"
import "xgplayer/dist/xgplayer.min.css"

const player = new Player({
    id,
    url,
    autoplay: true,
    plugins: [CastPlugin],
    cast: {
      showIcon: true,
      airplay: true,
      chromecast: true
    }
})
```

## Android / Chromecast Usage

```js
// Minimal — uses built-in default Sender SDK URL
const player = new Player({
  id,
  url,
  plugins: [CastPlugin],
  cast: {
    airplay: true,
    chromecast: true
  }
})

// Custom SDK URL (intranet, proxy, or self-hosted)
const player = new Player({
  id,
  url,
  plugins: [CastPlugin],
  cast: {
    chromecast: {
      sdkUrl: 'https://your-cdn.example.com/cast_sender.js',
      receiverApplicationId: 'YOUR_APP_ID',
      autoJoinPolicy: 'origin_scoped'
    }
  }
})
```

#### Config

| Name | Types | Default | Description |
| ------ | -------- | ----- | ----- |
| showIcon | boolean | `true` | Whether to display the cast icon in the control bar |
| airplay | boolean | `true` | Whether to enable Apple AirPlay when available |
| chromecast | boolean \| object | `true` | Enable Chromecast. `true` uses the default Sender SDK URL. Object form overrides SDK loading and session options. |
| chromecast.sdkUrl | string | Google Cast Sender SDK URL | Sender SDK URL. Defaults to the official Google Cast Sender SDK. Can be overridden for intranet/CDN/proxied deployments. |
| chromecast.sdkLoader | function | `null` | Custom async SDK loader. Use when the host app manages script loading. Receives no args, must return a Promise. |
| chromecast.receiverApplicationId | string | `''` | Receiver app id. Empty string means default media receiver. |
| chromecast.autoJoinPolicy | string | `'origin_scoped'` | Session auto join policy. |
| chromecast.loadSdkTimeout | number | `3000` | Sender SDK load timeout in milliseconds. |
| autoplayOnCast | boolean | `true` | Whether to keep playing after casting starts. Note: the plugin will still issue an initial play request to establish the cast route, then pause immediately when set to `false`. |
| showAirplayMutedTip | boolean | `true` | Whether to show a tip prompting the user to unmute when AirPlay is connected |


### API

| Method Name | Description |
| ------ | ----- |
| requestCast(protocol?) | Programmatically open the native cast dialog (AirPlay picker or Chromecast device chooser). Pass `'airplay'` or `'chromecast'` to force a specific protocol; omit to auto-select the best available one. Has no effect if no cast protocol is available. |

### Events

| Event Name | Payload | Description |
| ------ | ----- | ----- |
| cast_error | `{ protocol, code, message, error?, media? }` | Emitted when Chromecast setup, session, media resolution, or remote media loading fails. |

### Notes

- AirPlay is available in xgplayer 3.0.25+.
- Chromecast is available in xgplayer 3.0.26+.
- **Encrypted video is not supported for casting**: AirPlay / Chromecast requires the receiver device (Apple TV, Chromecast dongle) to independently fetch and decrypt the media stream. DRM-protected content (FairPlay, Widevine, clearkeys, etc.) ties the decryption license to the current browser session, so the receiver cannot obtain a valid key and playback will fail.
