import * as CSS from 'csstype'
import { Emitter, EmitterMethod } from 'event-emitter'

declare class Proxy implements Emitter {
  public constructor(options: ProxyOptions)

  public hasStart: boolean
  public autoplay: HTMLMediaElement['autoplay']
  public readonly buffered: HTMLMediaElement['buffered']
  public crossOrigin: HTMLMediaElement['crossOrigin']
  public readonly currentSrc: HTMLMediaElement['currentSrc']
  public currentTime: HTMLMediaElement['currentTime']
  public defaultMuted: HTMLMediaElement['defaultMuted']
  public readonly duration: HTMLMediaElement['duration']
  public readonly ended: HTMLMediaElement['ended']
  public readonly error: string | null
  public loop: HTMLMediaElement['loop']
  public muted: HTMLMediaElement['muted']
  public readonly networkState: string
  public readonly readyState: string
  public src: HTMLMediaElement['src']
  public volume: HTMLMediaElement['volume']
  public readonly fullscreen: boolean
  public readonly bullet: boolean
  public readonly textTrack: boolean
  public readonly pip: boolean

  public readonly paused: HTMLMediaElement['paused']
  public playbackRate: HTMLMediaElement['playbackRate']
  public readonly played: HTMLMediaElement['played']
  public preload: HTMLMediaElement['preload']
  public readonly seekable: HTMLMediaElement['seekable']
  public readonly seeking: HTMLMediaElement['seeking']

  public destroy(): void
  public play: HTMLMediaElement['play']
  public pause: HTMLMediaElement['pause']
  public canPlayType: HTMLMediaElement['canPlayType']
  public reload(): void
  public getBufferedRange(): [number, number]

  public off: EmitterMethod
  public on: EmitterMethod
  public once: EmitterMethod
  public emit(type: string, ...args: any[]): void
}

export default Proxy

export interface ProxyOptions {
  'id'?: string
  'el'?: HTMLElement
  'airplay'?: boolean
  'autoplay'?: boolean
  'autoplayMuted'?: boolean
  'loop'?: boolean
  'playsinline'?: boolean
  'textTrack'?: TextTrack[]
  'textTrackStyle'?: CSS.PropertiesHyphen
  'x5-video-orientation'?: 'landscape' | 'portraint'
  'x5-video-player-fullscreen'?: boolean
  'x5-video-player-type'?: 'h5' | ''
}

export type TextTrack = {
  src: HTMLTrackElement['src']
  kind?: HTMLTrackElement['kind']
  label: HTMLTrackElement['label']
  srclang?: HTMLTrackElement['srclang']
  default?: HTMLTrackElement['default']
}
