import Player from 'xgplayer'
import Context from 'xgplayer-transmuxer-context';
import EVENTS from 'xgplayer-transmuxer-constant-events'
import FLV from './flv-live-mobile'
import 'xgplayer-mobilevideo'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;
const { BasePlugin } = Player;

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLiveMobile'
  }

  static isSupported () {
    const wasmSupported = 'WebAssembly' in window;
    const WebComponentSupported = 'customElements' in window && window.customElements.define;
    return wasmSupported && WebComponentSupported;
  }

  beforePlayerInit () {
    this.context = new Context(flvAllowedEvents)
    this.initFlv()
    this.context.init()
    this.loadData()
    this.initEvents()
  }

  afterCreate () {
    const { video, config } = this.player;
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none';
  }

  initFlvEvents (flv) {
    const { player } = this;

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
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)

    const { player } = this;

    player.on('seeking', () => {
      const time = this.currentTime
      const range = this.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.currentTime)
      }
    })

    player.on('play', this.play)
    player.on('pause', this.pause)
  }

  initFlv () {
    const { player } = this;
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(player)
    this.initFlvEvents(flv)
    this.flv = flv
  }

  play () {
    const { player } = this;
    if (this.played && this.player.paused) {
      this._destroy()
      player.hasStart = false;
      player.start()
    } else {
      this.addLiveFlag();
    }
    this.played = true
  }

  pause () {
    const { player } = this;
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.player.currentTime) {
    const { player } = this;
    if (this.flv) {
      this.flv.seek(time)
    }
  }
  destroy () {
    this._destroy()
  }

  addLiveFlag () {
    const { player } = this;
    Player.util.addClass(player.root, 'xgplayer-is-live')
  }

  _destroy () {
    this.context.destroy()
    this.flv = null
    this.context = null
  }

  get src () {
    return this.player.currentSrc
  }

  set src (url) {
    this.switchURL(url)
  }

  switchURL (url) {
    const context = new Context(flvAllowedEvents);
    const flv = context.registry('FLV_CONTROLLER', FLV)(this.player)
    context.init()
    this.this.flv = flv;
    this.initFlvBackupEvents(flv, context);
    flv.loadData(url);
  }
}

export default FlvPlayer
