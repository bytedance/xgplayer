import Plugin, { Events, Util, Sniffer } from '../../plugin'
import XG_DEBUG from '../../utils/debug'
import './index.scss'

const MODES = {
  REAL_TIME: 'realtime',
  FIRST_FRAME: 'firstframe',
  FRAME_RATE: 'framerate',
  POSTER: 'poster'
}

function nowTime () {
  try {
    return parseInt(window.performance.now(), 10)
  } catch (e) {
    return new Date().getTime()
  }
}

/**
 * Check whether the current environment supports canvas
 * @returns { Boolean }
 */
function checkIsSupportCanvas () {
  try {
    const ctx = document.createElement('canvas').getContext
    if (ctx) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * @typedef { {
 *   disable?: boolean,
 *   mode?: "realtime" | "firstframe" | "framerate",
 *   frameRate?: number
 *   filter?: string,
 *   addMask?: boolean,
 *   maskBg?: string,
 *    multiple? : number,
 *   [propName: string]: any
 * } } IDynamicBgConfig
 */

let isSupportCanvas = null
class DynamicBg extends Plugin {
  static get pluginName () {
    return 'dynamicBg'
  }

  /**
   * @type IDynamicBgConfig
   */
  static get defaultConfig () {
    return {
      isInnerRender: false,
      disable: true,
      index: -1,
      /**
       * Rendering method
       * realtime - Realtime rendering
       * firstframe - Render only the first frame
       * framerate - Render by frame
       * poster - Render by poster only
       */
      mode: 'framerate',
      frameRate: 10, // Frame rate when mode=framerate
      filter: 'blur(50px)', // Filter settings
      startFrameCount: 2, // 起始连续渲染次数
      startInterval: 0, // 初始渲染间隔
      addMask: true, // Whether need a mask
      multiple: 1.2, // 画面放大倍数
      maskBg: 'rgba(0,0,0,0.7)' // Mask background color
    }
  }

  /**
   * @type {boolean}
   * @description Does the current environment support Canvas
   */
  static get isSupport () {
    if (typeof isSupportCanvas === 'boolean') {
      return isSupportCanvas
    }
    isSupportCanvas = checkIsSupportCanvas()
    return isSupportCanvas
  }

  static supportCanvasFilter () {
    return !(Sniffer.browser === 'safari' || Sniffer.browser === 'firefox')
  }

  afterCreate () {
    if (this.playerConfig.dynamicBg === true) {
      this.config.disable = false
    }
    if (!DynamicBg.isSupport) {
      this.config.disable = true
    }
    const { disable, mode, frameRate } = this.config
    if (disable) {
      return
    }
    /**
     * @private
     */
    this._pos = {
      width: 0,
      height: 0,
      rwidth: 0,
      rheight: 0,
      x: 0,
      y: 0,
      pi: 0
    }
    /**
     * @readonly
     */
    this.isStart = false

    this._isLoaded = false
    /**
     * @readonly
     */
    this.videoPI = 0
    /**
     * @readonly
     */
    this.preTime = 0
    /**
     * @readonly
     */
    this.interval = parseInt(1000 / frameRate, 10)

    /**
     * @readonly
     */
    this.canvas = null
    /**
     * @readonly
     */
    this.canvasCtx = null

    this._frameCount = 0

    this._loopType = this.config.mode !== MODES.REAL_TIME && this.interval >= 1000 ? 'timer' : 'animation'

    this.once(Events.COMPLETE, () => {
      if (!this.player) {
        return
      }
      this.init()
      this.renderByPoster()
      if (!this.player.paused) {
        this.start()
      }
    })

    if (mode === MODES.POSTER) {
      return
    }

    if (mode !== MODES.FIRST_FRAME) {
      this.on(Events.EMPTIED, () => {
        this.stop()
      })
      this.on(Events.PLAY, () => {
        const { startInterval } = this.config
        this._checkIfCanStart() && this.start(0, startInterval)
      })
      this.on(Events.PAUSE, () => {
        this.stop()
      })
    }

    this.on(Events.LOADED_DATA, this.onLoadedData)
    this.on(Events.LOAD_START, () => {
      this._isLoaded = false
      this.stop()
    })
    document.addEventListener('visibilitychange', this.onVisibilitychange)
  }

  setConfig (config) {
    Object.keys(config).forEach(key => {
      if (key === 'root' && config[key] !== this.config[key]) {
        this.reRender(config[key])
      } else if (key === 'frameRate') {
        this.interval = parseInt(1000 / config[key], 10)
      } else if (key === 'disable' && config[key]) {
        this.stop()
      }
      this.config[key] = config[key]
    })
  }

  onLoadedData = (e) => {
    if (!this.player) { return }
    this._frameCount = this.config.startFrameCount
    this.stop()
    this.renderOnTimeupdate(e)
    this.off(Events.TIME_UPDATE, this.renderOnTimeupdate)
    this.on(Events.TIME_UPDATE, this.renderOnTimeupdate)
  }

  onVisibilitychange = (e) => {
    if (document.visibilityState === 'visible') {
      this._checkIfCanStart() && this.start()
    } else if (document.visibilityState === 'hidden') {
      this.stop()
    }
  }

  /**
   * @private
   * 初始化 canvas对象并使用海报图先渲染首帧w11
   */
  init (_root) {
    const { player, config } = this
    this.canvasFilter = DynamicBg.supportCanvasFilter()
    try {
      // 保证节点插入到video之前
      let parent = _root || config.root
      if (!parent) {
        parent = !config.isInnerRender ? player.root : (player.innerContainer || player.root)
      }
      parent.insertAdjacentHTML('afterbegin',
        `<div class="xgplayer-dynamic-bg" data-index="${config.index}"><canvas>
        </canvas><xgmask></xgmask></div>`)
      this.root = parent.children[0]
      this.canvas = this.find('canvas')
      // safari中canvas filter不生效, 使用css滤镜
      if (!this.canvasFilter) {
        this.canvas.style.filter = config.filter
        this.canvas.style.webkitFilter = config.filter
      }
      this.mask = this.find('xgmask')

      config.addMask && (this.mask.style.background = config.maskBg)
      this.canvasCtx = this.canvas.getContext('2d')
    } catch (e) {
      XG_DEBUG.logError('plugin:DynamicBg', e)
    }
  }

  reRender (root) {
    const { disable } = this.config
    if (!disable && !this.root) {
      return
    }
    this.stop()
    const _p = this.root ? this.root.parentElement : null
    if (_p !== root) {
      _p.removeChild(this.root)
    }
    if (!root) {
      this.root = null
      return
    }
    this.init(root)
    this.renderOnce()
    const { startInterval } = this.config
    this._checkIfCanStart() && this.start(0, startInterval)
  }

  /**
 * Check whether the current video object supports screenshots
 * @param { Object } video
 * @returns { DomElement | null }
 */
  checkVideoIsSupport (video) {
    if (!video) {
      return null
    }
    const _tVideo = video && video instanceof window.HTMLVideoElement ? video : (video.canvas ? video.canvas : (video.flyVideo ? video.flyVideo : null))
    if (_tVideo && !(Sniffer.browser === 'safari' && Util.isMSE(_tVideo))) {
      return _tVideo
    }

    const _tagName = _tVideo ? _tVideo.tagName.toLowerCase() : ''
    if (_tagName === 'canvas' || _tagName === 'img') {
      return _tVideo
    }

    return null
  }

  renderByPoster () {
    const { poster } = this.playerConfig
    if (poster) {
      const url = Util.typeOf(poster) === 'String' ? poster : (Util.typeOf(poster.poster) === 'String' ? poster.poster : null)
      this.updateImg(url)
    }
  }

  renderOnTimeupdate = (e) => {
    if (this._frameCount > 0) {
      this.renderOnce()
      this._frameCount--
    } else {
      this._isLoaded = true
      this.off(Events.TIME_UPDATE, this.renderOnTimeupdate)
      const { startInterval } = this.config
      !this.player.paused && this._checkIfCanStart() && this.start(0, startInterval)
    }
  }

  _checkIfCanStart () {
    const { mode } = this.config
    return this._isLoaded && !this.player.paused && mode !== MODES.FIRST_FRAME && mode !== MODES.POSTER
  }

  /**
   * just render once
   * @returns
   */
  renderOnce () {
    const video = this.player.video
    if (!video.videoWidth || !video.videoHeight) {
      return
    }
    this.videoPI = parseInt(video.videoWidth / video.videoHeight * 100, 10)
    const _sVideo = this.checkVideoIsSupport(video)
    // console.log('>>>renderOnce, update', _sVideo, this.videoPI)
    _sVideo && this.update(_sVideo, this.videoPI)
  }

  start = (time, interval) => {
    const video = this.player.video
    const _now = nowTime()
    const _sVideo = this.checkVideoIsSupport(video)
    if (!_sVideo || !this.canvasCtx) {
      return
    }

    if (!interval) {
      interval = this.interval
    }
    this.stop()
    if (video.videoWidth && video.videoHeight) {
      this.videoPI = video.videoHeight > 0 ? parseInt(video.videoWidth / video.videoHeight * 100, 10) : 0
      if (this.config.mode === MODES.REAL_TIME) {
        video && video.videoWidth && this.update(_sVideo, this.videoPI)
        this.preTime = _now
      } else if (_now - this.preTime >= interval) {
        video && video.videoWidth && this.update(_sVideo, this.videoPI)
        this.preTime = _now
      }
    }
    this.frameId = this._loopType === 'timer' ? Util.setTimeout(this, this.start, interval) : Util.requestAnimationFrame(this.start)
  }

  stop = () => {
    if (this.frameId) {
      this._loopType === 'timer' ? Util.clearTimeout(this, this.frameId) : Util.cancelAnimationFrame(this.frameId)
      // window.clearTimeout(this.frameId)
      this.frameId = null
    }
  }

  updateImg (url) {
    // TODO: 需要改造，使用domcss样式渲染，不再使用canvas渲染
    if (!url) {
      return
    }
    // Render using the image
    const { width, height } = this.canvas.getBoundingClientRect()
    let image = new window.Image()
    image.onload = () => {
      if (!this.canvas || this.frameId || this.isStart) {
        return
      }
      this.canvas.height = height
      this.canvas.width = width
      const pi = parseInt(width / height * 100, 10)
      // console.log('>>>updateImg update', image, pi)
      this.update(image, pi)
      image = null
    }
    image.src = url
  }

  update (video, sourcePI) {
    if (!this.canvas || !this.canvasCtx || !sourcePI) {
      return
    }
    try {
      const { _pos, config } = this
      const { width, height } = this.canvas.getBoundingClientRect()
      if (width !== _pos.width || height !== _pos.height || _pos.pi !== sourcePI) {
        const pi = parseInt(width / height * 100, 10)
        _pos.pi = sourcePI
        _pos.width !== width && (_pos.width = this.canvas.width = width)
        _pos.height !== height && (_pos.height = this.canvas.height = height)
        let rheight = height
        let rwidth = width
        if (pi < sourcePI) {
          rwidth = parseInt(height * sourcePI / 100, 10)
        } else if (pi > sourcePI) {
          rheight = parseInt(width * 100 / sourcePI, 10)
        }
        _pos.rwidth = rwidth * config.multiple
        _pos.rheight = rheight * config.multiple
        _pos.x = (width - _pos.rwidth) / 2
        _pos.y = (height - _pos.rheight) / 2
      }
      // console.log(`x:${_pos.x} y:${_pos.y}  rwidth:${_pos.rwidth} rheight:${_pos.rheight}`)
      this.canvasFilter && (this.canvasCtx.filter = config.filter)
      this.canvasCtx.drawImage(video, _pos.x, _pos.y, _pos.rwidth, _pos.rheight)
    } catch (e) {
      XG_DEBUG.logError('plugin:DynamicBg', e)
    }
  }

  destroy () {
    this.stop()
    document.removeEventListener('visibilitychange', this.onVisibilitychange)
    this.canvasCtx = null
    this.canvas = null
  }

  render () {
    return ''
  }
}

export default DynamicBg
