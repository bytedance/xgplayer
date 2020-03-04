import Plugin from '../../plugin'

const { Util, Events, POSITIONS, ROOT_TYPES } = Plugin

class TimeIcon extends Plugin {
  static get pluginName () {
    return 'TimeIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.LEFT,
      rootType: ROOT_TYPES.CONTROLS,
      index: 2
    }
  }

  onTimeUpdate () {
    const { player } = this
    const current = player.currentTime
    this.timeDom.innerHTML = Util.format(current)
    if (player.duration !== Infinity) {
      this.durationDom.innerHTML = Util.format(player.duration)
    }
  }

  afterCreate () {
    const { player } = this
    this.durationDom = this.find('.time-duration')
    this.timeDom = this.find('.time-current')
    this.on(Events.DURATION_CHANGE, () => {
      this.onTimeUpdate()
    })
    this.on(Events.TIME_UPDATE, () => {
      this.onTimeUpdate()
    })
  }
  onPlayerReady () {
    if (player.duration === Infinity || this.playerConfig.isLive) {
      Util.hide(this.durationDom)
      Util.hide(this.timeDom)
      Util.hide(this.find('.time-separator'))
      Util.show(this.find('.time-live-tag'))
    } else {
      Util.hide(this.find('.time-live-tag'))
    }
    this.show();
  }
  changeLiveState (isLive) {
    if (isLive) {
      Util.hide(this.durationDom)
      Util.hide(this.timeDom)
      Util.hide(this.find('.time-separator'))
      Util.show(this.find('.time-live-tag'))
    } else {
      Util.hide(this.find('.time-live-tag'))
      Util.show(this.find('.time-separator'))
      Util.show(this.durationDom)
      Util.show(this.timeDom)
    }
  }

  updateTime (time) {
    const { player } = this
    if ((!time && time !== 0) || time > player.duration) {
      return
    }
    this.timeDom.innerHTML = Util.format(time)
  }

  render () {
    return `<xg-icon class="xgplayer-time" style="display:none">
    <span class="time-current">00:00</span>
    <span class="time-separator">/</span>
    <span class="time-duration">00:00</span>
    <span class="time-live-tag">直播</span>
    </xg-icon>`
  }
}
export default TimeIcon
