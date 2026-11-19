import EventEmitter from 'eventemitter3'
import {
  Buffer,
  ERR,
  GapService,
  getVideoPlaybackQuality,
  isMediaPlaying,
  Logger,
  MediaStatsService,
  MSE,
  SeiService,
  StreamingError
} from 'xgplayer-streaming-shared'
import { Logger as TransmuxerLogger } from 'xgplayer-transmuxer'
import { BufferService } from './buffer-service'
import { getConfig, type HlsConfig, type HlsOption } from './config'
import { Event } from './constants'
import { ManifestLoader } from './manifest-loader'
import type {
  AudioStream,
  MasterPlaylist,
  MediaPlaylist,
  MediaSegment
} from './manifest-loader/parser/model'
import { Playlist } from './playlist'
import type { Stream } from './playlist/stream'
import { SegmentLoader } from './segment-loader'
import { clamp } from './utils'

export { ManifestLoader, Playlist, SegmentLoader, getConfig }

export interface SwitchUrlOptions {
  seamless?: boolean
  startTime?: number
  bitrate?: number
}

export interface LoadOptions {
  reuseMse?: boolean
  clearSwitchStatus?: boolean
}

export interface HlsBufferInfo {
  start: number
  end: number
  index: number
  buffers: Array<[number, number]>
  nextStart: number
  remaining: number
}

type Manifest = MasterPlaylist | MediaPlaylist
type LoaderError = Error & { fatal?: boolean }

function toStreamingError(error: unknown): StreamingError {
  return StreamingError.create(error)
}

function isNonFatalOrigin(origin: unknown): boolean {
  return (
    typeof origin === 'object' &&
    origin !== null &&
    'fatal' in origin &&
    origin.fatal === false
  )
}

export const logger = new Logger('hls')

export class Hls extends EventEmitter {
  static version: string = __VERSION__
  version: string = Hls.version

  media: HTMLMediaElement | null
  config: HlsConfig

  private readonly _manifestLoader: ManifestLoader
  private readonly _segmentLoader: SegmentLoader
  private readonly _playlist: Playlist
  private readonly _bufferService: BufferService
  private readonly _gapService: GapService | null = null
  private readonly _seiService: SeiService | null = null
  private readonly _stats: MediaStatsService

  private _prevSegSn: number | null = null
  private _prevSegCc: number | null = null

  private _tickTimer: ReturnType<typeof setTimeout> | null = null
  private readonly _tickInterval = 500

  private _segmentProcessing = false
  private _reloadOnPlay = false

  private _switchUrlOpts: SwitchUrlOptions | null = null
  private _urlSwitching = false
  private _isProcessQuotaExceeded = false
  private _disconnectTimer: ReturnType<typeof setTimeout> | undefined

  constructor(cfg: HlsOption = {}) {
    super()
    this.config = cfg = getConfig(cfg)
    this.media = this.config.media

    this._manifestLoader = new ManifestLoader(this)
    this._segmentLoader = new SegmentLoader(this)
    this._playlist = new Playlist(this)
    this._bufferService = new BufferService(this)
    if (cfg.seiInTime) {
      this._seiService = new SeiService(this)
    }
    if (!cfg.softDecode) this._gapService = new GapService()

    this._stats = new MediaStatsService(this, 90000)
    this._bindMediaEvents(this.media)
  }

  get isLive(): boolean | undefined {
    return this._playlist.isLive
  }
  get streams(): Stream[] {
    return this._playlist.streams
  }
  get currentStream(): Stream | null {
    return this._playlist.currentStream
  }
  get hasSubtitle(): boolean {
    return this._playlist.hasSubtitle
  }
  get totalDuration(): number {
    return this._playlist.totalDuration
  }
  get baseDts(): number | undefined {
    return this._bufferService.baseDts
  }
  get abrSwitchPoint(): number | null {
    const targetSeg = this._urlSwitching
      ? this._playlist.currentSegment
      : this._playlist.nextSegment
    return targetSeg ? targetSeg.start + targetSeg.duration / 2 : null
  }

  speedInfo() {
    return this._segmentLoader.speedInfo()
  }

  bufferInfo(maxHole = 0.1): HlsBufferInfo {
    const media = this.media
    if (!media) {
      return { start: 0, end: 0, index: 0, buffers: [], nextStart: 0, remaining: 0 }
    }
    return Buffer.info(media.buffered, media.currentTime, maxHole) as HlsBufferInfo
  }

