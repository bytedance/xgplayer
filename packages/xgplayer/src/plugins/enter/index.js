import Plugin from '../../plugin';

const {Events, Util} = Plugin
class Enter extends Plugin {
  static get pluginName () {
    return 'enter';
  }

  static get defaultConfig () {
    return {
      innerHtml: '',
      logo: ''
    }
  }

  afterPlayerInit () {
    const {player, playerConfig} = this
    if (!playerConfig.autoplay || !playerConfig.videoInit) {
      this.once(Events.CANPLAY, () => {
        this.isCanPlay = true
      })
      this.on(Events.PLAY, () => {
        if (!this.isCanPlay) {
          player.addClass('xgplayer-is-enter')
        }
      })
    }
  }

  render () {
    const {innerHtml} = this.config
    const root = Util.createDom('xg-enter', '', {}, 'xgplayer-enter')

    if (innerHtml && innerHtml instanceof window.HTMLElement) {
      root.appendChild(innerHtml)
    } else if (innerHtml && typeof innerHtml === 'string') {
      root.innerHTML = innerHtml
    } else {
      let barStr = '';
      for (let i = 1; i <= 12; i++) {
        barStr += `<div class="xgplayer-enter-bar${i}"></div>`;
      }
      root.innerHTML = `<div class="xgplayer-enter-spinner">${barStr}</div>`
    }
    return root
  }
}

export default Enter;
