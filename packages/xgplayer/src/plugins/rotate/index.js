import Plugin from '../../plugin'
import RotateSvg from '../assets/rotate.svg'

const {POSITIONS} = Plugin

export default class Rotate extends Plugin {
  static get pluginName () {
    return 'rotate'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 6,
      innerRotate: false, // true为只有画面旋转，false为整个播放器旋转
      clockwise: false,
      rotateDeg: 0, // 初始旋转角度
      disable: false
    }
  }

  constructor (args) {
    super(args)
    this.rotateDeg = this.config.rotateDeg || 0
  }

  beforeCreate (args) {
    if (typeof args.player.config.rotate === 'boolean') {
      args.config.disable = !args.player.config.rotate
    }
  }

  afterCreate () {
    if (this.config.disable) {
      return;
    }
    this.appendChild('.xgplayer-icon', this.icons.rotate)
    this.onBtnClick = this.onBtnClick.bind(this);
    this.bind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick)
  }

  destroy () {
    this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick)
  }

  onBtnClick (e) {
    this.rotate(this.config.clockwise, this.config.innerRotate, 1)
  }

  updateRotateDeg () {
    let player = this.player;
    if (!this.rotateDeg) {
      this.rotateDeg = 0
    }

    let width = player.root.offsetWidth
    let height = player.root.offsetHeight
    let targetWidth = player.video.videoWidth
    let targetHeight = player.video.videoHeight

    if (!this.config.innerRotate) {
      // player.root.style.width = height + 'px'
      // player.root.style.height = width + 'px'
    }

    let scale
    if (this.rotateDeg === 0.25 || this.rotateDeg === 0.75) {
      if (this.config.innerRotate) {
        if ((targetWidth / targetHeight) > (height / width)) { // 旋转后纵向撑满
          let videoWidth = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoWidth = height * targetWidth / targetHeight
          } else {
            // 旋转前是横向撑满
            videoWidth = width
          }
          scale = height / videoWidth
        } else { // 旋转后横向撑满
          let videoHeight = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoHeight = height
          } else { // 旋转前是横向撑满
            videoHeight = width * targetHeight / targetWidth
          }
          scale = width / videoHeight
        }
      } else {
        if (width >= height) {
          scale = width / height
        } else {
          scale = height / width
        }
      }
      scale = parseFloat(scale.toFixed(5))
    } else {
      scale = 1
    }

    if (this.config.innerRotate) {
      player.video.style.transformOrigin = 'center center'
      player.video.style.transform = `rotate(${this.rotateDeg}turn) scale(${scale})`
      player.video.style.webKitTransform = `rotate(${this.rotateDeg}turn) scale(${scale})`
    } else {
      player.root.style.transformOrigin = 'center center'
      player.root.style.transform = `rotate(${this.rotateDeg}turn) scale(${1})`
      player.root.style.webKitTransform = `rotate(${this.rotateDeg}turn) scale(${1})`
    }
  }

  rotate (clockwise = false, innerRotate = true, times = 1) {
    let player = this.player;
    if (!this.rotateDeg) {
      this.rotateDeg = 0
    }
    let factor = clockwise ? 1 : -1

    this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1
    this.updateRotateDeg()
    player.emit('rotate', this.rotateDeg * 360)
  }

  registerIcons () {
    return {
      'rotate': RotateSvg
    }
  }

  render () {
    if (this.config.disable) {
      return;
    }
    return `
    <xg-icon class="xgplayer-rotate">
      <div class="xgplayer-icon">
      </div>
      <div class="xg-tips" lang-key="${this.i18nKeys.ROTATE_TIPS}">
      ${this.i18n.ROTATE_TIPS}
      </div>
    </xg-icon>`
  }
}
