import { getLang } from './utils/util'

/**
 * @typedef { string | MediaStream | Array<{src: string, type?:string, [propName: string]: any}> } IUrl
 */

/**
 * @typedef {{
 *   url: IUrl,
 *   definition: any,
 *   bitrate?: number,
 *   bandwidth?: number,
 *   text?: string | { [propName: string]: any },
 *   iconText?: string | { [propName: string]: any },
 *   [propName: string]: any
 * }} IDefinition
 */

/**
 * @typedef { {
 *   id?: string,
 *   el?: HTMLElement,
 *   url?: IUrl,
 *   domEventType?: 'default' | 'touch' | 'mouse',
 *   nullUrlStart?: boolean,
 *   width?: number | string,
 *   height?: number | string,
 *   fluid?: boolean,
 *   fitVideoSize?: 'fixWidth'|'fixHeight'|'fixed',
 *   videoFillMode?: 'auto'|'fillHeight'|'fillWidth'|'fill'|'cover'|'contain',
 *   volume?: number | { [propName: string]: any },
 *   autoplay?: boolean,
 *   autoplayMuted?: boolean,
 *   loop?: boolean,
 *   isLive?: boolean,
 *   zoom?: number,
 *   videoInit?: boolean,
 *   poster?: string | { [propName: string]: any },
 *   isMobileSimulateMode?: 'mobile' | 'pc',
 *   defaultPlaybackRate?: number,
 *   execBeforePluginsCall?: () => any,
 *   allowSeekAfterEnded?: boolean,
 *   enableContextmenu?: boolean,
 *   closeVideoClick?: boolean,
 *   closeVideoDblclick?: boolean,
 *   closePlayerBlur?: boolean,
 *   closeDelayBlur?: boolean,
 *   leavePlayerTime?: number,
 *   closePlayVideoFocus?: boolean,
 *   closePauseVideoFocus?: boolean,
 *   closeFocusVideoFocus?: boolean,
 *   closeControlsBlur?: boolean,
 *   topBarAutoHide?: boolean,
 *   videoAttributes?: { [propName: string]: any },
 *   startTime?: number,
 *   seekedStatus?: 'play' | 'pause' | 'auto',
 *   miniprogress?: boolean,
 *   disableSwipeHandler?: () => any,
 *   enableSwipeHandler?: () => any,
 *   preProcessUrl?: (url: IUrl, ext?: { [propName: string]: any }) => { url: IUrl, [propName: string]: any },
 *   ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>,
 *   inactive?: number,
 *   lang?: string,
 *   controls?: boolean | { [propName: string]: any },
 *   marginControls?: boolean,
 *   fullscreenTarget?: HTMLElement, // 全屏作用的dom元素
 *   screenShot?: boolean | { [propName: string]: any },
 *   rotate?: boolean | { [propName: string]: any },
 *   pip?: boolean | { [propName: string]: any },
 *   download?: boolean | { [propName: string]: any },
 *   mini?: boolean | { [propName: string]: any },
 *   cssFullscreen?: boolean | { [propName: string]: any },
 *   keyShortcut?: boolean,
 *   presets?: any[],
 *   plugins?: any[]
 *   playbackRate?: number | Array<number> | { [propName: string]: any },
 *   definition?: { list: Array<IDefinition> , defaultDefinition?: IDefinition['definition'], [propName: string]: any},
 *   playsinline?: boolean,
 *   customDuration?: number,
 *   timeOffset?: number,
 *   icons?: { [propName: string]: string | HTMLElement | () => HTMLElement | string },
 *   i18n?: Array<any>,
 *   tabindex?: number,
 *   thumbnail?: {
 *     urls: Array<string>,
 *     pic_num: number,
 *     col: number,
 *     row: number,
 *     height?: number,
 *     width?: number,
 *   },
 *   videoConfig?: { [propName: string]: any },
 *   isHideTips?: boolean,
 *   minWaitDelay?: number,
 *   commonStyle?: {
 *     progressColor?: string,
 *     playedColor?: string,
 *     cachedColor?: string,
 *     sliderBtnStyle?: { [propName: string]: any },
 *     volumeColor?: string
 *   },
 *   [propName: string]: any;
 * } } IPlayerOptions
 */

