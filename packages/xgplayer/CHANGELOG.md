# 版本更新记录
## 3.0.18
>* fix: 🐛 (xgplayer) 修复截图在部分机型失败的问题
>* feat(xgplayer): 增加preProcessUrlOptions参数
## 3.0.17
>* fix: 🐛 (xgplayer) 修复音量展示和实际数值不符的问题
## 3.0.14
>* feat(xgplayer): 🎸 当系统支持屏幕方向锁定时，全屏后自动横屏
## 3.0.13
>* feat(xgplayer): 提供更多语言的国际化文案资源
>* refactor(xgplayer): 支持播放插件控制media source
## 3.0.12
>* fix(xgplayer): PIP插件支持文档画中画能力 [Document Picture-in-Picture](https://wicg.github.io/document-picture-in-picture/)
## 3.0.11
>* fix(xgplayer): 修复android端播放hls起播时长设置异常问题
>* fix(xgplayer): 1. fix progress dot position 2. add mediaSrc attribute when report error
>* fix(xgplayer): rset progress btn position when playnext
>* fix(xgplayer): resizePosition在rotate为-1时兼容
>* fix(xgplayer): 修复 sniffer 在部分 iPad 中判断错误的问题
>* fix(xgplayer): enableContextmenu配置和文档相反问题修复 close https://github.com/bytedance/xgplayer/issues/1232
>* fix(xgplayer): 修复seek状态下切换播放源时间不更新问题
>* feat(xgplayer): 带列表的按钮增加高度控制
>* fix(xgplayer): progresspreview插件transformTime 不生效问题修复
>* fix(xgplayer): 累计观看时长计时点从onPlaying开始
>* fix(xgplayer): miniprogress增加颜色配置响应 close https://github.com/bytedance/xgplayer/issues/1179
>* fix(xgplayer): 全局多实例快捷键同时生效异常问题修复
## 3.0.11-alpha.0
>* fix(xgplayer): isBlob判断增加类型判断
>* feat(xgplayer): dynamicBg插件增加自定义容器渲染, 增加初始渲染间隔
>* fix(xgplayer): api类型声明修复 close https://github.com/bytedance/xgplayer/issues/1142
>* fix(xgplayer): api类型声明修复 close https://github.com/bytedance/xgplayer/issues/1142
>* feat(xgplayer): poster增加填充模式
## 3.0.10
>* fix(xgplayer): 播放器销毁mobile插件事件解绑不全问题修复
>* fix(xgplayer): 初始videoPo.rotate修改为-1
>* feat(xgplayer): player.focus API增加控制了栏锁定模式
>* fix(xgplayer): 播放器销毁mobile插件事件解绑不全问题修复;初始videoPo.rotate修改为-1;
>* feat(xgplayer): 增加TimeSegmentsControls插件, 支持分段时长合并播放能力；增加offsetCurrentTime\offsetDuration计算偏移时长和偏移播放进度
>* fix(xgplayer): 修复timeupdate中获取cumulateTime计算异常问题
>* fix(xgplayer): texttrack修复不能更新字幕
>* fix(xgplayer): 🐛 修复移动浏览器下muted未显示设置在dom内，会导致非静音切换频地
>* fix(xgplayer): 🐛 修复全屏和旋转插件对于镜像插件的影响
>* fix(xgplayer): 修复进度条预览首次移动进入显示异常问题
>* feat(xgplayer): 增加preProcessUrl配置用于url的前置处理
## 3.0.9
>* fix(xgplayer):修复sourceList播放类型下safari第一个source节点不触发error导致整体error不触发问题
>* feat(xgplayer): player.focus API增加控制了栏锁定模式
>* feat(xgplayer): 增加LOADED_METADATA事件的触发
>* feat(xgplayer): 键盘快捷键添加长按限流优化, 200ms触发一次; rigth键长按添加2倍速
>* fix(xgplayer): 没有position或者rotate角度设置的时候不做video的style设置
>* feat(xgplayer): 进度条打点提示层的显示增加播放器边界限制
>* fix: current time shifting when updating
## 3.0.8
>* fix(xgplayer): download链接获取兼容blob
>* fix: 🐛 (xgplayer) 修复roate旋转容器时，一直旋转的问题 fixed #1045
## 3.0.7
>* fix(xgplayer): start插件修复play/pause切换过快导致的动效异常问题
>* fix(xgplayer): 修复列表按钮在ipad端列表过滚动操作不生效问题
>* feat(xgplayer): Sniffer中添加isMSESupport API, swicthUrl切换之后暂停问题修复
>* feat(xgplayer): 旋转全屏适配移动端有控制栏的的场景
>* fix(xgplayer): 修复position和rotate异常问题，增加videoRotateDeg作为video旋转角度
## 3.0.6
>* feat(xgplayer): 增加下载按钮点击的hook;
>* feat(xgplayer): ios端touche事件删除阻止默认行为;
>* feat(xgplayer): seek 和 replay回调监听使用seeked代替canplay, 兼容safari下seek的时候canplay不触发问题
>* feat(xgplayer): 增加SOURCE_SUCCESS和SOURCE_ERROR事件触发
>* fix(xgplayer): 修复初始化之后注册组件会挂载在video之前问题
>* feat(xgplayer): hover时间显示支持html代码插入
>* fix: 🐛 (player) 修复closeVideoClick=true时，双击事件无效问题
>* fix(xgplayer): switchUrl API promise在切换src为空的时候返回空的问题
## 3.0.5
>* fix: 🐛 (xgplayer) 防止被全局基础样式影响导致icon下移不显示
>* feat(xgplayer): 控制栏预览删除对time节点的定位,relative定位,只对容器节点
>* feat(xgpayer): 预览打点文案的时候添加底部边距作位移
>* fix: 🐛 (player) 修复closeVideoClick=true时，双击事件无效问题 (fixed #970)
>* fix: 修复倍速切换插件一直显示滚动条 bug
>* feat(xgplayer): hover时间显示支持html代码插入
## 3.0.4
>* feat(xgplayr): 默认语言取英文
>* fix(xgplayer): 修复loadeddata之后isSeeking状态异常问题
## 3.0.3
>* fix(xgplayer): 修复起播之前seek ios上会事件触发异常问题
>* fix(xgplayer): play接口返回promise
>* feat(xgplayer): 列表按钮的列表增加左侧弹出能力
>* feat(xgplayer): 带列表的按钮增加点击呼出和隐藏按钮的功能
>* feat(xgplayer): mobile组件增加hooks
>* fix(xgplayer): time组件flex状态下无法隐藏问题修复
>* fix(xgplayer): 画中画 - 执行switchPIP报错(e.stopPropagation not a function)
## 3.0.2
>* feat(xgplayer): 更新依赖xgplayer-subtitles@1.1.1
>* fix(xgplayer): 修复字幕id为数字的时候0的判断问题
>* fix(xgplayer): 修复字幕id或者language为空的时候比对异常问题
>* feat(xgplayer): 错误码规范,媒体错误归类为51xx
>* fix(xgplayer): 增加video的set,向下兼容
>* fix(xgplayer): playNext内部重启流程修改为start
>* feat(xgplayer): start插件和play插件针对reset的场景做兼容
>* fix(xgplayer): 修复起播之前click进度条,duration为0导致seek异常问题
## 3.0.0-next.54
>* feat(xgplayer); 修复mobile插件disableGesture或者gestureX的时候进度条操作不生效问题
>* feat(xgplayer): switchUrl参数类型备注
>* feat(xgplayer): texttrack插件scss文件直接加入外挂字幕样式
>* feat(xgplayer):音量按钮增加拖拽状态的识别; 进度条增加分段预览hover机制; 进度条预览增加扩展dom
\边界值处理\预览图宽高配置\预览图兼容durationchange
## 3.0.0-next.53
>* feat(xgplayer): 修复loadstart之后error提示不隐藏问题; 修复.xg-tips获取异常报错问题
>* feat(xgplayer): add fps detect plugin
## 3.0.0-next.52
>* refactor(xgplayer): 修改switchUrl第二个参数，支持options形式并方便再扩展
>* refactor(xgplayer): IDefinition 类型增加 bandwidth
## 3.0.0-next.51
>* feat(xgplayer): mediaPlay中调用start逻辑添加hasStart控制
## 3.0.0-next.50
>* feat(xgplayer): onCanplay中移除STATE_CLASS.ENTER
>* feat(xgplayer): optionsIcon中show API的定义增加长度为2的限制
## 3.0.0-next.47
>* feat(xgplayer): definition组件增加按钮显示逻辑
## 3.0.0-next.46
>* feat(xgplayer): 修改video的tabIndex属性默认为0
>* feat(xgplayer): dynamicBg插件修正单实例切换视频和videoInit:false的场景start异常问
题
>* feat(xgplayer): plugin.isSupported增加mediaType和codecType入参
## 3.0.0-next.45
>* feat(xgplayer): 更新字幕插件的版本信息1.0.24
>* feat(xgplayer): TextTrack增加多个组件共享一个subTitles实例，并进行状态同步
>* feat(xgplayer): playbackrate组件增加未在list中的倍速值的默认展示set src增加url为空的处理;startInit增加url为空的处理
>* feat(xgplayer): controls的root支持入参
>* fix(xgplayer): 修复new Event在IE下异常问题
>* feat(xgplayer): 更新video对象为media, videoConfig => mediaConfig, videoPlay => mediaPlay, videoPause => mediaPause
## 3.0.0-next.44
>* feat(xgplayer): enableContextmenu配置项改为true,删除pc组件的对应配置项; fullscreen组件调用api之后做catch
>* fix(xgplayer): 解决videoPlay调用到start的时候死循环风险
>* feat(xgplayer): set src增加url为空的处理;startInit增加url为空的处理
## 3.0.0-next.43
>* feat(xgplayer): progressPreview增加durationchange的时候更新; pc组件单击和双击绑定在root上
## 3.0.0-next.42
>* feat(xgplayer): 内置插件父类增加once解绑处理
>* feat(xgplayer): sourceList方式增加中间件
>* feat(xgplayer): 字幕插件增加按钮配置
>* feat(xgplayer): startInit 中url判断增加空值判断
## 3.0.0-next.41
>* feat(xgplayer): set playBackrate的同时设置video.defaultplaybackrate,并避免ratechange多次触发
>* refactor: 💡 (xgplayer) progressPreview增加hook，提供外部修改进度条TIP时间格式能力
>* feat(xgplayer): feat(xgplayer): logger组件增加loadstart是否已经发送的判断; startInit增加空值判断
>* feat(xgplayer): 修改Ready事件的触发时机
>* feat(xgplayer):logger 首帧loadeddata发送的时机修改
>* feat(xgplayer): isError增加赋值;start插件增加error下隐藏
## 3.0.0-next.40
>* fix(xgplayer): buffered获取异常问题兼容
## 3.0.0-next.39
>* fix(xgplayer): sniffer增加bom环境判断
>* feat(xgplayer): feat(xgplayer): logger插件增加loadstart和loadeddata两种事件类型,一次播放过程中只出发一次事件
>* feat(xgplayer): player增加pluginManager.init调用,load调用移动到proxy
## 3.0.0-next.38
>* fix: 🐛 (xgplayer) 修复xgplayer curDefinition值和声明类型不符的问题
>* feat(xgplayer): 修改IDefinition类型定义
## 3.0.0-next.36
>* fix: 升级ts-morph，解决在jsdoc内书写Index Signatures无法编译出类型的问题
## 3.0.0-next.32
>* feat(xgplayer): i18n extend函数增加语言不存在的情况下直接启用新语言的能力
>* feat(xgplayer): 提供isPlaying的set
## 3.0.0-next.33
>* feat(xgplayer): 新增Player.isHevcSupported和Player.probeConfigSupported验证H265支持校验的api
>* fix(xgplayer): 解决pc插件添加事件的时候无法获取video报错的问题
>* fix(xgplayer): logger插件修复autoplay_start触发在loadstart之前导致首帧触发异常问题；删除emptied时间重置首帧信息逻辑，解决重新load重复触发首帧问题
>* feat(xgplayer):playerId使用generateSessionId生成保证唯一, 并在player.root上添加该属性player-id
>* fix(xgplayer): resizeObserver解决多实例不生效问题,并增加节流处理
>* fix(xgplayer): 修复cssFullscreen 提示语言关键字异常问题
>* fix(xgplayer): 修复dynamicBg在loadeddat渲染异常问题, 并增加仅仅使用海报图的渲染模式
>* feat(xgplayer): 修改getLang获取方式; 删除无用配置

## 3.0.0-next.32
>* 修复打包之后class转译异常问题

## 3.0.0-next.31
>* pc插件事件绑定移动到player.root; track插件修复关闭字幕的时候数据显示
>* eslint 规范代码

## 3.0.0-next.30
>* fix(xgplayer): 修复this.video.src 更新之前加排重判断
>* fix(xgplayer): 修复switchURL错误状态下无法起播问题; 修复closeVideoDblclick:true的时候, pc插件不响应双击问题
>* feat(xgplayer): 新增test speed plugin
## 3.0.0-next.29
>* feat(xgplayer): definition插件修复切换的时候url异常问题
>* feat(xgplayer): 控制栏icon支持鼠标事件icon_mouseenter和icon_mouseleave事件下发
>* feat(xgplayer): 动态渲染插件使用requestAnimationFrame优化
>* feat(xgplayer): 增加safari下无法自动起播之后，设置静音会自动起播的事件兼容
>* feat(xgplayer): 增加hook的remove相关api
>* feat(xgplayer): player增加reset方法，支持播放实例和配置的重置
>* feat(xgplayer): dynamicBg渲染支持xg-video;
>* feat(xgplayer): videoFrameInfo增加兼容性判断;
>* feat(xgplayer): closeFocusVideoFocus默认配置改为true
>* feat(xgplayer): thumbnail增加setConfig; progressPreview增加鼠标移出响应,增加disable和enable的api; progressPreview解决单独调用registerThumbnail异常问题

## 3.0.0-next.24
>* feat(xgplayer): svg 由base64恢复成 DOM 元素
## 3.0.0-next.23
>* feat(xgplayer): onplay的时候当前状态是ERROR则重置为RUNNING
## 3.0.0-alpha.98
>* feat(xgplayer): event-emitter依赖修改为eventemitter3
>* feat(xgplayer): player.focus默认参数从playerConfig上获取
>* feat(xgplayer): loading状态去除增加readyState判断, onplaying的时候移除loading状态,i18n.use参数类型修正
>* feat(xgplayer): 清晰度切换和更新逻辑独立出来, 增加definitionList存取器和changeDefinition 切换清晰度api
>* fix(xgplayer): 修复默认音量设置时机过晚导致的设置失效问题
>* fix(xgplayer): fix(xgplayer): i18n.use参数类型修正;onplaying的时候移除loading状态
>* feat(xgplayer): 全屏api兼容初始dom为全屏的处理兼容
>* fix(xgplayer): replay api中canplay回调中使用videoPlay
## 3.0.0-alpha.96
>* fix(xgplayer): checkBuffer 增加直播判断
>* fix(xgplayer): fix(xgplayer): i18n.use 参数类型修正;onplaying的时候移除loading状态
>* refactor(xgplayer): preset 增加直播相关插件处理; position修复异常
>* fix(xgplayer): dynamicBg的组装增加ipad判断
>* refactor(xgplayer): 新增resetState重置状态
>* fix(xgplayer): errorType和errorCoce修改; inner-fullscreen增加controls控制;danmujs对
>* refactor(xgplayer): 修改css 解决enter的时候鼠标事件无法生效的问题
>* fix(xgplayer): 修复volume插件点击静音误差问题;  判断player.start是否返回promise
>* fix(xgplayer): update danmu.js@0.5.4
>* feat(xgplayer): 增加positionAPI
## 3.0.0-alpha.95
>* feat(xgplayer): Do not delete props and api when destroy player instance or plugin 
>* fix(xgplayer): the compatibility issue in the dynamicBg plugin
>* fix(xgplayer): shortcut key delete e.cancelbubble
>* fix(xgplayer): fix plugin apis call exception after destroy
>* fix(xgplayer): fix config.closeDelayBlur failure problem
>* feat(xgplayer): add player.root resize ResizeObserver re #17 
>* feat(xgplayer): add showIcon and hideIcon in plugin danmu
>* chore(xgplayer): add typedef in I18n
>* fix(xgplayer): update danmu.js@0.5.4

## 3.0.0-alpha.94
>* feat: (xgplayer) 重构Error类型
>* fix:(xgplayer) types/index.d.ts 命令行生成
>* feat:(xgplayer) 新增focus和blur两个api用户控制播放器的焦点状态
>* feat(xgplayer) Plugin和BasePlugin增加初始化参类型定义; plugin中registerLangauageTexts修改为registerLanguageTexts
>* fix:(xgplayer) 移动端禁用DynamicBg插件
>* fix:(xgplayer) autoplay增加android6.0以下测试 android 6.0以下不允许自动播放设置
>* feat:(xgplayer)  删除defaultpreset中texttrack插件的集成; 将danmu.js和xgplayer-subtitles依赖移动到peerDependencies
>* feat:(xgplayer) pc插件增加videoClick和videoDbClick两个hook

## 3.0.0-alpha.93
>* feat: (xgplayer) 音量插件音量为0取消静音的时候设置默认音量
>* fix:(xgplayer) 修复retry直播流程异常问题; player.useHooks增加return值
>* feat:(xgplayer) 修改一些ts相关声明
>* feat(xgplayer): 更新语言注册逻辑, 增加语言注册之前的扩展数据缓存
>* feat:(xgplayer) unRegister 增加插件名小写转换; dynamicBg start增加stop之前的动画逻辑
>* feat:(xgplayer): 增加內置插件用戶行为数据触发事件USER_ACTION, plugin封装统一的触发API-> emitUserAction

## 3.0.0-alpha.92
>* chore: (xgplayer) 修正类型注释错误导致d.ts导出异常问题
>* feat: (xgplayer) 增加zoom配置参数，用于兼容父节点css设置了zoom导致计算异常问题 https://bugs.chromium.org/p/chromium/issues/detail?id=429140#c8
>* fix:  (xgplayer) fullscreen插件中orientationchange事件销毁移除
>* fix:  (xgplayer) start和loading增加inner层，解决定位和动效都使用transform在ios上异常问题
>* feat: (xgplayer) 进入全屏和pc端鼠标hover的时候添加焦点确保快捷键生效
>* feat: (xgplayer) 增加播放质量数据采集logger插件
>* feat: (xgplayer) 针对videoSource列表播放资源方式添加error监听
>* feat: (xgplayer) 增加快捷键事件emit,事件名为SHORTCUT

## 3.0.0-alpha.91
>* chore: (xgplayer) 删除src独立定义的d.ts文件，只保留proxy.d.ts
>* feat: (xgplayer) 修改hook装饰器使用方式，在player和BasePlugin中显示声明hook相关API，便于d.ts文件生成
>* chore: (xgplayer) 所有文件属性、api增加jsdoc，用于自动生成d.ts声明文件

## 3.0.0-alpha.90
>* chore: babel.config.js替代.babelrc,解决lib目录下打包异常问题; version
生成改成静态字符串替换方式
>* feat: (xgplayer) 增加buffered2接口获取校准之后的缓存空间
>* feat: (xgplayer) fullscreen插件修正接口名称,hook名称fullsreen_change更正为fullscreen_change
>* feat: (xgplayer) ts声明增加SimplePlayer, 导出SimplePlayer; preset增加语言包能力，拆分仅有英文包的preset;
>* fix:(xgplayer) 修复rotateFullScreen无法在指定target上触发的问题; canplay设置defaultPlaybackRate解决有倍速插件的情况下设置的video倍速失效问题
>* feat: (xgplayer) player API play/pause/retry/replay等添加hook
>* feat: (xgplayer) 支持自定义videoProxy构造造player.video对象
>* feat: (xgplayer) hook增加参数回传，回调的第一个参数为当前对象（player或者对应插件实例）

## 3.0.0-alpha.89
>* chore: 添加eslint规范，去除array-callback-return规则限制
>* fix: (xgplayer) 修复进度条点击两个触发seek问题; 修复keybored取值异常问题
>* feat: (xgplayer) dynamicBg在safari下使用mse播放场景只渲染首帧图
>* feat: (xgplayer) 弹幕新增resize, 并在全屏等屏幕大小触发的时候resize
>* feat:(xgplayer) 弹幕插件中danmu.js更新到0.4.0; 弹幕插件新增配置项
>* feat: (xgplayer) Keyboard 增加body禁用配置项


## 3.0.0-alpha.88
>* fix(xgplayer): 修复closeControlsBlur为true的时候 控制栏没有消失问题
>* feat(xgplayer): 新增内置插件dynamicBg用于实时背景预览
>* feat:(xgplayer): css全屏和全屏支持指定dom进行，并对行间样式移除/添加增加白名单
>* feat: 支持音量条显示当前音量数值
>* fix: 修复ipad下自动播放不生效，导致enter组件一直不消失问题
>* fix: 修复pc插件和danmu插件destroy异常问题，更新弹幕插件版本为0.3.5
>* feat:(xgplayer) pip插件中requestPIP增加video状态判断，修改pip中play的调用为videoPlay 避免多次调用到playHooks
>* feat:(xgplayer) 弹幕增加live参数读取和初始化扩展参数
>* feat:(xgplayer) controls增加进度条位于底部的模式;
>* feat:(xgplayer) playNext插件添加hook;
>* feat:(xgplayer) 内置插件内部触发的事件提取到总的事件枚举列表中, 小窗状态下mini进度条常驻
>* feat:(xgplayer) 规范icon颜色设置,所有内置svg增加fill属性
>* fix(xgplayer): 修复预览插件插入到video之前之后 start判断异常问题
>* fix(xgplayer):修复播放器快捷键可见性校验异常问题并增加是否进行可见性校验的配置checkVisible


## 3.0.0-alpha.29
>* 
## 3.0.0-alpha.28
>* 修复倍速设置问题

## 3.0.0-alpha.27
>* 增加创建browser目录

## 3.0.0-alpha.26
>* 修复safari下的autoplay触发问题

## 3.0.0-alpha.25
>* 解决倍速切换组件的多语言问题

## 3.0.0-alpha.24
>* 解决ios下video seeking事件回调时机和android不同导致的seek回调问题
## 3.0.0-alpha.23
>* 修复手势快进时间超出范围问题
>* 解决弹幕插件中按钮异常
>* 修复controls在非flex模式下time组件无法显示问题
>* 更新弹幕danmu.js为0.2.15

## 3.0.0-alpha.20
>* 更新弹幕danmu.js为0.2.16
>* 解决弹幕插件中按钮异常

## 3.0.0-alpha.18
>* 解决弹幕组件中的开关按钮异常问题

## 3.0.0-alpha.17
>* 解决进度条滑动带动页面滚动问题; 解决移动端seek提示信息重播显示异常问题

## 3.0.0-alpha.15
>* start插件增加mode配置参数，用户控制按钮控制状态

## 3.0.0-alpha.14
>* 修复ios下无法自动播放没有触发canplay的异常情况
>* build命令增加文件夹移除代码，增加dev下 rimraf依赖