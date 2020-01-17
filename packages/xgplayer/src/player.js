import Proxy from './proxy'
import util from './utils/util'
import sniffer from './utils/sniffer'
import Errors from './error'
import * as Events from './events'
import Plugin, {pluginsManager, BasePlugin} from './plugin'
import STATE_CLASS from './stateClassMap'
import getDefaultPlugins from './plugins'
import getDefaultConfig from './defaultConfig'
import {
  version
} from '../package.json'

const FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']

class Player extends Proxy {
  constructor (options) {
    options.plugins = getDefaultPlugins(options)
    super(options)
    this.config = util.deepCopy(getDefaultConfig(), options)
    console.log(this.config)
    // timer and flags
    this.userTimer = null
    this.waitTimer = null
    this.isProgressMoving = false
    this.isReady = false
    this.isPlaying = false
    this.isActive = true

    this._initDOM()

    this._bindEvents()

    this._registerPlugins()

    setTimeout(() => {
      this.emit(Events.READY)
      this.isReady = true
    }, 0)

    if (this.config.videoInit || this.config.autoplay) {
      if (!this.hasStart) {
        this.start()
      }
    }
  }

  /**
   * init control bar
   * @private
   */
  _initDOM () {
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
        this.emit(Events.ERROR, new Errors('use', this.config.vid, {
          line: 32,
          handle: 'Constructor',
          msg: 'container id can\'t be empty'
        }))
        return false
      }
    }

    this.addClass(`${STATE_CLASS.DEFAULT} xgplayer-${sniffer.device} ${STATE_CLASS.NO_START} ${this.config.controls ? '' : STATE_CLASS.NO_CONTROLS}`)
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
  }

  _bindEvents () {
    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    });

    // deal with the fullscreen state change callback
    this.onFullscreenChange = () => {
      const fullEl = util.getFullScreenEl()
      if (fullEl && (fullEl === this._fullscreenEl || fullEl.tagName === 'VIDEO')) {
        this.fullscreen = true
        this.addClass(STATE_CLASS.FULLSCREEN)
      } else {
        this.fullscreen = false
        this._fullscreenEl = null
        this.removeClass(STATE_CLASS.FULLSCREEN)
      }
    }
    FULLSCREEN_EVENTS.forEach(item => {
      document.addEventListener(item, this.onFullscreenChange)
    })

    this.once('loadeddata', this.getVideoSize)

    this.mousemoveFunc = () => {
      this.emit(Events.PLAYER_FOCUS)
      if (!this.config.closeFocusVideoFocus) {
        this.video.focus()
      }
    }
    this.root.addEventListener('mousemove', this.mousemoveFunc)
    this.playFunc = () => {
      this.emit(Events.PLAYER_FOCUS)
      if (!this.config.closePlayVideoFocus) {
        this.video.focus()
      }
    }
    this.once('play', this.playFunc)

    const player = this
    function onDestroy () {
      player.root.removeEventListener('mousemove', player.mousemoveFunc);
      FULLSCREEN_EVENTS.forEach(item => {
        document.removeEventListener(item, this.onFullscreenChange)
      });
      player.off('destroy', onDestroy)
    }
    player.once('destroy', onDestroy)
  }

  _startInit (url) {
    let root = this.root
    let player = this
    if (!url || url === '') {
      this.emit(Events.URL_NULL)
    }
    this.canPlayFunc = function () {
      this.volume = this.config.volume
      this.play()
      player.off(Events.CANPLAY, this.canPlayFunc)
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

    this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc)

    if (this.config.autoplay) {
      this.once(Events.CANPLAY, this.canPlayFunc)
    }
    root.insertBefore(this.video, root.firstChild)
    setTimeout(() => {
      this.emit(Events.COMPLETE)
    }, 1)
    this.hasStart = true
    pluginsManager.afterInit(this)
  }
  /**
   * 注册组件 组件列表config.plugins
   */
  _registerPlugins () {
    const ignores = this.config.ignores || []
    const plugins = this.config.plugins || []
    const ignoresStr = ignores.join('||')
    plugins.map(plugin => {
      try {
        // 在ignores中的不做组装
        if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
          return null
        }
        return pluginsManager.register(this, plugin)
      } catch (err) {
        return null
      }
    })
  }

  registerPlugin () {
  }

  unRegistePlugin () {}

  /**
   * 当前播放器挂在的插件实例代码
   */
  get plugins () {
    return pluginsManager.getPlugins(this)
  }

  getPlugin (pluginName) {
    return pluginsManager.findPlugin(this, pluginName)
  }

  addClass (className) {
    if (!this.root) {
      return;
    }
    if (!util.hasClass(this.root, className)) {
      util.addClass(this.root, className)
    }
  }

  removeClass (className) {
    if (!this.root) {
      return;
    }
    if (util.hasClass(this.root, className)) {
      util.removeClass(this.root, className)
    }
  }

  start (url = this.url) {
    // 已经开始初始化播放了 则直接调用play
    if (this.hasStart) {
      this.play()
    } else {
      pluginsManager.beforeInit(this).then(() => {
        if (!url) {
          url = this.url
        }
        this._startInit(url)
      }).catch((e) => {
        e.fileName = 'player'
        e.lineNumber = '236'
        throw e
      })
    }
  }

  play () {
    if (!this.hasStart) {
      this.start()
      return;
    }
    const playPromise = super.play()
    if (playPromise !== undefined && playPromise && playPromise.then) {
      playPromise.then(() => {
        this.removeClass(STATE_CLASS.AUTOPLAY)
        this.removeClass(STATE_CLASS.NO_START)
        this.addClass(STATE_CLASS.PLAYING)
      }).catch((e) => {
        // 避免AUTOPLAY_PREVENTED先于playing和play触发
        setTimeout(() => {
          this.emit(Events.AUTOPLAY_PREVENTED)
          this.addClass(STATE_CLASS.AUTOPLAY)
        }, 0)
        throw e
      })
    }
    return playPromise
  }

  reload () {
    this.video.load()
    this.reloadFunc = function () {
      this.play().catch(err => { console.log(err) })
    }
    this.once('loadeddata', this.reloadFunc)
  }

  destroy (isDelDom = true) {
    pluginsManager.destroy(this)
    super.destroy()
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
  }

  replay () {
    this.removeClass(STATE_CLASS.ENDED)
    this.currentTime = 0
    this.play().catch(err => {
      console.log(err)
    })
  }

  getFullscreen (el) {
    let player = this
    if (!el) {
      el = this.root
    }
    this._fullscreenEl = el
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
      this.addClass(STATE_CLASS.CSS_FULLSCREEN)
    }
  }

  exitFullscreen (el) {
    if (el) {
      el = this.root
    }
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    this.removeClass(STATE_CLASS.CSS_FULLSCREEN)
  }

  getCssFullscreen () {
    let player = this
    this.addClass(STATE_CLASS.CSS_FULLSCREEN)
    player.emit('requestCssFullscreen')
  }

  exitCssFullscreen () {
    let player = this
    this.removeClass(STATE_CLASS.CSS_FULLSCREEN)
    player.emit('exitCssFullscreen')
  }

  onFocus () {
    this.isActive = true
    let player = this
    this.removeClass(STATE_CLASS.ACTIVE)
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
    player.userTimer = setTimeout(function () {
      this.isActive = false
      player.emit(Events.PLAYER_BLUR)
    }, player.config.inactive)
  }

  onBlur () {
    if (!this.paused && !this.ended) {
      this.addClass(STATE_CLASS.ACTIVE)
    }
  }

  onPlay () {
    this.addClass(STATE_CLASS.PLAYING)
    this.removeClass(STATE_CLASS.PAUSED)
    this.emit(Events.PLAYER_FOCUS)
  }

  onPause () {
    this.addClass(STATE_CLASS.PAUSED)
    if (this.userTimer) {
      clearTimeout(this.userTimer)
    }
    this.emit(Events.PLAYER_FOCUS)
  }

  onEnded () {
    this.addClass(STATE_CLASS.ENDED)
    this.removeClass(STATE_CLASS.PLAYING)
  }

  onSeeking () {
    // util.addClass(this.root, 'seeking');
  }

  onSeeked () {
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    this.removeClass(STATE_CLASS.LOADING)
  }

  onWaiting () {
    let self = this
    if (self.waitTimer) {
      clearTimeout(self.waitTimer)
    }
    self.waitTimer = setTimeout(() => {
      this.addClass(STATE_CLASS.LOADING)
    }, 500)
  }

  onPlaying () {
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    this.removeClass(`${STATE_CLASS.NO_START} ${STATE_CLASS.PAUSED} ${STATE_CLASS.ENDED} ${STATE_CLASS.ERROR} ${STATE_CLASS.REPLAY}`)
    this.addClass(STATE_CLASS.PLAYING)
  }

  getVideoSize () {
    if (this.video.videoWidth && this.video.videoHeight) {
      let containerSize = this.root.getBoundingClientRect()
      if (this.config.fitVideoSize === 'auto') {
        if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
          this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
        } else {
          this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
        }
      } else if (this.config.fitVideoSize === 'fixWidth') {
        this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
      } else if (this.config.fitVideoSize === 'fixHeight') {
        this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
      }
    }
  }

  get version () {
    return version
  }

  set url (url) {
    this.__url = url
  }

  get url () {
    return this.__url || this.config.url
  }

  set poster (posterUrl) {
    let poster = util.findDom(this.root, '.xgplayer-poster')
    if (poster) {
      poster.style.backgroundImage = `url(${posterUrl})`
    }
  }

  get fullscreen () {
    return this._isFullScreen;
  }

  set fullscreen (val) {
    this._isFullScreen = val
  }

  get bullet () {
    return util.findDom(this.root, 'xg-bullet') ? util.hasClass(util.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false
  }

  get textTrack () {
    return util.hasClass(this.root, 'xgplayer-is-textTrack')
  }

  get pip () {
    return util.hasClass(this.root, 'xgplayer-pip-active')
  }
}

Player.util = util
Player.sniffer = sniffer
Player.Errors = Errors
Player.Events = Events
Player.Plugin = Plugin
Player.BasePlugin = BasePlugin
export default Player
