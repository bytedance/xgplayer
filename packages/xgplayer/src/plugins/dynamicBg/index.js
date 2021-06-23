import Plugin, { Events, Util, Sniffer } from '../../plugin'

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

function checkIsSupport (video) {
  if (Sniffer.browser === 'safari' && (/^blob/.test(video.currentSrc) || /^blob/.test(video.src))) {
    return false
  }

  return true
}

class DynamicBg extends Plugin {
  static get pluginName () {
    return 'dynamicBg'
  }

  static get defaultConfig () {
    return {
      disable: true,
      mode: 'framerate', // realtime-实时渲染 firstframe - 仅仅渲染首帧 framerate-按帧渲染
      frameRate: 10, // 按帧的时候渲染帧率
      filter: 'blur(50px)', // 滤镜设置
      addMask: true, // 是否需要蒙层
      maskBg: 'rgba(0,0,0,0.7)' // 蒙层颜色
    }
  }

  afterCreate () {
    if (this.playerConfig.dynamicBg === true) {
      this.config.disable = false
    }
    const { disable, mode } = this.config
    if (disable) {
      return
    }
    this._pos = {
      width: 0,
      height: 0,
      rwidth: 0,
      rheight: 0,
      x: 0,
      y: 0
    }
    this.isStart = false
    this.videoPI = 0
    this.preTime = 0
    this.interval = parseInt(1000 / this.config.frameRate, 10)
    this.once(Events.COMPLETE, () => {
      this.init()
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

    // 首帧渲染
    if (mode === MODES.FIRST_FRAME) {
      this.once(Events.TIME_UPDATE, () => {
        const { video } = this.player
        video && checkIsSupport(video) && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      })
    }
  }

  onLoadedData = () => {
    const { video } = this.player
    this.videoPI = parseInt(video.videoWidth / video.videoHeight * 100, 10)
  }

  init () {
    const { player, config } = this
    try {
      // 保证节点插入到video之前
      const parent = player.video.parentElement
      parent.insertAdjacentHTML('afterbegin',
        `<div class="xgplayer-dynamic-bg"><canvas>
        </canvas><xgmask></xgmask></div>`)
      this.root = parent.children[0]
      this.canvas = this.find('canvas')
      // safari中canvas filter不生效
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
      console.error('plugin:VideoBg', e)
    }
  }

  start = () => {
    const { video } = this.player
    const _now = nowTime()
    if (!checkIsSupport(video)) {
      return
    }
    if (this.config.mode === MODES.REAL_TIME) {
      video && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      this.preTime = _now
    } else if (_now - this.preTime >= this.interval) {
      video && video.videoWidth && this.update(video, video.videoWidth, video.videoHeight)
      this.preTime = _now
    }
    this.frameId = window.requestAnimationFrame(this.start)
  }

  stop = () => {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }

  updateImg (url) {
    if (!url) {
      return
    }
    // 使用首帧预览图渲染
    const { width, height } = this.canvas.getBoundingClientRect()
    let image = new window.Image()
    image.onload = () => {
      this.canvas.height = height
      this.canvas.width = width
      this.update(image, image.width, image.height)
      image = null
    }
    image.src = url
  }

  update (video, videoWidth, videoHeight) {
    if (!this.canvas) {
      return
    }
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
  }

  destroy () {
    this.stop()
  }

  render () {
    return ''
  }
}

export default DynamicBg
