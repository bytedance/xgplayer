import VideoCtx from './video-context';
import AudioCtx from './audio-context';
// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();

    this.config = config
    this.vCtx = new VideoCtx();
    this.aCtx = new AudioCtx();

  }

  get width () {
    return this.vCtx.width
  }

  get height () {
    return this.vCtx.height
  }

  get videoWidth () {
    return this.vCtx.videoWidth
  }

  get videoHeight () {
    return this.vCtx.videoHeight
  }

  get src () {
    return this.getAttribute('src');
  }

  get readyState () {
    return this.vCtx.readyState
  }

  get seeking () {
    return this.vCtx.seeking
  }

  get currentTime () {
    return this.aCtx.currentTime
  }

  get duration () {
    return this.aCtx.duration
  }

  get paused () {
    return this.aCtx.paused
  }

  get playbackRate () {
    if (this.hasAttribute('playbackRate')) {
      return this.getAttribute('playbackRate')
    } else {
      return 1.0
    }
  }

  set playbackRate (val) {
    this.setAttribute('playbackrate', val);
    this.aCtx.playbackRate = val;
    this.vCtx.playbackRate = val;
  }

  get ended () {
    return this.aCtx.ended;
  }

  get autoplay () {
    if (this.hasAttribute('autoplay')) {
      return this.getAttribute('autoplay')
    } else {
      return false
    }
  }

  play () {
    this.aCtx.play()
    this.vCtx.play()
  }

  pause () {
    this.aCtx.pause()
    this.vCtx.pause()
  }

  get volume () {
    return this.aCtx.volume
  }

  set volume (vol) {
    this.setAttribute('volume', vol);
    this.aCtx.volume = vol
    this.vCtx.volume = vol
  }

  get muted () {
    if (this.getAttribute('muted')) {
      return this.getAttribute('muted')
    } else if (this.getAttribute('volume')) {
      return Number.parseInt(this.getAttribute('volume')) === 0
    } else {
      return false
    }
  }

  set muted (val) {
    this.setAttribute('muted ', val);

    this.aCtx.muted = false
    this.vCtx.muted = false
  }

  get error () {
    return this.vCtx.error;
  }

  get buffered () {
    return this.aCtx.buffered;
  }

  get played () {
    return this.aCtx.played;
  }

  get seekable () {
    return this.aCtx.seekable;
  }

  destroy () {

  }

  _setAudioSamples (samples) {

  }

  _setAudioMeta (meta) {

  }

  _setVideoSegment (segment) {

  }

  get currentTime () {

  }
}


export default MobileVideo;
