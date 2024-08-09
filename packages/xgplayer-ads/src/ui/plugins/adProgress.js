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

  /**
   * @override
   */
  get offsetDuration () {
    return this.duration
  }

  /**
   * @override
   */
  get timeOffset () {
    return 0
  }

  /**
   * @override
   */
  get currentTime () {
    const adPlugin = this.getAdPlugin()
    return adPlugin?.currentTime || 0
  }

  afterCreate () {
    Object.assign(this.config, {
      isCloseClickSeek: true,
      isDraggingSeek: true,
      closeMoveSeek: true
    })
    super.afterCreate()
  }

  /**
   * @override
   */
  listenEvents () {
    this.on(AdEvents.AD_TIME_UPDATE, () => {
      this.onTimeupdate()
    })
  }
}
