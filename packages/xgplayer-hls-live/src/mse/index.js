import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-helper-utils'
import HlsLiveController from './hls-live';
import defaultConfig from './config'
const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

const { BasePlugin, Events } = Player

export default class HlsLivePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLive';
  }

  static get defaultConfig () {
    return {
      limitCache: true
    }
  }
  constructor (options) {
    super(options)
    this.played = false;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.destroy = this.destroy.bind(this);
    this.play = this.play.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
    this._context = new Context(HlsAllowedEvents);
  }

  beforePlayerInit () {
    const { url } = this.player.config
    const config = Object.assign({}, defaultConfig, this.config, {player: this.player, preloadTime: this.player.config.preloadTime, limitCache: this.config.limitCache})
    this.hls = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)(config);
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
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.on(Events.DESTROY, this.destroy)
    this.on(Events.PLAY, this.play)
  }

  handleUrlChange (url) {
    this.hls.mse.destroy().then(() => {
      this.player.config.url = url
      this._context.destroy();
      this._context = null;
      this.player.video.currentTime = 0;
      this.played = false;

      if (!this.player.paused) {
        this.player.pause()
        this.once('canplay', () => {
          this.player.play()
        })
      } else {
        this.player.play()
      }

      this.player.started = false;
      this.player.hasStart = false;
      this._context = new Context(HlsAllowedEvents);
      this.player.start()
    })
  }

  play () {
    if (this.played && this.player.played.length) {
      this.played = false;
      return this.reload();
    }
    this.played = true
  }

  reload () {
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

  handleDefinitionChange (change) {
    const { to } = change;
    this.handleUrlChange(to);
  }

  _destroy () {
    return this.hls.mse.destroy().then(() => {
      this._context.destroy()
      this.hls = null
      this._context = null
    })
  }

  destroy () {
    super.offAll();
    this._destroy();
  }
}
