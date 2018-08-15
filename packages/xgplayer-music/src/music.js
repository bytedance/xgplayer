import Player from 'xgplayer'
import Lyric from './lyric'
import Analyze from './analyze'
let mode

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
    this.history = []
    this.index = 0
    util.addClass(this.root, 'xgplayer-music')
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
      if (this.ended) {
        this.currentTime = 0
      }
    })
    this.start()
  }
  lyric (lyricTxt, Dom) {
    if (this.__lyric__) {
      this.__lyric__.unbind(this)
    }
    this.__lyric__ = new Lyric(lyricTxt, Dom)
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
    return this.list[this.index]
  }
  next () {
    switch (this.mode) {
      case 'order':
      case 'loop':
        if (this.index + 1 < this.list.length) {
          this.index++
          this.emit('change', this.list[this.index])
          this.src = this.list[this.index].src
        }
        break
      default:
        const next = this.random()
        if (next) {
          this.emit('change', next)
          this.src = next.src
        }
        break
    }
  }
  prev () {
    switch (this.mode) {
      case 'order':
      case 'loop':
        if (this.index - 1 > -1 && this.list.length > 0) {
          this.index--
          this.emit('change', this.list[this.index])
          this.src = this.list[this.index].src
        }
        break
      default:
        const pre = this.random()
        if (pre) {
          this.emit('change', pre)
          this.src = pre.src
        }
        break
    }
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
