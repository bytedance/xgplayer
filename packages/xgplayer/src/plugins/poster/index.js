import {UIPlugin} from '../../pluginsManager'
import './poster.scss'

class Poster extends UIPlugin {
  constructor (args) {
    args.config.pluginType = 'ui'
    super(args)
  }

  afterCreate () {
    if (this.el) {
      this.on(UIPlugin.PLAY, () => {
        this.hide()
      })
    }
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
