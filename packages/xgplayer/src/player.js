import VideoProxy from './proxy'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Database from './utils/database'
import Errors from './error'
import * as Events from './events'
import { FULLSCREEN_EVENTS, GET_FULLSCREEN_API, EXIT_FULLSCREEN_API } from './constant'
import Plugin, { pluginsManager, BasePlugin } from './plugin'
import STATE_CLASS from './stateClassMap'
import getDefaultConfig from './defaultConfig'
import { usePreset } from './plugin/preset'
import hooksDescriptor, { runHooks, useHooks, usePluginHooks, hook } from './plugin/hooksDescriptor'
import Controls from './plugins/controls'
import XG_DEBUG, { bindDebug } from './utils/debug'

import I18N from './lang'
import version from './version'

/* eslint-disable camelcase */
const PlAYER_HOOKS = ['play', 'pause', 'replay', 'retry']

/**
 * @constructor
 */
class Player extends VideoProxy {
  /**
   * @constructor
   * @param { IPlayerOptions } options
   * @returns
   */
  constructor (options) {
    const config = Util.deepMerge(getDefaultConfig(), options)
    super(config)
    hooksDescriptor(this)
    PlAYER_HOOKS.map(item => {
      this.__hooks[item] = null
    })

    /**
     * @type { IPlayerOptions }
     * @description 当前播放器的配置信息
     */
    this.config = config
    bindDebug(this)
    // resolve default preset
    const defaultPreset = this.constructor.defaultPreset
    if (this.config.presets.length) {
      const defaultIdx = this.config.presets.indexOf('default')
      if (defaultIdx >= 0 && defaultPreset) {
        this.config.presets[defaultIdx] = defaultPreset
      }
    } else if (defaultPreset) {
      this.config.presets.push(defaultPreset)
    }

    // timer and flags
    /**
     * @private
     */
    this.userTimer = null
    /**
     * @private
     */
    this.waitTimer = null
    /**
     * @type { boolean }
     * @readonly
     */
    this.isReady = false

    /**
     * Whether the player is real start state
     * @type { boolean }
     * @readonly
     */
    this.isPlaying = false

    /**
     * Whether the player is in the seeking state
     * @type { boolean }
     * @readonly
     */
    this.isSeeking = false

    /**
     * @type { boolean }
     * @readonly
     */
    this.isCanplay = false
    /**
     * @private
     * @readonly
     */
    this._runPending = false
    /**
     *  @type { number }
     */
    this.rotateDeg = 0
    /**
     * Whether the player is focus
     * @type { boolean }
     * @readonly
     */
    this.isActive = false

    /**
     * @type { boolean }
     * @readonly
     */
    this.isCssfullScreen = false

    /**
     * Whether player is currently in fullscreen
     * @type { boolean }
     * @readonly
     */
    this.fullscreen = false
    /**
     * fullscreenElement
     * @type { HTMLElement | null }
     * @readonly
     */
    this._fullscreenEl = null

    /**
     * cssFullscreen target Element
     * @type { HTMLElement | null }
     * @readonly
     */
    this._cssfullscreenEl = null

    /**
     * @private
     * @type { string }
     */
    this._orgCss = ''
    /**
     * @readonly
     * @type { number }
     */
    this._fullScreenOffset = null
    /**
     * @private
     * @type { number }
     */
    this._videoHeight = 0
    /**
     * @private
     * @type { number }
     */
    this._videoWidth = 0
    /**
     * @private
     * @type { { begin: number, end:number, acc: number } }
     */
    this._played = {
      begin: -1,
      end: -1,
      acc: 0
    }

    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description  控制栏和video不同布局的时候内部容器
     */
    this.innerContainer = null

    /**
     * @type { null | Object }
     * @readonly
     * @description 控制栏插件
     */
    this.controls = null

    /**
     * @type { null | HTMLElement }
     * @readonly
     */
    this.topBar = null

    /**
     * @type { null | HTMLElement }
     * @readonly
     */
    this.topBar = null

    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description 当前播放器根节点
     */
    this.root = null

    // android 6以下不支持自动播放
    if (Sniffer.os.isAndroid && Sniffer.osVersion > 0 && Sniffer.osVersion < 6) {
      this.config.autoplay = false
    }
    /**
     * @readonly
     * @type {any}
     */
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
      const el = this.config.el
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
    this._initBaseDoms()

    // 允许自定义video对象的构造
    const XgVideoProxy = this.constructor.XgVideoProxy
    if (XgVideoProxy && this.videoConfig.mediaType === XgVideoProxy.mediaType) {
      const el = this.innerContainer || this.root
      this.detachVideoEvents(this.video)
      const _nVideo = new XgVideoProxy(el, this.config, this.videoConfig)
      this.attachVideoEvents(_nVideo)
      this.video = _nVideo
    }
    if (this.config.controls) {
      const controls = pluginsManager.register(this, Controls)
      this.controls = controls
    }
    const device = this.config.isMobileSimulateMode ? 'mobile' : Sniffer.device
    this.addClass(`${STATE_CLASS.DEFAULT} ${STATE_CLASS.ACTIVE} xgplayer-${device} ${this.config.controls ? '' : STATE_CLASS.NO_CONTROLS}`)
    if (this.config.autoplay) {
      this.addClass(STATE_CLASS.ENTER)
    } else {
      this.addClass(STATE_CLASS.NO_START)
    }
    if (this.config.fluid) {
      const style = {
        'max-width': '100%',
        width: '100%',
        height: '0',
        'padding-top': `${this.config.height * 100 / this.config.width}%`,
        position: 'position',
        top: '0',
        left: '0'
      }
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

  /**
   * @private
   */
  _initBaseDoms () {
    /**
     * @readonly
     * @type { HTMLElement }
     */
    this.topBar = Util.createDom('xg-bar', '', { 'data-index': -1 }, 'xg-top-bar')
    /**
     * @readonly
     * @type { HTMLElement }
     */
    this.leftBar = Util.createDom('xg-bar', '', { 'data-index': -1 }, 'xg-left-bar')
    /**
     * @readonly
     * @type { HTMLElement }
     */
    this.rightBar = Util.createDom('xg-bar', '', { 'data-index': -1 }, 'xg-right-bar')
    if (this.config.marginControls) {
      this.innerContainer = Util.createDom('xg-video-container', '', { 'data-index': -1 }, 'xg-video-container')
      this.root.appendChild(this.innerContainer)
    }
    this.root.appendChild(this.topBar)
    this.root.appendChild(this.leftBar)
    this.root.appendChild(this.rightBar)
  }

  /**
   * @private
   */
  _bindEvents () {
    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    const resetFullState = () => {
      this.fullscreen = false
      this._fullScreenOffset = null
    }
    /**
     * @private
     */
    this.onFullscreenChange = (event, isFullScreen) => {
      const fullEl = Util.getFullScreenEl()
      if (this._fullActionFrom) {
        this._fullActionFrom = ''
      } else {
        // 快捷键触发
        this.emit(Events.USER_ACTION, {
          eventType: 'system',
          action: 'switch_fullscreen',
          pluginName: 'player',
          currentTime: this.currentTime,
          duration: this.duration,
          fullscreen: this.fullscreen
        })
      }
      if (isFullScreen || (fullEl && (fullEl === this._fullscreenEl || fullEl.tagName === 'VIDEO'))) {
        this.video.focus()
        this.fullscreen = true
        // this.addClass(STATE_CLASS.FULLSCREEN)
        this.changeFullStyle(this.root, fullEl, STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, true, this._fullScreenOffset)
        if (this.isCssfullScreen) {
          this.exitCssFullscreen()
        }
      } else if (this.fullscreen) {
        const { _fullScreenOffset, config } = this
        if (config.needFullscreenScroll) {
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
        if (!this.isCssfullScreen) {
          this.recoverFullStyle(this.root, this._fullscreenEl, STATE_CLASS.FULLSCREEN)
        } else {
          this.removeClass(STATE_CLASS.FULLSCREEN)
        }
        this._fullscreenEl = null
        // this.removeClass(STATE_CLASS.FULLSCREEN)
        this.emit(Events.FULLSCREEN_CHANGE, false)
      }
    }

    FULLSCREEN_EVENTS.forEach(item => {
      document && document.addEventListener(item, this.onFullscreenChange)
    })
    /**
     * @private
     */
    this.__webkitbeginfullscreen = (e) => {
      this._fullscreenEl = this.video
      this.onFullscreenChange(e, true)
    }
    /**
     * @private
     */
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

  /**
   * @private
   */
  _unbindEvents () {
    this.root.removeEventListener('mousemove', this.mousemoveFunc)
    FULLSCREEN_EVENTS.forEach(item => {
      document.removeEventListener(item, this.onFullscreenChange)
    })
    this.playFunc && this.off('play', this.playFunc)
    this.canPlayFunc && this.off('canplay', this.canPlayFunc)
    this.video.removeEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen)
    this.video.removeEventListener('webkitendfullscreen', this.__webkitendfullscreen)
  }

  /**
   *
   * @param { any } url
   * @returns
   */
  _startInit (url) {
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
      const { autoplay, startTime, volume, defaultPlaybackRate } = this.config
      XG_DEBUG.logInfo('player', 'canPlayFunc', startTime)
      if (Util.typeOf(volume) === 'Number') {
        this.volume = volume
      }
      if (startTime) {
        this.currentTime = startTime > this.duration ? this.duration : startTime
      }
      if (defaultPlaybackRate !== 1) {
        this.playbackRate = defaultPlaybackRate
      }
      autoplay && this.videoPlay()
      this.off(Events.CANPLAY, this.canPlayFunc)
      this.removeClass(STATE_CLASS.ENTER)
    }

    if (Util.typeOf(url) === 'Array') {
      url.forEach(item => {
        this.video.appendChild(Util.createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        }))
      })
      this._attachSourceEvents(this.video)
    } else {
      this.video.src = url
    }

    this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc)
    const _root = this.innerContainer ? this.innerContainer : this.root
    if (this.video instanceof window.Element && !_root.contains(this.video)) {
      _root.insertBefore(this.video, _root.firstChild)
    }

