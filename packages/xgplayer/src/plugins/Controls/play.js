import {Plugin} from '../../plugin'
class Play extends Plugin {
  static get pluginName () {
    return 'Play'
  }
  render () {
    return `<xgplay></xgplay>`
  }
}
export default Play
