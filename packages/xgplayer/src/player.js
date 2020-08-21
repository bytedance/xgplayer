import Proxy from './proxy'
import util from './utils/util'
import Database from './utils/database'
import sniffer from './utils/sniffer'
import Errors from './error'
import Draggabilly from 'draggabilly'
import {getAbsoluteURL} from './utils/url'
import downloadUtil from 'downloadjs'

import {
  version
} from '../version.json'
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

    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(item => {
        player[item].addEventListener('keydown', (e) => { player.onKeydown(e, player) })
      })
    }
    if (this.config.videoInit) {
      if (util.hasClass(this.root, 'xgplayer-nostart')) {
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

  start (url = this.config.url) {
    let root = this.root
    let player = this
    if (!url || url === '') {
      this.emit('urlNull')
    }
    this.logParams.playSrc = url
    this.canPlayFunc = function () {
      player.off('canplay', player.canPlayFunc)
      let playPromise = player.video.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.then(function () {
          player.emit('autoplay started')
        }).catch(function () {
          player.emit('autoplay was prevented')
          Player.util.addClass(player.root, 'xgplayer-is-autoplay')
        })
      }
    }
    if (util.typeOf(url) === 'String') {
      if (url.indexOf('blob:') > -1 && url === this.video.src) {
        // 在Chromium环境下用mse url给video二次赋值会导致错误
      } else {
        this.video.src = url
      }
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
      if (sniffer.os.isPhone) {
        this.canPlayFunc()
      } else {
        this.on('canplay', this.canPlayFunc)
      }
    }
    if(!this.config.disableStartLoad) {
      this.video.load()
    }
    root.insertBefore(this.video, root.firstChild)
    setTimeout(() => {
      this.emit('complete')
      if(this.danmu && typeof this.danmu.resize === 'function') {
        this.danmu.resize()
      }
    }, 1)
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
      // eslint-disable-next-line handle-callback-err
      let playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => {})
      }
    }
  }

  getFullscreen (el) {
    let player = this
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      util.addClass(el, 'xgplayer-is-cssfullscreen')
    }
  }

  exitFullscreen (el) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    util.removeClass(el, 'xgplayer-is-cssfullscreen')
  }

  getCssFullscreen () {
    let player = this
    if (player.config.fluid) {
      player.root.style['padding-top'] = ''
    }
    util.addClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('requestCssFullscreen')
  }

  exitCssFullscreen () {
    let player = this
    if (player.config.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
    }
    util.removeClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('exitCssFullscreen')
  }

  getRotateFullscreen () {
    let player = this
    document.documentElement.style.width = '100%'
    document.documentElement.style.height = '100%'
    if (player.root && !Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      Player.util.addClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('getRotateFullscreen')
  }

  exitRotateFullscreen () {
    let player = this
    document.documentElement.style.width = 'unset'
    document.documentElement.style.height = 'unset'
    if (player.root && Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      Player.util.removeClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('exitRotateFullscreen')
  }

  download () {
    const url = getAbsoluteURL(this.config.url)
    downloadUtil(url)
  }

  pluginsCall () {
    let self = this
    if (Player.plugins) {
      let ignores = this.config.ignores
      Object.keys(Player.plugins).forEach(name => {
        let descriptor = Player.plugins[name]
        if (!ignores.some(item => name === item || name === 's_' + item)) {
          if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
            if (name === sniffer.device) {
              setTimeout(() => {
                descriptor.call(self, self)
              }, 0)
            }
          } else {
            descriptor.call(this, this)
          }
        }
      })
    }
  }

  getPIP () {
    // let ro = this.root.getBoundingClientRect()
    // let Top = ro.top
    // let Left = ro.left
    let dragLay = util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay')
    this.root.appendChild(dragLay)
    let dragHandle = util.createDom('xg-pip-drag', `<div class="drag-handle"><span>${this.lang.PIP_DRAG}</span></div>`, {tabindex: 9}, 'xgplayer-pip-drag')
    this.root.appendChild(dragHandle)
    // eslint-disable-next-line no-unused-vars
    let draggie = new Draggabilly('.xgplayer', {
      handle: '.drag-handle'
    })
    util.addClass(this.root, 'xgplayer-pip-active')
    this.root.style.right = 0
    this.root.style.bottom = '200px'
    this.root.style.top = ''
    this.root.style.left = ''
    this.root.style.width = '320px'
    this.root.style.height = '180px'
    if (this.config.pipConfig) {
      if (this.config.pipConfig.top !== undefined) {
        this.root.style.top = this.config.pipConfig.top + 'px'
        this.root.style.bottom = ''
      }
      if (this.config.pipConfig.bottom !== undefined) {
        this.root.style.bottom = this.config.pipConfig.bottom + 'px'
      }
      if (this.config.pipConfig.left !== undefined) {
        this.root.style.left = this.config.pipConfig.left + 'px'
        this.root.style.right = ''
      }
      if (this.config.pipConfig.right !== undefined) {
        this.root.style.right = this.config.pipConfig.right + 'px'
      }
      if (this.config.pipConfig.width !== undefined) {
        this.root.style.width = this.config.pipConfig.width + 'px'
      }
      if (this.config.pipConfig.height !== undefined) {
        this.root.style.height = this.config.pipConfig.height + 'px'
      }
    }
    if (this.config.fluid) {
      this.root.style['padding-top'] = ''
    }
    let player = this;
    ['click', 'touchend'].forEach(item => {
      dragLay.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        player.exitPIP()
        // player.root.style.top = `${Top}px`
        // player.root.style.left = `${Left}px`
      })
    })
  }

  exitPIP () {
    util.removeClass(this.root, 'xgplayer-pip-active')
    this.root.style.right = ''
    this.root.style.bottom = ''
    this.root.style.top = ''
    this.root.style.left = ''
    if (this.config.fluid) {
      this.root.style['width'] = '100%'
      this.root.style['height'] = '0'
      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`
    } else {
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

    let dragLay = util.findDom(this.root, '.xgplayer-pip-lay')
    if (dragLay && dragLay.parentNode) {
      dragLay.parentNode.removeChild(dragLay)
    }
    let dragHandle = util.findDom(this.root, '.xgplayer-pip-drag')
    if (dragHandle && dragHandle.parentNode) {
      dragHandle.parentNode.removeChild(dragHandle)
    }
  }

  updateRotateDeg () {
    let player = this;
    if (!player.rotateDeg) {
      player.rotateDeg = 0
    }

    let width = player.root.offsetWidth
    let height = player.root.offsetHeight
    let targetWidth = player.video.videoWidth
    let targetHeight = player.video.videoHeight

    if (!player.config.rotate.innerRotate && player.config.rotate.controlsFix) {
      player.root.style.width = height + 'px'
      player.root.style.height = width + 'px'
    }

    let scale
    if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
      if (player.config.rotate.innerRotate) {
        if ((targetWidth / targetHeight) > (height / width)) { // 旋转后纵向撑满
          let videoWidth = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoWidth = height * targetWidth / targetHeight
          } else { // 旋转前是横向撑满
            videoWidth = width
          }
          scale = height / videoWidth
        } else { // 旋转后横向撑满
          let videoHeight = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoHeight = height
          } else { // 旋转前是横向撑满
            videoHeight = width * targetHeight / targetWidth
          }
          scale = width / videoHeight
        }
      } else {
        if (width >= height) {
          scale = width / height
        } else {
          scale = height / width
        }
      }
      scale = Number(scale.toFixed(5))
    } else {
      scale = 1
    }

    if (player.config.rotate.innerRotate) {
      player.video.style.transformOrigin = 'center center'
      player.video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
      player.video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
    } else {
      if (player.config.rotate.controlsFix) {
        player.video.style.transformOrigin = 'center center'
        player.video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
        player.video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
      } else {
        player.root.style.transformOrigin = 'center center'
        player.root.style.transform = `rotate(${player.rotateDeg}turn) scale(${1})`
        player.root.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${1})`
      }
    }
  }

  rotate (clockwise = false, innerRotate = true, times = 1) {
    let player = this;
    if (!player.rotateDeg) {
      player.rotateDeg = 0
    }
    let factor = clockwise ? 1 : -1

    player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1
    this.updateRotateDeg()

    player.emit('rotate', player.rotateDeg * 360)
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
    if ((this.config.enablePausedInactive || !this.paused) && !this.ended && !this.config.closeInactive) {
      util.addClass(this.root, 'xgplayer-inactive')
    }
  }

  onPlay () {
    util.addClass(this.root, 'xgplayer-isloading')
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
    this.isSeeking = true
    // 兼容IE下无法触发waiting事件的问题 seeking的时候直接出发waiting
    this.onWaiting()
    // util.addClass(this.root, 'seeking');
  }

  onTimeupdate () {
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    util.removeClass(this.root, 'xgplayer-isloading')

  }

  onSeeked () {
    // for ie,playing fired before waiting
    this.isSeeking = false
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
    if (self.checkTimer) {
      clearInterval(self.checkTimer)
      self.checkTimer = null
    }
    let time = self.currentTime
    self.waitTimer = setTimeout(function () {
      util.addClass(self.root, 'xgplayer-isloading')
      self.checkTimer = setInterval(function () {
        if (self.currentTime !== time) {
          util.removeClass(this.root, 'xgplayer-isloading')
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
          player.volume = Number((player.volume - 0.1).toFixed(1))
        } else {
          player.volume = 0
        }
      } else if (e && e.keyCode === 38) { // 按 up
        if (player.volume + 0.1 <= 1) {
          player.volume = Number((player.volume + 0.1).toFixed(1))
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
        // eslint-disable-next-line handle-callback-err
        let playPromise = player.play()
        if (playPromise !== undefined && playPromise) {
          playPromise.catch(err => {})
        }
      } else {
        player.pause()
      }
    }
  }

  get cumulateTime () {
    if (this.logParams && this.logParams.played instanceof Array) {
      const accTime  = util.computeWatchDur(this.logParams.played) || 0
      return Number(accTime.toFixed(3))
    }
    return 0
  }

  static install (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    if (!Player.plugins[name]) {
      Player.plugins[name] = descriptor
    }
  }

  static use (name, descriptor) {
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
