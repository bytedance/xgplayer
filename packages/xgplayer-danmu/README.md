### Introduction

依赖 [danmu.js](https://github.com/bytedance/danmu.js) 实现的弹幕展示方案

### Start

1. Install

```
$ npm install xgplayer-danmu
```

2. Usage

```javascript
import Player from "xgplayer"
import DanmuPlugin from "xgplayer-danmu"
import "xgplayer/dist/xgplayer.min.css"

const player = new Player({
  id,
  url,
  autoplay: true,
  plugins: [DanmuPlugin]
})
```

    