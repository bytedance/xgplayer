import Plugin from '../../plugin'
class Play extends Plugin {
  static get pluginName () {
    return 'PlayIcon'
  }
  render () {
    return `<xgplay class="icon"></xgplay>`
  }
}
export default Play
