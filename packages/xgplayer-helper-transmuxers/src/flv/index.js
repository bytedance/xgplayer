import Demuxer from './demuxer';
import { AudioTrackMeta, VideoTrackMeta, VideoTrack, AudioTrack } from 'xgplayer-helper-models';
import { EVENTS } from 'xgplayer-helper-utils';

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const INTERNAL_EVENTS = Demuxer.EVENTS;
class FlvDemuxer {
  constructor () {
    this._firstFragmentLoaded = false
    this._trackNum = 0
    this._hasScript = false
    this._videoMetaChange = false
    this._audioMetaChange = false

    this.demuxer = new Demuxer();
  }

  init () {
    this.on(DEMUX_EVENTS.DEMUX_START, this.demux.bind(this))
    this.demuxer.on(INTERNAL_EVENTS.FILE_HEADER_PARSED, this.handleFileHeaderParsed.bind(this));
    this.demuxer.on(INTERNAL_EVENTS.SCRIPT_TAG_PARSED, this.handleScriptTagParsed.bind(this));
    this.demuxer.on(INTERNAL_EVENTS.AUDIO_META_PARSED, this.handleAudioMetaParsed.bind(this));
  }

  handleAudioMetaParsed (meta) {

  }

  handleScriptTagParsed (onMetaData) {
    const { videoTrack, audioTrack } = this;
    // fill mediaInfo
    this._context.mediaInfo.duration = onMetaData.duration
    if (typeof onMetaData.hasAudio === 'boolean') {
      this._context.mediaInfo.hsaAudio = onMetaData.hasAudio
    }
    if (typeof onMetaData.hasVideo === 'boolean') {
      this._context.mediaInfo.hasVideo = onMetaData.hasVideo
    }

    this.emit(DEMUX_EVENTS.MEDIA_INFO)
    this._hasScript = true

    // Edit default meta.
    if (audioTrack && !audioTrack.hasSpecificConfig) {
      let meta = audioTrack.meta
      if (onMetaData.audiosamplerate) {
        meta.sampleRate = onMetaData.audiosamplerate
      }

      if (onMetaData.audiochannels) {
        meta.channelCount = onMetaData.audiochannels
      }

      switch (onMetaData.audiosamplerate) {
        case 44100:
          meta.sampleRateIndex = 4
          break
        case 22050:
          meta.sampleRateIndex = 7
          break
        case 11025:
          meta.sampleRateIndex = 10
          break
      }
    }
    if (videoTrack && !videoTrack.hasSpecificConfig) {
      let meta = videoTrack.meta
      if (typeof onMetaData.framerate === 'number') {
        let fpsNum = Math.floor(onMetaData.framerate * 1000)
        if (fpsNum > 0) {
          let fps = fpsNum / 1000
          if (!meta.frameRate) {
            meta.frameRate = {}
          }
          meta.frameRate.fixed = true
          meta.frameRate.fps = fps
          meta.frameRate.fps_num = fpsNum
          meta.frameRate.fps_den = 1000
        }
      }
    }
  }

  handleFileHeaderParsed ({ hasVideo, hasAudio }) {
    this._context.mediaInfo.hasVideo = hasVideo
    this._context.mediaInfo.hasAudio = hasAudio
  }

  demux () {
    if (this.loaderBuffer) {
      this.demuxer.doParseFlv(this.loaderBuffer)
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
    }
  }
  /**
   * If the stream has audio or video.
   * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
   */
  static getPlayType (streamFlag) {
    const result = {
      hasVideo: false,
      hasAudio: false
    }

    if (streamFlag & 0x01 > 0) {
      result.hasVideo = true
    }

    if (streamFlag & 0x04 > 0) {
      result.hasAudio = true
    }

    return result
  }

  /**
   * init default video track configs
   */
  initVideoTrack () {
    this.trackNum++
    let videoTrack = new VideoTrack()
    videoTrack.meta = new VideoTrackMeta()
    videoTrack.id = videoTrack.meta.id = this.trackNum

    this.tracks.videoTrack = videoTrack
  }

  /**
   * init default audio track configs
   */
  initAudioTrack () {
    this.trackNum++
    let audioTrack = new AudioTrack()
    audioTrack.meta = new AudioTrackMeta()
    audioTrack.id = audioTrack.meta.id = this.trackNum

    this.tracks.audioTrack = audioTrack
  }

  get loaderBuffer () {
    const buffer = this._context.getInstance('LOADER_BUFFER')
    if (buffer) {
      return buffer
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('找不到 loaderBuffer 实例'))
    }
  }

  get tracks () {
    return this._context.getInstance('TRACKS')
  }

  get logger () {
    return this._context.getInstance('LOGGER')
  }

  destroy () {
    if (this.demuxer) {
      this.demuxer.destroy();
    }
  }
}

export default FlvDemuxer
