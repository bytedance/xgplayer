import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import HlsLiveController from './hls-live';
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

const { BasePlugin, Events } = Player

export default class HlsLivePlayer extends BasePlugin {
  constructor (options) {
    super(options)
    this.played = false;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.destroy = this.destroy.bind(this);
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

    this.once('canplay', () => {
      if (this.player.config.autoplay) {
        this.player.play()
      }
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
    if (this.played) {
      this._context.destroy();
      this._context = new Context(HlsAllowedEvents);
      this.hls = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({player: this, container: this.video, preloadTime: this.config.preloadTime});
      this._context.init();
      this._initEvents();
      this.hls.load(this.player.config.url);
    }
    this.played = true;
  }

  destroy () {
    this._context.destroy();
  }
}
