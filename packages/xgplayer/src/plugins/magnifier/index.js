import Plugin, { Util, Events } from '../../plugin'
import IntervalTimer from './intervalTimer'
import './index.scss'

const TAG = 'Magnifier'
export default class Magnifier extends Plugin {
  static get pluginName () {
    return 'magnifier'
  }

  /**
   * @type IControlsConfig
   */
  static get defaultConfig () {
    return {
      disable: true,
      magnifierWidth: 200,
      magnifierHeight: 200,
      magnifierRatio: 2,
      interval: 100,
      index: 1
    }
  }

  afterCreate () {
    const { config } = this
    this.canvas = document.createElement('canvas')
    this.root.appendChild(this.canvas)
    Util.addClass(this.canvas, 'magnifier-canvas')
    this.canvasCtx = this.canvas.getContext('2d')
    this.canvas.width = config.magnifierWidth || 200
    this.canvas.height = config.magnifierHeight || 120
    console.log(TAG, 'afterCreate', this.canvas.width , this.canvas.height, config)
    this.ratio = config.magnifierRatio || 1
    this.isOpen = false
    this.isEnter = false
    this.contentY = 0
    this.contentX = 0
    this.bindEvents()
    // this.switchMagnifier()
    // this.startRender()
  }

  bindEvents () {
    console.log(TAG, 'bindEvents')
    const playerRoot = this.player.root
    playerRoot.addEventListener('mousemove', this.onMouseMove)
    // playerRoot.addEventListener('mouseenter', this.onEnterPlayer)
    this.player.on(Events.ENTER_PLAYER, this.onEnterPlayer)
    this.player.on(Events.LEAVE_PLAYER, this.onLeavePlayer)
  }

  unbindEvents () {
    const playerRoot = this.player.root
    playerRoot.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = (e) => {
    if (this.isOpen) {
      this.position(e)
    }
  }

  onLeavePlayer = (e) => {
    console.log('>>>onLeavePlayer')
    this.isEnter = false
    this.hide()
  }

  onEnterPlayer = (e) => {
    console.log('>>>onEnterPlayer')
    this.isEnter = true
    this.isOpen && this.show()
  }

  position (e) {
    const { player } = this
    const playerRect = player.root.getBoundingClientRect()
    const rootRect = playerRect // this.root.getBoundingClientRect()
    const mWidth = this.canvas.width
    const mHeight = this.canvas.height
    const offsetX = e.pageX - playerRect.left
    const offsetY = e.pageY - playerRect.top
    const playerWidth = playerRect.width
    const playerHeight = playerRect.height
    const canvasLeft = offsetX - mWidth / 2
    const canvasTop = offsetY - mHeight / 2
    this.canvas.style.left = `${(offsetX > 0 ? (offsetX < playerWidth ? canvasLeft : playerWidth - mWidth / 2) : -mWidth / 2) + playerRect.left - rootRect.left}px`
    this.canvas.style.top = `${(offsetY > 0 ? (offsetY < playerHeight ? canvasTop : playerHeight - mHeight / 2) : - mHeight / 2) + playerRect.top - rootRect.top}px`

    this.contentX = offsetX
    this.contentY = offsetY
  }

  switchMagnifier () {
    if (this.isOpen) {
      this.stopRender()
      this.hide()
    } else {
      this.isEnter && this.show()
      this.startRender()
    }
    this.isOpen = !this.isOpen
  }

  startRender () {
    const { magnifierWidth, magnifierHeight, interval } = this.config
    const { canvas } = this
    canvas.width = magnifierWidth
    canvas.height = magnifierHeight
    if (this.videoTimer) {
      return
    }
    this.videoTimer = new IntervalTimer()
    this.videoTimer.repeat(() => {
      this.update()
    }, interval)
  }

  stopRender () {
    if (this.videoTimer) {
      this.videoTimer.clear()
      this.videoTimer = null
    }
  }

  update () {
    const { player } = this
    const { videoWidth, videoHeight } = player.media
    const mWidth = this.canvas.width
    const mHeight = this.canvas.height
    this.canvasCtx.fillRect(0, 0, mWidth, mHeight)
    const playerRect = player.root.getBoundingClientRect()
    const left = (this.contentX - mWidth / 2 / this.ratio) * videoWidth / playerRect.width
    const top = (this.contentY - mHeight / 2 / this.ratio) * videoHeight / playerRect.height
    const width = mWidth / this.ratio * videoWidth / playerRect.width
    const height = mHeight / this.ratio * videoHeight / playerRect.height
    const sx = left > 0 ? left : 0
    const sy = top > 0 ? top : 0
    let swidth = left > 0 ? width : width + left
    let sheight = top > 0 ? height : height + top
    if (playerRect.width < (this.contentX + mWidth / 4 / this.ratio)) {
      swidth = width - (this.contentX + mWidth / 4 / this.ratio - playerRect.width) * videoWidth / playerRect.width
    }
    if (playerRect.height < (this.contentY + mHeight / 4 / this.ratio)) {
      sheight = height - (this.contentY + mHeight / 4 / this.ratio - playerRect.height) * videoHeight / playerRect.height
    }
    const dx = left > 0 ? 0 : mWidth / 2 - this.contentX * this.ratio
    const dy = top > 0 ? 0 : mWidth / 2 - this.contentY * this.ratio

    const dwidth = left > 0 ? mWidth : mWidth - (mWidth / 2 - this.contentX * this.ratio)
    const dheight = top > 0 ? mHeight : mHeight - (mHeight / 2 - this.contentY * this.ratio)
    this.canvasCtx.drawImage(player.media,
      sx,
      sy,
      swidth,
      sheight,
      dx < 0 ? 0 : dx,
      dy < 0 ? 0 : dy,
      dwidth > 0 ? dwidth : 0,
      dheight > 0 ? dheight : 0)
  }

  destroy () {
    if (this.videoTimer) {
      this.videoTimer.clear()
      this.videoTimer = null
    }
    this.unbindEvents()
  }
  render () {
    return '<div class="magnifier-root"></div>'
  }
}