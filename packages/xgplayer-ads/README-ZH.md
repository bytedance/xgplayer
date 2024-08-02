# xgplayer-ads

## 简介

`Ads` 插件主要是为了提供用户快速接入广告的能力。插件集成了 `Google IMA`、`Google DAI`<sup>(待开发)</sup> 等SDK，提供了符合VAST、VMAP、VPAID等标准的广告接入方式。

### 使用方式

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

| 配置字段 | 类型 | 默认值 | 含义 |
| ------ | -------- | ----- | ----- |
| adType | `google-ima` \| `google-dai` \| `aws-media-tailer` | - | 广告SDK类型，目前仅支持`google-ima` |
| ima | object | [IMA Config](#ima_configure) | 为客户端实现方案 IMA 提供的配置 |
| controls | boolean | `true` | 是否需要在广告期间展示播控UI |


<a name="ima_configure"></a>
#### IMA Config
| 配置字段 | 类型 | 默认值 | 含义 |
| ------ | -------- | ----- | ----- |
| debug | boolean | false | 在插件加载前，开发者可自行引入加载IMA SDK。如果插件检测到没有 `google.ima` 对象时，插件内会自动加载IMA SDK，此开关为`true`时加载debug版本IMA SDK |
| loadSdkTimeout | number | 3000 | 如果由IMAManager内加载IMA SDK JS，表示其加载超时时间，单位：毫秒ms |
| locale | string | - | 参看：[Localizing for language and locale](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization) |
| adsRequest | object | - | 参看：[google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) |
| adsResponse | null \| string \| non-null Document | - | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数， 表示要用作广告响应的 VAST 2.0 文档内容，而不是通过广告标签网址发出请求。当 `adsRequest` 参数被设置时，此参数不生效。 |
| adTagUrl | string | - | [google.ima.AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) 的一个参数，指定向广告服务器请求地址。当 `adsRequest` \| `adsResponse` 参数被设置时，此参数不生效。 |


### 事件（Events）

广告事件独立于普通视频播放事件，可通过 on 监听

```javascript
player.on('ad_play', ()=>{
    // do something
})
```

| 事件名 | 含义 |
| ------ | ----- |
| ad_play | 当广告启播时，发布此事件 |
| ad_pause | 当广告暂停时，发布此事件 |
| ad_time_update | 当广告类型为线性贴片时，广告当前时间发生变更时触发 |
| ad_complete | 当线性广告单个完成时，发布此事件 |
| ad_all_completed | 当所有广告完成时，发布此事件 |

<!-- ## ADBlocker

1. 如何识别浏览器启用插件 ADBlocker？
2. ADBlocker机制触发时，广告的流程可正常运转

TODO: 待调研 -->

## 广告 UI 设计原则

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

2. 广告事件

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

3. 广告方法调用

```JavaScript
import Events from "xgplayer"
import AdPlugin, { ADEvents } from "xgplayer-ads"

const adPlugin = player.getPlugin(AdPlugin.pluginName)

adPlugin.play()
adPlugin.pause()
```



## 关于 Google IMA

IMA SDK 显著降低了实现标准广告技术复杂性，对 [IAB](https://www.iab.com/guidelines/) 制定的 [VAST](https://www.iab.com/guidelines/vast/)、[VMAP](https://www.iab.com/guidelines/vmap/)、[SIMID](https://www.iab.com/guidelines/simid/) 等广告交互标准做了最大程度的兼容与支持。对于需要从0->1开始广告业务，并且希望简单接入而不太关心实现细节的业务，IMA SDK 是一个理想的选择。

本插件集成了 Google IMA SDK，在使用时<b>请遵守其对数据隐私的要求</b>，见[CCPA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/ccpa)。内置默认会下载IMA SDK，并提供相关配置可以关闭，并自行下载。

SDK链接：https://imasdk.googleapis.com/js/sdkloader/ima3.js

SDK文档：https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js


### Locale

通过调用 setLocale() 实现本地化, 更多细节见 [语言和区域本地化](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization)

```javascript
google.ima.settings.setLocale('zh-CN');
```

### VPAID

请参考 [IAB VPAID](https://iabtechlab.com/standards/video-player-ad-interface-definition-vpaid/) 页面了解详情。

```javascript
google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
```