import { EVENTS } from 'xgplayer-helper-utils'
import FlvBaseController from '../base-controller'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

const Tag = 'FLVController'

export default class FlvController extends FlvBaseController {
  constructor (mse, configs) {
    super(mse, configs)
    this.TAG = Tag
  }

  init () {
    super.init()

    if (!this.mse) {
      const { Mse } = this._pluginConfig
      this.mse = new Mse({ container: this._player.video }, this._context)
      this.mse.init()
    }
  }

  _initComponents () {
    super._initComponents()

    const { Remuxer, RemuxedBufferManager } = this._pluginConfig

    const remuxerWrapper = this._context.registry('MP4_REMUXER', Remuxer)()
    remuxerWrapper.setStreamProtocol('flv')

    this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
  }

  _bindEvents () {
    super._bindEvents()

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment)
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment)
    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd)
    this.on(REMUX_EVENTS.REMUX_ERROR, this._onError)
    this.on(MSE_EVENTS.MSE_ERROR, this._onError)

    this._player.on('timeupdate', this._handleTimeUpdate)
  }

  /** *********** context components events handler ********************/

  _handleDemuxComplete = () => {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleMetadataParsed = (type) => {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _handleAppendInitSegment = () => {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
  }

  _handleMediaSegment = () => {
    this.mse.addSourceBuffers()
    this.mse.doAppend()
  }

  _handleSourceUpdateEnd = () => {
    const time = this._player.currentTime
    const video = this._player.video
    const preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime // 兼容老版本从config传入preloadTime的写法

    const { length } = video.buffered

    if (length === 0) {
      return
    }

    // emit to out
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)

    const bufferEnd = video.buffered.end(length - 1)
    if (bufferEnd - time > preloadTime * 2 && !this._player.paused) {
      if (bufferEnd - preloadTime > this._player.currentTime) {
        this._player.currentTime = bufferEnd - preloadTime
      }
    }
    this.mse.doAppend()
    if (this._player.paused || this.urlSwitching) {
      this.urlSwitching = false
      this._handleTimeUpdate()
    }
  }

  _handleTimeUpdate = () => {
    if (!this._player || !this._player.video) return

    const time = this._player.currentTime
    const video = this._player.video
    const buffered = video.buffered

    if (!buffered || !buffered.length) {
      return
    }

    const range = [0, 0]
    const currentTime = video.currentTime
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i)
        range[1] = buffered.end(i)
        if (range[0] <= currentTime && currentTime <= range[1]) {
          break
        }
      }
    }

    const bufferStart = range[0]
    const bufferEnd = range[1]

    if (currentTime < bufferStart) {
      // skip small hole
      video.currentTime = bufferStart + 0.1
      return
    }

    if (time - bufferStart > 10 || buffered.length > 1) {
      if (this.bufferClearTimer || !this.state.randomAccessPoints.length) {
        return
      }
      let rap = Infinity
      for (let i = 0; i < this.state.randomAccessPoints.length; i++) {
        const temp = Math.ceil(this.state.randomAccessPoints[i] / 1000)
        if (temp > time - 10) {
          break
        } else {
          rap = temp
        }
      }

      this.mse.remove(Math.max(Math.min(rap, time - 10, bufferEnd - 10), 0.1), 0)

      this.bufferClearTimer = setTimeout(() => {
        this.bufferClearTimer = null
      }, 5000)
    }
  }

  destroy () {
    super.destroy()
    this.mse = null
    this._player.off('timeupdate', this._handleTimeUpdate)
  }
}
