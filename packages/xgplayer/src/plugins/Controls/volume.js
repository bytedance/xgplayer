import {Plugin} from '../../plugin'

class Volume extends Plugin {
  static get pluginName () {
    return 'Volume'
  }
  render () {
    return `<xgtime></xgtime>`
  }
}
export default Volume
