import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import HlsLiveController from './hls-live';
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

export default class HlsLivePlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOps = {};
    this.util = Player.util;
    this.util.deepCopy(this.hlsOps, options);
    this._context = new Context(HlsAllowedEvents);
    this._hasStarted = false;
  }

  _initEvents () {
    this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      const mse = this._context.getInstance('MSE');
      if (!this._hasStarted) {
        const live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        this.util.addClass(this.root, 'xgplayer-is-live');
        this.controls.appendChild(live);
      }
      this._hasStarted = true;
      super.start(mse.url);
    });

    this.once('canplay', () => {
      this.video.play()
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
    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player:this, container: this.video});
    this._context.init();
    this.url = url;
    this.__core__.load(url);
    this._initEvents();
    this._initSrcChangeHandler();
  }

  play () {
    if (this._hasStarted) {
      this._context.destroy();
      this._context = new Context(HlsAllowedEvents);
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({container: this.video});
      this._context.init();
      this._initEvents();
      this.__core__.load(this.url);
    }
    super.play();
  }

  destroy () {
    this._context.destroy();
    super.destroy();
  }
}
