import {
  requestAnimationFrame as req, cancelAnimationFrame as cancel, isSqrt
} from './util'

class Analyze {
  constructor (player, canvas) {
    this.canvas = canvas
    this.player = player
    const audioCtx = new Analyze.AudioCtx()
    let analyser = audioCtx.createAnalyser()
    let gainNode = audioCtx.createGain()
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
        this[this.__type__]()
      })
    });
    ['seeking', 'waiting', 'pause', 'ended'].forEach(name => {
      cancel(this.__status__[this.__type__])
    })
    player.on('volumechange', () => {
      gainNode.gain.setValueAtTime(player.volume, player.currentTime)
    })
  }

  wave () {
    cancel(this.__status__['wave'])
    cancel(this.__status__['bars'])
    if (this.__status__.switch === 'off') {
      return
    }
    const draw = () => {

    }
    this.__status__['wave'] = req(draw)
  }
  bars () {
    cancel(this.__status__['wave'])
    cancel(this.__status__['bars'])
    if (this.__status__.switch === 'off') {
      return
    }
    let analyser = this.analyser
    let canvas = this.canvas
    let ctx = this.ctx
    let bufferLen = analyser.frequencyBinCount
    let dataArray = new Uint8Array(bufferLen)
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    analyser.fftSize = this.__size__
    console.log(analyser.fftSize, this.__size__)

    const draw = () => {
      this.__status__['bars'] = req(draw)
      analyser.getByteFrequencyData(dataArray)
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      const barWidth = (WIDTH / bufferLen) * 2.5
      let barHeight
      let x = 0
      for (var i = 0; i < bufferLen; i++) {
        barHeight = dataArray[i]
        ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
        x += barWidth + 1
      }
    }
    draw()
  }
  on () {
    this.__status__.switch = 'on'
    this[this.__type__]()
  }
  off () {
    this.__status__.switch = 'off'
    cancel(this.__status__['wave'])
    cancel(this.__status__['bars'])
  }
  set mode (mode) {
    if (Analyze.Mode.find(item => item === mode)) {
      this.__type__ = mode
      if (this.__status__.switch === 'on') {
        this[mode]()
      }
    }
  }
  get mode () {
    return this.__type__
  }
  set size (num) {
    if (isSqrt(num, 2)) {
      this.__size__ = num
      this.analyser.fftSize = num
      this[this.__type__]()
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
  static Mode () {
    return ['wave', 'bars']
  }
}

export default Analyze
