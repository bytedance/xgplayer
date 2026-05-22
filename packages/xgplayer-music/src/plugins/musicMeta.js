import { Plugin } from 'xgplayer'

export class MusicMeta extends Plugin {
  static get pluginName () {
    return 'musicmeta'
  }

  static get defaultConfig () {
    return {
      index: 0
    }
  }

  beforeCreate (args) {
    const progress = args.player.plugins.progress
    if (progress) {
      args.root = progress.root
    }
  }

  afterCreate () {
    this.on('change', item => {
      if (item && item.title) {
        this.root.innerHTML = `${item.title}`
      } else {
        this.root.innerHTML = ''
      }
    })
  }

  render () {
    const { playerConfig } = this
    return `<xg-title class="xgplayer-name">
          ${playerConfig.title || ''}
       </xg-title>`
  }
}
