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
    this.autoPlayStarted = false;
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
          },
          configurable: true
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
    let canUse = this.player.useHooks && this.player.useHooks('play', this.playForHooks.bind(this))
    if (this.playerConfig.autoplay) {
      this.on(Events.AUTOPLAY_STARTED, () => {
        this.autoPlayStarted = true;
      })
    }
    if (!canUse) {
      this.on(Events.PLAY, this.play)
    }
  }

  _offEvents () {
    this.off(Events.URL_CHANGE, this.handleUrlChange)
    this.off(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.off(Events.DESTROY, this.destroy)
    this.off(Events.PLAY, this.play)
  }

  handleUrlChange (url) {
    let request;
    if (this.hls.mse) {
      request = this.hls.mse.destroy();
    } else {
      request = Promise.resolve();
    }
    request.then(() => {
      this.player.config.url = url
      this._offEvents();
      this._context.destroy();
      this._context = null;
      this.player.video.currentTime = 0;
      this.played = false;

      if (!this.player.paused) {
        this.player.pause()
        this.once('canplay', () => {
          this.player.video.play()
        })
      } else {
        this.player.video.play()
      }

      this.player.started = false;
      this.player.hasStart = false;
      this._context = new Context(HlsAllowedEvents);
      this.player.start()
    })
  }

  playForHooks () {
    if (this.playerConfig.autoplay && this.autoPlayStarted === false) {
      // autoplay not started
      return;
    }
    if (this.playerConfig.videoInit && this.player.played.length === 0) {
      return;
    }
    this._offEvents();
    return this.reload();
  }

  play () {
    if (this.played && this.player.played.length) {
      this.played = false;
      this._offEvents();
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
        this.player.video.play();
      })
    })
  }

  handleDefinitionChange (change) {
    const { to } = change;
    this.handleUrlChange(to);
  }

  _destroy () {
    if (!this.hls.mse || !this._context) return Promise.resolve()
    return this.hls.mse.destroy().then(() => {
      if (!this._context) return
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
