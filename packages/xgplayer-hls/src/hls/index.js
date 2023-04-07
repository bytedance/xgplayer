import EventEmitter from 'eventemitter3'
import { Buffer, ERR, GapService, getVideoPlaybackQuality, isMediaPlaying, Logger, MediaStatsService, MSE, SeiService, StreamingError } from 'xgplayer-streaming-shared'
import { Logger as TransmuxerLogger } from 'xgplayer-transmuxer'
import { BufferService } from './buffer-service'
import { getConfig } from './config'
import { Event } from './constants'
import { ManifestLoader } from './manifest-loader'
import { Playlist } from './playlist'
import { SegmentLoader } from './segment-loader'
import { clamp } from './utils'

/**
 * @typedef {import('./manifest-loader/parser/model').MediaSegment} MediaSegment
 */

const logger = new Logger('hls')

export class Hls extends EventEmitter {
  static version = __VERSION__
  version = Hls.version
  /** @type {HTMLMediaElement | null} */
  media = null
  /** @type {import('./config').HlsOption} */
  config = null

  /** @type {ManifestLoader} */
  _manifestLoader = null

  /** @type {SegmentLoader} */
  _segmentLoader = null

  /** @type {Playlist} */
  _playlist = null

  /** @type {BufferService} */
  _bufferService = null

  /** @type {GapService} */
  _gapService = null

  /** @type {SeiService} */
  _seiService = null

  /** @type {MediaStatsService} */
  _stats = null

  _prevSegSn = null
  _prevSegCc = null

  _tickTimer = null
  _tickInterval = 500

  _segmentProcessing = false
  _reloadOnPlay = false

  constructor (cfg) {
    super()
    this.config = cfg = getConfig(cfg)
    this.media = this.config.media

    this._manifestLoader = new ManifestLoader(this)
    this._segmentLoader = new SegmentLoader(this)
    this._playlist = new Playlist(this)
    this._bufferService = new BufferService(this)
    this._seiService = new SeiService(this)
    if (!cfg.softDecode) this._gapService = new GapService()

    this._stats = new MediaStatsService(this, 90000)

    this.media.addEventListener('play', this._onPlay)
    this.media.addEventListener('pause', this._onPause)
    this.media.addEventListener('seeking', this._onSeeking)
    this.media.addEventListener('timeupdate', this._onTimeupdate)
  }

  get isLive () { return this._playlist.isLive }
  get streams () { return this._playlist.streams }
  get currentStream () { return this._playlist.currentStream }

  get baseDts () {
    return this._bufferService?.baseDts
  }

  speedInfo () {
    return this._segmentLoader.speedInfo()
  }

  bufferInfo (maxHole = 0.1) {
    return Buffer.info(Buffer.get(this.media), this.media?.currentTime, maxHole)
  }

  getStats () {
    return this._stats.getStats()
  }

  playbackQuality () {
    return getVideoPlaybackQuality(this.media)
  }

  async load (url, reuseMse = false) {
    if (url) this.config.url = url
    url = this.config.url
    await this._reset(reuseMse)
    if (url) url = url.trim()
    if (!url) throw this._emitError(new StreamingError(ERR.OTHER, ERR.SUB_TYPES.OPTION, null, null, 'm3u8 url is missing'))
    await this._loadM3U8(url)
    await this._loadSegment()
    this._startTick()
  }

  async replay (isPlayEmit) {
    this.config.startTime = 0
    this.config.softDecode ? this.load() : (await this.load())
    this._reloadOnPlay = false
    return this.media.play(!isPlayEmit)
  }

  async switchURL (url, startTime = 0) {
    this.config.startTime = startTime
    this.config.url = url
    let appended
    try {
      appended = this.config.softDecode ? this.load(url) : (await this.load(url))
    } catch (error) {
      this.emit(Event.SWITCH_URL_FAILED, error)
      throw error
    }
    this._reloadOnPlay = false

    if (appended) {
      this.emit(Event.SWITCH_URL_SUCCESS, { url })
    }
    return this.media.play(true)
  }

