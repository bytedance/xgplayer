import Demuxer from './demuxer';
import { AudioTrackMeta, VideoTrackMeta, VideoTrack, AudioTrack } from 'xgplayer-helper-models';
import { EVENTS } from 'xgplayer-helper-utils';

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

class FlvDemuxer {
  constructor () {
    this._firstFragmentLoaded = false
    this._trackNum = 0
    this._hasScript = false
    this._videoMetaChange = false
    this._audioMetaChange = false
    this.gopId = 0
    this.demuxer = new Demuxer();
  }

  init () {
    this.on(DEMUX_EVENTS.DEMUX_START, this.demux.bind(this))
  }

  demux () {

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
    this._trackNum++
    let videoTrack = new VideoTrack()
    videoTrack.meta = new VideoTrackMeta()
    videoTrack.id = videoTrack.meta.id = this._trackNum

    this.tracks.videoTrack = videoTrack
  }

  /**
   * init default audio track configs
   */
  initAudioTrack () {
    this._trackNum++
    let audioTrack = new AudioTrack()
    audioTrack.meta = new AudioTrackMeta()
    audioTrack.id = audioTrack.meta.id = this._trackNum

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
}

export default FlvDemuxer
