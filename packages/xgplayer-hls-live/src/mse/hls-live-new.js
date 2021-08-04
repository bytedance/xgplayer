import { EVENTS, Err, logger } from 'xgplayer-helper-utils'
import { getLastBufferedEnd, clamp } from './helper'
import { GapJumper } from './gap-jumper'

const {
  LOADER_EVENTS,
  REMUX_EVENTS,
  HLS_EVENTS,
  DEMUX_EVENTS,
  CRYPTO_EVENTS,
  COMPATIBILITY_EVENTS,
  CORE_EVENTS
} = EVENTS

const log = logger.log.bind(logger, 'HlsLiveController')
const warn = logger.warn.bind(logger, 'HlsLiveController')

export default class HlsLiveController {
  firstFramePts = -1
  mse = null

  _url = ''
  _playlist = null

  _m3u8Url = ''
  _m3u8Loader = null
  _m3u8RefreshTimer = null
  _m3u8RefreshInterval = 3000
  _m3u8RetryTimes = 3
  _m3u8RetryCount = 0

  _demuxQueue = []
  _decrypting = false
  _segmentLoading = false
  _currentLoadingKeyUrl = ''
  _segmentLoader = null
  _segmentBuffer = null
  _segmentKeyLoader = null
  _crypto = null
  _compat = null

  _tickTimer = null
  _tickInterval = 300
  _gapJumper = new GapJumper()

  _currentDemuxSN = -1;
  _currentBufferedSN = -1;

  constructor ({
    isMobile,
    ...rest
  } = {}) {
    this._isMobile = isMobile

    this._opts = Object.assign({
      lowLatencyMode: true, // 是否启用低延迟模式
      maxCatchUpRate: 1.5, // 低延迟模式，最大追赶速率
      targetLatency: 0, // 播放延迟，超过该延迟将会快放追帧，默认等于单次 playlist 总时长, 毫秒
      skipSegmentLatency: 0, // 跳过未加载分片的最大延迟，超过该延迟将会跳片，默认两倍的 targetLatency
      skipSegment: true, // 当延迟过高时，是否允许跳过未下载的分片

      gapDistance: 0.1 // 当因播放问题停滞时，向前跳跃的间距
    }, rest)

    log('new instance: ', this._opts, isMobile)
  }

  load (url) {
    this.reset()
    this._url = url
    this._loadM3U8(url)
    this._tick()
  }

  reset () {
    log('Reset')
    clearTimeout(this._m3u8RefreshTimer)
    this._stopTick()
    this._demuxQueue = []
    this._currentLoadingKeyUrl = ''
    this._decrypting = false
    this._segmentLoading = false
    this._m3u8RetryCount = 0
    this.firstFramePts = -1
    this._currentDemuxSN = -1
    this._currentBufferedSN = -1
    if (this._m3u8Loader) this._m3u8Loader.cancel()
    if (this._segmentLoader) this._segmentLoader.cancel()
    if (this._segmentKeyLoader) this._segmentKeyLoader.cancel()
    if (this._playlist) this._playlist.reset()
    if (this._segmentBuffer) this._segmentBuffer.clear()
    if (this.mse) this.mse.removeBuffers()
  }

  reload () {
    log('Reload', this._url)
    this.load(this._url)
  }

  destroy () {
    log('Destroy')
    this.reset()
    this._player?.video?.addEventListener('timeupdate', this._onTimeUpdate)
    if (this.mse) this.mse.endOfStream()
  }

  enableLowLatency () {
    this._opts.lowLatencyMode = true
  }

  disableLowLatency () {
    this._opts.lowLatencyMode = false
  }

  get _fetchOptions () {
    return this._pluginConfig.fetchOptions || {}
  }

  get _retryCount () {
    return this._pluginConfig.retryCount || this._player.config.retry?.count
  }

  get _retryDelay () {
    return this._pluginConfig.retryDelay || this._player.config.retry?.delay
  }

  // 恢复播放时，外部插件会销毁重建。这里只管暂停，不管恢复播放
  get _videoPaused () {
    const video = this._player?.video
    return video && video.played?.length && video.paused
  }

  _end () {
    log('End of stream')
    clearTimeout(this._m3u8RefreshTimer)
    this._stopTick()
    if (this.mse) this.mse.endOfStream()
  }

  _tick = () => {
    this._stopTick()
    if (this._videoPaused) return
    this._tickTimer = setTimeout(this._tick, this._tickInterval)

    const lastSegment = this._playlist?.lastSegment
    if (lastSegment) {
      this._gapJumper.tryJump(this._player.video, this._opts.gapDistance)
    }
  }

  _stopTick () {
    clearTimeout(this._tickTimer)
  }

