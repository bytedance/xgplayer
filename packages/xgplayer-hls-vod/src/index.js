import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import HlsVodController from './hls-vod';
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;

export class HlsVodPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOps = {};
    this.util = Player.util;
    this.util.deepCopy(this.hlsOps, options);
    this._context = new Context(HlsAllowedEvents);
  }

  get currentTime () {
    return super.currentTime;
  }

  set currentTime (time) {
    time = parseFloat(time);
    super.currentTime = parseInt(time);
    if (this._context) {
      this.__core__.seek(time);
    }
  }

  _initEvents () {
    this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      const mse = this._context.getInstance('MSE');
      super.start(mse.url);
    });

    this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
      super.emit('error', new Player.Errors('network', this.config.url))
    })

    this.once('canplay', () => {
      this.play()
    });
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
    if (!url) {
      return;
    }
    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsVodController)({container: this.video});
    this._context.init();
    this.__core__.load(url);
    this._initEvents();
    this._initSrcChangeHandler();
  }

  destroy () {
    this._context.destroy();
    super.destroy();
  }
}
module.exports = HlsVodPlayer;
