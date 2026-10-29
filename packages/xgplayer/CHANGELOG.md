# Changelog

## [3.0.27](https://github.com/bytedance/xgplayer/compare/v3.0.26...v3.0.27) (2026-10-28)

### Bug Fixes

- **xgplayer:** clear playback cache during state reset ([921c238](https://github.com/bytedance/xgplayer/commit/921c238a4ac28c2fef9dd913cf95a0f1081027ad))
- **xgplayer:** correct plugin hook handler invocation ([78af75a](https://github.com/bytedance/xgplayer/commit/78af75a5f933eb378b743dbca8fcddbde31b9c4c)), closes [#1934](https://github.com/bytedance/xgplayer/issues/1934)
- **xgplayer:** fix deepcopy deepMerge 潜在的原型链污染问题 ([82d3e29](https://github.com/bytedance/xgplayer/commit/82d3e29525b11c006cdc6622075c292d54b549d2))
- **xgplayer:** Fixed blurry or missing progress-preview borders at fractional display scales. ([5300ca3](https://github.com/bytedance/xgplayer/commit/5300ca36d0e941ac98a4235277038b50488cd36c))
- **xgplayer:** guard missing screen orientation ([52eaa3f](https://github.com/bytedance/xgplayer/commit/52eaa3fc451db1ee77dbb95154544925fad11fa5))

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- 🎸 add xgplayer-cast plugin with AirPlay support ([bd2378c](https://github.com/bytedance/xgplayer/commit/bd2378cc5510f8a92099266f68938bf5c997ce92))

### Bug Fixes

- 🐛 (cast) 修复投屏后，自动播放配置不生效问题 ([c116e35](https://github.com/bytedance/xgplayer/commit/c116e359e064cca9d75eca93caaca5e66536f8fd))
- correct typos and prevent undefined return value ([79c0566](https://github.com/bytedance/xgplayer/commit/79c056605d2e266179ba1d4ce95a1a3448103955))
- pass urls first when assembling sources ([dde18f9](https://github.com/bytedance/xgplayer/commit/dde18f931503ca7ef30e58f9957755f0814af481))
- prevent Rotate plugin from triggering double rotation on touch devices ([68bfb88](https://github.com/bytedance/xgplayer/commit/68bfb88f74e356eb85862f4de1ba6b96fd4124d4)), closes [#1902](https://github.com/bytedance/xgplayer/issues/1902)
- use timestamp debounce instead of UA sniffing for rotate double-fire ([9506004](https://github.com/bytedance/xgplayer/commit/9506004a03a96b54dd21917702aad1eb6b0d3567))
- **xgplayer:** reset progress drag in document pip ([4ebe1a4](https://github.com/bytedance/xgplayer/commit/4ebe1a4c43b6e9076f37763bbb6243a4f3cf96c7))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Features

- 🎸 (xgplayer) download support authentication
- 🎸 (xgplayer) texttrack i18n, fixed #1840
- 🎸 (xgplayer) add runHooks method to enhance hook functionality
- (xgplayer) poster support video native poster attributes

### Bug Fixes

- 🐛 (xgplayer) enhance touch event handling, fixed #1836
- 🐛 (xgplayer) improve URL handling and default definition assignment in player initialization
- 🐛 (xgplayer) add catch when exitScreen
- 🐛 (xgplayer) Sniffer 兼容 HarmonyOS

### Code Refactoring

- 💡 (xgplayer) rm download.js

### Maintenance

- 🤖 (xgplayer) update danmu.js dependency to 1.2.1

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Bug Fixes

- 🐛 (xgplayer) usePluginHooks not use arguments, fixed #1773
- 🐛 (xgplayer) plugin插件增加存储除root外的额外dom的extraEls属性
- 🐛 (xgplayer) 修复ad修饰插件timeIcon的额外dom不能正常显示隐藏的问题
- 🐛 (xgplayer) 修复横屏状态下进入全屏时播放器宽度不对的问题
- 🐛 (xgplayer) null is not an object (evaluating 'this.root.getBoundingClientRect')

### Code Refactoring

- 💡 (xgplayer) add playSessionId for once play process

## [3.0.22](https://github.com/bytedance/xgplayer/compare/v3.0.21...v3.0.22) (2025-05-06)

### Features

- add update function for miniscreen

### Bug Fixes

- 🐛 (ads) always autoplay for LG & Samsung TV
- 🐛 progress bar mouseup event is not fired, due to preview
- 🐛 typo in zh-hk.js
- **xgplayer:** fix percent NaN and fix to currentTime percent

### Code Refactoring

- 💡 (xgplayer) add umd ui plugins exports for ads, eg. PlayIcon、Progress、TimeIcon etc.

## [3.0.21](https://github.com/bytedance/xgplayer/compare/v3.0.20...v3.0.21) (2025-02-24)

### Features

- (xgplayer) support standalone video (XgVideoProxy is deprecated)

### Bug Fixes

- 🐛 (xgplayer) 修复播放器seeked时，播放器未启动播放而弹幕自动播放问题
- player destroy  control plugins memeory leak
- 🐛 (xgplayer) 修复全屏hook，执行报错的问题 close#1579

### Code Refactoring

- 💡 (xgplayer) preProcessUrl API 对外使用

## [3.0.20](https://github.com/bytedance/xgplayer/compare/v3.0.19...v3.0.20) (2024-08-22)

### Bug Fixes

- 🐛 (xgplayer)多个播放器，只显示一个rotate icon
- 🐛 (xgplayer)修复mobile插件部分手机场景功能失效问题修复
- 🐛 (xgplayer) 修复播放器销毁时，ResizeObserver报错的问题

## [3.0.19](https://github.com/bytedance/xgplayer/compare/v3.0.18...v3.0.19) (2024-07-19)

### Bug Fixes

- 🐛 (xgplayer) 修复弹幕插件在无controls时，初始化报错问题
- **xgplayer:** android hls origin video play's startTime
- **xgplayer:** apply mobile plugin's darkness config
- (xgplayer) exitFullscreen without el set

### Maintenance

- (xgplayer) remove duplicate codec item for MP4 support check

## [3.0.18](https://github.com/bytedance/xgplayer/compare/v3.0.17...v3.0.18) (2024-05-21)

### Features

- (xgplayer) 增加preProcessUrlOptions参数
- **xgplayer:** progress 最小宽度限制修改

### Bug Fixes

- 🐛 (xgplayer) 修复弹幕在自定义el元素内容时，文字样式折行的问题
- 🐛 (xgplayer) 修复音量展示和时机数值有差异的问题 #1396
- 🐛 (xgplayer) 修复截图在部分机型失败的问题
- 🐛(xgplayer) 修复pad端列表按钮交互异常问题
- 🐛(xgplayer) 修复pad端进度条拖动异常问题
- 🐛(xgplayer) onTimeupdate中AUTOPLAY_STARTED的触发增加判断为this.state === STATES.NOTALLOW;
- 🐛(xgplayer)  startTime处理放在onLoadedData中,修复ios中在durationchange修改currentTime之后timeupdate不触发问题

## [3.0.17](https://github.com/bytedance/xgplayer/compare/v3.0.16...v3.0.17) (2024-04-28)

### Bug Fixes

- 🐛 (xgplayer) 修复音量展示和实际数值不符的问题

## [3.0.14](https://github.com/bytedance/xgplayer/compare/v3.0.13...v3.0.14) (2024-03-07)

### Features

- **xgplayer:** 🎸 当系统支持屏幕方向锁定时，全屏后自动横屏

## [3.0.13](https://github.com/bytedance/xgplayer/compare/v3.0.12...v3.0.13) (2024-02-20)

### Features

- **xgplayer:** 提供更多语言的国际化文案资源

### Code Refactoring

- **xgplayer:** 支持播放插件控制media source

## [3.0.12](https://github.com/bytedance/xgplayer/compare/v3.0.11...v3.0.12) (2024-01-30)

### Bug Fixes

- **xgplayer:** PIP插件支持文档画中画能力 [Document Picture-in-Picture](https://wicg.github.io/document-picture-in-picture/)

## [3.0.11](https://github.com/bytedance/xgplayer/compare/v3.0.10...v3.0.11) (2023-12-20)

### Features

- **xgplayer:** 带列表的按钮增加高度控制

### Bug Fixes

- **xgplayer:** 修复android端播放hls起播时长设置异常问题
- **xgplayer:** 1. fix progress dot position 2. add mediaSrc attribute when report error
- **xgplayer:** rset progress btn position when playnext
- **xgplayer:** resizePosition在rotate为-1时兼容
- **xgplayer:** 修复 sniffer 在部分 iPad 中判断错误的问题
- **xgplayer:** enableContextmenu配置和文档相反问题修复 close https://github.com/bytedance/xgplayer/issues/1232
- **xgplayer:** 修复seek状态下切换播放源时间不更新问题
- **xgplayer:** progresspreview插件transformTime 不生效问题修复
- **xgplayer:** 累计观看时长计时点从onPlaying开始
- **xgplayer:** miniprogress增加颜色配置响应 close https://github.com/bytedance/xgplayer/issues/1179
- **xgplayer:** 全局多实例快捷键同时生效异常问题修复

## 3.0.11-alpha.0

### Features

- **xgplayer:** dynamicBg插件增加自定义容器渲染, 增加初始渲染间隔
- **xgplayer:** poster增加填充模式

### Bug Fixes

- **xgplayer:** isBlob判断增加类型判断
- **xgplayer:** api类型声明修复 close https://github.com/bytedance/xgplayer/issues/1142
- **xgplayer:** api类型声明修复 close https://github.com/bytedance/xgplayer/issues/1142

## [3.0.10](https://github.com/bytedance/xgplayer/compare/v3.0.9...v3.0.10) (2023-11-15)

### Features

- **xgplayer:** player.focus API增加控制了栏锁定模式
- **xgplayer:** 增加TimeSegmentsControls插件, 支持分段时长合并播放能力；增加offsetCurrentTime\offsetDuration计算偏移时长和偏移播放进度
- **xgplayer:** 增加preProcessUrl配置用于url的前置处理

### Bug Fixes

- **xgplayer:** 播放器销毁mobile插件事件解绑不全问题修复
- **xgplayer:** 初始videoPo.rotate修改为-1
- **xgplayer:** 播放器销毁mobile插件事件解绑不全问题修复;初始videoPo.rotate修改为-1;
- **xgplayer:** 修复timeupdate中获取cumulateTime计算异常问题
- **xgplayer:** texttrack修复不能更新字幕
- **xgplayer:** 🐛 修复移动浏览器下muted未显示设置在dom内，会导致非静音切换频地
- **xgplayer:** 🐛 修复全屏和旋转插件对于镜像插件的影响
- **xgplayer:** 修复进度条预览首次移动进入显示异常问题

## [3.0.9](https://github.com/bytedance/xgplayer/compare/v3.0.8...v3.0.9) (2023-08-29)

### Features

- **xgplayer:** player.focus API增加控制了栏锁定模式
- **xgplayer:** 增加LOADED_METADATA事件的触发
- **xgplayer:** 键盘快捷键添加长按限流优化, 200ms触发一次; rigth键长按添加2倍速
- **xgplayer:** 进度条打点提示层的显示增加播放器边界限制

### Bug Fixes

- **xgplayer:** 修复sourceList播放类型下safari第一个source节点不触发error导致整体error不触发问题
- **xgplayer:** 没有position或者rotate角度设置的时候不做video的style设置
- current time shifting when updating

## [3.0.8](https://github.com/bytedance/xgplayer/compare/v3.0.7...v3.0.8) (2023-08-15)

### Bug Fixes

- **xgplayer:** download链接获取兼容blob
- 🐛 (xgplayer) 修复roate旋转容器时，一直旋转的问题 fixed #1045

## [3.0.7](https://github.com/bytedance/xgplayer/compare/v3.0.6...v3.0.7) (2023-07-27)

### Features

- **xgplayer:** Sniffer中添加isMSESupport API, swicthUrl切换之后暂停问题修复
- **xgplayer:** 旋转全屏适配移动端有控制栏的的场景

### Bug Fixes

- **xgplayer:** start插件修复play/pause切换过快导致的动效异常问题
- **xgplayer:** 修复列表按钮在ipad端列表过滚动操作不生效问题
- **xgplayer:** 修复position和rotate异常问题，增加videoRotateDeg作为video旋转角度

## [3.0.6](https://github.com/bytedance/xgplayer/compare/v3.0.5...v3.0.6) (2023-07-21)

### Features

- **xgplayer:** 增加下载按钮点击的hook;
- **xgplayer:** ios端touche事件删除阻止默认行为;
- **xgplayer:** seek 和 replay回调监听使用seeked代替canplay, 兼容safari下seek的时候canplay不触发问题
- **xgplayer:** 增加SOURCE_SUCCESS和SOURCE_ERROR事件触发
- **xgplayer:** hover时间显示支持html代码插入

### Bug Fixes

- **xgplayer:** 修复初始化之后注册组件会挂载在video之前问题
- 🐛 (player) 修复closeVideoClick=true时，双击事件无效问题
- **xgplayer:** switchUrl API promise在切换src为空的时候返回空的问题

## [3.0.5](https://github.com/bytedance/xgplayer/compare/v3.0.4...v3.0.5) (2023-07-05)

### Features

- **xgplayer:** 控制栏预览删除对time节点的定位,relative定位,只对容器节点
- **xgpayer:** 预览打点文案的时候添加底部边距作位移
- **xgplayer:** hover时间显示支持html代码插入

### Bug Fixes

- 🐛 (xgplayer) 防止被全局基础样式影响导致icon下移不显示
- 🐛 (player) 修复closeVideoClick=true时，双击事件无效问题 (fixed #970)
- 修复倍速切换插件一直显示滚动条 bug

## [3.0.4](https://github.com/bytedance/xgplayer/compare/v3.0.3...v3.0.4) (2023-06-02)

### Features

- **xgplayr:** 默认语言取英文

### Bug Fixes

- **xgplayer:** 修复loadeddata之后isSeeking状态异常问题

## [3.0.3](https://github.com/bytedance/xgplayer/compare/v2.3.5...v3.0.3) (2023-06-02)

### Features

- **xgplayer:** 列表按钮的列表增加左侧弹出能力
- **xgplayer:** 带列表的按钮增加点击呼出和隐藏按钮的功能
- **xgplayer:** mobile组件增加hooks

### Bug Fixes

- **xgplayer:** 修复起播之前seek ios上会事件触发异常问题
- **xgplayer:** play接口返回promise
- **xgplayer:** time组件flex状态下无法隐藏问题修复
- **xgplayer:** 画中画 - 执行switchPIP报错(e.stopPropagation not a function)

## 3.0.2

### Features

- **xgplayer:** 更新依赖xgplayer-subtitles@1.1.1
- **xgplayer:** 错误码规范,媒体错误归类为51xx
- **xgplayer:** start插件和play插件针对reset的场景做兼容

### Bug Fixes

- **xgplayer:** 修复字幕id为数字的时候0的判断问题
- **xgplayer:** 修复字幕id或者language为空的时候比对异常问题
- **xgplayer:** 增加video的set,向下兼容
- **xgplayer:** playNext内部重启流程修改为start
- **xgplayer:** 修复起播之前click进度条,duration为0导致seek异常问题

## 3.0.0-next.54

### Features

- **xgplayer:** 修复mobile插件disableGesture或者gestureX的时候进度条操作不生效问题
- **xgplayer:** switchUrl参数类型备注
- **xgplayer:** texttrack插件scss文件直接加入外挂字幕样式
- **xgplayer:** 音量按钮增加拖拽状态的识别; 进度条增加分段预览hover机制; 进度条预览增加扩展dom
  \边界值处理\预览图宽高配置\预览图兼容durationchange

## 3.0.0-next.53

### Features

- **xgplayer:** 修复loadstart之后error提示不隐藏问题; 修复.xg-tips获取异常报错问题
- **xgplayer:** add fps detect plugin

## 3.0.0-next.52

### Code Refactoring

- **xgplayer:** 修改switchUrl第二个参数，支持options形式并方便再扩展
- **xgplayer:** IDefinition 类型增加 bandwidth

## 3.0.0-next.51

### Features

- **xgplayer:** mediaPlay中调用start逻辑添加hasStart控制

## 3.0.0-next.50

### Features

- **xgplayer:** onCanplay中移除STATE_CLASS.ENTER
- **xgplayer:** optionsIcon中show API的定义增加长度为2的限制

## 3.0.0-next.47

### Features

- **xgplayer:** definition组件增加按钮显示逻辑

## 3.0.0-next.46

### Features

- **xgplayer:** 修改video的tabIndex属性默认为0
- **xgplayer:** dynamicBg插件修正单实例切换视频和videoInit:false的场景start异常问
  题
- **xgplayer:** plugin.isSupported增加mediaType和codecType入参

## 3.0.0-next.45

### Features

- **xgplayer:** 更新字幕插件的版本信息1.0.24
- **xgplayer:** TextTrack增加多个组件共享一个subTitles实例，并进行状态同步
- **xgplayer:** playbackrate组件增加未在list中的倍速值的默认展示set src增加url为空的处理;startInit增加url为空的处理
- **xgplayer:** controls的root支持入参
- **xgplayer:** 更新video对象为media, videoConfig => mediaConfig, videoPlay => mediaPlay, videoPause => mediaPause

### Bug Fixes

- **xgplayer:** 修复new Event在IE下异常问题

## 3.0.0-next.44

### Features

- **xgplayer:** enableContextmenu配置项改为true,删除pc组件的对应配置项; fullscreen组件调用api之后做catch
- **xgplayer:** set src增加url为空的处理;startInit增加url为空的处理

### Bug Fixes

- **xgplayer:** 解决videoPlay调用到start的时候死循环风险

## 3.0.0-next.43

### Features

- **xgplayer:** progressPreview增加durationchange的时候更新; pc组件单击和双击绑定在root上

## 3.0.0-next.42

### Features

- **xgplayer:** 内置插件父类增加once解绑处理
- **xgplayer:** sourceList方式增加中间件
- **xgplayer:** 字幕插件增加按钮配置
- **xgplayer:** startInit 中url判断增加空值判断

## 3.0.0-next.41

### Features

- **xgplayer:** set playBackrate的同时设置video.defaultplaybackrate,并避免ratechange多次触发
- **xgplayer:** feat(xgplayer): logger组件增加loadstart是否已经发送的判断; startInit增加空值判断
- **xgplayer:** 修改Ready事件的触发时机
- **xgplayer:** logger 首帧loadeddata发送的时机修改
- **xgplayer:** isError增加赋值;start插件增加error下隐藏

### Code Refactoring

- 💡 (xgplayer) progressPreview增加hook，提供外部修改进度条TIP时间格式能力

## 3.0.0-next.40

### Bug Fixes

- **xgplayer:** buffered获取异常问题兼容

## 3.0.0-next.39

### Features

- **xgplayer:** feat(xgplayer): logger插件增加loadstart和loadeddata两种事件类型,一次播放过程中只出发一次事件
- **xgplayer:** player增加pluginManager.init调用,load调用移动到proxy

### Bug Fixes

- **xgplayer:** sniffer增加bom环境判断

## 3.0.0-next.38

### Features

- **xgplayer:** 修改IDefinition类型定义

### Bug Fixes

- 🐛 (xgplayer) 修复xgplayer curDefinition值和声明类型不符的问题

## 3.0.0-next.36

### Bug Fixes

- 升级ts-morph，解决在jsdoc内书写Index Signatures无法编译出类型的问题

## 3.0.0-next.33

### Features

- **xgplayer:** 新增Player.isHevcSupported和Player.probeConfigSupported验证H265支持校验的api
- **xgplayer:** playerId使用generateSessionId生成保证唯一, 并在player.root上添加该属性player-id
- **xgplayer:** 修改getLang获取方式; 删除无用配置

### Bug Fixes

- **xgplayer:** 解决pc插件添加事件的时候无法获取video报错的问题
- **xgplayer:** logger插件修复autoplay_start触发在loadstart之前导致首帧触发异常问题；删除emptied时间重置首帧信息逻辑，解决重新load重复触发首帧问题
- **xgplayer:** resizeObserver解决多实例不生效问题,并增加节流处理
- **xgplayer:** 修复cssFullscreen 提示语言关键字异常问题
- **xgplayer:** 修复dynamicBg在loadeddat渲染异常问题, 并增加仅仅使用海报图的渲染模式

## 3.0.0-next.32

### Features

- **xgplayer:** i18n extend函数增加语言不存在的情况下直接启用新语言的能力
- **xgplayer:** 提供isPlaying的set

### Maintenance

- 修复打包之后class转译异常问题

## 3.0.0-next.31

### Maintenance

- pc插件事件绑定移动到player.root; track插件修复关闭字幕的时候数据显示
- eslint 规范代码

## 3.0.0-next.30

### Features

- **xgplayer:** 新增test speed plugin

### Bug Fixes

- **xgplayer:** 修复this.video.src 更新之前加排重判断
- **xgplayer:** 修复switchURL错误状态下无法起播问题; 修复closeVideoDblclick:true的时候, pc插件不响应双击问题

## 3.0.0-next.29

### Features

- **xgplayer:** definition插件修复切换的时候url异常问题
- **xgplayer:** 控制栏icon支持鼠标事件icon_mouseenter和icon_mouseleave事件下发
- **xgplayer:** 动态渲染插件使用requestAnimationFrame优化
- **xgplayer:** 增加safari下无法自动起播之后，设置静音会自动起播的事件兼容
- **xgplayer:** 增加hook的remove相关api
- **xgplayer:** player增加reset方法，支持播放实例和配置的重置
- **xgplayer:** dynamicBg渲染支持xg-video;
- **xgplayer:** videoFrameInfo增加兼容性判断;
- **xgplayer:** closeFocusVideoFocus默认配置改为true
- **xgplayer:** thumbnail增加setConfig; progressPreview增加鼠标移出响应,增加disable和enable的api; progressPreview解决单独调用registerThumbnail异常问题

## 3.0.0-next.24

### Features

- **xgplayer:** svg 由base64恢复成 DOM 元素

## 3.0.0-next.23

### Features

- **xgplayer:** onplay的时候当前状态是ERROR则重置为RUNNING

## 3.0.0-alpha.98

### Features

- **xgplayer:** event-emitter依赖修改为eventemitter3
- **xgplayer:** player.focus默认参数从playerConfig上获取
- **xgplayer:** loading状态去除增加readyState判断, onplaying的时候移除loading状态,i18n.use参数类型修正
- **xgplayer:** 清晰度切换和更新逻辑独立出来, 增加definitionList存取器和changeDefinition 切换清晰度api
- **xgplayer:** 全屏api兼容初始dom为全屏的处理兼容

### Bug Fixes

- **xgplayer:** 修复默认音量设置时机过晚导致的设置失效问题
- **xgplayer:** fix(xgplayer): i18n.use参数类型修正;onplaying的时候移除loading状态
- **xgplayer:** replay api中canplay回调中使用videoPlay

## 3.0.0-alpha.96

### Features

- **xgplayer:** 增加positionAPI

### Bug Fixes

- **xgplayer:** checkBuffer 增加直播判断
- **xgplayer:** fix(xgplayer): i18n.use 参数类型修正;onplaying的时候移除loading状态
- **xgplayer:** dynamicBg的组装增加ipad判断
- **xgplayer:** errorType和errorCoce修改; inner-fullscreen增加controls控制;danmujs对
- **xgplayer:** 修复volume插件点击静音误差问题;  判断player.start是否返回promise
- **xgplayer:** update danmu.js@0.5.4

### Code Refactoring

- **xgplayer:** preset 增加直播相关插件处理; position修复异常
- **xgplayer:** 新增resetState重置状态
- **xgplayer:** 修改css 解决enter的时候鼠标事件无法生效的问题

## 3.0.0-alpha.95

### Features

- **xgplayer:** Do not delete props and api when destroy player instance or plugin
- **xgplayer:** add player.root resize ResizeObserver re #17
- **xgplayer:** add showIcon and hideIcon in plugin danmu

### Bug Fixes

- **xgplayer:** the compatibility issue in the dynamicBg plugin
- **xgplayer:** shortcut key delete e.cancelbubble
- **xgplayer:** fix plugin apis call exception after destroy
- **xgplayer:** fix config.closeDelayBlur failure problem
- **xgplayer:** update danmu.js@0.5.4

### Maintenance

- **xgplayer:** add typedef in I18n

## 3.0.0-alpha.94

### Features

- (xgplayer) 重构Error类型
- (xgplayer) 新增focus和blur两个api用户控制播放器的焦点状态
- **xgplayer:** Plugin和BasePlugin增加初始化参类型定义; plugin中registerLangauageTexts修改为registerLanguageTexts
- (xgplayer)  删除defaultpreset中texttrack插件的集成; 将danmu.js和xgplayer-subtitles依赖移动到peerDependencies
- (xgplayer) pc插件增加videoClick和videoDbClick两个hook

### Bug Fixes

- (xgplayer) types/index.d.ts 命令行生成
- (xgplayer) 移动端禁用DynamicBg插件
- (xgplayer) autoplay增加android6.0以下测试 android 6.0以下不允许自动播放设置

## 3.0.0-alpha.93

### Features

- (xgplayer) 音量插件音量为0取消静音的时候设置默认音量
- (xgplayer) 修改一些ts相关声明
- **xgplayer:** 更新语言注册逻辑, 增加语言注册之前的扩展数据缓存
- (xgplayer) unRegister 增加插件名小写转换; dynamicBg start增加stop之前的动画逻辑
- (xgplayer): 增加內置插件用戶行为数据触发事件USER_ACTION, plugin封装统一的触发API-> emitUserAction

### Bug Fixes

- (xgplayer) 修复retry直播流程异常问题; player.useHooks增加return值

## 3.0.0-alpha.92

### Features

- (xgplayer) 增加zoom配置参数，用于兼容父节点css设置了zoom导致计算异常问题 https://bugs.chromium.org/p/chromium/issues/detail?id=429140#c8
- (xgplayer) 进入全屏和pc端鼠标hover的时候添加焦点确保快捷键生效
- (xgplayer) 增加播放质量数据采集logger插件
- (xgplayer) 针对videoSource列表播放资源方式添加error监听
- (xgplayer) 增加快捷键事件emit,事件名为SHORTCUT

### Bug Fixes

- (xgplayer) fullscreen插件中orientationchange事件销毁移除
- (xgplayer) start和loading增加inner层，解决定位和动效都使用transform在ios上异常问题

### Maintenance

- (xgplayer) 修正类型注释错误导致d.ts导出异常问题

## 3.0.0-alpha.91

### Features

- (xgplayer) 修改hook装饰器使用方式，在player和BasePlugin中显示声明hook相关API，便于d.ts文件生成

### Maintenance

- (xgplayer) 删除src独立定义的d.ts文件，只保留proxy.d.ts
- (xgplayer) 所有文件属性、api增加jsdoc，用于自动生成d.ts声明文件

## 3.0.0-alpha.90

### Features

- (xgplayer) 增加buffered2接口获取校准之后的缓存空间
- (xgplayer) fullscreen插件修正接口名称,hook名称fullsreen_change更正为fullscreen_change
- (xgplayer) ts声明增加SimplePlayer, 导出SimplePlayer; preset增加语言包能力，拆分仅有英文包的preset;
- (xgplayer) player API play/pause/retry/replay等添加hook
- (xgplayer) 支持自定义videoProxy构造造player.video对象
- (xgplayer) hook增加参数回传，回调的第一个参数为当前对象（player或者对应插件实例）

### Bug Fixes

- (xgplayer) 修复rotateFullScreen无法在指定target上触发的问题; canplay设置defaultPlaybackRate解决有倍速插件的情况下设置的video倍速失效问题

### Maintenance

- babel.config.js替代.babelrc,解决lib目录下打包异常问题; version
  生成改成静态字符串替换方式

## 3.0.0-alpha.89

### Features

- (xgplayer) dynamicBg在safari下使用mse播放场景只渲染首帧图
- (xgplayer) 弹幕新增resize, 并在全屏等屏幕大小触发的时候resize
- (xgplayer) 弹幕插件中danmu.js更新到0.4.0; 弹幕插件新增配置项
- (xgplayer) Keyboard 增加body禁用配置项

### Bug Fixes

- (xgplayer) 修复进度条点击两个触发seek问题; 修复keybored取值异常问题

### Maintenance

- 添加eslint规范，去除array-callback-return规则限制

## 3.0.0-alpha.88

### Features

- **xgplayer:** 新增内置插件dynamicBg用于实时背景预览
- (xgplayer): css全屏和全屏支持指定dom进行，并对行间样式移除/添加增加白名单
- 支持音量条显示当前音量数值
- (xgplayer) pip插件中requestPIP增加video状态判断，修改pip中play的调用为videoPlay 避免多次调用到playHooks
- (xgplayer) 弹幕增加live参数读取和初始化扩展参数
- (xgplayer) controls增加进度条位于底部的模式;
- (xgplayer) playNext插件添加hook;
- (xgplayer) 内置插件内部触发的事件提取到总的事件枚举列表中, 小窗状态下mini进度条常驻
- (xgplayer) 规范icon颜色设置,所有内置svg增加fill属性

### Bug Fixes

- **xgplayer:** 修复closeControlsBlur为true的时候 控制栏没有消失问题
- 修复ipad下自动播放不生效，导致enter组件一直不消失问题
- 修复pc插件和danmu插件destroy异常问题，更新弹幕插件版本为0.3.5
- **xgplayer:** 修复预览插件插入到video之前之后 start判断异常问题
- **xgplayer:** 修复播放器快捷键可见性校验异常问题并增加是否进行可见性校验的配置checkVisible

## 3.0.0-alpha.29

### Maintenance

- No changes recorded.

## 3.0.0-alpha.28

### Maintenance

- 修复倍速设置问题

## 3.0.0-alpha.27

### Maintenance

- 增加创建browser目录

## 3.0.0-alpha.26

### Maintenance

- 修复safari下的autoplay触发问题

## 3.0.0-alpha.25

### Maintenance

- 解决倍速切换组件的多语言问题

## 3.0.0-alpha.24

### Maintenance

- 解决ios下video seeking事件回调时机和android不同导致的seek回调问题

## 3.0.0-alpha.23

### Maintenance

- 修复手势快进时间超出范围问题
- 解决弹幕插件中按钮异常
- 修复controls在非flex模式下time组件无法显示问题
- 更新弹幕danmu.js为0.2.15

## 3.0.0-alpha.20

### Maintenance

- 更新弹幕danmu.js为0.2.16
- 解决弹幕插件中按钮异常

## 3.0.0-alpha.18

### Maintenance

- 解决弹幕组件中的开关按钮异常问题

## 3.0.0-alpha.17

### Maintenance

- 解决进度条滑动带动页面滚动问题; 解决移动端seek提示信息重播显示异常问题

## 3.0.0-alpha.15

### Maintenance

- start插件增加mode配置参数，用户控制按钮控制状态

## 3.0.0-alpha.14

### Maintenance

- 修复ios下无法自动播放没有触发canplay的异常情况
- build命令增加文件夹移除代码，增加dev下 rimraf依赖
