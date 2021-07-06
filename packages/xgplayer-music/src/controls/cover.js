import { Plugin } from 'xgplayer'

export default class Cover extends Plugin {
  static get pluginName () {
    return 'music_cover'
  }

  static get defaultConfig () {
    return {
      index: 6,
      position: Plugin.POSITIONS.CONTROLS_LEFT
    }
  }

  afterCreate () {
    this.on('change', item => {
      if (item && item.poster) {
        this.find('img').src = item.poster
      }
    })
  }

  render () {
    const { playerConfig } = this
    return `<xg-cover class="xgplayer-cover"><img src="${playerConfig.poster || playerConfig.url[0].poster}"></xg-cover>`
  }
}