    if (this.video.readyState >= 2) {
      this.canPlayFunc()
    } else {
      this.once(Events.CANPLAY, this.canPlayFunc)
    }

    XG_DEBUG.logInfo('_startInit')
    if (this.config.autoplay) {
      this.load();
      // ios端无法自动播放的场景下，不调用play不会触发canplay loadeddata等事件
      (Sniffer.os.isIpad || Sniffer.os.isPhone) && this.videoPlay()
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
   * 针对source列表播放方式添加错误监听
   * @doc https://stackoverflow.com/questions/47557135/html5-detect-the-type-of-error-when-trying-to-load-a-video-using-a-source-elem
   * @protected
   * @param { HTMLVideoElement | HTMLAudioElement } video
   */
  _attachSourceEvents (video) {
    const _c = video.children
    /**
     * @private
     */
    this._videoSourceCount = _c.length
    /**
     * @private
     */
    !this._sourceError && (this._sourceError = (e) => {
      this._videoSourceCount--
      if (this._videoSourceCount === 0) {
        if (this.videoEventMiddleware.error) {
          this.videoEventMiddleware.error.call(this, e, () => {
            this.errorHandler('error')
          })
        } else {
          this.errorHandler('error', { code: 4, message: 'sources load error' })
        }
      }
    })
    for (let i = 0; i < _c.length; i++) {
      _c[i].addEventListener('error', this._sourceError)
    }
  }

  /**
   * 移除source列表错误事件监听
   * @protected
   * @param { HTMLVideoElement | HTMLAudioElement } video
   */
  _detachSourceEvents (video) {
    const _c = video.children
    if (_c.length === 0 || !this._sourceError) {
      return
    }
    for (let i = 0; i < _c.length; i++) {
      _c[i].removeEventListener('error', this._sourceError)
    }
  }

  /**
   * 注册组件 组件列表config.plugins
   * @private
   */
  _registerPlugins () {
    /**
     * @private
     */
    this._loadingPlugins = []
    const ignores = this.config.ignores || []
    const plugins = this.config.plugins || []
    const i18n = this.config.i18n || []
    i18n.map(item => {
      I18N.use(item)
    })
    const ignoresStr = ignores.join('||').toLowerCase().split('||')
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
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1)
            }).catch((e) => {
              XG_DEBUG.logError('_registerPlugins:loadingPlugin', e)
              this._loadingPlugins.splice(this._loadingPlugins.indexOf(loadingPlugin), 1)
            })
            this._loadingPlugins.push(loadingPlugin)
          }

          return
        }
        return this.registerPlugin(plugin)
      } catch (err) {
        XG_DEBUG.logError('_registerPlugins:', err)
        return null
      }
    })
  }

  /**
   * @private
   */
  _registerPresets () {
    this.config.presets.forEach((preset) => {
      usePreset(this, preset)
    })
  }

  /**
   *
   * @param { {plugin: function, options:object} | function } plugin
   * @param { {[propName: string]: any;} } [config]
   * @returns { object }
   */
  registerPlugin (plugin, config) {
    let PLUFGIN = null
    let options = null
    if (plugin.plugin && typeof plugin.plugin === 'function') {
      PLUFGIN = plugin.plugin
      options = plugin.options
    } else {
      PLUFGIN = plugin
      options = {}
    }
    if (config) {
      options.config = config
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
        break
      }
    }

    const position = options.position ? options.position : (options.config && options.config.position) || (PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position)
    const { POSITIONS } = Plugin
    if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
      return this.controls && this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName)
    }
    if (!options.root) {
      switch (position) {
        case POSITIONS.ROOT_RIGHT:
          options.root = this.rightBar
          break
        case POSITIONS.ROOT_LEFT:
          options.root = this.leftBar
          break
        case POSITIONS.ROOT_TOP:
          options.root = this.topBar
          break
        default:
          options.root = this.innerContainer || this.root
          break
      }
    }
    return pluginsManager.register(this, PLUFGIN, options)
  }

  /**
   *
   * @param { object | string } plugin
   */
  unRegisterPlugin (plugin) {
    if (typeof plugin === 'string') {
      pluginsManager.unRegister(this, plugin)
    } else if (plugin instanceof BasePlugin) {
      pluginsManager.unRegister(this, plugin.pluginName)
    }
  }

  /**
   * 当前播放器挂在的插件实例代码
   * @type { {[propName: string]: any} }
   */
  get plugins () {
    return pluginsManager.getPlugins(this)
  }

  /**
   *
   * @param { string } pluginName
   * @returns { object | null }
   */
  getPlugin (pluginName) {
    const plugin = pluginsManager.findPlugin(this, pluginName)
    return plugin && plugin.pluginName ? plugin : null
  }

  /**
   *
   * @param { string } className
   */
  addClass (className) {
    if (!this.root) {
      return
    }
    if (!Util.hasClass(this.root, className)) {
      Util.addClass(this.root, className)
    }
  }

  /**
   *
   * @param { string } className
   * @returns
   */
  removeClass (className) {
    if (!this.root) {
      return
    }
    Util.removeClass(this.root, className)
  }

  /**
   *
   * @param { string } className
   * @returns { boolean }
   */
  hasClass (className) {
    if (!this.root) {
      return
    }
    return Util.hasClass(this.root, className)
  }

  /**
   *
   * @param { string } key
   * @param { any } value
   * @returns
   */
  setAttribute (key, value) {
    if (!this.root) {
      return
    }
    this.root.setAttribute(key, value)
  }

  /**
   *
   * @param { string } key
   * @param { any } value
   * @returns
   */
  removeAttribute (key, value) {
    if (!this.root) {
      return
    }
    this.root.removeAttribute(key, value)
  }

  /**
   *
   * @param { any } url
   * @returns { Promise<void> | void }
   * @description 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
   */
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
        url = this.url || this.config.url
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
          // this.errorHandler('error')
          this.removeClass(STATE_CLASS.ENTER)
          return
        }
        // 避免AUTOPLAY_PREVENTED先于playing和play触发
        if (e.name === 'NotAllowedError') {
          /**
           * @private
           */
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

  videoPause () {
    super.pause()
  }

  play () {
    this.removeClass(STATE_CLASS.PAUSED)
    runHooks(this, 'play', () => {
      this.videoPlay()
    })
  }

  pause () {
    runHooks(this, 'pause', () => {
      super.pause()
    })
  }

  /**
   *
   * @param { number } time
   * @returns
   */
  seek (time) {
    if (!this.video || isNaN(Number(time))) {
      return
    }
    const { isSeekedPlay, seekedStatus } = this.config
    const _status = isSeekedPlay ? 'play' : seekedStatus
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
      this.currentTime = time
      _status === 'play' && this.play()
    } else {
      this.currentTime = time
    }
  }

  reload () {
    this.load()
    /**
     * @private
     */
    this.reloadFunc = function () {
      this.play().catch(err => { console.log(err) })
    }
    this.once('loadeddata', this.reloadFunc)
  }

  resetClasses () {
    const { NOT_ALLOW_AUTOPLAY, PLAYING, NO_START, PAUSED, REPLAY, ENTER, ENDED, ERROR, LOADING } = STATE_CLASS
    const clsList = [NOT_ALLOW_AUTOPLAY, PLAYING, NO_START, PAUSED, REPLAY, ENTER, ENDED, ERROR, LOADING]
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
    this.addClass(STATE_CLASS.ENTER)
  }

  /**
   *
   * @param { boolean } [isDelDom=true]
   * @returns
   */
  destroy (isDelDom = true) {
    const { innerContainer, root, video } = this
    if (!root) {
      return
    }
    this._unbindEvents()
    this._detachSourceEvents(this.video)
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
      const classNameList = this.root.className.split(' ')
      if (classNameList.length > 0) {
        root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ')
      } else {
        root.className = ''
      }
      this.removeAttribute('data-xgfill')
    }
    for (const k in this) {
      delete this[k]
    }
    Object.setPrototypeOf && Object.setPrototypeOf(this, null)
  }

  replay () {
    this.removeClass(STATE_CLASS.ENDED)
    this.currentTime = 0
    this.isSeeking = false
    runHooks(this, 'replay', () => {
      this.once(Events.CANPLAY, () => {
        const playPromise = this.play()
        if (playPromise && playPromise.catch) {
          playPromise.catch(err => {
            console.log(err)
          })
        }
      })
      this.play()
      this.emit(Events.REPLAY)
      this.onPlay()
    })
  }

  retry () {
    this.removeClass(STATE_CLASS.ERROR)
    this.addClass(STATE_CLASS.LOADING)
    runHooks(this, 'retry', () => {
      const cur = this.currentTime
      this.videoPause()
      this.src = this.config.url
      !this.config.isLive && (this.currentTime = cur)
      this.once(Events.CANPLAY, () => {
        this.videoPlay()
      })
    })
  }

  /**
   *
   * @param { HTMLElement } [root]
   * @param { HTMLElement } [el]
   * @param { string } [rootClass]
   * @param { string } [pClassName]
   */
  changeFullStyle (root, el, rootClass, pClassName) {
    if (!pClassName) {
      pClassName = STATE_CLASS.PARENT_FULLSCREEN
    }
    if (root && !this._orgCss) {
      this._orgCss = Util.filterStyleFromText(root)
      Util.addClass(root, rootClass)
    }
    if (el && el !== root && !this._orgPCss) {
      /**
       * @private
       */
      this._orgPCss = Util.filterStyleFromText(el)
      Util.addClass(el, pClassName)
    }
  }

  /**
   *
   * @param { HTMLElement } [root]
   * @param { HTMLElement } [el]
   * @param { string } [rootClass]
   * @param { string } [pClassName]
   */
  recoverFullStyle (root, el, rootClass, pClassName) {
    if (!pClassName) {
      pClassName = STATE_CLASS.PARENT_FULLSCREEN
    }
    if (root && this._orgCss) {
      Util.setStyleFromCsstext(root, this._orgCss)
      this._orgCss = ''
      Util.removeClass(root, rootClass)
    }
    if (el && el !== root && this._orgPCss) {
      Util.setStyleFromCsstext(el, this._orgPCss)
      this._orgPCss = ''
      Util.removeClass(el, pClassName)
    }
  }

  /**
   * @param { HTMLElement } [el]
   * @returns { Promise<void>; }
   */
  getFullscreen (el) {
    const { root, video } = this
    if (!el) {
      el = root
    }
    this._fullScreenOffset = {
      top: Util.scrollTop(),
      left: Util.scrollLeft()
    }
    // if (root.getAttribute('style')) {
    //   this._orgCss = root.style.cssText
    //   root.removeAttribute('style')
    // }
    this._fullscreenEl = el
    /**
     * @private
     */
    this._fullActionFrom = 'get'
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

  /**
   * @param { HTMLElement } [el]
   * @returns { Promise<void>; }
   */
  exitFullscreen (el) {
    if (!this._fullscreenEl || !Util.getFullScreenEl()) {
      return
    }
    const { root, video } = this
    if (el) {
      el = root
    }
    this._fullActionFrom = 'exit'
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

  /**
   * @param { HTMLElement } [el]
   * @returns
   */
  getCssFullscreen (el) {
    if (this.fullscreen) {
      this.exitFullscreen()
    }
    this._cssfullscreenEl = el
    this.changeFullStyle(this.root, el, el ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.CSS_FULLSCREEN)
    this.isCssfullScreen = true
    this.emit(Events.CSS_FULLSCREEN_CHANGE, true)
  }

  /**
   * @param { HTMLElement } [el]
   * @returns
   */
  exitCssFullscreen () {
    if (!this.fullscreen) {
      const _class = this._cssfullscreenEl ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.CSS_FULLSCREEN
      this.recoverFullStyle(this.root, this._cssfullscreenEl, _class)
    }
    this.isCssfullScreen = false
    this.emit(Events.CSS_FULLSCREEN_CHANGE, false)
  }

  /**
   * @description 播放器焦点状态，控制栏显示
   * @param { {
   *   autoHide?: boolean, // 是否可以自动隐藏
   *   delay?: number // 自动隐藏的延迟时间，ms, 不传默认使用3000ms
   * } } [data]
   */
  focus (data = { autoHide: true, delay: 0 }) {
    if (this.isActive) {
      return
    }
    this.emit(Events.PLAYER_FOCUS, {
      paused: this.paused,
      ended: this.ended,
      ...data
    })
  }

  /**
   * @description 取消播放器当前焦点状态
   * @param { { ignorePaused?: boolean } } [data]
   */
  blur (data = { ignorePaused: false }) {
    if (!this.isActive) {
      return
    }
    this.emit(Events.PLAYER_BLUR, {
      paused: this.paused,
      ended: this.ended,
      ...data
    })
  }

  /**
   * @protected
   * @param { { autoHide?: boolean, delay?: number} } [data]
   * @returns
   */
  onFocus (data = { autoHide: true, delay: 0 }) {
    this.isActive = true
    this.removeClass(STATE_CLASS.ACTIVE)
    if (this.userTimer) {
      Util.clearTimeout(this, this.userTimer)
    }
    if (data.autoHide === false) {
      return
    }
    const time = data && data.delay ? data.delay : this.config.inactive
    this.userTimer = Util.setTimeout(this, () => {
      this.blur()
    }, time)
  }

  /**
   * @protected
   * @param {{ ignorePaused?: boolean }} [data]
   * @returns
   */
  onBlur (data = { ignorePaused: false }) {
    if (!this.isActive) {
      return
    }
    const { closePauseVideoFocus } = this.config
    this.isActive = false
    if (data.ignorePaused || closePauseVideoFocus || (!this.paused && !this.ended)) {
      this.addClass(STATE_CLASS.ACTIVE)
    }
  }

  /**
   * @protected
   */
  onCanplay () {
    this.removeClass(STATE_CLASS.ENTER)
    this.isCanplay = true
  }

  /**
   * @protected
   */
  onPlay () {
    // this.addClass(STATE_CLASS.PLAYING)
    // this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
    this.removeClass(STATE_CLASS.PAUSED)
    this.ended && this.removeClass(STATE_CLASS.ENDED)
    !this.config.closePlayVideoFocus && this.focus()
  }

  /**
   * @protected
   */
  onPause () {
    this.addClass(STATE_CLASS.PAUSED)
    if (!this.config.closePauseVideoFocus) {
      if (this.userTimer) {
        Util.clearTimeout(this, this.userTimer)
      }
      this.focus()
    }
  }

  /**
   * @protected
   */
  onEnded () {
    this.addClass(STATE_CLASS.ENDED)
    // this.removeClass(STATE_CLASS.PLAYING)
  }

  /**
   * @protected
   */
  onError () {
    this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
    this.removeClass(STATE_CLASS.NO_START)
    this.removeClass(STATE_CLASS.ENTER)
    this.addClass(STATE_CLASS.ERROR)
  }

  /**
   * @protected
   */
  onSeeking () {
    if (!this.isSeeking) {
      const { _played } = this
      _played.acc += _played.begin < _played.end && _played.end > -1 ? _played.end - _played.begin : 0
      _played.begin = parseInt(this.video.currentTime * 1000, 10)
      _played.end = -1
    }
    this.isSeeking = true
    this.addClass(STATE_CLASS.SEEKING)
  }

  /**
   * @protected
   */
  onSeeked () {
    this.isSeeking = false
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      Util.clearTimeout(this, this.waitTimer)
    }
    this.removeClass(STATE_CLASS.LOADING)
    this.removeClass(STATE_CLASS.SEEKING)
  }

  /**
   * @protected
   */
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

  /**
   * @protected
   */
  onPlaying () {
    const { NO_START, PAUSED, ENDED, ERROR, REPLAY } = STATE_CLASS
    const clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY]
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
  }

  /**
   * @protected
   */
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

  /**
   *
   * @param { number } time
   * @returns { boolean }
   */
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
    const { fitVideoSize, videoFillMode } = this.config

    if (videoFillMode === 'fill' || videoFillMode === 'cover') {
      this.setAttribute('data-xgfill', videoFillMode)
    }

    if (!videoHeight || !videoWidth) {
      return
    }
    this._videoHeight = videoHeight
    this._videoWidth = videoWidth
    const containerSize = this.root.getBoundingClientRect()
    const controlsHeight = this.controls && this.innerContainer ? this.controls.root.getBoundingClientRect().height : 0
    const width = containerSize.width
    const height = containerSize.height - controlsHeight
    const videoFit = parseInt(videoWidth / videoHeight * 1000, 10)
    const fit = parseInt(width / height * 1000, 10)
    let rWidth = width
    let rHeight = height
    if ((fitVideoSize === 'auto' && fit > videoFit) || fitVideoSize === 'fixWidth') {
      rHeight = width / videoFit * 1000
      if (this.config.fluid) {
        this.root.style.paddingTop = `${rHeight * 100 / rWidth}%`
      } else {
        this.root.style.height = `${rHeight + controlsHeight}px`
      }
    } else if ((fitVideoSize === 'auto' && fit < videoFit) || fitVideoSize === 'fixHeight') {
      rWidth = videoFit * height / 1000
      this.root.style.width = `${rWidth}px`
    }
    // video填充模式
    if ((videoFillMode === 'fillHeight' && fit < videoFit) || (videoFillMode === 'fillWidth' && fit > videoFit)) {
      this.setAttribute('data-xgfill', 'cover')
    }
    this.emit(Events.VIDEO_RESIZE, { videoScale: videoFit, vWidth: rWidth, vHeight: rHeight, cWidth: rWidth, cHeight: rHeight + controlsHeight })
  }

  /**
   *
   * @param { number } left
   * @param { number } top
   * @returns
   */
  updateObjectPosition (left = 0, top = 0) {
    if (this.video.updateObjectPosition) {
      this.video.updateObjectPosition(left, top)
      return
    }
    this.video.style.objectPosition = `${left * 100}% ${top * 100}%`
  }

  /**
   * @type { string }
   */
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
    const { lang } = this.config
    return I18N.lang[lang] || I18N.lang.en
  }

  get i18nKeys () {
    return I18N.textKeys || {}
  }

  /**
   * @type { string }
   */
  get version () {
    return version
  }

  /**
   * @type { any }
   */
  set url (url) {
    /**
     * @private
     */
    this.__url = url
  }

  get url () {
    return this.__url || this.config.url
  }

  /**
   * @type { string }
   */
  set poster (posterUrl) {
    this.plugins.poster && this.plugins.poster.update(posterUrl)
  }

  get poster () {
    return this.plugins.poster ? this.plugins.poster.config.poster : this.config.poster
  }

  /**
   * @type { boolean }
   */
  get fullscreen () {
    return this._isFullScreen
  }

  set fullscreen (val) {
    /**
     * @private
     */
    this._isFullScreen = val
  }

  /**
   * @type { string }
   */
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

  /**
   * @type { boolean }
   */
  get fullscreenChanging () {
    return !(this._fullScreenOffset === null)
  }

  /**
   * 累计观看时长
   * @type number
   */
  get cumulateTime () {
    const { acc, end, begin } = this._played
    return begin > -1 && end > begin ? (acc + end - begin) / 1000 : acc / 1000
  }

  /**
  * @type { number }
  */
  get zoom () {
    return this.config.zoom
  }

  /**
   * @type { number }
   */
  set zoom (value) {
    this.config.zoom = value
  }

  /**
   * @param { string } hookName
   * @param { Function } handler
   * @param { {pre: Function| null , next: Function | null} } preset
   * @returns
   */
  hook (hookName, handler, preset = { pre: null, next: null }) {
    // eslint-disable-next-line no-return-assign
    return hook.call(this, ...arguments)
  }

  /**
   * @param { string } hookName
   * @param { (player: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   */
  useHooks (hookName, handler) {
    return useHooks.call(this, ...arguments)
  }

  /**
   *
   * @param { string } pluginName
   * @param { string } hookName
   * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   */
  usePluginHooks (pluginName, hookName, handler, ...args) {
    return usePluginHooks.call(this, ...arguments)
  }

  /***
   * @deprecated
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
   * @deprecated
   * 插件全部迁移完成再做删除
   */
  static use (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }

  static defaultPreset = null

  /**
   * @description 自定义media构造函数
   */
  static XgVideoProxy = null
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
