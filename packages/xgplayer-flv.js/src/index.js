import Player from 'xgplayer'
import Flv from './flv/flv'

class FlvJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.flvOpts = { type: 'flv' }
    Player.util.deepCopy(this.flvOpts, options)
    const player = this
    player.once('complete', () => {
      player.__flv__ = Flv.createPlayer(this.flvOpts)
      player.createInstance(player.__flv__)
    })
  }
  createInstance (flv) {
    const player = this
    const util = Player.util
    flv.attachMediaElement(player.video)
    flv.load()
    flv.play()
    if (this.flvOpts.isLive) {
      util.addClass(player.root, 'xgplayer-is-live')
      const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
      player.controls.appendChild(live)
    }
    flv.on(Flv.Events.ERROR, (e) => {
      player.emit('error', new Player.Errors('other', player.config.url))
    })

    player.once('destroy', () => {
      flv.destroy()
      player.__flv__ = null
    })
  }
  switchURL (url) {
    const player = this
    const flvPlayer = player.__flv__
    player.config.url = url
    if (!player.config.isLive) {
      flvPlayer.onDefinitionChange(url, player.config.retryTimes)
    } else {
      const tempFlvPlayer = Flv.createPlayer(player.flvOpts)
      flvPlayer.destroy()
      player.createInstance(tempFlvPlayer)
      player.__flv__ = tempFlvPlayer
    }
  }
}
FlvJsPlayer.isSupported = Flv.isSupported
export default FlvJsPlayer
