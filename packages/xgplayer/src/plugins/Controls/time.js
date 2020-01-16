import {Plugin} from '../../plugin'
class Time extends Plugin {
  static get pluginName () {
    return 'Time'
  }

  render () {
    return `<xgtime></xgtime>`
  }
}
export default Time
