import Plugin from '../../plugin'
class Next extends Plugin {
  static get pluginName () {
    return 'nextIcon'
  }
  render () {
    return `<xgnext class="icon"></xgnext>`
  }
}
export default Next
