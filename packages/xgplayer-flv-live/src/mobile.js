import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './flv-live-mobile'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

class FlvPlayer extends Player {
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    // const preloadTime = player.config.preloadTime || 15
  }

  start () {
    this.initFlv()
    this.context.init()
    this.flv.seek(0);
    super.start(this.config.url)
  }



  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
    this.flv = flv
  }
/** 
  play () {
    if (this._hasStart) {
      this._destroy()
      this.context = new Context(flvAllowedEvents)
      const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
      this.initFlvEvents(flv)
      this.flv = flv
      this.context.init()
      super.start(flv.mse.url)
      super.play()
    } else {
      super.play()
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
*/
  destroy () {
    this._destroy()
    super.destroy();
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

module.exports = FlvPlayer