  private _getBackBufferEvictionEnd(bufferBehind: number) {
    const { media } = this
    if (!media || media.seeking || !bufferBehind || bufferBehind < 0) return 0

    const currentTime = media.currentTime
    const segmentDuration = this._playlist.currentStream?.segmentDuration
    if (
      !Number.isFinite(currentTime) ||
      typeof segmentDuration !== 'number' ||
      !Number.isFinite(segmentDuration) ||
      segmentDuration <= 0
    ) {
      return 0
    }

    const segmentIndex = this._playlist.findSegmentIndexByTime(currentTime)
    const currentSegment = this._playlist.getSegmentByIndex(segmentIndex)
    if (!currentSegment || !Number.isFinite(currentSegment.start)) return 0

    // Coded frame removal may continue to the next random access point.
    // Keep one target duration and never cross into the current segment.
    const maxBufferBehind = Math.max(bufferBehind, segmentDuration)
    const alignedEnd =
      Math.floor(currentTime / segmentDuration) * segmentDuration - maxBufferBehind
    return Math.max(0, Math.min(alignedEnd, currentSegment.start))
  }

  private _getPreloadBufferLength(bInfo: HlsBufferInfo, nextSegment: MediaSegment) {
    const remaining = bInfo?.remaining || 0
    const buffers = bInfo?.buffers
    const nextStart = bInfo?.nextStart
    if (!buffers?.length || !nextSegment || !nextStart || nextSegment.start <= nextStart)
      return remaining

    let fullBufferLength = remaining
    const bufferedIndex = bInfo.end ? bInfo.index : -1
    for (let i = buffers.length - 1; i > bufferedIndex; i--) {
      const item = buffers[i]
      if (item[0] < nextSegment.start) {
        fullBufferLength += item[1] - item[0]
      }
    }
    return fullBufferLength
  }

  /**
   * @returns {Stats}
   */
  getStats() {
    return this._stats.getStats()
  }

  playbackQuality(): ReturnType<typeof getVideoPlaybackQuality> {
    return getVideoPlaybackQuality(this.media)
  }

  /**
   * @param {string} url
   * @param {LoadOptions | boolean} options
   */
  async load(url = '', options: LoadOptions | boolean = {}) {
    const reuseMse = typeof options === 'boolean' ? options : !!options?.reuseMse

    if (typeof options === 'object' && options?.clearSwitchStatus) {
      this._urlSwitching = false
      this._switchUrlOpts = null
      this.config.startTime = undefined
    }

    if (url) this.config.url = url
    url = this.config.url || ''
    await this._reset(reuseMse)
    await this._loadData(url)
    this._startTick()
  }

  /**
   * @param {string} url
   * @private
   */
  private async _loadData(url: string) {
    try {
      if (url) url = url.trim()
    } catch {}

    if (!url)
      throw this._emitError(
        new StreamingError(
          ERR.OTHER,
          ERR.SUB_TYPES.OPTION,
          null,
          null,
          'm3u8 url is missing'
        )
      )

    const manifest = await this._loadM3U8(url)
    const currentStream = this._playlist.currentStream
    if (!currentStream) return

    if (this._urlSwitching) {
      if (this.isLive) {
        // skip loaded segment
        const preIndex = this._playlist.setNextSegmentBySN(this._prevSegSn)
        logger.log(
          `segment nb=${this._prevSegSn} index of ${preIndex} in the new playlist`
        )
        // the new stream no matched with old one
        if (preIndex === -1) {
          this._prevSegCc = null
          this._prevSegSn = null
        }
      } else {
        if (currentStream.bitrate === 0 && this._switchUrlOpts?.bitrate) {
          currentStream.bitrate = this._switchUrlOpts?.bitrate
        }
        const switchTimePoint =
          typeof this._switchUrlOpts?.startTime === 'number'
            ? this._switchUrlOpts?.startTime
            : this._getSeamlessSwitchPoint()
        this.config.startTime = switchTimePoint

        const segIdx = this._playlist.findSegmentIndexByTime(switchTimePoint)
        let nextSeg: MediaSegment | undefined
        if (segIdx !== undefined) {
          nextSeg = this._playlist.getSegmentByIndex(segIdx + 1)
        }

        if (nextSeg) {
          // move to next segment in case of media stall
          const bufferClearStartPoint = nextSeg.start
          await this._bufferService.removeBuffer(bufferClearStartPoint)
        }
      }
    }

    if (!manifest) return

    if (this.isLive) {
      this._bufferService.setLiveSeekableRange(0, 0xffffffff)
      logger.log('totalDuration first time got:', this._playlist.totalDuration)
      logger.log('nb segments got:', this._playlist.nbSegments)

      // 配置的目标延迟小于首次获取分片总时长
      if (this.config.targetLatency < this._playlist.totalDuration) {
        this.config.targetLatency = this._playlist.totalDuration
        this.config.maxLatency = 1.5 * this.config.targetLatency
      }

      if (!('isMaster' in manifest)) this._pollM3U8(url)
      if (this._playlist.nbSegments < this.config.minSegmentsStartPlay) return

      await this._loadSegment()
      return
    }

    await this._bufferService.updateDuration(currentStream.totalDuration)

    const { startTime } = this.config
    if (startTime) {
      const media = this.media
      if (!media) return
      if (!this._switchUrlOpts?.seamless) {
        media.currentTime = startTime
      }
      this._playlist.setNextSegmentByIndex(
        this._playlist.findSegmentIndexByTime(startTime) || 0
      )
    }

    await this._loadSegment()
  }

