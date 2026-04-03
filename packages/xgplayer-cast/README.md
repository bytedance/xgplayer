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
| showIcon | boolean | `true` | Whether display the cast icon UI in control bar |
| airplay | boolean | `true` | Whether enable Apple Airplay if available |
| chromecast | boolean | `true` | Whether enable Google Chromecast if available |


### API

| Method Name | Description |
| ------ | ----- |
| requestCast() | Programmatically open the native cast dialog (AirPlay picker or Chromecast device chooser). Has no effect if no cast protocol is available. |

### Notes

- Require xgplayer 3.0.25+
- **Chromecast available in version 3.0.27**.
- **Encrypted video is not supported for casting**: AirPlay / Chromecast requires the receiver device (Apple TV, Chromecast dongle) to independently fetch and decrypt the media stream. DRM-protected content (FairPlay, Widevine, clearkeys, etc.) ties the decryption license to the current browser session, so the receiver cannot obtain a valid key and playback will fail.
