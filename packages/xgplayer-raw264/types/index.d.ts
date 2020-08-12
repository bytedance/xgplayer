/**
 * @file index.d.ts
 * @author AppleMonkey2019(am_fe@qq.com)
 */

declare module 'xgplayer-raw264' {

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
    /**
     * video画面填充模式
     */
    videoFillMode?: 'fillHeight' | 'fillWidth' | 'fill' | 'auto';

    /**
     * 音量配置
     * 可以是音量值/音量插件的配置对象/是否显示音量插件
     */
    volume?: number | boolean | {
      position?: string,
      index?: number,
      disable?: boolean,
      default?: number
    };

    // 自动播放（默认false）
    autoplay?: boolean;
    // 默认静音自动播放

    autoplayMuted?: boolean;

    // 循环播放(默认false)
    loop?: boolean;

    // 初始化显示视频首帧（默认false,该配置在移动端无效)
    videoInit?: boolean;

    // 封面图 或者是封面图的配置对象
    poster?: string | {
      position?: string,
      index?: number,
      isEndedShow?: boolean,
      poster?: string
    };

    // 倍速播放
    // 播放器支持设置视频的当前播放速度。可通过defaultPlaybackRate设置初始速度。
    playbackRate?: any;

    // 默认播放速度
    defaultPlaybackRate?: number;

    // 清晰度切换插件配置
    definition?: any;

    // 视频旋转按钮配置项
    rotate?: any;

    // 预览
    thumbnail?: any;

    // 下一集
    playNext?: {
      urlList: string[];
    };

    // 视频下载(默认false)
    download?: boolean;

    // 弹幕（具体用法参考https://github.com/bytedance/danmu.js）
    danmu?: DanmuOptions;

    // 外挂字幕（参考https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API）
    textTrack?: TextTrack[];

    // 外挂字幕样式
    textTrackStyle?: Record<string, string | number>;

    // 配置项修改外挂字幕控件的触发方式
    textTrackActive?: 'hover' | 'click';

    // 画中画
    pip?: boolean;

    // 网页样式全屏
    cssFullscreen?: boolean;

    // 截图
    screenShot?: boolean;

    // 预览本地视频
    preview?: {uploadEl?: HTMLElement};

    // 进度条特殊点标记
    progressDot?: Array<{time: number; text?: string; duration?: number}>;

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

    // 关闭鼠标移出播放器控制条范围时触发focus事件
    closeControlsBlur?: boolean;

    // 关闭播放器范围时移动鼠标时触发video focus
    closeFocusVideoFocus?: boolean;

    // 是否关闭pause时触发focus
    closePauseVideoFocus: boolean;

    // 关闭播放器触发play事件时触发video focus
    closePlayVideoFocus?: boolean;

    // 清晰度切换配置
    definitionActive?: 'hover' | 'click';

    // 关闭内置控件
    // eslint-disable-next-line max-len
    ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>;

    // 关闭控制条， 默认true
    controls?: any;

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

    /**
     *  将画面拉伸到容器大小
     */
    stretch: boolean;
    /**
     * 流渲染的刷新率
     */
    fps: number;

    // 微信同层播放
    'x5-video-player-type'?: 'h5';

    // 微信全屏播放
    'x5-video-player-fullscreen'?: boolean;

    // 微信横竖屏控制
    'x5-video-orientation'?: 'landscape' | 'portraint';

    // 自定义配置
    customConfig?: Record<string, unknown>;

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

    // 移动端滑动进行快进/快退开始时回调
    disableSwipeHandler?: () => void;

    enableSwipeHandler?: () => void;

    //扩展定义
    [propName: string]: any;
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
     * 插件存储对象
     */
    public plugins: any;

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

    /**
     * 注册插件
     * @param 插件配置
     */
    public registerPlugin(plugin: any) : any

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
     * 将264的流送入进行解码播放
     */
    pushBuffer: (h264Buffer: Uint8Array) => void;
  }

  export default Player;

}
