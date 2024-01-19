import MediaProxy from './mediaProxy'
import Util, { checkIsCurrentVideo } from './utils/util'
import Sniffer from './utils/sniffer'
import Database from './utils/database'
import Errors from './error'
import * as Events from './events'
import { FULLSCREEN_EVENTS, GET_FULLSCREEN_API, EXIT_FULLSCREEN_API, PLATER_ID } from './constant'
import Plugin, { POSITIONS } from './plugin/plugin'
import BasePlugin from './plugin/basePlugin'
import pluginsManager from './plugin/pluginsManager'
import STATE_CLASS from './stateClassMap'
import getDefaultConfig from './defaultConfig'
import { usePreset } from './plugin/preset'
import hooksDescriptor, { runHooks, useHooks, removeHooks, delHooksDescriptor, usePluginHooks, removePluginHooks, hook } from './plugin/hooksDescriptor'
import Controls from './plugins/controls/index'
import XG_DEBUG, { bindDebug } from './utils/debug'
import I18N from './lang/i18n'
import version from './version'
import { STATES, STATE_ARRAY } from './state'
import { InstManager, checkPlayerRoot } from './instManager'

/**
 * @typedef { import ('./defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
 * @typedef { import ('./defaultConfig').IDefinition } IDefinition
 * @typedef { import ('./defaultConfig').IUrl } IUrl
 */

/* eslint-disable camelcase */
const PlAYER_HOOKS = ['play', 'pause', 'replay', 'retry']
let REAL_TIME_SPEED = 0 // 实时下载速率, kb/s
let AVG_SPEED = 0 // 平均下载速率, kb/s
/** @type { InstManager } */
let instManager = null

class Player extends MediaProxy {
  /**
   * @type {number}
   * @description set debugger level
   *  1 - only print error logs
   *  2 - print warn logs and error logs
   *  3 - print all debug logs and error stack logs
   */
  static set debugger (value) {
    XG_DEBUG.config.debug = value
  }

  static get debugger () {
    return XG_DEBUG.config.debug
  }

  /**
   * @param {import('./instManager').InstManager} value
   */
  static set instManager (value) {
    instManager = value
  }

  /**
   * @param {import('./instManager').InstManager} value
   */
  static get instManager () {
    return instManager
  }

  /**
   * 获取当前处理激活态的实例id
   * @returns { number | string | null }
   * @deprecated 该方法转移到 InstManager 上去使用: player.instManager.getActiveId()
   */
  static getCurrentUserActivePlayerId () {
    return instManager?.getActiveId()
  }

  /**
   * 设置实例的用户行为激活状态
   * @param { number | string } playerId
   * @param { boolean } isActive
   * @deprecated 该方法转移到 InstManager 上去使用: player.instManager.setActive()
   */
  static setCurrentUserActive (playerId, isActive) {
    instManager?.setActive(playerId, isActive)
  }

  /**
   * @param { IPlayerOptions } options
   */
  constructor (options) {
    const config = Util.deepMerge(getDefaultConfig(), options)
    super(config)
    hooksDescriptor(this, PlAYER_HOOKS)

    /**
     * @type { IPlayerOptions }
     * @description 当前播放器的配置信息
     */
    this.config = config

    /**
     * @type { string }
     * @private
     */
    this._pluginInfoId = Util.generateSessionId()

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
    this.userTimer = null
    /**
     * @private
     */
    this.waitTimer = null

    /**
     * @private
     */
    this._state = STATES.INITIAL

    /**
     * @public
     * @readonly
     * @type { boolean }
     */
    this.isError = false

    /**
     * @private
     */
    this._hasStart = false
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
    this._useAutoplay = false
    /**
     * @description 记录起播需要seek的时间点
     * @private
     * @readonly
     */
    this.__startTime = -1
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
     * Whether player is currently in fullscreen
     * @type { boolean }
     * @readonly
     */
    this.fullscreen = false
    /**
     * @type { boolean }
     * @readonly
     */
    this.cssfullscreen = false
    /**
     * @type { boolean }
     * @readonly
     */
    this.isRotateFullscreen = false

    /**
     * fullscreenElement
     * @type { HTMLElement | null }
     * @readonly
     */
    this._fullscreenEl = null

    this.timeSegments = []

    /**
     * cssfullscreen target Element
     * @type { HTMLElement | null }
     * @readonly
     */
    this._cssfullscreenEl = null

    /**
     * @type { IDefinition | null }
     * @readonly
     */
    this.curDefinition = null
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

    this.videoPos = {
      pi: 1, // 宽高比
      scale: 0,
      rotate: -1,
      x: 0,
      y: 0,
      h: -1, // 高度占比
      w: -1, // 宽度占比
      vy: 0, // 画面在y方向的偏移
      vx: 0 // 画面在x方向的偏移
    }

    this.sizeInfo = {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }

    /**
     * @private
     * @type { { t: number, acc:number, acc: number, loopAcc: number, [propName: string]: any;} }
     */
    this._accPlayed = {
      t: 0,
      acc: 0,
      loopAcc: 0
    }

    /**
     * @description 播放器时长、播放时间偏移信息
     */
    this._offsetInfo = {
      currentTime: -1,
      duration: 0
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
     * @description 当前播放器根节点
     */
    this.root = null

    this.__i18n = I18N.init(this._pluginInfoId)

    // android 6以下不支持自动播放
    if (
      Sniffer.os.isAndroid &&
      Sniffer.osVersion > 0 &&
      Sniffer.osVersion < 6
    ) {
      this.config.autoplay = false
    }

    /**
     * @readonly
     * @type {any}
     */
    this.database = new Database()

    /**
     * @readonly
     * @type { boolean }
     */
    this.isUserActive = false

    /**
     * @private
     * @description seek之后canplay回调函数定义
     * @type { Function | null }
     */
    this._onceSeekCanplay = null

    /**
     * @description 记录seek之前是否处于暂停状态
     * @type { number }
     * @private
     */
    this._isPauseBeforeSeek = 0

    /**
     * @description 内部状态记录
     * @type { {
    *   isActiveLocked: boolean;
    * } }
    * @readonly
    */
    this.innerStates = {
      // 当前的active是否是锁定状态
      isActiveLocked: false
    }

    /**
     * @type {InstManager}
     */
    this.instManager = instManager
    const rootInit = this._initDOM()
    if (!rootInit) {
      console.error(
        new Error(
          `can't find the dom which id is ${this.config.id} or this.config.el does not exist`
        )
      )
      return
    }

    // url为空的情况下 根据definition或playnext.urlList设置播放地址
    // 若未配置definition.defaultDefinition，默认将配置为definition.list[0].definition
    const { definition = {}, url } = this.config

    if (!url && definition.list && definition.list.length > 0) {
      let defaultDefinitionObj = definition.list.find(
        (e) => e.definition && e.definition === definition.defaultDefinition
      )
      if (!defaultDefinitionObj) {
        definition.defaultDefinition = definition.list[0].definition
        defaultDefinitionObj = definition.list[0]
      }
      this.config.url = defaultDefinitionObj.url
      this.curDefinition = defaultDefinitionObj
    }

    this._bindEvents()
    this._registerPresets()
    this._registerPlugins()
    pluginsManager.onPluginsReady(this)

    // url为空的情况下 根据definition设置播放地址
    this.getInitDefinition()

    this.setState(STATES.READY)
    Util.setTimeout(this, () => {
      this.emit(Events.READY)
    }, 0)
    this.onReady && this.onReady()

    if (this.config.videoInit || this.config.autoplay) {
      if (!this.hasStart || this.state < STATES.ATTACHED) {
        this.start()
      }
    }
  }

  /**
   * init control domElement
   * @private
   */
  _initDOM () {
    this.root = this.config.id ? document.getElementById(this.config.id) : null
    if (!this.root) {
      const el = this.config.el
      if (el && el.nodeType === 1) {
        this.root = el
      } else {
        this.emit(
          Events.ERROR,
          new Errors('use', this.config.vid, {
            line: 32,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          })
        )
        console.error('this.confg.id or this.config.el can\'t be empty')
        return false
      }
    }
    const ret = checkPlayerRoot(this.root)
    if (ret) {
      XG_DEBUG.logWarn(
        'The is an Player instance already exists in this.root, destroy it and reinitialize'
      )
      ret.destroy()
    }
    this.root.setAttribute(PLATER_ID, this.playerId)
    instManager?.add(this)
    pluginsManager.init(this)
    this._initBaseDoms()

    // 允许自定义video对象的构造
    const XgVideoProxy = this.constructor.XgVideoProxy
    if (XgVideoProxy && this.mediaConfig.mediaType === XgVideoProxy.mediaType) {
      const el = this.innerContainer || this.root
      this.detachVideoEvents(this.media)
      const _nVideo = new XgVideoProxy(el, this.config, this.mediaConfig)
      this.attachVideoEvents(_nVideo)
      this.media = _nVideo
    }
    this.media.setAttribute(PLATER_ID, this.playerId)
    if (this.config.controls) {
      const _root = this.config.controls.root || null
      const controls = pluginsManager.register(this, Controls, { root: _root })
      this.controls = controls
    }
    const device =
      this.config.isMobileSimulateMode === 'mobile' ? 'mobile' : Sniffer.device
    this.addClass(
      `${STATE_CLASS.DEFAULT} ${STATE_CLASS.INACTIVE} xgplayer-${device} ${
        this.config.controls ? '' : STATE_CLASS.NO_CONTROLS
      }`
    )
    if (this.config.autoplay) {
      this.addClass(STATE_CLASS.ENTER)
    } else {
      this.addClass(STATE_CLASS.NO_START)
    }
    if (this.config.fluid) {
      let { width, height } = this.config
      if (typeof width !== 'number' || typeof height !== 'number') {
        width = 600
        height = 337.5
      }
      const style = {
        width: '100%',
        height: '0',
        'max-width': '100%',
        'padding-top': `${(height * 100) / width}%`
        // position: 'relative',
        // top: '0',
        // left: '0'
      }
      Object.keys(style).forEach((key) => {
        this.root.style[key] = style[key]
      })
    } else {
      ['width', 'height'].forEach((key) => {
        if (this.config[key]) {
          if (typeof this.config[key] !== 'number') {
            this.root.style[key] = this.config[key]
          } else {
            this.root.style[key] = `${this.config[key]}px`
          }
        }
      })
    }
    const { width, height, left, top } = this.root.getBoundingClientRect()
    this.sizeInfo.width = width
    this.sizeInfo.height = height
    this.sizeInfo.left = left
    this.sizeInfo.top = top
    return true
  }

  /**
   * @private
   */
  _initBaseDoms () {
    /**
     * @readonly
     * @type { HTMLElement | null }
     */
    this.topBar = null
    /**
     * @readonly
     * @type { HTMLElement |null }
     */
    this.leftBar = null
    /**
     * @readonly
     * @type { HTMLElement | null }
     */
    this.rightBar = null

    if (this.config.marginControls) {
      this.innerContainer = Util.createDom(
        'xg-video-container',
        '',
        { 'data-index': -1 },
        'xg-video-container'
      )
      this.root.appendChild(this.innerContainer)
    }
  }

  /**
   * @private
   */
  _bindEvents () {
    ['focus', 'blur'].forEach((item) => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })

    FULLSCREEN_EVENTS.forEach((item) => {
      document && document.addEventListener(item, this.onFullscreenChange)
    })

    if (Sniffer.os.isIos) {
      this.media.addEventListener( 'webkitbeginfullscreen', this._onWebkitbeginfullscreen)
      this.media.addEventListener( 'webkitendfullscreen', this._onWebkitendfullscreen)
    }

    this.once(Events.LOADED_DATA, this.resize)

    this.playFunc = () => {
      if (!this.config.closeFocusVideoFocus) {
        this.media.focus()
      }
    }
    this.once(Events.PLAY, this.playFunc)
  }

