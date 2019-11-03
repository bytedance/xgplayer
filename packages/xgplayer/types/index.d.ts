/**
 * @file index.d.ts
 * @author AppleMonkey2019(am_fe@qq.com)
 */

declare module 'xgplayer' {

    import {EventEmitter} from 'events';

    export interface IPlayerOptions {

        // 选择器
        id?: string;

        // DOM实例
        el?: HTMLElement;

        // 视频源
        url: string | Array<{src: string, type?: string}>;

        // 宽度(默认600)
        width?: number;

        // 高度（默认337.5）
        height?: number;

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

        // 循环播放(默认false)
        loop?: boolean;

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
        }

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
        }

        // 下一集
        playNext?: {
            urlList: string[];
        }

        // 视频下载(默认false)
        download?: boolean

        // 弹幕 todo
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
    }

    class Player extends Proxy {

        constructor(options: IPlayerOptions);

        /**
         * 插件的安装方法
         *
         * @param name 插件的名字
         * @param descriptor 插件函数
         */
        static install(name: string, descriptor: (this: Player, player: Player) => void): void;

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
         * 播放器获取画中画，可自定义触发画中画功能的条件，不局限于播放器控件中使用
         *
         */
        public getPIP(): void;

        /**
         * 播放器还原画中画，可自定义触发还原画中画功能的条件，不局限于播放器控件中使用
         */
        public exitPIP(): void;

        /**
         * 播放器旋转
         *
         * @param clockwise 是否顺时针旋转，默认false
         * @param innerRotate 是否内部旋转，默认true
         * @param times 旋转次数（一次旋转90度），默认1
         */
        public rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void;
    }

    export default Player;
}

