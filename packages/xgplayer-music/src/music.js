import Player from 'xgplayer'
import Lyric from './lyric'
import Analyze from './analyze'
import Xhr from './xhr'
import Backward from './controls/backward.js'
import Cover from './controls/cover.js'
import Forward from './controls/forward.js'
import Meta from './controls/meta.js'
import Next from './controls/next.js'
import Prev from './controls/prev.js'
import Database from './database'

let mode
let timeScale = 15

const util = Player.util

class Music extends Player {
  constructor (options) {
    let opts = util.deepCopy({
      controls: true,
      mediaType: 'audio',
      ignores: ['fullscreen', 'start', 'definition', 'makeBullet', 'textTrack', 'loading', 'pc', 'mobile', 'playbackRate', 'replay', 'error', 'poster']
    }, options)
    if (!opts.volumeShow) {
      opts.ignores.push('volume')
    }
    super(opts)
    let player = this
    player.database = new Database()

    if(player.config.ignores.indexOf('backward') < 0) {
      new Backward(player)
    }
    if(player.config.ignores.indexOf('cover') < 0) {
      new Cover(player)
    }
    if(player.config.ignores.indexOf('forward') < 0) {
      new Forward(player)
    }
    if(player.config.ignores.indexOf('meta') < 0) {
      new Meta(player)
    }
    if(player.config.ignores.indexOf('next') < 0) {
      new Next(player)
    }
    if(player.config.ignores.indexOf('prev') < 0) {
      new Prev(player)
    }

    this.rawConfig = options
    this.list = util.typeOf(opts.url) === 'Array' ? opts.url : [{
      src: opts.url,
      name: opts.name,
      vid: opts.vid,
      poster: opts.poster
    }]
    this.name = this.list[0].name
    this.vid = this.list[0].vid
    this.poster = this.list[0].poster
    this.nextIndex = 1
    this.prevIndex = this.list.length - 1
    this.halfPass = false
    this.history = []
    this.index = 0
    if (!opts.controls) {
      this.root.style.display = 'none'
      return
    }

    util.addClass(this.root, 'xgplayer-music')
    if (!opts.width) {
      this.config.width = '100%'
      this.root.style.width = '100%'
    }
    if (!opts.height) {
      this.config.height = '50px'
      this.root.style.height = '50px'
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
    if (this.config.autoplayMuted) {
      this.config.volume = this.config.autoplay ? 0 : this.config.volume
    }
    this.once('ready', () => {
      util.addClass(player.root, 'xgplayer-skin-default')
      if(this.config.lang && this.config.lang === 'en') {
        util.addClass(this.root, 'xgplayer-lang-is-en')
      } else if(this.config.lang === 'jp') {
        util.addClass(this.root, 'xgplayer-lang-is-jp')
      }
    })
    this.once('canplay', function () {
      if (this.config.autoplay && this.config.autoplayMuted) {
        this.volume = 0
      } else {
        this.volume = this.config.volume
      }
      if(this.config.abCycle) {
        if(typeof this.addProgressDot === 'function') {
          this.addProgressDot(this.config.abCycle.start || 0)
          this.addProgressDot(this.config.abCycle.end || this.duration)
        }
      }
    })
    this.on('timeupdate', () => {
      if (!this.halfPass && this.currentTime > this.duration / 2) {
        this.confirmOrder()
      }
      if(this.config.abCycle) {
        if(this.currentTime >= (this.config.abCycle.end || this.duration)) {
          if(!this.config.abCycle.loop) {
            this.pause()
            this.emit('abCycle ended')
          }
          this.currentTime = this.config.abCycle.start || 0
        } else if(this.currentTime < (this.config.abCycle.start || 0)) {
          this.currentTime = this.config.abCycle.start || 0
        }
      }
    })
    this.on('ended', () => {
      if(this.config.abCycle) {
        if(this.config.abCycle.loop) {
          this.change()
        }
        return
      }
      if (this.mode === 'order' && this.index + 1 >= this.list.length) {
        if(!this.config.musicOrderEnd) {
          this.once('playing', () => {
            this.pause()
          })
          this.currentTime = 0
        }
        return
      }
      switch (this.mode) {
        case 'sloop':
          this.change()
          break
        case 'order':
        case 'loop':
        default:
          this.next()
          break
      }
    })
    if (!this.config.segPlay) {
      this.checkOffline(player.list[0].src, player.list[0].vid || player.list[0].name).then(url => {
        player.config.url = url
        player.start(url)
      })
    }
  }
  lyric (lyricTxts, Dom) {
    if (this.__lyric__) {
      this.__lyric__.unbind(this)
    }
    if (Player.util.typeOf(lyricTxts) !== 'Array') {
      lyricTxts = [].concat(lyricTxts)
    }
    this.__lyric__ = new Lyric(lyricTxts, Dom, this.config.lyricOpts || {})
    this.__lyric__.bind(this)
    return this.__lyric__
  }
  confirmOrder () {
    let player = this
    this.halfPass = true
    this.nextComput()
    this.prevComput()
    if (this.config.preloadNext) {
      this.checkOffline(this.list[this.nextIndex].src, this.list[this.nextIndex].vid || this.list[this.nextIndex].name).then(url => {
        if (url.indexOf('blob:') < 0) {
          let offlineVid = player.list[player.nextIndex].vid || player.list[player.nextIndex].name
          let xhr = new Xhr(player.list[player.nextIndex].src, res => {
            player.database.openDB(() => {
              player.database.addData(player.database.myDB.ojstore.name, [{vid: offlineVid, blob: new Blob([res], {type: 'audio/mp4; codecs="mp4a.40.5"'})}])
              setTimeout(() => {
                player.database.closeDB()
              }, 5000)
            })
          })
        }
      })
    }
  }

  get mode () {
    return mode || Music.ModeType[2]
  }
  set mode (idx) {
    switch (idx) {
      case 0:
      case 1:
      case 2:
      case 3:
        mode = Music.ModeType[idx]
    }
    this.confirmOrder()
  }

  nextComput () {
    switch (this.mode) {
      case 'sloop':
      case 'order':
      case 'loop':
        if (this.index + 1 < this.list.length) {
          this.nextIndex = this.index + 1
        } else {
          this.nextIndex = 0
        }
        break
      default:
        this.nextIndex = Math.ceil(Math.random() * this.list.length)
        break
    }
  }
  prevComput () {
    switch (this.mode) {
      case 'sloop':
      case 'order':
      case 'loop':
        if (this.index - 1 >= 0) {
          this.prevIndex = this.index - 1
        } else {
          this.prevIndex = this.list.length - 1
        }
        break
      default:
        this.prevIndex = Math.ceil(Math.random() * this.list.length)
        break
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
      name: meta.name,
      vid: meta.vid,
      poster: meta.poster
    })
  }
  remove (url) {
    let idx = -1
    this.list.every((item, index) => {
      if (item.src === url || item.name === url || item.vid === url) {
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
  updateList (list = []) {
    this.removeAbCycle()
    this.pause()
    this.currentTime = 0
    this.list = list
    this.nextIndex = 0
    this.index = 0
    this.change()
  }
  change () {
    let self = this
    let offlineVid = self.list[self.index].vid || self.list[self.index].name
    this.halfPass = false
    this.checkOffline(self.list[self.index].src, offlineVid).then(url => {
      if (Player.m4a) {
        self.video.load()
        self.name = self.list[self.index].name
        self.vid = self.list[self.index].vid
        self.poster = self.list[self.index].poster
        self.emit('change', {src: url, name: self.name, vid: self.vid, poster: self.poster})
      } else {
        self.video.pause()
        if(this.config.switchKeepProgress && !this.ended) {
          let currentTime = self.currentTime
          this.once('playing', () => {
            self.currentTime = currentTime
          })
        } else {
          self.currentTime = 0
        }
        self.src = url
        self.name = self.list[self.index].name
        self.vid = self.list[self.index].vid
        self.poster = self.list[self.index].poster
        setTimeout(() => {
          self.video.play().then(() => {
            self.emit('change', {src: url, name: self.name, vid: self.vid, poster: self.poster})
          })
        }, 60)
      }
    })
  }
  checkOffline (url, offlineVid) {
    let self = this
    return new Promise((resolve) => {
      if (!self.config.offline) {
        resolve(url)
      }
      self.database.openDB(() => {
        self.database.getDataByKey(self.database.myDB.ojstore.name, offlineVid, result => {
          setTimeout(() => {
            self.database.closeDB()
          }, 5000)
          if (result) {
            resolve(URL.createObjectURL(result.blob))
          } else {
            resolve(url)
          }
        })
      })
    })
  }
  next () {
    if (!this.halfPass) {
      this.halfPass = true
      this.nextComput()
    }
    this.index = this.nextIndex
    this.change()
  }
  prev () {
    if (!this.halfPass) {
      this.halfPass = true
      this.prevComput()
    }
    this.index = this.prevIndex
    this.change()
  }
  setIndex (index = 0) {
    this.nextIndex = index
    this.index = index
    this.change()
  }
  forward () {
    // console.log(`music go forward ${timeScale}s`)
    this.currentTime = this.currentTime + timeScale < this.duration ? this.currentTime + timeScale : this.duration - 0.1
  }
  backward () {
    // console.log(`music go backward ${timeScale}s`)
    this.currentTime = this.currentTime - timeScale > 0 ? this.currentTime - timeScale : 0
  }
  analyze (canvas) {
    return new Analyze(this, canvas)
  }
  setAbCycle(start, end, loop) {
    this.config.abCycle = {
      start: start || 0,
      end: end || this.duration,
      loop
    }
    if(typeof this.removeAllProgressDot === 'function') {
      this.removeAllProgressDot()
    }
    if(typeof this.addProgressDot === 'function') {
      this.addProgressDot(this.config.abCycle.start)
      this.addProgressDot(this.config.abCycle.end)
    }
  }
  removeAbCycle() {
    this.config.abCycle = null
    if(typeof this.removeAllProgressDot === 'function') {
      this.removeAllProgressDot()
    }
  }
  static get AudioCtx () {
    return window.AudioContext || window.webkitAudioContext
  }
  static get ModeType () {
    return ['order', 'random', 'loop', 'sloop']
  }
}

export default Music
export {
  Lyric,
  Analyze
}
