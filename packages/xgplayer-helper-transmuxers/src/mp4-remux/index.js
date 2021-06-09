import { EVENTS } from 'xgplayer-helper-utils'
import Remuxer from './remuxer';

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const PLAYER_EVENTS = EVENTS.PLAYER_EVENTS

export default class Mp4Remuxer {
  constructor (curTime = 0) {
    this.TAG = 'Mp4Remuxer';
    this._curTime = curTime;
  }

  init () {
    this.on(REMUX_EVENTS.REMUX_MEDIA, this.remux.bind(this))
    this.on(REMUX_EVENTS.REMUX_METADATA, this.onMetaDataReady.bind(this))
    this.on(REMUX_EVENTS.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this))
    this.on(REMUX_EVENTS.DETECT_FRAG_ID_DISCONTINUE, this.seek.bind(this))
    this.on(PLAYER_EVENTS.SEEK, this.seek.bind(this))
  }

  initRemuxer () {
    this.remuxer = new Remuxer({
      audioMeta: this.audioMeta,
      videoMeta: this.videoMeta,
      curTime: this._curTime
    })
    this.remuxer.on(Remuxer.EVENTS.MEDIA_SEGMENT, this.writeToSource.bind(this));
    this.remuxer.on(Remuxer.EVENTS.TRACK_REMUXED, this.onTrackRemuxed.bind(this));
  }

  remux () {
    if (!this.remuxer) {
      this.initRemuxer();
    }
    const {audioTrack, videoTrack} = this._context.getInstance('TRACKS')
    return this.remuxer.remux(audioTrack, videoTrack);
  }

  resetDtsBase () {
    this.remuxer && this.remuxer.resetDtsBase();
  }

  seek (time) {
    this.remuxer && this.remuxer.seek(time);
  }

  onMetaDataReady (type) {
    if (!this.remuxer) {
      this.initRemuxer();
    }
    let track

    if (type === 'audio') {
      const {audioTrack} = this._context.getInstance('TRACKS')
      track = audioTrack;
    } else {
      const {videoTrack} = this._context.getInstance('TRACKS')
      track = videoTrack;
    }

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.mimetype = track.meta.codec;
    source.init = this.remuxer.remuxInitSegment(type, track.meta);

    this.emit(REMUX_EVENTS.INIT_SEGMENT, type)
  }

  onTrackRemuxed (track) {
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, track);
  }

  writeToSource (type, buffer, bufferDuration) {
    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }
    source.data.push(buffer)
    if (bufferDuration) {
      source.bufferDuration = bufferDuration + (source.bufferDuration || 0)
    }
  }

  get videoMeta () {
    return this._context.getInstance('TRACKS').videoTrack.meta
  }

  get audioMeta () {
    return this._context.getInstance('TRACKS').audioTrack.meta
  }

  destroy () {
    if(this.remuxer){
      this.remuxer.destroy();
    }
    this.remuxer = null;
  }
}
