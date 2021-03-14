/* global HTMLElement */

/**
 * 插件基础配置
 */
export interface BasePluginConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
}

/**
 * 底部控制栏配置
 */
export interface ControlsConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    disable?: Boolean; // [可选]是否禁用插件交互行为
    autoHide?: Boolean; // 是否自动隐藏, 默认true
    mode?: String; // 显示模式， flex和normal, 默认normal
    marginBottom?: Boolean; // 控制条是否显示在播放器底部, 默认false
    initShow?: Boolean // 是否初始化的时候就显示, 默认false
}

/**
 * pc插件配置
 */
export interface PCConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    disableContextmenu?: Boolean; // [可选]是否禁用右键功能
}

/**
 * mobile插件配置
 */
export interface MobileConfig {
    disableGesture?: Boolean; // 是否禁用手势, 默认false
    gestureX?: Boolean; // 是否启用水平手势,默认为true
    gestureY?: Boolean; // 是否启用垂直手势, 默认为true
    gradient?: 'normal' | 'top' | 'bottom' | 'none'; // 是否启用阴影, 默认normal
    isTouchingSeek?: Boolean; // 是否在touchMove的同时更新currentTime, 默认false
    miniMoveStep?: Number; // 最小差异，用于move节流, 默认5
    miniYPer?: Number; // y方向最小位移百分比, 默认5
    scopeL?: Number; // 左侧手势范围比例,默认0.25
    scopeR?: Number; // 右侧手势范围比例,默认0.25
    scopeM?: Number; // 中间手势范围比例,默认0.9
    pressRate?: Number; // 长按快进倍速 默认2
    darkness?: Boolean; // 是否启用右侧调暗功能, 默认true
    maxDarkness?: Number; // 调暗最大暗度，即蒙层最大透明度, 默认0.8
    disableActive?: Boolean; // 是否禁用时间面板, 默认false
    disableTimeProgress?: Boolean; // 是否禁用时间进度条, 默认false
    hideControlsActive?: Boolean; // 手势拖动的时候是否隐控制栏, 默认false
    hideControlsEnd: true; // 手势结束的时候隐控制栏, 默认true
    moveDuration?: Number; // 视频区对应的时长,默认60 * 6 * 1000
    closedbClick?: Boolean; // 是否关闭双击手势, 默认false
    disablePress?: Boolean; // 是否关闭长按手势, 默认true
    disableSeekIcon?: Boolean; // 禁用seek方向显示按钮, 默认false
}

/**
 * 进度条插件配置
 */
export interface ProgressConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    isDragingSeek?: Boolean; // 是否在拖拽的过程中更新currentTime, 默认true
    closeMoveSeek?: Boolean; // 是否关闭滑块seek能力, 默认false
    isPauseMoving?: Boolean; // 是否在move的时候暂停视频内容,默认false
    isCloseClickSeek?: Boolean; // 是否关闭点击进度条的时候seek, 默认false
    fragments?: Array<{percent: Number}>; // 分段显示配置默认[{percent: 1}],
    miniMoveStep?: Number; // 最小拖动距离，默认5
    miniStartStep?: Number; // 拖动反馈最小触发距离，默认2
    onMoveStart?: Function; // 手势开始移动回调
    onMoveEnd?: Function; // 手势移动结束回调
}

/**
 * 进度条预览插件配置
 */
export interface IsPot {
  time: Number; // 进度条在此时间戳打点 单位为s
  text?: String | Number; // 打点处的自定义文案
  id: Number; // 标记唯一标识，用于删除的时候索引
  duration: Number; // 进度条标识点的时长 默认1s【可选】单位为s
  color?: String; // 进度条标识点的显示颜色【可选】默认'#fff'
  style?: Object; // 指定样式
  width?: Number;
  height?: Number;
}

export interface ProgressPreviewConfig {
    miniWidth?: Number; // 故事点显示最小宽度
    ispots: Array<IsPot>; // 故事点列表
    defaultText?: String; // 故事点hover默认文案
    isFocusDots?: Boolean;// 默认true
    isShowThumbnail?: Boolean;// 是否显示预览图, 默认true
    isShowCoverPreview?: Boolean; // 进度条拖动时是否显示播放区域预览图, 默认false
    mode?: String; // 预览图显示方式 short | production , 默认short
}

/**
 * 剧情预览缩略图配置
 */
export interface ThumbnailConfig {
    urls: Array<String>; // 有多张大图就多个url就好
    pic_num: Number; // 每张图含有几个雪碧图
    col: Number; // 截图列数
    row: Number; // 截图行数
    height: Number; // 缩略图高度, 默认90
    width: Number; // 缩略图宽度， 默认160
}

/**
 * 清晰度切换插件配置
 */
interface DefinitionItem {
    definition: String | Number; // 每个清晰度对应的标记
    url?: String; // 清晰度播放地址
    text: String | {};
    iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
}
export interface DefinitionConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    disable?: Boolean; // [可选]是否禁用插件交互行为
    list: Array<DefinitionItem>
}

/**
 * 倍速插件切换插件配置
 */
interface PlayBackRateItem {
    rate?: Number; // 每个清晰度对应的标记
    text: String | {};
    iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
}
export interface PlayBackRateConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    disable?: Boolean; // [可选]是否禁用插件交互行为
    list: Array<PlayBackRateItem> | Array<Number>
}

