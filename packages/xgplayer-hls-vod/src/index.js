import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import { debounce } from 'xgplayer-utils';
import HlsVodController from './hls-vod';

const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const MSE_EVENTS = EVENTS.MSE_EVENTS;

class HlsVodPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOps = {};
    this.util = Player.util;
    this.util.deepCopy(this.hlsOps, options);
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime.bind(this), 200)
    this.onWaiting = this.onWaiting.bind(this)
    // this.started = false;
  }

  get currentTime () {
    return super.currentTime;
  }

  set currentTime (time) {
    this._handleSetCurrentTime(time);
  }

  get src () {
    return this.currentSrc;
  }

  set src (url) {
    this.currentTime = 0;
    this.__core__.destroy();
    this._context = new Context(HlsAllowedEvents);
    this.onWaiting = this.onWaiting.bind(this)
    this.started = false;
    this.start(url)
    if (!this.paused) {
      this.pause()
      this.once('canplay', () => {
        this.play()
      })
    } else {
      this.play()
    }
    // this.swithURL(url)
  }

  _handleSetCurrentTime (time) {
    time = parseFloat(time);
    super.currentTime = parseInt(time);
    if (this._context) {
      this.__core__.seek(time);
    }
  }
  play () {
    return super.play().catch((e) => {
      if (e && e.code === 20) { // fix: chrome The play() request was interrupted by a new load request.
        this.once('canplay', () => {
          this.video.play()
        })
      }
    })
  }

  __initEvents () {
    this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      const mse = this.__core__.mse;
      super.start(mse.url);
    });

    this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
      this.emit('error', new Player.Errors('network', this.config.url))
    })

    this.__core__.on(MSE_EVENTS.SOURCE_UPDATE_END, () => {
      this._onSourceUpdateEnd();
    })

    this.once('canplay', () => {
      if (this.config.autoplay) {
        this.play()
      }
    });
  }

  initHlsBackupEvents (hls, ctx) {
    hls.once(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
      this.__core__ = hls;
      this.__core__.mse.cleanBuffers().then(() => {
        this.__core__.mse.resetContext(ctx);
        this.__core__.mse.doAppend()
        this._context.destroy();
        this._context = ctx;
      })
    })

    hls.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      ctx.destroy()
    })
  }

  _onSourceUpdateEnd () {
    if (Player.util.hasClass(this.root, 'xgplayer-isloading')) {
      const { gap, start, method } = this.detectBufferGap()
      if (gap) {
        this.currentTime = Math[method](start);
      }
    }
  }

  start (url = this.config.url) {
    if (!url || this.started) {
      return;
    }
    if (!this._context) {
      this._context = new Context(HlsAllowedEvents);
    }

    this.__core__ = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)({player: this, container: this.video, preloadTime: this.config.preloadTime});
    this._context.init();
    this.__core__.load(url);
    this.__initEvents();

    this.started = true;
  }

  swithURL (url) {
    this.config.url = url;
    const context = new Context(HlsAllowedEvents);
    const hls = context.registry('HLS_VOD_CONTROLLER', HlsVodController)({
      player: this,
      container: this.video,
      mse: this.__core__.mse,
      preloadTime: this.config.preloadTime
    })
    context.init()
    this.initHlsBackupEvents(hls, context)
    hls.load(url);
  }

  destroy () {
    return new Promise((resolve) => {
      if (this.__core__.mse) {
        this.__core__.mse.destroy().then(() => {
          if (this._context) {
            this._context.destroy();
          }
          super.destroy();
          setTimeout(() => {
            resolve()
          }, 50)
        })
      } else {
        super.destroy();
        setTimeout(() => {
          resolve()
        }, 50)
      }
    })
  }

  detectBufferGap () {
    const { video } = this;
    let result = {
      gap: false,
      start: -1
    }
    for (let i = 0; i < video.buffered.length; i++) {
      const bufferStart = video.buffered.start(i)
      const startGap = bufferStart - this.currentTime;
      if (startGap > 0.1 && startGap <= 4) {
        result = {
          gap: true,
          start: bufferStart,
          method: 'ceil'
        };
      }
    }

    return result;
  }

  static install (name, plugin) {
    return Player.install(name, plugin)
  }
}

export default HlsVodPlayer;
