declare class Proxy {
  video?: HTMLElement;

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
  // set crossOrigin(value: string | null): ;

  // 设置/返回视频播放地址
  get currentSrc(): any;
  set currentSrc(value: any);

  // 设置/返回视频当前播放时间
  get currentTime(): number;
  set currentTime(value: number);

  // 设置/返回视频默认静音
  get defaultMuted(): boolean;
  // set defaultMuted(value: boolean): void;

  // 返回视频时长，单位：秒
  get duration(): string;

  // 返回视频是否播放结束
  get ended(): string;

  // 视频错误信息，该错误会返回当前语言的文本
  get error(): string;

  // 是否开启了循环播放
  get loop(): boolean;
  // set loop(value: boolean): void;

  // 静音
  get muted(): boolean;
  // set muted(value: boolean): void;

  // 返回视频的当前网络状态
  get networkState() : string | undefined;

  // 返回当前视频是否是暂停状态
  get paused(): boolean;

  get played (): any;

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
   getBufferedRange() : Array<{
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
}

export default Proxy
