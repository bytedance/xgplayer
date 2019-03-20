import Proxy from './proxy'
import util from './utils/util'
import Database from './utils/database'
import sniffer from './utils/sniffer'
import Errors from './error'
import Draggabilly from 'draggabilly'
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
    // this.rootBackup = util.copyDom(this.root)
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
    this.mousemoveFunc = function () {
      player.emit('focus')
      player.video.focus()
    }
    this.root.addEventListener('mousemove', this.mousemoveFunc)
    this.playFunc = function () {
      player.emit('focus')
      player.video.focus()
    }
    player.once('play', this.playFunc)

    setTimeout(() => {
      this.emit('ready')
    }, 0)

    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(item => {
        player[item].addEventListener('keydown', function(e) {player.onKeydown(e, player)})
      })
    }
  }

  start (url = this.config.url) {
    let root = this.root
    let player = this
    if (!url || url === '') {
      this.emit('urlNull')
    }
    this.logParams.playSrc = url
    this.canPlayFunc = function () {
      let playPromise = player.video.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.then(function () {
          player.emit('autoplay started')
        }).catch(function () {
          player.emit('autoplay was prevented')
          Player.util.addClass(player.root, 'xgplayer-is-autoplay')
        })
      }
      player.off('canplay', player.canPlayFunc)
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
    this.logParams.pt = new Date().getTime()
    this.logParams.vt = this.logParams.pt
    this.loadeddataFunc = function () {
      player.logParams.vt = new Date().getTime()
      if (player.logParams.pt > player.logParams.vt) {
        player.logParams.pt = player.logParams.vt
      }
      player.logParams.vd = player.video.duration
    }
    this.once('loadeddata', this.loadeddataFunc)
    if (this.config.autoplay) {
      this.on('canplay', this.canPlayFunc)
    }
    root.insertBefore(this.video, root.firstChild)
    setTimeout(() => {
      this.emit('complete')
    }, 1)
  }

  reload () {
    this.video.load()
    this.reloadFunc = function () {
      this.play()
    }
    this.once('loadeddata', this.reloadFunc)
  }

  destroy (isDelDom = true) {
    let player = this
    let parentNode = this.root.parentNode
    clearInterval(this.bulletResizeTimer)
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
    if(this.loadeddataFunc) {
      this.off('loadeddata', this.loadeddataFunc)
    }
    if(this.reloadFunc) {
      this.off('loadeddata', this.reloadFunc)
    }
    if(this.replayFunc) {
      this.off('play', this.replayFunc)
    }
    if(this.playFunc) {
      this.off('play', this.playFunc)
    }
    ['focus', 'blur'].forEach(item => {
      this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(item => {
        if (this[item]) {
          this[item].removeEventListener('keydown', function(e) {player.onKeydown(e, player)})
        }
      })
    }

    function destroyFunc () {
      this.emit('destroy')
      // this.root.id = this.root.id + '_del'
      // parentNode.insertBefore(this.rootBackup, this.root)

      // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
      this.video.removeAttribute('src') // empty source
      this.video.load()
      if (isDelDom) {
        parentNode.removeChild(this.root)
      }
      for (let k in this) {
        // if (k !== 'config') {
          delete this[k]
        // }
      }
      this.off('pause', destroyFunc)
    }

    if (!this.paused) {
      this.pause()
      this.once('pause', destroyFunc)
    } else {
      destroyFunc.call(this)
    }
    super.destroy()
  }

  replay () {
    let self = this
    let _replay = this._replay
    // ie9 bugfix
    util.removeClass(this.root, 'xgplayer-ended')
    this.logParams = {
      bc: 0,
      bu_acu_t: 0,
      played: [],
      pt: new Date().getTime(),
      vt: new Date().getTime(),
      vd: 0
    }
    this.logParams.pt = new Date().getTime()
    this.logParams.vt = this.logParams.pt
    this.replayFunc = function () {
      self.logParams.vt = new Date().getTime()
      if (self.logParams.pt > self.logParams.vt) {
        self.logParams.pt = self.logParams.vt
      }
      self.logParams.vd = self.video.duration
    }
    this.once('play', this.replayFunc)
    this.logParams.playSrc = this.video.currentSrc
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

  getPIP (player) {
    let ro = player.root.getBoundingClientRect()
    let Top = ro.top
    let Left = ro.left
    let dragLay = util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay')
    player.root.appendChild(dragLay)
    let dragHandle = util.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', {tabindex: 9}, 'xgplayer-pip-drag')
    player.root.appendChild(dragHandle)
    let draggie = new Draggabilly('.xgplayer', {
      handle: '.drag-handle'
    })
    util.addClass(player.root, 'xgplayer-pip-active')
    player.root.style.right = 0
    player.root.style.bottom = '200px'
    player.root.style.top = ''
    player.root.style.left = ''
    if (player.config.fluid) {
      player.root.style['padding-top'] = ''
    }
    ['click', 'touchstart'].forEach(item => {
      dragLay.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        player.exitPIP(player)
        player.root.style.top = `${Top}px`
        player.root.style.left = `${Left}px`
      })
    })
  }

  exitPIP (player) {
    util.removeClass(player.root, 'xgplayer-pip-active')
    player.root.style.right = ''
    player.root.style.bottom = ''
    player.root.style.top = ''
    player.root.style.left = ''
    if (player.config.fluid) {
      player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
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
    // this.video.blur()
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

  onKeydown (event, player) {
    // let player = this
    let e = event || window.event
    if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
      player.emit('focus')
    }
    if (e && (e.keyCode === 40 || e.keyCode === 38)) {
      if (player.controls) {
        let volumeSlider = player.controls.querySelector('.xgplayer-slider')
        if (volumeSlider) {
          if (util.hasClass(volumeSlider, 'xgplayer-none')) {
            util.removeClass(volumeSlider, 'xgplayer-none')
          }
          if (player.sliderTimer) {
            clearTimeout(player.sliderTimer)
          }
          player.sliderTimer = setTimeout(function () {
            util.addClass(volumeSlider, 'xgplayer-none')
          }, player.config.inactive)
        }
      }
      if (e && e.keyCode === 40) { // 按 down
        if (player.volume - 0.1 >= 0) {
          player.volume -= 0.1
        } else {
          player.volume = 0
        }
      } else if (e && e.keyCode === 38) { // 按 up
        if (player.volume + 0.1 <= 1) {
          player.volume += 0.1
        } else {
          player.volume = 1
        }
      }
    } else if (e && e.keyCode === 39) { // 按 right
      if (player.currentTime + 10 <= player.duration) {
        player.currentTime += 10
      } else {
        player.currentTime = player.duration - 1
      }
    } else if (e && e.keyCode === 37) { // 按 left
      if (player.currentTime - 10 >= 0) {
        player.currentTime -= 10
      } else {
        player.currentTime = 0
      }
    } else if (e && e.keyCode === 32) { // 按 spacebar
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }
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
