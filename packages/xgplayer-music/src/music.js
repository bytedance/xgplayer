import Player from 'xgplayer'
import Lyric from './lyric'
import Analyze from './analyze'
let mode
let timeScale = 15

const util = Player.util

class Music extends Player {
  constructor (options) {
    let opts = util.deepCopy({
      controls: true,
      mediaType: 'audio',
      ignores: ['fullscreen', 'start', 'definition', 'makeBullet', 'textTrack', 'loading', 'pc', 'mobile', 'playbackRate', 'replay', 'volume', 'error', 'poster']
    }, options)
    super(opts)
    this.rawConfig = options
    this.list = util.typeOf(opts.url) === 'Array' ? opts.url : [{
      src: opts.url,
      name: opts.name
    }]
    this.name = this.list[0].name
    this.history = []
    this.index = 0
    util.addClass(this.root, 'xgplayer-music')
    if (!opts.controls) {
      this.root.style.display = 'none'
      return
    }
    util.addClass(this.root, 'xgplayer-music-default')
    if (!opts.theme || opts.theme === 'default') {
      if (!opts.width) {
        this.config.width = '100%'
        this.root.style.width = '100%'
      }
      if (!opts.height) {
        this.config.height = '50px'
        this.root.style.height = '50px'
      }
    }
    Object.defineProperty(this, 'src', {
      get () {
        return this.video.currentSrc
      },
      set (v) {
        let cur = util.typeOf(v) === 'String' ? {src: v, name: ''} : v
        this.history.push(cur)
        this.video.src = cur.src
      },
      configurable: true
    })
    this.once('canplay', () => {
      if (opts.autoplay) {
        this.volume = 0
      } else {
        this.volume = opts.volume
      }
    })
    this.on('ended', () => {
      if (this.mode === 'order' && this.index + 1 >= this.list.length) {
        return
      }
      switch (this.mode) {
        case 'order':
        case 'loop':
        default:
          this.next()
          break
      }
    })
    this.start()
  }
  lyric (lyricTxts, Dom) {
    if (this.__lyric__) {
      this.__lyric__.unbind(this)
    }
    if (Player.util.typeOf(lyricTxts) !== 'Array') {
      lyricTxts = [].concat(lyricTxts)
    }
    this.__lyric__ = new Lyric(lyricTxts, Dom)
    this.__lyric__.bind(this)
    return this.__lyric__
  }

  get mode () {
    return mode || Music.ModeType[0]
  }
  set mode (idx) {
    switch (idx) {
      case 0:
      case 1:
      case 2:
        mode = Music.ModeType[idx]
    }
  }

  get timeScale () {
    return timeScale || 15
  }
  set timeScale (scale) {
    timeScale = scale
  }

  add (meta) {
    this.list.push({
      src: meta.src,
      name: meta.name
    })
  }
  remove (url) {
    let idx = -1
    this.list.every((item, index) => {
      if (item.src === url || item.name === url) {
        idx = index
        return false
      } else {
        return true
      }
    })
    if (idx > -1) {
      this.list.splice(idx, 1)
    }
  }
  random () {
    const len = this.list.length
    this.index = Math.ceil(Math.random() * len)
  }
  change () {
    if (Player.m4a) {
      this.video.load()
      this.name = this.list[this.index].name
      this.emit('change', this.list[this.index])
    } else {
      this.video.pause()
      this.currentTime = 0
      this.src = this.list[this.index].src
      this.name = this.list[this.index].name
      setTimeout(() => {
        this.video.play().then(() => {
          this.emit('change', this.list[this.index])
        })
      }, 60)
    }
  }
  next () {
    switch (this.mode) {
      case 'order':
      case 'loop':
        if (this.index + 1 < this.list.length) {
          this.index++
        } else {
          this.index = 0
        }
        break
      default:
        this.random()
        break
    }
    this.change()
  }
  prev () {
    switch (this.mode) {
      case 'order':
      case 'loop':
        if (this.index - 1 >= 0) {
          this.index--
        } else {
          this.index = this.list.length - 1
        }
        break
      default:
        this.random()
        break
    }
    this.change()
  }
  forward () {
    console.log(`music go forward ${timeScale}s`)
    this.currentTime = this.currentTime + timeScale < this.duration ? this.currentTime + timeScale : this.duration - 0.1
  }
  backward () {
    console.log(`music go backward ${timeScale}s`)
    this.currentTime = this.currentTime - timeScale > 0 ? this.currentTime - timeScale : 0
  }
  analyze (canvas) {
    return new Analyze(this, canvas)
  }
  static get AudioCtx () {
    return window.AudioContext || window.webkitAudioContext
  }
  static get ModeType () {
    return ['order', 'random', 'loop']
  }
}

export default Music
export {
  Lyric,
  Analyze
}