  async replay(isPlayEmit = false) {
    this.config.startTime = 0
    this._urlSwitching = false
    this._switchUrlOpts = null
    await this.load()
    this._reloadOnPlay = false
    const media = this.media
    return media
      ? (media.play as (emit?: boolean) => Promise<void>)(!isPlayEmit)
      : undefined
  }

  /**
   * @param {string} url
   * @param {?SwitchUrlOptions} options
   * @returns
   */
  async switchURL(url: string, options: SwitchUrlOptions | number | boolean = {}) {
    const defaultOpts: Required<SwitchUrlOptions> = {
      seamless: false,
      startTime: 0,
      bitrate: 0
    }
    let normalizedOptions: SwitchUrlOptions
    switch (typeof options) {
      case 'number':
        normalizedOptions = { startTime: options }
        break
      case 'boolean':
        normalizedOptions = { seamless: options }
        break
      case 'object':
        normalizedOptions = options
        for (const key of Object.keys(normalizedOptions) as Array<
          keyof SwitchUrlOptions
        >) {
          if (normalizedOptions[key] === undefined || normalizedOptions[key] === null) {
            delete normalizedOptions[key]
          }
        }
        break
      default:
        throw `unsupported switchURL args: ${options}`
    }

    const resolvedOptions = Object.assign({}, defaultOpts, normalizedOptions)
    const { seamless, startTime } = resolvedOptions
    this.config.url = url
    this.config.startTime = startTime
    this._switchUrlOpts = resolvedOptions

    if (!seamless) {
      let appended
      try {
        appended = this.config.softDecode ? this.load(url) : await this.load(url)
      } catch (error) {
        this.emit(Event.SWITCH_URL_FAILED, error)
        throw error
      }
      this._reloadOnPlay = false

      if (appended) {
        this.emit(Event.SWITCH_URL_SUCCESS, { url })
      }
      const media = this.media
      return media ? (media.play as (emit?: boolean) => Promise<void>)(true) : undefined
    } else {
      this._urlSwitching = true
      if (!this.isLive) {
        this._prevSegSn = null
        this._prevSegCc = null
      }

      this._playlist.reset()
      this._bufferService.seamlessSwitch()
      await this._clear()
      await this._loadData(url)
      this._startTick()
    }

    this._switchUrlOpts = null
  }

  async switchStream(id: number, force = true) {
    const curStream = this.currentStream
    const streams = this.streams
    const media = this.media
    if (!curStream || curStream.id === id || !streams || streams.length < 2 || !media)
      return
    const toSwitch = streams.find((x) => x.id === id)
    if (!toSwitch) return

    try {
      await this._clear()
      if (force) await this._bufferService.clearAllBuffer()
    } catch (error) {
      throw this._emitError(toStreamingError(error))
    }

    // 同步更新
    if (curStream.currentAudioStream && toSwitch.audioStreams.length > 2) {
      const curId = curStream.currentAudioStream.id
      toSwitch.currentAudioStream =
        toSwitch.audioStreams.find((x) => x.id === curId) || toSwitch.currentAudioStream
    }

    this._playlist.currentStream = toSwitch

    try {
      if (this.isLive || !toSwitch.segments.length) await this._refreshM3U8()
      this._playlist.setNextSegmentByIndex(
        this._playlist.findSegmentIndexByTime(media.currentTime) || 0
      )
      this._prevSegCc = null
      await this._loadSegmentDirect(false)
    } catch (error) {
      this._playlist.currentStream = curStream
      throw error
    }

    this._startTick()
    return toSwitch
  }

