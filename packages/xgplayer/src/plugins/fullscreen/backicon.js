import Plugin from '../../plugin'
import BackSVG from '../assets/back.svg'

const {POSITIONS, Util} = Plugin

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

  constructor (args) {
    super(args)
    console.log(args)
  }

  afterCreate () {
    this.onClick = (e) => {
      this.config.onClick(e)
    }

    this.bind('touchend', this.onClick)
  }

  show () {
    Util.addClass(this.root, 'show')
  }

  hide () {
    Util.removeClass(this.root, 'show')
  }

  render () {
    return `<div class="xgplayer-back">
    ${BackSVG}
    </div>`
  }
}
