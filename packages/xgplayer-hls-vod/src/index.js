import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import { debounce } from 'xgplayer-utils';
import HlsVodController from './hls-vod';

const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;

class HlsVodPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOps = {};
    this.util = Player.util;
    this.util.deepCopy(this.hlsOps, options);
    this._context = new Context(HlsAllowedEvents);
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime.bind(this), 200)
    this.onWaiting = this.onWaiting.bind(this)
    this.started = false;
  }

  get currentTime () {
    return super.currentTime;
  }

  set currentTime (time) {
    this._handleSetCurrentTime(time);
  }

  _handleSetCurrentTime (time) {
    time = parseFloat(time);
    super.currentTime = parseInt(time);
    if (this._context) {
      this.__core__.seek(time);
    }
  }
  play () {
    return this.video.play().catch((e) => {
      if (e && e.code === 20) { // fix: chrome The play() request was interrupted by a new load request.
        this.once('canplay', () => {
          this.video.play()
        })
      }
    })
  }

  _initEvents () {
    this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      const mse = this._context.getInstance('MSE');
      super.start(mse.url);
    });

    this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
      this.emit('error', new Player.Errors('network', this.config.url))
    })

    this.once('canplay', () => {
      if (this.config.autoplay) {
        this.play()
      }
    });

  }

  onWaiting () {
    const _self = this;
    super.onWaiting();
    let retryTime = 10
    let timer = setInterval(() => {
      if (Player.util.hasClass(_self.root, 'xgplayer-isloading')) {
        const { gap, start, method } = this.detectBufferGap()
        if (gap) {
          this.currentTime = Math[method](start);
        }
      }
      if (retryTime-- <= 0) {
        clearInterval(timer)
      }
    }, 500)
  }

  _initSrcChangeHandler () {
    let _this = this;
    Object.defineProperty(this, 'src', {
      get () {
        return _this.currentSrc
      },
      set (url) {
        _this.config.url = url
        if (!_this.paused) {
          _this.pause()
          _this.once('pause', () => {
            _this.start(url)
          })
          _this.once('canplay', () => {
            _this.play()
          })
        } else {
          _this.start(url)
        }
        _this.once('canplay', () => {
          _this.currentTime = 0
        })
      },
      configurable: true
    })
  }

  start (url = this.config.url) {
    if (!url || this.started) {
      return;
    }

    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsVodController)({player: this, container: this.video});
    this._context.init();
    this.__core__.load(url);
    this._initEvents();
    this._initSrcChangeHandler();

    this.started = true;
  }

  destroy () {
    this._context.destroy();
    super.destroy();
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
      if (startGap > 0.1 && startGap <= 2) {
        result = {
          gap: true,
          start: bufferStart,
          method: 'ceil'
        };
      }
    }

    return result;
  }
}

export default HlsVodPlayer;
