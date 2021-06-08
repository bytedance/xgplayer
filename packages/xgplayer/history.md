# 版本更新记录
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