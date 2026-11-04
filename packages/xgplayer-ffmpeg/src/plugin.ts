import { BasePlugin, Errors, Events } from 'xgplayer'
import { FFmpeg } from './core/ffmpeg'
import { AUDIO_MIME, createAudioProfile } from './profiles/audio'
import { FFmpegError, type FFmpegPluginOptions } from './types'

type Player = BasePlugin['player']

interface SourceChange {
  readonly core: FFmpeg
  readonly time: number
  readonly paused: boolean
}

export class FFmpegPlugin extends BasePlugin {
  static readonly isStreamingPlugin = true

  static get pluginName(): string {
    return 'ffmpeg'
  }

  private core: FFmpeg | null = null
  private sourceChange: SourceChange | null = null
  private nativeSwitchURL: Player['switchURL'] | null = null
  private nativeChangeDefinition: Player['changeDefinition'] | null = null
  private nativeHandleSource: boolean | null = null
  private nativeSrc: PropertyDescriptor | null | undefined = null
  private eventsBound = false

  static isSupported(preferMMS = false, mimeType = AUDIO_MIME): boolean {
    return FFmpeg.isSupported(mimeType, preferMMS)
  }

  beforePlayerInit(): void {
    const player = this.player
    const previous = this.core
    this.core = null
    this.sourceChange = null
    if (previous) this.releaseCore(previous)
    const url = this.getUrl(player.config.url)
    const media = player.media as HTMLMediaElement | null
    if (!url || !media) {
      this.restorePlayer()
      return
    }
    try {
      const config = this.config as FFmpegPluginOptions
      const core = new FFmpeg(
        {
          ...config,
          media
        },
        config.profile ?? createAudioProfile(config.audio)
      )
      this.core = core
      const resolved = this.resolveUrl(url)
      this.takeSource(media)
      this.bindPlayerEvents()
      core.on('progress', (event) => {
        if (this.core === core) player.emit('ffmpegProgress', event)
      })
      core.on('ready', (metadata) => {
        if (this.core === core) player.emit('ffmpegReady', metadata)
      })
      core.on('error', (error) => {
        if (this.core === core) this.emitError(error)
      })
      // The core emits terminal errors; consume its rejected load promise.
      void core.load(resolved).catch(() => undefined)
    } catch (reason) {
      const core = this.core
      this.core = null
      if (core) this.releaseCore(core)
      this.restorePlayer()
      this.emitError(reason)
    }
  }

  destroy(): void {
    const core = this.core
    this.core = null
    this.sourceChange = null
    if (core) this.releaseCore(core)
    this.restorePlayer()
  }

  private takeSource(media: HTMLMediaElement): void {
    const player = this.player
    this.nativeHandleSource ??= player.handleSource
    this.nativeSwitchURL ||= player.switchURL
    this.nativeChangeDefinition ||= player.changeDefinition
    player.handleSource = false
    player.switchURL = this.onSwitchURL
    player.changeDefinition = this.onChangeDefinition
    if (this.nativeSrc !== null) return
    this.nativeSrc = Object.getOwnPropertyDescriptor(player, 'src')
    // The native src setter only recognizes MSE after attachment. During
    // preparation this adapter must also own direct src assignments.
    Object.defineProperty(player, 'src', {
      configurable: true,
      enumerable: this.nativeSrc?.enumerable ?? false,
      get: () => media.src || '',
      set: this.onSetSrc
    })
  }

  private bindPlayerEvents(): void {
    if (this.eventsBound) return
    this.on(Events.URL_CHANGE, this.onUrlChange)
    this.on(Events.DESTROY, () => this.destroy())
    this.eventsBound = true
  }

  private releaseCore(core: FFmpeg): void {
    const player = this.player
    void core.destroy().catch((reason: unknown) => this.emitError(reason, player))
  }

  private onSwitchURL: Player['switchURL'] = (source) => {
    const url = this.getUrl(source)
    if (!this.core || !url) {
      return this.nativeSwitchURL?.call(this.player, source) || null
    }
    return this.changeSource(url)
  }

