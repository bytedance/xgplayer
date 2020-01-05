import {Plugin} from '../../pluginsManager'
import ReplayIcon from '../../skin/assets/replay.svg'
import './replay.scss'

class Replay extends Plugin {
  static get pluginName () {
    return 'Replay'
  }

  afterCreate () {
    this.bind('svg', 'click', (e) => {
      e.preventDefault()
      this.player.replay()
      Plugin.Util.removeClass(this.player.root, 'replay')
    })

    this.on(Plugin.Event.ENDED, () => {
      if (!this.playerConfig.loop) {
        Plugin.Util.addClass(this.player.root, 'replay')
      }
      let path = this.el.querySelector('path')
      if (path) {
        let transform = window.getComputedStyle(path).getPropertyValue('transform')
        if (typeof transform === 'string' && transform.indexOf('none') > -1) {
          return null
        } else {
          path.setAttribute('transform', transform)
        }
      }
    })
  }
  render () {
    const replayText = this.player.lang.REPLAY
    return `<xg-replay class="xgplayer-replay">
      ${ReplayIcon}
      <xg-replay-txt class="xgplayer-replay-txt">${replayText}</xg-replay-txt>
    </xg-replay>`
  }
}
export default Replay