  _loadM3U8 = (url) => {
    if (url) this._m3u8Url = url
    log('Start load M3U8', this._m3u8Url)
    this._m3u8Loader.load(this._m3u8Url, this._fetchOptions, this._retryCount, this._retryDelay)
  }

  _onLoadedM3U8 = (buffer) => {
    let playlist

    try {
      playlist = this._pluginConfig.M3U8ParserNew.parse(buffer.shift(), this._m3u8Url)
    } catch (error) {
      this._emitError(Err.M3U8_PARSE(error))
      this.destroy()
      return
    }

    this._playlist.clearOldSegments()
    this._playlist.upsertPlaylist(playlist)
    const level = this._playlist.currentLevel

    if (!level) {
      if (this._shouldRetryM3U8()) return this._loadM3U8(this._m3u8Url)
      return
    }

    if (playlist.isMaster) {
      log('Master playlist, load level', level)
      return this._loadM3U8(level.url)
    }

    level.refreshedAt = Date.now()

    const segments = level.segments
    if (!segments || !segments.length) {
      if (this._shouldRetryM3U8()) return this._loadM3U8(this._m3u8Url)
      return
    }

    if (!this._opts.targetLatency) {
      this._opts.targetLatency = playlist.segments.reduce((t, c) => (t + c.duration), 0)
    }

    if (!this._opts.skipSegmentLatency) {
      this._opts.skipSegmentLatency = this._opts.targetLatency * 2
    }

    if (!this._videoPaused) {
      const currentTime = this._player?.video?.currentTime

      if (
        currentTime &&
        this._opts.lowLatencyMode &&
        this._opts.skipSegment &&
        this._opts.skipSegmentLatency &&
        currentTime * 1000 + this._opts.skipSegmentLatency < level.liveEdge
      ) {
        const time = level.liveEdge - this._opts.targetLatency
        const seg = this._playlist.findSegmentByTime(time)
        const currentSN = this._playlist.currentSegment?.sn

        if (seg && seg.sn > currentSN) {
          let sn = seg.sn
          if (sn === this._playlist.currentLevel?.lastSegmentSN) sn--

          if (this._playlist.setCurrentSegmentBySN(seg.sn)) {
            if (this._segmentLoader) this._segmentLoader.cancel()
            if (this._segmentKeyLoader) this._segmentKeyLoader.cancel()
            if (this._segmentBuffer) this._segmentBuffer.clear()

            this._segmentLoading = false
            this._demuxQueue = []
            this._decrypting = false
            this._currentLoadingKeyUrl = ''

            warn(`Skip segment, currentSegment: ${currentSN} -> `, seg)
          }
        }
      }

      if (level.live) {
        const interval = level.segmentDuration
        if (interval) this._m3u8RefreshInterval = Math.max(interval / 2, 2000) // TODO: Loader 支持传入加载耗时
        clearTimeout(this._m3u8RefreshTimer)
        log('M3U8 refresh interval: ', this._m3u8RefreshInterval)
        this._m3u8RefreshTimer = setTimeout(this._loadM3U8, this._m3u8RefreshInterval)
      }

      this._loadSegment()
    }
  }

  _shouldRetryM3U8 () {
    if (this._m3u8RetryCount > this._m3u8RetryTimes) {
      this._emitError(Err.M3U8_CONTENT(new Error('Empty or wrong content')))
      this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
      this.destroy()
      return false
    }
    this._m3u8RetryCount++
    log(`Retry load M3U8: ${this._m3u8Url}, count: ${this._m3u8RetryCount}`)
    return true
  }

  _loadSegment () {
    // 目前不好控制 buffer 顺序，解密的时候不让下载新片段
    if (
      this._segmentLoading ||
      this._currentLoadingKeyUrl ||
      this._decrypting ||
      this._videoPaused
    ) return

    const segment = this._playlist.forwardSegment()
    if (segment) {
      if (segment.key && segment.key.url) {
        const key = this._playlist.getKey(segment.key.url)
        if (!key) {
          this._playlist.backwardSegment()
          return this._loadSegmentKey(segment.key.url)
        }
      }

      this._segmentLoading = true
      log('Start load segment: ', segment)
      this._segmentLoader.load(segment.url, this._fetchOptions, this._retryCount, this._retryDelay)
    }
  }

  _loadSegmentKey (keyUrl) {
    if (!this._segmentKeyLoader) {
      const { XgBuffer, FetchLoader, XhrLoader } = this._pluginConfig
      const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader
      this._context.registry('KEY_BUFFER', XgBuffer)()
      this._segmentKeyLoader = this._context.registry('KEY_LOADER', Loader)({ buffer: 'KEY_BUFFER', readtype: 3 })
    }

    this._currentLoadingKeyUrl = keyUrl
    this._segmentKeyLoader.load(keyUrl, this._fetchOptions, this._retryCount, this._retryDelay)
  }

