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
import XG_DEBUG, {bindDebug} from './utils/debug'

import {
  version
} from '../package.json'
import I18N from './lang'
/* eslint-disable camelcase */
const PlAYER_HOOKS = ['play']

class Player extends Proxy {
  constructor (options) {
    const config = Util.deepMerge(getDefaultConfig(), options)
    super(config)
    hooksDescriptor(this)
    PlAYER_HOOKS.map(item => {
      this.__hooks[item] = null
    })
    this.config = config
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
    this.isActive = false
    this.isCssfullScreen = false
    this.fullscreen = false
    this._fullscreenEl = null
    this._originCssText = ''
    this._fullScreenOffset = null
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

    Util.setTimeout(this, () => {
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
    this.root = this.config.id ? document.getElementById(this.config.id) : null
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
    const ret = pluginsManager.checkPlayerRoot(this.root)
    if (ret) {
      XG_DEBUG.logWarn('The is an Player instance already exists in this.root, destroy it and reinitialize')
      ret.destroy()
    }
    this._initBaseDoms();
    if (this.config.controls) {
      const controls = pluginsManager.register(this, Controls)
      this.controls = controls
    }
    const device = this.config.isMobileSimulateMode ? 'mobile' : Sniffer.device;
    this.addClass(`${STATE_CLASS.DEFAULT} ${STATE_CLASS.ACTIVE} xgplayer-${device} ${this.config.controls ? '' : STATE_CLASS.NO_CONTROLS}`);
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

  _initBaseDoms () {
    this.topBar = Util.createDom('xg-bar', '', {'data-index': -1}, 'xg-top-bar');
    this.leftBar = Util.createDom('xg-bar', '', {'data-index': -1}, 'xg-left-bar');
    this.rightBar = Util.createDom('xg-bar', '', {'data-index': -1}, 'xg-right-bar');
    if (this.config.marginControls) {
      this.innerContainer = Util.createDom('xg-video-container', '', {'data-index': -1}, 'xg-video-container');
      this.root.appendChild(this.innerContainer);
    }
    this.root.appendChild(this.topBar);
    this.root.appendChild(this.leftBar);
    this.root.appendChild(this.rightBar);
  }

  _bindEvents () {
    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    });
    const resetFullState = () => {
      this.fullscreen = false
      this._fullScreenOffset = null
      this._fullscreenEl = null
    }

    this.onFullscreenChange = (event, isFullScreen) => {
      const fullEl = Util.getFullScreenEl()
      if (isFullScreen || (fullEl && (fullEl === this._fullscreenEl || fullEl.tagName === 'VIDEO'))) {
        this.fullscreen = true
        this.addClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, true, this._fullScreenOffset)
        if (this.isCssfullScreen) {
          this.exitCssFullscreen()
        }
      } else if (this.fullscreen) {
        const {_fullScreenOffset, config} = this
        if (config.needFullsreenScroll) {
          try {
            window.scrollTo(_fullScreenOffset.left, _fullScreenOffset.top)
            Util.setTimeout(this, () => {
              resetFullState()
            }, 100)
          } catch (e) {
            XG_DEBUG.logError(e)
            resetFullState()
          }
        } else {
          // 保证页面scroll的情况下退出全屏 页面定位在播放器位置
          this.video.focus()
          resetFullState()
        }
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
    if (Sniffer.os.isIos) {
      this.video.addEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen)
      this.video.addEventListener('webkitendfullscreen', this.__webkitendfullscreen)
    }
    this.once('loadeddata', this.getVideoSize)

    this.playFunc = () => {
      if (!this.config.closeFocusVideoFocus) {
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
    const {root, innerContainer} = this
    if (!url || url === '') {
      this.emit(Events.URL_NULL)
      XG_DEBUG.logWarn('config.url is null, please get url and run player._startInit(url)')
      if (this.config.nullUrlStart) {
        return
      }
    }
    this.canPlayFunc = () => {
      if (!this.config) {
        return
      }
      const {autoplay, startTime, volume} = this.config
      XG_DEBUG.logInfo('player', 'canPlayFunc', startTime)
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

    if (innerContainer) {
      innerContainer.firstChild !== this.video && this.innerContainer.insertBefore(this.video, this.innerContainer.firstChild)
    } else {
      root.firstChild !== this.video && root.insertBefore(this.video, root.firstChild)
    }

    this.once(Events.CANPLAY, this.canPlayFunc)
    XG_DEBUG.logInfo('_startInit')
    if (this.config.autoplay) {
      this.load()
      // ios端无法自动播放的场景下，不调用play不会触发canplay loadeddata等事件
      Sniffer.os.isPhone && this.videoPlay()
    }

    Util.setTimeout(this, () => {
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
              XG_DEBUG.logError('_registerPlugins:loadingPlugin', e)
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1);
            })
            this._loadingPlugins.push(loadingPlugin)
          }

          return;
        }
        return this.registerPlugin(plugin)
      } catch (err) {
        XG_DEBUG.logError('_registerPlugins:', err)
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

    // 获取配置的position或者root
    const keys = Object.keys(this.config)
    for (let i = 0; i < keys.length; i++) {
      if (PLUFGIN.pluginName.toLowerCase() === keys[i].toLowerCase()) {
        const _pConfig = this.config[keys[i]]
        if (Util.typeOf(_pConfig) === 'Object') {
          _pConfig.root && (options.root = _pConfig.root)
          _pConfig.position && (options.position = _pConfig.position)
        }
        break;
      }
    }

    const position = options.position ? options.position : (options.config && options.config.position) || (PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position)
    const {POSITIONS} = Plugin
    if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
      return this.controls && this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName)
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
          options.root = this.innerContainer || this.root
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
      // this.config为空即已经销毁，不再执行后面的异步流程
      if (!this.config) {
        return
      }
      if (!url) {
        url = this.url || this.config.url;
      }
      const ret = this._startInit(url)
      return ret
    }).catch((e) => {
      e.fileName = 'player'
      e.lineNumber = '236'
      XG_DEBUG.logError('start:beforeInit:', e)
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
          XG_DEBUG.logInfo('>>>>playPromise.then')
          this.isPlaying = true
          this.emit(Events.AUTOPLAY_STARTED)
        }
      }).catch((e) => {
        XG_DEBUG.logWarn('>>>>playPromise.catch', e.name)
        if (this.video && this.video.error) {
          this.onError()
          this.errorHandler('error')
          this.removeClass(STATE_CLASS.ENTER)
          return
        }
        // 避免AUTOPLAY_PREVENTED先于playing和play触发
        if (e.name === 'NotAllowedError') {
          this._errorTimer = Util.setTimeout(this, () => {
            this._errorTimer = null
            this.emit(Events.AUTOPLAY_PREVENTED)
            this.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
            this.removeClass(STATE_CLASS.ENTER)
            this.pause()
          }, 0)
        }
      })
    } else {
      XG_DEBUG.logWarn('video.play not return promise')
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
    const {isSeekedPlay, seekedStatus} = this.config
    let _status = isSeekedPlay ? 'play' : seekedStatus
    time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time
    this.once(Events.CANPLAY, () => {
      this.removeClass(STATE_CLASS.ENTER)
      this.isSeeking = false
      switch (_status) {
        case 'play':
          this.play()
          break
        case 'pause':
          this.pause()
          break
        default:
          !this.paused && this.play()
      }
    })
    if (!this.isPlaying) {
      this.removeClass(STATE_CLASS.NO_START)
      this.addClass(STATE_CLASS.ENTER)
      this.currentTime = time;
      _status === 'play' && this.play()
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

  resetClasses () {
    const { NOT_ALLOW_AUTOPLAY, PLAYING, NO_START, PAUSED, REPLAY, ENTER, ENDED, ERROR } = STATE_CLASS
    const clsList = [NOT_ALLOW_AUTOPLAY, PLAYING, NO_START, PAUSED, REPLAY, ENTER, ENDED, ERROR];
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
  }

  destroy (isDelDom = true) {
    const {innerContainer, root, video} = this
    if (!root) {
      return
    }
    this._unbindEvents()
    // clearTimeout(this.waitTimer)
    // clearTimeout(this._errorTimer)
    Util.clearAllTimers(this)
    pluginsManager.destroy(this)
    root.removeChild(this.topBar)
    root.removeChild(this.leftBar)
    root.removeChild(this.rightBar)
    super.destroy()
    if (innerContainer) {
      const _c = innerContainer.children
      for (let i = 0; i < _c.length; i++) {
        innerContainer.removeChild(_c[i])
      }
      root.removeChild(innerContainer)
    } else {
      root.contains(video) && root.removeChild(video)
    }
    if (isDelDom) {
      let classNameList = this.root.className.split(' ')
      if (classNameList.length > 0) {
        root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ')
      } else {
        root.className = ''
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
    this.pause()
    this.src = this.config.url
    this.currentTime = cur
    this.play()
  }

  getFullscreen (el) {
    const {root, video} = this
    if (!el) {
      el = root
    }
    this._fullScreenOffset = {
      top: Util.scrollTop(),
      left: Util.scrollLeft()
    }
    if (root.getAttribute('style')) {
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
    if (!this._fullscreenEl) {
      return
    }
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

  onFocus (data = {autoHide: true, delay: 0}) {
    this.isActive = true
    this.removeClass(STATE_CLASS.ACTIVE)
    if (this.userTimer) {
      Util.clearTimeout(this, this.userTimer)
    }
    if (data.autoHide === false) {
      return;
    }
    const time = data && data.delay ? data.delay : this.config.inactive
    this.userTimer = Util.setTimeout(this, () => {
      this.emit(Events.PLAYER_BLUR)
    }, time)
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
    if (this.config.closePauseVideoFocus) {
      if (this.userTimer) {
        Util.clearTimeout(this, this.userTimer)
      }
      this.emit(Events.PLAYER_FOCUS)
    }
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
      Util.clearTimeout(this, this.waitTimer)
    }
    this.removeClass(STATE_CLASS.LOADING)
    this.removeClass(STATE_CLASS.SEEKING)
  }

  onWaiting () {
    if (this.waitTimer) {
      Util.clearTimeout(this, this.waitTimer)
    }
    this.waitTimer = Util.setTimeout(this, () => {
      this.addClass(STATE_CLASS.LOADING)
      Util.clearTimeout(this, this.waitTimer)
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
        Util.clearTimeout(this, this.waitTimer)
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
    if (!buffered || buffered.length === 0) {
      return true
    }
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
    const controlsHeight = this.controls && this.innerContainer ? this.controls.root.getBoundingClientRect().height : 0
    const width = containerSize.width
    const height = containerSize.height - controlsHeight
    const videoFit = parseInt(videoWidth / videoHeight * 1000, 10)
    const fit = parseInt(width / height * 1000, 10)
    let rWidth = width;
    let rHeight = height;
    if ((fitVideoSize === 'auto' && fit > videoFit) || fitVideoSize === 'fixWidth') {
      rHeight = width / videoFit * 1000
      this.root.style.height = `${rHeight + controlsHeight}px`
    } else if ((fitVideoSize === 'auto' && fit < videoFit) || fitVideoSize === 'fixHeight') {
      rWidth = videoFit * height / 1000
      this.root.style.width = `${rWidth}px`
    }
    // video填充模式
    if ((videoFillMode === 'fillHeight' && fit < videoFit) || (videoFillMode === 'fillWidth' && fit > videoFit)) {
      this.setAttribute('data-xgfill', 'cover')
    }
    this.emit(Events.VIDEO_RESIZE, {videoScale: videoFit, vWidth: rWidth, vHeight: rHeight, cWidth: rWidth, cHeight: rHeight + controlsHeight})
  }

  updateObjectPosition (left = 0, top = 0) {
    if (this.video.updateObjectPosition) {
      this.video.updateObjectPosition(left, top);
      return;
    }
    this.video.style.objectPosition = `${left * 100}% ${top * 100}%`;
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
    this.plugins.poster && this.plugins.poster.update(posterUrl)
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

  get fullscreenChanging () {
    return !(this._fullScreenOffset === null)
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
