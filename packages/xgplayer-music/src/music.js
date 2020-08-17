import { Util, SimplePlayer } from 'xgplayer'
import Lyric from './lyric'
import Analyze from './analyze'
import Xhr from './xhr'
import MusicPreset from './preset'
let mode
let timeScale = 15

class Music extends SimplePlayer {
  constructor (options) {
    const opts = Util.deepCopy({
      controls: true,
      mediaType: 'audio',
      ignores: []
    }, options)
    if (!opts.volumeShow) {
      opts.ignores.push('volume')
    }
    opts.presets = [MusicPreset]
    super(opts)
    const player = this

    this.rawConfig = options
    this.list = Util.typeOf(opts.url) === 'Array'
      ? opts.url
      : [{
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

    Util.addClass(this.root, 'xgplayer-music')
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
        const cur = Util.typeOf(v) === 'String' ? { src: v, name: '' } : v
        this.history.push(cur)
        this.video.src = cur.src
      },
      configurable: true
    })
    if (this.config.autoplayMuted) {
      this.config.volume = this.config.autoplay ? 0 : this.config.volume
    }
    this.once('ready', () => {
      if (this.config.lang && this.config.lang === 'en') {
        Util.addClass(this.root, 'lang-is-en')
      } else if (this.config.lang === 'jp') {
        Util.addClass(this.root, 'lang-is-jp')
      }
    })
    this.once('canplay', function () {
      if (this.config.autoplay && this.config.autoplayMuted) {
        this.volume = 0
      } else {
        this.volume = this.config.volume
      }
    })
    this.on('timeupdate', () => {
      if (!this.halfPass && this.currentTime > this.duration / 2) {
        this.confirmOrder()
      }
    })
    this.on('ended', () => {
      if (this.mode === 'order' && this.index + 1 >= this.list.length) {
        this.pause()
        this.currentTime = 0
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
    if (Util.typeOf(lyricTxts) !== 'Array') {
      lyricTxts = [].concat(lyricTxts)
    }
    this.__lyric__ = new Lyric(lyricTxts, Dom)
    this.__lyric__.bind(this)
    return this.__lyric__
  }

  confirmOrder () {
    const player = this
    this.halfPass = true
    this.nextComput()
    this.prevComput()
    if (this.config.preloadNext) {
      this.checkOffline(this.list[this.nextIndex].src, this.list[this.nextIndex].vid || this.list[this.nextIndex].name).then(url => {
        if (url.indexOf('blob:') < 0) {
          const offlineVid = player.list[player.nextIndex].vid || player.list[player.nextIndex].name
          const xhr = new Xhr(player.list[player.nextIndex].src, res => {
            player.database.openDB(() => {
              player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new window.Blob([res], { type: 'audio/mp4; codecs="mp4a.40.5"' }) }])
              setTimeout(() => {
                player.database.closeDB()
              }, 5000)
            })
          })
          console.log('xhr', xhr)
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
          this.prevIndev = this.index - 1
        } else {
          this.prevIndev = this.list.length - 1
        }
        break
      default:
        this.prevIndev = Math.ceil(Math.random() * this.list.length)
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

  change () {
    const self = this
    const offlineVid = self.list[self.index].vid || self.list[self.index].name
    this.halfPass = false
    this.checkOffline(self.list[self.index].src, offlineVid).then(url => {
      // if (Player.m4a) {
      if (SimplePlayer.m4a) {
        self.video.load()
        self.name = self.list[self.index].name
        self.vid = self.list[self.index].vid
        self.poster = self.list[self.index].poster
        self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster })
      } else {
        self.video.pause()
        self.currentTime = 0
        self.src = url
        self.name = self.list[self.index].name
        self.vid = self.list[self.index].vid
        self.poster = self.list[self.index].poster
        setTimeout(() => {
          self.video.play().then(() => {
            self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster })
          })
        }, 60)
      }
    })
  }

  checkOffline (url, offlineVid) {
    const self = this
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
