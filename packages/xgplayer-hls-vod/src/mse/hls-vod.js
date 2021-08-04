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
    const player = this._player

    if (player.video.readyState === 1 || player.video.readyState === 2) {
      const { gap, start, method } = this._detectBufferGap()
      if (gap) {
        if (method === 'ceil' && player.currentTime < Math[method](start)) {
          player.currentTime = Math[method](start)
        } else if (method === 'floor' && player.currentTime > Math[method](start)) {
          player.currentTime = Math[method](start)
        }
      }
    }

    const video = player.video
    if (!video.buffered.length) return
    // 对外事件
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)
  }

  _seekToBufferStart = () => {
    if (!this._player) return
    const video = this._player.video
    const buffered = video.buffered
    const range = [0, 0]
    const currentTime = video.currentTime
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i)
        range[1] = buffered.end(i)
        if (range[0] <= currentTime && currentTime <= range[1]) {
          return
        }
      }
    }

    const bufferStart = range[0]

    if (currentTime === 0 && currentTime < bufferStart && Math.abs(currentTime - bufferStart) < 3) {
      video.currentTime = bufferStart
    }
  }

  _detectBufferGap = () => {
    const { video } = this._player
    let result = {
      gap: false,
      start: -1
    }
    for (let i = 0; i < video.buffered.length; i++) {
      const bufferStart = video.buffered.start(i)
      const bufferEnd = video.buffered.end(i)
      if (!video.played.length || (bufferStart <= this.currentTime && bufferEnd - this.currentTime >= 0.5)) {
        break
      }
      const startGap = bufferStart - this.currentTime
      const endGap = this.currentTime - bufferEnd
      if (startGap > 0.01 && startGap <= 2) {
        result = {
          gap: true,
          start: bufferStart,
          method: 'ceil'
        }
        break
      } else if (endGap > 0.1 && endGap <= 2) {
        result = {
          gap: true,
          start: bufferEnd,
          method: 'floor'
        }
      } else {
        result = {
          gap: false,
          start: -1
        }
      }
    }
    return result
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
    this._seekToBufferStart()
    this._preload(this._player.currentTime)
  }

  _onWaiting = () => {
    if (!this._player) return

    this._seekToBufferStart()

    if (Math.abs(this._player.video.currentTime - this._player.duration) < 0.5) {
      this.mse.endOfStream()
      this._player.emit('ended')
    }
  }

  /** *********** 对外事件 ********************/

  _onRemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal)
  }

  destroy () {
    super.destroy()
    this.mse = null
  }
}
export default HlsVodController
