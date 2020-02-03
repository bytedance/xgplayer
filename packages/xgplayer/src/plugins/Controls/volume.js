import Plugin from '../../plugin'

class Volume extends Plugin {
  static get pluginName () {
    return 'VolumeIcon'
  }
  render () {
    return `<xgtime class="icon"></xgtime>`
  }
}
export default Volume
