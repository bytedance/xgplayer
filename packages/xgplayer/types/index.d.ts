/**
 * @file index.d.ts
 * @author AppleMonkey2019(am_fe@qq.com)
 */
import {
    BasePluginConfig,
    ControlsConfig,
    PCConfig,
    MobileConfig,
    ProgressConfig,
    IsPot,
    ProgressPreviewConfig,
    ThumbnailConfig,
    DefinitionConfig,
    PlayBackRateConfig,
    PIPConfig,
    PosterConfig,
    EnterConfig,
    FullscreenConfig,
    KeyboardConfig,
    MiniScreenConfig,
    VolumeConfig,
    Texttrack,
    TexttrackStyle,
    TextTrackConfig,
    StartConfig,
    RotateConfig,
    ScreenShotConfig
} from './pluginConfig'

declare module 'xgplayer' {
    import {EventEmitter} from 'events';

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

    export interface Util {
        createDom(el: string, tpl?:string, attrs?:object, cname?:string): HTMLElement | null;
        createDomFromHtml (html: string, attrs?:object , classname?:string): HTMLElement | null;
        hasClass (el: HTMLElement, className: string): boolean;
        addClass(el: HTMLElement, className: string): void;
        removeClass(el: HTMLElement, className: string): void;
        toggleClass(el: HTMLElement, className: string): void;
        findDom(el: HTMLElement, sel: string): HTMLElement | null;
        getCss(dom: HTMLElement, key: string): string;
        padStart(str: string | number, length: number, pad: number): string;
        format(time: number): string;
        event(e: Event): void;
        typeOf (obj: any): string;
        deepCopy(dst: object, src: object): object;
        deepMerge(dst: object, src: object): object;
        getBgImage(el: HTMLElement): string;
        copyDom(dom: HTMLElement): HTMLElement | '';
        setInterval(context: any, eventName: string, intervalFunc: any, frequency: number): void;
        clearInterval(context: any, eventName: string): void;
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

    export interface Sniffer{
        device: string;
        browser: string;
        os: OS_TYPE;
        isWeixin: boolean;
    }

    export interface Events {
        PLAY: string;
        PLAYING: string;
        ENDED: string;
        PAUSE: string;
        ERROR: string;
        SEEKING: string;
        SEEKED: string;
        TIME_UPDATE: string;
        WAITING: string;
        CANPLAY: string;
        CANPLAY_THROUGH: string;
        DURATION_CHANGE: string;
        VOLUME_CHANGE: string;
        LOADED_DATA: string;
        RATE_CHANGE: string;
        PROGRESS: string;
        LOAD_START: string;
        EMPTIED: string;
        STALLED: string;
        SUSPEND: string;
        ABORT: string;
      // player events
        BUFFER_CHANGE: string;
        PLAYER_FOCUS: string;
        PLAYER_BLUR: string;
        READY: string;
        URL_NULL: string;
        AUTOPLAY_STARTED: string;
        AUTOPLAY_PREVENTED: string;
        COMPLETE: string;
        REPLAY: string;
        DESTROY: string;
        URL_CHANGE: string;
      // screen change evnets
        FULLSCREEN_CHANGE: string;
        CSS_FULLSCREEN_CHANGE: string;
        MINI_STATE_CHANGE: string;
        DEFINITION_CHANGE: string;
        BEFORE_DEFINITION_CHANGE: string;
        AFTER_DEFINITION_CHANGE: string;
      // transmuxer events
        SEI_PARSED: string;
        RETRY: string;
      }

      export interface STATE_CLASS {
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
        ROTATE_FULLSCREEN: string;
        NO_CONTROLS: string;
        FLEX_CONTROLS: string;
        CONTROLS_FOLLOW: string;
        AUTOHIDE: string;
        NOT_ALLOW_AUTOPLAY: string;
        SEEKING: string;
        PC: string;
        MOBILE: string;
        MINI: string // 小窗播放状态
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
        url: string | Array<{src: string; type?: string}>;

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
        isMobileSimulateMode?: boolean

