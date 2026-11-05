import EventEmitter from 'eventemitter3'
import { MSE } from 'xgplayer-streaming-shared'
import { FLAC_MIME } from '../profiles/audio'
import { Transcoder } from '../transcoder/transcoder'
import {
  FFmpegError,
  type FFmpegMetadata,
  type FFmpegOptions,
  type FFmpegOutputProfile,
  type FFmpegProgress
} from '../types'
import { LoadSession } from './session'

interface FFmpegEvents {
  progress: (event: FFmpegProgress) => void
  ready: (metadata: FFmpegMetadata) => void
  error: (error: FFmpegError) => void
}

export class FFmpeg extends EventEmitter<FFmpegEvents> {
  readonly media: HTMLMediaElement
  private activeLoad: LoadSession | null = null
  private destruction: Promise<void> | null = null
  private destroyed = false
  private readonly transcoder: Transcoder

  constructor(
    private readonly options: FFmpegOptions,
    private readonly profile: FFmpegOutputProfile
  ) {
    super()
    this.validateOptions()
    this.media = options.media || document.createElement(profile.type)
    this.transcoder = new Transcoder(options, profile)
  }

  static isSupported(mimeType: string, preferMMS = false): boolean {
    return (
      typeof WebAssembly !== 'undefined' &&
      typeof Worker !== 'undefined' &&
      MSE.isSupported(mimeType, preferMMS)
    )
  }

  async load(source: string, startTime = 0): Promise<number> {
    if (this.destroyed) throw new Error('FFmpeg is destroyed')
    const previous = this.activeLoad
    const session = new LoadSession(
      this.media,
      this.options,
      this.transcoder,
      startTime,
      {
        ready: (metadata) => {
          if (this.isActive(session)) this.emit('ready', metadata)
        },
        progress: (event) => {
          if (this.isActive(session)) this.emit('progress', event)
        },
        error: (error) => this.fail(session, error)
      }
    )
    this.activeLoad = session
    void this.run(session, source, previous)
    return session.ready
  }

  destroy(): Promise<void> {
    if (this.destruction) return this.destruction
    this.destroyed = true
    const session = this.activeLoad
    this.activeLoad = null
    this.removeAllListeners()
    this.transcoder.destroy()
    this.destruction = session?.dispose() ?? Promise.resolve()
    return this.destruction
  }

  private async run(
    session: LoadSession,
    source: string,
    previous: LoadSession | null
  ): Promise<void> {
    try {
      if (previous) await previous.dispose()
      if (!this.isActive(session)) return
      const auto = this.profile.audio.outputCodec === 'auto'
      if (
        !FFmpeg.isSupported(this.profile.mimeType, this.options.preferMMS) &&
        !(auto && FFmpeg.isSupported(FLAC_MIME, this.options.preferMMS))
      )
        throw new FFmpegError(
          'runtime',
          'Streaming media requires WebAssembly, Worker and compatible MSE'
        )
      if (this.isActive(session)) await session.run(source)
    } catch (reason) {
      if (this.isActive(session)) this.fail(session, this.asError(reason))
    }
  }

  private fail(session: LoadSession, error: FFmpegError): void {
    if (!this.isActive(session)) return
    this.activeLoad = null
    session.fail(error)
    void session.dispose().catch((reason: unknown) => {
      if (!this.destroyed) this.emit('error', this.asError(reason))
    })
    void this.transcoder.close().catch((reason: unknown) => {
      if (
        !this.destroyed &&
        !(reason instanceof DOMException && reason.name === 'AbortError')
      )
        this.emit('error', this.asError(reason))
    })
    this.emit('error', error)
  }

  private isActive(session: LoadSession): boolean {
    return !this.destroyed && this.activeLoad === session
  }

  private asError(reason: unknown): FFmpegError {
    return reason instanceof FFmpegError
      ? reason
      : new FFmpegError('buffer', 'Media buffer operation failed', reason)
  }

  private validateOptions(): void {
    const options = this.options
    if (!options.ffmpeg?.workerURL || !options.ffmpeg.coreURL || !options.ffmpeg.wasmURL)
      throw new Error('ffmpeg.workerURL, coreURL and wasmURL are required')
    for (const value of [
      options.maxInputBytes,
      options.timeout,
      options.segmentDuration,
      options.bufferAhead,
      options.bufferLow,
      options.cacheBytes
    ]) {
      if (value !== undefined && (!Number.isFinite(value) || value <= 0))
        throw new Error('Media size and time parameters must be positive')
    }
    if (
      options.bufferBehind !== undefined &&
      (!Number.isFinite(options.bufferBehind) || options.bufferBehind < 0)
    )
      throw new Error('bufferBehind must be non-negative')
    if (
      (options.bufferLow ?? (options.bufferAhead ?? 20) / 2) >=
      (options.bufferAhead ?? 20)
    )
      throw new Error('bufferLow must be less than bufferAhead')
  }
}
