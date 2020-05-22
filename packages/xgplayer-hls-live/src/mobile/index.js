import Player from 'xgplayer'
import Context from 'xgplayer-transmuxer-context';
import EVENTS from 'xgplayer-transmuxer-constant-events'
import HLS from './hls-live-mobile'
const hlsAllowedEvents = EVENTS.HlsAllowedEvents;
const { BasePlugin } = Player;

class HlsPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLiveMobile'
  }

  static get defaultConfig () {
    return {
      preloadTime: 4
    }
  }

  static isSupported () {
    const wasmSupported = 'WebAssembly' in window;
    const WebComponentSupported = 'customElements' in window && window.customElements.define;
    let isComponentDefined;
    if (WebComponentSupported) {
      isComponentDefined = window.customElements.get('mobile-video');
    }
    return wasmSupported && isComponentDefined
  }

  beforePlayerInit () {
    const { player } = this;
    if (player.video) {
      player.video.setAttribute('preloadtime', this.config.preloadTime)
    }
    this.context = new Context(hlsAllowedEvents)
    this.initHls()
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

  initHlsEvents (hls) {
    const { player } = this;

    hls.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
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

    const { player } = this;

    player.on('seeking', () => {
      const time = this.currentTime
      const range = player.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.hls.seek(this.currentTime)
      }
    })

    player.on('play', this.play)
  }

  initHls () {
    const { player, config } = this;
    const hls = this.context.registry('HLS_CONTROLLER', HLS)({player, preloadTime: config.preloadTime, retryTimes: config.retryTimes })
    this.initHlsEvents(hls)
    this.hls = hls
  }

  play () {
    if (this.hls) {
      this.hls._onMetadataParsed('video');
      this.hls._onMetadataParsed('audio');
    }
  }

  loadData () {
    const { player } = this;
    if (this.hls) {
      this.hls.load(player.config.url)
    }
  }
  destroy () {
    this._destroy()
  }

  addLiveFlag () {
    const { player } = this;
    Player.Util.addClass(player.root, 'xgplayer-is-live')
  }

  _destroy () {
    this.context.destroy()
    this.hls = null
    this.context = null
  }

  get src () {
    return this.player.currentSrc
  }

  set src (url) {
    this.switchURL(url)
  }

  switchURL (url) {
    const context = new Context(hlsAllowedEvents);
    const hls = context.registry('FLV_CONTROLLER', FLV)(this.player)
    context.init()
    this.this.hls = hls;
    this.initFlvBackupEvents(hls, context);
    hls.loadData(url);
  }
}

export default HlsPlayer
