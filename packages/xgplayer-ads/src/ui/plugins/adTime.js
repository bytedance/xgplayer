import { TimeIcon } from 'xgplayer'
import * as AdEvents from '../../events'

export class AdTimeIcon extends TimeIcon {
  /**
   * @override
   */
  static get pluginName () {
    return 'adTime'
  }

  getAdPlugin () {
    return this.player.getPlugin('ad')
  }

  /**
   * @override
   */
  get duration () {
    const adPlugin = this.getAdPlugin()
    return adPlugin?.duration || 0
  }

  /**
   * @override
   */
  get currentTime () {
    const adPlugin = this.getAdPlugin()
    return adPlugin?.currentTime || 0
  }

  /**
   * @override
   */
  listenEvents () {
    this.on([AdEvents.AD_TIME_UPDATE], (e) => {
      console.log('AD_TIME_UPDATE', e)
      this.onTimeUpdate()
    })
  }
}
