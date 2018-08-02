import Player from 'xgplayer'
import VodTask from './tasks/VodTask'
import Flv from './Flv'

class FlvPlayer extends Player {
  constructor (options) {
    super(options)
    this._options = options
    this.__flv__ = null
    this.init(options)
    Object.defineProperty(this, 'src', {
      set: (val) => {
        if (typeof val === 'string' && val.startsWith('blob:')) {
          return
        }
        this._options.url = val
        this.__flv__.destroy()
        this.__flv__ = new Flv(this._options, this)
        this.__flv__.load()
        this.video.src = this.__flv__.mse.url
        this.currentTime = 0
        setTimeout(() => {
          this.play()
        }, 0)
      },
      get: () => {
        return this._options.url
      }
    })
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
    this.once('destroy', () => {
      VodTask.clear()
      player.__flv__.destroy()
      player.__flv__ = null
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
