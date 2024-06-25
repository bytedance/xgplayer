import { AdPlayIcon } from './plugins/adPlay'

export class AdUIManager {
  constructor (config, { player, plugin }) {
    this.player = player
    this.config = config
    this.plugin = plugin

    this.init()
  }

  init () {
    const { player } = this
    const playIconPlugin = player.getPlugin('play')
    if (playIconPlugin) {
      player.registerPlugin(AdPlayIcon)
    }
    playIconPlugin.hide()
    console.log('playPlugin', playIconPlugin)
  }
}
