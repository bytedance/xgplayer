<a name="1.1.0"></a>
# [1.1.0](https://github.com/bytedance/xgplayer/compare/v1.1.0-beta...v1.1.0) (2018-08-27)



<a name="1.1.0-beta"></a>
## [1.1.0-beta](https://github.com/bytedance/xgplayer/compare/v1.0.9...v1.1.0-beta) (2018-08-24)


### Bug Fixes

* **xgplayer-flv/[src/index.js, src/utils/Observer.js]:** fix xgplayer-flv play/autoplay bug, in Obse ([359c8d9](https://github.com/bytedance/xgplayer/commit/359c8d9))
* **xgplayer/[player.js, control/mobile.js && volume.js]:** fix volume problem in mobile; add mousemo ([22575cf](https://github.com/bytedance/xgplayer/commit/22575cf))


### Features

* **add music plugin & fix flv plugin:** add music plugin & fix flv plugin ([1f1d802](https://github.com/bytedance/xgplayer/commit/1f1d802))
* **examples:** update example ([cb98835](https://github.com/bytedance/xgplayer/commit/cb98835))



<a name="1.0.9"></a>
## [1.0.9](https://github.com/bytedance/xgplayer/compare/v1.0.7...v1.0.9) (2018-08-20)


### Bug Fixes

* fix destroy api ([bc3c4f2](https://github.com/bytedance/xgplayer/commit/bc3c4f2))
* **xgplayer-hls.js/package.json:** update hls.js@0.11.0 for hls.once(event, function(){}) ([dd99fe5](https://github.com/bytedance/xgplayer/commit/dd99fe5))
* **xgplayer/[control/error.js,style/player.scss]:** fix error info suitability problem when player w ([fe22152](https://github.com/bytedance/xgplayer/commit/fe22152))
* **xgplayer/[control/textTrack.js, proxy.js]:** suitability support for textTrack in firefox ([3afda8d](https://github.com/bytedance/xgplayer/commit/3afda8d))
* **xgplayer/[player.js && proxy.js, control/mobile.js && volume.js]:** fix muted autoplay ([a30892a](https://github.com/bytedance/xgplayer/commit/a30892a))
* **xgplayer/control/replay.js:** fix replay button style bug in IE 11 ([7a8d4b7](https://github.com/bytedance/xgplayer/commit/7a8d4b7))
* **xgplayer/player.js,proxy.js,control/progress.js:** check and fix before publish ([15ea12a](https://github.com/bytedance/xgplayer/commit/15ea12a))
* **xgplayer/proxy.js:** config video crossorigin='anonymous' for textTrack ([717e86d](https://github.com/bytedance/xgplayer/commit/717e86d))
* **xgplayer/proxy.js, README.md:** support crossorigin textTrack, rewrite the git clone method for s ([21aa3cc](https://github.com/bytedance/xgplayer/commit/21aa3cc))


### Features

* add music-plugin ([7a781bd](https://github.com/bytedance/xgplayer/commit/7a781bd))
* **example:** update example ([557aca6](https://github.com/bytedance/xgplayer/commit/557aca6))
* **flv/utils/Observer:** update Observer for compatibility ([f51d878](https://github.com/bytedance/xgplayer/commit/f51d878))
* **logger/*:** add xgplayer-logger support CNZZ, Baidu and Gtag ([b930a5c](https://github.com/bytedance/xgplayer/commit/b930a5c))
* **xgplayer/[control/textTrack.js, style/player.scss, proxy.js]:** add control status: fullscreen, ([bb8079e](https://github.com/bytedance/xgplayer/commit/bb8079e))
* **xgplayer/[package.json, control/pip.js, style/player.scss]:** add Picture-in-Picture function ([0e39cd8](https://github.com/bytedance/xgplayer/commit/0e39cd8))
* **xgplayer/[proxy.js, utils/util.js]:** add bufferedChange event ([00c74dc](https://github.com/bytedance/xgplayer/commit/00c74dc))
* **xgplayer/control/[pc.js, mobile.js, replay.js]:** add center button svg path config ([2b47a5a](https://github.com/bytedance/xgplayer/commit/2b47a5a))


### Performance Improvements

* **xgplayer/control/pc.js:** change enterLogo config, add enterBg, enterTips config ([2b97761](https://github.com/bytedance/xgplayer/commit/2b97761))



<a name="1.0.7"></a>
## [1.0.7](https://github.com/bytedance/xgplayer/compare/v1.0.6...v1.0.7) (2018-08-02)


### Bug Fixes

* **flv/index.js:** destroy flv when player distroyed ([e90380b](https://github.com/bytedance/xgplayer/commit/e90380b))
* **xgplayer/[control/mobile.js,pc.js,progress.js style/player.scss]:** fix playbackrate and definiti ([de26dbc](https://github.com/bytedance/xgplayer/commit/de26dbc))


### Features

* 1. dynamic src for plugin for hls\hls.js\mp4; 2. destroy api; 3. xgplayer mediaType support fo ([2677045](https://github.com/bytedance/xgplayer/commit/2677045))
* **flv/[Flv.js, index.js, parser/demux/Audio&Video]:** flv support change src at the middle of play ([d24432f](https://github.com/bytedance/xgplayer/commit/d24432f))
* **xgplayer/[control/definition.js,fullscreen.js,play.js,playbackRate.js style/player.scss]:** Chan ([5ad1322](https://github.com/bytedance/xgplayer/commit/5ad1322))
* **xgplayer/[proxy.js,control/mobile.js&textTrack.js,style/player.scss]:** 1.support Android mobile ([68f55c4](https://github.com/bytedance/xgplayer/commit/68f55c4))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/bytedance/xgplayer/compare/v1.0.6-0...v1.0.6) (2018-07-26)



<a name="1.0.6-0"></a>
## [1.0.6-0](https://github.com/bytedance/xgplayer/compare/v1.0.5...v1.0.6-0) (2018-07-25)


### Bug Fixes

* **xgplayer/proxy.js:** add param 'type' for canPlayType function ([f934040](https://github.com/bytedance/xgplayer/commit/f934040))
* fix hls.js live stream fetch when player destroyed ([6760f78](https://github.com/bytedance/xgplayer/commit/6760f78))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/bytedance/xgplayer/compare/v1.0.4...v1.0.5) (2018-07-13)


### Bug Fixes

* **examples/flv flv/src/[FLV, parser/MainParser]:** 解决flv在seek之后，seek状态不能重置的问题，同时解决demo视频没有keframe信息 ([80aef1c](https://github.com/bytedance/xgplayer/commit/80aef1c))
* **README.md, README.zh-CN.md:** fix npm logo ([322949b](https://github.com/bytedance/xgplayer/commit/322949b))
* **xgplayer/[control/playbackRate.js,definition.js,style/player.scss,error.js,proxy.js]:** fix playb ([096316c](https://github.com/bytedance/xgplayer/commit/096316c))
* **xgplayer/[control/progress.js]:** fix progress point position ([55aa619](https://github.com/bytedance/xgplayer/commit/55aa619))


### Features

* fix browser filename to index.js ([42f334c](https://github.com/bytedance/xgplayer/commit/42f334c))
* **flv/[index.js, Flv.js, MainParser.js]:** flv support seamless definition switching, see configur ([d3c9d3e](https://github.com/bytedance/xgplayer/commit/d3c9d3e))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/bytedance/xgplayer/compare/v1.0.3...v1.0.4) (2018-07-05)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/bytedance/xgplayer/compare/83bc3a4...v1.0.3) (2018-07-05)


### Bug Fixes

* **flv/MainParser:** 解决flv连续seek导致的视频播放错误 ([6f59410](https://github.com/bytedance/xgplayer/commit/6f59410)), closes [#10](https://github.com/bytedance/xgplayer/issues/10)
* **xgplayer/[control/makeBullet.js,style/player.scss]:** 修改弹幕对播放器交互影响 ([ec759bf](https://github.com/bytedance/xgplayer/commit/ec759bf))


### Features

* **flv/config:** 增加flv.js的配置项支持，增加cors选项 ([de17ec5](https://github.com/bytedance/xgplayer/commit/de17ec5))
* **flv/src/[index.js, Flv.js]:** flv代码重构 ([1f3e48b](https://github.com/bytedance/xgplayer/commit/1f3e48b))
* **gitignore:** remove .DS_Store ([83bc3a4](https://github.com/bytedance/xgplayer/commit/83bc3a4))
* **xgplayer/control/[progress.js,makeBullet.js]:** 播放器增加预览和弹幕功能 ([09034dd](https://github.com/bytedance/xgplayer/commit/09034dd)), closes [#11](https://github.com/bytedance/xgplayer/issues/11)


### BREAKING CHANGES

* **xgplayer/control/[progress.js,makeBullet.js]:** 播放器增加预览和弹幕功能
