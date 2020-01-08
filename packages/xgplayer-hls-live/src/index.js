import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
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
    this.started = false;
  }

  _initEvents () {
    this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      const mse = this._context.getInstance('MSE');
      if (!this.started) {
        const live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        this.util.addClass(this.root, 'xgplayer-is-live');
        this.controls.appendChild(live);
      }
      this.started = true;
      super.start(mse.url);
    });

    this.once('canplay', () => {
      this.video.play()
    });
  }

  set src (url) {
    this._context.destroy();
    this._context = new Context(HlsAllowedEvents);
    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player:this, container: this.video, preloadTime: this.config.preloadTime});
    this._context.init();
    this._initEvents();
    this.__core__.load(url);
  }

  start (url = this.config.url) {
    if (!url || this.started) {
      return;
    }
    this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player:this, container: this.video, preloadTime: this.config.preloadTime});
    this._context.init();
    this.url = url;
    this.__core__.load(url);
    this._initEvents();
  }

  play () {
    if (this.started) {
      this._context.destroy();
      this._context = new Context(HlsAllowedEvents);
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player:this, container: this.video, preloadTime: this.config.preloadTime});
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
