# xgplayer-ads

## Introduction

The `Ads` plugin mainly used to provide users with the ability to quickly integrate advertizement. The plugin integrates SDKs such as `Google IMA` and `Google DAI`<sup>(to be developed)</sup>, and provides ad integration capability that comply with VAST, VMAP, VPAID and other standards.

### Usage

```javascript
import Player from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"
import "xgplayer/dist/xgplayer.min.css"

const player = new Player({
    id,
    url,
    autoplay: true,
    plugins: [AdPlugin],
    ad: {
      adType: 'ima',
      ima: {
        locale: 'zh_cn',
        adsRequest: createAdsRequest()
      }
    }
})
```

#### Ad Config

| Name | Types | Default | Description |
| ------ | -------- | ----- | ----- |
| adType | `google-ima` \| `google-dai` \| `aws-media-tailer` | - | Ad SDK type, currently only supports `google-ima` |
| ima | object | [IMA Config](#ima_configure) | Configuration provided for `google-ima` type |
| controls | boolean | `true` | Whether display the playback control UI during the ad playing |


<a name="ima_configure"></a>
#### IMA Config
| Name | Types | Default | Description |
| ------ | -------- | ----- | ----- |
| debug | boolean | false | Before loading the plugin, developers can import and load the IMA SDK. If the plugin detects that there is no `google.ima` object, it will automatically load the IMA SDK. if `true`, the debug version of the IMA SDK is loaded. |
| loadSdkTimeout | number | 3000 | If the IMA SDK JS is loaded by IMAManager, it indicates the loading timeout, in milliseconds. |
| locale | string | - | See：[Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization) |
| adsRequest | object | - | See：[google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) |
| adsResponse | null \| string \| non-null Document | - | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest#adsResponse)'s parameter that specifies a VAST document to be used as the ads response instead of making a request through an ad tag url.. This parameter has no effect when the `adsRequest` parameter is set. |
| adTagUrl | string | - | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest)'s parameter that specifies the address to request the ad server. This parameter has no effect when the `adsRequest` \| `adsResponse` parameter is set. |


### Events

Ad events are independent of normal video playback events and can be monitored through `on` function.

```javascript
player.on('ad_play', ()=>{
    // do something
})
```

| Event Name | Description |
| ------ | ----- |
| ad_play | Fired when the ad starts playing. |
| ad_pause | Fired when the ad paused. |
| ad_time_update |  The ad type is linear, it is triggered when the current time of the ad changes |
| ad_complete | Fired when the ad completes playing. |
| ad_all_completed | Fired when all ads are finished. |

## About Google IMA

The IMA SDK significantly reduces the complexity of implementing standard ad technologies for [VAST](https://www.iab.com/guidelines/vast) as set forth by [IAB](https://www.iab.com/guidelines/), [VMAP](https://www.iab.com/guidelines/vmap/), [SIMID](https://www.iab.com/guidelines/simid/) and other advertising interaction standards have been implemented to the greatest extent Compatibility and support. IMA SDK is an ideal choice for businesses that need to start advertising services from 0->1 and want to integrate ad simply without caring much about implementation details.

This plugin integrates Google IMA SDK. Please <b>comply with its data privacy requirements</b> when using it, see [CCPA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/ccpa). The built-in IMA SDK will be downloaded by default, and relevant configurations can be turned off and downloaded by yourself.

SDK Links:  https://imasdk.googleapis.com/js/sdkloader/ima3.js

SDK Document: https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js


### Locale

Call setLocale() to localize language text, for more details see [Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization)

```javascript
google.ima.settings.setLocale('zh-CN');
```

### VPAID

Please refer to the [IAB VPAID](https://iabtechlab.com/standards/video-player-ad-interface-definition-vpaid/) page for more details.

```javascript
google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
```


## Ad UI build principles

When implementing the linear ad UI, it is necessary to obtain the status of the ad and may be coupled with the main video UI. The impact should be weighed during specific implementation. When the ad plugin is not integrated, the impact on the main package size should be minimized, and an overall design principle should be formulated.

### Design Points
1. AD UI is completely independent of xgplayer, and is implemented independently by inheriting the functions of the built-in UI plugin, and overwriting some states/events that need to be modified.
2. Built-in UI manager (AdUIManager) monitors the advertising playback status and responds to advertising UI changes.
3. The Player UI plugin is fine-tuned to support the Ad plugin, but the ad status is not specially write internally, only the ability to be copied is provided.


### Implementation of Status, Events, and Methods

1. Status

    - `adPlugin.paused`
    - `adPlugin.currentTime`
    - `adPlugin.duration`

2. Events

```JavaScript
import Events from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"

player.on([ADEvents.AD_PLAY, ADEvents.AD_PAUSE], () => {
  // do something
})

// or
const adPlugin = player.getPlugin(AdPlugin.pluginName)
adPlugin.on([ADEvents.AD_PLAY, ADEvents.AD_PAUSE], () => {
  // do something
})
```

3. Methods

```JavaScript
import Events from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"

const adPlugin = player.getPlugin(AdPlugin.pluginName)

adPlugin.play()
adPlugin.pause()
```
