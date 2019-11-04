import VideoCtx from './video-context';
import AudioCtx from './audio-context';
import { getTicker } from './ticker';
/**
 * 音画同步调和器
 */
class AVReconciler {
  constructor (props) {
    this.aCtx = props.aCtx;
    this.vCtx = props.vCtx;
    this.video = props.video
    this.timeoutId = null
    this.start = null
  }

  doReconcile () {
    const vCurTime = (this.vCtx.currentTime || 0);
    const aCurTime = (this.aCtx.currentTime || 0) * 1000;

    const gap = vCurTime - aCurTime;
    if (this.timeoutId) {
      return;
    }
    if (gap > 200) { // audio delayed for more than 100ms
      this.video.start += gap
      this.vCtx.pause()
      this.timeoutId = setTimeout(() => {
        this.vCtx.play()
        this.timeoutId = null
      }, gap)
    } else if (gap < -120) {
      this.vCtx.currentTime = this.vCtx.currentTime + Math.abs(gap);
    }
  }

  destroy () {
    this.start = null
    this.aCtx = null
    this.vCtx = null
  }
}

// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();
    this._canvas = document.createElement('canvas')
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this)
    this.init(config)
    this.played = false;
    this._paused = true;
  }

  init (config) {
    this.vCtx = new VideoCtx({
      canvas: this._canvas
    });
    this.aCtx = new AudioCtx(config);
    this.ticker = new (getTicker())()
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx,
      video: this
    })
    this.vCtx.oncanplay = () => {
      if (!this.played) {
        this.appendChild(this._canvas);
      }
      this.dispatchEvent(new Event('canplay'));
    }

    this.ticker.start(() => {
      if (!this.start) {
        this.start = Date.now()
      }
      this._currentTime = Date.now() - this.start
      this.vCtx._onTimer(this._currentTime)
    })

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
  }

  handleAudioSourceEnd () {
    this.reconciler.doReconcile()
    this.vCtx.cleanBuffer();
  }

  _cleanBuffer () {
    this.vCtx.cleanBuffer()
  }

  destroy () {
    this.aCtx.destroy()
    this.vCtx.destroy()
    this.ticker.stop()
    this.start = null;
    this.reconciler.destroy()
    this.aCtx = null;
    this.vCtx = null;
    this.ticker = null;
  }

  onDemuxComplete (videoTrack, audioTrack) {
    this.aCtx.decodeAudio(audioTrack);
    this.vCtx.decodeVideo(videoTrack);
  }

  setAudioMeta (meta) {
    this.aCtx.setAudioMetaData(meta);
  }

  setVideoMeta (meta) {
    this.vCtx.setVideoMetaData(meta);
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

  set src (val) {
    // do nothing
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
    return this._paused
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

    this.dispatchEvent(new Event('ratechange'))
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
    if (this.played) {
      this.destroy()
      this.init()
    }

    this.vCtx.play().then(() => {
      this.played = true;
      this.dispatchEvent(new Event('play'))
      this._paused = false
    })
    this.aCtx.play()
  }

  pause () {
    this._paused = true;
    this.aCtx.pause()
    this.vCtx.pause()

    this.dispatchEvent(new Event('pause'))
  }

  get volume () {
    return this.aCtx.volume
  }

  set volume (vol) {
    this.setAttribute('volume', vol);
    this.aCtx.volume = vol
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
    this.setAttribute('muted', val);
    if (!val) {
      this.aCtx.muted = false
    } else {
      this.aCtx.muted = true
    }
  }

  get error () {
    return this.vCtx.error;
  }

  get buffered () {
    return this.vCtx.buffered
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);