  /**
   * @private
   */
  _unbindEvents () {
    this.root.removeEventListener('mousemove', this.mousemoveFunc)
    FULLSCREEN_EVENTS.forEach((item) => {
      document.removeEventListener(item, this.onFullscreenChange)
    })
    this.playFunc && this.off(Events.PLAY, this.playFunc)
    this.off(Events.CANPLAY, this.canPlayFunc)
    this.media.removeEventListener( 'webkitbeginfullscreen', this._onWebkitbeginfullscreen)
    this.media.removeEventListener('webkitendfullscreen', this._onWebkitendfullscreen)
  }

  /**
   *
   * @param { any } [url]
   * @returns
   */
  _startInit (url) {
    if (!this.media) {
      return
    }
    if (
      !url ||
      url === '' ||
      (Util.typeOf(url) === 'Array' && url.length === 0)
    ) {
      url = ''
      this.emit(Events.URL_NULL)
      XG_DEBUG.logWarn(
        'config.url is null, please get url and run player._startInit(url)'
      )
      if (this.config.nullUrlStart) {
        return
      }
    }
    this._detachSourceEvents(this.media)
    if (Util.typeOf(url) === 'Array' && url.length > 0) {
      this._attachSourceEvents(this.media, url)
    } else if (!this.media.src || this.media.src !== url) {
      this.media.src = url
    } else if (!url) {
      this.media.removeAttribute('src')
    }

    if (Util.typeOf(this.config.volume) === 'Number') {
      this.volume = this.config.volume
    }

    const _root = this.innerContainer ? this.innerContainer : this.root
    if (this.media instanceof window.Element && !_root.contains(this.media)) {
      _root.insertBefore(this.media, _root.firstChild)
    }

    const { readyState } = this.media
    XG_DEBUG.logInfo('_startInit readyState', readyState)
    if (this.config.autoplay) {
      !Util.isMSE(this.media) && this.load();
      // ios端无法自动播放的场景下，不调用play不会触发canplay loadeddata等事件
      (Sniffer.os.isIpad || Sniffer.os.isPhone) && this.mediaPlay()
    }

    const { startTime } = this.config
    this.__startTime = startTime > 0 ? startTime : -1
    this.config.startTime = 0
    if (readyState >= 2 && this.duration > 0) {
      this.canPlayFunc()
    } else {
      this.on(Events.CANPLAY, this.canPlayFunc)
    }
    if (!this.hasStart || this.state < STATES.ATTACHED) {
      pluginsManager.afterInit(this)
    }
    this.hasStart = true
    this.setState(STATES.ATTACHED)
    Util.setTimeout(this, () => {
      this.emit(Events.COMPLETE)
    }, 0)
  }

