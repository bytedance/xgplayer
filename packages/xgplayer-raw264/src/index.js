import Player from 'xgplayer';
import Context from 'xgplayer-transmuxer-context';
import Core from './raw-264';
import Events from 'xgplayer-transmuxer-constant-events';
import LoaderBuffer from 'xgplayer-transmuxer-buffer-xgbuffer';
import FetchLoader from 'xgplayer-transmuxer-loader-fetch';
import 'xgplayer-mobilevideo';

const asmSupported = () => {
  try {
    (function MyAsmModule () {
      'use asm';
    })();
    return true;
  } catch (err) {
    // will never show...
    return false;
  }
};

class Raw264Player extends Player {
  static isSupported () {
    const wasmSupported = 'WebAssembly' in window;

    const WebComponentSupported = 'customElements' in window && window.customElements.define;
    let isComponentDefined;
    if (WebComponentSupported) {
      isComponentDefined = window.customElements.get('mobile-video');
    }
    return (wasmSupported || asmSupported) && isComponentDefined;
  }

  constructor (props) {
    if (!props.mediaType) {
      props.mediaType = 'mobile-video';
      if (props.videoConfig) {
        props.videoConfig.preloadtime = props.preloadTime || 5;
      } else {
        props.videoConfig = {
          preloadtime: props.preloadTime || 5
        };
      }
    }
    super(props);
    this.video.setAttribute('noaudio', true);
    this.handleTimeupdate = this.handleTimeupdate.bind(this);
    this.hasPlayed = false;
    this.hasStart = false;
  }

  start () {
    if (this.hasStart) {
      return;
    } else {
      this.hasStart = true;
    }
    this.context = new Context(Events.HlsAllowedEvents);
    this.context.registry('LOADER_BUFFER', LoaderBuffer);
    this.core = this.context.registry('RAW_264_CONTROLLER', Core)({player: this, fps: this.config.fps});
    this.context.registry('FETCH_LOADER', FetchLoader);
    this.context.init();
    if (!this.config.isLive) {
      this.core.load(this.config.url);
    }

    super.start();
    this.video.preloadTime = this.config.preloadTime;
    this.video.addEventListener('timeupdate', this.handleTimeupdate, false);
  }

  replay () {
    this.video._cleanBuffer();
    this.currentTime = 0;
    this.start();
    this.play();
  }

  handleTimeupdate () {
    if (!this.config.isLive && this.currentTime >= this.duration) {
      this.video._cleanBuffer();
      this.pause();
      this.emit('ended');
    } else if (this.config.isLive && this.buffered.end(0) - this.currentTime > 0.1) {
      this.currentTime = this.buffered.end(0) - 0.1;
    }
  }

  destroy (isDelDom) {
    super.destroy(isDelDom);
    this.core.destroy();
    this.context.destroy();
    this.core = null;
    this.context = null;
  }

  pushBuffer (arr) {
    if (!this.hasStart) {
      return this.start();
    }
    if (this.buffer) {
      this.buffer.push(arr);
      this.core.handleDataLoaded();
    }
  }

  get buffer () {
    return this.context.getInstance('LOADER_BUFFER');
  }

  set currentTime (time) {
    const oldTime = super.currentTime;
    const buffered = this.getBufferedRange();
    if (buffered[0] <= time && buffered[1] >= time) {
      this.video.currentTime = time;
    } else {
      this.video.currentTime = oldTime;
    }
  }

  get currentTime () {
    return super.currentTime;
  }

  get duration () {
    if (this.core && this.core.duration) {
      return this.core.duration;
    }
    return this.video.duration;
  }
}

export default Raw264Player;
