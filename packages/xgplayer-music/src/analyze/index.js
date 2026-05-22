
import render, { MODES } from './render'
import { getGradient } from './helper'

/**
 * @typedef {{
 *  fftSize?: number,
 *  mode?: 'bars' | 'vertLines' | 'lightning' | 'doubleLine' | 'doubleBars' | 'waves',
 *  colors?: Array<string>,
 *  stroke?: number,
 *  bgColor?: string,
 *  isGradient?: boolean
 * }} IAnalyzeOptions
 */
class Analyze {
  static get defaultConfig () {
    return {
      fftSize: 16384,
      count: 1024,
      mode: 'bars',
      colors:  ['#ff8177', '#cf556c', '#f99185', '#b12a5b'],
      stroke: 2,
      bgColor: '#000',
      isGradient: true,
      linear: null
    }
  }

  /**
   * all modes
   * @type Array<string>
   */
  static get MODES () {
    return MODES
  }

  static get AudioCtx () {
    return window.AudioContext || window.webkitAudioContext
  }

  /**
   * @constructor
   * @param { any } player
   * @param { HTMLElement } canvas
   * @param { IAnalyzeOptions } options
   * @returns
   */
  constructor (player, canvas, options = {}) {
    this.canvas = canvas
    const { width, height } = this.canvas.getBoundingClientRect()
    this.canvas.width = width * 2
    this.canvas.height = height * 2
    this.player = player
    this.options = Analyze.defaultConfig
    Object.keys(options).map(key => {
      this.options[key] = options[key]
    })

    if (!Analyze.AudioCtx) {
      return
    }
    if (player.audioCtx) {
      this._audioCtx = player.audioCtx
    } else {
      this._audioCtx = new Analyze.AudioCtx()
    }
    this.analyser = this._audioCtx.createAnalyser()
    const gainNode = this._audioCtx.createGain()
    gainNode.gain.setValueAtTime(player.volume, player.currentTime)
    this.gainNode = gainNode
    this.source = this._audioCtx.createMediaElementSource(player.video)
    this.ctx = canvas.getContext('2d')
    this.source.connect(this.analyser)
    this.analyser.connect(gainNode)
    this.fftSize = this.options.fftSize
    this.frameCount = 0

    if (this.options.isGradient) {
      this.options.linear = getGradient(this.ctx, canvas.width, this.options.colors)
    }
    gainNode.connect(this._audioCtx.destination)
    this._initPlayerEvents()
  }

  /**
   * @private
   */
  _initPlayerEvents () {
    ['play', 'playing', 'seeked'].forEach(name => {
      this.player.on(name, this.start)
    })
    // ['seeking', 'waiting', 'pause', 'ended'].forEach(name => {
    //   this.player.on(name, this.stop)
    // })
    this.player.on('volumechange', this._onoVolumechange)
    this.player.on('destroy', this._onDestroy)
  }

  start = () => {
    if (this.reqId) {
      return
    }
    this._renderFrame()
  }

  stop = () => {
    cancelAnimationFrame(this.reqId)
    this.reqId = null
  }

  destroy () {
    this.stop();
    ['play', 'playing', 'seeked'].forEach(name => {
      this.player.off(name, this.start)
    })
    this.player.off('volumechange', this._onoVolumechange)
    this.player.off('destroy', this._onDestroy)
    this._audioCtx.close()
  }

  /**
   * @private
   */
  _onDestroy = () => {
    this._audioCtx.close()
  }

  /**
   * @private
   */
  _onoVolumechange = () => {
    console.log('onoVolumechange')
    this.gainNode.gain.setValueAtTime(this.player.volume, this.player.currentTime)
  }

  /**
   * @private
   */
  _renderFrame = () => {
    if (this.reqId) {
      cancelAnimationFrame(this.reqId)
    }
    this.reqId = requestAnimationFrame(this._renderFrame)
    this.frameCount++
    this.mode === 'lightning' ? this.analyser.getByteTimeDomainData(this.dataArray) : this.analyser.getByteFrequencyData(this.dataArray)
    render.call(this, this.dataArray, this.canvas, this.options, this.frameCount)
  }

  /**
   * @type { string }
   */
  set mode (val) {
    // let flag = false
    // for (let i = 0; i < MODES.length; i++) {
    //   if (val === MODES[i]) {
    //     flag = true
    //     break
    //   }
    // }
    this.options.mode = val
  }

  get mode () {
    return this.options.mode
  }

  /**
   * @type { number }
   */
  set fftSize (val) {
    this.analyser.fftSize = val
    const bufferLen = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLen)
  }

  get fftSize () {
    return this.analyser.frequencyBinCount * 2
  }
}

export {
  Analyze as default,
  MODES
}
