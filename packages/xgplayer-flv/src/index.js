import Player from 'xgplayer'
import VodTask from './tasks/VodTask'
import Flv from './Flv'

class FlvPlayer extends Player {
  constructor (options) {
    super(options)
    this._options = options
    this.__flv__ = null
    this.init(options)
  }
  init (options) {
    const player = this
    const { isLive } = options
    player.__flv__ = new Flv(options, player)
    player.once('complete', () => {
      player.createInstance(player.__flv__)
    })
    player.on('pause', () => {
      !isLive && VodTask.clear()
    })
  }

  createInstance (flv) {
    const player = this
    if (this._options.isLive) {
      player.util.addClass(player.root, 'xgplayer-is-live')
      const live = player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
      player.controls.appendChild(live)
    }
    flv.load()
  }

  start () {
    const { __flv__ } = this
    super.start(__flv__.mse.url)
    this.src = __flv__.mse.url
    return true
  }
}

module.exports = FlvPlayer
