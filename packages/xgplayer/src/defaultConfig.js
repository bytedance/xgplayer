/**
 * @typedef { {
 *   id?: str, // 播放器容器id
 *   el?: HTMLElement, // 播放器容器dom
 *   url?: any, // 播放url
 *   nullUrlStart?: boolean, // 空url起播
 *   width?: number | string, // 播放器宽度,单位px
 *   height?: number | string, // 播放器高度,单位px
 *   fluid?: boolean, // 是否启用流式布局
 *   fitVideoSize?: 'fixWidth'|'fixHeight'|'fixed', // 播放器容器适配方式 fixWidth/fixHeight/fixed
 *   videoFillMode?: 'auto'|'fillHeight'|'fillWidth'|'fill'|'cover', // video画面填充模式 fillHeight/fillWidth/fill/auto
 *   volume?: number, // 默认音量
 *   autoplay?: number, // 是否自动播放
 *   autoplayMuted?: number, // 是否自动静音
 *   loop?: number, // 是否循环播放
 *   videoInit?: number, // 是否优先显示视频首帧
 *   poster?: string, // 封面图地址
 *   isMobileSimulateMode?: false, // 模拟状态,取值mobile/pc
 *   defaultPlaybackRate?: number, // 默认播放倍数
 *   execBeforePluginsCall?: Function, // 默认插件组装前回调
 *   allowSeekAfterEnded?: boolean, // 播放结束之后是否允许seek
 *   enableContextmenu?: boolean, // 启用右键菜单
 *   closeVideoClick?: boolean, // 是否通过video的click/touchend行为切换播放暂停
 *   closeVideoDblclick?: boolean, // 是否通过双击行为触发全屏切换
 *   closePlayerBlur?: boolean, // 是否关闭鼠标移出播放器范围触发blur操作
 *   leavePlayerTime?: number, // 延迟触发时间
 *   closePlayVideoFocus?: boolean, // 是否关闭play时触发focus
 *   closePauseVideoFocus?: boolean, // 是否关闭pause时触发focus
 *   closeFocusVideoFocus?: boolean, // 是否关闭播放器移动鼠标时触发focus
 *   closeDelayBlur?: boolean, // 是否关闭自动隐藏控制条
 *   closeControlsBlur?: boolean, // 鼠标移出播放器控制条范围时触发focus事件
 *   videoAttributes?: { [propName: string]: any }, // video扩展属性
 *   startTime?: number, // 自动播放起始时间点
 *   seekedStatus?: 'play' | 'pause' | 'auto', // seek结束之后播放状态 play/pause/auto
 *   miniprogress?: boolean, // 是否启用迷你控制栏
 *   disableSwipeHandler?: Function,
 *   enableSwipeHandler?:Function,
 *   ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>;, // 禁用插件列表
 *   whitelist?: Array<string>,
 *   inactive?: number, // 进度条自动消失延时
 *   lang?: string,
 *   controls?: boolean,
 *   marginControls?: boolean, // 控制栏是否位于画面底部，不与画面重合
 *   screenShot?: boolean | { [propName: string]: any }, // 截图插件
 *   rotate?: boolean | { [propName: string]: any }, // 旋转插件
 *   pip?: boolean | { [propName: string]: any }, // pip插件
 *   mini?: boolean | { [propName: string]: any }, // 迷你小窗插件
 *   cssFullscreen?: boolean | { [propName: string]: any }, // 页面全屏
 *   keyShortcut?: boolean, // 是否开启快捷键
 *   presets?: any[],
 *   plugins?: any[]
 *   playbackRate?: number,
 *   playsinline?: boolean,
 *   customDuration?: number, // 用户自定义时长
 *   timeOffset?: number, // 当前时长偏移
 *   icons?: { [propName: string]: any }, // 按钮配置
 *   i18n?: Array<any>,
 *   commonStyle?: { // 用于配置一些通用样式结构
 *     progressColor?: string, // 进度条底色
 *     playedColor?: string, // 播放完成部分进度条底色
 *     cachedColor?: string, // 缓存部分进度条底色
 *     sliderBtnStyle?: { [propName: string]: any }, // 进度条滑块样式
 *     volumeColor?: string
 *   },
 *   [propName: string]: any; // 扩展定义
 * } } IPlayerConfigs
 */

/**
 *
 * @returns IPlayerConfigs
 */
export default function getDefaultConfig () {
  return {
    id: '', // 播放器容器id
    el: null, // 播放器容器dom
    url: '', // 播放url
    nullUrlStart: false, // 空url起播
    width: 600, // 播放器宽度,单位px
    height: 337.5, // 播放器高度,单位px
    fluid: false, // 是否启用流式布局
    fitVideoSize: 'fixed', // 播放器容器适配方式 fixWidth/fixHeight/fixed
    videoFillMode: 'auto', // video画面填充模式 fillHeight/fillWidth/fill/auto/cover
    volume: 0.6, // 默认音量
    autoplay: false, // 是否自动播放
    autoplayMuted: false, // 是否自动静音
    loop: false, // 是否循环播放
    videoInit: true, // 是否优先显示视频首帧
    poster: '', // 封面图地址
    isMobileSimulateMode: false, // 模拟状态,取值mobile/pc
    defaultPlaybackRate: 1, // 默认播放倍数
    execBeforePluginsCall: null, // 默认插件组装前回调
    allowSeekAfterEnded: true, // 播放结束之后是否允许seek
    enableContextmenu: false, // 启用右键菜单
    closeVideoClick: false, // 是否通过video的click/touchend行为切换播放暂停
    closeVideoDblclick: false, // 是否通过双击行为触发全屏切换
    closePlayerBlur: false, // 是否关闭鼠标移出播放器范围触发blur操作
    leavePlayerTime: 3000, // 延迟触发时间
    closePlayVideoFocus: false, // 是否关闭play时触发focus
    closePauseVideoFocus: false, // 是否关闭pause时触发focus
    closeFocusVideoFocus: false, // 是否关闭播放器移动鼠标时触发focus
    closeDelayBlur: false, // 是否关闭自动隐藏控制条
    closeControlsBlur: false, // 鼠标移出播放器控制条范围时触发focus事件
    videoAttributes: {}, // video扩展属性
    startTime: 0, // 自动播放起始时间点
    // isSeekedPlay: true, // seek结束之后是否默认播放
    seekedStatus: 'play', // seek结束之后播放状态 play/pause/auto
    miniprogress: false, // 是否启用迷你控制栏
    disableSwipeHandler: () => {
    },
    enableSwipeHandler: () => {
    },
    // 是否删除
    ignores: [],
    whitelist: [],
    inactive: 3000, // 进度条自动消失延时
    lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
    controls: true,
    marginControls: false, // 控制栏是否位于画面底部，不与画面重合
    controlsList: [],
    // 内置插件相关配置
    screenShot: false, // 截图插件
    rotate: false, // 旋转插件
    pip: false, // pip插件
    mini: false, // 迷你小窗插件
    cssFullscreen: true, // 页面全屏
    keyShortcut: true, // 是否开启快捷键
    presets: [],
    plugins: [],
    playbackRate: 1,
    playsinline: true,
    customDuration: 0, // 用户自定义时长
    timeOffset: 0, // 当前时长偏移
    icons: {},
    i18n: [],
    commonStyle: { // 用于配置一些通用样式结构
      progressColor: '', // 进度条底色
      playedColor: '', // 播放完成部分进度条底色
      cachedColor: '', // 缓存部分进度条底色
      sliderBtnStyle: '', // 进度条滑块样式
      volumeColor: ''
    }
  }
}
