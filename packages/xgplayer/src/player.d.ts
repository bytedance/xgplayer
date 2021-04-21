import Proxy from './proxy'
import I18N from './lang'
import Events from './events'
import IPlayerOptions from './defaultConfig'
import STATE_CLASS from './stateClassMap'

declare class Player extends Proxy {

  constructor(options: IPlayerOptions);

  /**
   * 当前播放器的配置信息
   */
  config?: IPlayerOptions;

  /**
   * 当前播放器根节点
   */
  root?: HTMLElement;

  /**
   * 控制栏和video不同布局的时候内部容器
   */
  innerContainer?: HTMLElement;

  // 控制栏插件
  controls?: any;

  isReady: boolean;

  // 是否进入正常播放流程
  isPlaying: boolean;

  // 是否处于seeking进行状态
  isSeeking: boolean;

  // 是否处于可播放状态
  isCanplay: boolean;

  // 当前是否处于焦点状态
  isActive: boolean;

  // 当前是否处于css全屏状态
  isCssfullScreen: boolean;

  // 当前是否处于全屏状态
  fullscreen: boolean;

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
   *  播放器重播，重播的组件就调用了这个方法
   *
   */
  replay(): void;

  /**
   * 播放器进入全屏
   *
   * @param el 要进入的元素，通常传递`player.root`
   */
  getFullscreen(el: HTMLElement): void;

  /**
   * 播放器退出全屏
   *
   * @param el 要进入的元素，通常传递`player.root`
   */
  exitFullscreen(el: HTMLElement): void;

  /**
   * 播放器进入样式全屏
   *
   */
  getCssFullscreen(): void;

  /**
   * 播放器退出样式全屏
   *
   */
  exitCssFullscreen(): void;

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
   * @param 插件配置
   */
  registerPlugin(plugin: any) : any;

  /**
   * 注销插件
   * @param 插件配置
   */
  unRegisterPlugin(plugin: any) : any;

  /**
   * 根据插件名称获取插件对象
   * @param pluginName
   */
  getPlugin(pluginName: string) : any;

  /**
   * 给播放器根节点添加className
   * @param className
   */
  addClass (className: string): void;

  /**
   * 给播放器根节点移除className
   * @param className
   */
  removeClass (className: string): void;

  /**
   * 验证当前播放器根节点是否有某个className
   * @param className
   */
  hasClass (className: string): boolean;

  /**
   * 给播放器根节点添加某个属性
   * @param key
   * @param value
   */
  setAttribute (key: string, value: string): void;

  /**
   * 给播放器根节点移除某个属性
   * @param key 
   */
  removeAttribute (key: string): void;

  /**
   * 快进/快退
   * @param time
   */
  seek (time:  number): void;

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
  updateObjectPosition (left: number, top: number): void;

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
  get plugins(): Array<any>;

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
  get cumulateTime (): number;
}

export {
  Player as default,
  Events,
  Util,
  Sniffer,
  STATE_CLASS,
  I18N
}