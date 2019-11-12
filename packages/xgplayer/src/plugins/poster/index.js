import {Plugin} from '../../pluginsManager'
import './poster.scss'

class Poster extends Plugin {
  static get name () {
    return 'Poster'
  }

  static get ignoreKey () {
    return 'poster'
  }

  render () {
    const poster = this.config.poster || this.playerConfig.poster
    if (!poster) {
      return ''
    }
    return `<xg-poster class="xgplayer-poster" style="background-image:url(${poster})">
    </xg-poster>`
  }
}

export default Poster
