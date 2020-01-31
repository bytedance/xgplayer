import { BasePlugin } from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-live'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

class FlvPlayer extends BasePlugin {
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    this.initEvents()
    this.loaderCompleteTimer = null
    this.started = false
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    // const preloadTime = player.config.preloadTime || 15
  }

  beforeInit () {
    if (this.started) {
      return;
    }
    this.player.url = this.flv.mse.url
    this.initFlv()
    this.context.init()
    super.start()
    this.loadData()
    this.started = true
  }

  initFlvEvents (flv) {
    const player = this;
    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      BasePlugin.util.addClass(player.root, 'xgplayer-is-live')
      if (!BasePlugin.util.findDom(this.root, 'xg-live')) {
        const live = BasePlugin.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
        player.controls.appendChild(live)
      }
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
          if (Math.abs(this.currentTime - end) < 0.5) {
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
      const time = this.currentTime
      const range = this.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.currentTime)
      }
    })

    this.on('play', this.play)
    this.on('pause', this.pause)
  }

  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
    this.initFlvEvents(flv)
    this.flv = flv
    this.mse = flv.mse;
    return flv;
  }

  play () {
    if (this._hasStart) {
      return this._destroy().then(() => {
        this.context = new Context(flvAllowedEvents)
        this.start()
        return super.play()
      })
    } else {
      return super.play()
    }
  }

  pause () {
    super.pause()
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.currentTime) {
    if (this.flv) {
      this.flv.seek(time)
    }
  }

  destroy () {
    this._destroy().then(() => {
      super.destroy();
    })
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
