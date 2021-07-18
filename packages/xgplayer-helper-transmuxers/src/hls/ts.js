import { EVENTS, logger } from 'xgplayer-helper-utils'
import {AudioTrack, VideoTrack} from 'xgplayer-helper-models'
import Demuxer from './ts-demuxer'
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS

/**
 * @typedef {import('xgplayer-helper-models').TsFrag} TsFrag
 */

class TsDemuxer {
  constructor (configs) {
    this.configs = Object.assign({}, configs)
    this.demuxer = null
  }

  init () {
    this.on(DEMUX_EVENTS.DEMUX_START, this.demux.bind(this))
  }

  initDemuxer () {
    this.demuxer.on(Demuxer.EVENTS.METADATA_PARSED, this.onMetaDataParsed.bind(this))
    this.demuxer.on(Demuxer.EVENTS.VIDEO_SAMPLE_PARSED, this.onVideoSampleParsed.bind(this))
    this.demuxer.on(Demuxer.EVENTS.AUDIO_SAMPLE_PARSED, this.onAudioSampleParsed.bind(this))
    this.demuxer.on(Demuxer.EVENTS.SEI_PARSED, this.emit.bind(this, DEMUX_EVENTS.SEI_PARSED))
  }

  /**
   * @param {TsFrag} frag
   * @param {boolean} isVod
   */
  demux (frag, isVod) {
    if (!this._tracks) {
      return
    }
    if (!this._tracks.audioTrack) {
      this._tracks.audioTrack = new AudioTrack()
    }

    if (!this._tracks.videoTrack) {
      this._tracks.videoTrack = new VideoTrack()
    }

    if (!this.demuxer) {
      this.demuxer = new Demuxer(this._tracks)
      this.initDemuxer()
    }
    try {
      this.demuxer.demux(frag, this.inputBuffer, isVod)
    } catch (e) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, e, false)
    }
    const hasVideo = this._tracks.videoTrack && this._tracks.videoTrack.samples.length ? 1 : 0
    const hasAudio = this._tracks.audioTrack && this._tracks.audioTrack.samples.length ? 1 : 0
    this.emit(DEMUX_EVENTS.DEMUX_COMPLETE, hasVideo, hasAudio)
  }

  onMetaDataParsed (type, meta) {
    const { videoTrack, audioTrack } = this._tracks
    let track = videoTrack

    if (type === 'video') {
      logger.warn(this.TAG, `[ video metadata: codec=${meta.codec}, timescale=${meta.timescale},presentWidth=${meta.presentWidth}, presentHeight=${meta.presentHeight}, timescale.den=${meta.frameRate.fps_den}, timescale.num=${meta.frameRate.fps_num}, refSampleDuration=${meta.refSampleDuration} ]`)
    }

    if (type === 'audio') {
      logger.warn(this.TAG, `[ audio metadata: codec=${meta.codec}, samplerate=${meta.sampleRate}, timescale=${meta.timescale}, refSampleDuration:${meta.refSampleDuration}, sampleRateIndex=${meta.sampleRateIndex}, objectType=${meta.objectType}, originObjectType=${meta.originObjectType} ]`)
    }

    switch (type) {
      case 'video':
        track = videoTrack
        break
      case 'audio':
        track = audioTrack
        break
      default:
        track = videoTrack
    }
    track.meta = meta
    this.emit(DEMUX_EVENTS.METADATA_PARSED, type, meta)
  }

  onVideoSampleParsed (sample) {
    if (sample.isKeyframe) {
      this.emit(DEMUX_EVENTS.ISKEYFRAME, sample.pts)
    }
    this._tracks.videoTrack.samples.push(sample)
  }

  onAudioSampleParsed (sample) {
    this._tracks.audioTrack.samples.push(sample)
  }

  destroy () {
    this.off(DEMUX_EVENTS.DEMUX_START, this.demux)
    this.configs = {}
    this.demuxer && this.demuxer.destroy()
  }

  get inputBuffer () {
    return this._context.getInstance(this.configs.inputbuffer)
  }

  get _tracks () {
    return this._context.getInstance('TRACKS')
  }
}

export default TsDemuxer
