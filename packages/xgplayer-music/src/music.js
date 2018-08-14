import Player from 'xgplayer'
import Lyric from './lyric'
import Analyze from './analyze'
let mode

const util = Player.util

class Music extends Player {
  constructor (options) {
    let util = Player.util
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
    if (opts.lyric) {
      this.__lyric__ = new Lyric(opts.lyric, opts.animateInterval)
      this.__lyric__.bind(this)
    }
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
    this.once('canplay', function () {
      if (opts.autoplay) {
        this.volume = 0
      } else {
        this.volume = opts.volume
      }
    })
    this.start()
  }
  set lyric (lyricTxt) {
    if (util.typeOf(lyricTxt) === 'Array') {
      if (this.__lyric__) {
        this.__lyric__.unbind(this)
      }
      this.__lyric__ = new Lyric(lyricTxt[0], lyricTxt[1])
      this.__lyric__.bind(this)
    } else if (util.typeOf(lyricTxt) === 'String') {
      if (this.__lyric__) {
        this.__lyric__.unbind(this)
      }
      this.__lyric__ = new Lyric(lyricTxt)
      this.__lyric__.bind(this)
    }
  }
  get lyric () {
    return this.__lyric__ ? this.__lyric__.rawTxt : ''
  }
  get lyricLine () {
    return this.__lyric__ ? this.__lyric__.line : -1
  }
  get lyricList () {
    return this.__lyric__ ? this.__lyric__.list : []
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
    let idx = this.list.findIndex(item => item.src === url || item.name === url)
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