  /**
   * @description 注册组件 组件列表config.plugins
   * @param { {boolean} } [isInit] 是否是首次初始化
   * @private
   */
  _registerPlugins (isInit = true) {
    /**
     * @private
     */
    this._loadingPlugins = []
    const ignores = this.config.ignores || []
    const plugins = this.config.plugins || []
    const i18n = this.config.i18n || []
    isInit && I18N.extend(i18n, this.__i18n)
    const ignoresStr = ignores.join('||').toLowerCase().split('||')
    const cuPlugins = this.plugins
    plugins.forEach((plugin) => {
      try {
        const pluginName = plugin.plugin
          ? plugin.plugin.pluginName
          : plugin.pluginName
        // 在ignores中的不做组装
        if (pluginName && ignoresStr.indexOf(pluginName.toLowerCase()) > -1) {
          return null
        }

        if (!isInit && cuPlugins[pluginName.toLowerCase()]) {
          return
        }

        if (plugin.lazy && plugin.loader) {
          const loadingPlugin = pluginsManager.lazyRegister(this, plugin)
          if (plugin.forceBeforeInit) {
            loadingPlugin
              .then(() => {
                this._loadingPlugins.splice(
                  this._loadingPlugins.indexOf(loadingPlugin),
                  1
                )
              })
              .catch((e) => {
                XG_DEBUG.logError('_registerPlugins:loadingPlugin', e)
                this._loadingPlugins.splice(
                  this._loadingPlugins.indexOf(loadingPlugin),
                  1
                )
              })
            this._loadingPlugins.push(loadingPlugin)
          }

          return
        }
        return this.registerPlugin(plugin)
      } catch (err) {
        XG_DEBUG.logError('_registerPlugins:', err)
        // return
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
   * @private
   * @param { string } position ]
   */
  _getRootByPosition (position) {
    let _root = null
    switch (position) {
      case POSITIONS.ROOT_RIGHT:
        if (!this.rightBar) {
          this.rightBar = Util.createPositionBar('xg-right-bar', this.root)
        }
        _root = this.rightBar
        break
      case POSITIONS.ROOT_LEFT:
        if (!this.leftBar) {
          this.leftBar = Util.createPositionBar('xg-left-bar', this.root)
        }
        _root = this.leftBar
        break
      case POSITIONS.ROOT_TOP:
        if (!this.topBar) {
          this.topBar = Util.createPositionBar('xg-top-bar', this.root)
          if (this.config.topBarAutoHide) {
            Util.addClass(this.topBar, STATE_CLASS.TOP_BAR_AUTOHIDE)
          }
        }
        _root = this.topBar
        break
      default:
        _root = this.innerContainer || this.root
        break
    }
    return _root
  }

  /**
   *
   * @param { {plugin: function, options:object} | function } plugin
   * @param { {[propName: string]: any;} } [config]
   * @returns { any } plugin
   */
  registerPlugin (plugin, config) {
    const _retPlugin = pluginsManager.formatPluginInfo(plugin, config)
    const { PLUFGIN, options } = _retPlugin

    // 如果当前配置plugins中不存在该组件, 则将其push
    const { plugins } = this.config
    const exits = pluginsManager.checkPluginIfExits(PLUFGIN.pluginName, plugins)
    !exits && plugins.push(PLUFGIN)

    // 获取配置的position或者root
    const _pConfig = pluginsManager.getRootByConfig(PLUFGIN.pluginName, this.config)
    _pConfig.root && (options.root = _pConfig.root)
    _pConfig.position && (options.position = _pConfig.position)

    const position = options.position
      ? options.position
      : (options.config && options.config.position) ||
        (PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position)
    if (
      !options.root &&
      typeof position === 'string' &&
      position.indexOf('controls') > -1
    ) {
      return (
        this.controls &&
        this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName)
      )
    }
    if (!options.root) {
      options.root = this._getRootByPosition(position)
    }
    return pluginsManager.register(this, PLUFGIN, options)
  }

  /**
   *
   * @param { any } plugin
   */
  deregister (plugin) {
    if (typeof plugin === 'string') {
      pluginsManager.unRegister(this, plugin)
    } else if (plugin instanceof BasePlugin) {
      pluginsManager.unRegister(this, plugin.pluginName)
    }
  }

  /**
   *
   * @param { any } plugin
   * @param { boolean } removedFromConfig
   */
  unRegisterPlugin (plugin, removedFromConfig = false) {
    this.deregister(plugin)
    if (removedFromConfig) {
      this.removePluginFromConfig(plugin)
    }
  }

  removePluginFromConfig (plugin) {
    let pluginName
    if (typeof plugin === 'string') {
      pluginName = plugin
    } else if (plugin instanceof BasePlugin) {
      pluginName = plugin.pluginName
    }
    if (!pluginName) {
      return
    }
    for (let i = this.config.plugins.length - 1; i > -1; i--) {
      const plugin = this.config.plugins[i]
      if (plugin.pluginName.toLowerCase() === pluginName.toLowerCase()) {
        this.config.plugins.splice(i, 1)
        break
      }
    }
  }

  /**
   * 当前播放器挂载的插件实例列表
   * @type { {[propName: string]: any | null } }
   */
  get plugins () {
    return pluginsManager.getPlugins(this)
  }

  /**
   * get a plugin instance
   * @param { string } pluginName
   * @return { null | any } plugin
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
   * @returns { boolean } has
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
   * @returns void
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
   * @returns void
   */
  removeAttribute (key, value) {
    if (!this.root) {
      return
    }
    this.root.removeAttribute(key, value)
  }

  /**
   *
   * @param { any } [url]
   * @returns { Promise<void> | void }
   * @description 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
   */
  start (url) {
    // 已经开始初始化播放了 则直接调用play
    if (this.state > STATES.ATTACHING) {
      return
    }
    if (!url && !this.config.url) {
      this.getInitDefinition()
    }
    this.hasStart = true
    this.setState(STATES.ATTACHING)

    this._registerPlugins(false)
    return pluginsManager
      .beforeInit(this)
      .then(() => {
        // this.config为空即已经销毁，不再执行后面的异步流程
        if (!this.config) {
          return
        }
        if (!url) {
          url = this.url || this.config.url
        }
        const _furl = this.preProcessUrl(url)
        const ret = this._startInit(_furl.url)
        return ret
      })
      .catch((e) => {
        e.fileName = 'player'
        e.lineNumber = '236'
        XG_DEBUG.logError('start:beforeInit:', e)
        throw e
      })
  }

  /**
   * @param { string | object } url
   * @param { boolean | {
   *    seamless?: boolean,
   *    currentTime?: number,
   *    bitrate?: number
   * } } [options]
   * @returns { Promise | null } 执行结果
   */
  switchURL (url, options) {
    let _src = url
    if (Util.typeOf(url) === 'Object') {
      _src = url.url
    }
    _src = this.preProcessUrl(_src).url
    const curTime = this.currentTime
    this.__startTime = curTime
    const isPaused = this.paused && !this.isError
    this.src = _src
    return new Promise((resolve, reject) => {
      const _error = (e) => {
        this.off('timeupdate', _canplay)
        this.off('canplay', _canplay)
        reject(e)
      }
      const _canplay = () => {
        if (this.duration > 0 && this.__startTime > 0) {
          this.currentTime = this.__startTime
          this.__startTime = -1
        }
        if (isPaused) {
          this.pause()
        }
        this.off('error', _error)
        resolve(true)
      }
      this.once('error', _error)
      if (!_src){
        this.errorHandler('error', {code: 6, message: 'empty_src'})
        return
      }
      if (Sniffer.os.isAndroid) {
        this.once('timeupdate', _canplay)
      } else {
        this.once('canplay', _canplay)
      }
      this.play()
    })
  }

  /**
   * @description call play without play hook
   * @deprecated this api renamed to mediaPlay, you can call it as player.mediaPlay()
   */
  videoPlay () {
    this.mediaPlay()
  }

  /**
   * @description call play without play hook
   */
  mediaPlay () {
    if (!this.hasStart && this.state < STATES.ATTACHED) {
      this.removeClass(STATE_CLASS.NO_START)
      this.addClass(STATE_CLASS.ENTER)
      this.start()
      this._useAutoplay = true
      return
    }
    if (this.state < STATES.RUNNING) {
      this.removeClass(STATE_CLASS.NO_START)
      !this.isCanplay && this.addClass(STATE_CLASS.ENTER)
    }
    const playPromise = super.play()
    if (playPromise !== undefined && playPromise && playPromise.then) {
      playPromise
        .then(() => {
          this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
          this.addClass(STATE_CLASS.PLAYING)
          if (this.state < STATES.RUNNING) {
            XG_DEBUG.logInfo('>>>>playPromise.then')
            this.setState(STATES.RUNNING)
            this.emit(Events.AUTOPLAY_STARTED)
          }
        })
        .catch((e) => {
          XG_DEBUG.logWarn('>>>>playPromise.catch', e.name)
          if (this.media && this.media.error) {
            this.onError()
            // this.errorHandler('error')
            this.removeClass(STATE_CLASS.ENTER)
            // this.setState(STATES.ERROR)
            return
          }
          // 避免AUTOPLAY_PREVENTED先于playing和play触发
          if (e.name === 'NotAllowedError') {
            /**
             * @private
             */
            this._errorTimer = Util.setTimeout(
              this,
              () => {
                this._errorTimer = null
                this.emit(Events.AUTOPLAY_PREVENTED)
                this.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
                this.removeClass(STATE_CLASS.ENTER)
                this.pause()
                this.setState(STATES.NOTALLOW)
              },
              0
            )
          }
        })
    } else {
      XG_DEBUG.logWarn('video.play not return promise')
      if (this.state < STATES.RUNNING) {
        this.setState(STATES.RUNNING)
        this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
        this.removeClass(STATE_CLASS.NO_START)
        this.removeClass(STATE_CLASS.ENTER)
        this.addClass(STATE_CLASS.PLAYING)
        this.emit(Events.AUTOPLAY_STARTED)
      }
    }
    return playPromise
  }

  /**
   * @description call play without pause hook
   */
  mediaPause () {
    super.pause()
  }

  /**
   * @description call play without pause hook
   * @deprecated this api renamed to mediaPause, you can call it as player.mediaPause()
   */
  videoPause () {
    super.pause()
  }

  play () {
    this.removeClass(STATE_CLASS.PAUSED)
    return runHooks(this, 'play', () => {
      return this.mediaPlay()
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
   * @param { 'play' | 'pause' | 'auto' } [status]
   * @returns
   */
  seek (time, status) {
    if (!this.media || Number.isNaN(Number(time)) || !this.hasStart) {
      return
    }
    const { isSeekedPlay, seekedStatus } = this.config
    const _status = status || (isSeekedPlay ? 'play' : seekedStatus)
    time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time

    !this._isPauseBeforeSeek && (this._isPauseBeforeSeek = this.paused ? 2 : 1)

    this._onceSeekCanplay && this.off(Events.SEEKED, this._onceSeekCanplay)

    this._onceSeekCanplay = () => {
      // const { seekedStatus } = this.config
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
          this._isPauseBeforeSeek > 1 || this.paused ? this.pause() : this.play()
      }
      this._isPauseBeforeSeek = 0
      this._onceSeekCanplay = null
    }

    this.once(Events.SEEKED, this._onceSeekCanplay)
    if (this.state < STATES.RUNNING) {
      this.removeClass(STATE_CLASS.NO_START)
      this.currentTime = time
      // 未起播状态不论希望保持什么状态，都要触发一次play, 避免ios下起播异常问题
      this.play()
    } else {
      this.currentTime = time
    }
  }

  getInitDefinition () {
    // url为空的情况下 根据definition设置播放地址
    const { definition, url } = this.config
    if (
      !url &&
      definition &&
      definition.list &&
      definition.list.length > 0 &&
      definition.defaultDefinition
    ) {
      definition.list.map((item) => {
        if (item.definition === definition.defaultDefinition) {
          this.config.url = item.url
          this.curDefinition = item
        }
      })
    }
  }

  /**
   * @typedef { import('./defaultConfig').IDefinition } definition
   */
  /**
   * @description change the definition of the current playback
   * @param { definition } to
   * @param { definition } [from]
   */
  changeDefinition (to, from) {
    const { definition } = this.config

    if (Array.isArray(definition?.list)) {
      definition.list.forEach((item) => {
        if (to?.definition === item.definition) {
          this.curDefinition = item
        }
      })
    }

    if (to?.bitrate && typeof to.bitrate !== 'number') {
      to.bitrate = parseInt(to.bitrate, 10) || 0
    }

    this.emit(Events.DEFINITION_CHANGE, { from, to })
    if (!this.hasStart) {
      this.config.url = to.url
      return
    }
    const ret = this.switchURL(to.url, {
      seamless: definition.seamless !== false
        && typeof MediaSource !== 'undefined'
        && typeof MediaSource.isTypeSupported === 'function',
      ...to
    })
    if (ret && ret.then) {
      ret.then(() => {
        this.emit(Events.AFTER_DEFINITION_CHANGE, { from, to })
      })
    } else {
      this.emit(Events.AFTER_DEFINITION_CHANGE, { from, to })
    }
  }

  reload () {
    this.load()
    /**
     * @private
     */
    this.reloadFunc = function () {
      this.play()
    }
    this.once(Events.LOADED_DATA, this.reloadFunc)
  }

  resetState () {
    const {
      NOT_ALLOW_AUTOPLAY,
      PLAYING,
      NO_START,
      PAUSED,
      REPLAY,
      ENTER,
      ENDED,
      ERROR,
      LOADING
    } = STATE_CLASS
    const clsList = [
      NOT_ALLOW_AUTOPLAY,
      PLAYING,
      NO_START,
      PAUSED,
      REPLAY,
      ENTER,
      ENDED,
      ERROR,
      LOADING
    ]
    this.hasStart = false
    this.isError = false
    this._useAutoplay = false
    this.mediaPause()
    this._accPlayed.acc = 0
    this._accPlayed.t = 0
    this._accPlayed.loopAcc = 0
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
    this.addClass(STATE_CLASS.NO_START)
    this.emit(Events.RESET)
  }

  /**
   * 重置播放实例
   * @param { Array<string> } unregisterPlugins 重置的时候需要卸载重新初始化的插件列表
   * @param { boolean } [isResetConfig] 是否需要重置配置列表
   * @returns
   */
  reset (unregisterPlugins = [], isResetConfig) {
    this.resetState()
    const { plugins } = this

    if (!plugins) {
      return
    }

    unregisterPlugins.map((pn) => {
      this.deregister(pn)
    })

    if (isResetConfig) {
      const de = getDefaultConfig()
      Object.keys(this.config).keys((k) => {
        if (
          this.config[k] !== 'undefined' &&
          (k === 'plugins' || k === 'presets' || k === 'el' || k === 'id')
        ) {
          this.config[k] = de[k]
        }
      })
    }
  }

  /**
   * @description destroy the player instance
   * @returns
   */
  destroy () {
    const { innerContainer, root, media } = this
    if (!root || !media) {
      return
    }
    this.hasStart = false
    this._useAutoplay = false
    root.removeAttribute(PLATER_ID)
    this.updateAcc('destroy')
    this._unbindEvents()
    this._detachSourceEvents(this.media)
    Util.clearAllTimers(this)
    this.emit(Events.DESTROY)
    instManager?.remove(this)
    pluginsManager.destroy(this)
    delHooksDescriptor(this)
    super.destroy()
    // 退出全屏
    if (this.fullscreen && this._fullscreenEl === this.root) {
      this.exitFullscreen()
    }

    if (innerContainer) {
      const _c = innerContainer.children
      for (let i = 0; i < _c.length; i++) {
        innerContainer.removeChild(_c[i])
      }
    }
    !innerContainer &&
    media instanceof window.Node &&
      root.contains(media) &&
      root.removeChild(media);
    ['topBar', 'leftBar', 'rightBar', 'innerContainer'].map((item) => {
      this[item] && root.removeChild(this[item])
      this[item] = null
    })
    const cList = root.className.split(' ')
    if (cList.length > 0) {
      root.className = cList
        .filter((name) => name.indexOf('xgplayer') < 0)
        .join(' ')
    } else {
      root.className = ''
    }
    this.removeAttribute('data-xgfill');

    [
      'isSeeking',
      'isCanplay',
      'isActive',
      'cssfullscreen',
      'fullscreen'
    ].forEach((key) => {
      this[key] = false
    })
  }

  replay () {
    this.removeClass(STATE_CLASS.ENDED)
    this.currentTime = 0
    this.isSeeking = false
    runHooks(this, 'replay', () => {
      this.once(Events.SEEKED, () => {
        const playPromise = this.mediaPlay()
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
      const { url } = this.config
      const _srcRet = !Util.isMSE(this.media) ? this.preProcessUrl(url) : { url }
      this.src = _srcRet.url
      !this.config.isLive && (this.currentTime = cur)
      this.once(Events.CANPLAY, () => {
        this.mediaPlay()
      })
    })
  }

  /**
   *
   * @param { HTMLElement } root
   * @param { HTMLElement } [el]
   * @param { string } [rootClass]
   * @param { string } [pClassName]
   */
  changeFullStyle (root, el, rootClass, pClassName) {
    if (!root) {
      return
    }
    if (!pClassName) {
      pClassName = STATE_CLASS.PARENT_FULLSCREEN
    }
    if (!this._orgCss) {
      this._orgCss = Util.filterStyleFromText(root)
    }
    Util.addClass(root, rootClass)
    if (el && el !== root && !this._orgPCss) {
      /**
       * @private
       */
      this._orgPCss = Util.filterStyleFromText(el)
      Util.addClass(el, pClassName)
      el.setAttribute(PLATER_ID, this.playerId)
    }
  }

  /**
   *
   * @param { HTMLElement } root
   * @param { HTMLElement } [el]
   * @param { string } [rootClass]
   * @param { string } [pClassName]
   */
  recoverFullStyle (root, el, rootClass, pClassName) {
    if (!pClassName) {
      pClassName = STATE_CLASS.PARENT_FULLSCREEN
    }
    if (this._orgCss) {
      Util.setStyleFromCsstext(root, this._orgCss)
      this._orgCss = ''
    }
    Util.removeClass(root, rootClass)
    if (el && el !== root && this._orgPCss) {
      Util.setStyleFromCsstext(el, this._orgPCss)
      this._orgPCss = ''
      Util.removeClass(el, pClassName)
      el.removeAttribute(PLATER_ID)
    }
  }

  /**
   * @param { HTMLElement } [el]
   * @returns { Promise<void> }
   */
  getFullscreen (el = this.config.fullscreenTarget) {
    const { root, media } = this
    if (!el) {
      el = root
    }
    this._fullScreenOffset = {
      top: Util.scrollTop(),
      left: Util.scrollLeft()
    }

    this._fullscreenEl = el
    /**
     * @private
     */
    this._fullActionFrom = 'get'
    const fullEl = Util.getFullScreenEl()
    if (fullEl === this._fullscreenEl) {
      this.onFullscreenChange()
      return Promise.resolve()
    }
    try {
      for (let i = 0; i < GET_FULLSCREEN_API.length; i++) {
        const key = GET_FULLSCREEN_API[i]
        if (el[key]) {
          const ret =
            key === 'webkitRequestFullscreen'
              ? el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
              : el[key]()
          if (ret && ret.then) {
            return ret
          } else {
            return Promise.resolve()
          }
        }
      }
      if (media.fullscreenEnabled || media.webkitSupportsFullscreen) {
        media.webkitEnterFullscreen()
        return Promise.resolve()
      }
      return Promise.reject(new Error('call getFullscreen fail'))
    } catch (err) {
      return Promise.reject(new Error('call getFullscreen fail'))
    }
  }

  /**
   * @param { HTMLElement } [el]
   * @returns { Promise<void> }
   */
  exitFullscreen (el) {
    if (this.isRotateFullscreen) {
      this.exitRotateFullscreen()
    }
    if (!this._fullscreenEl && !Util.getFullScreenEl()) {
      return
    }
    const { root, media } = this
    if (el) {
      el = root
    }
    this._fullActionFrom = 'exit'
    try {
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
      if (media && media.webkitSupportsFullscreen) {
        media.webkitExitFullScreen()
        return Promise.resolve()
      }
      return Promise.reject(new Error('call exitFullscreen fail'))
    } catch (err) {
      return Promise.reject(new Error('call exitFullscreen fail'))
    }
  }

  /**
   * @param { HTMLElement } [el]
   * @returns
   */
  getCssFullscreen (el = this.config.fullscreenTarget) {
    if (this.isRotateFullscreen) {
      this.exitRotateFullscreen()
    } else if (this.fullscreen) {
      this.exitFullscreen()
    }
    const _class = el
      ? `${STATE_CLASS.INNER_FULLSCREEN} ${STATE_CLASS.CSS_FULLSCREEN}`
      : STATE_CLASS.CSS_FULLSCREEN
    this.changeFullStyle(this.root, el, _class)
    const { fullscreen = {} } = this.config
    const useCssFullscreen =
      fullscreen.useCssFullscreen === true ||
      (typeof fullscreen.useCssFullscreen === 'function' &&
        fullscreen.useCssFullscreen())
    if (useCssFullscreen) {
      this.fullscreen = true
      this.emit(Events.FULLSCREEN_CHANGE, true)
    }
    this._cssfullscreenEl = el
    this.cssfullscreen = true
    this.emit(Events.CSS_FULLSCREEN_CHANGE, true)
  }

  /**
   * @param { HTMLElement } [el]
   * @returns
   */
  exitCssFullscreen () {
    const _class = this._cssfullscreenEl
      ? `${STATE_CLASS.INNER_FULLSCREEN} ${STATE_CLASS.CSS_FULLSCREEN}`
      : STATE_CLASS.CSS_FULLSCREEN
    if (!this.fullscreen) {
      this.recoverFullStyle(this.root, this._cssfullscreenEl, _class)
    } else {
      const { fullscreen = {} } = this.config
      const useCssFullscreen =
        fullscreen.useCssFullscreen === true ||
        (typeof fullscreen.useCssFullscreen === 'function' &&
          fullscreen.useCssFullscreen())
      if (useCssFullscreen) {
        this.recoverFullStyle(this.root, this._cssfullscreenEl, _class)
        this.fullscreen = false
        this.emit(Events.FULLSCREEN_CHANGE, false)
      } else {
        this.removeClass(_class)
      }
    }
    this._cssfullscreenEl = null
    this.cssfullscreen = false
    this.emit(Events.CSS_FULLSCREEN_CHANGE, false)
  }

  /**
   * 进入旋转全屏
   * @param { HTMLElement } [el]
   */
  getRotateFullscreen (el = this.config.fullscreenTarget) {
    if (this.cssfullscreen) {
      this.exitCssFullscreen(el)
    }
    const _class = el
      ? `${STATE_CLASS.INNER_FULLSCREEN} ${STATE_CLASS.ROTATE_FULLSCREEN}`
      : STATE_CLASS.ROTATE_FULLSCREEN
    this._fullscreenEl = el || this.root
    this.changeFullStyle(
      this.root,
      el,
      _class,
      STATE_CLASS.PARENT_ROTATE_FULLSCREEN
    )
    this.isRotateFullscreen = true
    this.fullscreen = true
    this.setRotateDeg(90)
    this._rootStyle = this.root.getAttribute('style')
    this.root.style.width = `${window.innerHeight}px`
    this.emit(Events.FULLSCREEN_CHANGE, true)
  }

  /**
   * 退出旋转全屏
   * @param { HTMLElement } [el]
   */
  exitRotateFullscreen (el) {
    const _class =
      this._fullscreenEl !== this.root
        ? `${STATE_CLASS.INNER_FULLSCREEN} ${STATE_CLASS.ROTATE_FULLSCREEN}`
        : STATE_CLASS.ROTATE_FULLSCREEN
    this.recoverFullStyle(
      this.root,
      this._fullscreenEl,
      _class,
      STATE_CLASS.PARENT_ROTATE_FULLSCREEN
    )
    this.isRotateFullscreen = false
    this.fullscreen = false
    this.setRotateDeg(0)
    this.emit(Events.FULLSCREEN_CHANGE, false)
    if (this._rootStyle) {
      this.root.style.style = this._rootStyle
      this._rootStyle = false
    }
  }

  setRotateDeg (deg) {
    if (window.orientation === 90 || window.orientation === -90) {
      this.rotateDeg = 0
    } else {
      this.rotateDeg = deg
    }
  }

  /**
   * @description 播放器焦点状态，控制栏显示
   * @param { {
   *   autoHide?: boolean, // 是否可以自动隐藏
   *   delay?: number     // 自动隐藏的延迟时间, ms, 不传默认使用3000ms
   *   isLock?: boolean   // 是否锁定, 锁定之后自动呼出和blur调用都不生效, 默认值false
   * } } [data]
   */
  focus (
    data = {
      autoHide: !this.config.closeDelayBlur,
      delay: this.config.inactive
    }
  ) {
    if (this.isActive) {
      this.onFocus(data)
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
      this.onBlur(data)
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
   * @param { { autoHide?: boolean, delay?: number, isLock?: boolean } } [data]
   * @returns
   */
  onFocus (data = { autoHide: true, delay: 3000 }) {
    const { innerStates } = this
    this.isActive = true
    this.removeClass(STATE_CLASS.INACTIVE)
    if (this.userTimer) {
      Util.clearTimeout(this, this.userTimer)
      this.userTimer = null
    }
    if (data.isLock !== undefined) {
      innerStates.isActiveLocked = data.isLock
    }
    if (data.autoHide === false || data.isLock === true || innerStates.isActiveLocked) {
      if (this.userTimer) {
        Util.clearTimeout(this, this.userTimer)
        this.userTimer = null
      }
      return
    }
    const time = data && data.delay ? data.delay : this.config.inactive
    this.userTimer = Util.setTimeout(this, () => {
      this.userTimer = null
      this.blur()
    }, time)
  }

  /**
   * @protected
   * @param {{ ignorePaused?: boolean }} [data]
   * @returns
   */
  onBlur ({ ignorePaused = false } = {}) {
    if (!this.isActive || this.innerStates.isActiveLocked) {
      return
    }
    const { closePauseVideoFocus } = this.config
    this.isActive = false
    if (ignorePaused || closePauseVideoFocus || (!this.paused && !this.ended)) {
      this.addClass(STATE_CLASS.INACTIVE)
    }
  }

  canPlayFunc = () => {
    if (!this.config) {
      return
    }
    const { autoplay, defaultPlaybackRate } = this.config

    XG_DEBUG.logInfo('player', 'canPlayFunc, startTime', this.__startTime)
    if (this.__startTime > 0 && this.duration > 0) {
      this.currentTime = this.__startTime > this.duration ? this.duration : this.__startTime
      this.__startTime = -1
    }

    // 解决浏览器安装了一些倍速扩展插件的情况下，倍速设置失效问题
    this.playbackRate = defaultPlaybackRate;

    (autoplay || this._useAutoplay) && this.mediaPlay()
    this.off(Events.CANPLAY, this.canPlayFunc)
    this.removeClass(STATE_CLASS.ENTER)
  }

  /**
   *
   */
  onFullscreenChange = (event, isFullScreen) => {
    const delayResize = () => {
      Util.setTimeout(this, () => {
        this.resize()
      }, 100)
    }
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
        props: [{
          prop: 'fullscreen',
          from: true,
          to: false
        }]
      })
    }
    const isVideo = checkIsCurrentVideo(fullEl, this.playerId, PLATER_ID)
    if (isFullScreen || (fullEl && (fullEl === this._fullscreenEl || isVideo))) {
      delayResize()
      !this.config.closeFocusVideoFocus && this.media.focus()
      this.fullscreen = true
      // this.addClass(STATE_CLASS.FULLSCREEN)
      this.changeFullStyle(this.root, fullEl, STATE_CLASS.FULLSCREEN)
      this.emit(Events.FULLSCREEN_CHANGE, true, this._fullScreenOffset)
      if (this.cssfullscreen) {
        this.exitCssFullscreen()
      }
    } else if (this.fullscreen) {
      delayResize()
      const { _fullScreenOffset, config } = this
      if (config.needFullscreenScroll) {
        // 保证页面scroll的情况下退出全屏 页面回到原位置
        window.scrollTo(_fullScreenOffset.left, _fullScreenOffset.top)
        Util.setTimeout( this, () => {
          this.fullscreen = false
          this._fullScreenOffset = null
        }, 100)
      } else {
        // 保证页面scroll的情况下退出全屏 页面定位在播放器位置
        !this.config.closeFocusVideoFocus && this.media.focus()
        this.fullscreen = false
        this._fullScreenOffset = null
      }
      if (!this.cssfullscreen) {
        this.recoverFullStyle( this.root,this._fullscreenEl, STATE_CLASS.FULLSCREEN)
      } else {
        this.removeClass(STATE_CLASS.FULLSCREEN)
      }
      this._fullscreenEl = null
      // this.removeClass(STATE_CLASS.FULLSCREEN)
      this.emit(Events.FULLSCREEN_CHANGE, false)
    }
  }

  _onWebkitbeginfullscreen = (e) => {
    this._fullscreenEl = this.media
    this.onFullscreenChange(e, true)
  }

  _onWebkitendfullscreen = (e) => {
    this.onFullscreenChange(e, false)
  }

  onEmptied () {
    this.updateAcc('emptied')
  }

  /**
   * @protected
   */
  onCanplay () {
    this.removeClass(STATE_CLASS.ENTER)
    this.removeClass(STATE_CLASS.ERROR)
    this.removeClass(STATE_CLASS.LOADING)
    this.isCanplay = true
    this.waitTimer && Util.clearTimeout(this, this.waitTimer)
  }

  onDurationchange () {
    if (this.__startTime > 0 && this.duration > 0) {
      this.currentTime = this.__startTime
      this.__startTime = -1
    }
  }

  onLoadeddata () {
    this.isError = false
    this.isSeeking = false
  }

  onLoadstart () {
    this.removeClass(STATE_CLASS.ERROR)
    this.isCanplay = false
  }

  /**
   * @protected
   */
  onPlay () {
    if (this.state === STATES.ENDED) {
      this.setState(STATES.RUNNING)
    }
    this.removeClass(STATE_CLASS.PAUSED)
    this.ended && this.removeClass(STATE_CLASS.ENDED)
    !this.config.closePlayVideoFocus && this.focus()
  }

  /**
   * @protected
   */
  onPause () {
    this.addClass(STATE_CLASS.PAUSED)
    this.updateAcc('pause')
    if (!this.config.closePauseVideoFocus) {
      if (this.userTimer) {
        Util.clearTimeout(this, this.userTimer)
        this.userTimer = null
      }
      this.focus()
    }
  }

  /**
   * @protected
   */
  onEnded () {
    this.updateAcc('ended')
    this.addClass(STATE_CLASS.ENDED)
    this.setState(STATES.ENDED)
    // this.removeClass(STATE_CLASS.PLAYING)
  }

  /**
   * @protected
   */
  onError () {
    // this.setState(STATES.ERROR)
    this.isError = true
    this.updateAcc('error')
    this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
    this.removeClass(STATE_CLASS.NO_START)
    this.removeClass(STATE_CLASS.ENTER)
    this.removeClass(STATE_CLASS.LOADING)
    this.addClass(STATE_CLASS.ERROR)
  }

  /**
   * @protected
   */
  onSeeking () {
    if (!this.isSeeking) {
      this.updateAcc('seeking')
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
    this.updateAcc('waiting')
    this.waitTimer = Util.setTimeout(this, () => {
      this.addClass(STATE_CLASS.LOADING)
      Util.clearTimeout(this, this.waitTimer)
      this.waitTimer = null
    }, this.config.minWaitDelay)
  }

  /**
   * @protected
   */
  onPlaying () {
    this.isError = false
    const { NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING } = STATE_CLASS
    const clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING]
    clsList.forEach((cls) => {
      this.removeClass(cls)
    })
    if (!this._accPlayed.t && !this.paused && !this.ended) {
      this._accPlayed.t = new Date().getTime()
    }
  }

  /**
   * @protected
   */
  onTimeupdate () {
    !this._videoHeight && this.media.videoHeight && this.resize()
    if ((this.waitTimer || this.hasClass(STATE_CLASS.LOADING)) &&
      this.media.readyState > 2
    ) {
      this.removeClass(STATE_CLASS.LOADING)
      Util.clearTimeout(this, this.waitTimer)
      this.waitTimer = null
    }

    // 兼容safari在调整为静音之后未调用play自动起播问题
    if (!this.paused && this.state < STATES.RUNNING && this.duration) {
      this.setState(STATES.RUNNING)
      this.emit(Events.AUTOPLAY_STARTED)
    }

    if (!this._accPlayed.t && !this.paused && !this.ended) {
      this._accPlayed.t = new Date().getTime()
    }
  }

  onVolumechange () {
    Util.typeOf(this.config.volume) === 'Number' &&
      (this.config.volume = this.volume)
  }

  onRatechange () {
    this.config.defaultPlaybackRate = this.playbackRate
  }

  /**
   * 触发用户行为事件，第一个参数是Dom事件
   * @param { Event } event
   * @param { string } action
   * @param {[propName: string]: any; } [params]
   * @returns
   */
  emitUserAction (event, action, params) {
    if (!this.media || !action || !event) {
      return
    }
    const eventType =
      Util.typeOf(event) === 'String' ? event : event.type || ''

    // if (action === 'switch_play_pause') {
    //   Util.typeOf(params.paused) === 'Undefined' && (params.paused = this.paused)
    //   params.isFirstStart = !this.playing
    // }

    if (params.props && Util.typeOf(params.props) !== 'Array') {
      params.props = [params.props]
    }
    this.emit(Events.USER_ACTION, {
      eventType,
      action,
      // pluginName: this.pluginName,
      currentTime: this.currentTime,
      duration: this.duration,
      ended: this.ended,
      event,
      ...params
    })
  }

  updateAcc (endType) {
    if (this._accPlayed.t) {
      const _at = new Date().getTime() - this._accPlayed.t
      this._accPlayed.acc += _at
      this._accPlayed.t = 0
      if (endType === 'ended' || this.ended) {
        this._accPlayed.loopAcc = this._accPlayed.acc
      }
    }
  }

  /**
   *
   * @param { number } time
   * @returns { boolean }
   */
  checkBuffer (time) {
    const buffered = this.media.buffered
    if (!buffered || buffered.length === 0 || !this.duration) {
      return true
    }
    const currentTime = time || this.media.currentTime || 0.2
    const len = buffered.length
    for (let i = 0; i < len; i++) {
      if (buffered.start(i) <= currentTime && buffered.end(i) > currentTime) {
        return true
      }
    }
    return false
  }

  resizePosition () {
    const { rotate, vy, vx, h, w } = this.videoPos
    if (rotate < 0 && !vy && !vx) {
      return
    }
    let _pi = this.videoPos._pi
    if (!_pi && this.media.videoHeight) {
      _pi = this.media.videoWidth / this.media.videoHeight * 100
    }
    if (!_pi) {
      return
    }
    this.videoPos.pi = _pi
    const _pos = {
      rotate: rotate
    }
    let offsetY = 0
    let offsetX = 0
    let scale = 1
    const _t = rotate < 0 ? 0 : Math.abs(rotate / 90)
    const { root, innerContainer } = this
    const width = root.offsetWidth
    const height = innerContainer ? innerContainer.offsetHeight : root.offsetHeight
    let rHeight = height
    let rWidth = width
    if (_t % 2 === 0) {
      scale = h > 0 ? 100 / h : (w > 0 ? 100 / w : 1)
      _pos.scale = scale
      offsetY = vy > 0 ? (100 - h) / 2 - vy : 0
      _pos.y = _t === 2 ? 0 - offsetY : offsetY
      offsetX = vx > 0 ? (100 - w) / 2 - vx : 0
      _pos.x = _t === 2 ? 0 - offsetX : offsetX
      this.media.style.width = `${rWidth}px`
      this.media.style.height = `${rHeight}px`
    } else if (_t % 2 === 1) {
      rWidth = height
      rHeight = width
      const offset = height - width
      offsetX = -offset / 2 / rWidth * 100
      _pos.x = _t === 3 ? offsetX + vy / 2 : offsetX - vy / 2
      offsetY = offset / 2 / rHeight * 100
      _pos.y = _t === 3 ? offsetY + vx / 2 : offsetY - vx / 2
      _pos.scale = scale
      this.media.style.width = `${rWidth}px`
      this.media.style.height = `${rHeight}px`
    }
    const formStyle = Util.getTransformStyle(_pos, this.media.style.transform || this.media.style.webkitTransform)
    this.media.style.transform = formStyle
    this.media.style.webkitTransform = formStyle
  }

  /**
   * @description position video/audio according to height ratio and y coordinate
   * @param { { h: number, y?: number, x?:number, w?:number} } pos
   * @returns
   */
  position (pos = { h: 0, y: 0, x: 0, w: 0 }) {
    if (!this.media || !pos || !pos.h) {
      return
    }
    const { videoPos } = this
    videoPos.h = pos.h * 100 || 0
    videoPos.w = pos.w * 100 || 0
    videoPos.vx = pos.x * 100 || 0
    videoPos.vy = pos.y * 100 || 0
    this.resizePosition()
  }

  /**
   * @description Update configuration parameters
   * @param { IPlayerOptions } config
   */
  setConfig (config) {
    if (!config) {
      return
    }
    Object.keys(config).map((key) => {
      if (key !== 'plugins') {
        this.config[key] = config[key]
        const plugin = this.plugins[key.toLowerCase()]
        if (plugin && Util.typeOf(plugin.setConfig) === 'Function') {
          plugin.setConfig(config[key])
        }
      }
    })
  }

  /**
   * @description play another video resource
   * @param { IPlayerOptions } config
   */
  playNext (config) {
    this.resetState()
    this.setConfig(config)
    this._currentTime = 0
    this._duration = 0
    runHooks(this, 'playnext', () => {
      this.start()
      this.emit(Events.PLAYNEXT, config)
    })
  }

  resize () {
    if (!this.media) {
      return
    }
    const containerSize = this.root.getBoundingClientRect()
    this.sizeInfo.width = containerSize.width
    this.sizeInfo.height = containerSize.height
    this.sizeInfo.left = containerSize.left
    this.sizeInfo.top = containerSize.top
    const { videoWidth, videoHeight } = this.media
    const { fitVideoSize, videoFillMode } = this.config

    if (videoFillMode === 'fill' || videoFillMode === 'cover' || videoFillMode === 'contain') {
      this.setAttribute('data-xgfill', videoFillMode)
    }

    if (!videoHeight || !videoWidth) {
      return
    }
    this._videoHeight = videoHeight
    this._videoWidth = videoWidth
    const controlsHeight =
      this.controls && this.innerContainer
        ? this.controls.root.getBoundingClientRect().height
        : 0
    const width = containerSize.width
    const height = containerSize.height - controlsHeight
    const videoFit = parseInt((videoWidth / videoHeight) * 1000, 10)
    const fit = parseInt((width / height) * 1000, 10)
    let rWidth = width
    let rHeight = height
    const _style = {}
    if (
      (fitVideoSize === 'auto' && fit > videoFit) ||
      fitVideoSize === 'fixWidth'
    ) {
      rHeight = (width / videoFit) * 1000
      if (this.config.fluid) {
        _style.paddingTop = `${(rHeight * 100) / rWidth}%`
      } else {
        _style.height = `${rHeight + controlsHeight}px`
      }
    } else if (
      (fitVideoSize === 'auto' && fit < videoFit) ||
      fitVideoSize === 'fixHeight'
    ) {
      rWidth = (videoFit * height) / 1000
      _style.width = `${rWidth}px`
    }
    // 全屏不做行间css设置
    if (!this.fullscreen && !this.cssfullscreen) {
      Object.keys(_style).forEach((key) => {
        this.root.style[key] = _style[key]
      })
    }
    // video填充模式
    if (
      (videoFillMode === 'fillHeight' && fit < videoFit) ||
      (videoFillMode === 'fillWidth' && fit > videoFit)
    ) {
      this.setAttribute('data-xgfill', 'cover')
    }
    const data = {
      videoScale: videoFit,
      vWidth: rWidth,
      vHeight: rHeight,
      cWidth: rWidth,
      cHeight: rHeight + controlsHeight
    }
    this.resizePosition()
    this.emit(Events.VIDEO_RESIZE, data)
  }

  /**
   *
   * @param { number } left
   * @param { number } top
   * @returns
   */
  updateObjectPosition (left = 0, top = 0) {
    if (this.media.updateObjectPosition) {
      this.media.updateObjectPosition(left, top)
      return
    }
    this.media.style.objectPosition = `${left * 100}% ${top * 100}%`
  }

  /**
   * @protected
   * @param { number } newState
   */
  setState (newState) {
    XG_DEBUG.logInfo(
      'setState',
      `state from:${STATE_ARRAY[this.state]} to:${STATE_ARRAY[newState]}`
    )
    this._state = newState
  }

  /**
   * @description url preprocessing
   * @param { IUrl } url
   * @param { {[propName: string]: any} } [ext]
   * @returns { url: IUrl, [propName: string]: any }
   */
  preProcessUrl (url, ext) {
    const { preProcessUrl } = this.config
    return !Util.isBlob(url) && preProcessUrl && typeof preProcessUrl === 'function' ? preProcessUrl(url, ext) : { url }
  }

  /**
   * @type { number }
   */
  get state () {
    return this._state
  }

  /**
   * @type { boolean }
   */
  get isFullscreen () {
    return this.fullscreen
  }

  /**
   * @type { boolean }
   */
  get isCssfullScreen () {
    return this.cssfullscreen
  }

  /**
   * @type { boolean }
   * @description 是否开始播放
   */
  get hasStart () {
    return this._hasStart
  }

  set hasStart (bool) {
    if (typeof bool === 'boolean') {
      this._hasStart = bool
      if (bool === false) {
        this.setState(STATES.READY)
      }
      this.emit('hasstart')
    }
  }

  /**
   * @type { boolean }
   * @description 是否已经进入起播状态
   */
  get isPlaying () {
    return this._state === STATES.RUNNING || this._state === STATES.ENDED
  }

  set isPlaying (value) {
    if (value) {
      this.setState(STATES.RUNNING)
    } else {
      this._state >= STATES.RUNNING && (this.setState(STATES.ATTACHED))
    }
  }

  /**
   * @type { Array.<IDefinition> }
   */
  set definitionList (list) {
    const { definition } = this.config
    let curDef = null
    let targetDef = null

    definition.list = list
    this.emit('resourceReady', list)

    list.forEach((item) => {
      if (this.curDefinition?.definition === item.definition) {
        curDef = item
      }
      if (definition.defaultDefinition === item.definition) {
        targetDef = item
      }
    })
    if (!targetDef && list.length > 0) {
      targetDef = list[0]
    }
    curDef
      ? this.changeDefinition(curDef)
      : targetDef && this.changeDefinition(targetDef)
  }

  get definitionList () {
    if (!this.config || !this.config.definition) {
      return []
    }
    return this.config.definition.list || []
  }

  /**
   * @description VideoFrames infos
   * @type { {
   *   total: number,
   *   dropped: number,
   *   corrupted: number,
   *   droppedRate: number,
   *   droppedDuration: number
   * } }
   */
  get videoFrameInfo () {
    const ret = {
      total: 0,
      dropped: 0,
      corrupted: 0,
      droppedRate: 0,
      droppedDuration: 0
    }
    if (!this.media || !this.media.getVideoPlaybackQuality) {
      return ret
    }
    const _quality = this.media.getVideoPlaybackQuality()
    ret.dropped = _quality.droppedVideoFrames || 0
    ret.total = _quality.totalVideoFrames || 0
    ret.corrupted = _quality.corruptedVideoFrames || 0
    if (ret.total > 0) {
      ret.droppedRate = (ret.dropped / ret.total) * 100
      ret.droppedDuration = parseInt(
        (this.cumulateTime / ret.total) * ret.dropped,
        0
      )
    }
    return ret
  }

  /**
   * @type { string }
   */
  set lang (lang) {
    const result = I18N.langKeys.filter((key) => key === lang)
    if (result.length === 0 && lang !== 'zh') {
      console.error(
        `Sorry, set lang fail, because the language [${lang}] is not supported now, list of all supported languages is [${I18N.langKeys.join()}] `
      )
      return
    }
    this.config.lang = lang
    pluginsManager.setLang(lang, this)
  }

  get lang () {
    return this.config.lang
  }

  get i18n () {
    let _l = this.config.lang
    if (_l === 'zh') {
      _l = 'zh-cn'
    }
    return this.__i18n.lang[_l] || this.__i18n.lang.en
  }

  get i18nKeys () {
    return this.__i18n.textKeys || {}
  }

  /**
   * @type { string }
   */
  get version () {
    return version
  }

  /**
   * @type { number | string }
   */
  get playerId () {
    return this._pluginInfoId
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
    return this.plugins.poster
      ? this.plugins.poster.config.poster
      : this.config.poster
  }

  get readyState () {
    return super.readyState
  }

  get error () {
    const key = super.error
    return this.i18n[key] || key
  }

  get networkState () {
    return super.networkState
  }

  /**
   * @type { boolean }
   */
  get fullscreenChanging () {
    return !(this._fullScreenOffset === null)
  }

  /**
   * 累计观看时长
   * @type { number }
   */
  get cumulateTime () {
    const { acc, t } = this._accPlayed
    return t ? new Date().getTime() - t + acc : acc
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
   * @type {number}
   * @description Media element rotation angle, Only multiples of 90 degrees are supported
   */
  set videoRotateDeg (val) {
    val = Util.convertDeg(val)
    if (val % 90 !== 0 || val === this.videoPos.rotate) {
      return
    }
    this.videoPos.rotate = val
    this.resizePosition()
  }

  get videoRotateDeg () {
    return this.videoPos.rotate
  }

  /**
   * @description 均衡下载速度，单位kb/s, 根据10条最新下载速度计算出来的加权值，如果没有测速能力则默认是0
   * @type { number }
   */
  set avgSpeed (val) {
    AVG_SPEED = val
  }

  get avgSpeed () {
    return AVG_SPEED
  }

  /**
   * @type { number }
   * 最新一次下载速度，单位kb/s, 如果没有测速能力则默认是0
   */
  set realTimeSpeed (val) {
    REAL_TIME_SPEED = val
  }

  get realTimeSpeed () {
    return REAL_TIME_SPEED
  }

  get offsetCurrentTime () {
    return this._offsetInfo.currentTime || 0
  }

  set offsetCurrentTime (val) {
    this._offsetInfo.currentTime = val
  }

  get offsetDuration () {
    return this._offsetInfo.duration || 0
  }

  set offsetDuration (val) {
    this._offsetInfo.duration = val || 0
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
   * @returns {boolean} isSuccess
   */
  useHooks (hookName, handler) {
    return useHooks.call(this, ...arguments)
  }

  /**
   *
   * @param { string } hookName
   * @param { (player: any, ...args) => boolean | Promise<any> } handler
   * @returns
   */
  removeHooks (hookName, handler) {
    return removeHooks.call(this, ...arguments)
  }

  /**
   *
   * @param { string } pluginName
   * @param { string } hookName
   * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   * @returns { boolean } isSuccess
   */
  usePluginHooks (pluginName, hookName, handler, ...args) {
    return usePluginHooks.call(this, ...arguments)
  }

  /**
   *
   * @param { string } pluginName
   * @param { string } hookName
   * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   * @returns { boolean } isSuccess
   */
  removePluginHooks (pluginName, hookName, handler, ...args) {
    return removePluginHooks.call(this, ...arguments)
  }

  /**
   * 设置当前实例的用户激活态
   * @param { boolean } isActive
   * @param { boolean } [isMuted]
   */
  setUserActive (isActive, isMuted) {
    if (typeof isMuted === 'boolean' && isMuted !== this.muted) {
      this.addInnerOP('volumechange')
      this.muted = isMuted
    }
    pluginsManager.setCurrentUserActive(this.playerId, isActive)
  }

  /**
   * 当前浏览器是否支持hevc编码
   * @returns {boolean}
   */
  static isHevcSupported () {
    return Sniffer.isHevcSupported()
  }

  /**
   * 检测编码参数是否被当前浏览器支持
   * @doc https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities/decodingInfo
   * @param {MediaDecodingConfiguration} info
   * @returns {MediaCapabilitiesDecodingInfo}
   */
  static probeConfigSupported (info) {
    return Sniffer.probeConfigSupported(info)
  }

  /**
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

  /**
   * @deprecated
   * 插件全部迁移完成再做删除
   */
  static use (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }

  static defaultPreset = null;

  /**
   * @description 自定义media构造函数
   */
  static XgVideoProxy = null;
}

// use the default instance manager.
Player.instManager = InstManager.getInstance()

export {
  Player as default,
  Plugin,
  BasePlugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N
}
