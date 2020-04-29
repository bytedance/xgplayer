import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import HlsLiveController from './hls-live-mobile';
// import 'xgplayer-mobilevideo'
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;

export default class HlsLivePlayer extends Player {
  static isSupported () {
    const wasmSupported = 'WebAssembly' in window;
    const WebComponentSupported = 'customElements' in window && window.customElements.define;
    let isComponentDefined = false;
    if (WebComponentSupported) {
      isComponentDefined = window.customElements.get('mobile-video');
    }
    return wasmSupported && isComponentDefined
  }

  constructor (options) {
    if (!options.mediaType) {
      options.mediaType = 'mobile-video'
    }
    super(options)
    this.hlsOps = {};
    this.util = Player.util;
    this.util.deepCopy(this.hlsOps, options);
    if (!this.playerInited) {
      this.initPlayer()
    }
    // this.started = false;
  }

  initPlayer () {
    this.video.width = Number.parseInt(this.hlsOps.width || 600)
    this.video.height = Number.parseInt(this.hlsOps.height || 337.5)
    this.video.style.outline = 'none';
    this.playerInited = true;
  }

  _initEvents () {
    this.once('canplay', () => {
      this.video.play()
    });
  }

  set src (url) {
    this.onWaiting = this.onWaiting.bind(this)
    this._context.destroy();
    this._context = null;
    this.started = false;
    this.video.currentTime = 0;

    this.start(url)
  }

  start (url = this.hlsOps.url) {
    if (!url || this.started) {
      return;
    }

    if (!this.playerInited) {
      this.initPlayer()
    }

    if (!this._context) {
      this._context = new Context(HlsAllowedEvents);
    }

    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player: this, container: this.video, preloadTime: this.config.preloadTime});
    this._context.init();
    this.url = url;
    this.__core__.load(url);
    super.start(url)
    this._initEvents();
    this.started = true;
  }

  play () {
    if (this.started) {
      this._context.destroy();
      this._context = new Context(HlsAllowedEvents);
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player: this, container: this.video, preloadTime: this.config.preloadTime});
      this._context.init();
      this._initEvents();
      this.__core__.load(this.url);
    }
    super.play();
  }

  destroy (isDelDOM = true) {
    return new Promise((resolve) => {
      super.destroy();
      let { video, root } = this;
      super.destroy(isDelDOM);
      if (video && video.remove) {
        video.remove()
      } else if (root) {
        root.removeChild(video);
      }
      if (video) {
        video.destroy()
      }
      setTimeout(() => {
        resolve()
      }, 50)
    })
  }

  static install (name, plugin) {
    return Player.install(name, plugin)
  }
}

HlsLivePlayer.install = Player.install.bind(Player)
