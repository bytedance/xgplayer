import Proxy from './proxy'
import util from './utils/util'
import Database from './utils/database'
import sniffer from './utils/sniffer'
import Errors from './error'
import {
  version
} from '../package.json'
class Player extends Proxy {
  constructor (options) {
    super(options)
    this.config = util.deepCopy({
      width: 600,
      height: 337.5,
      ignores: [],
      whitelist: [],
      lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
      inactive: 3000,
      volume: 0.6,
      controls: true,
      controlsList: ['nodownload']
    }, options)
    this.version = version
    this.userTimer = null
    this.waitTimer = null
    this.database = new Database()
    this.history = []
    this.isProgressMoving = false
    this.root = util.findDom(document, `#${this.config.id}`)
    this.controls = util.createDom('xg-controls', '', {
      unselectable: 'on',
      onselectstart: 'return false'
    }, 'xgplayer-controls')
    if (!this.root) {
      let el = this.config.el
      if (el && el.nodeType === 1) {
        this.root = el
      } else {
        this.emit('error', new Errors('use', this.config.vid, {
          line: 32,
          handle: 'Constructor',
          msg: 'container id can\'t be empty'
        }))
        return false
      }
    }
    this.rootBackup = util.copyDom(this.root)
    util.addClass(this.root, `xgplayer xgplayer-${sniffer.device} xgplayer-nostart ${this.config.controls ? '' : 'no-controls'}`)
    this.root.appendChild(this.controls)
    if (this.config.fluid) {
      this.root.style['max-width'] = '100%'
      this.root.style['width'] = '100%'
      this.root.style['height'] = '0'
      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`

      this.video.style['position'] = 'absolute'
      this.video.style['top'] = '0'
      this.video.style['left'] = '0'
    } else {
      this.root.style.width = `${this.config.width}px`
      this.root.style.height = `${this.config.height}px`
    }
    if (this.config.controlStyle && util.typeOf(this.config.controlStyle) === 'String') {
      let self = this
      fetch(self.config.controlStyle, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                self.config[prop] = obj[prop]
              }
            }
            self.pluginsCall()
          })
        }
      }).catch(function (err) {
        console.log('Fetch错误:' + err)
      })
    } else {
      this.pluginsCall()
    }
    this.ev.forEach((item) => {
      let evName = Object.keys(item)[0]
      let evFunc = this[item[evName]]
      if (evFunc) {
        this.on(evName, evFunc)
      }
    });

    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    let player = this
    this.root.addEventListener('mousemove', () => { player.onFocus() })

    setTimeout(() => {
      this.emit('ready')
    }, 0)
    if (options.autoplay) {
      this.start()
    }

    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      document.onkeydown = event => {
        var e = event || window.event
        if (e && e.keyCode === 37) { // 按 left
          player.onFocus()
          if (player.currentTime - 10 >= 0) {
            player.currentTime -= 10
          } else {
            player.currentTime = 0
          }
        } else if (e && e.keyCode === 38) { // 按 up
          if (player.volume + 0.1 <= 1) {
            player.volume += 0.1
          } else {
            player.volume = 1
          }
        } else if (e && e.keyCode === 39) { // 按 right
          player.onFocus()
          if (player.currentTime + 10 <= player.duration) {
            player.currentTime += 10
          } else {
            player.currentTime = player.duration - 1
          }
        } else if (e && e.keyCode === 40) { // 按 down
          if (player.volume - 0.1 >= 0) {
            player.volume -= 0.1
          } else {
            player.volume = 0
          }
        } else if (e && e.keyCode === 32) { // 按 spacebar
          if (player.paused) {
            player.play()
          } else {
            player.pause()
          }
        }
      }
    }
  }

  start (url = this.config.url) {
    let root = this.root
    let player = this
    function autoFunc () {
      player.video.play().then(() => {
        // 支持自动播放
      })
      player.video.removeEventListener('canplay', autoFunc)
    }
    if (util.typeOf(url) === 'String') {
      this.video.src = url
    } else {
      url.forEach(item => {
        this.video.appendChild(util.createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        }))
      })
    }
    if (player.config.autoplay) {
      this.video.addEventListener('canplay', autoFunc)
    }
    root.insertBefore(this.video, root.firstChild)
    player.userTimer = setTimeout(function () {
      player.emit('blur')
    }, player.config.inactive)
    setTimeout(() => {
      this.emit('complete')
    }, 1)
  }

  reload () {
    this.video.load()
    this.once('loadeddata', function () {
      this.play()
    })
  }

  destroy () {
    let parentNode = this.root.parentNode
    for (let k in this._interval) {
      clearInterval(this._interval[k])
      this._interval[k] = null
    }
    this.ev.forEach((item) => {
      let evName = Object.keys(item)[0]
      let evFunc = this[item[evName]]
      if (evFunc) {
        this.off(evName, evFunc)
      }
    });
    ['focus', 'blur'].forEach(item => {
      this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      document.onkeydown = undefined
    }
    if (!this.paused) {
      this.pause()
      this.once('pause', () => {
        this.emit('destroy')
        this.root.id = this.root.id + '_del'
        parentNode.insertBefore(this.rootBackup, this.root)
        parentNode.removeChild(this.root)
        for (let k in this) {
          if (k !== 'config') {
            delete this[k]
          }
        }
      })
    } else {
      this.emit('destroy')
      this.root.id = this.root.id + '_del'
      parentNode.insertBefore(this.rootBackup, this.root)
      parentNode.removeChild(this.root)
      for (let k in this) {
        if (k !== 'config') {
          delete this[k]
        }
      }
    }
  }

  replay () {
    let _replay = this._replay
    // ie9 bugfix
    util.removeClass(this.root, 'xgplayer-ended')
    if (_replay && _replay instanceof Function) {
      _replay()
    } else {
      this.currentTime = 0
      this.play()
    }
  }

  pluginsCall () {
    if (Player.plugins) {
      let ignores = this.config.ignores
      Object.keys(Player.plugins).forEach(name => {
        let descriptor = Player.plugins[name]
        if (!ignores.some(item => name === item)) {
          if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
            if (name === sniffer.device) {
              descriptor.call(this, this)
            }
          } else {
            descriptor.call(this, this)
          }
        }
      })
    }
  }

  onFocus () {
    let player = this
    util.removeClass(this.root, 'xgplayer-inactive')
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
    player.userTimer = setTimeout(function () {
      player.emit('blur')
    }, player.config.inactive)
  }

  onBlur () {
    if (!this.paused && !this.ended) {
      util.addClass(this.root, 'xgplayer-inactive')
    }
  }

  onPlay () {
    util.addClass(this.root, 'xgplayer-playing')
    util.removeClass(this.root, 'xgplayer-pause')
  }

  onPause () {
    util.addClass(this.root, 'xgplayer-pause')
    if (this.userTimer) {
      clearTimeout(this.userTimer)
    }
    this.emit('focus')
  }

  onEnded () {
    util.addClass(this.root, 'xgplayer-ended')
    util.removeClass(this.root, 'xgplayer-playing')
  }

  onSeeking () {
    // util.addClass(this.root, 'seeking');
  }

  onSeeked () {
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    util.removeClass(this.root, 'xgplayer-isloading')
  }

  onWaiting () {
    let self = this
    if (self.waitTimer) {
      clearTimeout(self.waitTimer)
    }
    self.waitTimer = setTimeout(function () {
      util.addClass(self.root, 'xgplayer-isloading')
    }, 500)
  }

  onPlaying () {
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    util.removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay')
    util.addClass(this.root, 'xgplayer-playing')
  }

  static install (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }
}

Player.util = util
Player.sniffer = sniffer
Player.Errors = Errors

export default Player
