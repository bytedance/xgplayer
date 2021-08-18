import { Errors } from 'xgplayer'
import { EVENTS, Err, FetchLoader, Mse } from 'xgplayer-helper-utils'
import { FlvDemuxer, Mp4Remuxer as Remuxer } from 'xgplayer-helper-transmuxers'
import { Tracks, RemuxedBufferManager, Buffer as XgBuffer } from 'xgplayer-helper-models'
import { Compat as Compatibility } from 'xgplayer-helper-codec'
import { getNearestKeyframe } from './helper'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS
const COMPATIBILITY_EVENTS = EVENTS.COMPATIBILITY_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

export default class FlvVodController {
  _keyframes =null
  _loader = null
  _buffer = null
  _compat = null
  _acceptRanges = true

  constructor (configs) {
    this.configs = configs || {}
  }

  init () {
    this._initComponents()
    this._bindEvents()
  }

  _initComponents () {
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('MP4_REMUXER', Remuxer)
    this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
    this._context.registry('TRACKS', Tracks)
    this._loader = this._context.registry('FETCH_LOADER', FetchLoader)()
    this._buffer = this._context.registry('LOADER_BUFFER', XgBuffer)()
    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()
    this._mse = this._context.registry('MSE', Mse)({ container: this._player.video })
  }

  _bindEvents () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded)
    this.on(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, this._handleResponseHeaders)
    this.on(LOADER_EVENTS.LOADER_RETRY, this._handleFetchRetry)
    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo)
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed)
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete)
    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment)
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment)
    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd)
    this.on(DEMUX_EVENTS.SEI_PARSED, sei => this._player?.emit('SEI_PARSED', sei))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._onError)
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onError)
    this.on(REMUX_EVENTS.REMUX_ERROR, this._onError)
    this.on(MSE_EVENTS.MSE_ERROR, this._onError)

    // emit to out
    this.connectEvent(LOADER_EVENTS.LOADER_START, CORE_EVENTS.LOADER_START)
    this.connectEvent(LOADER_EVENTS.LOADER_COMPLETE, CORE_EVENTS.LOADER_COMPLETE)
    this.connectEvent(LOADER_EVENTS.LOADER_RETRY, CORE_EVENTS.LOADER_RETRY)
    this.connectEvent(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, CORE_EVENTS.LOADER_RESPONSE_HEADERS)
    this.connectEvent(LOADER_EVENTS.LOADER_TTFB, CORE_EVENTS.TTFB)
    this.connectEvent(DEMUX_EVENTS.DEMUX_ERROR, CORE_EVENTS.DEMUX_ERROR)
    this.connectEvent(DEMUX_EVENTS.METADATA_PARSED, CORE_EVENTS.METADATA_PARSED)
    this.connectEvent(REMUX_EVENTS.REMUX_METADATA, CORE_EVENTS.REMUX_METADATA)
    this.connectEvent(COMPATIBILITY_EVENTS.EXCEPTION, CORE_EVENTS.STREAM_EXCEPTION)
    this.connectEvent(DEMUX_EVENTS.SEI_PARSED, CORE_EVENTS.SEI_PARSED)
  }

  /** *********** context components events handler ********************/

  _handleResponseHeaders = (headers) => {
    this._acceptRanges = !!headers.get('Accept-Ranges') || !!headers.get('Content-Range')
  }

  _handleLoaderDataLoaded = () => {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleMediaInfo = (metadata) => {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, Err.DEMUX(new Error('failed to get mediainfo')))
    }
    this._keyframes = metadata.keyframes
  }

  _handleDemuxComplete = () => {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleMetadataParsed = (type) => {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _handleAppendInitSegment = () => {
    this.mse.addSourceBuffers()
  }

  _handleMediaSegment = () => {
    this.mse.addSourceBuffers()
    this.mse.doAppend()
  }

  _handleSourceUpdateEnd = () => {
    const video = this._player?.video
    const { length } = video?.buffered || 0

    if (length === 0) return

    // emit to out
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)

    this.mse.doAppend()

    if (Math.abs(video.buffered.end(length - 1) - video.duration) < 0.1) {
      this.mse.endOfStream()
    }
  }

  /** *********** emit to out ********************/

  _handleFetchRetry = (tag, info) => {
    this._player?.emit('retry', Object.assign({
      tag
    }, info))
  }

  _onError = (_, error) => {
    this._player?.emit('error', new Errors(this._player, error?.err || error))
  }

  /** *********** call by plugin ********************/

  seek (time) {
    if (!this.seekable) return

    let { seconds, fileposition } = getNearestKeyframe(time, this._keyframes)

    if (!seconds) {
      return
    }

    this._loader?.cancel()
    this._buffer?.reset()

    Promise.resolve().then(() => {
      this._partialRequest(fileposition)
      this._compat?.updateNextDtsBySeekTime(seconds)
    })
  }

  loadData () {
    this._partialRequest(0)
  }

  _partialRequest (start = 0, end = '') {
    let url = this._player?.config.url

    if (!url) return

    this._pluginConfig.options.headers = {
      Range: `bytes=${start}-${end}`
    }

    this.emit(LOADER_EVENTS.LOADER_START, url, this._pluginConfig)
  }

  get seekable () {
    return !!this._keyframes && this._acceptRanges
  }

  get mse () {
    return this._mse
  }

  get tracks () {
    return this._context.getInstance('TRACKS')
  }
}
