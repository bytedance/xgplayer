import { Errors } from 'xgplayer'
import { EVENTS, Err } from 'xgplayer-helper-utils'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const COMPATIBILITY_EVENTS = EVENTS.COMPATIBILITY_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

export default class FlvBaseController {
  constructor (mse, configs) {
    this.mse = mse
    this.configs = configs || {}
    this._compat = null
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    }
  }

  init () {
    this._initComponents()
    this._bindEvents()
  }

  _initComponents () {
    const { FetchLoader, XgBuffer, FlvDemuxer, Tracks, Compatibility } = this._pluginConfig

    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()

    const { baseDts } = this.configs

    if (baseDts) {
      // keep the origin baseDts for abr use
      this._compat.setBaseDts(baseDts)
    }
  }

  _bindEvents () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded)
    this.on(LOADER_EVENTS.LOADER_RETRY, this._handleFetchRetry)
    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo)
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed)
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete)
    this.on(DEMUX_EVENTS.SEI_PARSED, (sei) => this._player.emit('SEI_PARSED', sei))
    this.on(REMUX_EVENTS.RANDOM_ACCESS_POINT, this._handleAddRAP)
    this.on(LOADER_EVENTS.LOADER_ERROR, this._onError)
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onError)

    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame)

    // emit to out
    this.connectEvent(LOADER_EVENTS.LOADER_START, CORE_EVENTS.LOADER_START)
    this.connectEvent(LOADER_EVENTS.LOADER_COMPLETE, CORE_EVENTS.LOADER_COMPLETE)
    this.connectEvent(LOADER_EVENTS.LOADER_RETRY, CORE_EVENTS.LOADER_RETRY)
    this.connectEvent(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, CORE_EVENTS.LOADER_RESPONSE_HEADERS)
    this.connectEvent(LOADER_EVENTS.LOADER_TTFB, CORE_EVENTS.TTFB)
    this.connectEvent(DEMUX_EVENTS.SEI_PARSED, CORE_EVENTS.SEI_PARSED)
    this.connectEvent(DEMUX_EVENTS.DEMUX_ERROR, CORE_EVENTS.DEMUX_ERROR)
    this.connectEvent(DEMUX_EVENTS.METADATA_PARSED, CORE_EVENTS.METADATA_PARSED)
    this.connectEvent(REMUX_EVENTS.REMUX_METADATA, CORE_EVENTS.REMUX_METADATA)
    this.connectEvent(COMPATIBILITY_EVENTS.EXCEPTION, CORE_EVENTS.STREAM_EXCEPTION)
  }

  /** *********** context components events handler ********************/

  _handleLoaderDataLoaded = () => {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleMediaInfo = () => {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, Err.DEMUX(new Error('failed to get mediainfo')))
    }
  }

  _handleMetadataParsed = () => {
    throw new Error('need override by children')
  }

  _handleDemuxComplete = () => {
    throw new Error('need override by children')
  }

  _handleAddRAP = (rap) => {
    if (this.state.randomAccessPoints) {
      this.state.randomAccessPoints.push(rap)
    }
  }

  /** *********** emit to out ********************/

  _handleKeyFrame = (pts) => {
    this.emitCoreEvent(CORE_EVENTS.KEYFRAME, pts)
  }

  _handleFetchRetry = (tag, info) => {
    this._player?.emit('retry', Object.assign({
      tag
    }, info))
  }

  _onError = (_, error) => {
    this._player?.emit('error', new Errors(this._player, error?.err || error))
  }

  /** *********** call by plugin ********************/

  seek () {
    if (!this.state.initSegmentArrived) {
      this.loadData()
    }
  }

  loadData (url = this._player.config.url) {
    if (!url) {
      return
    }
    const { count: times, delay: delayTime } = this._player.config.retry || {}
    const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times
    const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime

    this.emit(LOADER_EVENTS.LOADER_START, url, {
      retryCount,
      retryDelay,
      loadTimeout: this._pluginConfig.loadTimeout
    })
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

  get tracks () {
    return this._context.getInstance('TRACKS')
  }
}
