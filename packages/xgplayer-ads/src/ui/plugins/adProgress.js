import { Progress } from 'xgplayer'
import * as AdEvents from '../../events'

export class AdProgress extends Progress {
  /**
   * @override
   */
  static get pluginName () {
    return 'adProgress'
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

  afterCreate () {
    this.config.disable = true
    super.afterCreate()
  }

  /**
   * @override
   */
  listenEvents () {

  }
}
