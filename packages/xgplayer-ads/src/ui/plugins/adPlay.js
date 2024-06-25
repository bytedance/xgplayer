import { PlayIcon } from 'xgplayer'
import * as AdEvents from '../../events'

export class AdPlayIcon extends PlayIcon {
  static get pluginName () {
    return 'adPlay'
  }

  getAdPlugin () {
    return this.player.getPlugin('ad')
  }

  listenEvents () {
    this.on([AdEvents.AD_PAUSE], () => {
      this.animate(true)
    })
    this.on(AdEvents.AD_PLAY, () => {
      this.animate(false)
    })
  }

  btnClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const adPlugin = this.getAdPlugin()

    if (adPlugin.paused) {
      adPlugin.play()
      this.animate(false)
    } else {
      adPlugin.pause()
      this.animate(true)
    }
    return false
  }
}
