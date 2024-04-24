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
/**
 * @typedef {import("../../../xgplayer-streaming-shared/es/services/stats").StatsInfo} Stats
 */
/**
 * @typedef {{
 *  seamless?: boolean,
 *  startTime?: number,
 *  bitrate?: number
 * }} SwitchUrlOptions
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

  _switchUrlOpts = null
  _isProcessQuotaExceeded = false

  constructor (cfg) {
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

    this.media.addEventListener('loadeddata', this._onLoadeddata)
    this.media.addEventListener('play', this._onPlay)
    this.media.addEventListener('pause', this._onPause)
    this.media.addEventListener('seeking', this._onSeeking)
    this.media.addEventListener('timeupdate', this._onTimeupdate)
  }

  get isLive () { return this._playlist.isLive }
  get streams () { return this._playlist.streams }
  get currentStream () { return this._playlist.currentStream }
  get hasSubtitle () { return this._playlist.hasSubtitle}
  get totalDuration () { return this._playlist.totalDuration}
  get baseDts () {
    return this._bufferService?.baseDts
  }

  speedInfo () {
    return this._segmentLoader.speedInfo()
  }

  bufferInfo (maxHole = 0.1) {
    return Buffer.info(Buffer.get(this.media), this.media?.currentTime, maxHole)
  }

  /**
   * @returns {Stats}
   */
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
    await this._loadData(url)
    this._startTick()
  }

  /**
   * @param {string} url
   * @private
   */
  async _loadData (url) {
    try {
      if (url) url = url.trim()
    } catch (e) {}

    if (!url) throw this._emitError(new StreamingError(ERR.OTHER, ERR.SUB_TYPES.OPTION, null, null, 'm3u8 url is missing'))

    const manifest = await this._loadM3U8(url)
    const { currentStream } = this._playlist

    if (this._urlSwitching && !this.isLive) {
      if (currentStream.bitrate === 0 && this._switchUrlOpts?.bitrate) {
        currentStream.bitrate = this._switchUrlOpts?.bitrate
      }
      const switchTimePoint = this._getSeamlessSwitchPoint()
      this.config.startTime = switchTimePoint

      const segIdx = this._playlist.findSegmentIndexByTime(switchTimePoint)
      const nextSeg = this._playlist.getSegmentByIndex(segIdx + 1)

      if (nextSeg) {
        // move to next segment in case of media stall
        const bufferClearStartPoint = nextSeg.start
        await this._bufferService.removeBuffer(bufferClearStartPoint)
      }
    }

    if (this._urlSwitching && this.isLive) {
      // skip loaded segment
      const preIndex = this._playlist.setNextSegmentBySN(this._prevSegSn)
      logger.log(`segment nb=${this._prevSegSn} index of ${preIndex} in the new playlist`)
      // the new stream no matched with old one
      if (preIndex === -1) {
        this._prevSegCc = null
        this._prevSegSn = null
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

      if (!manifest.isMaster) this._pollM3U8(url)
      if (this._playlist.nbSegments < this.config.minSegmentsStartPlay) return

      await this._loadSegment()
      return
    }

    await this._bufferService.updateDuration(currentStream.totalDuration)

    const { startTime } = this.config
    if (startTime) {
      if (!this._switchUrlOpts?.seamless) {
        this.media.currentTime = startTime
      }
      this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(startTime) || 0)
    }

    await this._loadSegment()
  }

  async replay (isPlayEmit) {
    this.config.startTime = 0
    await this.load()
    this._reloadOnPlay = false
    return this.media.play(!isPlayEmit)
  }

  /**
   * @param {string} url
   * @param {?SwitchUrlOptions} options
   * @returns
   */
  async switchURL (url, options = {}) {
    const defaultOpts = {
      seamless: false,
      startTime: 0,
      bitrate: 0
    }
    switch (typeof options) {
      case 'number':
        options = {startTime: options}
        break
      case 'boolean':
        options = {seamless: options}
        break
      case 'object':
        for (const key in options) {
          if (options[key] === undefined || options[key] === null) {
            delete options[key]
          }
        }
        break
      default:
        throw `unsupported switchURL args: ${options}`
    }

    options = Object.assign({}, defaultOpts, options)
    const { seamless, startTime } = options
    this.config.url = url
    this.config.startTime = startTime
    this._switchUrlOpts = options

    if (!seamless) {
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

    // 同步更新
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

  async switchSubtitleStream (lang) {
    this._playlist.switchSubtitle(lang)
    await this._manifestLoader.stopPoll()
    await this._refreshM3U8()
  }

  async destroy () {
    if (!this.media) return
    this.removeAllListeners()
    this._playlist.reset()
    this._segmentLoader.reset()
    this._seiService?.reset()
    this.media.removeEventListener('loadeddata', this._onLoadeddata)
    this.media.removeEventListener('play', this._onPlay)
    this.media.removeEventListener('pause', this._onPause)
    this.media.removeEventListener('seeking', this._onSeeking)
    this.media.removeEventListener('timeupdate', this._onTimeupdate)
    await Promise.all([this._clear(), this._bufferService.destroy()])
    this.media = null
  }

  /**
   * @param {('video'|'audio')?} mediaType
   * @returns {Boolean}
   */
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
  async _loadM3U8 (url) {
    let playlist
    try {
      const manifest = this.config.manifestList?.filter(x => x.url === url)[0]?.manifest;

      [playlist] = manifest
        ? this._manifestLoader.parseText(manifest, url) :
        await this._manifestLoader.load(url)
    } catch (error) {
      throw this._emitError(StreamingError.create(error))
    }
    if (!playlist) return
    this._playlist.upsertPlaylist(playlist)

    if (playlist.isMaster) {
      if (this._playlist.currentStream.subtitleStreams?.length) {
        this.emit(Event.SUBTITLE_PLAYLIST, {
          list: this._playlist.currentStream.subtitleStreams
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
  _refreshM3U8 () {
    const stream = this._playlist.currentStream
    if (!stream || !stream.url) throw this._emitError(StreamingError.create(null, null, new Error('m3u8 url is not defined')))
    const url = stream.url
    const audioUrl = stream.currentAudioStream?.url
    const subtitleUrl = stream.currentSubtitleStream?.url
    return this._manifestLoader.load(url, audioUrl, subtitleUrl).then(([mediaPlaylist, audioPlaylist, subtitlePlaylist]) => {
      if (!mediaPlaylist) return
      this._playlist.upsertPlaylist(mediaPlaylist, audioPlaylist, subtitlePlaylist)
      if (!this.isLive) return
      this._pollM3U8(url, audioUrl, subtitleUrl)
    }).catch(err => {
      throw this._emitError(StreamingError.create(err))
    })
  }

  /**
   * @private
   */
  _pollM3U8 (url, audioUrl, subtitleUrl) {
    let isEmpty = this._playlist.isEmpty
    let pollInterval

    if (this._playlist.lowLatency) {
      pollInterval = (this._playlist.currentStream.partTargetDuration * 2 || 0) * 1000
    } else {
      pollInterval = (this._playlist.lastSegment?.duration || 0) * 1000
    }

    this._manifestLoader.poll(
      url,
      audioUrl,
      subtitleUrl,
      (p1, p2, p3) => {
        this._playlist.upsertPlaylist(p1, p2, p3)
        this._playlist.clearOldSegment()
        const switchToNoEmpty = p1 && isEmpty && !this._playlist.isEmpty
        if (switchToNoEmpty || (!this._playlist.hadSegmentLoaded && this._playlist.nbSegments >= this.config.minSegmentsStartPlay)) {
          this._loadSegment()
        }
        if (isEmpty) isEmpty = this._playlist.isEmpty
      }, (err) => {
        this._emitError(StreamingError.create(err))
      },
      // 刷新时间
      pollInterval
    )
  }

  /**
   * @private
   */
  _loadSegment = async () => {
    if (this._segmentProcessing || !this.media) return
    const nextSeg = this._playlist.nextSegment
    const { config } = this

    if (!nextSeg) return

    if (!this.isLive) {
      let bInfo = this.bufferInfo()
      if (this.media.paused && !this.media.currentTime) {
        bInfo = this.bufferInfo(bInfo.nextStart || 0.5)
      }
      const bufferThroughout = Math.abs(bInfo.end - this.media.duration) < 0.1
      if (bInfo.remaining >= config.preloadTime || bufferThroughout) {
        this._tryEos()
        return
      }

      if (config.preferMMSStreaming && !this._bufferService.msStreaming) {
        return
      }

      // reset segment pointer by buffer end
      if (!this._urlSwitching &&
        this._prevSegSn !== nextSeg.sn - 1 &&
        bInfo.end &&
        Math.abs(nextSeg.start - bInfo.end) > 1) {
        this._playlist.setNextSegmentByIndex(this._playlist.findSegmentIndexByTime(bInfo.end + 0.1))
      }
    }

    return this._loadSegmentDirect()
  }


  /**
   * @private
   */
  async _loadSegmentDirect (loadOnce) {
    const seg = this._playlist.nextSegment
    if (!seg) return

    let appended = false
    let cachedError = null
    try {
      this._segmentProcessing = true
      logger.log(`load segment, sn:${seg.sn}, [${seg.start}, ${seg.end}], partIndex:${seg.partIndex}`)
      appended = await this._reqAndBufferSegment(seg, this._playlist.getAudioSegment(seg))
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
      return this._emitError(StreamingError.create(cachedError))
    }
    if (appended) {
      const bufferEnd = this.bufferInfo().end
      if (this.isLive && !this.media.seeking && bufferEnd && Math.abs(seg.end - bufferEnd) > 1) {
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
    let start = seg ? seg.start : audioSeg.start
    const stream = this._playlist.currentStream
    this._bufferService.createSource(data[0], data[1], stream?.videoCodec, stream?.audioCodec)
    const before = Date.now()
    const contiguous = this._prevSegSn === sn - 1
    if (this.isLive && this._urlSwitching) {
      const segStart = this.bufferInfo().end
      // update the new segements [start、end] to match timeline.
      // (this appended segment duration maybe not matched with m3u8 description)
      this._playlist.updateSegmentsRanges(sn, segStart)
      logger.warn(`update the new playlist liveEdge, segment id=${sn}, buffer start=${segStart}, liveEdge=${this._playlist.liveEdge}`)
      start = segStart
    }
    await this._bufferService.appendBuffer(seg, audioSeg, data[0], data[1], discontinuity, contiguous, start)
    this.emit(Event.APPEND_COST, {elapsed: Date.now() - before, url: seg.url})
    await this._bufferService.evictBuffer(this.config.bufferBehind)
    this._prevSegCc = cc
    this._prevSegSn = sn
    return true
  }

  /**
   * @private
   */
  _onLoadeddata = () => {
    if (this.isLive && !this.config.mseLowLatency) {
      // update duration to Infinity
      if (this.media.duration !== Infinity) {
        this._bufferService.updateDuration(Infinity).catch(e=>{})
      }
    }
  }

  /**
   * @private
   */
  _onPlay = async () => {
    // fix replay 重复请求问题
    if (this.media.seeking && this.media.currentTime === 0){
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
    this._onCheckQuotaExceeded()
    const seekTime = this.media.currentTime
    const seekRange = this._playlist.seekRange
    if (seekRange) {
      const newSeekTime = clamp(seekTime, seekRange[0], this.isLive ? seekRange[1] : this.media.duration)
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
    const info = Buffer.info(Buffer.get(this.media), seekTime, 0.1)
    if (curSeg) {
      if (info.end && Math.abs(info.end - curSeg.end) < 0.2) return
      if (this.isLive && info.end) return
    }

    const segIndex = this._playlist.findSegmentIndexByTime(seekTime)
    const seg = this._playlist.getSegmentByIndex(segIndex)
    if (segIndex === null || segIndex === undefined || !seg || (this._segmentProcessing && seg === this._playlist.nextSegment)) return

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

  async _onCheckQuotaExceeded (){
    const seekTime = this.media.currentTime
    // handle buffer QuotaExceeded when seek
    const buffered = this.media.buffered
    let inBuffered = false
    for (let i = 0; i < buffered.length; i++){
      if (buffered.start(0) >= seekTime && seekTime < buffered.end(i)){
        inBuffered = true
        break
      }
    }
    if (this._bufferService.isFull() ) {
      const bufferBehind = inBuffered ? this.config.bufferBehind : 5
      const mediaTime = this.media.currentTime
      if (mediaTime - bufferBehind > 0){
        await this._bufferService.removeBuffer(0, mediaTime - bufferBehind)
      }
    }
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
        logger.debug(`latency jump, currentTime:${this.media.currentTime}, liveEdge:${liveEdge},  latency=${latency}`)
        this.media.currentTime = liveEdge - cfg.targetLatency
      }
    }

    if (cfg.seiInTime) {
      this._seiService?.throw(this.media.currentTime)
    }

    if (this.config.allowedStreamTrackChange && !this.config.softDecode) {
      this._checkStreamTrackChange(this.media.currentTime)
    }

  }

  _checkStreamTrackChange (time) {
    const changedSeg = this._playlist.checkSegmentTrackChange(time, this._bufferService.nbSb)
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
  _end () {
    this._clear()
    this._bufferService.endOfStream()
    if (this.media.readyState <= 2 || this.media.buffered.length > 1) {
      this._startTick()
    }
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
    this._onCheckQuotaExceeded()
    // change _segmentProcessing to false
    if (this._isProcessQuotaExceeded){
      if (!this._bufferService.isFull()){
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

    if (Buffer.end(buffered) >= 0.1 && media.readyState) {
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

    if (!this.isLive) {
      this._tryEos()
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
  _getSeamlessSwitchPoint () {
    const { media } = this
    let nextLoadPoint = media.currentTime
    if (!media.paused) {
      const segIdx = this._playlist.findSegmentIndexByTime(media.currentTime)
      const curSeg = this._playlist.getSegmentByIndex(segIdx)
      const latestKbps = this._stats?.getStats().downloadSpeed // latest download speed
      if (latestKbps && curSeg) {
        const delay = (curSeg.duration * this._playlist.currentStream.bitrate) / latestKbps + 1

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
  _tryEos () {
    const { media } = this
    const { nextSegment, lastSegment } = this._playlist
    const eosAllowed =
      !nextSegment &&
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

    const bufferThroughout = Math.abs(bInfo.end - media.duration) < 0.1 ||
      (!this.isLive && lastSegment && bInfo.end >= (lastSegment.start + lastSegment.duration))
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
} catch (error) {
  // ignore
}
