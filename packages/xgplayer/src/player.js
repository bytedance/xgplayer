import Proxy from './proxy'
import { util, deepCopy, findDom, createDom, addClass, typeOf, hasClass, removeClass, checkIsBrowser } from './utils/util'
import sniffer from './utils/sniffer'
import XgplayerTimeRange from './utils/xgplayerTimeRange'
import Errors from './error'
import allOff from 'event-emitter/all-off'
import s_i18n from './skin/controls/i18n.js'
import './skin/style/index.scss'

import {
  version
} from '../version.json'
class Player extends Proxy {
  constructor (options) {
    super(options)
    this.config = deepCopy({
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
    this.history = []
    this.isProgressMoving = false
    this.root = findDom(document, `#${this.config.id}`)
    this.controls = createDom('xg-controls', '', {
      unselectable: 'on',
      onselectstart: 'return false'
    }, 'xgplayer-controls')
    if (this.config.isShowControl) {
      this.controls.style.display = 'none'
    }
    if (!this.root) {
      let el = this.config.el
      if (el && el.nodeType === 1) {
        this.root = el
      } else {
        this.emit('error', new Errors({
          type: 'use',
          errd: {
            line: 45,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          },
          vid: this.config.vid
        }))
        console.error('container id can\'t be empty')
        return false
      }
    }
    // this.rootBackup = copyDom(this.root)
    addClass(this.root, `xgplayer xgplayer-${sniffer.device} xgplayer-nostart ${this.config.controls ? '' : 'xgplayer-no-controls'}`)
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
      // this.root.style.width = `${this.config.width}px`
      // this.root.style.height = `${this.config.height}px`
      if (this.config.width) {
        if (typeof this.config.width !== 'number') {
          this.root.style.width = this.config.width
        } else {
          this.root.style.width = `${this.config.width}px`
        }
      }
      if (this.config.height) {
        if (typeof this.config.height !== 'number') {
          this.root.style.height = this.config.height
        } else {
          this.root.style.height = `${this.config.height}px`
        }
      }
    }
    if (this.config.execBeforePluginsCall) {
      this.config.execBeforePluginsCall.forEach(item => {
        item.call(this, this)
      })
    }
    if(!this.config.closeI18n) {
      Player.install(s_i18n.name, s_i18n.method)
    }
    if (this.config.controlStyle && typeOf(this.config.controlStyle) === 'String') {
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
    if(this.config.controlPlugins) {
      Player.controlsRun(this.config.controlPlugins, this)
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
      if (!player.config.closeFocusVideoFocus) {
        player.video.focus()
      }
    }
    this.root.addEventListener('mousemove', this.mousemoveFunc)
    this.playFunc = function () {
      player.emit('focus')
      if (!player.config.closePlayVideoFocus) {
        player.video.focus()
      }
    }
    player.once('play', this.playFunc)

    this.getVideoSize = function () {
      if (this.video.videoWidth && this.video.videoHeight) {
        let containerSize = player.root.getBoundingClientRect()
        if (player.config.fitVideoSize === 'auto') {
          if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
            player.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
          } else {
            player.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
          }
        } else if (player.config.fitVideoSize === 'fixWidth') {
          player.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
        } else if (player.config.fitVideoSize === 'fixHeight') {
          player.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
        }
      }
    }
    player.once('loadeddata', this.getVideoSize)

    setTimeout(() => {
      this.emit('ready')
      this.isReady = true
    }, 0)

    if (this.config.videoInit) {
      if (hasClass(this.root, 'xgplayer-nostart')) {
        this.start()
      }
    }
    if (player.config.rotate) {
      player.on('requestFullscreen', this.updateRotateDeg)
      player.on('exitFullscreen', this.updateRotateDeg)
    }

    function onDestroy () {
      player.root.removeEventListener('mousemove', player.mousemoveFunc)
      player.off('destroy', onDestroy)
    }
    player.once('destroy', onDestroy)
  }

  attachVideo () {
    if(this.video && this.video.nodeType === 1) {
      this.root.insertBefore(this.video, this.root.firstChild)
    }
    setTimeout(() => {
      this.emit('complete')
      if(this.danmu && typeof this.danmu.resize === 'function') {
        this.danmu.resize()
      }
    }, 1)
  }

  start (url = this.config.url) {
    if(!this.video) return
    let player = this
    if (!url || url === '') {
      this.emit('urlNull')
    }
    this.canPlayFunc = function () {
      player.off('canplay', player.canPlayFunc)
      let playPromise = player.video.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.then(function () {
          player.emit('autoplay started')
        }).catch(function () {
          player.emit('autoplay was prevented')
          addClass(player.root, 'xgplayer-is-autoplay')
        })
      }
    }
    if (typeOf(url) !== 'Array') {
      if (typeOf(url) === 'String' && url.indexOf('blob:') > -1 && url === this.video.src) {
        // 在Chromium环境下用mse url给video二次赋值会导致错误
      } else {
        this.video.src = url
      }
    } else {
      url.forEach(item => {
        this.video.appendChild(createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        }))
      })
    }
    if (this.config.autoplay) {
      if (sniffer.os.isPhone) {
        this.canPlayFunc()
      } else {
        this.on('canplay', this.canPlayFunc)
      }
    }
    if(!this.config.disableStartLoad) {
      this.video.load()
    }
    this.attachVideo()
  }

  reload () {
    this.video.load()
    this.reloadFunc = function () {
      // eslint-disable-next-line handle-callback-err
      let playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => {})
      }
    }
    this.once('loadeddata', this.reloadFunc)
  }

  destroy (isDelDom = true) {
    let player = this
    clearInterval(this.bulletResizeTimer)
    for (let k in this._interval) {
      clearInterval(this._interval[k])
      this._interval[k] = null
    }
    if (this.checkTimer) {
      clearInterval(this.checkTimer)
    }
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    this.ev.forEach((item) => {
      let evName = Object.keys(item)[0]
      let evFunc = this[item[evName]]
      if (evFunc) {
        this.off(evName, evFunc)
      }
    });
    if (this.loadeddataFunc) {
      this.off('loadeddata', this.loadeddataFunc)
    }
    if (this.reloadFunc) {
      this.off('loadeddata', this.reloadFunc)
    }
    if (this.replayFunc) {
      this.off('play', this.replayFunc)
    }
    if (this.playFunc) {
      this.off('play', this.playFunc)
    }
    if (this.getVideoSize) {
      this.off('loadeddata', this.getVideoSize)
    };
    ['focus', 'blur'].forEach(item => {
      this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(item => {
        if (this[item]) {
          this[item].removeEventListener('keydown', function (e) { player.onKeydown(e, player) })
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
        // parentNode.removeChild(this.root)
        this.root.innerHTML = ''
        let classNameList = this.root.className.split(' ')
        if (classNameList.length > 0) {
          this.root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ')
        } else {
          this.root.className = ''
        }
      }

      for (let k in this) {
        // if (k !== 'config') {
        delete this[k]
        // }
      }
      allOff(this)
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
    removeClass(this.root, 'xgplayer-ended')
    if(sniffer.browser.indexOf('ie') > -1) {
      this.emit('play')
      this.emit('playing')
    }
    
    if (_replay && _replay instanceof Function) {
      _replay()
    } else {
      this.currentTime = 0
      // eslint-disable-next-line handle-callback-err
      let playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => {})
      }
    }
  }

  userGestureTrigEvent (name, param) {
    const defaultUserGestureEventHandler = (name, param) => {
      this.emit(name, param)
    }
    if(this.config.userGestureEventMiddleware && typeof this.config.userGestureEventMiddleware[name] === 'function') {
      this.config.userGestureEventMiddleware[name].call(this, this, name, param, defaultUserGestureEventHandler)
    } else {
      defaultUserGestureEventHandler.call(this, name, param);
    }
  }

  pluginsCall () {
    if(Player.plugins['s_i18n']) {
      Player.plugins['s_i18n'].call(this, this)
    }
    let self = this
    if (Player.plugins) {
      let ignores = this.config.ignores
      Object.keys(Player.plugins).forEach(name => {
        let descriptor = Player.plugins[name]
        if(!descriptor || typeof descriptor !== 'function'){
          console.warn('plugin name', name , 'is invalid')
        } else {
          if (!ignores.some(item => name === item || name === 's_' + item) && name !== 's_i18n') {
            if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
              if (name === sniffer.device) {
                setTimeout(() => {
                  // if destroyed, skip
                  if (!self.video) return;
                  descriptor.call(self, self)
                }, 0)
              }
            } else {
              descriptor.call(this, this)
            }
          }
        }
      })
    }
  }

  onFocus () {
    let player = this
    if(hasClass(this.root, 'xgplayer-inactive')) {
      player.emit('controlShow')
    }
    removeClass(this.root, 'xgplayer-inactive')
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
    player.userTimer = setTimeout(function () {
      player.emit('blur')
    }, player.config.inactive)
  }

  onBlur () {
    // this.video.blur()
    if ((this.config.enablePausedInactive || !this.paused) && !this.ended && !this.config.closeInactive) {
      if(!hasClass(this.root, 'xgplayer-inactive')) {
        this.emit('controlHide')
      }
      addClass(this.root, 'xgplayer-inactive')
    }
  }

  onPlay () {
    addClass(this.root, 'xgplayer-isloading')
    addClass(this.root, 'xgplayer-playing')
    removeClass(this.root, 'xgplayer-pause')
  }

  onPause () {
    addClass(this.root, 'xgplayer-pause')
    if (this.userTimer) {
      clearTimeout(this.userTimer)
    }
    this.emit('focus')
  }

  onEnded () {
    addClass(this.root, 'xgplayer-ended')
    removeClass(this.root, 'xgplayer-playing')
  }

  onSeeking () {
    this.isSeeking = true
    // 兼容IE下无法触发waiting事件的问题 seeking的时候直接出发waiting
    this.onWaiting()
    // addClass(this.root, 'seeking');
  }

  // onTimeupdate () {
  //   // for ie,playing fired before waiting
  //   if (this.waitTimer) {
  //     clearTimeout(this.waitTimer)
  //   }
  //   removeClass(this.root, 'xgplayer-isloading')

  // }

  onSeeked () {
    // for ie,playing fired before waiting
    this.isSeeking = false
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    removeClass(this.root, 'xgplayer-isloading')
  }

  onWaiting () {
    let self = this
    if (self.waitTimer) {
      clearTimeout(self.waitTimer)
    }
    if (self.checkTimer) {
      clearInterval(self.checkTimer)
      self.checkTimer = null
    }
    let time = self.currentTime
    self.waitTimer = setTimeout(function () {
      addClass(self.root, 'xgplayer-isloading')
      self.checkTimer = setInterval(function () {
        if (self.currentTime !== time) {
          removeClass(self.root, 'xgplayer-isloading')
          clearInterval(self.checkTimer)
          self.checkTimer = null
        }
      }, 1000)
    }, 500)
  }

  onPlaying () {
    // 兼容safari下无法自动播放会触发该事件的场景
    if (this.paused) {
      return
    }
    this.isSeeking = false
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay')
    addClass(this.root, 'xgplayer-playing')
  }

  static install (name, descriptor) {
    if (!checkIsBrowser()) {
      return
    }
    if (!Player.plugins) {
      Player.plugins = {}
    }
    if (!Player.plugins[name]) {
      Player.plugins[name] = descriptor
    }
  }

  static installAll (list) {
    for(let k = 0; k < list.length; k++){
      Player.install(list[k].name, list[k].method)
    }
  }

  static use (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }

  static useAll (list) {
    for (let k in list) {
      Player.use(list[k].name, list[k].method)
    }
  }

  static controlsRun (controlLst, context) {
    controlLst.forEach(function(control) {
      control.method.call(context)
    })
  }
}

Player.util = util
Player.sniffer = sniffer
Player.Errors = Errors
Player.XgplayerTimeRange = XgplayerTimeRange

export default Player
