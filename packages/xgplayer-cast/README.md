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
| promt() | show |
