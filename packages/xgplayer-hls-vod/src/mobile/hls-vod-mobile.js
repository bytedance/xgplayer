import BaseController from '../base-controller'

class HlsVodMobileController extends BaseController {
  constructor () {
    super()
    this.TAG = 'HlsVodMobileController'
    this.configs = Object.assign({}, this._pluginConfig)
  }

  init () {
    super.init()
    this._bindEvents()
  }

  _bindEvents () {
    super._bindEvents()
  }

  _onTimeUpdate = () => {
    this._preload(this._player.currentTime)
  }

  _onWaiting = () => {}

  _onMetadataParsed = (type) => {
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

  _onDemuxComplete = () => {
    if (!this._player || !this._player.video) return
    const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')
    if (this._player.video) {
      this._player.video.onDemuxComplete(videoTrack, audioTrack)
    }
  }

  _setMetaToAudio = (audioMeta) => {
    if (this._player.video) {
      this._player.video.setAudioMeta(audioMeta)
    }
  }

  _setMetaToVideo = (videoMeta) => {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta)
    }
  }

  destroy () {
    super.destroy()
    this.configs = {}
  }
}
export default HlsVodMobileController
