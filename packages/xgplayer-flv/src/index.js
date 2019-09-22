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
      },
      configurable: true
    })
    if (options.autoplay) {
      this.start()
    }
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
      player.__flv__.mse = null
      player.video.src = ''
      player.__flv__ = null
    })
  }

  createInstance (flv) {
    const player = this
    if (this._options.isLive) {
      Player.util.addClass(player.root, 'xgplayer-is-live')
      const live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
      player.controls.appendChild(live)
    }
    flv.load()
  }

  start () {
    if (!this.inited) {
      return
    }
    const flvPlayer = this.__flv__
    super.start(flvPlayer.mse.url)
    this.src = flvPlayer.mse.url
    return true
  }

  get inited () {
    return this.__flv__ !== undefined
  }
}

module.exports = FlvPlayer
