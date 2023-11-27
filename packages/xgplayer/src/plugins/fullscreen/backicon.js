import Plugin, { POSITIONS } from '../../plugin'
import { addClass, removeClass } from '../../utils/util'
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

    this.bind(['click', 'touchend'], this.onClick)
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
    addClass(this.root, 'show')
  }

  hide () {
    removeClass(this.root, 'show')
  }

  render () {
    return `<xg-icon class="xgplayer-back">
    </xg-icon>`
  }
}
