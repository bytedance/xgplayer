import Player from 'xgplayer'
import Hls from 'hls.js'

class HlsJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOpts = options.hlsOpts || {}
    let util = Player.util
    let player = this
    let url = player.config.url
    let hls
    hls = new Hls(this.hlsOpts)
    this.hls = hls
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url)
    })
    hls.on(Hls.Events.LEVEL_LOADED, (name, e) => {
      if (!hls.inited) {
        hls.inited = true
        if (e && e.details && !e.details.type) {
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
    this.once('complete', () => {
      hls.attachMedia(player.video)
    })
    this.once('destroy', () => {
      hls.stopLoad()
    })
  }
}

HlsJsPlayer.isSupported = Hls.isSupported

export default HlsJsPlayer
