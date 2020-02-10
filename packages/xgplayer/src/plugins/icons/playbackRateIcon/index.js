import Plugin from '../../../plugin'
// import './index.scss'
// const { Events } = Plugin
export default class PlaybackRateIcon extends Plugin {
  static get pluginName () {
    return 'PlaybackRateIcon'
  }
  // 默认配置信息
  static get defaultConfig () {
    return {
      position: 'left',
      index: 2,
      list: [0.5, 0.75, 1, 1.5, 2]
    }
  }
  render () {

  }
}
