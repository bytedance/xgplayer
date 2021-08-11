declare module "utils/debug" {
    namespace XG_DEBUG {
        namespace config {
            const debug: boolean;
        }
        function logInfo(message: any, ...optionalParams: any[]): void;
        function logWarn(message: any, ...optionalParams: any[]): void;
        function logError(message: any, ...optionalParams: any[]): void;
    }
    export function bindDebug(player: any): void;
    export { XG_DEBUG as default };
}
declare module "utils/xgplayerTimeRange" {
    export default class XgplayerTimeRange {
        constructor(bufferedList: any);
        bufferedList: any;
        start(index: any): any;
        end(index: any): any;
        get length(): any;
    }
}
declare module "utils/util" {
    export default util;
    namespace util {
        /**
         *
         * @param { string } el
         * @param { string } [tpl=]
         * @param { {[propName: string]: any }} [attrs={}]
         * @param { string } [cname='']
         * @returns { HTMLElement | null }
         */
        function createDom(el?: string, tpl?: string, attrs?: {
            [propName: string]: any;
        }, cname?: string): HTMLElement;
        /**
         *
         * @param { string } html
         * @param { string } [attrs={}]
         * @param { string } [classname=""]
         * @returns { HTMLElement | null }
         */
        function createDomFromHtml(html: string, attrs?: string, classname?: string): HTMLElement;
        /**
         *
         * @param { HTMLElement } el
         * @param { string } className
         * @returns { boolean }
         */
        function hasClass(el: HTMLElement, className: string): boolean;
        /**
         *
         * @param { HTMLElement } el
         * @param { string } className
         * @returns { void }
         */
        function addClass(el: HTMLElement, className: string): void;
        /**
         *
         * @param { HTMLElement } el
         * @param { string } className
         * @returns { void }
         */
        function removeClass(el: HTMLElement, className: string): void;
        /**
         *
         * @param { HTMLElement } el
         * @param { string } className
         * @returns { void }
         */
        function toggleClass(el: HTMLElement, className: string): void;
        /**
         *
         * @param { string | Object } args0
         * @param { string } [className]
         * @returns { string }
         */
        function classNames(...args: any[]): string;
        /**
         *
         * @param { HTMLElement } el
         * @param { string } sel
         * @returns { HTMLElement }
         */
        function findDom(el: HTMLElement, sel: string): HTMLElement;
        /**
         *
         * @param { HTMLElement } dom
         * @param { string } key
         * @returns { any }
         */
        function getCss(dom: HTMLElement, key: string): any;
        function padStart(str: any, length: any, pad: any): string;
        /**
         *
         * @param { Number } time
         * @returns { string }
         */
        function format(time: number): string;
        /**
         *
         * @param { Object } e
         * @returns { Object }
         */
        function event(e: any): any;
        /**
         *
         * @param { any } obj
         * @returns { string }
         */
        function typeOf(obj: any): string;
        /**
         *
         * @param { any } dst
         * @param { any } src
         * @returns { any }
         */
        function deepCopy(dst: any, src: any): any;
        /**
         *
         * @param { any } dst
         * @param { any } src
         * @returns { any }
         */
        function deepMerge(dst: any, src: any): any;
        function getBgImage(el: any): string;
        /**
         *
         * @param {  HTMLElement } dom
         * @returns { HTMLElement | null }
         */
        function copyDom(dom: HTMLElement): HTMLElement;
        /**
         *
         * @param { any } context
         * @param { string } eventName
         * @param { function } intervalFunc
         * @param { number } frequency
         */
        function setInterval(context: any, eventName: string, intervalFunc: Function, frequency: number): void;
        /**
         *
         * @param { any } context
         * @param { string } eventName
         * @returns { void }
         */
        function clearInterval(context: any, eventName: string): void;
        /**
         *
         * @param { any } context
         * @param { function } fun
         * @param { number } time
         * @returns { number }
         */
        function setTimeout(context: any, fun: Function, time: number): number;
        /**
         *
         * @param { any } context
         * @param { number } id
         */
        function clearTimeout(context: any, id: number): void;
        /**
         *
         * @param { any } context
         */
        function clearAllTimers(context: any): void;
        /**
         *
         * @param { string } name
         * @param { string } imgUrl
         * @param { number } [width]
         * @param { number } [height]
         * @returns { HTMLElement }
         */
        function createImgBtn(name: string, imgUrl: string, width?: number, height?: number): HTMLElement;
        /**
         *
         * @param { string } hex
         * @param { string | number } alpha
         * @returns { string }
         */
        function Hex2RGBA(hex: string, alpha: string | number): string;
        /**
         *
         * @returns { HTMLElement | null }
         */
        function getFullScreenEl(): HTMLElement;
        /**
         * @param { any }
         * @returns { boolean }
         */
        function checkIsFunction(fun: any): boolean;
        /**
         * @param { any }
         * @returns { boolean }
         */
        function checkIsObject(obj: any): boolean;
        /**
         * @param { HTMLElement }
         */
        function hide(dom: any): void;
        /**
         * @param { HTMLElement }
         * @param { block | flex | inline-block | inline-flex } [display]
         */
        function show(dom: any, display: any): void;
        /**
         *
         * @param { any } val
         * @returns { boolean }
         */
        function isUndefined(val: any): boolean;
        /**
         *
         * @param { HTMLElement } dom
         * @param { string } [text]
         * @returns
         */
        function setStyleFromCsstext(dom: HTMLElement, text?: string): void;
        /**
         *
         * @param { HTMLElement } dom
         * @param { Array<string> } [list] attribute names to filter
         * @returns { {} | {[propName: string]: any;} }
         */
        function filterStyleFromText(dom: HTMLElement, list?: string[]): {} | {
            [propName: string]: any;
        };
        /**
         *
         * @param { HTMLElement } dom
         * @returns { {} | {[propName: string]: any;} }
         */
        function getStyleFromCsstext(dom: HTMLElement): {} | {
            [propName: string]: any;
        };
        function preloadImg(url: any, onload?: () => void, onerror?: () => void): void;
        function stopPropagation(e: any): void;
        function scrollTop(): number;
        function scrollLeft(): number;
        function checkTouchSupport(): boolean;
        function getBuffered2(vbuffered: any, maxHoleDuration?: number): XgplayerTimeRange;
        /**
         * @description css中有zoom的时候，位移会等比缩放，但是元素的宽高不会等比缩放，所以通过该api做统一
         * https://bugs.chromium.org/p/chromium/issues/detail?id=429140#c8
         * @param {Events} e
         * @param {number} zoom
         * @returns
         */
        function getEventPos(e: any, zoom?: number): {
            x: number;
            y: number;
            clientX: number;
            clientY: number;
            offsetX: number;
            offsetY: number;
            pageX: number;
            pageY: number;
        };
    }
    import XgplayerTimeRange from "utils/xgplayerTimeRange";
}
declare module "utils/sniffer" {
    export default sniffer;
    export type ISniffer = {
        device: 'pc' | 'mobile';
        browser: 'ie' | 'firefox' | 'chrome' | 'opera' | 'safari';
        os: {
            isTablet: boolean;
            isPhone: boolean;
            isIpad: boolean;
            isIos: boolean;
            isAndroid: boolean;
            isPc: boolean;
            isSymbian: boolean;
            isWindowsPhone: boolean;
            isFireFox: boolean;
        };
        isWeixin: boolean;
    };
    /**
     * @type ISniffer
     */
    const sniffer: ISniffer;
}
declare module "version" {
    export default version;
    /**
     * @type {string}
     * */
    const version: string;
}
declare module "error" {
    export type Player = import("player").default;
    export type IError = {
        [propName: string]: any;
        playerVersion: string;
        domain: string;
        currentTime: number;
        duration: number;
        ended: boolean;
        readyState: number;
        networkState: number;
        src: any;
        type: string;
        code: number;
        message: string;
        mediaError?: {
            code: number;
            message?: string;
        };
        originError?: any;
        url?: any;
    };
    /**
     * @typedef { {
     *   playerVersion: string,
     *   domain: string,
     *   currentTime: number,
     *   duration: number,
     *   ended: boolean,
     *   readyState: number,
     *   networkState: number,
     *   src: any,
     *   type: string,
     *   code: number,
     *   message: string,
     *   mediaError?: {
     *     code: number,
     *     message?: string
     *   },
     *   originError?: any,
     *   url?: any,
     *   [propName: string]: any
     * } } IError
     */
    /**
     * @type { IError }
     */
    class Errors {
        /**
         *
         * @param { Player } player
         * @param { {
         * errorType: string,
         * errorCode: number,
         * errorMessage: string,
         * originError: any,
         * ext: { [propName: string]: any; }
         * } } errorInfo
         * @returns
         */
        constructor(player: Player, errorInfo?: {
            errorType: string;
            errorCode: number;
            errorMessage: string;
            originError: any;
            ext: {
                [propName: string]: any;
            };
        }, ...args: any[]);
    }
    export namespace ErrorTypes {
        namespace network {
            const code: number;
            const msg: string;
            const remark: string;
        }
        namespace mse {
            const code_1: number;
            export { code_1 as code };
            const msg_1: string;
            export { msg_1 as msg };
            const remark_1: string;
            export { remark_1 as remark };
        }
        namespace parse {
            const code_2: number;
            export { code_2 as code };
            const msg_2: string;
            export { msg_2 as msg };
            const remark_2: string;
            export { remark_2 as remark };
        }
        namespace format {
            const code_3: number;
            export { code_3 as code };
            const msg_3: string;
            export { msg_3 as msg };
            const remark_3: string;
            export { remark_3 as remark };
        }
        namespace decoder {
            const code_4: number;
            export { code_4 as code };
            const msg_4: string;
            export { msg_4 as msg };
            const remark_4: string;
            export { remark_4 as remark };
        }
        namespace runtime {
            const code_5: number;
            export { code_5 as code };
            const msg_5: string;
            export { msg_5 as msg };
            const remark_5: string;
            export { remark_5 as remark };
        }
        namespace timeout {
            const code_6: number;
            export { code_6 as code };
            const msg_6: string;
            export { msg_6 as msg };
            const remark_6: string;
            export { remark_6 as remark };
        }
        namespace other {
            const code_7: number;
            export { code_7 as code };
            const msg_7: string;
            export { msg_7 as msg };
            const remark_7: string;
            export { remark_7 as remark };
        }
    }
    /**
     * @typedef { import ('./player').default } Player
     */
    export const ERROR_TYPE_MAP: {
        1: string;
        2: string;
        3: string;
        4: string;
    };
    export { Errors as default };
}
declare module "events" {
    export const PLAY: "play";
    export const PLAYING: "playing";
    export const ENDED: "ended";
    export const PAUSE: "pause";
    export const ERROR: "error";
    export const SEEKING: "seeking";
    export const SEEKED: "seeked";
    export const TIME_UPDATE: "timeupdate";
    export const WAITING: "waiting";
    export const CANPLAY: "canplay";
    export const CANPLAY_THROUGH: "canplaythrough";
    export const DURATION_CHANGE: "durationchange";
    export const VOLUME_CHANGE: "volumechange";
    export const LOADED_DATA: "loadeddata";
    export const RATE_CHANGE: "ratechange";
    export const PROGRESS: "progress";
    export const LOAD_START: "loadstart";
    export const EMPTIED: "emptied";
    export const STALLED: "stalled";
    export const SUSPEND: "suspend";
    export const ABORT: "abort";
    export const BUFFER_CHANGE: "bufferedChange";
    export const PLAYER_FOCUS: "focus";
    export const PLAYER_BLUR: "blur";
    export const READY: "ready";
    export const URL_NULL: "urlNull";
    export const AUTOPLAY_STARTED: "autoplay_started";
    export const AUTOPLAY_PREVENTED: "autoplay_was_prevented";
    export const COMPLETE: "complete";
    export const REPLAY: "replay";
    export const DESTROY: "destroy";
    export const URL_CHANGE: "urlchange";
    export const FULLSCREEN_CHANGE: "fullscreen_change";
    export const CSS_FULLSCREEN_CHANGE: "cssFullscreen_change";
    export const MINI_STATE_CHANGE: "mini_state_change";
    export const DEFINITION_CHANGE: "definition_change";
    export const BEFORE_DEFINITION_CHANGE: "before_definition_change";
    export const AFTER_DEFINITION_CHANGE: "after_definition_change";
    export const SEI_PARSED: "SEI_PARSED";
    export const RETRY: "retry";
    export const VIDEO_RESIZE: "video_resize";
    export const PIP_CHANGE: "pip_change";
    export const ROTATE: "rotate";
    export const SCREEN_SHOT: "screenShot";
    export const PLAYNEXT: "playnext";
    export const SHORTCUT: "shortcut";
    export const XGLOG: "xglog";
    export const USER_ACTION: "user_action";
}
declare module "proxy" {
    export default VideoProxy;
    export type IVideoProxy = {
        duration: number;
        currentTime: number;
        muted: boolean;
        defaultMuted: boolean;
        volume: number;
        playbackRate: number;
        defaultPlaybackRate: number;
        autoplay: boolean;
        readonly paused: boolean;
        readonly ended: boolean;
        readonly networkState: number;
        readonly readyState: number;
        readonly seeking: boolean;
        src: any;
        play: Function;
        pause: Function;
    };
    class VideoProxy {
        /**
         * @param {any} options
         */
        constructor(options: any);
        /**
         * @private
         */
        private _hasStart;
        /**
         * @private
         */
        private _currentTime;
        /**
         * @private
         */
        private _duration;
        /**
         * @description 初始化时添加在video上的属性集合
         * @type { {[propName: string]: any; } }
         */
        videoConfig: {
            [propName: string]: any;
        };
        /**
         * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null }
         */
        video: HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null;
        /**
         * @private
         */
        private _interval;
        /**
         * @readonly
         */
        readonly videoEventMiddleware: {};
        /**
         * @description set middleware
         * @param { {[propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
         */
        setEventsMiddleware(middlewares: {
            [propName: string]: (e: {
                player: any;
                eventName: string;
            }, callback: () => void) => any;
        }): void;
        /**
         * @description remove middleware
         * @param { { [propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
         */
        removeEventsMiddleware(middlewares: {
            [propName: string]: (e: {
                player: any;
                eventName: string;
            }, callback: () => void) => any;
        }): void;
        /**
         * Add media eventListener to the video object
         * @param { any } [video]
         */
        attachVideoEvents(video?: any): void;
        /**
         * @private
         */
        private _evHandlers;
        /**
         * @description remove media eventListener from the video object
         * @param { any } [video]
         */
        detachVideoEvents(video?: any): void;
        /**
         * @description Media Error handler
         * @param { string } eventName
         */
        errorHandler(name: any, error?: any): void;
        set hasStart(arg: boolean);
        /**
         * @type { boolean }
         * @description 是否开始播放
         */
        get hasStart(): boolean;
        destroy(): void;
        /**
         *
         * @returns {  Promise<void> | null }
         */
        play(): Promise<void> | null;
        pause(): void;
        /**
         *
         * @param { string } type
         * @returns { boolean }
         */
        canPlayType(type: string): boolean;
        /**
         *
         * @param { any } [buffered]
         * @returns { Array<number> }
         */
        getBufferedRange(buffered?: any): Array<number>;
        /**
         * @type { boolean }
         * @description 设置/返回 自动播放属性
         */
        set autoplay(arg: any);
        get autoplay(): any;
        /**
         * @type { TimeRanges }
         * @description  返回当前缓冲的TimeRange对象集合
         */
        get buffered(): TimeRanges;
        /**
         * @type { Array<{start: number, end: number}> }
         * @description  返回当前自定义的缓存列表
         */
        get buffered2(): {
            start: number;
            end: number;
        }[];
        /**
         * @type { {start: number, end: number} }
         */
        get bufferedPoint(): {
            start: number;
            end: number;
        };
        set crossOrigin(arg: string);
        /**
         * @type { string}
         * @description 设置/返回是否跨域
         * */
        get crossOrigin(): string;
        set currentSrc(arg: string);
        /**
         * @type { string }
         * @description 设置/返回视频播放地址
         * */
        get currentSrc(): string;
        set currentTime(arg: number);
        /**
         * @type { number }
         * @description 设置/返回视频当前播放时间
         * */
        get currentTime(): number;
        set defaultMuted(arg: boolean);
        /**
         * @type { boolean }
         * 设置/返回视频默认静音
         * */
        get defaultMuted(): boolean;
        /**
         * @type { number }
         * @description 返回视频时长，单位：s
         * */
        get duration(): number;
        /**
         * @type { boolean }
         * @description  回视频是否播放结束
         * */
        get ended(): boolean;
        /**
         * @type { MEDIA_ERR_ABORTED | MEDIA_ERR_NETWORK | MEDIA_ERR_DECODE | MEDIA_ERR_SRC_NOT_SUPPORTED }
         * @description  频错误信息，该错误会返回当前语言的文本
         */
        get error(): any;
        set loop(arg: boolean);
        /**
         * @type { boolean }
         * @description 否开启了循环播放
         */
        get loop(): boolean;
        set muted(arg: boolean);
        /**
         * @type { boolean }
         * @description 静音
         */
        get muted(): boolean;
        /**
         * @type { NETWORK_EMPTY | NETWORK_IDLE | NETWORK_LOADING | NETWORK_NO_SOURCE}
         * @description  返回视频的当前网络状态
         */
        get networkState(): any;
        /**
         * @type { boolean }
         * @description  回当前视频是否是暂停状态
         */
        get paused(): boolean;
        set playbackRate(arg: number);
        /**
         * @type { number }
         * @description 返回/设置倍速
         */
        get playbackRate(): number;
        /**
         * @type { TimeRanges }
         */
        get played(): TimeRanges;
        set preload(arg: boolean);
        /**
         * @type { boolean }
         */
        get preload(): boolean;
        /**
         * @type { string }
         * @description 回视频的就绪状态
         */
        get readyState(): string;
        /**
         * @type { boolean }
         * @description 当前视频是否可以seek
         */
        get seekable(): boolean;
        /**
         * @type { boolean }
         * @description 当前视频是否处于seeking状态下
         */
        get seeking(): boolean;
        set src(arg: any);
        /**
         * @type { any }
         * @description 设置/返回当前视频的地址
         */
        get src(): any;
        set volume(arg: number);
        /**
         * @type { number }
         * @description 设置/返回视频的音量
         */
        get volume(): number;
        /** ******************* 以下api只有申明作用,具体实现依赖EventEmitter ******************/
        /**
         *
         * @param { string } event
         * @param { any } [data]
         * @returns
         */
        emit(event: string, data?: any): void;
        /**
         *
         * @param { string } event
         * @param { (data?: any) => any } callback
         * @returns
         */
        on(event: string, callback: (data?: any) => any): void;
        /**
         *
         * @param { string } event
         * @param { (data?: any) => any } callback
         * @returns
         */
        once(event: string, callback: (data?: any) => any): void;
        /**
         *
         * @param { string } event
         * @param { (data?: any) => any } callback
         * @returns
         */
        off(event: string, callback: (data?: any) => any): void;
        offAll(): void;
    }
}
declare module "utils/database" {
    export default INDEXDB;
    class INDEXDB {
        constructor(mydb?: {
            name: string;
            version: number;
            db: any;
            ojstore: {
                name: string;
                keypath: string;
            };
        });
        indexedDB: any;
        IDBKeyRange: any;
        myDB: {
            name: string;
            version: number;
            db: any;
            ojstore: {
                name: string;
                keypath: string;
            };
        };
        openDB(callback: any): void;
        deletedb(): void;
        closeDB(): void;
        addData(storename: any, data: any): void;
        putData(storename: any, data: any): void;
        getDataByKey(storename: any, key: any, callback: any): void;
        deleteData(storename: any, key: any): void;
        clearData(storename: any): void;
    }
}
declare module "constant" {
    export const FULLSCREEN_EVENTS: string[];
    export const GET_FULLSCREEN_API: string[];
    export const EXIT_FULLSCREEN_API: string[];
}
declare module "plugin/hooksDescriptor" {
    /**
     * hook装饰器，为某个实例添加usePluginHooks/hook/useHooks的能力
     * @param { any } instance
     * @param { Array<string> } [hookNames]
     */
    function hooksDescriptor(instance: any, presetHooks?: any[]): void;
    /**
     * 给某个处理函数添加hook能力
     * @param { string } hookName
     * @param { Function } handler
     * @param { { pre?: any, next?:any } } preset
     * {
     *   pre: () => { // run beafore hook},
     *   next: () => { // run after hook return}
     * }
     */
    export function hook(hookName: string, handler: Function, preset?: {
        pre?: any;
        next?: any;
    }): any;
    export class hook {
        /**
         * 给某个处理函数添加hook能力
         * @param { string } hookName
         * @param { Function } handler
         * @param { { pre?: any, next?:any } } preset
         * {
         *   pre: () => { // run beafore hook},
         *   next: () => { // run after hook return}
         * }
         */
        constructor(hookName: string, handler: Function, preset?: {
            pre?: any;
            next?: any;
        });
        __hooks: {};
    }
    /**
     * 添加hooks
     * @param { string } 支持的hook名称
     * @param { Function } 具体的处理函数
     */
    export function useHooks(hookName: any, handler: any): boolean;
    /**
     * 给某个插件添加hooks
     * @param { string } pluginName
     * @param  {...any} args
     */
    export function usePluginHooks(pluginName: string, ...args: any[]): any;
    /**
     * 移除hook
     * @param { string } hookName
     * @param { (plugin: any, ..args) => {} } handler
     * @returns void
     */
    export function removeHooks(hookName: string, handler: (plugin: any, args: any) => {}): void;
    export function delHooksDescriptor(instance: any): void;
    export function runHooks(obj: any, hookName: any, handler: any, ...args: any[]): any;
    export { hooksDescriptor as default };
}
declare module "defaultConfig" {
    /**
     * @typedef { {
     *   id?: string, // 播放器容器id
     *   el?: HTMLElement, // 播放器容器dom
     *   url?: any, // 播放url
     *   nullUrlStart?: boolean, // 空url起播
     *   width?: number | string, // 播放器宽度,单位px
     *   height?: number | string, // 播放器高度,单位px
     *   fluid?: boolean, // 是否启用流式布局
     *   fitVideoSize?: 'fixWidth'|'fixHeight'|'fixed', // 播放器容器适配方式 fixWidth/fixHeight/fixed
     *   videoFillMode?: 'auto'|'fillHeight'|'fillWidth'|'fill'|'cover', // video画面填充模式 fillHeight/fillWidth/fill/auto
     *   volume?: number | { [propName: string]: any }, // 默认音量
     *   autoplay?: boolean, // 是否自动播放
     *   autoplayMuted?: boolean, // 是否自动静音
     *   loop?: boolean, // 是否循环播放
     *   zoom?: number, // 缩放比例
     *   videoInit?: boolean, // 是否优先显示视频首帧
     *   poster?: string | { [propName: string]: any }, // 封面图地址
     *   isMobileSimulateMode?: 'mobile' | 'pc', // 模拟状态,取值mobile/pc
     *   defaultPlaybackRate?: number, // 默认播放倍数
     *   execBeforePluginsCall?: () => any, // 默认插件组装前回调
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
     *   disableSwipeHandler?: () => any,
     *   enableSwipeHandler?: () => any,
     *   ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>, // 禁用插件列表
     *   inactive?: number, // 进度条自动消失延时
     *   lang?: string,
     *   controls?: boolean | { [propName: string]: any },
     *   marginControls?: boolean, // 控制栏是否位于画面底部，不与画面重合
     *   screenShot?: boolean | { [propName: string]: any }, // 截图插件
     *   rotate?: boolean | { [propName: string]: any }, // 旋转插件
     *   pip?: boolean | { [propName: string]: any }, // pip插件
     *   download?: boolean | { [propName: string]: any }, // 是否启用下载插件
     *   mini?: boolean | { [propName: string]: any }, // 迷你小窗插件
     *   cssFullscreen?: boolean | { [propName: string]: any }, // 页面全屏
     *   keyShortcut?: boolean, // 是否开启快捷键
     *   presets?: any[],
     *   plugins?: any[]
     *   playbackRate?: number | Array<number> | { [propName: string]: any },
     *   playsinline?: boolean,
     *   customDuration?: number, // 用户自定义时长
     *   timeOffset?: number, // 当前时长偏移
     *   icons?: { [propName: string]: string | HTMLElement | () => HTMLElement | string }, // 按钮配置
     *   i18n?: Array<any>,
     *   thumbnail?: {
     *     urls: Array<string>, // 有多张大图就多个url就好
     *     pic_num: number, // 每张图含有几个雪碧图
     *     col: number, // 截图列数
     *     row: number, // 截图行数
     *     height?: number, // 缩略图高度, 默认90
     *     width?: number, // 缩略图宽度， 默认160
     *   },
     *   videoConfig?: { [propName: string]: any },
     *   commonStyle?: {
     *     progressColor?: string, // 进度条底色
     *     playedColor?: string, // 播放完成部分进度条底色
     *     cachedColor?: string, // 缓存部分进度条底色
     *     sliderBtnStyle?: { [propName: string]: any }, // 进度条滑块样式
     *     volumeColor?: string
     *   },
     *   [propName: string]: any; // 扩展定义
     * } } IPlayerOptions
     */
    /**
     *
     * @returns { IPlayerOptions }
     */
    export default function getDefaultConfig(): IPlayerOptions;
    export type IPlayerOptions = {
        [propName: string]: any;
        id?: string;
        el?: HTMLElement;
        url?: any;
        nullUrlStart?: boolean;
        width?: number | string;
        height?: number | string;
        fluid?: boolean;
        fitVideoSize?: 'fixWidth' | 'fixHeight' | 'fixed';
        videoFillMode?: 'auto' | 'fillHeight' | 'fillWidth' | 'fill' | 'cover';
        volume?: number | {
            [propName: string]: any;
        };
        autoplay?: boolean;
        autoplayMuted?: boolean;
        loop?: boolean;
        zoom?: number;
        videoInit?: boolean;
        poster?: string | {
            [propName: string]: any;
        };
        isMobileSimulateMode?: 'mobile' | 'pc';
        defaultPlaybackRate?: number;
        execBeforePluginsCall?: () => any;
        allowSeekAfterEnded?: boolean;
        enableContextmenu?: boolean;
        closeVideoClick?: boolean;
        closeVideoDblclick?: boolean;
        closePlayerBlur?: boolean;
        leavePlayerTime?: number;
        closePlayVideoFocus?: boolean;
        closePauseVideoFocus?: boolean;
        closeFocusVideoFocus?: boolean;
        closeDelayBlur?: boolean;
        closeControlsBlur?: boolean;
        videoAttributes?: {
            [propName: string]: any;
        };
        startTime?: number;
        seekedStatus?: 'play' | 'pause' | 'auto';
        miniprogress?: boolean;
        disableSwipeHandler?: () => any;
        enableSwipeHandler?: () => any;
        ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>;
        inactive?: number;
        lang?: string;
        controls?: boolean | {
            [propName: string]: any;
        };
        marginControls?: boolean;
        screenShot?: boolean | {
            [propName: string]: any;
        };
        rotate?: boolean | {
            [propName: string]: any;
        };
        pip?: boolean | {
            [propName: string]: any;
        };
        download?: boolean | {
            [propName: string]: any;
        };
        mini?: boolean | {
            [propName: string]: any;
        };
        cssFullscreen?: boolean | {
            [propName: string]: any;
        };
        keyShortcut?: boolean;
        presets?: any[];
        plugins?: any[];
        playbackRate?: number | number[] | {
            [propName: string]: any;
        };
        playsinline?: boolean;
        customDuration?: number;
        timeOffset?: number;
        icons?: {
            [propName: string]: string | HTMLElement | (() => HTMLElement | string);
        };
        i18n?: Array<any>;
        thumbnail?: {
            urls: Array<string>;
            pic_num: number;
            col: number;
            row: number;
            height?: number;
            width?: number;
        };
        videoConfig?: {
            [propName: string]: any;
        };
        commonStyle?: {
            progressColor?: string;
            playedColor?: string;
            cachedColor?: string;
            sliderBtnStyle?: {
                [propName: string]: any;
            };
            volumeColor?: string;
        };
    };
}
declare module "plugin/basePlugin" {
    export type Player = import("player").default;
    export type IPlayerOptions = import("defaultConfig").IPlayerOptions;
    export type IBasePluginOptions = {
        [propName: string]: any;
        index?: number;
        player: Player;
        pluginName: string;
        config: {
            [propName: string]: any;
        };
    };
    /**
     * @typedef { import ('../player').default } Player
     */
    /**
     * @typedef { import ('../defaultConfig').IPlayerOptions } IPlayerOptions
     */
    /**
      * @typedef {{
      * index?: number,
      * player: Player,
      * pluginName: string,
      * config: {
      *   [propName: string]: any
      * },
      * [propName: string]: any;
      * }} IBasePluginOptions
     */
    class BasePlugin {
        static defineGetterOrSetter(Obj: any, map: any): void;
        /**
         * @type { { [propName: string]: any } }
         */
        static get defaultConfig(): {
            [propName: string]: any;
        };
        /**
         * @type { string }
         */
        static get pluginName(): string;
        /**
         * @param { IBasePluginOptions } args
         */
        constructor(args: IBasePluginOptions);
        /**
         * @private
         */
        private __args;
        /**
         * @private
         */
        private __events;
        config: {
            [propName: string]: any;
        };
        /**
         * @readonly
         * @type { Player }
         */
        readonly player: Player;
        /**
           * @readonly
           * @type { IPlayerOptions }
           */
        readonly playerConfig: IPlayerOptions;
        /**
           * @readonly
           * @type {string}
           */
        readonly pluginName: string;
        beforeCreate(): void;
        afterCreate(): void;
        beforePlayerInit(): void;
        onPluginsReady(): void;
        afterPlayerInit(): void;
        destroy(): void;
        /**
         * @private
         * @param { any } args
         */
        private __init;
        logger: any;
        /**
         * 更新语言
         * @param { string } lang
         */
        updateLang(lang: string): void;
        /**
         * @type { string }
         */
        get lang(): string;
        get i18n(): {
            [propName: string]: string;
        };
        get i18nKeys(): {};
        /**
         *
         * @param { string | Array<string> } event
         * @param { Function } callback
         * @returns
         */
        on(event: string | Array<string>, callback: Function): void;
        /**
         *
         * @param { string } event
         * @param { Function } callback
         * @returns
         */
        once(event: string, callback: Function): void;
        /**
         *
         * @param { string } event
         * @param { Function } callback
         * @returns
         */
        off(event: string, callback: Function): void;
        offAll(): void;
        /**
         *
         * @param { string } event
         * @param { any } [res]
         * @returns
         */
        emit(event: string, res?: any): void;
        emitUserAction(event: any, action: any, params?: {}): void;
        /**
         * @param { string } hookName
         * @param { Function } handler
         * @param { {pre: Function| null , next: Function | null} } preset
         * @returns
         */
        hook(hookName: string, handler: Function, preset?: {
            pre: Function | null;
            next: Function | null;
        }, ...args: any[]): any;
        useHooks: (hookName: string, handler: (plugin: any, ...args: any[]) => boolean | Promise<any>, ...args: any[]) => boolean;
        /**
         * 注册子插件
         * @param { any } plugin
         * @param { any } [options]
         * @param { string } [name]
         * @returns { any }
         */
        registerPlugin(plugin: any, options?: any, name?: string): any;
        /**
         *
         * @param { string } name
         * @returns { any | null }
         */
        getPlugin(name: string): any | null;
        __destroy(): void;
    }
    import Util from "utils/util";
    import Sniffer from "utils/sniffer";
    import Errors from "error";
    import * as Events from "events";
    import XG_DEBUG from "utils/debug";
    export { BasePlugin as default, Util, Sniffer, Errors, Events, XG_DEBUG };
}
declare module "plugin/plugin" {
    export type Player = import("player").default;
    export type IPluginOptions = {
        [propName: string]: any;
        index?: number;
        player: Player;
        pluginName: string;
        config: {
            [propName: string]: any;
        };
        root?: HTMLElement;
        position?: string;
    };
    /**
     * @typedef { import ('../player').default } Player
     */
    /**
     * @typedef {{
     *  index?: number,
     *  player: Player,
     *  pluginName: string,
     *  config: {
     *   [propName: string]: any
     *  },
     *  root?: HTMLElement,
     *  position?: string,
     *  [propName: string]: any
     * }} IPluginOptions
    */
    class Plugin extends BasePlugin {
        /**
          * 插入dom结构
          * @param { String | HTMLElement } html html字符串或者dom
          * @param { HTMLElement } parent
          * @param { number } index
          * @returns { HTMLElement }
          */
        static insert(html: string | HTMLElement, parent: HTMLElement, index?: number): HTMLElement;
        static get defaultConfig(): {};
        /**
         *
         * @param { HTMLElement } root
         * @param { String } querySelector
         * @param { String | Array<String> } eventType
         * @param { Function } callback
         * @param { boolean } [capture=false]
         * @returns
         */
        static delegate(root: HTMLElement, querySelector: string, eventType: string | Array<string>, callback: Function, capture?: boolean): any[];
        static get ROOT_TYPES(): {
            CONTROLS: string;
            ROOT: string;
        };
        static get POSITIONS(): {
            ROOT: string;
            ROOT_LEFT: string;
            ROOT_RIGHT: string;
            ROOT_TOP: string;
            CONTROLS_LEFT: string;
            CONTROLS_RIGTH: string;
            CONTROLS_RIGHT: string;
            CONTROLS_CENTER: string;
            CONTROLS: string;
        };
        /**
         * @param { IPluginOptions } args
         */
        constructor(args?: IPluginOptions);
        /**
         * @private
         */
        private __delegates;
        /**
         * @readonly
         */
        readonly icons: {};
        /**
         * @readonly
         * @type { HTMLElement }
         */
        readonly root: HTMLElement;
        /**
         * @readonly
         * @type { HTMLElement }
         */
        readonly parent: HTMLElement;
        /**
         * @readonly
         */
        readonly langText: {};
        /**
         * @private
         */
        private __registerChildren;
        /**
         * @private
         */
        private _children;
        changeLangTextKey(dom: any, key?: string): void;
        plugins(): any[];
        children(): {};
        registerIcons(): {};
        registerLanguageTexts(): {};
        /**
         *
         * @param { string } qs
         * @returns { HTMLElement | null }
         */
        find(qs: string): HTMLElement | null;
        /**
         * 绑定事件
         * @param { string | Array<string> } querySelector
         * @param { string | Function } eventType
         * @param { Function } [callback]
         */
        bind(querySelector: string | Array<string>, eventType: string | Function, callback?: Function, ...args: any[]): void;
        /**
         * 绑定事件
         * @param { string | Array<string> } querySelector
         * @param { string | Function } eventType
         */
        unbind(querySelector: string | Array<string>, eventType: string | Function, ...args: any[]): void;
        /**
         * 给插件设置样式
         * @param { string | {[propName: string]: any} } name
         * @param { ？ | any } value
         * @returns
         */
        setStyle(name: string | {
            [propName: string]: any;
        }, value: any): any;
        /**
         * 给插件根节点设置属性
         * @param { string | {[propName: string]: any} } name
         * @param { ？ | any } value
         * @returns
         */
        setAttr(name: string | {
            [propName: string]: any;
        }, value: any): void;
        /**
         *
         * @param { string } htmlStr
         * @param { Function } [callback]
         * @returns
         */
        setHtml(htmlStr: string, callback?: Function): void;
        /**
         *
         * @param { string } event
         * @param { Function } eventHandle
         * @param { boolean } [isBubble=false]
         * @returns
         */
        bindEL(event: string, eventHandle: Function, isBubble?: boolean): void;
        /**
         *
         * @param { string } event
         * @param { Function } eventHandle
         * @param { boolean } [isBubble]
         * @returns
         */
        unbindEL(event: string, eventHandle: Function, isBubble?: boolean): void;
        /**
         *
         * @param { string } [value]
         * @returns
         */
        show(value?: string): string;
        hide(): void;
        /**
         *
         * @param { string | HTMLElement } pdom
         * @param { HTMLElement} child
         * @returns { HTMLElement | nul }
         */
        appendChild(pdom: string | HTMLElement, child: HTMLElement, ...args: any[]): HTMLElement | any;
        /**
         *
         * @returns { string | HTMLElement }
         */
        render(): string | HTMLElement;
    }
    export namespace ROOT_TYPES {
        const CONTROLS: string;
        const ROOT: string;
    }
    export namespace POSITIONS {
        const ROOT_1: string;
        export { ROOT_1 as ROOT };
        export const ROOT_LEFT: string;
        export const ROOT_RIGHT: string;
        export const ROOT_TOP: string;
        export const CONTROLS_LEFT: string;
        export const CONTROLS_RIGTH: string;
        export const CONTROLS_RIGHT: string;
        export const CONTROLS_CENTER: string;
        const CONTROLS_1: string;
        export { CONTROLS_1 as CONTROLS };
    }
    import BasePlugin from "plugin/basePlugin";
    export { Plugin as default };
}
declare module "plugin/resizeObserver" {
    export function addObserver(target: any, handler: any): any;
    export function unObserver(target: any, handler: any): void;
    export function destroyObserver(target: any, handler: any): void;
}
declare module "plugin/pluginsManager" {
    export default pluginsManager;
    namespace pluginsManager {
        function init(player: any): void;
        function init(player: any): void;
        /**
           * 检测当前dom中是否已经有初始化播放器
           * @param {Element} root
           */
        function checkPlayerRoot(root: Element): any;
        /**
           * 检测当前dom中是否已经有初始化播放器
           * @param {Element} root
           */
        function checkPlayerRoot(root: Element): any;
        /**
         * register a lazy plugin
         * @param { any } player instance
         * @param { any } lazyPlugin config
         *
         */
        function lazyRegister(player: any, lazyPlugin: any): Promise<any>;
        /**
         * register a lazy plugin
         * @param { any } player instance
         * @param { any } lazyPlugin config
         *
         */
        function lazyRegister(player: any, lazyPlugin: any): Promise<any>;
        /**
        * register a Plugin
        * @param { any } player the plugins register
        * @param { any } plugin the plugin contructor
        * @param { any } options the plugin configuration
        * @return { any } Plugin the plugin instance
        **/
        function register(player: any, plugin: any, options?: any): any;
        /**
        * register a Plugin
        * @param { any } player the plugins register
        * @param { any } plugin the plugin contructor
        * @param { any } options the plugin configuration
        * @return { any } Plugin the plugin instance
        **/
        function register(player: any, plugin: any, options?: any): any;
        /**
         * Unregister a plugin from player instance
         * @param { string } cgid
         * @param { string } name
         */
        function unRegister(cgid: string, name: string): void;
        /**
         * Unregister a plugin from player instance
         * @param { string } cgid
         * @param { string } name
         */
        function unRegister(cgid: string, name: string): void;
        /**
         * remove a plugin instance from the player plugin list
         * @param { any } player
         * @param { string } name
         */
        function deletePlugin(player: any, name: string): void;
        /**
         * remove a plugin instance from the player plugin list
         * @param { any } player
         * @param { string } name
         */
        function deletePlugin(player: any, name: string): void;
        /**
         * get all plugin instance of player
         * @param { any } player
         */
        function getPlugins(player: any): any;
        /**
         * get all plugin instance of player
         * @param { any } player
         */
        function getPlugins(player: any): any;
        function findPlugin(player: any, name: any): any;
        function findPlugin(player: any, name: any): any;
        function beforeInit(player: any): Promise<any>;
        function beforeInit(player: any): Promise<any>;
        function afterInit(player: any): void;
        function afterInit(player: any): void;
        function setLang(lang: any, player: any): void;
        function setLang(lang: any, player: any): void;
        function reRender(player: any): void;
        function reRender(player: any): void;
        function onPluginsReady(player: any): void;
        function onPluginsReady(player: any): void;
        function destroy(player: any): void;
        function destroy(player: any): void;
    }
}
declare module "stateClassMap" {
    namespace _default {
        const DEFAULT: string;
        const DEFAULT_SKIN: string;
        const ENTER: string;
        const PAUSED: string;
        const PLAYING: string;
        const ENDED: string;
        const CANPLAY: string;
        const LOADING: string;
        const ERROR: string;
        const REPLAY: string;
        const NO_START: string;
        const ACTIVE: string;
        const FULLSCREEN: string;
        const CSS_FULLSCREEN: string;
        const PARENT_FULLSCREEN: string;
        const ROTATE_FULLSCREEN: string;
        const PARENT_ROTATE_FULLSCREEN: string;
        const INNER_FULLSCREEN: string;
        const NO_CONTROLS: string;
        const FLEX_CONTROLS: string;
        const CONTROLS_FOLLOW: string;
        const AUTOHIDE: string;
        const NOT_ALLOW_AUTOPLAY: string;
        const SEEKING: string;
        const PC: string;
        const MOBILE: string;
        const MINI: string;
    }
    export default _default;
}
declare module "plugin/preset" {
    export function usePreset(player: any, Preset: any): void;
}
declare module "plugins/controls/index" {
    export default Controls;
    export type IControlsConfig = {
        [propName: string]: any;
        disable?: boolean;
        autoHide?: boolean;
        mode?: "flex" | "normal" | "bottom";
        initShow?: boolean;
    };
    /**
      * @typedef {{
      *   disable?: boolean,
      *   autoHide?: boolean,
      *   mode?: "flex"|"normal"|"bottom",
      *   initShow?: boolean,
      *   [propName: string]: any
      * }} IControlsConfig
      */
    class Controls {
        static get pluginName(): string;
        /**
         * @type IControlsConfig
         */
        static get defaultConfig(): IControlsConfig;
        beforeCreate(args: any): void;
        afterCreate(): void;
        /**
         * @type { HTMLElement}
         * @readonly
         */
        readonly left: HTMLElement;
        /**
         * @type { HTMLElement}
         * @readonly
         */
        readonly center: HTMLElement;
        /**
         * @type { HTMLElement}
         * @readonly
         */
        readonly right: HTMLElement;
        /**
         * @type { HTMLElement}
         * @readonly
         */
        readonly innerRoot: HTMLElement;
        onMouseEnter: (e: any) => void;
        onMouseLeave: () => void;
        focus(): void;
        unFocus(): void;
        blur(): void;
        recoverAutoHide(): void;
        pauseAutoHide(): void;
        show(): void;
        hide(): void;
        /**
         * @type {string}
         */
        get mode(): string;
        /**
         *
         * @param {} plugin
         * @param { {config?: {[propName: string]: any}, position?:string, root?: HTMLElement, pluginName?: string}} options
         * @param { string } name
         * @returns { any }
         */
        registerPlugin(plugin: any, options: {
            config?: {
                [propName: string]: any;
            };
            position?: string;
            root?: HTMLElement;
            pluginName?: string;
        }, name: string): any;
        destroy(): void;
        render(): string;
    }
}
declare module "lang/en" {
    namespace _default {
        const LANG: string;
        namespace TEXT {
            const HAVE_NOTHING: string;
            const HAVE_METADATA: string;
            const HAVE_CURRENT_DATA: string;
            const HAVE_FUTURE_DATA: string;
            const HAVE_ENOUGH_DATA: string;
            const NETWORK_EMPTY: string;
            const NETWORK_IDLE: string;
            const NETWORK_LOADING: string;
            const NETWORK_NO_SOURCE: string;
            const MEDIA_ERR_ABORTED: string;
            const MEDIA_ERR_NETWORK: string;
            const MEDIA_ERR_DECODE: string;
            const MEDIA_ERR_SRC_NOT_SUPPORTED: string;
            const REPLAY: string;
            const ERROR: string;
            const PLAY_TIPS: string;
            const PAUSE_TIPS: string;
            const PLAYNEXT_TIPS: string;
            const DOWNLOAD_TIPS: string;
            const ROTATE_TIPS: string;
            const RELOAD_TIPS: string;
            const FULLSCREEN_TIPS: string;
            const EXITFULLSCREEN_TIPS: string;
            const CSSFULLSCREEN_TIPS: string;
            const EXITCSSFULLSCREEN_TIPS: string;
            const TEXTTRACK: string;
            const PIP: string;
            const SCREENSHOT: string;
            const LIVE: string;
            const OFF: string;
            const OPEN: string;
            const MINI_DRAG: string;
            const MINISCREEN: string;
            const REFRESH_TIPS: string;
            const REFRESH: string;
        }
    }
    export default _default;
}
declare module "lang/i18n" {
    export default I18N;
    export type IXGI18nText = {
        LANG: string;
        TEXT: {
            [propName: string]: string;
        };
    }[];
    namespace I18N {
        export { extend };
        export { use };
    }
    /**
     * @param { IXGI18nText } XGI18nText
     */
    function extend(XGI18nText: IXGI18nText): void;
    /**
     * @param { IXGI18nText } langData
     */
    function use(langData: IXGI18nText): void;
}
declare module "player" {
    export type IPlayerOptions = import("defaultConfig").IPlayerOptions;
    class Player extends VideoProxy {
        /***
         * @deprecated
         * 插件全部迁移完成再做删除
         */
        static install(name: any, descriptor: any): void;
        /***
         * @deprecated
         * 插件全部迁移完成再做删除
         */
        static use(name: any, descriptor: any): void;
        static defaultPreset: any;
        /**
         * @description 自定义media构造函数
         */
        static XgVideoProxy: any;
        /**
         * @param { IPlayerOptions } options
         */
        constructor(options: IPlayerOptions);
        /**
         * @type { IPlayerOptions }
         * @description 当前播放器的配置信息
         */
        config: IPlayerOptions;
        userTimer: number;
        /**
         * @private
         */
        private waitTimer;
        /**
         * @type { boolean }
         * @readonly
         */
        readonly isReady: boolean;
        /**
         * Whether the player is real start state
         * @type { boolean }
         * @readonly
         */
        readonly isPlaying: boolean;
        /**
         * Whether the player is in the seeking state
         * @type { boolean }
         * @readonly
         */
        readonly isSeeking: boolean;
        /**
         * @type { boolean }
         * @readonly
         */
        readonly isCanplay: boolean;
        /**
         * @private
         * @readonly
         */
        private readonly _runPending;
        /**
         *  @type { number }
         */
        rotateDeg: number;
        /**
         * Whether the player is focus
         * @type { boolean }
         * @readonly
         */
        readonly isActive: boolean;
        /**
         * @type { boolean }
         * @readonly
         */
        readonly isCssfullScreen: boolean;
        /**
         * Whether player is currently in fullscreen
         * @type { boolean }
         * @readonly
         */
        readonly fullscreen: boolean;
        /**
         * fullscreenElement
         * @type { HTMLElement | null }
         * @readonly
         */
        readonly _fullscreenEl: HTMLElement | null;
        /**
         * cssFullscreen target Element
         * @type { HTMLElement | null }
         * @readonly
         */
        readonly _cssfullscreenEl: HTMLElement | null;
        /**
         * @private
         * @type { string }
         */
        private _orgCss;
        /**
         * @readonly
         * @type { number }
         */
        readonly _fullScreenOffset: number;
        /**
         * @private
         * @type { number }
         */
        private _videoHeight;
        /**
         * @private
         * @type { number }
         */
        private _videoWidth;
        /**
         * @private
         * @type { { begin: number, end:number, acc: number } }
         */
        private _played;
        /**
         * @type { null | HTMLElement }
         * @readonly
         * @description  控制栏和video不同布局的时候内部容器
         */
        readonly innerContainer: null | HTMLElement;
        /**
         * @type { null | Object }
         * @readonly
         * @description 控制栏插件
         */
        readonly controls: null | any;
        /**
         * @type { null | HTMLElement }
         * @readonly
         */
        readonly topBar: null | HTMLElement;
        /**
         * @type { null | HTMLElement }
         * @readonly
         * @description 当前播放器根节点
         */
        readonly root: null | HTMLElement;
        /**
         * @readonly
         * @type {any}
         */
        readonly database: any;
        /**
         * init control bar
         * @private
         */
        private _initDOM;
        /**
         * @private
         */
        private _initBaseDoms;
        /**
         * @readonly
         * @type { HTMLElement }
         */
        readonly leftBar: HTMLElement;
        /**
         * @readonly
         * @type { HTMLElement }
         */
        readonly rightBar: HTMLElement;
        /**
         * @private
         */
        private _bindEvents;
        /**
         * @private
         */
        private onFullscreenChange;
        _fullActionFrom: string;
        /**
         * @private
         */
        private __webkitbeginfullscreen;
        /**
         * @private
         */
        private __webkitendfullscreen;
        playFunc: () => void;
        /**
         * @private
         */
        private _unbindEvents;
        /**
         *
         * @param { any } url
         * @returns
         */
        _startInit(url: any): void;
        canPlayFunc: any;
        /**
         * 针对source列表播放方式添加错误监听
         * @doc https://stackoverflow.com/questions/47557135/html5-detect-the-type-of-error-when-trying-to-load-a-video-using-a-source-elem
         * @protected
         * @param { HTMLVideoElement | HTMLAudioElement } video
         */
        protected _attachSourceEvents(video: HTMLVideoElement | HTMLAudioElement): void;
        /**
         * @private
         */
        private _videoSourceCount;
        _sourceError: (e: any) => void;
        /**
         * 移除source列表错误事件监听
         * @protected
         * @param { HTMLVideoElement | HTMLAudioElement } video
         */
        protected _detachSourceEvents(video: HTMLVideoElement | HTMLAudioElement): void;
        /**
         * 注册组件 组件列表config.plugins
         * @private
         */
        private _registerPlugins;
        /**
         * @private
         */
        private _loadingPlugins;
        /**
         * @private
         */
        private _registerPresets;
        /**
         *
         * @param { {plugin: function, options:object} | function } plugin
         * @param { {[propName: string]: any;} } [config]
         * @returns { any } plugin
         */
        registerPlugin(plugin: Function | {
            plugin: Function;
            options: object;
        }, config?: {
            [propName: string]: any;
        }): any;
        /**
         *
         * @param { any } plugin
         */
        deregister(plugin: any): void;
        /**
         *
         * @param { any } plugin
         */
        unRegisterPlugin(plugin: any): void;
        /**
         * 当前播放器挂载的插件实例列表
         * @type { {[propName: string]: any } }
         */
        get plugins(): {
            [propName: string]: any;
        };
        /**
         * get a plugin instance
         * @param { string } pluginName
         * @return { any } plugin
         */
        getPlugin(pluginName: string): any;
        /**
         *
         * @param { string } className
         */
        addClass(className: string): void;
        /**
         *
         * @param { string } className
         * @returns
         */
        removeClass(className: string): void;
        /**
         *
         * @param { string } className
         * @returns { boolean } has
         */
        hasClass(className: string): boolean;
        /**
         *
         * @param { string } key
         * @param { any } value
         * @returns void
         */
        setAttribute(key: string, value: any): void;
        /**
         *
         * @param { string } key
         * @param { any } value
         * @returns void
         */
        removeAttribute(key: string, value: any): void;
        /**
         *
         * @param { any } url
         * @returns { Promise<void> | void }
         * @description 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
         */
        start(url: any): Promise<void> | void;
        load(): void;
        videoPlay(): Promise<void>;
        /**
         * @private
         */
        private _errorTimer;
        videoPause(): void;
        /**
         *
         * @param { number } time
         * @returns
         */
        seek(time: number): void;
        reload(): void;
        /**
         * @private
         */
        private reloadFunc;
        resetClasses(): void;
        replay(): void;
        retry(): void;
        /**
         *
         * @param { HTMLElement } [root]
         * @param { HTMLElement } [el]
         * @param { string } [rootClass]
         * @param { string } [pClassName]
         */
        changeFullStyle(root?: HTMLElement, el?: HTMLElement, rootClass?: string, pClassName?: string): void;
        /**
         * @private
         */
        private _orgPCss;
        /**
         *
         * @param { HTMLElement } [root]
         * @param { HTMLElement } [el]
         * @param { string } [rootClass]
         * @param { string } [pClassName]
         */
        recoverFullStyle(root?: HTMLElement, el?: HTMLElement, rootClass?: string, pClassName?: string): void;
        /**
         * @param { HTMLElement } [el]
         * @returns { Promise<void>; }
         */
        getFullscreen(el?: HTMLElement): Promise<void>;
        /**
         * @param { HTMLElement } [el]
         * @returns { Promise<void>; }
         */
        exitFullscreen(el?: HTMLElement): Promise<void>;
        /**
         * @param { HTMLElement } [el]
         * @returns
         */
        getCssFullscreen(el?: HTMLElement): void;
        /**
         * @param { HTMLElement } [el]
         * @returns
         */
        exitCssFullscreen(): void;
        /**
         * @description 播放器焦点状态，控制栏显示
         * @param { {
         *   autoHide?: boolean, // 是否可以自动隐藏
         *   delay?: number // 自动隐藏的延迟时间，ms, 不传默认使用3000ms
         * } } [data]
         */
        focus(data?: {
            autoHide?: boolean;
            delay?: number;
        }): void;
        /**
         * @description 取消播放器当前焦点状态
         * @param { { ignorePaused?: boolean } } [data]
         */
        blur(data?: {
            ignorePaused?: boolean;
        }): void;
        /**
         * @protected
         * @param { { autoHide?: boolean, delay?: number} } [data]
         * @returns
         */
        protected onFocus(data?: {
            autoHide?: boolean;
            delay?: number;
        }): void;
        /**
         * @protected
         * @param {{ ignorePaused?: boolean }} [data]
         * @returns
         */
        protected onBlur(data?: {
            ignorePaused?: boolean;
        }): void;
        /**
         * @protected
         */
        protected onCanplay(): void;
        /**
         * @protected
         */
        protected onPlay(): void;
        /**
         * @protected
         */
        protected onPause(): void;
        /**
         * @protected
         */
        protected onEnded(): void;
        /**
         * @protected
         */
        protected onError(): void;
        /**
         * @protected
         */
        protected onSeeking(): void;
        /**
         * @protected
         */
        protected onSeeked(): void;
        /**
         * @protected
         */
        protected onWaiting(): void;
        /**
         * @protected
         */
        protected onPlaying(): void;
        /**
         * @protected
         */
        protected onTimeupdate(): void;
        /**
         *
         * @param { number } time
         * @returns { boolean }
         */
        checkBuffer(time: number): boolean;
        getVideoSize(): void;
        /**
         *
         * @param { number } left
         * @param { number } top
         * @returns
         */
        updateObjectPosition(left?: number, top?: number): void;
        /**
         * @type { string }
         */
        set lang(arg: string);
        get lang(): string;
        get i18n(): {
            [propName: string]: string;
        };
        get i18nKeys(): {};
        /**
         * @type { string }
         */
        get version(): string;
        /**
         * @type { any }
         */
        set url(arg: any);
        get url(): any;
        /**
         * @private
         */
        private __url;
        /**
         * @type { string }
         */
        set poster(arg: any);
        get poster(): any;
        /**
         * @type { boolean }
         */
        get fullscreenChanging(): boolean;
        /**
         * 累计观看时长
         * @type number
         */
        get cumulateTime(): number;
        /**
         * @type { number }
         */
        set zoom(arg: number);
        /**
        * @type { number }
        */
        get zoom(): number;
        /**
         * @param { string } hookName
         * @param { Function } handler
         * @param { {pre: Function| null , next: Function | null} } preset
         * @returns
         */
        hook(hookName: string, handler: Function, preset?: {
            pre: Function | null;
            next: Function | null;
        }, ...args: any[]): any;
        /**
         * @param { string } hookName
         * @param { (player: any, ...args) => boolean | Promise<any> } handler
         * @param  {...any} args
         * @returns {boolean} isSuccess
         */
        useHooks(hookName: string, handler: (player: any, ...args: any[]) => boolean | Promise<any>, ...args: any[]): boolean;
        /**
         *
         * @param { string } pluginName
         * @param { string } hookName
         * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
         * @param  {...any} args
         * @returns { boolean } isSuccess
         */
        usePluginHooks(pluginName: string, hookName: string, handler: (plugin: any, ...args: any[]) => boolean | Promise<any>, ...args: any[]): boolean;
    }
    import Plugin from "plugin/plugin";
    import BasePlugin from "plugin/basePlugin";
    import * as Events from "events";
    import Errors from "error";
    import Sniffer from "utils/sniffer";
    import Util from "utils/util";
    import STATE_CLASS from "stateClassMap";
    import I18N from "lang/i18n";
    import VideoProxy from "proxy";
    export { Player as default, Plugin, BasePlugin, Events, Errors, Sniffer, Util, STATE_CLASS, I18N };
}
declare module "plugins/common/thumbnail" {
    /**
     * @typedef {{
     *   isShow?: boolean,
     *   urls?: Array<string>, // 有多张大图就多个url
     *   pic_num?: number, // 每张图含有几个雪碧图
     *   col?: number, // 截图列数
     *   row?: number, // 截图行数
     *   height?: number, // 缩略图高度
     *   width?: number, // 缩略图宽度
     *   scale?: number, // 缩放
     *   className?: string, // 额外添加在dom上的class
     *   hidePortrait?: boolean, // 是否在竖屏的时候隐藏
     *   [propName: string]: any
     * }} IThumbnailConfig
     */
    export default class Thumbnail {
        static get pluginName(): string;
        /**
         * @type IThumbnailConfig
         */
        static get defaultConfig(): IThumbnailConfig;
        constructor(args: any);
        ratio: number;
        interval: any;
        preloadMark: {};
        afterCreate(): void;
        get usable(): boolean;
        initThumbnail(): void;
        getUrlByIndex(index: any): any;
        preload(index: any): void;
        getPosition(now: any, containerWidth?: number, containerHeight?: number): {
            urlIndex: number;
            rowIndex: number;
            colIndex: number;
            url: any;
            height: number;
            width: number;
            style: {
                backgroundImage: string;
                backgroundSize: string;
                backgroundPosition: string;
                width: string;
                height: string;
            };
        };
        update(dom: any, now: any, containerWidth?: number, containerHeight?: number, customStyle?: string): void;
        createThumbnail(root: any, className: any): any;
    }
    export type IThumbnailConfig = {
        [propName: string]: any;
        isShow?: boolean;
        urls?: Array<string>;
        pic_num?: number;
        col?: number;
        row?: number;
        height?: number;
        width?: number;
        scale?: number;
        className?: string;
        hidePortrait?: boolean;
    };
}
declare module "plugins/progress/miniProgress" {
    export default MiniProgress;
    class MiniProgress {
        static get pluginName(): string;
        static get defaultConfig(): {};
        afterCreate(): void;
        update(data: {
            cached: number;
            played: number;
        }, duration: any): void;
        render(): string;
    }
}
declare module "lang/zh-cn" {
    namespace _default {
        const LANG: string;
        namespace TEXT {
            const HAVE_NOTHING: string;
            const HAVE_METADATA: string;
            const HAVE_CURRENT_DATA: string;
            const HAVE_FUTURE_DATA: string;
            const HAVE_ENOUGH_DATA: string;
            const NETWORK_EMPTY: string;
            const NETWORK_IDLE: string;
            const NETWORK_LOADING: string;
            const NETWORK_NO_SOURCE: string;
            const MEDIA_ERR_ABORTED: string;
            const MEDIA_ERR_NETWORK: string;
            const MEDIA_ERR_DECODE: string;
            const MEDIA_ERR_SRC_NOT_SUPPORTED: string;
            const REPLAY: string;
            const ERROR: string;
            const PLAY_TIPS: string;
            const PAUSE_TIPS: string;
            const PLAYNEXT_TIPS: string;
            const DOWNLOAD_TIPS: string;
            const ROTATE_TIPS: string;
            const RELOAD_TIPS: string;
            const FULLSCREEN_TIPS: string;
            const EXITFULLSCREEN_TIPS: string;
            const CSSFULLSCREEN_TIPS: string;
            const EXITCSSFULLSCREEN_TIPS: string;
            const TEXTTRACK: string;
            const PIP: string;
            const SCREENSHOT: string;
            const LIVE: string;
            const OFF: string;
            const OPEN: string;
            const MINI_DRAG: string;
            const MINISCREEN: string;
            const REFRESH_TIPS: string;
            const REFRESH: string;
        }
    }
    export default _default;
}
declare module "presets/default" {
    export default class DefaultPreset {
        constructor(options: any, playerConfig: any);
        plugins: any[];
        ignores: any[];
        i18n: {
            LANG: string;
            TEXT: {
                HAVE_NOTHING: string;
                HAVE_METADATA: string;
                HAVE_CURRENT_DATA: string;
                HAVE_FUTURE_DATA: string;
                HAVE_ENOUGH_DATA: string;
                NETWORK_EMPTY: string;
                NETWORK_IDLE: string;
                NETWORK_LOADING: string;
                NETWORK_NO_SOURCE: string;
                MEDIA_ERR_ABORTED: string;
                MEDIA_ERR_NETWORK: string;
                MEDIA_ERR_DECODE: string;
                MEDIA_ERR_SRC_NOT_SUPPORTED: string;
                REPLAY: string;
                ERROR: string;
                PLAY_TIPS: string;
                PAUSE_TIPS: string;
                PLAYNEXT_TIPS: string;
                DOWNLOAD_TIPS: string;
                ROTATE_TIPS: string;
                RELOAD_TIPS: string;
                FULLSCREEN_TIPS: string;
                EXITFULLSCREEN_TIPS: string;
                CSSFULLSCREEN_TIPS: string;
                EXITCSSFULLSCREEN_TIPS: string;
                TEXTTRACK: string;
                PIP: string;
                SCREENSHOT: string;
                LIVE: string;
                OFF: string;
                OPEN: string;
                MINI_DRAG: string;
                MINISCREEN: string;
                REFRESH_TIPS: string;
                REFRESH: string;
            };
        }[];
    }
}
declare module "index-umd" {
    export default PresetPlayer;
    class PresetPlayer extends Player {
        static defaultPreset: typeof defaultPreset;
        static Util: typeof Util;
        static Sniffer: import("utils/sniffer").ISniffer;
        static Errors: typeof Errors;
        static Events: typeof Events;
        static Plugin: typeof Plugin;
        static BasePlugin: typeof BasePlugin;
        static I18N: {
            readonly textKeys: {};
            readonly langKeys: string[];
            readonly lang: {
                [propName: string]: {
                    [propName: string]: string;
                };
            };
            extend: (I18nText: import("lang/i18n").IXGI18nText) => {};
            use: (lang: import("lang/i18n").IXGI18nText) => {};
        };
        static STATE_CLASS: {
            DEFAULT: string;
            DEFAULT_SKIN: string;
            ENTER: string;
            PAUSED: string;
            PLAYING: string;
            ENDED: string;
            CANPLAY: string;
            LOADING: string;
            ERROR: string;
            REPLAY: string;
            NO_START: string;
            ACTIVE: string;
            FULLSCREEN: string;
            CSS_FULLSCREEN: string;
            PARENT_FULLSCREEN: string;
            ROTATE_FULLSCREEN: string;
            PARENT_ROTATE_FULLSCREEN: string;
            INNER_FULLSCREEN: string;
            NO_CONTROLS: string;
            FLEX_CONTROLS: string;
            CONTROLS_FOLLOW: string;
            AUTOHIDE: string;
            NOT_ALLOW_AUTOPLAY: string;
            SEEKING: string;
            PC: string;
            MOBILE: string;
            MINI: string;
        };
    }
    import Player from "player";
    import defaultPreset from "presets/default";
    import Util from "utils/util";
    import Errors from "error";
    import * as Events from "events";
    import Plugin from "plugin/plugin";
    import BasePlugin from "plugin/basePlugin";
}
declare module "xgplayer" {
    export type IBasePluginOptions = import("plugin/basePlugin").IBasePluginOptions;
    export type IPluginOptions = import("plugin/plugin").IPluginOptions;
    export type IPlayerOptions = import("defaultConfig").IPlayerOptions;
    export type IError = import("error").IError;
    export type IXGI18nText = import("lang/i18n").IXGI18nText;
    import PresetPlayer from "index-umd";
    import Player from "player";
    import Plugin from "plugin/plugin";
    import BasePlugin from "plugin/basePlugin";
    import * as Events from "events";
    import Errors from "error";
    import Sniffer from "utils/sniffer";
    import Util from "utils/util";
    import STATE_CLASS from "stateClassMap";
    import I18N from "lang/i18n";
    export { PresetPlayer as default, Player as SimplePlayer, Plugin, BasePlugin, Events, Errors, Sniffer, Util, STATE_CLASS, I18N };
}
