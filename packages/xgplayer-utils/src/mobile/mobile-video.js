import VideoCtx from './video-context';
import AudioCtx from './audio-context';
// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();
    let _this = this;
    this.vCtx = new VideoCtx();
    this.aCtx = new AudioCtx(config);

    this.vCtx.oncanplay = function () {
      _this.appendChild(_this.vCtx.canvas);
      console.log('canplay', _this);
      // eslint-disable-next-line no-undef
      _this.dispatchEvent(new Event('canplay'));
    }
    this.historyTime = 0;
  }

  destroy () {

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

  }

  play () {
    this.aCtx.play();
    this.vCtx.play();
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);
