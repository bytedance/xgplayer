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
    const vCurTime = (this.video.currentTime || 0) * 1000;
    const aCurTime = (this.aCtx.currentTime || 0) * 1000;

    const gap = vCurTime - aCurTime;
    if (this.timeoutId) {
      return;
    }
    if (gap > 200) { // audio delayed for more than 100ms
      console.log(gap)
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
    this.aCtx = null
    this.vCtx = null
  }
}

// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();
    let _this = this;
    this.vCtx = new VideoCtx();
    this.aCtx = new AudioCtx(config);
    this.ticker = new (getTicker())()
    this.historyTime = 0;
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx,
      video: this
    })
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this)
    this.init()
  }

  init () {
    this.vCtx.oncanplay = () => {
      this.appendChild(this.vCtx.canvas);
      // eslint-disable-next-line no-undef
      this.dispatchEvent(new Event('canplay'));
    }

    this.ticker.start(() => {
      //
      if (!this.start) {
        this.start = Date.now()
      }
      this._currentTime = Date.now() - this.start
      this.vCtx._onTimer(this._currentTime)
    })

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
  }

  handleAudioSourceEnd () {
    console.log(this.aCtx.currentTime)
    this.reconciler.doReconcile()
  }

  _cleanBuffer () {
    this.vCtx.cleanBuffer()
  }

  destroy () {
    this.reconciler.destroy()
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

  get currentTime () {
    return this._currentTime / 1000
  }

  play () {
    // if (!this.vCtx.)
    this.vCtx.play();
    this.aCtx.play();
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);
