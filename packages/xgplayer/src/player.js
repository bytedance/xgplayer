import Proxy from './proxy'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Database from './utils/database'
import Errors from './error'
import * as Events from './events'
import {FULLSCREEN_EVENTS, GET_FULLSCREEN_API, EXIT_FULLSCREEN_API} from './constant'
import Plugin, {pluginsManager, BasePlugin} from './plugin'
import STATE_CLASS from './stateClassMap'
import getDefaultConfig from './defaultConfig'
import { usePreset } from './plugin/preset';
import hooksDescriptor from './plugin/hooksDescriptor'
import Controls from './plugins/controls'
import {bindDebug} from './utils/debug'

import {
  version
} from '../package.json'
import I18N from './lang'
const PlAYER_HOOKS = ['play']

class Player extends Proxy {
  constructor (options) {
    super(options)
    hooksDescriptor(this)
    PlAYER_HOOKS.map(item => {
      this.__hooks[item] = null
    })
    this.config = Util.deepMerge(getDefaultConfig(), options)
    bindDebug(this)
    // resolve default preset
    if (this.config.presets.length) {
      const defaultIdx = this.config.presets.indexOf('default')
      if (defaultIdx >= 0 && Player.defaultPreset) {
        this.config.presets[defaultIdx] = Player.defaultPreset;
      }
    } else if (Player.defaultPreset) {
      this.config.presets.push(Player.defaultPreset)
    }

    // timer and flags
    this.userTimer = null
    this.waitTimer = null
    this.isReady = false
    // 是否进入正常播放流程
    this.isPlaying = false
    // 是否处于seeking进行状态
    this.isSeeking = false
    this.isCanplay = false
    this._runPending = false
    this.rotateDeg = 0
    // 当前是否处于焦点状态
    this.isActive = true
    this.isCssfullScreen = false
    this.fullscreen = false
    this._fullscreenEl = null
    this._originCssText = ''
    this._videoHeight = 0
    this._videoWidth = 0
    this._played = {
      begin: -1,
      end: -1,
      acc: 0
    }

    this.database = new Database()

    const rootInit = this._initDOM()
    if (!rootInit) {
      console.error(new Error(`can't find the dom which id is ${this.config.id} or this.config.el does not exist`))
      return
    }

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
    this.root = this.config.id ? Util.findDom(document, `#${this.config.id}`) : null
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
        console.error('this.confg.id or this.config.el can\'t be empty')
        return false
      }
    }
    this._initBars();
    const controls = pluginsManager.register(this, Controls)
    this.controls = controls
    this.addClass(`${STATE_CLASS.DEFAULT} xgplayer-${Sniffer.device} ${this.config.controls ? '' : STATE_CLASS.NO_CONTROLS}`);
    if (this.config.autoplay) {
      this.addClass(STATE_CLASS.ENTER)
    } else {
      this.addClass(STATE_CLASS.NO_START)
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
    return true
  }

  _initBars () {
    this.topBar = Util.createDom('xg-bar', '', {}, 'xg-top-bar');
    this.leftBar = Util.createDom('xg-bar', '', {}, 'xg-left-bar');
    this.rightBar = Util.createDom('xg-bar', '', {}, 'xg-right-bar');

    this.root.appendChild(this.topBar);
    this.root.appendChild(this.leftBar);
    this.root.appendChild(this.rightBar);
  }

  _bindEvents () {
    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    });

    // deal with the fullscreen state change callback
    this.onFullscreenChange = (e, isEnter) => {
      const fullEl = Util.getFullScreenEl()
      if (isEnter || (fullEl && (fullEl === this._fullscreenEl || fullEl.tagName === 'VIDEO'))) {
        this.fullscreen = true
        this.addClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, true)
        if (this.isCssfullScreen) {
          this.exitCssFullscreen()
        }
      } else {
        this.fullscreen = false
        // 保证页面scroll的情况下退出全屏 页面定位在播放器位置
        this.video.focus()
        this._fullscreenEl = null
        if (this._originCssText && !this.isCssfullScreen) {
          Util.setStyleFromCsstext(this.root, this._originCssText)
          this._originCssText = ''
        }
        this.removeClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, false)
      }
    }

    FULLSCREEN_EVENTS.forEach(item => {
      document && document.addEventListener(item, this.onFullscreenChange)
    })

    this.__webkitbeginfullscreen = (e) => {
      this._fullscreenEl = this.video
      this.onFullscreenChange(e, true)
    }
    this.__webkitendfullscreen = (e) => {
      this.onFullscreenChange(e, false)
    }

    this.video.addEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen)
    this.video.addEventListener('webkitendfullscreen', this.__webkitendfullscreen)

    this.once('loadeddata', this.getVideoSize)

    this.mousemoveFunc = () => {
      if (!this.config.closeFocusVideoFocus) {
        this.emit(Events.PLAYER_FOCUS)
      }
    }

    Sniffer.device !== 'mobile' && this.root.addEventListener('mousemove', this.mousemoveFunc)

    this.playFunc = () => {
      if (!this.config.closePlayVideoFocus) {
        this.emit(Events.PLAYER_FOCUS)
        this.video.focus()
      }
    }
    this.once('play', this.playFunc)
  }

  _unbindEvents () {
    this.root.removeEventListener('mousemove', this.mousemoveFunc);
    FULLSCREEN_EVENTS.forEach(item => {
      document.removeEventListener(item, this.onFullscreenChange)
    });
    this.playFunc && this.off('play', this.playFunc)
    this.canPlayFunc && this.off('canplay', this.canPlayFunc)
    this.video.removeEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen)
    this.video.removeEventListener('webkitendfullscreen', this.__webkitendfullscreen)
  }

  _startInit (url) {
    let root = this.root
    if (!url || url === '') {
      this.emit(Events.URL_NULL)
      this.logWarn('config.url is null, please get url and run player._startInit(url)')
      if (this.config.nullUrlStart) {
        return
      }
    }
    this.canPlayFunc = () => {
      if (!this.config) {
        return
      }
      const {autoplay, startTime, volume} = this.config
      this.logInfo('player', 'canPlayFunc', startTime)
      this.volume = typeof volume === 'number' ? volume : 0.6
      if (startTime) {
        this.currentTime = startTime > this.duration ? this.duration : startTime
      }
      autoplay && this.videoPlay()
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

    this.once(Events.CANPLAY, this.canPlayFunc)
    this.logInfo('_startInit')
    if (this.config.autoplay) {
      this.load()
      // ios端无法自动播放的场景下，不调用play不会触发canplay loadeddata等事件
      Sniffer.os.isPhone && this.videoPlay()
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
            }).catch((e) => {
              this.logError('_registerPlugins:loadingPlugin', e)
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1);
            })
            this._loadingPlugins.push(loadingPlugin)
          }

          return;
        }
        return this.registerPlugin(plugin)
      } catch (err) {
        this.logError('_registerPlugins:', err)
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
    if (!options.root) {
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
    }
    return pluginsManager.register(this, PLUFGIN, options)
  }

  unRegisterPlugin (plugin) {
    if (typeof plugin === 'string') {
      pluginsManager.unRegister(this, plugin)
    } else if (plugin instanceof BasePlugin) {
      pluginsManager.unRegister(this, plugin.pluginName)
    }
  }

  /**
   * 当前播放器挂在的插件实例代码
   */
  get plugins () {
    return pluginsManager.getPlugins(this)
  }

  getPlugin (pluginName) {
    const plugin = pluginsManager.findPlugin(this, pluginName)
    return plugin && plugin.pluginName ? plugin : null
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

  hasClass (className) {
    if (!this.root) {
      return;
    }
    return Util.hasClass(this.root, className)
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
      this.logError('start:beforeInit:', e)
      throw e
    })
  }

  load () {
    this.video && this.video.load()
  }

  videoPlay () {
    if (!this.hasStart) {
      this.removeClass(STATE_CLASS.NO_START)
      this.addClass(STATE_CLASS.ENTER)
      this.start().then(resolve => {
        !this.config.autoplay && this.videoPlay()
      })
      return
    }
    if (!this.isPlaying) {
      this.removeClass(STATE_CLASS.NO_START)
      !this.isCanplay && this.addClass(STATE_CLASS.ENTER)
    }
    const playPromise = super.play()
    if (playPromise !== undefined && playPromise && playPromise.then) {
      playPromise.then(() => {
        this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
        this.addClass(STATE_CLASS.PLAYING)
        if (!this.isPlaying) {
          this.config.closePlayVideoFocus && this.emit(Events.PLAYER_BLUR)
          this.logInfo('>>>>playPromise.then')
          this.isPlaying = true
          this.emit(Events.AUTOPLAY_STARTED)
        }
      }).catch((e) => {
        this.logWarn('>>>>playPromise.catch', e.name)
        if (this.video.error) {
          this.onError()
          this.errorHandler('error')
          this.removeClass(STATE_CLASS.ENTER)
          return
        }
        // 避免AUTOPLAY_PREVENTED先于playing和play触发
        if (e.name === 'NotAllowedError') {
          setTimeout(() => {
            this.emit(Events.AUTOPLAY_PREVENTED)
            this.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
            this.removeClass(STATE_CLASS.ENTER)
            this.pause()
          }, 0)
        }
      })
    } else {
      this.logWarn('video.play not return promise')
      if (!this.isPlaying) {
        this.isPlaying = true
        this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
        this.removeClass(STATE_CLASS.NO_START)
        this.removeClass(STATE_CLASS.ENTER)
        this.addClass(STATE_CLASS.PLAYING)
        this.emit(Events.AUTOPLAY_STARTED)
      }
    }
    return playPromise
  }

  play () {
    this.removeClass(STATE_CLASS.PAUSED)
    const {__hooks} = this
    if (__hooks && __hooks.play) {
      const ret = __hooks.play.call(this)
      if (ret && ret.then) {
        ret.then(() => {
          return this.videoPlay()
        }).catch(e => {
          return this.videoPlay()
        })
      } else {
        return this.videoPlay()
      }
    } else {
      return this.videoPlay()
    }
  }

  seek (time) {
    if (!this.video || isNaN(Number(time))) {
      return
    }
    const {isSeekedPlay} = this.config
    time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time
    this.once(Events.CANPLAY, () => {
      this.removeClass(STATE_CLASS.ENTER)
      this.isSeeking = false
      if (isSeekedPlay && this.paused) {
        this.play()
      }
    })
    if (!this.isPlaying) {
      this.removeClass(STATE_CLASS.NO_START)
      this.addClass(STATE_CLASS.ENTER)
      this.currentTime = time
      isSeekedPlay && this.play()
    } else {
      this.currentTime = time
    }
  }

  reload () {
    this.load()
    this.reloadFunc = function () {
      this.play().catch(err => { console.log(err) })
    }
    this.once('loadeddata', this.reloadFunc)
  }

  destroy (isDelDom = true) {
    if (!this.root) {
      return
    }
    this._unbindEvents()
    pluginsManager.destroy(this)
    this.root.removeChild(this.topBar)
    this.root.removeChild(this.leftBar)
    this.root.removeChild(this.rightBar)
    super.destroy()
    this.hasStart && this.root.removeChild(this.video)
    if (isDelDom) {
      let classNameList = this.root.className.split(' ')
      if (classNameList.length > 0) {
        this.root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ')
      } else {
        this.root.className = ''
      }
      this.removeAttribute('data-xgfill')
    }
    for (let k in this) {
      delete this[k]
    }
    Object.setPrototypeOf && Object.setPrototypeOf(this, null)
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
    this.onPlay()
  }

  retry () {
    this.removeClass(STATE_CLASS.ERROR)
    this.addClass(STATE_CLASS.LOADING)
    const cur = this.currentTime
    this.video.pause()
    this.src = this.config.url
    this.currentTime = cur
    this.video.play()
  }

  getFullscreen (el) {
    const {root, video} = this
    if (!el) {
      el = root
    }
    if (!Sniffer.os.isPhone && root.getAttribute('style')) {
      this._originCssText = root.style.cssText
      root.removeAttribute('style')
    }
    this._fullscreenEl = el
    for (let i = 0; i < GET_FULLSCREEN_API.length; i++) {
      const key = GET_FULLSCREEN_API[i]
      if (el[key]) {
        const ret = key === 'webkitRequestFullscreen' ? el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT) : el[key]()
        if (ret && ret.then) {
          return ret
        } else {
          return Promise.resolve()
        }
      }
    }
    if (video.fullscreenEnabled || video.webkitSupportsFullscreen) {
      video.webkitEnterFullscreen()
      return Promise.resolve()
    }
    return Promise.reject(new Error('call getFullscreen fail'))
  }

  exitFullscreen (el) {
    const {root, video} = this
    if (el) {
      el = root
    }
    for (let i = 0; i < EXIT_FULLSCREEN_API.length; i++) {
      const key = EXIT_FULLSCREEN_API[i]
      if (document[key]) {
        const ret = document[key]()
        if (ret && ret.then) {
          return ret
        } else {
          return Promise.resolve()
        }
      }
    }
    if (video && video.webkitSupportsFullscreen) {
      video.webkitExitFullScreen()
      return Promise.resolve()
    }
    return Promise.reject(new Error('call exitFullscreen fail'))
  }

  getCssFullscreen () {
    this.addClass(STATE_CLASS.CSS_FULLSCREEN)
    if (this.root.getAttribute('style')) {
      this._originCssText = this.root.style.cssText
      this.root.removeAttribute('style')
    }
    this.isCssfullScreen = true
    this.emit(Events.CSS_FULLSCREEN_CHANGE, true)
    if (this.fullscreen) {
      this.exitFullscreen()
    }
  }

  exitCssFullscreen () {
    this.removeClass(STATE_CLASS.CSS_FULLSCREEN)
    if (!this.fullscreen) {
      this._originCssText && Util.setStyleFromCsstext(this.root, this._originCssText)
      this._originCssText = ''
    }
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
    const {closePauseVideoFocus} = this.config
    this.isActive = false
    if (data.ignoreStatus || closePauseVideoFocus || (!this.paused && !this.ended)) {
      this.addClass(STATE_CLASS.ACTIVE)
    }
  }

  onCanplay () {
    this.removeClass(STATE_CLASS.ENTER)
    this.isCanplay = true
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
    !this.config.closePauseVideoFocus && this.emit(Events.PLAYER_FOCUS)
  }

  onEnded () {
    this.addClass(STATE_CLASS.ENDED)
    // this.removeClass(STATE_CLASS.PLAYING)
  }

  onError () {
    this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
    this.removeClass(STATE_CLASS.NO_START)
    this.removeClass(STATE_CLASS.ENTER)
    this.addClass(STATE_CLASS.ERROR)
  }

  onSeeking () {
    if (!this.isSeeking) {
      const {_played} = this
      _played.acc += _played.begin < _played.end && _played.end > -1 ? _played.end - _played.begin : 0
      _played.begin = parseInt(this.video.currentTime * 1000, 10);
      _played.end = -1
    }
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
  }

  onWaiting () {
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    this.waitTimer = setTimeout(() => {
      this.addClass(STATE_CLASS.LOADING)
      clearTimeout(this.waitTimer)
      this.waitTimer = null
    }, 500)
  }

  onPlaying () {
    const { NO_START, PAUSED, ENDED, ERROR, REPLAY } = STATE_CLASS
    const clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY];
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
  }

  onTimeupdate () {
    !this._videoHeight && this.getVideoSize()
    if (this.waitTimer || this.hasClass(STATE_CLASS.LOADING)) {
      if (this.checkBuffer()) {
        this.removeClass(STATE_CLASS.LOADING)
        clearTimeout(this.waitTimer)
        this.waitTimer = null
      }
    }

    if (this._played.begin < 0) {
      this._played.begin = parseInt(this.video.currentTime * 1000, 10)
    }
    this._played.end = parseInt(this.video.currentTime * 1000, 10)
  }

  checkBuffer (time) {
    const buffered = this.video.buffered
    const currentTime = time || (this.video.currentTime + 0.2)
    const len = buffered.length
    for (let i = 0; i < len; i++) {
      if (buffered.start(i) <= currentTime && buffered.end(i) > currentTime) {
        return true
      }
    }
    return false
  }

  getVideoSize () {
    const videoWidth = this.video.videoWidth
    const videoHeight = this.video.videoHeight
    const {fitVideoSize, videoFillMode} = this.config

    if (videoFillMode === 'fill' || videoFillMode === 'cover') {
      this.setAttribute('data-xgfill', videoFillMode)
    }

    if (!videoHeight || !videoWidth) {
      return
    }
    this._videoHeight = videoHeight
    this._videoWidth = videoWidth
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
    if ((videoFillMode === 'fillHeight' && fit < videoFit) || (videoFillMode === 'fillWidth' && fit > videoFit)) {
      this.setAttribute('data-xgfill', 'cover')
    }
  }

  set lang (lang) {
    const result = I18N.langKeys.filter(key => key === lang)
    if (result.length === 0 && lang !== 'zh') {
      console.error(`Sorry, set lang fail, because the language [${lang}] is not supported now, list of all supported languages is [${I18N.langKeys.join()}] `)
      return
    }
    this.config.lang = lang
    pluginsManager.setLang(lang, this)
  }

  get lang () {
    return this.config.lang
  }

  get i18n () {
    const {lang} = this.config
    return I18N.lang[lang] || {}
  }

  get i18nKeys () {
    return I18N.textKeys || {}
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

  get readyState () {
    const key = super.readyState
    return this.i18n[key] || key
  }

  get error () {
    const key = super.error
    return this.i18n[key] || key
  }

  get networkState () {
    const key = super.networkState
    return this.i18n[key] || key
  }

  get cumulateTime () {
    const {acc, end, begin} = this._played
    return begin > -1 && end > begin ? (acc + end - begin) / 1000 : acc / 1000
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
Player.Sniffer = Sniffer
Player.Errors = Errors
Player.Events = Events
Player.Plugin = Plugin
Player.BasePlugin = BasePlugin
Player.I18N = I18N

export {
  Player as default,
  BasePlugin,
  Plugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N
}