/**
 * @returns { IPlayerOptions }
 */
export default function getDefaultConfig () {
  return {
    id: '', // container DOM id
    el: null, // container domElement
    isCustomRoot: true, // 是否是自定义root
    url: '', // the url need to play
    domEventType: 'default', // 事件类型，默认值default, touch | mouse
    nullUrlStart: false, // Whether to start broadcasting with empty url
    width: 600, // Width, unit px
    height: 337.5, // height, unit px
    fluid: false,
    fitVideoSize: 'fixed', // adaptation method of container width and height,  fixWidth/fixHeight/fixed/auto
    videoFillMode: 'auto', // video screen fill mode, fillHeight/fillWidth/fill/auto/cover
    volume: 0.6, // default volume or config of plug-in volume
    autoplay: false,
    autoplayMuted: false, // whether to mute the start
    loop: false, // whether to loop
    isLive: false, // whether is live
    zoom: 1,
    videoInit: true, // whether to load the video/audio when initializing
    poster: '', // cover poster url or the configuration object for poster plugin
    isMobileSimulateMode: false, // simulation state, mobile/pc
    defaultPlaybackRate: 1, // default playback rate
    execBeforePluginsCall: null,
    allowSeekAfterEnded: true, // whether to allow seek after the playback ended
    enableContextmenu: true, // whether to allow the right-click function to be enabled
    closeVideoClick: false, // is to close the video’s click/touchend behavior to switch playback and pause
    closeVideoDblclick: false, // is to close the video`s double-click behavior to switch through full screen
    closePlayerBlur: false, // whether to close the behavior of calling player.blur() when the mouse moves out of the player area
    closeDelayBlur: false, // whether to close the automatic hide control bar behavior，only PC
    leavePlayerTime: 3000, // auto hide delay time when the mouse moves out of the player area
    closePlayVideoFocus: false, //  whether to close the behavior of calling player.focus() in the play event callback
    closePauseVideoFocus: false, //  whether to close the behavior of calling player.focus() in the pause event callback
    closeFocusVideoFocus: true, // whether to close the behavior of calling player.media.focus() when start play
    closeControlsBlur: true, // whether to close the behavior of calling player.focus() when the mouse moves out of the control bar area
    topBarAutoHide: true, // Whether to enable auto hide the top bar when player.blur()
    videoAttributes: {}, // video extended attributes
    startTime: 0, // auto play start time
    seekedStatus: 'play', // play state after seek ends play/pause/auto
    miniprogress: false, // whether to enable the mini progress bar
    disableSwipeHandler: () => {
    },
    enableSwipeHandler: () => {
    },
    preProcessUrl: null, // url preprocessing callback
    ignores: [], // list of plug-in names to be disabled
    whitelist: [],
    inactive: 3000, // delay time for the control bar to disappear automatically
    lang: getLang(),
    controls: true,
    marginControls: false, // Whether the control bar is located at the bottom of the video and does not overlap with the video
    fullscreenTarget: null,
    screenShot: false, // whether to enable the screenshot plug-in
    rotate: false, // whether to enable the rotate plug-in
    pip: false, //  whether to enable the picture-in-picture plug-in
    download: false, //  whether to enable the download plug-in
    mini: false, // whether to enable the mini-screen plug-in
    cssFullscreen: true, // whether to enable the web page full-screen plug-in
    keyShortcut: true, // whether to open the shortcut key
    presets: [],
    plugins: [],
    playbackRate: 1,
    definition: { list: [] },
    playsinline: true,
    customDuration: 0, // User-defined duration
    timeOffset: 0, // currentTime offset
    icons: {},
    i18n: [],
    tabindex: 0, // The order of mediaElement focus
    thumbnail: null, // Preview image configuration
    videoConfig: {}, // video attribute configuration
    isHideTips: false, // if hide the icon tips
    minWaitDelay: 200, // The min threshold of waiting delay time
    commonStyle: { // General style configuration
      progressColor: '', // Background color of progress bar
      playedColor: '', // The background color of played part in the progress bar
      cachedColor: '', // The background color of cached part in the progress bar
      sliderBtnStyle: {}, // progress bar slider style
      volumeColor: ''
    }
  }
}
