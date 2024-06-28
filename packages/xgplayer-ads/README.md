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

player.on(ADEvents.AD_PLAY, () => {
    // 举例：直播或点播等特殊场景，需要轮询异步的获取adTagUrl时间，可通过 requestAd 方法重新请求广告
    setTimeout(()=>{
        player.plugins.ad.requestAd(createAdsRequest())
    }, 1000)
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

#### Ad Config
| 配置字段 | 类型 | 含义 |
| ------ | -------- | ----- |
| adType | `ima` \| `media-tailer` \| `dai` | 广告SDK对接的 SDK 类型，目前仅支持`ima` |
| ima | object | 参见 [IMA Config](#ima_configure) |
| controls | boolean | 是否需要在广告期间展示播控UI，默认为 `true` |


<a name="ima_configure"></a>
#### IMA Config
| 配置字段 | 类型 | 含义 |
| ------ | -------- | ----- |
| debug | boolean | 在插件加载前，开发者可自行引入加载IMA SDK。如果插件检测到没有 `google.ima` 对象时，插件内会自动加载IMA SDK，此开关为`true`时加载debug版本IMA SDK |
| locale | string | 参看：[Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization) |
| adsRequest | object | 参看：[google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) |
| adsResponse | string | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数，指定向广告服务器请求地址。当 `adsRequest` 参数被设置时，此参数不生效。 |
| adTagUrl | string | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数，指定向广告服务器请求地址。当 `adsRequest` \| `adsResponse` 参数被设置时，此参数不生效。 |


### 事件（Events）

>> 广告事件独立于普通视频播放事件，可通过 on 监听

```javascript
player.on('ad_play', ()=>{
    // do something
})
```

| 事件名 | 含义 |
| ------ | ----- |
| ad_play | 当广告启播时，发布此事件 |
| ad_pause | 当广告暂停时，发布此事件 |
| ad_time_update | 当广告类型为贴片时，广告当前时间发生变更时触发 |

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

1. 如何识别浏览器启用插件 ADBlocker？
2. ADBlocker机制触发时，广告的流程可正常运转

TODO: 待调研

## AD UI 设计原则

贴片广告UI在实施时，需要获取广告的状态，并且可能和主视频的UI耦合。在具体实施时应权衡影响，在不集成广告插件时应最小化减少对主包体积的影响，需制定整体的设计原则。

### 设计要点
1. AD UI完全独立于 xgplayer，以继承内置UI插件的功能独立实现，并复写部分需要修改的状态/事件等 
2. 内置广告UI管理器（AdUIManager），监听广告播放状态，响应广告UI变化。
3. Xgplayer UI插件微调，以支持Ad插件，但内部不对广告状态进行特殊编码，只提供可以复写的能力。


### 广告状态、事件、方法的实现

1. 广告状态

    - 广告是否处于非播放态 : `adPlugin.paused`
    - 当前广告播放的时间点 : `adPlugin.currentTime`
    - 当前广告时长 : `adPlugin.duration`

1. 广告事件

```JavaScript
import Events from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"

player.on([ADEvents.AD_PLAY, ADEvents.AD_PAUSE], ()=>{
  // do something
})
```
1. 广告方法调用
```JavaScript
import Events from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"

const adPlugin = player.getPlugin(AdPlugin.pluginName)

adPlugin.play()
adPlugin.pause()
```