  async switchAudioStream(id: number, force = true): Promise<AudioStream | undefined> {
    const curStream = this.currentStream
    const media = this.media
    if (!curStream || !media) return
    const audioStream = curStream.currentAudioStream
    if (!audioStream || audioStream.id === id || curStream.audioStreams.length < 2) return
    const toSwitch = curStream.audioStreams.find((x) => x.id === id)
    if (!toSwitch) return

    try {
      await this._clear()
      if (force) await this._bufferService.clearAllBuffer()
    } catch (error) {
      throw this._emitError(toStreamingError(error))
    }

    curStream.currentAudioStream = toSwitch

    try {
      if (this.isLive || !toSwitch.segments.length) await this._refreshM3U8()
      this._playlist.setNextSegmentByIndex(
        this._playlist.findSegmentIndexByTime(media.currentTime) || 0
      )
      this._prevSegCc = null
      await this._loadSegmentDirect(false)
    } catch (error) {
      curStream.currentAudioStream = audioStream
      throw error
    }

    this._startTick()
    return toSwitch
  }

  async switchSubtitleStream(lang: string) {
    this._playlist.switchSubtitle(lang)
    await this._manifestLoader.stopPoll()
    await this._refreshM3U8()
  }

  async detachMedia() {
    if (this._bufferService) {
      await this._bufferService.detachMedia()
    }
  }

  async destroy() {
    if (!this.media) return
    this.removeAllListeners()
    this._playlist.reset()
    this._segmentLoader.reset()
    this._seiService?.reset()
    this._unbindMediaEvents(this.media)
    await Promise.all([this._clear(), this._bufferService.destroy()])
    this.media = null
  }

  private _bindMediaEvents(media: HTMLMediaElement | null) {
    if (!media) return
    media.addEventListener('loadeddata', this._onLoadeddata)
    media.addEventListener('play', this._onPlay)
    media.addEventListener('pause', this._onPause)
    media.addEventListener('seeking', this._onSeeking)
    media.addEventListener('timeupdate', this._onTimeupdate)
  }

  private _unbindMediaEvents(media: HTMLMediaElement | null) {
    if (!media) return
    media.removeEventListener('loadeddata', this._onLoadeddata)
    media.removeEventListener('play', this._onPlay)
    media.removeEventListener('pause', this._onPause)
    media.removeEventListener('seeking', this._onSeeking)
    media.removeEventListener('timeupdate', this._onTimeupdate)
  }

  /**
   * @param {('video'|'audio')?} mediaType
   * @returns {Boolean}
   */
  static isSupported(mediaType?: 'video' | 'audio') {
    if (!mediaType || mediaType === 'video' || mediaType === 'audio') {
      return MSE.isSupported()
    }

    return typeof WebAssembly !== 'undefined'
  }

  static enableLogger() {
    Logger.enable()
    TransmuxerLogger.enable()
  }

  static disableLogger() {
    Logger.disable()
    TransmuxerLogger.disable()
  }

  /**
   * @private
   */
  private async _loadM3U8(url: string): Promise<Manifest | undefined> {
    let playlist: Manifest | undefined
    try {
      const manifest = this.config.manifestList.find((x) => x.url === url)?.manifest

      const playlists = manifest
        ? this._manifestLoader.parseText(manifest, url)
        : await this._manifestLoader.load(url)
      playlist = playlists[0]
    } catch (error) {
      throw this._emitError(toStreamingError(error))
    }
    if (!playlist) return
    this._playlist.upsertPlaylist(playlist)

    if ('isMaster' in playlist) {
      const currentStream = this._playlist.currentStream
      if (currentStream?.subtitleStreams.length) {
        this.emit(Event.SUBTITLE_PLAYLIST, {
          list: currentStream.subtitleStreams
        })
      }
      await this._refreshM3U8()
    }
    this.emit(Event.STREAM_PARSED)
    return playlist
  }

