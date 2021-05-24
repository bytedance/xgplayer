import { EVENTS } from 'xgplayer-helper-utils';
import {AudioTrack, VideoTrack} from 'xgplayer-helper-models';
import Demuxer from './ts-demuxer';
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

/**
 * @typedef {import('xgplayer-helper-models').TsFrag} TsFrag
 */

class TsDemuxer {
  constructor (configs) {
    this.TAG = 'TsDemuxer';
    this.configs = Object.assign({}, configs);
    this.demuxer = null;
  }

  init () {
    this.on(DEMUX_EVENTS.DEMUX_START, this.demux.bind(this));
  }

  initDemuxer () {
    this.demuxer.on(Demuxer.EVENTS.METADATA_PARSED, this.onMetaDataParsed.bind(this));
    this.demuxer.on(Demuxer.EVENTS.VIDEO_SAMPLE_PARSED, this.onVideoSampleParsed.bind(this));
    this.demuxer.on(Demuxer.EVENTS.AUDIO_SAMPLES_PARSED, this.onAudioSamplesParsed.bind(this));
    this.demuxer.on(Demuxer.EVENTS.SEI_PARSED, this.emit.bind(this, DEMUX_EVENTS.SEI_PARSED));
  }

  /**
   * @param {TsFrag} frag
   * @param {boolean} isVod
   */
  demux (frag, isVod) {
    if (!this._tracks) {
      return;
    }
    if (!this._tracks.audioTrack) {
      this._tracks.audioTrack = new AudioTrack();
    }

    if (!this._tracks.videoTrack) {
      this._tracks.videoTrack = new VideoTrack();
    }

    if (!this.demuxer) {
      this.demuxer = new Demuxer(this._tracks);
      this.initDemuxer()
    }
    try {
      this.demuxer.demux(frag, this.inputBuffer, isVod)
    } catch (e) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, e, false);
    }
    const hasVideo = this._tracks.videoTrack && this._tracks.videoTrack.samples.length ? 1 : 0;
    const hasAudio = this._tracks.audioTrack && this._tracks.audioTrack.samples.length ? 1 : 0;
    this.emit(DEMUX_EVENTS.DEMUX_COMPLETE, hasVideo, hasAudio);
  }

  onMetaDataParsed (type, meta) {
    const { videoTrack, audioTrack } = this._tracks;
    let track = videoTrack;

    switch (type) {
      case 'video':
        track = videoTrack;
        break;
      case 'audio':
        track = audioTrack;
        break;
      default:
        track = videoTrack;
    }
    const existMeta = track.meta;
    track.meta = meta;
    if (existMeta) {
      this.emit(type === 'audio' ? DEMUX_EVENTS.AUDIO_METADATA_CHANGE : DEMUX_EVENTS.VIDEO_METADATA_CHANGE);
    } else {
      this.emit(DEMUX_EVENTS.METADATA_PARSED, type, meta);
    }
  }

  onVideoSampleParsed (sample) {
    this._tracks.videoTrack.samples.push(sample);
  }

  onAudioSamplesParsed (samples) {
    const { audioTrack } = this._tracks;
    audioTrack.samples.push.apply(audioTrack.samples, samples);
  }

  destroy () {
    this.off(DEMUX_EVENTS.DEMUX_START, this.demux);
    this.configs = {};
    this.demuxer && this.demuxer.destroy();
  }

  get inputBuffer () {
    return this._context.getInstance(this.configs.inputbuffer);
  }

  get _tracks () {
    return this._context.getInstance('TRACKS');
  }
}

export default TsDemuxer;
