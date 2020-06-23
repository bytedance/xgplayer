import Proxy from './proxy'
import Util from './utils/util'
import sniffer from './utils/sniffer'
import Errors from './error'
import * as Events from './events'
import Plugin, {pluginsManager, BasePlugin} from './plugin'
import STATE_CLASS from './stateClassMap'
import getDefaultConfig from './defaultConfig'
import { usePreset } from './plugin/preset';
import Controls from './plugins/controls'
import {
  version
} from '../package.json'

const FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']

class Player extends Proxy {
  constructor (options) {
    super(options)
    this.config = Util.deepMerge(getDefaultConfig(), options)

    // resolve default preset
    if (this.config.presets.length) {
      const defaultIdx = this.config.presets.indexOf('default')
      if (defaultIdx >= 0 && Player.defaultPreset) {
        this.config.presets.push(Player.defaultPreset)
        this.config.presets.splice(defaultIdx, 1)
      }
    } else if (Player.defaultPreset) {
      this.config.presets.push(Player.defaultPreset)
    }

    // timer and flags
    this.userTimer = null
    this.waitTimer = null
    this.isReady = false
    this.isPlaying = false
    this.isSeeking = false
    this.isActive = true
    this.isCssfullScreen = false

    this._initDOM()

    this._bindEvents()
    this._registerPresets()
    this._registerPlugins()
    pluginsManager.onPluginsReady(this)

    setTimeout(() => {
      this.emit(Events.READY)
      this.onReady && this.onReady()
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
    this.root = Util.findDom(document, `#${this.config.id}`)
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
    this._initBars();
    // const baseBar = pluginsManager.register(this, BaseBar)
    // this.baseBar = baseBar
    const controls = pluginsManager.register(this, Controls)
    this.controls = controls
    this.addClass(`${STATE_CLASS.DEFAULT} xgplayer-${sniffer.device} ${STATE_CLASS.NO_START} ${this.config.controls ? '' : STATE_CLASS.NO_CONTROLS}`)
    if (this.config.autoplay) {
      this.addClass(STATE_CLASS.ENTER)
    }
    if (this.config.fluid) {
      const style = {
        'max-width': '100%',
        'width': '100%',
        'height': '0',
        'padding-top': `${this.config.height * 100 / this.config.width}%`,
        'position': 'position',
        'top': '0',
        'left': '0'
      };
      Object.keys(style).map(key => {
        this.root.style[key] = style[key]
      })
    } else {
      ['width', 'height'].map(key => {
        if (this.config[key]) {
          if (typeof this.config[key] !== 'number') {
            this.root.style[key] = this.config[key]
          } else {
            this.root.style[key] = `${this.config[key]}px`
          }
        }
      })
    }
  }

  _initBars () {
    this.topBar = Util.createDom('xg-bar', '', '', 'xg-top-bar');
    this.leftBar = Util.createDom('xg-bar', '', '', 'xg-left-bar');
    this.rightBar = Util.createDom('xg-bar', '', '', 'xg-right-bar');

    ['click', 'touchend'].forEach((k) => {
      this.topBar.addEventListener(k, (e) => {
        e && e.stopPropagation()
      })
    });

    this.root.appendChild(this.topBar);
    this.root.appendChild(this.leftBar);
    this.root.appendChild(this.rightBar);
  }

  _bindEvents () {
    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    });

    // deal with the fullscreen state change callback
    this.onFullscreenChange = () => {
      const fullEl = Util.getFullScreenEl()
      if (fullEl && (fullEl === this._fullscreenEl || fullEl.tagName === 'VIDEO')) {
        this.fullscreen = true
        this.addClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, true)
      } else {
        this.fullscreen = false
        this._fullscreenEl = null
        this.removeClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, false)
      }
    }

    FULLSCREEN_EVENTS.forEach(item => {
      document.addEventListener(item, this.onFullscreenChange)
    })

    this.once('loadeddata', this.getVideoSize)

    this.mousemoveFunc = () => {
      if (!this.config.closeFocusVideoFocus) {
        this.emit(Events.PLAYER_FOCUS)
        this.video.focus()
      }
    }
    const eventkey = sniffer.service === 'mobile' ? 'touchstart' : 'mousemove'
    this.root.addEventListener(eventkey, this.mousemoveFunc)

    this.playFunc = () => {
      if (!this.config.closePlayVideoFocus) {
        this.emit(Events.PLAYER_FOCUS)
        this.video.focus()
      }
    }
    this.once('play', this.playFunc)
    const player = this
    function onDestroy () {
      player.root.removeEventListener('mousemove', player.mousemoveFunc);
      player.root.removeEventListener(eventkey, this.mousemoveFunc)
      FULLSCREEN_EVENTS.forEach(item => {
        document.removeEventListener(item, this.onFullscreenChange)
      });
      player.off('destroy', onDestroy)
    }
    player.once('destroy', onDestroy)
  }

  _startInit (url) {
    let root = this.root
    if (!url || url === '') {
      this.emit(Events.URL_NULL)
    }
    this.canPlayFunc = () => {
      this.volume = this.config.volume
      this.off(Events.CANPLAY, this.canPlayFunc)
      this.removeClass(STATE_CLASS.ENTER)
    }

    if (Util.typeOf(url) === 'String') {
      this.video.src = url
    } else {
      url.forEach(item => {
        this.video.appendChild(Util.createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        }))
      })
    }

    this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc)

    if (root.firstChild !== this.video) {
      root.insertBefore(this.video, root.firstChild)
    }

    if (this.config.autoplay) {
      this.once(Events.CANPLAY, this.canPlayFunc)
      this.load()
      !this.isPlaying && this.play()
    }

    setTimeout(() => {
      this.emit(Events.COMPLETE)
    }, 1)
    if (!this.hasStart) {
      pluginsManager.afterInit(this)
    }
    this.hasStart = true
  }
  /**
   * 注册组件 组件列表config.plugins
   */
  _registerPlugins () {
    this._loadingPlugins = []
    const ignores = this.config.ignores || []
    const plugins = this.config.plugins || []
    const ignoresStr = ignores.join('||').toLowerCase().split('||');
    plugins.map(plugin => {
      try {
        const pluginName = plugin.plugin ? plugin.plugin.pluginName : plugin.pluginName
        // 在ignores中的不做组装
        if (pluginName && ignoresStr.indexOf(pluginName.toLowerCase()) > -1) {
          return null
        }
        if (plugin.lazy && plugin.loader) {
          const loadingPlugin = pluginsManager.lazyRegister(this, plugin)
          if (plugin.forceBeforeInit) {
            loadingPlugin.then(() => {
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1);
            }).catch(() => {
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1);
            })
            this._loadingPlugins.push(loadingPlugin)
          }

          return;
        }
        return this.registerPlugin(plugin)
      } catch (err) {
        console.error(err)
        return null
      }
    })
  }

  _registerPresets () {
    this.config.presets.forEach((preset) => {
      usePreset(this, preset)
    })
  }

  registerPlugin (plugin) {
    let PLUFGIN = null
    let options = null
    if (plugin.plugin && typeof plugin.plugin === 'function') {
      PLUFGIN = plugin.plugin
      options = plugin.options
    } else {
      PLUFGIN = plugin
      options = {}
    }

    for (const item of Object.keys(this.config)) {
      if (PLUFGIN.pluginName.toLowerCase() === item.toLowerCase()) {
        options.config = Object.assign({}, options.config, this.config[item])
        break;
      }
    }

    const position = options.position ? options.position : (options.config && options.config.position) || (PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position)
    const {POSITIONS} = Plugin
    if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
      return this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName)
    }
    switch (position) {
      case POSITIONS.ROOT_RIGHT:
        options.root = this.rightBar
        break;
      case POSITIONS.ROOT_LEFT:
        options.root = this.leftBar
        break;
      case POSITIONS.ROOT_TOP:
        options.root = this.topBar
        break;
      default:
        options.root = this.root
        break;
    }
    return pluginsManager.register(this, PLUFGIN, options)
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
    if (!Util.hasClass(this.root, className)) {
      Util.addClass(this.root, className)
    }
  }

  removeClass (className) {
    if (!this.root) {
      return;
    }
    Util.removeClass(this.root, className)
  }

  setAttribute (key, value) {
    if (!this.root) {
      return;
    }
    this.root.setAttribute(key, value)
  }

  removeAttribute (key, value) {
    if (!this.root) {
      return;
    }
    this.root.removeAttribute(key, value)
  }

  start (url) {
    // 已经开始初始化播放了 则直接调用play
    if (this.hasStart) {
      return
    }
    this.hasStart = true
    return pluginsManager.beforeInit(this).then(() => {
      if (!url) {
        url = this.url || this.config.url;
      }
      const ret = this._startInit(url)
      return ret
    }).catch((e) => {
      e.fileName = 'player'
      e.lineNumber = '236'
      throw e
    })
  }

  load () {
    this.video && this.video.load()
  }

  play () {
    if (!this.hasStart) {
      this.start().then(resolve => {
        this.play()
      })
      return;
    }
    const playPromise = super.play()
    if (playPromise !== undefined && playPromise && playPromise.then) {
      playPromise.then(() => {
        console.log('>>>>playPromise.then')
        this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
        this.removeClass(STATE_CLASS.NO_START)
        this.addClass(STATE_CLASS.PLAYING)
        this.config.closePlayVideoFocus && !this.isPlaying && this.emit(Events.PLAYER_BLUR)
        this.isPlaying = true
        this.emit(Events.AUTOPLAY_STARTED)
      }).catch((e) => {
        console.log('>>>>playPromise.catch')
        // 避免AUTOPLAY_PREVENTED先于playing和play触发
        setTimeout(() => {
          this.emit(Events.AUTOPLAY_PREVENTED)
          this.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
          this.pause()
        }, 0)
        // throw e
      })
    }
    return playPromise
  }

  seek (time) {
    if (!this.video || isNaN(Number(time))) {
      return
    }
    time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time
    this.once(Events.CANPLAY, () => {
      this.isSeeking = false
      if (this.paused) {
        this.play()
      }
    })
    this.currentTime = time
  }

  reload () {
    this.load()
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
      this.removeAttribute('data-xgfill')
    }
    for (let k in this) {
      // if (k !== 'config') {
      delete this[k]
      // }
    }
  }

  replay () {
    this.removeClass(STATE_CLASS.ENDED)
    this.once(Events.CANPLAY, () => {
      const playPromise = this.play()
      if (playPromise && playPromise.catch) {
        playPromise.catch(err => {
          console.log(err)
        })
      }
    })
    this.currentTime = 0
    this.isSeeking = false
    this.play()
    this.emit(Events.REPLAY)
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
    this.addClass(STATE_CLASS.CSS_FULLSCREEN)
    if (this.config.fluid) {
      this.root.style['padding-top'] = ''
    }
    this.isCssfullScreen = true
    this.emit(Events.CSS_FULLSCREEN_CHANGE, true)
  }

  exitCssFullscreen () {
    if (this.config.fluid) {
      this.root.style['width'] = '100%'
      this.root.style['height'] = '0'
      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`
    }
    this.removeClass(STATE_CLASS.CSS_FULLSCREEN)
    this.isCssfullScreen = false
    this.emit(Events.CSS_FULLSCREEN_CHANGE, false)
  }

  onFocus (data = {autoHide: true}) {
    this.isActive = true
    this.removeClass(STATE_CLASS.ACTIVE)
    if (this.userTimer) {
      clearTimeout(this.userTimer)
    }
    if (!data.autoHide) {
      return;
    }
    this.userTimer = setTimeout(() => {
      this.emit(Events.PLAYER_BLUR)
    }, this.config.inactive)
  }

  onBlur (data = {ignoreStatus: false}) {
    if (!this.isActive) {
      return;
    }
    this.isActive = false
    if (data.ignoreStatus || (!this.paused && !this.ended)) {
      this.addClass(STATE_CLASS.ACTIVE)
    }
  }

  onPlay () {
    // this.addClass(STATE_CLASS.PLAYING)
    // this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
    this.removeClass(STATE_CLASS.PAUSED)
    this.ended && this.removeClass(STATE_CLASS.ENDED)
    !this.config.closePlayVideoFocus && this.emit(Events.PLAYER_FOCUS)
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
    this.isSeeking = true
    this.addClass(STATE_CLASS.SEEKING)
  }

  onSeeked () {
    this.isSeeking = false
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    this.removeClass(STATE_CLASS.LOADING)
    this.removeClass(STATE_CLASS.SEEKING)
    if (!this.isPlaying) {
      this.addClass(STATE_CLASS.PLAYING)
      this.isPlaying = true
    }
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
    const { NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING } = STATE_CLASS
    const clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING];
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
  }

  getVideoSize () {
    const videoWidth = this.video.videoWidth
    const videoHeight = this.video.videoHeight
    const {fitVideoSize, videoFillMode} = this.config
    if (!videoHeight || !videoWidth) {
      return
    }
    // if (!fitVideoSize || fitVideoSize === 'fixed') {
    //   return
    // }
    let containerSize = this.root.getBoundingClientRect()
    const width = containerSize.width
    const height = containerSize.height
    const videoFit = parseInt(videoWidth / videoHeight * 1000, 10)
    const fit = parseInt(width / height * 1000, 10)
    if (fitVideoSize === 'auto') {
      if (fit > videoFit) {
        this.root.style.height = `${width / videoFit * 1000}px`
      } else {
        this.root.style.width = `${videoFit * height / 1000}px`
      }
    } else if (fitVideoSize === 'fixWidth') {
      this.root.style.height = `${width / videoFit * 1000}px`
    } else if (fitVideoSize === 'fixHeight') {
      this.root.style.width = `${videoFit * height / 1000}px`
    }
    // video填充模式
    if (videoFillMode === 'fill') {
      this.setAttribute('data-xgfill', 'fill')
    } else if ((videoFillMode === 'fillHeight' && fit < videoFit) || (videoFillMode === 'fillWidth' && fit > videoFit) || videoFillMode === 'cover') {
      this.setAttribute('data-xgfill', 'cover')
    } else {
      this.removeAttribute('data-xgfill')
    }
  }

  set lang (lang) {
    this.config.lang = lang
    pluginsManager.setLang(lang, this)
  }

  get lang () {
    return this.config.lang
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
    let poster = Util.findDom(this.root, '.xgplayer-poster')
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
    return Util.findDom(this.root, 'xg-bullet') ? Util.hasClass(Util.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false
  }

  get textTrack () {
    return Util.hasClass(this.root, 'xgplayer-is-textTrack')
  }

  get pip () {
    return Util.hasClass(this.root, 'xgplayer-pip-active')
  }

  /***
   * TODO
   * 插件全部迁移完成再做删除
   */
  static install (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    if (!Player.plugins[name]) {
      Player.plugins[name] = descriptor
    }
  }

  /***
   * TODO
   * 插件全部迁移完成再做删除
   */
  static use (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }
}

Player.Util = Util
Player.Sniffer = sniffer
Player.Errors = Errors
Player.Events = Events
Player.Plugin = Plugin
Player.BasePlugin = BasePlugin
export default Player
