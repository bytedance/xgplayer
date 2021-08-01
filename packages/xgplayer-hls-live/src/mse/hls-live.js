import { EVENTS, logger } from 'xgplayer-helper-utils'
import BaseController from '../base-controlller'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

class HlsLiveController extends BaseController {
  constructor () {
    super()
    this.TAG = 'HlsLiveController'
    this.firstFramePts = -1
  }

  init () {
    super.init()
    const { RemuxedBufferManager, Mp4Remuxer, Mse } = this._pluginConfig

    this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer)

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({ container: this._player.video, format: 'hls' })

    this._initEvents()
  }

  _initEvents () {
    super._initEvents()
    this.on(LOADER_EVENTS.LOADER_RETRY, this._handleFetchRetry)
    this.on(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment)
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment)
    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError)
    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd)
  }

  _onInitSegment = () => {
    this.mse.addSourceBuffers()
  }

  _onDemuxComplete = () => {
    if (this.firstFramePts === -1) {
      const tracks = this._context.getInstance('TRACKS')
      const samp0 = tracks && tracks.videoTrack && tracks.videoTrack.samples[0]
      this.firstFramePts = samp0 ? samp0.purePts : -1
      logger.warn(this.TAG, `first frame pts: ${this.firstFramePts}`)
    }

    this.emit(REMUX_EVENTS.REMUX_MEDIA, 'ts')
  }

  _onMetadataParsed = (type) => {
    logger.warn(this.TAG, 'meta detect or changed , ', type)
    if (type === 'video') {
      this._context.mediaInfo.hasVideo = true
    } else if (type === 'audio') {
      this._context.mediaInfo.hasAudio = true
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onMediaSegment = () => {
    this.mse.addSourceBuffers()
    this.mse.doAppend()
  }

  _streamEnd () {
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
    this.mse.endOfStream()
  }

  _m3u8Loaded () {
    this._m3u8FlushDuration = this._playlist.avgSegmentDuration || this._m3u8FlushDuration
    if (!this.preloadTime) {
      this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5
    }
  }

  _checkStatus = () => {
    const video = this._player.video
    if (!video) {
      clearInterval(this._timmer)
      return
    }
    if (video.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      const currentTime = video.currentTime
      const bufferend = video.buffered.end(video.buffered.length - 1)
      if (currentTime < bufferend - (this.preloadTime * 2)) {
        video.currentTime = bufferend - this.preloadTime
      }
      this._preload()
    }
  }

  _handleSourceUpdateEnd = () => {
    const video = this._player.video

    if (!video || !video.buffered.length) return

    // 对外事件
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)

    // 判断最后一个分片下载完了
    if (this._playlist.end) {
      const list = this._playlist.list
      const keys = Object.keys(list).map(x => Number(x)).sort((a, b) => a > b ? 1 : -1)
      const lastKey = keys.pop()
      const url = list[lastKey]
      const lastSeg = this._playlist._ts[url]
      if (lastSeg && lastSeg.downloaded) {
        logger.warn(this.TAG, '直播结束,断流')
        this.mse.endOfStream()
      }
    }
  }

  /** *********** 对外事件 ********************/

  _handleFetchRetry = (tag, info) => {
    this._player.emit('retry', Object.assign({
      tag
    }, info))
  }

  _onRemuxError = (mod, error, fatal) => {
    if (fatal === undefined) {
      fatal = true
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal)
  }

  _handleMseError = (tag, err, fatal) => {
    if (fatal === undefined) {
      fatal = false
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${tag}]: ${err ? err.message : ''}`,
      errd: {}
    })
    this._onError(MSE_EVENTS.MSE_ERROR, tag, err, fatal)
  }

  destroy () {
    super.destroy()
    this.mse = null
  }
}
export default HlsLiveController
