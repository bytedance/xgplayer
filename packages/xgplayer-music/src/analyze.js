import util from './util'
const {
  requestAnimationFrame: req, cancelAnimationFrame: cancel, isSqrt, Color
} = util

class Analyze {
  constructor (player, canvas) {
    this.canvas = canvas
    this.player = player
    if (!Analyze.AudioCtx) {
      return
    }
    const audioCtx = new Analyze.AudioCtx()
    const analyser = audioCtx.createAnalyser()
    const gainNode = audioCtx.createGain()
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    analyser.smoothingTimeConstant = 0.85
    gainNode.gain.setValueAtTime(player.volume, player.currentTime)
    this.er = audioCtx.createMediaElementSource(player.video)
    this.analyser = analyser
    this.ctx = canvas.getContext('2d')
    this.er.connect(analyser)
    analyser.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    this.style = {
      bgColor: '#c8c8c8',
      color: '#643232'
    }
    this.__type__ = 'bars'
    this.__size__ = 256
    this.__status__ = {
      switch: 'on'
    };
    ['play', 'playing', 'seeked'].forEach(name => {
      player.on(name, () => {
        this[`__${this.__type__}__`]()
      })
    });
    ['seeking', 'waiting', 'pause', 'ended'].forEach(name => {
      cancel(this.__status__[this.__type__])
    })
    player.on('volumechange', () => {
      gainNode.gain.setValueAtTime(player.volume, player.currentTime)
    })
    player.on('destroy', () => {
      audioCtx.close()
    })
  }

  __wave__ () {
    cancel(this.__status__.wave)
    cancel(this.__status__.bars)
    if (this.__status__.switch === 'off') {
      return
    }
    const analyser = this.analyser
    const canvas = this.canvas
    const ctx = this.ctx
    const bufferLen = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLen)
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const color = new Color(this.style.color).toRGB()
    const bgColor = new Color(this.style.color).toRGB()
    analyser.fftSize = this.__size__
    const draw = () => {
      this.__status__.wave = req(draw)
      analyser.getByteTimeDomainData(dataArray)
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      ctx.fillStyle = bgColor
      ctx.lineWidth = 2
      ctx.strokeStyle = color
      ctx.beginPath()
      const sliceWidth = WIDTH * 1.0 / bufferLen
      let x = 0
      for (let i = 0; i < bufferLen; i++) {
        const v = dataArray[i] / 128.0
        const y = v * HEIGHT / 2
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        x += sliceWidth
      }
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
    }
    draw()
  }

  __bars__ () {
    cancel(this.__status__.wave)
    cancel(this.__status__.bars)
    if (this.__status__.switch === 'off') {
      return
    }
    const analyser = this.analyser
    const canvas = this.canvas
    const ctx = this.ctx
    const bufferLen = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLen)
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const color = new Color(this.style.color).toArray()
    const bgColor = new Color(this.style.color).toRGB()
    analyser.fftSize = this.__size__

    const draw = () => {
      this.__status__.bars = req(draw)
      analyser.getByteFrequencyData(dataArray)
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      const barWidth = (WIDTH / bufferLen) * 2.5
      let barHeight
      let x = 0
      for (let i = 0; i < bufferLen; i++) {
        barHeight = dataArray[i]
        ctx.fillStyle = `rgb(${barHeight + color[0]},${color[1]},${color[2]})`
        ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
        x += barWidth + 1
      }
    }
    draw()
  }

  on () {
    this.__status__.switch = 'on'
    this[`__${this.__type__}__`]()
  }

  off () {
    this.__status__.switch = 'off'
    cancel(this.__status__.wave)
    cancel(this.__status__.bars)
  }

  set mode (mode) {
    if (Analyze.Mode.filter(item => item === mode).length) {
      this.__type__ = mode
      if (this.__status__.switch === 'on') {
        this[`__${mode}__`]()
      }
    }
  }

  get mode () {
    return this.__type__
  }

  set size (num) {
    if (num < 65536 && isSqrt(num, 2)) {
      this.__size__ = num
      this.analyser.fftSize = num
      this[`__${this.__type__}__`]()
    }
  }

  get size () {
    return this.__size__
  }

  get status () {
    return this.__status__.switch
  }

  static get AudioCtx () {
    return window.AudioContext || window.webkitAudioContext
  }

  static get Mode () {
    return ['wave', 'bars']
  }
}

export default Analyze