  _onLoadedSegmentKey = (buffer) => {
    this._playlist.setKey(this._currentLoadingKeyUrl, buffer.shift())
    this._currentLoadingKeyUrl = ''
    this._loadSegment()
  }

  _onLoadedSegment = () => {
    const segment = this._playlist.currentSegment
    if (segment) {
      this._demuxQueue.push({
        url: segment.url,
        start: segment.start,
        duration: segment.duration,
        cc: segment.cc,
        id: segment.sn
      })

      if (this._decryptSegment(segment)) {
        this._decrypting = true
        return
      }
    }

    this._segmentLoading = false
    this._loadSegment()
    this._demux()
  }

  _decryptSegment (segment) {
    if (!segment || !segment.key || !segment.key.url) return false

    if (!this._crypto) {
      this._crypto = this._context.registry('CRYPTO', Crypto)({ inputbuffer: 'TS_BUFFER', outputbuffer: 'TS_BUFFER' })
      this._crypto.on(CRYPTO_EVENTS.DECRYPTED, this._onSegmentDecrypted)
    }

    log('Start decrypt segment: ', segment.key)

    this._crypto.key = this._playlist.getKey(segment.key.url)
    this._crypto.iv = segment.key.iv
    this._crypto.method = segment.key.method
    this._crypto.decrypto()
    return true
  }

  _onSegmentDecrypted = () => {
    this._decrypting = false
    this._loadSegment()
    this._demux()
  }

  _demux () {
    if (this._demuxQueue.length) {
      const seg = this._demuxQueue.shift()
      this._currentDemuxSN = seg.id
      log('Start demux segment: ', seg)
      this.emit(DEMUX_EVENTS.DEMUX_START, seg, !this._playlist.currentLevel?.live)
    }
  }

  _onDemuxComplete = () => {
    if (this.firstFramePts === -1) {
      const tracks = this._context.getInstance('TRACKS')
      const samp0 = tracks && tracks.videoTrack && tracks.videoTrack.samples[0]
      this.firstFramePts = samp0 ? samp0.purePts : -1
      warn('first frame pts: ', this.firstFramePts)
    }

    if (this._isMobile) {
      if (this._player.video) {
        const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')
        if (!videoTrack) return
        if (this._compat) {
          this._compat.doFix()
        }
        this._player.video.onDemuxComplete(videoTrack, audioTrack)
      }
    } else {
      log('Start remux segment')
      this.emit(REMUX_EVENTS.REMUX_MEDIA)
    }
    this._demux()
  }

  _onMetadataParsed = (type) => {
    warn('meta detect or changed , ', type)
    if (this._isMobile) {
      if (type === 'audio') {
        // 将音频meta信息交给audioContext，不走remux封装
        const { audioTrack } = this._context.getInstance('TRACKS')
        if (audioTrack && audioTrack.meta) {
          this._setMetaToAudio(audioTrack.meta)
        }
        return
      }
      const { videoTrack } = this._context.getInstance('TRACKS')
      if (videoTrack && videoTrack.meta) {
        this._setMetaToVideo(videoTrack.meta)
      }
      return
    }

    if (type === 'video') {
      this._context.mediaInfo.hasVideo = true
    } else if (type === 'audio') {
      this._context.mediaInfo.hasAudio = true
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _setMetaToAudio (audioMeta) {
    if (this._player.video) {
      this._player.video.setAudioMeta(audioMeta)
    }
  }

  _setMetaToVideo (videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta)
    }
  }

  _onMediaSegment = () => {
    this._currentBufferedSN = this._currentDemuxSN

    log('append to mse SN: ', this._currentBufferedSN)

    this.mse.addSourceBuffers()
    this.mse.doAppend()

    const lastSegment = this._playlist.lastSegment
    if (lastSegment && lastSegment.isLast && this._currentBufferedSN >= lastSegment.sn) {
      this._end()
    }
  }

  _onTimeUpdate = () => {
    if (this._isMobile) return
    this._catchUp()
  }

