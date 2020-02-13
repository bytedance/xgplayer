import { BasePlugin } from '../../plugin';

class PlaceHolderPlugin extends BasePlugin {
  static get pluginName () {
    return 'placeholder'
  }

  render () {
    return `<xg-placeholder class="xgplayer-placeholder">
    </xg-placeholder>`
  }
}
export default PlaceHolderPlugin
