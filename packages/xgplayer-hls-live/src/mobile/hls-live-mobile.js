import { EVENTS, logger } from 'xgplayer-helper-utils'
import BaseController from '../base-controlller'

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS

class HlsLiveController extends BaseController {
  constructor () {
    super()
    this.TAG = 'HlsLiveMobileController'
    this._lastCheck = 0
  }

  init () {
    super.init()
    this._initEvents()
  }

  _initEvents () {
    super._initEvents()
    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame)
  }

  _onDemuxComplete = () => {
    if (this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')
      if (!videoTrack) return
      if (this._compat) {
        this._compat.doFix()
      }
      this._player.video.onDemuxComplete(videoTrack, audioTrack)
    }
  }

  _handleKeyFrame = (pts) => {
    this._player && this._player.emit('isKeyframe', pts)
  }

  _onMetadataParsed = (type) => {
    logger.warn(this.TAG, 'meta detect or changed , ', type)
    if (type === 'audio') {
      // 将音频meta信息交给audioContext，不走remux封装
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

  // 触发waiting时候,攒两个分片再播放
  _streamEnd () {
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
    if (this._player.video) {
      this._player.video.handleEnded()
    }
  }

  _m3u8Loaded (mdata) {
    this._m3u8FlushDuration = this._playlist.targetduration || this._m3u8FlushDuration
    if (this._playlist.fragLength > 0) {
      this.retryTimes = this._pluginConfig.retryTimes
    } else {
      if (this.retryTimes > 0) {
        this.retryTimes--
        this._preload()
      } else {
        this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
        if (this._player.video) {
          this._player.video.handleEnded()
        }
      }
    }
  }

  _checkStatus = () => {
    if (this.retryTimes < 1 && (new Date().getTime() - this._lastCheck < 10000)) {
      return
    }
    this._lastCheck = new Date().getTime()
    if (this._player.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = this._player.currentTime
      if (this._player.readyState <= 2) {
        this._preload()
      }
      let bufferend = this._player.buffered.end(this._player.buffered.length - 1)
      if (currentTime > bufferend - this.preloadTime) {
        this._preload()
      }
    }
  }

  _isHEVC (meta) {
    return meta && meta.codec === 'hev1.1.6.L93.B0'
  }

  resetLoaderIdle () {
    this._m3u8loader.loading = false
    this._tsloader.loading = false
  }

  resetPlayList () {
    this._playlist.clear()
  }

  destroy () {
    super.destroy()
  }
}
export default HlsLiveController
