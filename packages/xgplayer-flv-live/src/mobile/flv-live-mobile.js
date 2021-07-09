import { EVENTS } from 'xgplayer-helper-utils'

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const LOADER_EVENTS = EVENTS.LOADER_EVENTS

const Tag = 'FLVController'

const FLV_ERROR = 'FLV_ERROR'

export default class FlvController {
  constructor () {
    this.TAG = Tag

    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    }

    this.bufferClearTimer = null
  }

  init () {
    this.initComponents()
    this.initListeners()
  }

  initComponents () {
    const { FetchLoader, XgBuffer, FlvDemuxer, Tracks, Logger, PageVisibility, Remuxer, RemuxedBufferManager, decodeMode } = this._pluginConfig

    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('LOGGER', Logger)
    this._context.registry('PAGE_VISIBILITY', PageVisibility)
    if (decodeMode === 7) {
      this._context.registry('MP4_REMUXER', Remuxer)
    }
    this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))
    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))
    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame.bind(this))
  }

  _handleMediaInfo () {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
  }

  _handleKeyFrame (pts) {
    this._player && this._player.emit('isKeyframe', pts)
  }

  _handleLoaderDataLoaded () {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _handleDemuxComplete () {
    let v = this._player.video
    if (v && v.onDemuxComplete) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')
      v.onDemuxComplete(videoTrack, audioTrack)
    }
  }
  _handleVisibilityChange (visible) {
    if (!visible && !this._player.paused) {
      this._player.pause()
    }
  }

  _handleMetadataParsed (type) {
    if (type === 'audio') {
      const { audioTrack } = this._context.getInstance('TRACKS')
      if (audioTrack && audioTrack.meta) {
        this._setMetaToAudio(audioTrack.meta)
      }
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS')
      if (videoTrack && videoTrack.meta) {
        this._setMetaToVideo(videoTrack.meta)
      }
    }
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

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
  }

  _handleNetworkError (tag, err) {
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true)
    this._player.emit('error', {
      code: err.code,
      codeName: err.name,
      errorType: 'network',
      ex: `[${tag}]: ${err.message}`,
      errd: {}
    })
  }

  _handleDemuxError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false
    }
    this._onError(DEMUX_EVENTS.DEMUX_ERROR, tag, err, fatal)
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${tag}]: ${err ? err.message : ''}`,
      errd: {}
    })
  }

  _handleAddRAP (rap) {
    if (this.state.randomAccessPoints) {
      this.state.randomAccessPoints.push(rap)
    }
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal || false
    }
    console.error('flv onError')
    this._player.emit(FLV_ERROR, error)
  }

  seek () {
    if (!this.state.initSegmentArrived) {
      this.loadData()
    }
  }

  loadData (url = this._player.config.url) {
    if (!url) {
      this._player.emit('error', {
        code: '0',
        errorType: 'network',
        ex: `empty url`,
        errd: {}
      })
      return
    }

    const { count: times, delay: delayTime } = this._player.config.retry || {}
    // 兼容player.config上传入retry参数的逻辑
    const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times
    const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime
    this.emit(LOADER_EVENTS.LADER_START, url, {}, retryCount, retryDelay)
  }

  pause () {
    const loader = this._context.getInstance('FETCH_LOADER')

    if (loader) {
      loader.cancel()
    }
  }

  destroy () {
    this.state.randomAccessPoints = []
  }

  isVideoDecode () {
    return this._player.video && this._player.video.getAttribute('videoDecode')
  }
}
