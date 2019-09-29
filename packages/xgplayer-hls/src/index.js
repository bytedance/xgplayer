import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import HlsLiveController from '../../xgplayer-hls-live/src/hls-live';
import HlsVodController from '../../xgplayer-hls-vod/src/hls-vod';
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

export class HlsPlayer extends Player {
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
      if (this.config.isLive) {
        const live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        this.util.addClass(this.root, 'xgplayer-is-live');
        this.controls.appendChild(live);
      }
      const mse = this._context.getInstance('MSE');
      super.start(mse.url);
    });

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
    if (this.config.isLive === true) {
      this.__core__ = this._context.registry('HLS_CONTROLLER', HlsLiveController)({container: this.video});
    } else {
      this.__core__ = this._context.registry('HLS_CONTROLLER', HlsVodController)({container: this.video});
    }

    this._context.init();
    this.__core__.load(url);
    this._initEvents();
    this._initSrcChangeHandler();
  }
}
module.exports = HlsPlayer;
