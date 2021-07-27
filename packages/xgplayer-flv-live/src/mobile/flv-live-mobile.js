import FlvBaseController from '../base-controller'

const Tag = 'FLVMobileController'

export default class FlvController extends FlvBaseController {
  constructor (mse, configs) {
    super(mse, configs)
    this.TAG = Tag
  }

  _initComponents () {
    super._initComponents()

    const { Remuxer, RemuxedBufferManager, decodeMode } = this._pluginConfig

    if (decodeMode === 7) {
      const remuxerWrapper = this._context.registry('MP4_REMUXER', Remuxer)()
      remuxerWrapper.setStreamProtocol('flv')
      this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
    }
  }

  /** *********** context components events handler ********************/

  _handleDemuxComplete = () => {
    let v = this._player && this._player.video
    if (v && v.onDemuxComplete) {
      if (this._compat) {
        this._compat.doFix()
      }
      const { videoTrack, audioTrack } = this.tracks
      v.onDemuxComplete(videoTrack, audioTrack)
    }
  }

  _handleMetadataParsed = (type) => {
    let { video } = this._player

    if (!this._player || !video) return

    const { audioTrack, videoTrack } = this.tracks

    if (type === 'audio') {
      if (audioTrack && audioTrack.meta) {
        video.setAudioMeta(audioTrack.meta)
      }
      return
    }

    if (videoTrack && videoTrack.meta) {
      video.setVideoMeta(videoTrack.meta)
    }
  }

  isVideoDecode () {
    return this._player.video && this._player.video.getAttribute('videoDecode')
  }
}
