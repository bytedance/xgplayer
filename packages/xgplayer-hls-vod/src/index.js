import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import { debounce } from 'xgplayer-utils';
import HlsVodController from './hls-vod';

const { Events, BasePlugin } = Player;

const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const MSE_EVENTS = EVENTS.MSE_EVENTS;

class HlsVodPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsVod'
  }
  constructor (options) {
    super(options)
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime.bind(this), 200)
    this.destroy = this.destroy.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
  }


  beforePlayerInit () {
    if (!this._context) {
      this._context = new Context(HlsAllowedEvents)
    }
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)({player: this.player, preloadTime: this.player.config.preloadTime});
    this._context.init();
    this.hls.load(this.player.config.url);
    this.__initEvents();

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

  handleUrlChange (url) {
    this.hls.mse.destroy().then(() => {
      this.player.config.url = url
      this._context.destroy();
      this._context = null;
      this.player.started = false;
      this.video.currentTime = 0;

      if (!this.paused) {
        this.pause()
        this.once('canplay', () => {
          this.play()
        })
      } else {
        this.play()
      }
      this.player.start()
    })
  }

  handleDefinitionChange (change) {
    const { to } = change;
    this.handleUrlChange(to);
  }

  _handleSetCurrentTime () {
    const time = parseFloat(this.player.video.currentTime);
    if (this._context) {
      this.hls.seek(time);
    }
  }
  play () {
    return this.player.play().catch((e) => {
      if (e && e.code === 20) { // fix: chrome The play() request was interrupted by a new load request.
        this.player.once('canplay', () => {
          this.player.play()
        })
      }
    })
  }

  __initEvents () {
    this.hls.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
      this.emit('error', new Player.Errors('network', this.config.url))
    })

    this.hls.on(MSE_EVENTS.SOURCE_UPDATE_END, () => {
      this._onSourceUpdateEnd();
    })

    this.once('canplay', () => {
      if (this.config.autoplay) {
        this.play()
      }
    });

    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DESTROY, this.destroy)
  }

  initHlsBackupEvents (hls, ctx) {
    hls.once(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
      this.hls = hls;
      this.hls.mse.cleanBuffers().then(() => {
        this.hls.mse.resetContext(ctx);
        this.hls.mse.doAppend()
        this._context.destroy();
        this._context = ctx;
      })
    })

    hls.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      ctx.destroy()
    })
  }

  _onSourceUpdateEnd () {
    if (this.player.video.readyState === 1 || this.player.video.readyState === 2) {
      const { gap, start, method } = this.detectBufferGap()
      if (gap) {
        if (method === 'ceil' && this.player.currentTime < Math[method](start)) {
          this.player.currentTime = Math[method](start);
        } else if (method === 'floor' && this.player.currentTime > Math[method](start)) {
          this.player.currentTime = Math[method](start);
        }
      }
    }
  }

  swithURL (url) {
    this.config.url = url;
    const context = new Context(HlsAllowedEvents);
    const hls = context.registry('HLS_VOD_CONTROLLER', HlsVodController)({
      player: this,
      container: this.video,
      mse: this.hls.mse,
      preloadTime: this.config.preloadTime
    })
    context.init()
    this.initHlsBackupEvents(hls, context)
    hls.load(url);
  }

  destroy () {
    return new Promise((resolve) => {
      if (this.hls.mse) {
        this.hls.mse.destroy().then(() => {
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
    const { video } = this.player;
    let result = {
      gap: false,
      start: -1
    }
    for (let i = 0; i < video.buffered.length; i++) {
      const bufferStart = video.buffered.start(i)
      const bufferEnd = video.buffered.end(i)
      if (!video.played.length || (bufferStart <= this.currentTime && bufferEnd - this.currentTime >= 0.5)) {
        break;
      }
      const startGap = bufferStart - this.currentTime;
      const endGap = this.currentTime - bufferEnd;
      if (startGap > 0.01 && startGap <= 2) {
        result = {
          gap: true,
          start: bufferStart,
          method: 'ceil'
        };
        break;
      } else if (endGap > 0.1 && endGap <= 2) {
        result = {
          gap: true,
          start: bufferEnd,
          method: 'floor'
        };
      } else {
        result = {
          gap: false,
          start: -1
        }
      }
    }

    return result;
  }
}

export default HlsVodPlayer;
