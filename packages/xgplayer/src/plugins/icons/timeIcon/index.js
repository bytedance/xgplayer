import Plugin from '../../../plugin'

const { Util, Events } = Plugin

class TimeIcon extends Plugin {
  static get pluginName () {
    return 'TimeIcon'
  }

  updateTime () {
    const { player } = this
    const current = player.currentTime
    this.timeDom.innerHTML = Util.format(current)
    if (player.duration !== Infinity) {
      this.durationDom.innerHTML = Util.format(player.duration)
    }
  }

  afterCreate () {
    const { player } = this
    this.durationDom = this.find('.duration')
    this.timeDom = this.find('.current')
    this.once(Events.READY, () => {
      player.duration !== Infinity && this.show();
    })
    this.on(Events.DURATION_CHANGE, () => {
      this.updateTime()
    })
    this.on(Events.TIME_UPDATE, () => {
      this.updateTime()
    })
  }

  render () {
    return `<xg-icon class="xgplayer-time" style="display:none">
    <span class="current">00:00</span>
    <em class="duration">00:00</em>
    </xg-icon>`
  }
}
export default TimeIcon
