# xgplayer-ads

## 简介

`Ads` 插件集成了 `Google IMA`、`Google DAI`<sup>(待开发)</sup> 等SDK，提供了符合VAST、VMAP、VPAID等标准的广告快捷的接入能力。

### 使用方式

```javascript
import Player from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"
import "xgplayer/dist/xgplayer.min.css"

const player = new Player({
    url,
    id,
    autoplay: true,
    height: window.innerHeight,
    width: window.innerWidth,
    plugins: [AdPlugin],
    ad: {
      adType: 'ima',
      ima: {
        locale: 'zh_cn',
        adsRequest: createAdsRequest()
      }
    }
})

player.on(ADEvents.AD_PLAY, ()=>{
    // do something
})
player.on(ADEvents.AD_PAUSE, ()=>{
    // do something
})


function createAdsRequest() {
  // Request video ads.
  const adsRequest = new google.ima.AdsRequest()
  adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
        'iu=/21775744923/external/single_ad_samples&sz=640x480&' +
        'cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&' +
        'output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='

  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = 640
  adsRequest.linearAdSlotHeight = 400
  adsRequest.nonLinearAdSlotWidth = 640
  adsRequest.nonLinearAdSlotHeight = 150
  return adsRequest
}

```


### 可配置的参数

```javascript
{
  adType: 'ima',
  ima: {
    locale: 'zh_cn',
    adsRequest: createAdsRequest()
  }
}
```

#### IMA Config
| 配置字段 | 类型 | 含义 |
| ------ | -------- | ----- |
| locale | string | 参看：[Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization) |
| adsRequest | object | 参看：[google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) |
| adsResponse | string | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数，指定向广告服务器请求地址。当 `adsRequest` 参数被设置时，此参数不生效。 |
| adTagUrl | string | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数，指定向广告服务器请求地址。当 `adsRequest` \| `adsResponse` 参数被设置时，此参数不生效。 |


### 事件（Events）

>> 广告事件独立于普通视频播放事件，可通过 on 监听

```javascript
player.on('adPlay', ()=>{
    // do something
})
```

| 事件名 | 含义 |
| ------ | ----- |
| adPlay | 当广告启播时，发布此事件 |
| adPause | 当广告暂停时，发布此事件 |

## IMA

[IMA SDK for HTML5](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side)

### Locale

Call setLocale() to localize language text, for more details see [Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization)

```javascript
google.ima.settings.setLocale('zh-CN');
```

### VPAID

请参考 [IAB VPAID](https://iabtechlab.com/standards/video-player-ad-interface-definition-vpaid/) 页面了解详情。

1. 如何启用 VPAID？
google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

### 使用方式


## ADBlocker

如何识别浏览器启用插件 ADBlocker？

TODO: 待调研

## AD UI 设计原则

贴片广告UI在实施时，需要获取广告的状态，并且可能和主视频的UI耦合。在具体实施时应权衡影响，在不集成广告插件时应最小化减少对主包体积的影响，需制定整体的设计原则。

### 设计要点
1. AD UI应尽可能独立于 xgplayer 
2. 广告的状态应尽可能独立于 xgplayer 中抽离出来，并通过插件的方式获取
    
    - 贴片广告UI和正片差异化很大时，如何实现？
        - 这种情况下，广告的样式完全实现于广告插件中。
        - 广告插件开放自定义UI的能力，可以实现广告UI的定制。
    - 贴片广告UI和正片差异化不大时，需要复用控制条样式，并进行一些小的修改，如何实现？
        - 播放器部分UI会针对广告时的样式进行区分，做小的微调。


### 广告状态、事件、方法的实现

1. 广告状态

    - 广告是否暂停 : `player.adPaused`
    - 广告是否结束 : `player.adEnded`

1. 广告事件

```JavaScript
import Events from "xgplayer"

player.on([Events.AD_PLAY, Events.AD_PAUSE], ()=>{
    // do something
})
```