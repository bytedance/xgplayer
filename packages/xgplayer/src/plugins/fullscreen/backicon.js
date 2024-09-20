import Plugin, { POSITIONS, Util } from '../../plugin'
import BackSVG from '../assets/back.svg'

export default class TopBackIcon extends Plugin {
  static get pluginName () {
    return 'topbackicon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.ROOT_TOP,
      index: 0
    }
  }

  afterCreate () {
    this.initIcons()
    this.onClick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.config.onClick(e)
    }
    const eName = this.domEventType === 'touch' ? 'touchend' : 'click'
    this.bind(eName, this.onClick)
  }

  registerIcons () {
    return {
      screenBack: { icon: BackSVG, class: 'xg-fullscreen-back' }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild(this.root, icons.screenBack)
  }

  show () {
    Util.addClass(this.root, 'show')
  }

  hide () {
    Util.removeClass(this.root, 'show')
  }

  destroy () {
    const eName = this.domEventType === 'touch' ? 'touchend' : 'click'
    this.unbind(eName, this.onClick)
  }
  render () {
    return `<xg-icon class="xgplayer-back">
    </xg-icon>`
  }
}