  /**
   * @private 首次更新 master playlist 的 media level
   */
  private _refreshM3U8() {
    const stream = this._playlist.currentStream
    if (!stream || !stream.url)
      throw this._emitError(toStreamingError(new Error('m3u8 url is not defined')))
    const url = stream.url
    const audioUrl = stream.currentAudioStream?.url
    const subtitleUrl = stream.currentSubtitleStream?.url
    return this._manifestLoader
      .load(url, audioUrl, subtitleUrl)
      .then(([mediaPlaylist, audioPlaylist, subtitlePlaylist]) => {
        if (!mediaPlaylist) return
        this._playlist.upsertPlaylist(mediaPlaylist, audioPlaylist, subtitlePlaylist)
        if (!this.isLive) return
        this._pollM3U8(url, audioUrl, subtitleUrl)
      })
      .catch((err) => {
        throw this._emitError(toStreamingError(err))
      })
  }

  /**
   * @private
   */
  private _pollM3U8(url: string, audioUrl?: string, subtitleUrl?: string) {
    let isEmpty = this._playlist.isEmpty
    let pollInterval

    if (this._playlist.lowLatency) {
      pollInterval = (this._playlist.currentStream?.partTargetDuration || 0) * 1000
    } else {
      pollInterval = (this._playlist.lastSegment?.duration || 0) * 1000
    }

    this._manifestLoader.poll(
      url,
      audioUrl,
      subtitleUrl,
      (p1: Manifest, p2?: MediaPlaylist, p3?: MediaPlaylist) => {
        this._playlist.upsertPlaylist(p1, p2, p3)
        this._playlist.clearOldSegment()
        const switchToNoEmpty = p1 && isEmpty && !this._playlist.isEmpty
        if (
          switchToNoEmpty ||
          (!this._playlist.hadSegmentLoaded &&
            this._playlist.nbSegments >= this.config.minSegmentsStartPlay)
        ) {
          this._loadSegment()
        }
        if (isEmpty) isEmpty = this._playlist.isEmpty
      },
      (err: unknown) => {
        this._emitError(toStreamingError(err))
      },
      // 刷新时间
      pollInterval
    )
  }

  /**
   * @private
   */
  private _loadSegment = async () => {
    if (this._segmentProcessing || !this.media) return
    const { nextSegment, lastSegment } = this._playlist
    const { config } = this
    const minFrameDuration = 0.016
    // Constrain in the range of 0.016 ~ 0.1, 0.016 is the duration of 1 frame at 60fps
    // “minFrameDuration / 2” is to handle the media buffer precision deviation problem
    const maxBufferThroughout = Math.min(
      Math.max((lastSegment?.duration || 0) - minFrameDuration / 2, minFrameDuration),
      0.1
    )

    if (!nextSegment) return

    if (!this.isLive) {
      let bInfo = this.bufferInfo()
      if (this.media.paused && !this.media.currentTime) {
        bInfo = this.bufferInfo(bInfo.nextStart || 0.5)
      }
      const bufferThroughout =
        Math.abs(bInfo.end - this.media.duration) < maxBufferThroughout
      const preloadBufferLength = this._getPreloadBufferLength(bInfo, nextSegment)
      // Only stop loading if we've buffered enough preload time or reached end AND all segments are loaded
      if (
        preloadBufferLength >= config.preloadTime ||
        (bufferThroughout && !nextSegment)
      ) {
        this._tryEos()
        return
      }

      if (config.preferMMSStreaming && !this._bufferService.msStreaming) {
        return
      }

      // reset segment pointer by buffer end
      if (
        !this._urlSwitching &&
        this._prevSegSn !== nextSegment.sn - 1 &&
        bInfo.end &&
        Math.abs(nextSegment.start - bInfo.end) > 1
      ) {
        this._playlist.setNextSegmentByIndex(
          this._playlist.findSegmentIndexByTime(bInfo.end + 0.1)
        )
      }
    }

    return this._loadSegmentDirect(false)
  }