        // 倍速播放
        // 播放器支持设置视频的当前播放速度。可通过defaultPlaybackRate设置初始速度。
        playbackRate?: Boolean | Array<Number> | PlayBackRateConfig;

        // 默认播放速度
        defaultPlaybackRate?: number;

        // 预览本地视频
        preview?: {uploadEl?: HTMLElement};

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
        debug?: {host: string; port: number};

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
        textTrackStyle?: TexttrackStyle |  Record<string, string | number>;

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

    export class BasePlugin {
        static defineGetterOrSetter (Obj: object, map: object): void;
        constructor (args: object);
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
        updateLang (lang: string): void;

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
        on (event: string, callback: Function): void;

        /**
         * 添加事件监听
         * @param event
         * @param callback
         */
        once (event: string, callback: Function): void;

        /**
         * 解除事件监听
         * @param event
         * @param callback
         */
        off (event: string, callback: Function): void;

        /**
         * 解除所有事件监听
         */
        offAll (): void;

        /**
         * 触发某个事件
         * @param event
         * @param data
         */
        emit (event: string, data: any): void;

        /**
         * 注册一个插件
         * @param plugin 插件构造器
         * @param options 插件配置
         * @param name 插件名称
         */
        registerPlugin (plugin: object, options?: object, name?: string): BasePlugin | null;

        /**
         * 根据插件名称获取插件实例
         * @param name
         */
        getPlugin (name:string): BasePlugin;

        /**
         * 播放器销毁回调
         */
        destroy (): void;

        /**
         * 销毁播放器
         */
        __destroy (): void;
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

    export class Plugin extends BasePlugin {

        static ROOT_TYPES: ROOT_TYPES;

        static POSITIONS: POSITIONS;
        /**
          * 插入dom结构
          * @param {String | Element} html html字符串或者dom
          * @param {Element} parent
          * @param {*} index
          */
        static insert (html: string, parent: HTMLElement, index:number): HTMLElement;

        /**
         * 默认配置信息
         */
        static defaultConfig: object;

        static delegate (root: HTMLElement, querySelector?: string, eventType?:string | Array<string>, callback?: Function, capture?:boolean): void;

        static removeDelegate (root: HTMLElement, eventType?:string | Array<string>, callback?: Function, capture?:boolean): void;

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
        children (): object;
        /**
         * 在当前插件根节点查找dom
         * @param selector 选择器
         */
        find (selector: string): HTMLElement;
        /**
         * 给当前插件设置行间样式
         * @param name css属性名
         * @param value css属性值
         */
        setStyle (name: string, value: string): void;
        setStyle (styles: object): void;
        setAttr (name: string | object, value?: string): void;

        setHtml (htmlStr: string, callback?:Function): void;

        show (value?:string): void;

        hide (): void;

        appendChild (pdom: HTMLElement | string, child?: HTMLElement): HTMLElement | null;
        render (): string;
    }

    class DefaultPreset {
        constructor();
        plugins: Array<Plugin | BasePlugin>;
        ignores: Array<string>
    }

    class Proxy extends EventEmitter {

        // 是否开始播放
        public hasStart: boolean;

        // 设置/返回 自动播放属性
        public autoplay: boolean;

        // 返回当前缓冲的TimeRange对象集合
        public buffered: TimeRanges;

        // 设置/返回是否跨域
        public crossOrigin: string | null;

        // 设置/返回视频播放地址
        public currentSrc: string;

        // 设置/返回视频当前播放时间
        public currentTime: number;

        // 设置/返回视频默认静音
        public defaultMuted: boolean;

        // 返回视频时长，单位：秒
        public duration: number;

        // 返回视频是否播放结束
        public ended: boolean;

        // 视频错误信息，该错误会返回当前语言的文本
        public error: string | null;

        // 是否开启了循环播放
        public loop: boolean;

        // 静音
        public muted: boolean;

        // 返回视频的当前网络状态
        public networkState: number;

        // 返回视频的就绪状态
        public readyState: string;

        // 设置/返回当前视频的地址
        public src: string;

        // 设置/返回视频的音量
        public volume: number;

        // 播放器外层容器 DOM
        public root: HTMLElement;

