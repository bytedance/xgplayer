import Logger from './Logger'

export default class RavenLogger extends Logger {
  constructor (player, options) {
    super(player, options)
    this.collector = window.Raven || {}
  }
  collectEvent (category, action, label, value) {
    const tags = this._options.getTags ? this._options.getTags(this.player) : {
      url: label,
      current_time: this.player.currentTime,
      duration: this.player.duration
    }

    if (action === 'error') {
      this.collector.captureException(new Error(category), {
        tags
      })
    } else {
      this.collector.captureMessage(action, {
        tags
      })
    }
  }
}