/**
 * PIP插件配置
 */
export interface PIPConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    showIcon?: Boolean; // [可选]是否显示切换按钮
}

/**
 * Poster插件配置
 */
export interface PosterConfig {
    isEndedShow?: Boolean; // [可选]播放结束的时候是否显示，默认true
    hideCanplay?: Boolean; // [可选]cnaplay 时间大于1的时候才隐藏,默认false
    poster: String; // 封面图地址
}

/**
 * enter插件配置
 */
export interface EnterConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    innerHtml?: String; // [可选]html字符串
}

/**
 * 全屏插件配置
 */
export interface FullscreenConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    useCssFullscreen?: Boolean; // [可选]是否启用css全屏
    rotateFullscreen?: Boolean; // [可选]是否启用旋转全屏
    switchCallback?: Function; // [可选]状态切换回调
    target?: HTMLElement; // [可选]全屏切换目标元素
    disable?: Boolean; // [可选]是否禁用插件交互行为
    needBackIcon?: Boolean// [可选]是否使用顶部返回按钮替换退出全屏,默认false
}

/**
 * 快捷键插件配置
 */
interface KeyCodeItem {
    [propName: string]: {
        keyCode: Number; // 【必选】要定义的快捷键按键数字
        action: String | Function; // 【必选】按键对应的
        disable?: Boolean; // 是否禁用
    }
}
export interface KeyboardConfig {
    seekStep?: Number; // [可选]快捷键快进/快退每次操作时长，默认10s
    keyCodeMap?: KeyCodeItem; // [可选]是否启用旋转全屏
    disable?: Boolean; // [可选]是否禁用插件交互行为
}

/**
 * 迷你小窗配置
 */
export interface MiniScreenConfig {
    disable?: Boolean; // 是否禁用
    width?: Number; // 小窗宽度，默认320
    height?: Number; // 小窗高度，默认180
    left?: Number; // 默认左下角, -1
    top?: Number; // 默认左下角, -1
    isShowIcon?: Boolean; // 是否显示切换icon,默认false
    isScrollSwitch?: Boolean;// 滚动自动切换自动切换, 默认false
    scrollTop?: Number; // 触发滚动的高度, 默认0
    disableDrag?: Boolean; // 是否禁用拖拽, 默认false
}

/**
 * 音量插件配置
 */
export interface VolumeConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    disable?: Boolean; // [可选]是否禁用插件交互行为
    default?: Number // [可选]默认音量
}

/**
 * 外挂字幕插件配置
 */

export interface Texttrack {
    src: String; // 外挂字幕地址
    text?: String | Object; // 外挂字幕地址
    language?: String; // 外挂字幕地址
    default?: Boolean; // 是否为默认字幕
    id?: Number | String
}

export interface TexttrackStyle {
    follow?: Boolean; // 是否跟随控制栏调整位置;默认true
    mode?: String; // 字体显示模式，默认stroke(描边)
    followBottom?: Number; // 跟随底部控制栏的高度
    fitVideo?: Boolean; // 是否跟随视频自动调整字号;默认true
    offsetBottom?: Number; // 字幕距离画面底部百分比;默认2%
    baseSizeX?: Number; // 横屏视频适配基准字号; 默认49
    baseSizeY?: Number; // 竖屏视频适配基准字号; 默认28
    minSize?: Number; // pc端最小字号; 默认16
    minMobileSize?: Number; // 移动端最小字号; 默认13
    line?: String; // 最大显示行数 single/double/three; 默认double
    fontColor?: String // 字体颜色; 默认#fff
}

export interface TextTrackConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    list: Array<Texttrack>; // [必选]字幕列表
    isDefaultOpen?: Boolean; // [可选] 是否默认开启字幕
    style: TexttrackStyle;
    closeText: {
        text: String,
        iconText: String | Object
    };
}

export interface StartConfig {
    isShowPause?: Boolean; // 暂停是否常驻, 默认false
    isShowEnd?: Boolean; // 播放结束常驻, 默认false
    disableAnimate?: Boolean; // 禁用点击动画， 默认false
    mode?: 'hide' | 'show' | 'auto'// 控制模式: hide 常驻: show 跟随：auto, 默认hide
}

export interface RotateConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    innerRotate?: Boolean; // true为只有画面旋转，false为整个播放器旋转, 默认true
    clockwise?: Boolean; // true: 顺时针旋转 false:逆时针旋转； 默认false
    rotateDeg?: Number; // 初始旋转角度, 默认0
}

export interface ScreenShotConfig {
    root?: HTMLElement; // 【可选】插件挂载的dom
    position?: String; // [可选]插件挂载的dom
    index?: Number; // [可选]插件在播放器中挂载的位置
    quality?: Number;// [可选] 截图质量配置，默认0.92
    type?: String; // [可选] 截图格式配置，默认image/png
    format?: '.png'; // [可选] 截图存储后缀，默认.png
    width?: Number; // [可选]截图宽度,默认600
    height?: Number; // [可选]截图宽度,默认337
    name?: String; // [可选]截图存储命名,默认'截图'
}
