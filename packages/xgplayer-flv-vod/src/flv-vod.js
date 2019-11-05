import FlvDemuxer from '../../xgplayer-demux/src/flv'
import Remuxer from 'xgplayer-remux'
import { FetchLoader } from 'xgplayer-loader'
import { Tracks, XgBuffer, PreSource } from 'xgplayer-buffer'
import { Mse, EVENTS } from 'xgplayer-utils'
import { Compatibility } from 'xgplayer-codec'
import Player from 'xgplayer'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS

const Tag = 'FLVController'

class Logger {
  warn () {}
}

const FLV_ERROR = 'FLV_ERROR'

class FlvController {
  constructor (player) {
    this.TAG = Tag
    this._player = player

    this.state = {
      initSegmentArrived: false,
      range: {
        start: 0,
        end: ''
      },
      rangeSupport: true
    }
  }

  static findFilePosition (time, keyframes) {
    for (let i = 0, len = keyframes.times.length; i < len; i++) {
      const currentKeyframeTime = keyframes.times[i]
      const nextKeyframeTime = i + 1 < len ? keyframes.times[i + 1] : Number.MAX_SAFE_INTEGER

      if (currentKeyframeTime <= time && time <= nextKeyframeTime) {
        return keyframes.filepositions[i]
      }
    }

    return ''
  }

  init () {
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('MP4_REMUXER', Remuxer.Mp4Remuxer)
    this._context.registry('PRE_SOURCE_BUFFER', PreSource)

    this._context.registry('COMPATIBILITY', Compatibility)

    this._context.registry('LOGGER', Logger)
    this.mse = this._context.registry('MSE', Mse)({ container: this._player.video })

    this.initListeners()

    setTimeout(() => {
      this.loadMeta()
    }, 0)
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this))
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this))
  }

  _handleMediaInfo () {
    if (!this._context.onMetaData) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
    const buffer = this._context.getInstance('LOADER_BUFFER')
    const loader = this._context.getInstance('FETCH_LOADER')
    if (this.isSeekable) {
      loader.cancel()
      // 初始化点播的range
      this.state.range = {
        start: 0,
        end: buffer.historyLen - 1
      }
      setTimeout(() => {
        this.loadNext(0)
      })
    }
  }

  _handleLoaderDataLoaded () {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleMetadataParsed (type) {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _handleDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
  }

  _handleMediaSegment () {
    this.mse.addSourceBuffers()
    this.mse.doAppend();
  }

  _handleNetworkError (tag, err) {
    this._player.emit('error', new Player.Errors('network', this._player.config.url))
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true)
  }

  _handleDemuxError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', new Player.Errors('parse', this._player.config.url))
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, fatal)
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal || false
    }
    this._player.emit(FLV_ERROR, error);
  }

  seek (time) {
    if (!this._context.onMetaData) {
      this.loadMeta()
      return
    }
    if (!this.isSeekable) {
      return
    }

    const buffer = this._context.getInstance('LOADER_BUFFER')
    buffer.clear()

    const { preloadTime = 15 } = this._player.config
    const range = this.getSeekRange(time, preloadTime)
    this.state.range = range

    if (this.compat) {
      this.compat.reset()
    }
    this.loadData()
  }

  loadNext (curTime) {
    if (!this._context.onMetaData) {
      return
    }

    if (this.loader.loading) {
      return;
    }

    if (this.getNextRange(curTime)) {
      this.loadData()
    }
  }

  loadData () {
    const { start, end } = this.state.range
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url, {
      headers: {
        method: 'get',
        Range: `bytes=${start}-${end}`
      }
    })
  }

  loadMeta () {
    this.loader.load(this._player.config.url, {
      headers: {
        Range: 'bytes=0-'
      }
    }).catch(() => {
      // 在尝试获取视频数据失败时，尝试使用直播方式加载整个视频
      this.state.rangeSupport = false
      this.loadFallback()
    })
  }

  loadFallback () {
    this.loader.load(this._player.config.url).catch(() => {
      // 在尝试获取视频数据失败时，尝试使用直播方式加载整个视频
      this._player.emit('error', new Player.Errors('network', this._player.config.url))
    })
  }

  getSeekRange (time, preloadTime) {
    const { keyframes } = this._context.onMetaData
    const duration = this._context.mediaInfo.duration
    const seekStartTime = time
    const seekEndTime = time + preloadTime

    const seekStartFilePos = FlvController.findFilePosition(seekStartTime, keyframes)

    if (seekEndTime >= duration || seekStartTime >= duration) {
      return {
        start: seekStartFilePos,
        end: ''
      }
    }
    const seekEndFilePos = FlvController.findFilePosition(seekEndTime, keyframes)

    return {
      start: seekStartFilePos,
      end: seekEndFilePos
    }
  }

  getNextRange (time) {
    if (this.state.range.end === '') {
      return;
    }

    const { end } = this.getSeekRange(time, this.config.preloadTime || 15)
    if (end <= this.state.range.end && end !== '') {
      return;
    }

    this.state.range = {
      start: this.state.range.end + 1,
      end
    }
    return true;
  }

  destroy () {
    this._player = null
    this.mse = null
    this.state = {
      initSegmentArrived: false,
      range: {
        start: 0,
        end: ''
      },
      rangeSupport: true
    }
  }

  get isSeekable () {
    if (!this.state.rangeSupport) {
      return false
    }

    if (!this._context || !this._context.mediaInfo.isComplete()) {
      return true
    }
    return this._context.mediaInfo.keyframes !== null && this._context.mediaInfo.keyframes !== undefined
  }

  get config () {
    return this._player.config
  }

  get loader () {
    return this._context.getInstance('FETCH_LOADER')
  }

  get compat () {
    return this._context.getInstance('COMPATIBILITY')
  }
}

export default FlvController
