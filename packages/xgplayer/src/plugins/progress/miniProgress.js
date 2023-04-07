import Plugin from '../../plugin'
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
    return `<xg-mini-progress class="xg-mini-progress">
    <xg-mini-progress-cache class="xg-mini-progress-cache"></xg-mini-progress-cache>
    <xg-mini-progress-played class="xg-mini-progress-played"></xg-mini-progress-played>
    </xg-mini-progress>`
  }
}

export default MiniProgress
