# 版本更新记录
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