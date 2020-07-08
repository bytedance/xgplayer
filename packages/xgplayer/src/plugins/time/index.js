import Plugin from '../../plugin'

const { Util, Events, POSITIONS } = Plugin

class Time extends Plugin {
  static get pluginName () {
    return 'time'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 2,
      disable: false
    }
  }

  constructor (args) {
    super(args)
    this.isActiving = false
  }

  afterCreate () {
    const constrolsMode = this.player.controls.config.mode
    this.mode = constrolsMode === 'flex' ? 'flex' : 'normal'
    if (this.config.disable) {
      return
    }
    if (this.mode === 'flex') {
      this.createCenterTime()
      this.hide()
    }
    this.durationDom = this.find('.time-duration')
    this.timeDom = this.find('.time-current')
    this.on(Events.DURATION_CHANGE, () => {
      this.onTimeUpdate()
    })
    this.on(Events.TIME_UPDATE, () => {
      this.onTimeUpdate()
    })
  }

  show () {
    if (this.mode === 'flex') {
      return
    }
    super.show()
  }

  onTimeUpdate () {
    const {player, config} = this
    if (config.disable || this.isActiving) {
      return
    }
    const current = player.currentTime
    if (this.mode === 'flex') {
      this.centerCurDom.innerHTML = Util.format(current)
      if (player.duration !== Infinity) {
        this.centerDurDom.innerHTML = Util.format(player.duration)
      }
    } else {
      this.timeDom.innerHTML = Util.format(current)
      if (player.duration !== Infinity) {
        this.durationDom.innerHTML = Util.format(player.duration)
      }
    }
  }

  createCenterTime () {
    const {player} = this
    if (!player.controls || !player.controls.center) {
      return
    }
    const center = player.controls.center
    this.centerCurDom = Util.createDom('xg-icon', '00:00', {}, 'xgplayer-time left')
    this.centerDurDom = Util.createDom('xg-icon', '00:00', {}, 'xgplayer-time right')
    center.children.length > 0 ? center.insertBefore(this.centerCurDom, center.children[0]) : center.appendChild(this.centerCurDom)
    center.appendChild(this.centerDurDom)
  }

  afterPlayerInit () {
    const {player, config} = this
    if (player.duration === Infinity || this.playerConfig.isLive) {
      Util.hide(this.durationDom)
      Util.hide(this.timeDom)
      Util.hide(this.find('.time-separator'))
      Util.show(this.find('.time-live-tag'))
    } else {
      Util.hide(this.find('.time-live-tag'))
    }
    if (config.hide) {
      this.hide()
      return
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
    this.isActiving = true
    const { player } = this
    if ((!time && time !== 0) || time > player.duration) {
      return
    }
    if (this.mode === 'flex') {
      this.centerCurDom.innerHTML = Util.format(time)
      return
    }
    this.timeDom.innerHTML = Util.format(time)
  }

  resetActive () {
    const {player} = this
    const updateState = () => {
      this.isActiving = false
    }
    this.off(Events.SEEKED, updateState)
    if (player.isSeeking) {
      this.once(Events.SEEKED, updateState)
    } else {
      this.isActiving = false
    }
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-time">
    <span class="time-current">00:00</span>
    <span class="time-separator">/</span>
    <span class="time-duration">00:00</span>
    <span class="time-live-tag">直播</span>
    </xg-icon>`
  }
}
export default Time
