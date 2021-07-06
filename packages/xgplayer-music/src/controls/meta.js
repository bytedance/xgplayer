import { Plugin } from 'xgplayer'

export default class Meta extends Plugin {
  static get pluginName () {
    return 'meta'
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
    this.player.on('change', item => {
      this.root.innerHTML = `${item.name}`
    })
  }

  render () {
    const { playerConfig } = this
    return `<xg-name class="xgplayer-name">
          ${playerConfig.name || playerConfig.url[0].name}
       </xg-name>`
  }
}
