import Plugin, { Events, Util } from '../../plugin'

function getBgColor (color) {
  return color ? `background:${color};` : ''
}

class MiniProgress extends Plugin {
  static get pluginName () {
    return 'MiniProgress'
  }

  static get defaultConfig () {
    return {
      mode: 'auto',
      height: 2
    }
  }

  get offsetDuration () {
    return this.playerConfig.customDuration || this.player.offsetDuration || this.player.duration
  }

  get currentTime () {
    const { offsetCurrentTime, currentTime } = this.player
    return offsetCurrentTime >= 0 ? offsetCurrentTime : currentTime
  }

  afterCreate () {
    if (!this.root) {
      return
    }
    this.on(Events.TIME_UPDATE, this.onTimeupdate)
    this.on(Events.EMPTIED, () => {
      this.reset()
    })
  }

  onTimeupdate = () => {
    const { ended } = this.player
    const { offsetDuration } = this
    let time = this.currentTime
    time = Util.adjustTimeByDuration(time, offsetDuration, ended)
    this.update({ played: time }, offsetDuration)
  }

  reset () {
    this.update({ played: 0, cached: 0 }, 0)
  }

  update (data = { cached: 0, played: 0 }, duration) {
    if (!duration || !this.root) {
      return
    }
    if (data.cached) {
      this.find('xg-mini-progress-cache').style.width = `${data.cached / duration * 100}%`
    }
    if (data.played) {
      this.find('xg-mini-progress-played').style.width = `${data.played / duration * 100}%`
    }
  }

  render () {
    const { commonStyle, miniprogress } = this.playerConfig
    if (!miniprogress) {
      return
    }
    const { mode, height } = this.config
    const _style = {
      cached: getBgColor(commonStyle.cachedColor),
      played: getBgColor(commonStyle.playedColor),
      progress: getBgColor(commonStyle.progressColor),
      height: height > 0 && height !== 2 ? `height: ${height}px;` : ''
    }
    const stateClass = mode === 'show' ? 'xg-mini-progress-show' : ''
    return `<xg-mini-progress class="xg-mini-progress ${stateClass}" style="${_style.progress} ${_style.height}">
    <xg-mini-progress-cache class="xg-mini-progress-cache" style="${_style.cached}"></xg-mini-progress-cache>
    <xg-mini-progress-played class="xg-mini-progress-played" style="${_style.played}"></xg-mini-progress-played>
    </xg-mini-progress>`
  }
}

export default MiniProgress
