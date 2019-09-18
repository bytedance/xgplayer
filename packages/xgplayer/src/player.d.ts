import Errors from './error'
import Proxy, { ProxyOptions } from './proxy'
import { Sniffer } from './utils/sniffer'
import { Util } from './utils/util'

declare class Player extends Proxy {
  public constructor(options: PlayerOptions)

  public readonly root: HTMLElement
  public readonly controls: HTMLElement
  public config: PlayerOptions

  public start(url?: string): void
  public reload(): void
  public destroy(isDelDom?: boolean): void
  public replay(): void
  public getPIP(): void
  public exitPIP(): void
  public rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void
  public static install(name: string, descriptor: Function): void

  private pluginsCall(): void
  private onFocus(): void
  private onBlur(): void
  private onPlay(): void
  private onPause(): void
  private onEnded(): void
  private onSeeking(): void
  private onSeeked(): void
  private onWaiting(): void
  private onPlaying(): void
  private onKeydown(event: KeyboardEvent, player: Player): void

  public addProgressDot(time: number): void
  public removeProgressDot(time: number): void
  public removeAllProgressDot(): void

  static sniffer: Sniffer
  static Errors: Errors
  static util: Util
}

export default Player

export interface PlayerOptions extends ProxyOptions {
  url: string | { src: string; type: string }[]
  fluid?: boolean
  width?: number
  height?: number
  volume?: number
  videoInit?: boolean
  poster?: string
  playbackRate?: number[]
  defaultPlaybackRate?: number
  rotate?: {
    innerRotate: boolean
    clockwise: boolean
  }
  thumbnail?: {
    pic_num: number
    width: number
    height: number
    col: number
    row: number
    urls: string[]
  }
  playNext?: {
    urlList: string[]
  }
  download?: boolean
  danmu?: Danmu
  textTrackActive?: 'hover' | 'click'
  pip?: boolean
  cssFullscreen?: boolean
  screenShot?: boolean
  preview?: {
    uploadEl: HTMLElement
  }
  progressDot?: {
    time: number
  }[]
  keyShortcut?: 'on' | 'off'
  execBeforePluginsCall?: Function[]
  closeVideoClick?: boolean
  closeVideoDblclick?: boolean
  closeVideoTouch?: boolean
  closePlayerBlur?: boolean
  closeControlsBlur?: boolean
  closeFocusVideoFocus?: boolean
  closePlayVideoFocus?: boolean
  definitionActive?: 'hover' | 'click'
  ignores?: (
    | 'time'
    | 'definition'
    | 'error'
    | 'fullscreen'
    | 'i18n'
    | 'loading'
    | 'mobile'
    | 'pc'
    | 'play'
    | 'poster'
    | 'progress'
    | 'replay'
    | 'start'
    | 'volume')[]
  controls?: boolean
  controlsList?: ('nodownload' | 'nofullscreen' | 'noremoteplayback')[]
  pluginRule?: (player?: Player) => boolean
  lang?: 'zh-cn' | 'en' | 'jp'
  whitelist?: (RegExp | string | ((ua?: string) => boolean))[]
  debug?: {
    host?: string
    port?: number
  }
  customConfig?: object
}

interface Danmu {
  comments: DanmuComment[]
  panel?: boolean
  area?: {
    start: number
    end: number
  }
  closeDefaultBtn?: boolean
  defaultOff?: boolean
}

interface DanmuComment {
  duration: number
  id: unknown
  start: number
  prior?: boolean
  color?: boolean
  txt: string
  style?: {
    color?: string
    fontSize?: string
    border?: string
    borderRadius?: string
    padding?: string
    backgroundColor?: string
  }
  mode?: 'top' | 'bottom' | 'scroll'
}
