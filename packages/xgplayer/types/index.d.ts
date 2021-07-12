/**
 * @file index.d.ts
 * 
 */
import { EventEmitter } from 'events';
declare module 'xgplayer' {
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
  export type ControlsConfig = BasePluginConfig & {
    disable?: Boolean; // [可选]是否禁用插件交互行为
    autoHide?: Boolean; // 是否自动隐藏, 默认true
    mode?: String; // 显示模式， flex和normal, 默认normal
    initShow?: Boolean // 是否初始化的时候就显示, 默认false
  }

  /**
   * pc插件配置
   */
  export type PCConfig = BasePluginConfig & {
    disableContextmenu?: Boolean; // [可选]是否禁用右键功能
  }

  /**
   * mobile插件配置
   */
  export type MobileConfig = {
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
  export type ProgressConfig = BasePluginConfig & {
    isDragingSeek?: Boolean; // 是否在拖拽的过程中更新currentTime, 默认true
    closeMoveSeek?: Boolean; // 是否关闭滑块seek能力, 默认false
    isPauseMoving?: Boolean; // 是否在move的时候暂停视频内容,默认false
    isCloseClickSeek?: Boolean; // 是否关闭点击进度条的时候seek, 默认false
    fragments?: Array<{ percent: Number }>; // 分段显示配置默认[{percent: 1}],
    miniMoveStep?: Number; // 最小拖动距离，默认5
    miniStartStep?: Number; // 拖动反馈最小触发距离，默认2
    onMoveStart?: Function; // 手势开始移动回调
    onMoveEnd?: Function; // 手势移动结束回调
  }

  /**
   * 进度条预览插件配置
   */
  export type IsPot = {
    time: Number; // 进度条在此时间戳打点 单位为s
    text?: String | Number; // 打点处的自定义文案
    id: Number; // 标记唯一标识，用于删除的时候索引
    duration: Number; // 进度条标识点的时长 默认1s【可选】单位为s
    color?: String; // 进度条标识点的显示颜色【可选】默认'#fff'
    style?: Object; // 指定样式
    width?: Number;
    height?: Number;
  }

  export type ProgressPreviewConfig = {
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
  export type ThumbnailConfig = {
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
  export type DefinitionItem = {
    definition: String | Number; // 每个清晰度对应的标记
    url?: String; // 清晰度播放地址
    text: String | {};
    iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
  }
  export type DefinitionConfig = BasePluginConfig & {
    disable?: Boolean; // [可选]是否禁用插件交互行为
    list: Array<DefinitionItem>
  }

  /**
   * 倍速插件切换插件配置
   */
  export type PlayBackRateItem = {
    rate?: Number; // 每个清晰度对应的标记
    text: String | {};
    iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
  }
  export type PlayBackRateConfig = BasePluginConfig & {
    disable?: Boolean; // [可选]是否禁用插件交互行为
    list: Array<PlayBackRateItem> | Array<Number>
  }

  /**
   * PIP插件配置
   */
  export type PIPConfig = BasePluginConfig & {
    showIcon?: Boolean; // [可选]是否显示切换按钮
  }

  /**
   * Poster插件配置
   */
  export type PosterConfig = {
    isEndedShow?: Boolean; // [可选]播放结束的时候是否显示，默认true
    hideCanplay?: Boolean; // [可选]cnaplay 时间大于1的时候才隐藏,默认false
    poster: String; // 封面图地址
  }

  /**
   * enter插件配置
   */
  export type EnterConfig = BasePluginConfig & {
    innerHtml?: String; // [可选]html字符串
  }

  /**
   * 全屏插件配置
   */
  export type FullscreenConfig = BasePluginConfig & {
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
  export type KeyCodeItem = {
    [propName: string]: {
      keyCode: Number; // 【必选】要定义的快捷键按键数字
      action: String | Function; // 【必选】按键对应的
      disable?: Boolean; // 是否禁用
    }
  }
  export type KeyboardConfig = {
    seekStep?: Number; // [可选]快捷键快进/快退每次操作时长，默认10s
    keyCodeMap?: KeyCodeItem; // [可选]是否启用旋转全屏
    disable?: Boolean; // [可选]是否禁用插件交互行为
  }

  /**
   * 迷你小窗配置
   */
  export type MiniScreenConfig = {
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
  export type VolumeConfig = BasePluginConfig & {
    disable?: Boolean; // [可选]是否禁用插件交互行为
    default?: Number // [可选]默认音量
  }

  /**
   * 外挂字幕插件配置
   */

  export type Texttrack = {
    src: String; // 外挂字幕地址
    text?: String | Object; // 外挂字幕地址
    language?: String; // 外挂字幕地址
    default?: Boolean; // 是否为默认字幕
    id?: Number | String
  }

  export type TexttrackStyle = {
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

  export type TextTrackConfig = BasePluginConfig & {
    list: Array<Texttrack>; // [必选]字幕列表
    isDefaultOpen?: Boolean; // [可选] 是否默认开启字幕
    style: TexttrackStyle;
    closeText: {
      text: String,
      iconText: String | Object
    };
  }

  export type StartConfig = {
    isShowPause?: Boolean; // 暂停是否常驻, 默认false
    isShowEnd?: Boolean; // 播放结束常驻, 默认false
    disableAnimate?: Boolean; // 禁用点击动画， 默认false
    mode?: 'hide' | 'show' | 'auto'// 控制模式: hide 常驻: show 跟随：auto, 默认hide
  }

  export type RotateConfig = BasePluginConfig & {
    innerRotate?: Boolean; // true为只有画面旋转，false为整个播放器旋转, 默认true
    clockwise?: Boolean; // true: 顺时针旋转 false:逆时针旋转； 默认false
    rotateDeg?: Number; // 初始旋转角度, 默认0
  }

  type ScreenShotConfig = BasePluginConfig & {
    quality?: Number;// [可选] 截图质量配置，默认0.92
    type?: String; // [可选] 截图格式配置，默认image/png
    format?: '.png'; // [可选] 截图存储后缀，默认.png
    width?: Number; // [可选]截图宽度,默认600
    height?: Number; // [可选]截图宽度,默认337
    fitVideo?: Boolean; // [可选]截取图片是否适配视频宽高,默认true,
    name?: String; // [可选]截图存储命名,默认'截图'
  }
  type DanmuModelType = 'top' | 'bottom' | 'scroll' | string;

  interface DanmuOptions {
    comments: DanmuCommentOptions[];
    panel?: boolean;
    area?: {
      start: number;
      end: number;
    };
    closeDefaultBtn?: boolean;
    defaultOff?: boolean;
  }

  interface DanmuCommentOptions {
    duration: number;
    id: unknown;
    start: number;
    prior?: boolean;
    color?: boolean;
    txt: string;
    style?: Record<string, string | number>;
    mode?: DanmuModelType;
  }

  interface Util {
    createDom(el: string, tpl?: string, attrs?: object, cname?: string): HTMLElement | null;
    createDomFromHtml(html: string, attrs?: object, classname?: string): HTMLElement | null;
    hasClass(el: HTMLElement, className: string): boolean;
    addClass(el: HTMLElement, className: string): void;
    removeClass(el: HTMLElement, className: string): void;
    toggleClass(el: HTMLElement, className: string): void;
    findDom(el: HTMLElement, sel: string): HTMLElement | null;
    getCss(dom: HTMLElement, key: string): string;
    padStart(str: string | number, length: number, pad: number): string;
    format(time: number): string;
    event(e: Event): void;
    typeOf(obj: any): string;
    deepCopy(dst: object, src: object): object;
    deepMerge(dst: object, src: object): object;
    getBgImage(el: HTMLElement): string;
    copyDom(dom: HTMLElement): HTMLElement | '';
    setInterval(context: any, eventName: string, intervalFunc: any, frequency: number): void;
    clearInterval(context: any, eventName: string): void;
    setTimeout(context: any, fun: any, time: number): number;
    clearTimeout(context: any, timerId: number): void;
    clearAllTimers(context: any): void;
    createImgBtn(name: string, imgUrl: string, width: number | string, height: number | string): HTMLElement;
    Hex2RGBA(hex: string, alpha: string): string;
    getFullScreenEl(): HTMLElement | null;
    checkIsFunction(fun: any): boolean;
    checkIsObject(obj: any): boolean;
    hide(dom: HTMLElement): void;
    show(dom: HTMLElement, display?: string): void;
    isUndefined(val: any): boolean;
    setStyleFromCsstext(dom: HTMLElement, text: string): void;
    preloadImg(url: string, onload?: any, onerror?: any): void;
    stopPropagation(e: Event): void;
  }

  interface OS_TYPE {
    isTablet: boolean;
    isPhone: boolean;
    isIos: boolean;
    isAndroid: boolean;
    isPc: boolean;
    isSymbian: boolean;
    isWindowsPhone: boolean;
    isFireFox: boolean
  }

  interface Sniffer {
    device: string;
    browser: string;
    os: OS_TYPE;
    isWeixin: boolean;
  }

  interface Events {
    PLAY: 'play',
    PLAYING: 'playing',
    ENDED: 'ended',
    PAUSE: 'pause',
    ERROR: 'error',
    SEEKING: 'seeking',
    SEEKED: 'seeked',
    TIME_UPDATE: 'timeupdate',
    WAITING: 'waiting',
    CANPLAY: 'canplay',
    CANPLAY_THROUGH: 'canplaythrough',
    DURATION_CHANGE: 'durationchange',
    VOLUME_CHANGE: 'volumechange',
    LOADED_DATA: 'loadeddata',
    RATE_CHANGE: 'ratechange',
    PROGRESS: 'progress',
    LOAD_START: 'loadstart',
    EMPTIED: 'emptied',
    STALLED: 'stalled',
    SUSPEND: 'suspend',
    ABORT: 'abort',
    // player events,
    BUFFER_CHANGE: 'bufferedChange',
    PLAYER_FOCUS: 'focus',
    PLAYER_BLUR: 'blur',
    READY: 'ready',
    URL_NULL: 'urlNull',
    /**
     * 自动起播成功
     */
    AUTOPLAY_STARTED: 'autoplay_started',
    /**
     * 自动起播失败
     */
    AUTOPLAY_PREVENTED: 'autoplay_was_prevented',
    COMPLETE: 'complete',
    REPLAY: 'replay',
    DESTROY: 'destroy',
    URL_CHANGE: 'urlchange',
    // screen change evnets,
    FULLSCREEN_CHANGE: 'fullscreen_change',
    CSS_FULLSCREEN_CHANGE: 'cssFullscreen_change',
    MINI_STATE_CHANGE: 'mini_state_change',
    DEFINITION_CHANGE: 'definition_change',
    BEFORE_DEFINITION_CHANGE: 'before_definition_change',
    AFTER_DEFINITION_CHANGE: 'after_definition_change',
    // transmuxer events,
    SEI_PARSED: 'SEI_PARSED',
    RETRY: 'retry',
    // 容器宽高变化,
    VIDEO_RESIZE: 'video_resize',
    // picture-in-picture状态变化,
    PIP_CHANGE: 'pip_change',
    // rotate change
    ROTATE: 'rotate',
    // screenShot
    SCREEN_SHOT: 'screenShot'
    // play next
    PLAYNEXT: 'playnext'
  }

  interface STATE_CLASS {
    DEFAULT: 'xgplayer',
    DEFAULT_SKIN: 'xgplayer-skin-default',
    ENTER: 'xgplayer-is-enter',
    PAUSED: 'xgplayer-pause',
    PLAYING: 'xgplayer-playing',
    ENDED: 'xgplayer-ended',
    CANPLAY: 'xgplayer-canplay',
    LOADING: 'xgplayer-isloading',
    ERROR: 'xgplayer-is-error',
    REPLAY: 'xgplayer-replay',
    NO_START: 'xgplayer-nostart',
    ACTIVE: 'xgplayer-inactive',
    FULLSCREEN: 'xgplayer-is-fullscreen',
    CSS_FULLSCREEN: 'xgplayer-is-cssfullscreen',
    ROTATE_FULLSCREEN: 'xgplayer-rotate-fullscreen',
    NO_CONTROLS: 'no-controls',
    FLEX_CONTROLS: 'flex-controls',
    CONTROLS_FOLLOW: 'controls-follow',
    AUTOHIDE: 'xgplayer_autohide',
    NOT_ALLOW_AUTOPLAY: 'not-allow-autoplay',
    SEEKING: 'seeking',
    PC: 'xgplayer-pc',
    MOBILE: 'xgplayer-mobile',
    MINI: 'xgplayer-mini' // 小窗播放状态 // 小窗播放状态
  }

  // export interface TextTrack {
  //     src: string;
  //     kind: string;
  //     label: string;
  //     srclang: string;
  //     default: boolean;
  // }

  export interface IPlayerOptions {

    // 选择器
    id?: string;

    // DOM实例
    el?: HTMLElement;

    // 视频源
    url: string | Array<{ src: string; type?: string }>;

    // 宽度(默认600)
    width?: number | string;

    // 高度（默认337.5）
    height?: number | string;

    // 流式布局（默认false）
    // 设置为流式布局，可使播放器宽度跟随父元素的宽度大小变化，且高度按照配置项中的高度和宽度的比例来变化
    fluid?: boolean;

    // 自适应视频内容宽高,可设置三种模式：
    //  1、fitVideoSize设置为fixWidth，表示容器宽度固定，容器高度按照视频内容比例增大或减小；
    //  2、fitVideoSize设置为fixHeight，表示容器高度固定，容器宽度按照视频内容比例增大或减小；
    //  3、fitVideoSize设置为auto，表示容器高度或宽度按照视频内容比例增大
    fitVideoSize?: 'fixWidth' | 'fixHeight' | 'auto';
    /**
     * video画面填充模式
     */
    videoFillMode?: 'fillHeight' | 'fillWidth' | 'fill' | 'auto' | 'cover';

    /**
     * 音量配置
     * 可以是音量值/音量插件的配置对象/是否显示音量插件
     */
    volume?: number | VolumeConfig;

    // 自动播放（默认false）
    autoplay?: boolean;
    // 默认静音自动播放

    autoplayMuted?: boolean;

    // 循环播放(默认false)
    loop?: boolean;

    // 初始化显示视频首帧（默认false,该配置在移动端无效)
    videoInit?: boolean;

    // 封面图 或者是封面图的配置对象
    poster?: string | PosterConfig;

    // 是否启用移动端模拟状态，该状态为true则展示的是移动端效果
    isMobileSimulateMode?: boolean

    // 倍速播放
    // 播放器支持设置视频的当前播放速度。可通过defaultPlaybackRate设置初始速度。
    playbackRate?: Boolean | Array<Number> | PlayBackRateConfig;

    // 默认播放速度
    defaultPlaybackRate?: number;

    // 预览本地视频
    preview?: { uploadEl?: HTMLElement };

    // 进度条特殊点标记
    progressDot?: Array<IsPot>;

    // 键盘快捷键 默认值：'on'
    keyShortcut?: boolean;

    // 插件生效前执行
    execBeforePluginsCall?: VoidFunction[];

    // 关闭video触发click事件后视频切换播放/暂停状态
    closeVideoClick?: boolean;

    // 关闭video触发dblclick事件后进入/退出全屏
    closeVideoDblclick?: boolean;

    // 关闭移动端下默认video触发touchend事件后视频切换播放/暂停状态
    closeVideoTouch?: boolean;

    // 关闭鼠标移出播放器范围时触发blur事件
    closePlayerBlur?: boolean;

    // 延迟触发blur事件的时间
    leavePlayerTime?: number;

    // 是否关闭自动隐藏控制条
    closeDelayBlur?: boolean;

    // 关闭鼠标移出播放器控制条范围时触发focus事件
    closeControlsBlur?: boolean;

    // 关闭播放器范围时移动鼠标时触发video focus
    closeFocusVideoFocus?: boolean;

    // 是否关闭pause时触发focus
    closePauseVideoFocus?: boolean;

    // 关闭播放器触发play事件时触发video focus
    closePlayVideoFocus?: boolean;

    // 清晰度切换配置
    definitionActive?: 'hover' | 'click';

    // 关闭内置控件
    // eslint-disable-next-line max-len
    ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>;

    // 播放镜像 https://support.apple.com/en-us/HT204289
    airplay?: boolean;


    // 国际化
    lang?: 'zh-cn' | 'en' | 'jp' | 'zh';

    // 内联模式 https://webkit.org/blog/6784/new-video-policies-for-ios/
    // 该选项在手机观看时，开启ios和微信的内联模式
    playsinline?: boolean;

    // 手机调试
    // 要使用该功能，请先在开发者电脑安装 weinre
    debug?: { host: string; port: number };

    // 微信同层播放
    'x5-video-player-type'?: 'h5';

    // 微信全屏播放
    'x5-video-player-fullscreen'?: boolean;

    // 微信横竖屏控制
    'x5-video-orientation'?: 'landscape' | 'portraint';

    // 自定义配置
    customConfig?: Record<string, unknown>;

    // 关闭控制条， 默认true
    controls?: boolean | ControlsConfig;

    // 控制栏是否位于画面底部，不与画面重合
    marginControls?: Boolean;

    // 需要安装的插件列表
    plugins?: any[];

    // 需要使用的preset列表
    presets?: any[];

    // video标签扩展属性
    videoAttrbutes?: any;

    // 按钮配置列表
    icons?: any;

    // 用于配置一些通用样式结构
    commonStyle?: {
      // 进度条底色
      progressColor?: string,
      // 播放完成部分进度条底色
      playedColor?: string,
      // 播放完成部分进度条底色
      cachedColor?: string,
      // 进度条滑块样式
      sliderBtnStyle?: any,
      // 进度条滑块样式
      volumeColor?: string
    };

    // 进度条自动消失延时
    inactive?: number;

    // 自动播放起始时间点
    startTime?: number;

    /** 
     * @deprecated
     * 【即将废弃，后续使用seekedStatus】seek结束之后是否默认播放
     */
    isSeekedPlay?: boolean;

    // 快进/快退之后播放器状态 play: 强制播放; pause: 强制暂停; auto: 保持状态
    seekedStatus?: 'play' | 'pause' | 'auto';

    // 是否添加迷你控制栏
    miniprogress?: boolean;

    // 移动端滑动进行快进/快退开始时回调
    disableSwipeHandler?: () => void;

    enableSwipeHandler?: () => void;

    // 清晰度切换插件配置
    definition?: Boolean | DefinitionConfig | any;

    // 预览
    thumbnail?: ThumbnailConfig;

    // 下一集
    playNext?: {
      urlList: string[];
    };

    // 视频旋转按钮配置项
    rotate?: boolean | RotateConfig;

    // 视频下载(默认false)
    download?: boolean | BasePluginConfig;

    // 弹幕（具体用法参考https://github.com/bytedance/danmu.js）
    danmu?: DanmuOptions;

    // 外挂字幕（参考https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API）
    textTrack?: boolean | TextTrackConfig;

    // 外挂字幕样式
    textTrackStyle?: TexttrackStyle | Record<string, string | number>;

    // 配置项修改外挂字幕控件的触发方式
    textTrackActive?: 'hover' | 'click';

    // 画中画
    pip?: boolean | PIPConfig;

    // 网页样式全屏
    cssFullscreen?: boolean | any;

    // 全屏插件配置
    fullscreen?: boolean | FullscreenConfig;

    // 截图
    screenShot?: boolean | ScreenShotConfig;

    //移动端手势插件配置
    mobile?: MobileConfig;

    // 迷你小屏播放插件配置
    mini?: boolean | MiniScreenConfig;

    // pc端快捷键配置
    keyboard?: Boolean | KeyboardConfig;

    enter?: boolean | EnterConfig;

    // 进度条预览插件
    progressPreview?: ProgressPreviewConfig;

    // 进度条插件配置
    progress?: boolean | ProgressConfig;

    // 中间播放按钮插件配置
    start?: boolean | StartConfig;

    //pc相关插件配置
    pc?: PCConfig;

    // video属性，该配置会直接添加到video上
    videoConfig?: any;

    //扩展定义
    [propName: string]: any;
  }

  type XGI18nTextKeys = {
    [k: string]: string;
  };

  type XGI18nLangKeys = string[];

  type XGI18nLang = {
    LANG: string;
    TEXT: XGI18nTextKeys
  }

  interface I18N {
    textKeys: XGI18nTextKeys;
    langKeys: XGI18nLangKeys;
    lang: {
      [key: string]: {
        [key: string]: string;
      }
    };
    extend: (data: {
      [key: string]: {
        [key: string]: string;
      }
    }) => void;
    use: (data: XGI18nLang) => void;
  }

  class BasePlugin {
    static defineGetterOrSetter(Obj: object, map: object): void;
    constructor(args: object);
    /**
     * 播放器实例
     */
    player: any;

    /**
     * 播放器配置
     */
    playerConfig: any;

    /**
     * 插件名
     */
    pluginName: string;

    /**
     * 日志对象
     */
    logger: any;

    /**
     * 更新语言
     * @param lang
     */
    updateLang(lang: string): void;

    /**
     * 当前语言
     * @param lang
     */
    lang: string;

    i18n: any;

    i18nKeys: any;

    /**
     * 添加事件监听
     * @param event
     * @param callback
     */
    on(event: string, callback: Function): void;

    /**
     * 添加事件监听
     * @param event
     * @param callback
     */
    once(event: string, callback: Function): void;

    /**
     * 解除事件监听
     * @param event
     * @param callback
     */
    off(event: string, callback: Function): void;

    /**
     * 解除所有事件监听
     */
    offAll(): void;

    /**
     * 触发某个事件
     * @param event
     * @param data
     */
    emit(event: string, data: any): void;

    /**
     * 注册一个插件
     * @param plugin 插件构造器
     * @param options 插件配置
     * @param name 插件名称
     */
    registerPlugin(plugin: object, options?: object, name?: string): BasePlugin | null;

    /**
     * 根据插件名称获取插件实例
     * @param name
     */
    getPlugin(name: string): BasePlugin;

    /**
     * 播放器销毁回调
     */
    destroy(): void;

    /**
     * 销毁播放器
     */
    __destroy(): void;
  }

  interface ROOT_TYPES {
    CONTROLS: string;
    ROOT: string;
  }

  interface POSITIONS {
    ROOT: string;
    ROOT_LEFT: string;
    ROOT_RIGHT: string;
    ROOT_TOP: string;
    CONTROLS_LEFT: string;
    CONTROLS_RIGHT: string;
    CONTROLS_CENTER: string;
    CONTROLS: string;
  }

  class Plugin extends BasePlugin {

    static ROOT_TYPES: ROOT_TYPES;

    static POSITIONS: POSITIONS;
    /**
      * 插入dom结构
      * @param {String | Element} html html字符串或者dom
      * @param {Element} parent
      * @param {*} index
      */
    static insert(html: string, parent: HTMLElement, index: number): HTMLElement;

    /**
     * 默认配置信息
     */
    static defaultConfig: object;

    static delegate(root: HTMLElement, querySelector?: string, eventType?: string | Array<string>, callback?: Function, capture?: boolean): void;

    static removeDelegate(root: HTMLElement, eventType?: string | Array<string>, callback?: Function, capture?: boolean): void;

    /**
     * 插件根节点
     */
    root: HTMLElement;

    /**
     * 插件父节点
     */
    parent: HTMLElement;
    /**
     * 获取子插件列表
     */
    children(): object;
    /**
     * 在当前插件根节点查找dom
     * @param selector 选择器
     */
    find(selector: string): HTMLElement;
    /**
     * 给当前插件设置行间样式
     * @param name css属性名
     * @param value css属性值
     */
    setStyle(name: string, value: string): void;
    setStyle(styles: object): void;
    setAttr(name: string | object, value?: string): void;

    setHtml(htmlStr: string, callback?: Function): void;

    show(value?: string): void;

    hide(): void;

    appendChild(pdom: HTMLElement | string, child?: HTMLElement): HTMLElement | null;
    render(): string;
  }

  class DefaultPreset {
    constructor();
    plugins: Array<Plugin | BasePlugin>;
    ignores: Array<string>
  }

  class Proxy extends EventEmitter {
    video?: HTMLVideoElement | HTMLAudioElement | HTMLElement;

    // 初始化时添加在video上的属性集合
    videoConfig?: {
      [propName: string]: any;
    };

    // 是否开始播放
    get hasStart(): boolean;
    set hasStart(value: boolean);

    // 设置/返回 自动播放属性
    get autoplay(): boolean;
    set autoplay(value: boolean);

    // 返回当前缓冲的TimeRange对象集合
    get buffered(): TimeRanges;

    get bufferedPoint(): Array<{
      start: number;
      end: number;
    }>;

    // 设置/返回是否跨域
    get crossOrigin(): string | null;
    set crossOrigin(value: string | null);

    // 设置/返回视频播放地址
    get currentSrc(): any;
    set currentSrc(value: any);

    // 设置/返回视频当前播放时间
    get currentTime(): number;
    set currentTime(value: number);

    // 设置/返回视频默认静音
    get defaultMuted(): boolean;
    set defaultMuted(value: boolean);

    // 返回视频时长，单位：秒
    get duration(): number;

    // 返回视频是否播放结束
    get ended(): boolean;

    // 视频错误信息，该错误会返回当前语言的文本
    get error(): string;

    // 是否开启了循环播放
    get loop(): boolean;
    set loop(value: boolean);

    // 静音
    get muted(): boolean;
    set muted(value: boolean);

    // 返回视频的当前网络状态
    get networkState(): string | undefined;

    // 返回当前视频是否是暂停状态
    get paused(): boolean;

    get played(): any;

    get preload(): boolean;
    // set preload(value: boolean): void;

    // 返回视频的就绪状态
    get readyState(): string;

    // 当前视频是否可以seek
    get seekable(): boolean;

    // 当前视频是否处于seeking状态下
    get seeking(): boolean;

    // 设置/返回当前视频的地址
    get src(): any;
    set src(value: any);

    // 设置/返回视频的音量
    get volume(): number;
    set volume(value: number);

    // // 播放器外层容器 DOM
    // root: HTMLElement;

    // // 播放器控制条外层容器 DOM
    // controls: HTMLElement;

    // // 播放器是否处于全屏状态
    // readonly fullscreen: boolean;

    // // 播放器弹幕是否开启
    // readonly bullet: boolean;

    // // 播放器外挂字幕是否开启
    // readonly textTrack: boolean;

    // // 播放器画中画是否开启
    // readonly pip: boolean;

    /**
     * 播放
     *
     */
    play(): Promise<void> | null;

    /**
     * 播放
     *
     */
    pause(): void;

    /**
     * 检测您的浏览器是否能播放不同类型的视频
     *
     * @param type 可播放类型，'video/mp4; codecs="avc1.64001E, mp4a.40.5"'
     */
    canPlayType(type: string): CanPlayTypeResult;

    /**
     *  返回当前的缓冲片段时间范围，start表示缓冲起始时间，end表示缓存截止时间
     *
     */
    getBufferedRange(): Array<{
      start: number;
      end: number;
    }>;

    /**
     * 播放器销毁
     *
     */
    destroy(): void;

    /**
     * 绑定video对象
     */
    attachVideoEvents(el: HTMLElement): void;

    /**
     * 解除绑定video元素
     */
    detachVideoEvents(el: HTMLElement): void;

    // /**
    //  * 添加事件监听
    //  * @param event
    //  * @param callback
    //  */
    // on(event: string, callback: Function): void;

    // /**
    //  * 添加事件监听
    //  * @param event
    //  * @param callback
    //  */
    // once(event: string, callback: Function): void;

    // /**
    //  * 解除事件监听
    //  * @param event
    //  * @param callback
    //  */
    // off(event: string, callback: Function): void;

    /**
     * 解除所有事件监听
     */
    offAll(): void;

    // /**
    //  * 触发某个事件
    //  * @param event
    //  * @param data
    //  */
    // emit(event: string, data: any): void;
  }

  export class SimplePlayer extends Proxy {
    constructor(options: IPlayerOptions);

    /**
     * 当前播放器的配置信息
     */
    config?: IPlayerOptions;

    /**
     * 当前播放器根节点
     */
    readonly root?: HTMLElement;

    /**
     * 控制栏和video不同布局的时候内部容器
     */
    readonly innerContainer?: HTMLElement;

    // 控制栏插件
    readonly controls?: any;

    readonly isReady: boolean;

    // 是否进入正常播放流程
    isPlaying: boolean;

    // 是否处于seeking进行状态
    isSeeking: boolean;

    // 是否处于可播放状态
    isCanplay: boolean;

    // 当前是否处于焦点状态
    isActive: boolean;

    // 当前是否处于css全屏状态
    readonly isCssfullScreen: boolean;

    // 当前是否处于全屏状态
    readonly fullscreen: boolean;

    /**
     * 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
     *
     * @param url 视频地址
     */
    start(url?: string): void;

    /**
     * 重新加载视频
     *
     */
    reload(): void;

    /**
     * 播放器销毁
     *
     * @param isDelDom 是否删除Dom
     */
    destroy(isDelDom?: boolean): void;

    /**
     *  播放器重播，重播的组件就调用了此API
     *
     */
    replay(): void;

    /**
    *  播放器重试，错误重试组件调用了此API
    *
    */
    retry(): void;

    /**
     * 重置播放器根节点css状态类名
     */
    resetClasses(): void;
    /**
      * 播放器进入全屏
      *
      * @param el 要进入的元素，不传默认`player.root`
      */
    getFullscreen(el?: HTMLElement): void;

    /**
      * 播放器退出全屏
      *
      * @param el 要进入的元素，不传默认`player.root`
      */
    exitFullscreen(el?: HTMLElement): void;

    /**
     * 播放器进入样式全屏
     * @param el 要进入的元素，不传默认`player.root`
     */
    getCssFullscreen(el?: HTMLElement): void;

    /**
     * 播放器退出样式全屏
     * @param el 要进入的元素，不传默认`player.root`
     */
    exitCssFullscreen(el?: HTMLElement): void;

    /**
     * 播放器旋转
     *
     * @param clockwise 是否顺时针旋转，默认false
     * @param innerRotate 是否内部旋转，默认true
     * @param times 旋转次数（一次旋转90度），默认1
     */
    rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void;

    /**
     * 注册插件
     * @param plugin 插件构造函数以及插件位置信息
     * @param config 插件配置信息
     */
    registerPlugin(plugin: any, config?: any): any;

    /**
     * 注销插件
     * @param 插件配置
     */
    unRegisterPlugin(plugin: any): any;

    /**
     * 根据插件名称获取插件对象
     * @param pluginName
     */
    getPlugin(pluginName: string): any;

    /**
     * 给播放器根节点添加className
     * @param className
     */
    addClass(className: string): void;

    /**
     * 给播放器根节点移除className
     * @param className
     */
    removeClass(className: string): void;

    /**
     * 验证当前播放器根节点是否有某个className
     * @param className
     */
    hasClass(className: string): boolean;

    /**
     * 给播放器根节点添加某个属性
     * @param key
     * @param value
     */
    setAttribute(key: string, value: string): void;

    /**
     * 给播放器根节点移除某个属性
     * @param key 
     */
    removeAttribute(key: string): void;

    /**
     * 快进/快退
     * @param time
     */
    seek(time: number): void;

    /**
     * 检测某个事件是否在缓冲区域内
     * @param time
     */
    checkBuffer(time: number): boolean;

    /**
     * 根据视频尺寸和容器尺寸调整宽高
     */
    getVideoSize(): void;

    /**
     * 调整video对象显示的偏移情况
     * @param left
     * @param top
     */
    updateObjectPosition(left: number, top: number): void;

    /**
     * 启用某个插件定义的hook
     * @param pluginName 插件名称/key
     * @param hookName
     * @param handler
     */
    usePluginHooks(pluginName: string, hookName: string, handler: (data?: any) => any): void;

    /**
     * 获取当前播放器注册的插件实例列表
     */
    get plugins(): any;

    /**
      * 当前语言
      */
    set lang(lang: string);
    get lang(): string;

    /**
      * 当前语言包
      */
    get i18n(): Object;

    /**
      * 当前语言包包含的信息
      */
    get i18nKeys(): Object;

    /**
     * 当前sdk版本号
     */
    get version(): string;

    /**
     * 设置config中的url
     */
    // set url(url: any);
    // get url(): any;

    /**
     * 设置当前封面图
     */
    set poster(posterUrl: string);

    /**
     * 获取当前是否是全屏切换进行中状态
     */
    get fullscreenChanging(): boolean;

    /**
     * 获取累计播放时长
     */
    get cumulateTime(): number;

    /**
     * 默认preset
     */
    static defaultPreset: any
  }

  export default class PresetPlayer extends SimplePlayer {
    constructor(options: IPlayerOptions);
  }

  export const STATE_CLASS: STATE_CLASS
  export const Events: Events
  export const Util: Util
  export const Sniffer: Sniffer
  export const I18N: I18N
}
