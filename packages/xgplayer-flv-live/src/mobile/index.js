import Player from 'xgplayer'
import Context from 'xgplayer-transmuxer-context';
import EVENTS from 'xgplayer-transmuxer-constant-events'
import FLV from './flv-live-mobile'
import 'xgplayer-mobilevideo'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;
const { BasePlugin } = Player;

class FlvPlayer extends BasePlugin {
  constructor (config) {
    if (!config.mediaType) {
      config.mediaType = 'mobile-video'
    }
    super(config);
    if (!this.playerInited) {
      this.initPlayer(config)
    }
  }

  initPlayer () {
    this.video.width = Number.parseInt(this.config.width || 600)
    this.video.height = Number.parseInt(this.config.height || 337.5)
    this.video.style.outline = 'none';
    this.context = new Context(flvAllowedEvents)
    this.initEvents()
    this.playerInited = true;
  }
  start () {
    if (!this.playerInited) {
      this.initPlayer()
    }
    this.initFlv()
    this.context.init()
    this.flv.seek(0);
    super.start(this.config.url);
    this.play();
  }

  initFlvEvents (flv) {
    const player = this;

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!player.paused) {
        const timer = setInterval(() => {
          const end = player.getBufferedRange()[1]
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended')
            window.clearInterval(timer)
          }
        }, 200)
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
    if (this._hasStart && this.paused) {
      this._destroy()
      this.context = new Context(flvAllowedEvents)
      const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
      this.initFlvEvents(flv)
      this.flv = flv
      this.context.init()
      this.loadData()
      super.start()
      super.play()
    } else {
      super.play()
      this.addLiveFlag();
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
    this._destroy()
    super.destroy();
  }

  addLiveFlag () {
    const player = this;
    Player.util.addClass(player.root, 'xgplayer-is-live')
    if (!Player.util.findDom(this.root, 'xg-live')) {
      const live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
      player.controls.appendChild(live)
    }
  }

  _destroy () {
    this.context.destroy()
    this.flv = null
    this.context = null
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

export default FlvPlayer
