import Plugin, { POSITIONS } from '../../plugin/plugin'
import './index.scss'

class Highlight extends Plugin {
  static get pluginName () {
    return 'highlight'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 10,
      textlist: [{
        timeRange: [0, 1], // s
        text: '0-10'
      }, {
        timeRange: [1, 6], // s
        text: '09999999-10'
      }]
    }
  }

  afterCreate () {
    this.player.on('timeupdate', this.onTimeUpdate)
    this.player.once('canplay', this.onTimeUpdate)
  }

  destroy () {
    this.player.off('timeupdate', this.onTimeUpdate)
    this.player.off('canplay', this.onTimeUpdate)
  }

  onTimeUpdate = () => {
    const currentTime = this.player.currentTime
    const len = this.config.textlist.length
    for (let i = 0; i < len; i++) {
      const item = this.config.textlist[i]
      if (currentTime >= item.timeRange[0] && currentTime <= item.timeRange[1]) {
        this.root.innerText = item.text
        break
      }
      this.root.innerText = ''
    }
  }

  render () {
    return `
    <xg-icon class="xgplayer-highlight"></xg-icon>`
  }
}

export default Highlight
