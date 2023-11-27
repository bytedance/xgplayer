import { POSITIONS } from '../../plugin'
import { setTimeout } from '../../utils/util'
import { xgIconTips } from '../common/iconTools'
import IconPlugin from '../common/iconPlugin'
import { Events } from '../../plugin/basePlugin'
import RotateSvg from '../assets/rotate.svg'
import './index.scss'

export default class Rotate extends IconPlugin {
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

  afterCreate () {
    if (this.config.disable) {
      return
    }
    super.afterCreate()
    this.appendChild('.xgplayer-icon', this.icons.rotate)
    this.onBtnClick = this.onBtnClick.bind(this)
    this.bind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick)
    // 全屏/css全屏/容器宽高发生变化 需要重新计算
    this.on(Events.VIDEO_RESIZE, () => {
      if (this.rotateDeg && this.config.innerRotate) {
        setTimeout(this, () => {
          this.updateRotateDeg(this.rotateDeg, this.config.innerRotate)
        }, 100)
      }
    })

    const root = this.player.root
    this.rootWidth = root.style.width || root.offsetWidth || root.clientWidth
    this.rootHeight = root.style.height || root.offsetHeight || root.clientHeight

    if (this.rotateDeg) {
      this.updateRotateDeg(this.rotateDeg, this.config.innerRotate)
    }
  }

  destroy () {
    super.destroy()
    this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick)
  }

  onBtnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    this.emitUserAction(e, 'rotate')
    this.rotate(this.config.clockwise, this.config.innerRotate, 1)
  }

  updateRotateDeg (rotateDeg, innerRotate) {
    if (!rotateDeg) {
      rotateDeg = 0
    }
    if (innerRotate) {
      this.player.videoRotateDeg = rotateDeg
      return
    }
    const { player, rootWidth, rootHeight } = this
    const { root, innerContainer } = player
    const video = player.media
    const width = root.offsetWidth
    const height = innerContainer && innerRotate ? innerContainer.offsetHeight : root.offsetHeight
    let rWidth = rootWidth
    let rHeight = rootHeight
    let x = 0
    let y = 0
    if (rotateDeg === 0.75 || rotateDeg === 0.25) {
      rWidth = `${height}px`
      rHeight = `${width}px`
      x = -(height - width) / 2
      y = -(width - height) / 2
    }
    const _transform = `translate(${x}px,${y}px) rotate(${rotateDeg}turn)`
    const _styles = {
      transformOrigin: 'center center',
      transform: _transform,
      webKitTransform: _transform,
      height: rHeight,
      width: rWidth
    }

    const _target = innerRotate ? video : root
    const poster = innerRotate ? player.getPlugin('poster') : null
    Object.keys(_styles).map(key => {
      _target.style[key] = _styles[key]
      poster && poster.root && (poster.root.style[key] = _styles[key])
    })
  }

  rotate (clockwise = false, innerRotate = true, times = 1) {
    const player = this.player
    if (!this.rotateDeg) {
      this.rotateDeg = 0
    }
    const factor = clockwise ? 1 : -1

    this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1
    this.updateRotateDeg(this.rotateDeg, innerRotate)
    player.emit(Events.ROTATE, this.rotateDeg * 360)
  }

  registerIcons () {
    return {
      rotate: RotateSvg
    }
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `
    <xg-icon class="xgplayer-rotate">
      <div class="xgplayer-icon">
      </div>
      ${xgIconTips(this, 'ROTATE_TIPS', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
