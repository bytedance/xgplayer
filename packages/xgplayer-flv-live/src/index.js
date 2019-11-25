import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './flv-live'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

class FlvPlayer extends Player {
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    this.initEvents()
    this.loaderCompleteTimer = null
    // const preloadTime = player.config.preloadTime || 15
  }

  start () {
    this.initFlv()
    this.context.init()
    super.start(this.flv.mse.url)
  }

  initFlvEvents (flv) {
    const player = this;
    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      Player.util.addClass(player.root, 'xgplayer-is-live')
      if (!Player.util.findDom(this.root, 'xg-live')) {
        const live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
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

  initEvents () {
    this.on('timeupdate', () => {
      this.loadData()
    })

    this.on('seeking', () => {
      const time = this.currentTime
      const range = this.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.currentTime)
      }
    })

  }

  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
    this.initFlvEvents(flv)
    this.flv = flv
  }

  play () {
    if (this._hasStart) {
      return this._destroy().then(() => {
        this.context = new Context(flvAllowedEvents)
        const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
        this.initFlvEvents(flv)
        this.flv = flv
        this.context.init()
        super.start(flv.mse.url)
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
    this.player.config.url = url
    if (!this.paused) {
      this.pause()
      this.once('pause', () => {
        this.start(url)
      })
      this.once('canplay', () => {
        this.play()
      })
    } else {
      this.start(url)
    }
    this.once('canplay', () => {
      this.currentTime = 0
    })
  }
}

module.exports = FlvPlayer