  /**
   * @private
   */
  private async _loadSegmentDirect(loadOnce = false) {
    const seg = this._playlist.nextSegment
    if (!seg) return

    let appended = false
    let cachedError = null
    try {
      this._segmentProcessing = true
      logger.log(
        `load segment, sn:${seg.sn}, [${seg.start}, ${seg.end}], partIndex:${seg.partIndex}`
      )
      appended = !!(await this._reqAndBufferSegment(
        seg,
        this._playlist.getAudioSegment(seg)
      ))
    } catch (error) {
      // If an exception is thrown here, other reference functions
      // need to handle the exception, so the error stops here
      cachedError = error
    } finally {
      this._segmentProcessing = false
    }

    if (cachedError) {
      if (this._bufferService.isFull()) {
        logger.log(`load segment, sn:${seg.sn}, partIndex:${seg.partIndex}`)
        // if buffer is full, stop request new fragments
        this._segmentProcessing = true
        this._isProcessQuotaExceeded = true
        return false
      }
      return this._emitError(toStreamingError(cachedError))
    }
    if (appended) {
      const media = this.media
      if (!media) return false
      const bufferEnd = this.bufferInfo().end
      if (
        this.isLive &&
        !media.seeking &&
        bufferEnd &&
        Math.abs(seg.end - bufferEnd) > 1
      ) {
        logger.warn(`segment: ${seg.sn} expected end=${seg.end}, real end=${bufferEnd}`)
        this._playlist.feedbackLiveEdge(seg, bufferEnd)
      }

      const sameStream = this._playlist.currentStream?.url === seg.parentUrl
      // switching -> pre playlist segment appended -> new playlist loaded -> new playlist segment appended
      // _needInitSegment status maybe reset by pre playlist segment appendBuffer()
      if (this._urlSwitching && !sameStream) {
        logger.warn('pre playlist segment appended!')
        this._bufferService.seamlessSwitch()
      }

      // switching -> new playlist loaded -> new playlist segment appended
      if (this.isLive && this._urlSwitching && sameStream) {
        this._urlSwitching = false
        this.emit(Event.SWITCH_URL_SUCCESS, { url: this.config.url })
      }

      this._playlist.moveSegmentPointer()
      if (seg.isLast) {
        this._end()
      } else if (!loadOnce) {
        this._loadSegment()
      }
    }

    return appended
  }

  private async _reqAndBufferSegment(seg: MediaSegment, audioSeg?: MediaSegment) {
    const cc = seg.cc
    const discontinuity = this._prevSegCc !== cc
    let responses = []
    try {
      responses = await this._segmentLoader.load(seg, audioSeg, discontinuity)
    } catch (error) {
      const loaderError: LoaderError =
        error instanceof Error ? error : new Error(String(error))
      loaderError.fatal = false
      this._segmentLoader.error = loaderError
      throw loaderError
    }
    if (!responses[0]) return
    const data = await this._bufferService.decryptBuffer(...responses)
    if (!data) return
    const sn = seg.sn
    let start = seg.start
    const stream = this._playlist.currentStream
    this._bufferService.createSource(
      data[0],
      data[1],
      stream?.videoCodec,
      stream?.audioCodec
    )
    const before = Date.now()
    const contiguous = this._prevSegSn === sn - 1
    if (this.isLive && this._urlSwitching) {
      const segStart = this.bufferInfo().end
      // update the new segments [start、end] to match timeline.
      // (this appended segment duration maybe not matched with m3u8 description)
      this._playlist.updateSegmentsRanges(sn, segStart)
      logger.warn(
        `update the new playlist liveEdge, segment id=${sn}, buffer start=${segStart}, liveEdge=${this._playlist.liveEdge}`
      )
      start = segStart
    }
    await this._bufferService.appendBuffer(
      seg,
      audioSeg,
      data[0],
      data[1],
      discontinuity,
      contiguous,
      start
    )
    this.emit(Event.APPEND_COST, { elapsed: Date.now() - before, url: seg.url })
    const removeEnd = this._getBackBufferEvictionEnd(this.config.bufferBehind)
    await this._bufferService.evictBuffer(removeEnd)
    this._prevSegCc = cc
    this._prevSegSn = sn
    return true
  }

  /**
   * @private
   */
  private _onLoadeddata = () => {
    const media = this.media
    if (!media) return
    if (this.isLive && !this.config.mseLowLatency) {
      // update duration to Infinity
      if (media.duration !== Infinity) {
        this._bufferService.updateDuration(Infinity).catch(() => {})
      }
    }
  }

  /**
   * @private
   */
  private _onPlay = async () => {
    const media = this.media
    if (!media) return
    // fix replay 重复请求问题
    if (media.seeking && media.currentTime === 0) {
      logger.debug('replay currentTime 0, return')
      return
    }
    clearTimeout(this._disconnectTimer)
    if (this._reloadOnPlay) {
      this._reloadOnPlay = false
      this.replay(true)
    } else {
      await this._loadSegment()
      this._startTick()
    }
  }

