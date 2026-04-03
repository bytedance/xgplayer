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

#### Config

| Name | Types | Default | Description |
| ------ | -------- | ----- | ----- |
| showIcon | boolean | `true` | Whether to display the cast icon in the control bar |
| airplay | boolean | `true` | Whether to enable Apple AirPlay when available |
| chromecast | boolean | `true` | Whether to enable Google Chromecast when available |
| autoplayOnCast | boolean | `true` | Whether to keep playing after casting starts. Note: the plugin will still issue an initial play request to establish the cast route, then pause immediately when set to `false`. |
| showAirplayMutedTip | boolean | `true` | Whether to show a tip prompting the user to unmute when AirPlay is connected |


### API

| Method Name | Description |
| ------ | ----- |
| requestCast() | Programmatically open the native cast dialog (AirPlay picker or Chromecast device chooser). Has no effect if no cast protocol is available. |

### Notes

- AirPlay is available in xgplayer 3.0.25+.
- Chromecast is available in xgplayer 3.0.26+.
- **Encrypted video is not supported for casting**: AirPlay / Chromecast requires the receiver device (Apple TV, Chromecast dongle) to independently fetch and decrypt the media stream. DRM-protected content (FairPlay, Widevine, clearkeys, etc.) ties the decryption license to the current browser session, so the receiver cannot obtain a valid key and playback will fail.
