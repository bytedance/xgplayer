import { EVENTS, Mse } from 'xgplayer-helper-utils'
import { RemuxedBufferManager } from 'xgplayer-helper-models'
import { Mp4Remuxer } from 'xgplayer-helper-transmuxers'
import BaseController from '../base-controller'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

class HlsVodController extends BaseController {
  constructor (mse) {
    super()
    this.TAG = 'HlsVodController'
    this.mse = mse
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    super.init()

    // 初始化MP4 Remuxer
    this._presource = this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)()
    this._context.registry('MP4_REMUXER', Mp4Remuxer)(this._player.currentTime)

    // 初始化MSE
    if (!this.mse) {
      this.mse = new Mse({ preloadTime: this.preloadTime, container: this._player.video }, this._context)
      this.mse.init()
    }
    this._bindEvents()
  }

  _bindEvents () {
    super._bindEvents()
    this.on(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment)
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment)
    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._onSourceUpdateEnd)
    this.on(MSE_EVENTS.MSE_ERROR, this._onError)
    this.on(REMUX_EVENTS.REMUX_ERROR, this._onError)
  }

  _onInitSegment = () => {
    this.mse.addSourceBuffers()
  }

  _onMediaSegment = () => {
    if (Object.keys(this.mse.sourceBuffers).length < 1) {
      this.mse.addSourceBuffers()
    }

    this.mse.doAppend()
  }

  _onSourceUpdateEnd = () => {
    if (!this._player || !this._player.video) return

    const video = this._player.video

    if (!video.buffered.length) return

    this._checkEndOfStream()

    // eimt to out
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)
  }

  // condition for close mediasource
  _checkEndOfStream = () => {
    const { buffered, duration } = this._player.video

    const len = buffered.length

    if (!len) return

    if (duration - buffered.end(len - 1) < 0.5) {
      this.mse.endOfStream()
    }
  }

  _onMetadataParsed = (type) => {
    const duration = parseInt(this._playlist.duration)
    if (type === 'video') {
      this._tracks.videoTrack.meta.duration = duration
    } else if (type === 'audio') {
      this._tracks.audioTrack.meta.duration = duration
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onDemuxComplete = () => {
    this.emit(REMUX_EVENTS.REMUX_MEDIA, 'ts')
  }

  _onTimeUpdate = () => {
    if (!this._player) return
    this._preload(this._player.currentTime)
  }

  destroy () {
    super.destroy()
    this.mse = null
  }
}
export default HlsVodController
