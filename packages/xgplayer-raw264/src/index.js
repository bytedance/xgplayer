import Player from 'xgplayer';
import Core from './raw-264';
import { Buffer as LoaderBuffer } from 'xgplayer-helper-models';
import { FetchLoader, Context, EVENTS as Events } from 'xgplayer-helper-utils';
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
    this.video.setAttribute('lowlatency', true);
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
    this.context = new Context(this, this.config, Events.HlsAllowedEvents);
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
    this.setVideoStyle();
  }

  setVideoStyle () {
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.video.style.position = '100%';
    this.once('canplay', () => {
      if (this.video.canvas) {
        if (this.config.stretch) {
          this.video.canvas.style.width = '100%';
          this.video.canvas.style.height = '100%';
        }
        if (this.config.quality) {
          this.video.canvas.width = Number.parseInt(this.video.canvas.width) * this.config.quality;
          this.video.canvas.height = Number.parseInt(this.video.canvas.height) * this.config.quality;
        }
      }
    })
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
