import LiveController from '../flv-vod'

class LiveMobileController extends LiveController {
  _handleDemuxComplete () {
    if(this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS');
      this._player.video.onDemuxComplete(videoTrack, audioTrack);
    }
  }

  _handleMetadataParsed (type) {
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
      this._player.video.setAudioMeta(audioMeta);
    }
  }

  _setMetaToVideo (videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta);
    }
  }
}

export default LiveMobileController;
