/**
 * @file index.d.ts
 * @author AppleMonkey2019(am_fe@qq.com)
 */

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

    interface keyShortcutStepOptions {
        currentTime?: number;
        volume?: number;
    }

    interface controlPluginOptions {
        method: VoidFunction;
        name?: string;
    }

    interface Util {
        createDom: (el: string, tpl?: string, attrs?: object, cname?: string) => HTMLElement;
        hasClass: (el: HTMLElement, cname: string) => boolean;
        addClass: (el: HTMLElement, cname: string) => void;
        removeClass: (el: HTMLElement, cname: string) => void;
        toggleClass: (el: HTMLElement, cname: string) => void;
        findDom: (el: HTMLElement, sel: string) => HTMLElement | null;
        padStart: (str: string, num: number, pad: string) => string;
        format: (f: number) => string;
        deepCopy: (src: object, dist: object) => object;
        getBgImage: (el: HTMLElement) => string;
        isWeiXin: () => boolean;
    }

    export interface TextTrack {
        src: string;
        kind: string;
        label: string;
        srclang: string;
        default: boolean;
    }

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

        // 音量（默认0.6,参考值：0 ~ 1)
        volume?: number;

        // 自动播放（默认false）
        autoplay?: boolean;

        // 静音自动播放（默认false）
        autoplayMuted?: boolean;

        // 循环播放(默认false)
        loop?: boolean;

        // 预加载
        preload?: string;

        // 初始化显示视频首帧（默认false,该配置在移动端无效)
        videoInit?: boolean;

        // 封面图
        poster?: string;

        // 倍速播放
        // 播放器支持设置视频的当前播放速度。可通过defaultPlaybackRate设置初始速度。
        playbackRate?: number[];
        defaultPlaybackRate?: number;

        // 视频旋转按钮配置项
        rotate?: {

            // 只旋转内部video(默认false)
            innerRotate?: boolean;

            // 旋转方向是否为顺时针(默认false)
            clockwise?: boolean;
        };

        // 预览
        thumbnail?: {

            // 该视频资源所需预览小图数量
            pic_num: number;

            // 预览小图宽度
            width: number;

            // 预览小图高度
            height: number;

            // 	sprite图每列的预览小图数量
            col: number;

            // sprite图每行的预览小图数量
            row: number;

            // sprite图的源地址数组
            urls: string[];
        };

        // 下一集
        playNext?: {
            urlList: string[];
        };

        // 视频下载(默认false)
        download?: boolean;

        // 弹幕（具体用法参考https://github.com/bytedance/danmu.js）
        danmu?: DanmuOptions;

        // 自研外挂字幕
        textTrack?: TextTrack[];

        // 原生外挂字幕（参考https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API）
        nativeTextTrack?: TextTrack[];

        // 外挂字幕样式
        textTrackStyle?: Record<string, string | number>;

        // 配置项修改外挂字幕控件的触发方式
        textTrackActive?: 'hover' | 'click';

        // 画中画
        pip?: boolean;

        // 迷你播放器
        miniplayer?: boolean;

        // 迷你播放器
        miniplayerConfig?: object;

        // 网页样式全屏
        cssFullscreen?: boolean;

        // 截图
        screenShot?: {
            hideButton?: boolean;
            iconText?: string;
            saveImg?: boolean;
        };

        // 预览本地视频
        preview?: {uploadEl?: HTMLElement};

        // 进度条特殊点标记
        progressDot?: Array<{time: number; text?: string; duration?: number, style?: object}>;

        // 键盘快捷键 默认值：'on'
        keyShortcut?: 'on' | 'off';

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

        // 关闭鼠标移出播放器控制条范围时触发focus事件
        closeControlsBlur?: boolean;

        // 关闭播放器范围时移动鼠标时触发video focus
        closeFocusVideoFocus?: boolean;

        // 关闭播放器触发play事件时触发video focus
        closePlayVideoFocus?: boolean;

        // 关闭播放器的点击阻止冒泡
        closeVideoStopPropagation?: boolean;

        // 禁止拖动进度条
        disableProgress?: boolean;

        // 打开右键菜单
        enableContextmenu?: boolean;

        // 清晰度切换配置
        definitionActive?: 'hover' | 'click';

        // 关闭内置控件
        // eslint-disable-next-line max-len
        ignores?: Array<'cssFullscreen' | 'danmu' | 'enter'  | 'download' | 'errorRetry' | 'time' | 'localPreview' | 'logger' | 'memoryPlay' | 'pip' | 'playNext' | 'reload' | 'rotate' | 'screenShot' | 'definition' | 'error' | 'fullscreen' | 'i18n' | 'loading' | 'mobile' | 'pc' | 'play' | 'playbackRate' | 'poster' | 'progress' | 'replay' | 'start' | 'volume'>;

        // 关闭控制条， 默认true
        controls?: boolean;

        // 控制条选项配置
        controlsList?: Array<'nodownload' | 'nofullscreen' | 'noremoteplayback'>;

        // 播放镜像 https://support.apple.com/en-us/HT204289
        airplay?: boolean;

        // 功能插件开关配置
        // 通过播放器的配置可以实现插件动态开启和关闭，只要在功能插件读取该配置即可。
        pluginRule?: () => boolean;

        // 国际化
        lang?: string | object;

        // 白名单
        // 手机上video表现各异，自定义UI会有意想不到的情况发生，为了安全起见，播放器在手机上会关掉自定义UI功能，开发者可以通过白名单的方式开启此项功能
        whitelist?: [string | RegExp | ((ua: string) => boolean)];

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

        //播放媒体类型
        mediaType?: string;

        domain?: string;

        kid?: string;

        disableSwipeHandler?: VoidFunction;

        enableSwipeHandler?: VoidFunction;

        allowSeekAfterEnded?: boolean;

        allowPlayAfterEnded?: boolean;

        disableStartLoad?: boolean;

        //播放错误提示
        errorTips?: string;

        keyShortcutStep?: keyShortcutStepOptions;

        //关闭长按增加倍速功能
        disableLongPress?: boolean;

        //移动端支持双击暂停/播放
        enableVideoDbltouch?: boolean;

        //使播放器控制栏常驻不隐藏
        closeInactive?: boolean;

        //触发全屏时实现样式全屏横屏
        rotateFullscreen?: boolean;

        //关闭点击播放器video元素的阻止默认动作行为
        closeVideoPreventDefault?: boolean;

        //支持进度条只能拖动到已播过部分
        allowSeekPlayed?: boolean;

        //引用插件
        controlPlugins?: Array<controlPluginOptions>;

        //不自动引用多语言插件
        closeI18n?: boolean;

        //视频起播时间（单位：秒）
        lastPlayTime?: number;

        //提示文字展示时长（单位：秒）
        lastPlayTimeHideDelay?: number;

        //隐藏中间按钮
        hideStartBtn?: boolean;

        //video元素样式
        videoStyle?: object;
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

        // 设置/返回当前倍速
        public playbackRate: number;

        // 返回当前播放是否处于暂停状态
        public readonly paused: number;

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

        public proxyOn (event: string, fn: VoidFunction): void;
          
        public proxyOnce (event: string, fn: VoidFunction): void;
    }

    class Danmu {

        // 弹幕初始化并播放(内部默认已调用)
        public start(): void;

        // 弹幕暂停
        public pause(): void;

        // 弹幕继续播放
        public play(): void;

        // 弹幕停止并消失
        public stop(): void;

        // 发一条弹幕
        public sendComment(option: DanmuCommentOptions): void;

        // 按照id改变某一个弹幕的持续显示时间
        public setCommentDuration(id: string, duration: number): void;

        // 改变所有已加入队列弹幕的持续显示时间
        public setAllDuration(mode: DanmuModelType, duration: number): void

        // 改变某一个弹幕的id
        public setCommentID(oldID: string, newID: string): void

        // 屏蔽某一类弹幕(参数可选值 scroll | top | bottom | color)
        public hide(mode: DanmuModelType): void

        // 显示某一类弹幕(参数可选值 scroll | top | bottom | color)
        public show(mode: DanmuModelType): void;
    }

    class Player extends Proxy {

        /**
         * 插件的安装方法
         *
         * @param name 插件的名字
         * @param descriptor 插件函数
         */
        public static install(name: string, descriptor: (this: Player, player: Player) => void): void;

        public static use(name: string, descriptor: (this: Player, player: Player) => void): void;

        public static installAll(list: Array<{name: string; method: (this: Player, player: Player) => void}>): void;

        public static useAll(list: Array<{name: string; method: (this: Player, player: Player) => void}>): void;

        public static controlsRun(list: Array<{name?: string; method: (this: Player, player: Player) => void}>, context: Player): void;

        public static util: Util;

        public danmu: Danmu;

        constructor(options: IPlayerOptions);

        /**
         * 向容器添加video元素
         *
         */
        public attachVideo(): void;

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
         * 进入横屏样式全屏
         *
         */
        public getRotateFullscreen(): void;

        /**
         * 退出横屏样式全屏
         *
         */
        public exitRotateFullscreen(): void;

        /**
         * 下载
         *
         */
        public download(): void;

        /**
         * 插件执行
         *
         */
        public pluginsCall(): void;

        /**
         * 播放器获取画中画，可自定义触发画中画功能的条件，不局限于播放器控件中使用
         *
         */
        public getPIP(): void;

        /**
         * 播放器还原画中画，可自定义触发还原画中画功能的条件，不局限于播放器控件中使用
         */
        public exitPIP(): void;

        /**
         * 进入迷你播放器模式
         *
         */
        public getMiniplayer(): void;

        /**
         * 退出迷你播放器模式
         */
        public exitMiniplayer(): void;

        /**
         * 更新旋转角度
         *
         */
        public updateRotateDeg(): void;

        /**
         * 播放器旋转
         *
         * @param clockwise 是否顺时针旋转，默认false
         * @param innerRotate 是否内部旋转，默认true
         * @param times 旋转次数（一次旋转90度），默认1
         */
        public rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void;

        /**
         * focus事件回调方法
         *
         */
        public onFocus(): void;

        /**
         * blur事件回调方法
         *
         */
        public onBlur(): void;

        /**
         * play事件回调方法
         *
         */
        public onPlay(): void;

        /**
         * pause事件回调方法
         *
         */
        public onPause(): void;

        /**
         * ended事件回调方法
         *
         */
        public onEnded(): void;

        /**
         * seeking事件回调方法
         *
         */
        public onSeeking(): void;

        /**
         * seeked事件回调方法
         *
         */
        public onSeeked(): void;

        /**
         * waiting事件回调方法
         *
         */
        public onWaiting(): void;

        /**
         * play事件回调方法
         *
         */
        public onPlaying(): void;

        /**
         * 添加标记
         *
         * @param time 标记时间
         */
        public addProgressDot(time: number, text?: string, duration?: number, style?: object): void;

        /**
         * 删除标记
         * @param time 标记时间
         */
        public removeProgressDot(time: number): void;

        /**
         * 删除所有标记
         *
         */
        public removeAllProgressDot(): void;

        /**
         * 获取当前清晰度
         *
         */
         public getCurrentDefinition(): object;

         /**
         * 切换到指定清晰度
         *
         */
        public switchDefinition(definitionObj: object): void;
    }

    export default Player;
}
