import VideoCtx from './video-context';
import AudioCtx from './audio-context';
// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor (config) {
    super();
    this.vCtx = new VideoCtx();
    this.aCtx = new AudioCtx();
  }
}

export default MobileVideo;