  _catchUp () {
    if (!this._opts.lowLatencyMode) return
    const video = this._player?.video
    const currentTime = video?.currentTime
    const liveEdge = this._playlist.currentLevel?.liveEdge
    if (!currentTime || !liveEdge) return

    const { maxCatchUpRate, targetLatency } = this._opts
    if (maxCatchUpRate <= 1 || !targetLatency) return

    const currentRate = video.playbackRate

    const latency = liveEdge - currentTime * 1000
    const deltaLatency = latency - targetLatency
    const deltaBuffer = getLastBufferedEnd(video) - currentTime

    let newRate = 0
    if (
      deltaLatency > 0.1 &&
      deltaBuffer > 2
    ) {
      // 当落后超过 5s 就会按 2 倍速追赶
      newRate = clamp(
        Math.round((2 / (1 + Math.exp(-deltaLatency / 1000))) * 100) / 100,
        1, maxCatchUpRate
      )
    } else {
      newRate = 1
    }

    if (currentRate !== newRate) {
      log(`Catch up, Latency: ${deltaLatency}, playbackRate ${currentRate} -> ${newRate}`)
      video.playbackRate = newRate
    }
  }

  _onDemuxError = (mod, error) => {
    this._emitError(Err.DEMUX(error))
  }

  _onRemuxError = (mod, error) => {
    this._emitError(Err.REMUX(error))
  }

  _onLoadError = (loader, error) => {
    this._segmentLoading = false
    this._player.pause()

    this._emitError(error?.err)

    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
    this.destroy()
  }

  _emitError (error) {
    this._player?.emit('error', error)
  }

  init () {
    const { XgBuffer, Tracks, PlaylistNew, RemuxedBufferManager, Compatibility, FetchLoader, XhrLoader, TsDemuxer, Mp4Remuxer, Mse } = this._pluginConfig
    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader

    this._m3u8Loader = this._context.registry('M3U8_LOADER', Loader)({ buffer: 'M3U8_BUFFER', readtype: 1 })
    this._segmentLoader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })
    this._playlist = this._context.registry('PLAYLIST', PlaylistNew)()
    this._segmentBuffer = this._context.registry('TS_BUFFER', XgBuffer)()
    this._m3u8RetryTimes = (this._pluginConfig.retrytimes == null) ? this._m3u8RetryTimes : this._pluginConfig.retrytimes
    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()

    this._context.registry('M3U8_BUFFER', XgBuffer)
    this._context.registry('TRACKS', Tracks)()
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' })

    if (!this._isMobile) {
      this.mse = this._context.registry('MSE', Mse)({ container: this._player.video, format: 'hls' })
      this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
      this._context.registry('MP4_REMUXER', Mp4Remuxer)
    }

    this._player.video.addEventListener('timeupdate', this._onTimeUpdate)

    this.on(LOADER_EVENTS.LOADER_COMPLETE, (buffer) => {
      switch (buffer.TAG) {
        case 'M3U8_BUFFER': this._onLoadedM3U8(buffer); break
        case 'TS_BUFFER': this._onLoadedSegment(buffer); break
        case 'KEY_BUFFER': this._onLoadedSegmentKey(buffer); break
      }
    })

    if (this.mse) {
      this.on(REMUX_EVENTS.INIT_SEGMENT, this.mse.addSourceBuffers.bind(this.mse))
    }
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment)
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)
    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError)
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError)
    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError)

    this.on(DEMUX_EVENTS.SEI_PARSED, (sei) => this._player.emit('SEI_PARSED', sei))
    this.on(LOADER_EVENTS.LOADER_RETRY, (tag, info) => this._player.emit('retry', Object.assign({ tag }, info)))

    this.connectEvent(LOADER_EVENTS.LOADER_START, CORE_EVENTS.LOADER_START)
    this.connectEvent(LOADER_EVENTS.LOADER_COMPLETE, CORE_EVENTS.LOADER_COMPLETE)
    this.connectEvent(LOADER_EVENTS.LOADER_RETRY, CORE_EVENTS.LOADER_RETRY)
    this.connectEvent(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, CORE_EVENTS.LOADER_RESPONSE_HEADERS)
    this.connectEvent(LOADER_EVENTS.LOADER_TTFB, CORE_EVENTS.TTFB)

    this.connectEvent(DEMUX_EVENTS.ISKEYFRAME, CORE_EVENTS.KEYFRAME)
    this.connectEvent(DEMUX_EVENTS.SEI_PARSED, CORE_EVENTS.SEI_PARSED)
    this.connectEvent(DEMUX_EVENTS.DEMUX_ERROR, CORE_EVENTS.DEMUX_ERROR)
    this.connectEvent(DEMUX_EVENTS.METADATA_PARSED, CORE_EVENTS.METADATA_PARSED)

    this.connectEvent(COMPATIBILITY_EVENTS.EXCEPTION, CORE_EVENTS.STREAM_EXCEPTION)
    this.connectEvent(REMUX_EVENTS.REMUX_METADATA, CORE_EVENTS.REMUX_METADATA)
  }
}