  private onUrlChange = (source: unknown): void => {
    const url = this.getUrl(source)
    if (this.core && url) {
      // URL_CHANGE is an event, so there is no caller to consume the rejection.
      void this.changeSource(url).catch(() => undefined)
    }
  }

  private onSetSrc = (source: unknown): void => {
    this.player.emit(Events.URL_CHANGE, source)
  }

  private onChangeDefinition: Player['changeDefinition'] = (definition, from) => {
    const player = this.player
    const url = this.getUrl(definition.url)
    if (!this.core || !url) {
      return this.nativeChangeDefinition?.call(player, definition, from)
    }
    const list = player.config.definition?.list
    if (Array.isArray(list)) {
      for (const item of list) {
        if (item.definition === definition.definition) player.curDefinition = item
      }
    }
    player.emit(Events.DEFINITION_CHANGE, { from, to: definition })
    const promise = this.changeSource(url)
    void promise.then(
      (restored) => {
        if (restored)
          player.emit(Events.AFTER_DEFINITION_CHANGE, { from, to: definition })
      },
      () => undefined
    )
    return promise
  }

  private async changeSource(url: string): Promise<boolean> {
    const core = this.core
    if (!core) return false
    const player = this.player
    const change: SourceChange = {
      core,
      time: this.sourceChange?.time ?? (player.ended ? 0 : player.currentTime),
      paused: this.sourceChange?.paused ?? player.paused
    }
    this.sourceChange = change
    player.config.url = url
    try {
      let resolved: string
      try {
        resolved = this.resolveUrl(url)
      } catch (reason) {
        this.emitError(reason)
        throw reason
      }
      await core.load(resolved, change.time)
      if (this.core !== core || this.sourceChange !== change) return false
      if (change.paused) player.pause()
      else await player.play()
      if (this.core !== core || this.sourceChange !== change) return false
      this.sourceChange = null
      return true
    } catch (reason) {
      if (this.core !== core || this.sourceChange !== change) return false
      this.sourceChange = null
      throw reason
    }
  }

  private restorePlayer(): void {
    const player = this.player
    if (this.nativeSwitchURL && player.switchURL === this.onSwitchURL) {
      player.switchURL = this.nativeSwitchURL
    }
    if (
      this.nativeChangeDefinition &&
      player.changeDefinition === this.onChangeDefinition
    ) {
      player.changeDefinition = this.nativeChangeDefinition
    }
    if (this.nativeHandleSource !== null) {
      player.handleSource = this.nativeHandleSource
    }
    if (
      this.nativeSrc !== null &&
      Object.getOwnPropertyDescriptor(player, 'src')?.set === this.onSetSrc
    ) {
      if (this.nativeSrc) Object.defineProperty(player, 'src', this.nativeSrc)
      else Reflect.deleteProperty(player, 'src')
    }
    this.nativeSwitchURL = null
    this.nativeChangeDefinition = null
    this.nativeHandleSource = null
    this.nativeSrc = null
  }

  private resolveUrl(url: string): string {
    const result = this.getUrl(this.player.preProcessUrl(url))
    if (!result) throw new Error('FFmpeg URL preprocessing returned an empty URL')
    return result
  }

  private getUrl(source: unknown): string {
    if (typeof source === 'string') return source
    if (
      source &&
      typeof source === 'object' &&
      'url' in source &&
      typeof source.url === 'string'
    ) {
      return source.url
    }
    return ''
  }

  private emitError(reason: unknown, player: Player = this.player): void {
    const error =
      reason instanceof FFmpegError
        ? reason
        : new FFmpegError('runtime', 'FFmpeg initialization failed', reason)
    player.emit(
      Events.ERROR,
      new Errors(player, {
        errorType: 'other',
        errorCode: 0,
        errorMessage: error.message,
        originError: error.reason || error,
        ext: { stage: error.stage }
      })
    )
  }
}
