import VideoCtx from './video-context';
import AudioCtx from './audio-context';
// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();
    this.vCtx = new VideoCtx();
    this.aCtx = new AudioCtx(config);

    this.historyTime = 0;

  }

  destroy () {

  }

  _setAudioSamples (samples) {
    this.aCtx.setAudioData(samples);
  }

  _setAudioMeta (meta) {
    this.aCtx.setAudioMetaData(meta);
  }

  _setVideoSegment (segment) {

  }

  get currentTime () {

  }
}
customElements.define('mobile-video', MobileVideo);
