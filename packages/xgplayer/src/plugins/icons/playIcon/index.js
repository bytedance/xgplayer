import Plugin from '../../../plugin'
import PlayPauseSvg from '../../assets/playPause.svg'
import './index.scss'

const { Events } = Plugin
class PlayIcon extends Plugin {
  static get pluginName () {
    return 'PlayIcon'
  }

  afterCreate () {
    const { player } = this;
    ['click', 'touchend'].forEach(event => {
      this.bind(event, (e) => {
        if (player.paused) {
          player.play();
        } else {
          player.pause();
        }
      })
    })

    this.on(Events.PAUSE, () => {
      this.find('.xg-tips').innerHTML = this.text.play
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.find('.xg-tips').innerHTML = this.text.pause
      this.animate(player.paused)
    })
  }

  // 扩展语言
  registerLangauageTexts () {
    return {
      'play': {
        jp: 'play',
        en: 'play',
        zh: '播放'
      },
      'pause': {
        jp: 'pause',
        en: 'pause',
        zh: '暂停'
      }
    }
  }

  registerIcons () {
    return {
      playIcon: PlayPauseSvg
    }
  }

  animate (paused) {
    const path = this.find('.path')
    const pathPlay = this.find('.path_play').getAttribute('d')
    const pathPause = this.find('.path_pause').getAttribute('d')
    !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay)
  }

  render () {
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    ${this.icons.playIcon}
    </div>
    <div class="xg-tips">${this.player.paused ? this.text.play : this.text.pause}</div>
    </xg-icon>`
  }
}
export default PlayIcon