        // 播放器控制条外层容器 DOM
        public controls: HTMLElement;

        // 播放器是否处于全屏状态
        public readonly fullscreen: boolean;

        // 播放器弹幕是否开启
        public readonly bullet: boolean;

        // 播放器外挂字幕是否开启
        public readonly textTrack: boolean;

        // 播放器画中画是否开启
        public readonly pip: boolean;

        /**
         * 播放
         *
         */
        public play(): Promise<void>;

        /**
         * 播放
         *
         */
        public pause(): void;

        /**
         * 重新加载视频
         *
         */
        public reload(): void;

        /**
         * 重置播放器dom上的类名
         *
         */
        public resetClasses(): void;

        /**
         * 检测您的浏览器是否能播放不同类型的视频
         *
         * @param type 可播放类型，'video/mp4; codecs="avc1.64001E, mp4a.40.5"'
         */
        public canPlayType(type: string): CanPlayTypeResult;

        /**
         *  返回当前的缓冲片段时间范围，start表示缓冲起始时间，end表示缓存截止时间
         *
         */
        public getBufferedRange(): [number, number];

        /**
         * 播放器销毁
         *
         */
        public destroy(): void;

        /**
         *  播放器重播，重播的组件就调用了这个方法
         *
         */
        public replay(): void;

        /**
         * 绑定video对象
         */
        public attachVideoEvents(el: HTMLElement): void;

        /**
         * 解除绑定video元素
         */

        public detachVideoEvents(el: HTMLElement): void;

    }

    class Player extends Proxy {

        /**
         * 插件的安装方法
         *
         * @param name 插件的名字
         * @param descriptor 插件函数
         */
        public static install(name: string, descriptor: (this: Player, player: Player) => void): void;

        /**
         * 多语言包
         */
        public static I18N: {
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
        };

        public static Util: Util;

        public static Sniffer: Sniffer;

        public static Events: Events;

        public static defaultPreset: DefaultPreset;
        
        /**
         * 插件存储对象
         */
        public plugins: any;

        /**
         * 当前语言包
         */
        public i18n: object;

        /**
         * 当前语言包包含的信息
         */
        public i18nKeys: object;

        /**
         * 当前语言
         */
        public lang: string;

        constructor(options: IPlayerOptions);

        /**
         * 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
         *
         * @param url 视频地址
         */
        public start(url?: string): void;

        /**
         * 重新加载视频
         *
         */
        public reload(): void;

        /**
         * 播放器销毁
         *
         * @param isDelDom 是否删除Dom
         */
        public destroy(isDelDom?: boolean): void;

        /**
         *  播放器重播，重播的组件就调用了这个方法
         *
         */
        public replay(): void;

        /**
         * 播放器进入全屏
         *
         * @param el 要进入的元素，通常传递`player.root`
         */
        public getFullscreen(el: HTMLElement): void;

        /**
         * 播放器退出全屏
         *
         * @param el 要进入的元素，通常传递`player.root`
         */
        public exitFullscreen(el: HTMLElement): void;

        /**
         * 播放器进入样式全屏
         *
         */
        public getCssFullscreen(): void;

        /**
         * 播放器退出样式全屏
         *
         */
        public exitCssFullscreen(): void;

        /**
         * 播放器旋转
         *
         * @param clockwise 是否顺时针旋转，默认false
         * @param innerRotate 是否内部旋转，默认true
         * @param times 旋转次数（一次旋转90度），默认1
         */
        public rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void;

        /**
         * 注册插件
         * @param 插件配置
         */
        public registerPlugin(plugin: any) : any

        /**
         * 注销插件
         * @param 插件配置
         */
        public unRegisterPlugin(plugin: any) : any

        /**
         * 根据插件名称获取插件对象
         * @param pluginName
         */
        public getPlugin(pluginName: string) : any

        /**
         * 快进/快退
         * @param time
         */
        public seek (time:  number): void

        /**
         * 启用某个插件定义的hook
         * @param pluginName 插件名称/key
         * @param hookName
         * @param handler
         */
        public usePluginHooks(pluginName: string, hookName: string, handler: (data?: any) => any): void;
    }

    export default Player
}
