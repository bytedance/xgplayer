import Plugin, { POSITIONS, Util } from '../../plugin'
import { Events } from '../../plugin/basePlugin'
import RotateSvg from '../assets/rotate.svg'

export default class Rotate extends Plugin {
  static get pluginName () {
    return 'rotate'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 6,
      innerRotate: true, // true为只有画面旋转，false为整个播放器旋转
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
    // 全屏/css全屏/容器宽高发生变化 需要重新计算
    this.on([Events.FULLSCREEN_CHANGE, Events.CSS_FULLSCREEN_CHANGE, Events.VIDEO_RESIZE], () => {
      if (this.rotateDeg) {
        Util.setTimeout(this, () => {
          this.updateRotateDeg(this.rotateDeg, this.config.innerRotate)
        }, 100)
      }
    })
    if (this.rotateDeg) {
      this.updateRotateDeg(this.rotateDeg, this.config.innerRotate)
    }
  }

  destroy () {
    this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick)
  }

  onBtnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    this.rotate(this.config.clockwise, this.config.innerRotate, 1)
  }

  updateRotateDeg (rotateDeg, innerRotate) {
    let player = this.player;
    if (!rotateDeg) {
      rotateDeg = 0
    }
    const {root, innerContainer, video} = this.player
    let width = root.offsetWidth
    let height = innerContainer && innerRotate ? innerContainer.offsetHeight : root.offsetHeight
    let rWidth = '100%'
    let rHeight = '100%'
    let x = 0
    let y = 0
    if (rotateDeg === 0.75 || rotateDeg === 0.25) {
      rWidth = `${height}px`
      rHeight = `${width}px`
      x = -(height - width) / 2
      y = -(width - height) / 2
    }
    console.log(`rWidth:${rWidth} rHeight:${rHeight} x:${x} y:${y}`)
    const _transform = `translate(${x}px,${y}px) rotate(${rotateDeg}turn)`
    const _styles = {
      transformOrigin: 'center center',
      transform: _transform,
      webKitTransform: _transform,
      height: rHeight,
      width: rWidth
    }

    const _target = innerRotate ? video : root
    let poster = innerRotate ? player.getPlugin('poster') : null
    Object.keys(_styles).map(key => {
      _target.style[key] = _styles[key]
      poster && poster.root && (poster.root.style[key] = _styles[key])
    })
  }

  rotate (clockwise = false, innerRotate = true, times = 1) {
    let player = this.player;
    if (!this.rotateDeg) {
      this.rotateDeg = 0
    }
    let factor = clockwise ? 1 : -1

    this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1
    this.updateRotateDeg(this.rotateDeg, innerRotate)
    player.emit(Events.ROTATE, this.rotateDeg * 360)
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
