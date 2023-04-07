import { Plugin } from 'xgplayer'

export class MusicCover extends Plugin {
  static get pluginName () {
    return 'musiccover'
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
        if (this.find('img')) {
          this.find('img').src = item.poster
        } else {
          const _img = new Image()
          _img.src = item.poster
          this.appendChild(_img)
        }
        this.find('img').src = item.poster
        this.show()
      } else {
        this.hide()
      }
    })

    if (this.playerConfig.poster) {
      const _img = new Image()
      _img.src = this.playerConfig.poster
      this.appendChild(_img)
    }
  }

  render () {
    return '<xg-icon class="xgplayer-cover"></xg-icon>'
  }
}