  /**
   * @private
   */
  private _onPause = () => {
    if (this.isLive) {
      if (!this._reloadOnPlay) {
        let { disconnectTime } = this.config
        if (disconnectTime === null || disconnectTime === undefined) {
          disconnectTime = this._playlist.dvrWindow
        }
        if (!Number.isFinite(disconnectTime)) return
        clearTimeout(this._disconnectTimer)
        this._disconnectTimer = setTimeout(() => {
          this._reloadOnPlay = true
          this._clear()
        }, disconnectTime || 0)
      }
    } else {
      this._stopTick()
    }
  }

  /**
   * @private
   */
  private _onSeeking = async () => {
    const media = this.media
    if (!media) return
    this._onCheckQuotaExceeded()
    const seekTime = media.currentTime
    const seekRange = this._playlist.seekRange
    if (seekRange) {
      const newSeekTime = clamp(
        seekTime,
        seekRange[0],
        this.isLive ? seekRange[1] : media.duration
      )
      if (
        // if newSeekTime less than 0, media.currentTime will be 0, this causes an infinite loop
        newSeekTime >= 0 &&
        Math.abs(seekTime - newSeekTime) >= 0.1
      ) {
        media.currentTime = newSeekTime
        return
      }
    }

    const curSeg = this._playlist.currentSegment
    const info = Buffer.info(media.buffered, seekTime, 0.1)
    if (curSeg) {
      if (info.end && Math.abs(info.end - curSeg.end) < 0.2) return
      if (this.isLive && info.end) return
    }

    const segIndex = this._playlist.findSegmentIndexByTime(seekTime)
    const seg = this._playlist.getSegmentByIndex(segIndex)
    if (
      segIndex === null ||
      segIndex === undefined ||
      !seg ||
      (this._segmentProcessing && seg === this._playlist.nextSegment)
    )
      return

    logger.debug('seek to', seekTime, seg)

    this._playlist.setNextSegmentByIndex(segIndex)

    this._stopTick()
    await this._segmentLoader.cancel()

    this._segmentProcessing = false
    if (!info.end || this.isLive) {
      await this._loadSegmentDirect(true)
    }
    this._startTick()
  }

