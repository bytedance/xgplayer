import Plugin, {POSITIONS} from '../../plugin/plugin'
import loadingIcon from '../assets/loading.svg'

class Loading extends Plugin {
  static get pluginName () {
    return 'loading'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.ROOT
    }
  }

  registerIcons () {
    return {
      'loadingIcon': loadingIcon
    }
  }

  afterCreate () {
    this.appendChild(this.icons.loadingIcon)
  }

  render () {
    return `
    <xg-loading class="xgplayer-loading">
    </xg-loading>`
  }
}

export default Loading
