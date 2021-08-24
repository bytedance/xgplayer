import Plugin, { Events, Util, Sniffer } from '../../plugin'
import XG_DEBUG from '../../utils/debug'

const MODES = {
  REAL_TIME: 'realtime',
  FIRST_FRAME: 'firstframe',
  FRAME_RATE: 'framerate'
}

function nowTime () {
  try {
    return window.performance.now()
  } catch (e) {
    return new Date().getTime()
  }
}
/**
 * Check whether the current video object supports screenshots
 * @param { VideoElement } video
 * @returns
 */
function checkVideoIsSupport (video) {
  if (Sniffer.browser === 'safari' && (/^blob/.test(video.currentSrc) || /^blob/.test(video.src))) {
    return false
  }

  return true
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
      disable: true,
      /**
       * Rendering method
       * realtime - Realtime rendering
       * firstframe - Render only the first frame
       * framerate - Render by frame
       */
      mode: 'framerate',
      frameRate: 10, // Frame rate when mode=framerate
      filter: 'blur(50px)', // Filter settings
      addMask: true, // Whether need a mask
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

  afterCreate () {
    if (this.playerConfig.dynamicBg === true) {
      this.config.disable = false
    }
    if (!DynamicBg.isSupport) {
      this.config.disable = true
    }
    const { disable, mode } = this.config
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
      y: 0
    }
    /**
     * @readonly
     */
    this.isStart = false
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
    this.interval = parseInt(1000 / this.config.frameRate, 10)

    /**
     * @readonly
     */
    this.canvas = null
    /**
     * @readonly
     */
    this.canvasCtx = null

    this.once(Events.COMPLETE, () => {
      this.init()
      !this.player.paused && this.start()
    })

    this.once(Events.LOADED_DATA, this.onLoadedData)
    this.on(Events.URL_CHANGE, () => {
      this.once(Events.LOADED_DATA, this.onLoadedData)
    })
    if (mode !== MODES.FIRST_FRAME) {
      this.on(Events.PLAY, () => {
        this.start()
      })
      this.on(Events.PAUSE, () => {
        this.stop()
      })
    }

    // First frame rendering
    if (mode === MODES.FIRST_FRAME) {
      this.once(Events.TIME_UPDATE, () => {
        const { video } = this.player
        video && checkVideoIsSupport(video) && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      })
    }
  }

  onLoadedData = () => {
    const { video } = this.player
    this.videoPI = parseInt(video.videoWidth / video.videoHeight * 100, 10)
  }

  /**
   * @private
   */
  init () {
    const { player, config } = this
    try {
      // Ensure that the node is inserted before player.video
      const parent = player.innerContainer || player.root
      parent.insertAdjacentHTML('afterbegin',
        `<div class="xgplayer-dynamic-bg"><canvas>
        </canvas><xgmask></xgmask></div>`)
      this.root = parent.children[0]
      this.canvas = this.find('canvas')
      // Canvas filter does not take effect in safari
      if (Sniffer.browser === 'safari') {
        this.canvas.style.filter = config.filter
        this.canvas.style.webkitFilter = config.filter
      }
      this.mask = this.find('xgmask')
      config.addMask && (this.mask.style.background = config.maskBg)
      this.canvasCtx = this.canvas.getContext('2d')
      const { poster } = this.playerConfig
      if (poster) {
        const url = Util.typeOf(poster) === 'String' ? poster : (Util.typeOf(poster.poster) === 'String' ? poster.poster : null)
        this.updateImg(url)
      }
    } catch (e) {
      XG_DEBUG.logError('plugin:DynamicBg', e)
    }
  }

  start = () => {
    const { video } = this.player
    const _now = nowTime()
    if (!checkVideoIsSupport(video) || !this.canvasCtx) {
      return
    }
    this.stop()
    if (this.config.mode === MODES.REAL_TIME) {
      video && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      this.preTime = _now
    } else if (_now - this.preTime >= this.interval) {
      video && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      this.preTime = _now
    }
    this.frameId = Util.requestAnimationFrame(this.start)
  }

  stop = () => {
    if (this.frameId) {
      Util.cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }

  updateImg (url) {
    if (!url) {
      return
    }
    // Render using the image
    const { width, height } = this.canvas.getBoundingClientRect()
    let image = new window.Image()
    image.onload = () => {
      if (!this.canvas) {
        return
      }
      this.canvas.height = height
      this.canvas.width = width
      this.update(image, image.width, image.height)
      image = null
    }
    image.src = url
  }

  update (video, videoWidth, videoHeight) {
    if (!this.canvas || !this.canvasCtx) {
      return
    }
    try {
      const { _pos, config } = this
      const { width, height } = this.canvas.getBoundingClientRect()
      this.videoPI = parseInt(videoWidth / videoHeight * 100, 10)
      if (width !== _pos.width || height !== _pos.height) {
        const pi = parseInt(width / height * 100, 10)
        _pos.width = this.canvas.width = width
        _pos.height = this.canvas.height = height
        let rheight = height
        let rwidth = width
        if (pi < this.videoPI) {
          rwidth = parseInt(height * this.videoPI / 100, 10)
        } else if (pi > this.videoPI) {
          rheight = parseInt(width * 100 / this.videoPI, 10)
        }
        if (pi < this.videoPI) {
          rwidth = parseInt(height * this.videoPI / 100, 10)
        } else if (pi > this.videoPI) {
          rheight = parseInt(width * 100 / this.videoPI, 10)
        }
        _pos.rwidth = rwidth * 1.2
        _pos.rheight = rheight * 1.2
        _pos.x = (width - _pos.rwidth) / 2
        _pos.y = (height - _pos.rheight) / 2
      }
      // console.log(`x:${_pos.x} y:${_pos.y}  rwidth:${_pos.rwidth} rheight:${ _pos.rheight}`)
      this.canvasCtx.filter = config.filter
      this.canvasCtx.drawImage(video, _pos.x, _pos.y, _pos.rwidth, _pos.rheight)
    } catch (e) {
      XG_DEBUG.logError('plugin:DynamicBg', e)
    }
  }

  destroy () {
    this.stop()
    this.canvasCtx = null
    this.canvas = null
  }

  render () {
    return ''
  }
}

export default DynamicBg