  private async _onCheckQuotaExceeded() {
    const media = this.media
    if (!media) return
    const seekTime = media.currentTime
    // handle buffer QuotaExceeded when seek
    const buffered = media.buffered
    let inBuffered = false
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(0) >= seekTime && seekTime < buffered.end(i)) {
        inBuffered = true
        break
      }
    }
    if (this._bufferService.isFull()) {
      const bufferBehind = inBuffered ? this.config.bufferBehind : 5
      const mediaTime = media.currentTime
      if (mediaTime - bufferBehind > 0) {
        await this._bufferService.removeBuffer(0, mediaTime - bufferBehind)
      }
    }
  }

  /**
   * @private
   */
  private _onTimeupdate = () => {
    const media = this.media
    if (!media) return
    const cfg = this.config
    if (cfg.isLive && cfg.maxLatency && cfg.targetLatency) {
      const liveEdge = this._playlist.liveEdge
      if (!liveEdge) return
      const latency = liveEdge - media.currentTime
      if (latency >= cfg.maxLatency) {
        logger.debug(
          `latency jump, currentTime:${media.currentTime}, liveEdge:${liveEdge},  latency=${latency}`
        )
        media.currentTime = liveEdge - cfg.targetLatency
      }
    }

    if (cfg.seiInTime) {
      this._seiService?.throw(media.currentTime, this.isLive)
    }

    if (cfg.allowedStreamTrackChange && !cfg.softDecode && media.readyState) {
      this._checkStreamTrackChange(media.currentTime)
    }
  }

  private _checkStreamTrackChange(time: number) {
    const changedSeg = this._playlist.checkSegmentTrackChange(
      time,
      this._bufferService.nbSb
    )
    if (!changedSeg) return
    if (this.config.url) this.switchURL(this.config.url, changedSeg.start + 0.2)
  }

  /**
   * @private
   */
  private async _clear() {
    clearTimeout(this._disconnectTimer)
    this._stopTick()
    await Promise.all([this._segmentLoader.cancel(), this._manifestLoader.stopPoll()])
    this._segmentProcessing = false
  }

  /**
   * @private
   */
  private async _reset(reuseMse = false) {
    this._reloadOnPlay = false
    this._prevSegSn = null
    this._prevSegCc = null
    this._switchUrlOpts = null
    this._playlist.reset()
    this._segmentLoader.reset()
    this._seiService?.reset()
    this._stats.reset()
    await this._clear()
    return this._bufferService.reset(reuseMse)
  }

  /**
   * @private
   */
  private _end() {
    this._clear()
    this._bufferService.endOfStream()
    const media = this.media
    if (media && (media.readyState <= 2 || media.buffered.length > 1)) {
      this._startTick()
    }
  }

  /**
   * @private
   */
  private _stopTick() {
    if (this._tickTimer) {
      clearTimeout(this._tickTimer)
    }
    this._tickTimer = null
  }

  /**
   * @private
   */
  private _startTick() {
    this._stopTick()
    this._tickTimer = setTimeout(this._tick, this._tickInterval)
  }

  /**
   * @private
   */
  private _tick = () => {
    if (!this.media) return
    this._startTick()
    const media = this.media
    // const buffered = Buffer.get(media)
    const segLoaderError = this._segmentLoader.error
    this._onCheckQuotaExceeded()
    // change _segmentProcessing to false
    if (this._isProcessQuotaExceeded) {
      if (!this._bufferService.isFull()) {
        this._isProcessQuotaExceeded = false
        this._segmentProcessing = false
      }
    }
    if (segLoaderError) {
      // Compatible with the case where the buffer does not start from 0
      const bufferMaxHoleTolerance = 0.5

      if (!media.readyState || this.bufferInfo(bufferMaxHoleTolerance).remaining < 1) {
        segLoaderError.fatal = true
        this._emitError(StreamingError.network(segLoaderError))
      }
      return
    }

    if (media.readyState) {
      if (isMediaPlaying(media)) {
        this._loadSegment()
        if (this._gapService) {
          this._gapService.do(media, this.config.maxJumpDistance, this.isLive)
        }
      } else {
        if (media.readyState < 2 && this._gapService) {
          this._gapService.do(
            media,
            this.config.maxJumpDistance,
            !media.currentTime ? true : this.isLive
          )
        }
      }
    }

    if (!this.isLive) {
      this._tryEos()
    }
  }

  private _emitError(error: StreamingError, endOfStream = false) {
    if (isNonFatalOrigin(error.originError)) {
      logger.warn(error)
    } else {
      logger.table(error)
      logger.error(error)
      logger.error(this.media?.error)

      if (this.media?.readyState) {
        this.media.pause()
      }
      this._stopTick()
      if (this._urlSwitching) {
        this._urlSwitching = false
        this.emit(Event.SWITCH_URL_FAILED, error)
      }
      this.emit(Event.ERROR, error)
      if (endOfStream) this._end()
      this._seiService?.reset()
    }
    return error
  }

  /**
   * @private
   */
  private _getSeamlessSwitchPoint() {
    const { media } = this
    if (!media) return 0
    let nextLoadPoint = media.currentTime
    if (!media.paused) {
      const segIdx = this._playlist.findSegmentIndexByTime(media.currentTime)
      const curSeg = this._playlist.getSegmentByIndex(segIdx)
      const latestKbps = this._stats?.getStats().downloadSpeed // latest download speed
      const currentStream = this._playlist.currentStream
      if (latestKbps && curSeg && currentStream) {
        const delay = (curSeg.duration * currentStream.bitrate) / latestKbps + 1

        nextLoadPoint += delay
      } else {
        nextLoadPoint += 5
      }
    }

    return nextLoadPoint
  }

  /**
   * @private
   */
  private _tryEos() {
    const { media } = this
    if (!media) return
    const { nextSegment, lastSegment } = this._playlist
    const eosAllowed =
      (!nextSegment ||
        (lastSegment &&
          // Use the mid-time of lastSegment to determine
          // whether the Media Buffer has been buffered to the end
          Buffer.isBuffered(media, lastSegment.start + lastSegment.duration / 2))) &&
      media.readyState &&
      media.duration > 0 &&
      this._bufferService?.msIsOpened &&
      !this._bufferService?.msHasOpTasks

    if (!eosAllowed) {
      return
    }

    let bInfo = this.bufferInfo()
    if (media.paused && !media.currentTime) {
      bInfo = this.bufferInfo(bInfo.nextStart || 0.5)
    }

    const bufferThroughout =
      Math.abs(bInfo.end - media.duration) < 0.1 ||
      (!this.isLive &&
        lastSegment &&
        bInfo.end >= lastSegment.start + lastSegment.duration)
    if (bufferThroughout) {
      this._bufferService.endOfStream()
    }
  }
}

try {
  if (localStorage.getItem('xgd')) {
    Hls.enableLogger()
  } else {
    Hls.disableLogger()
  }
} catch {
  // ignore
}
