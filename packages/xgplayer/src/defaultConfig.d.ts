/* eslint-disable no-undef */
/* global HTMLElement */
/**
 * 插件基础配置
 */
interface BasePluginConfig {
  root?: HTMLElement; // 【可选】插件挂载的dom
  position?: String; // [可选]插件挂载的dom
  index?: Number; // [可选]插件在播放器中挂载的位置
}

/**
 * 底部控制栏配置
 */
type ControlsConfig = BasePluginConfig & {
  disable?: Boolean; // [可选]是否禁用插件交互行为
  autoHide?: Boolean; // 是否自动隐藏, 默认true
  mode?: String; // 显示模式， flex和normal, 默认normal
  initShow?: Boolean // 是否初始化的时候就显示, 默认false
}

/**
 * pc插件配置
 */
type PCConfig = BasePluginConfig & {
  disableContextmenu?: Boolean; // [可选]是否禁用右键功能
}

/**
 * mobile插件配置
 */
type MobileConfig = {
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
type ProgressConfig = BasePluginConfig & {
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
type IsPot = {
  time: Number; // 进度条在此时间戳打点 单位为s
  text?: String | Number; // 打点处的自定义文案
  id: Number; // 标记唯一标识，用于删除的时候索引
  duration: Number; // 进度条标识点的时长 默认1s【可选】单位为s
  color?: String; // 进度条标识点的显示颜色【可选】默认'#fff'
  style?: Object; // 指定样式
  width?: Number;
  height?: Number;
}

type ProgressPreviewConfig = {
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
type ThumbnailConfig = {
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
type DefinitionItem = {
  definition: String | Number; // 每个清晰度对应的标记
  url?: String; // 清晰度播放地址
  text: String | {};
  iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
}
type DefinitionConfig = BasePluginConfig & {
  disable?: Boolean; // [可选]是否禁用插件交互行为
  list: Array<DefinitionItem>
}

/**
 * 倍速插件切换插件配置
 */
type PlayBackRateItem = {
  rate?: Number; // 每个清晰度对应的标记
  text: String | {};
  iconText?: String | {}; // 每个清晰度对应切换之后在切换按钮的显示文案
}
type PlayBackRateConfig = BasePluginConfig & {
  disable?: Boolean; // [可选]是否禁用插件交互行为
  list: Array<PlayBackRateItem> | Array<Number>
}

/**
 * PIP插件配置
 */
type PIPConfig = BasePluginConfig & {
  showIcon?: Boolean; // [可选]是否显示切换按钮
}

/**
 * Poster插件配置
 */
type PosterConfig = {
  isEndedShow?: Boolean; // [可选]播放结束的时候是否显示，默认true
  hideCanplay?: Boolean; // [可选]cnaplay 时间大于1的时候才隐藏,默认false
  poster: String; // 封面图地址
}

/**
 * enter插件配置
 */
type EnterConfig = BasePluginConfig & {
  innerHtml?: String; // [可选]html字符串
}

/**
 * 全屏插件配置
 */
type FullscreenConfig = BasePluginConfig & {
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
type KeyCodeItem = {
  [propName: string]: {
    keyCode: Number; // 【必选】要定义的快捷键按键数字
    action: String | Function; // 【必选】按键对应的
    disable?: Boolean; // 是否禁用
  }
}
type KeyboardConfig = {
  seekStep?: Number; // [可选]快捷键快进/快退每次操作时长，默认10s
  keyCodeMap?: KeyCodeItem; // [可选]是否启用旋转全屏
  disable?: Boolean; // [可选]是否禁用插件交互行为
}

/**
 * 迷你小窗配置
 */
type MiniScreenConfig = {
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
type VolumeConfig = BasePluginConfig & {
  disable?: Boolean; // [可选]是否禁用插件交互行为
  default?: Number // [可选]默认音量
}

/**
 * 外挂字幕插件配置
 */

type Texttrack = {
  src: String; // 外挂字幕地址
  text?: String | Object; // 外挂字幕地址
  language?: String; // 外挂字幕地址
  default?: Boolean; // 是否为默认字幕
  id?: Number | String
}

type TexttrackStyle = {
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

type TextTrackConfig = BasePluginConfig & {
  list: Array<Texttrack>; // [必选]字幕列表
  isDefaultOpen?: Boolean; // [可选] 是否默认开启字幕
  style: TexttrackStyle;
  closeText: {
    text: String,
    iconText: String | Object
  };
}

type StartConfig = {
  isShowPause?: Boolean; // 暂停是否常驻, 默认false
  isShowEnd?: Boolean; // 播放结束常驻, 默认false
  disableAnimate?: Boolean; // 禁用点击动画， 默认false
  mode?: 'hide' | 'show' | 'auto'// 控制模式: hide 常驻: show 跟随：auto, 默认hide
}

type RotateConfig = BasePluginConfig & {
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

interface DanmuCommentOptions {
  duration: number;
  id: any;
  start?: number;
  prior?: boolean;
  color?: boolean;
  txt: string;
  style?: Record<string, string | number>;
  mode?: DanmuModelType;
}

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

interface IPlayerConfigs {

  // 选择器
  id?: string;

  // DOM实例
  // eslint-disable-next-line no-undef
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
  videoFillMode?: 'fillHeight' | 'fillWidth' | 'fill' | 'auto';

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
  isMobileSimulateMode?: boolean;

  // 倍速播放
  // 播放器支持设置视频的当前播放速度。可通过defaultPlaybackRate设置初始速度。
  playbackRate?: Boolean | Array<Number> | PlayBackRateConfig;

  // 默认播放速度
  defaultPlaybackRate?: number;

  // 预览本地视频
  // eslint-disable-next-line no-undef
  preview?: { uploadEl?: HTMLElement };

  // 进度条特殊点标记
  progressDot?: Array<IsPot>;

  // 键盘快捷键 默认值：'on'
  keyShortcut?: boolean;

  // 插件生效前执行
  execBeforePluginsCall?: () => void;

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
  customConfig?: {
    [propName: string]: any;
  };

  // 关闭控制条， 默认true
  controls?: Boolean | ControlsConfig;

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

  // 【即将废弃，后续使用seekedStatus】seek结束之后是否默认播放
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
  textTrackStyle?: TexttrackStyle;

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

  // 移动端手势插件配置
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

  // pc相关插件配置
  pc?: PCConfig;

  // video属性，该配置会直接添加到video上
  videoConfig?: any;

  // 扩展定义
  [propName: string]: any;
}

export default IPlayerConfigs
