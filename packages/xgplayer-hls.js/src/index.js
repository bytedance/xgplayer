import Player from 'xgplayer'
import Hls from 'hls.js'
import utils from './utils'

class HlsJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOpts = options.hlsOpts || {}
    let util = Player.util
    let player = this
    this.browser = utils.getBrowserVersion()
    if(player.config.useHls === undefined) {
      if ((Player.sniffer.device === 'mobile' && navigator.platform !== 'MacIntel' && navigator.platform !== 'Win32') || this.browser.indexOf('Safari') > -1) {
        return
      }
    } else if(!player.config.useHls) {
      return
    }

    let hls
    hls = new Hls(this.hlsOpts)
    this.hls = hls

    Object.defineProperty(player, 'src', {
      get () {
        return player.currentSrc
      },
      set (url) {
        util.removeClass(player.root, 'xgplayer-is-live')
        const liveDom = document.querySelector('.xgplayer-live')
        if (liveDom) {
          liveDom.parentNode.removeChild(liveDom)
        }
        // player.config.url = url
        const paused = player.paused
        player.hls.stopLoad()
        player.hls.detachMedia()
        player.hls.destroy()
        player.hls = new Hls(player.hlsOpts)
        player.register(url)
        if (!paused) {
          player.pause()
          player.once('pause', () => {
            player.hls.loadSource(url)
          })
          player.once('canplay', () => {
            player.play()
          })
        } else {
          player.hls.loadSource(url)
        }
        player.hls.attachMedia(player.video)
        player.once('canplay', () => {
          player.currentTime = 0
        })
      },
      configurable: true
    })
    this.register(this.config.url)
    this.once('complete', () => {
      hls.attachMedia(player.video)
      player.once('canplay', () => {
        player.play()
      })
      if(player.config.isLive) {
        Player.util.addClass(player.root, 'xgplayer-is-live')
        const live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
        player.controls.appendChild(live)
      }
    })
    this.once('destroy', () => {
      hls.stopLoad()
    })
  }
  register (url) {
    let hls = this.hls
    let util = Player.util
    let player = this
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url)
    })
    hls.on(Hls.Events.LEVEL_LOADED, (name, e) => {
      if (!hls.inited) {
        hls.inited = true
        if (e && e.details && e.details.live) {
          util.addClass(player.root, 'xgplayer-is-live')
          const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
          player.controls.appendChild(live)
        }
      }
    })
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError()
            break
          default:
            player.emit('error', data)
        }
      }
    })
  }
}

HlsJsPlayer.isSupported = Hls.isSupported

export default HlsJsPlayer
