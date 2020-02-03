import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-live'

const flvAllowedEvents = EVENTS.FlvAllowedEvents;
const { BasePlugin } = Player;

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLive'
  }
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    this.loaderCompleteTimer = null
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.destroy = this.destroy.bind(this)
    // const preloadTime = player.config.preloadTime || 15
    this.initEvents()
  }

  beforePlayerInit () {
    this.initFlv()
    this.context.init()
    this.loadData()
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        '__url': {
          get: () => {
            return this.flv.mse.url
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  initFlvEvents (flv) {
    const player = this;
    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      BasePlugin.Util.addClass(player.root, 'xgplayer-is-live')
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!player.paused) {
        this.loaderCompleteTimer = setInterval(() => {
          const end = player.getBufferedRange()[1]
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended')
            window.clearInterval(this.loaderCompleteTimer)
          }
        }, 200)
      } else {
        player.emit('ended')
      }
    })
  }

  initFlvBackupEvents (flv, ctx) {
    let mediaLength = 3;
    flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
      mediaLength -= 1;
      if (mediaLength === 0) {
        // ensure switch smoothly
        this.flv = flv;
        this.mse.resetContext(ctx);
        this.context.destroy();
        this.context = ctx;
      }
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!this.paused) {
        this.loaderCompleteTimer = setInterval(() => {
          const end = this.getBufferedRange()[1]
          if (Math.abs(this.player.currentTime - end) < 0.5) {
            this.emit('ended')
            window.clearInterval(this.loaderCompleteTimer)
          }
        }, 200)
      } else {
        this.emit('ended')
      }
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      ctx.destroy()
    })
  }

  initEvents () {
    this.on('seeking', () => {
      const time = this.player.currentTime
      const range = this.player.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.player.currentTime)
      }
    })

    this.on('play', this.play)
    this.on('pause', this.pause)
    this.on('destroy', this.destroy)
  }

  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this.player)
    this.initFlvEvents(flv)
    this.flv = flv
    this.mse = flv.mse;
    return flv;
  }

  play () {
    if (this.player.played.length) {
      return this._destroy().then(() => {
        this.context = new Context(flvAllowedEvents)
        this.player.hasStart = false;
        this.player.start()
      })
    }
  }

  pause () {
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.player.currentTime) {
    if (this.flv) {
      this.flv.seek(time)
    }
  }

  destroy () {
    return this._destroy()
  }

  _destroy () {
    return this.flv.mse.destroy().then(() => {
      this.context.destroy()
      this.flv = null
      this.context = null
      if (this.loaderCompleteTimer) {
        window.clearInterval(this.loaderCompleteTimer)
      }
    })
  }

  get src () {
    return this.currentSrc
  }

  set src (url) {
    this.switchURL(url)
  }

  switchURL (url) {
    const context = new Context(flvAllowedEvents);
    const flv = context.registry('FLV_CONTROLLER', FLV)(this, this.mse)
    context.init()
    this.initFlvBackupEvents(flv, context);
    flv.loadData(url);
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }
}

export default FlvPlayer
