import Plugin from '../../plugin'
import './poster.scss'

class Poster extends Plugin {
  static get pluginName () {
    return 'Poster'
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
