import Plugin from '../../plugin'

function getBgColor (color) {
  return color ? `background:${color};` : ''
}

class MiniProgress extends Plugin {
  static get pluginName () {
    return 'MiniProgress'
  }

  static get defaultConfig () {
    return {}
  }

  afterCreate () {
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
    if (!this.playerConfig.progress || !this.playerConfig.miniprogress) {
      return
    }
    const { commonStyle } = this.playerConfig
    const _style = {
      cached: getBgColor(commonStyle.cachedColor),
      played: getBgColor(commonStyle.playedColor),
      progress: getBgColor(commonStyle.progressColor)
    }
    return `<xg-mini-progress class="xg-mini-progress" style="${_style.progress}">
    <xg-mini-progress-cache class="xg-mini-progress-cache" style="${_style.cached}"></xg-mini-progress-cache>
    <xg-mini-progress-played class="xg-mini-progress-played" style="${_style.played}"></xg-mini-progress-played>
    </xg-mini-progress>`
  }
}

export default MiniProgress