  async switchStream (id, force = true) {
    const curStream = this.currentStream
    const streams = this.streams
    if (!curStream || curStream.id === id || !streams || streams.length < 2) return
    const toSwitch = streams.find(x => x.id === id)
    if (!toSwitch) return

    try {
      await this._clear()
      if (force) await this._bufferService.clearAllBuffer()
    } catch (error) {
      throw this._emitError(StreamingError.create(error))
    }

    if (curStream.currentAudioStream && toSwitch.audioStreams.length > 2) {
      const curId = curStream.currentAudioStream.id
      toSwitch.currentAudioStream = toSwitch.audioStreams.find(x => x.id === curId) || toSwitch.currentAudioStream
    }

    this._playlist.currentStream = toSwitch

    try {
      if (this.isLive || !toSwitch.segments.length) await this._refreshM3U8()
      this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(this.media.currentTime) || 0)
      this._prevSegCc = null
      await this._loadSegmentDirect()
    } catch (error) {
      this._playlist.currentStream = curStream
      throw error
    }

    this._startTick()
    return toSwitch
  }

  async switchAudioStream (id, force = true) {
    const curStream = this.currentStream
    if (!curStream) return
    const audioStream = curStream.currentAudioStream
    if (!audioStream || audioStream.id === id || curStream.audioStreams.length < 2) return
    const toSwitch = curStream.audioStreams.find(x => x.id === id)
    if (!toSwitch) return

    try {
      await this._clear()
      if (force) await this._bufferService.clearAllBuffer()
    } catch (error) {
      throw this._emitError(StreamingError.create(error))
    }

    curStream.currentAudioStream = toSwitch

    try {
      if (this.isLive || !toSwitch.segments.length) await this._refreshM3U8()
      this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(this.media.currentTime) || 0)
      this._prevSegCc = null
      await this._loadSegmentDirect()
    } catch (error) {
      curStream.currentAudioStream = audioStream
      throw error
    }

    this._startTick()
    return toSwitch
  }

  async destroy () {
    if (!this.media) return
    this.removeAllListeners()
    this._playlist.reset()
    this._segmentLoader.reset()
    this._seiService.reset()
    this.media.removeEventListener('play', this._onPlay)
    this.media.removeEventListener('pause', this._onPause)
    this.media.removeEventListener('seeking', this._onSeeking)
    this.media.removeEventListener('timeupdate', this._onTimeupdate)
    await Promise.all([this._clear(), this._bufferService.destroy()])
    this.media = null
  }

  static isSupported (mediaType) {
    if (!mediaType || mediaType === 'video' || mediaType === 'audio') {
      return MSE.isSupported()
    }

    return typeof WebAssembly !== 'undefined'
  }

  static enableLogger () {
    Logger.enable()
    TransmuxerLogger.enable()
  }

  static disableLogger () {
    Logger.disable()
    TransmuxerLogger.disable()
  }

  /**
   * @private
   */
  _loadM3U8 = async (url) => {
    let playlist
    try {
      [playlist] = await this._manifestLoader.load(url)
    } catch (error) {
      throw this._emitError(StreamingError.create(error))
    }
    if (!playlist) return
    this._playlist.upsertPlaylist(playlist)
    if (playlist.isMaster) {
      await this._refreshM3U8()
    }
    this.emit(Event.STREAM_PARSED)
    if (this.isLive) {
      this._bufferService.setLiveSeekableRange(0, 0xffffffff)
      if (!playlist.isMaster) this._pollM3U8(url)
    } else {
      await this._bufferService.updateDuration(this._playlist.currentStream.totalDuration)
      const { startTime } = this.config
      if (startTime) {
        this.media.currentTime = startTime
        this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(startTime) || 0)
      }
    }
  }

  /**
   * @private
   */
  _refreshM3U8 () {
    const stream = this._playlist.currentStream
    if (!stream || !stream.url) throw this._emitError(StreamingError.create(null, null, new Error('m3u8 url is not defined')))
    const url = stream.url
    const audioUrl = stream.currentAudioStream?.url
    return this._manifestLoader.load(url, audioUrl).then(([mediaPlaylist, audioPlaylist]) => {
      if (!mediaPlaylist) return
      this._playlist.upsertPlaylist(mediaPlaylist, audioPlaylist)
      if (this.isLive) this._pollM3U8(url, audioUrl)
    }).catch(err => {
      throw this._emitError(StreamingError.create(err))
    })
  }

  /**
   * @private
   */
  _pollM3U8 (url, audioUrl) {
    let isEmpty = this._playlist.isEmpty
    this._manifestLoader.poll(
      url,
      audioUrl,
      (p1, p2) => {
        this._playlist.upsertPlaylist(p1, p2)
        if (p1 && isEmpty && !this._playlist.isEmpty) {
          this._loadSegment()
        }
        if (isEmpty) isEmpty = this._playlist.isEmpty
      }, (err) => {
        this._emitError(StreamingError.create(err))
      },
      (this._playlist.lastSegment?.duration || 0) * 1000)
  }

  /**
   * @private
   */
  _loadSegment = async () => {
    if (this._segmentProcessing || !this.media) return
    const currentTime = this.media.currentTime
    const curSeg = this._playlist.currentSegment
    const nextSeg = this._playlist.nextSegment
    if (!nextSeg || (curSeg && !this.isLive && curSeg.end - currentTime >= this.config.preloadTime)) return
    return this._loadSegmentDirect()
  }

  /**
   * @private
   */
  async _loadSegmentDirect () {
    const seg = this._playlist.nextSegment
    if (!seg) return

    let appended = false
    let cachedError = null
    try {
      this._segmentProcessing = true
      appended = await this._reqAndBufferSegment(seg, this._playlist.getAudioSegment(seg))
    } catch (error) {
      // If an exception is thrown here, other reference functions
      // need to handle the exception, so the error stops here
      cachedError = error
    } finally {
      this._segmentProcessing = false
    }

    if (cachedError) {
      return this._emitError(StreamingError.create(cachedError))
    }

    if (appended) {
      this._playlist.moveSegmentPointer()
      if (seg.isLast) {
        this._end()
      } else {
        this._loadSegment()
      }
    }

    return appended
  }

  /**
   * @param {MediaSegment} seg
   * @param {MediaSegment} audioSeg
   * @private
   */
  async _reqAndBufferSegment (seg, audioSeg) {
    const cc = seg ? seg.cc : audioSeg.cc
    const discontinuity = this._prevSegCc !== cc
    let responses = []
    try {
      responses = await this._segmentLoader.load(seg, audioSeg, discontinuity)
    } catch (e) {
      e.fatal = false
      this._segmentLoader.error = e
      throw e
    }
    if (!responses[0]) return
    const data = await this._bufferService.decryptBuffer(...responses)
    if (!data) return
    const sn = seg ? seg.sn : audioSeg.sn
    const start = seg ? seg.start : audioSeg.start
    const stream = this._playlist.currentStream
    this._bufferService.createSource(data[0], data[1], stream?.videoCodec, stream?.audioCodec)
    await this._bufferService.appendBuffer(seg, audioSeg, data[0], data[1], discontinuity, this._prevSegSn === sn - 1, start)
    await this._bufferService.evictBuffer(this.config.bufferBehind)
    this._prevSegCc = cc
    this._prevSegSn = sn
    return true
  }

  /**
   * @private
   */
  _onPlay = async () => {
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
  _onPause = () => {
    if (this.isLive) {
      if (!this._reloadOnPlay) {
        let { disconnectTime } = this.config
        if (disconnectTime === null || disconnectTime === undefined) disconnectTime = this._playlist.dvrWindow
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
  _onSeeking = async () => {
    if (!this.media) return

    const seekTime = this.media.currentTime
    const seekRange = this._playlist.seekRange

    if (seekRange) {
      const newSeekTime = clamp(seekTime, seekRange[0] + 0.1, seekRange[1] - 0.1)
      if (
        // if newSeekTime less than 0, media.currentTime will be 0, this causes an infinite loop
        newSeekTime >= 0 &&
        Math.abs(seekTime - newSeekTime) >= 0.1
      ) {
        this.media.currentTime = newSeekTime
        return
      }
    }

    const curSeg = this._playlist.currentSegment
    if (curSeg) {
      const info = Buffer.info(Buffer.get(this.media), seekTime, 0.1)
      if (info.end && Math.abs(info.end - curSeg.end) < 0.2) return
    }

    const segIndex = this._playlist.findSegmentIndexByTime(seekTime)
    const seg = this._playlist.getSegmentByIndex(segIndex)
    if (segIndex === null || segIndex === undefined || !seg || (this._segmentProcessing && seg === this._playlist.nextSegment)) return

    logger.debug('seek to', seekTime, seg)

    this._playlist.setNextSegmentByIndex(segIndex)

    this._stopTick()
    await this._segmentLoader.cancel()
    await this._loadSegmentDirect()
    this._startTick()
  }

  /**
   * @private
   */
  _onTimeupdate = () => {
    if (!this.media) return
    const cfg = this.config
    if (cfg.isLive && cfg.maxLatency && cfg.targetLatency && this.media) {
      const liveEdge = this._playlist.liveEdge
      if (!liveEdge) return
      const latency = liveEdge - this.media.currentTime
      if (latency >= cfg.maxLatency) {
        logger.debug('latency jump', latency)
        this.media.currentTime = liveEdge - cfg.targetLatency
      }
    }

    this._seiService.throw(this.media.currentTime)

    if (this.config.allowedStreamTrackChange) {
      this._checkStreamTrackChange(this.media.currentTime)
    }

  }

  _checkStreamTrackChange (time) {
    const changedSeg = this._playlist.checkSegmentTrackChange(time)
    if (!changedSeg) return
    this.switchURL(this.config.url, changedSeg.start + 0.2)
  }

  /**
   * @private
   */
  async _clear () {
    clearTimeout(this._disconnectTimer)
    this._stopTick()
    await Promise.all([
      this._segmentLoader.cancel(),
      this._manifestLoader.stopPoll()
    ])
    this._segmentProcessing = false
  }

  /**
   * @private
   */
  async _reset (reuseMse = false) {
    this._reloadOnPlay = false
    this._prevSegSn = null
    this._prevSegCc = null
    this._playlist.reset()
    this._segmentLoader.reset()
    this._seiService.reset()
    this._stats.reset()
    await this._clear()
    return this._bufferService.reset(reuseMse)
  }

  /**
   * @private
   */
  _end () {
    this._clear()
    this._bufferService.endOfStream()
  }

  /**
   * @private
   */
  _stopTick () {
    if (this._tickTimer) {
      clearTimeout(this._tickTimer)
    }
    this._tickTimer = null
  }

  /**
   * @private
   */
  _startTick () {
    this._stopTick()
    this._tickTimer = setTimeout(this._tick, this._tickInterval)
  }

  /**
   * @private
   */
  _tick = () => {
    if (!this.media) return
    this._startTick()
    const media = this.media
    const buffered = Buffer.get(media)
    const segLoaderError = this._segmentLoader.error

    if (segLoaderError) {
      // Compatible with the case where the buffer does not start from 0
      const bufferMaxHoleTolerance = 0.5

      if (!media.readyState || this.bufferInfo(bufferMaxHoleTolerance).remaining < 1) {
        segLoaderError.fatal = true
        this._emitError(StreamingError.network(segLoaderError))
      }
      return
    }

    if (Buffer.end(buffered) < 0.1 || !media.readyState) return

    if (isMediaPlaying(media)) {
      this._loadSegment()
      if (this._gapService) {
        this._gapService.do(media, this.config.maxJumpDistance, this.isLive)
      }
    } else {
      if (media.readyState < 2 && this._gapService) {
        this._gapService.do(media, this.config.maxJumpDistance, !media.currentTime ? true : this.isLive)
      }
    }
  }

  /**
   * @param {StreamingError} error
   * @param {boolean?} endOfStream
   * @private
   */
  _emitError (error, endOfStream = false) {
    if (error.originError?.fatal === false) {
      logger.warn(error)
    } else {
      logger.table(error)
      logger.error(error)
      logger.error(this.media?.error)

      if (this.media?.readyState) {
        this.media.pause()
      }
      this._stopTick()
      this.emit(Event.ERROR, error)
      if (endOfStream) this._end()
      this._seiService.reset()
    }
    return error
  }
}

try {
  if (localStorage.getItem('xgd')) {
    Hls.enableLogger()
  } else {
    Hls.disableLogger()
  }
} catch (error) {
  // ignore
}
