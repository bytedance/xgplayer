// This plugin only use in living, not vod
import BasePlugin from '../../plugin/basePlugin'

export default class NetAdaption extends BasePlugin {
  static get pluginName () {
    return 'netadaption'
  }

  afterCreate () {
    /**
     * @type {null | number}
     */
    this._timer = setInterval(this._checkStatus.bind(this), 300)
  }

  _checkStatus () {
    const container = this.player.media
    if (container.currentTime < 1 || !container.buffered.length) return
    const diff = container.buffered.end(container.buffered.length - 1) - container.currentTime
    if (diff > 15) {
      container.playbackRate = 1.2
    } else if (diff < 5) {
      container.playbackRate = 0.8
    } else {
      container.playbackRate = 1
    }
  }

  destroy () {
    if (this._timer) {
      clearInterval(this._timer)
    }
    this.player.media.playbackRate = 1
  }
}
