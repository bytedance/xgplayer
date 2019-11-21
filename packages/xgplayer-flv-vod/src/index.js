import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './flv-vod'
console.log(Context)

const flvAllowedEvents = EVENTS.FlvAllowedEvents;

const isEnded = (player, flv) => {
  if (!player.config.isLive) {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        player.emit('ended')
        flv.mse.endOfStream()
      }
    }
  }
}

class FlvVodPlayer extends Player {
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    this.initEvents()
    // const preloadTime = player.config.preloadTime || 15
  }

  start () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
    this.flv = flv
    this.context.init()
    super.start(flv.mse.url)
  }

  initEvents () {
    this.on('timeupdate', this.handleTimeUpdate.bind(this))

    this.on('seeking', this.handleSeek.bind(this))

    this.once('destroy', this._destroy.bind(this))
  }

  handleTimeUpdate () {
    this.loadData()
    isEnded(this, this.flv)
  }

  handleSeek () {
    const time = this.currentTime
    const range = this.getBufferedRange()
    if (time > range[1] || time < range[0]) {
      this.flv.seek(this.currentTime)
    }
  }

  _destroy () {
    this.context.destroy()
    this.context = null
    this.flv = null
  }

  loadData (time = this.currentTime) {
    const range = this.getBufferedRange()
    if (range[1] - time < (this.config.preloadTime || 15) - 5) {
      this.flv.loadNext(range[1] + 1)
    }
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

export default FlvVodPlayer
