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

  onDemuxComplete(videoTrack, audioTrack) {
    // this.aCtx.decodeAudio(audioTrack);
    this.vCtx.decodeVideo(videoTrack);
  }

  setAudioMeta (meta) {
    this.aCtx.setAudioMetaData(meta);
  }
  
  setVideoMeta (meta) {
    console.log(meta);
    this.vCtx.setVideoMetaData(meta);
  }

  get currentTime () {

  }

  play() {
    this.aCtx.play();
    this.vCtx.play();
  }
}
customElements.define('mobile-video', MobileVideo);
