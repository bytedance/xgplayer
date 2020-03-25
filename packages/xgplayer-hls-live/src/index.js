import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import HlsLiveController from './hls-live';
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

const { BasePlugin, Events } = Player

export default class HlsLivePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLive';
  }
  constructor (options) {
    super(options)
    this.played = false;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.destroy = this.destroy.bind(this);
    this.play = this.play.bind(this);
    this._context = new Context(HlsAllowedEvents);
  }

  beforePlayerInit () {
    const { url } = this.player.config
    this.hls = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player: this.player, preloadTime: this.player.config.preloadTime});
    this._context.init();
    this.hls.load(url);
    this._initEvents();
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        '__url': {
          get: () => {
            return this.hls.mse.url
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  _initEvents () {
    this.hls.once(REMUX_EVENTS.INIT_SEGMENT, () => {
      BasePlugin.Util.addClass(this.root, 'xgplayer-is-live');
    });

    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DESTROY, this.destroy)
    this.on(Events.PLAY, this.play)
  }

  handleUrlChange (url) {
    this.hls.mse.destroy().then(() => {
      this.player.config.url = url
      this._context.destroy();
      this._context = null;
      this.video.currentTime = 0;

      if (!this.paused) {
        this.pause()
        this.once('canplay', () => {
          this.play()
        })
      } else {
        this.play()
      }

      this.player.started = false;
      this.player.start()
    })
  }

  play () {
    if (this.played && this.player.played.length) {
      this.played = false;
      return this._destroy().then(() => {
        this._context = new Context(HlsAllowedEvents)
        this.player.hasStart = false;
        this.player.start()
        this.player.onWaiting();
        this.player.once('canplay', () => {
          this.player.play();
        })
      })
    }
    this.played = true
  }

  _destroy () {
    return this.hls.mse.destroy().then(() => {
      this._context.destroy()
      this.hls = null
      this._context = null
    })
  }

  destroy () {
    super._destroy();
    this._context.destroy();
  }
}
