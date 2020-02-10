import Plugin from '../../../plugin'
import CssFullscreenChange from '../../assets/cssFullscreenChange.svg'
import './index.scss'

const { Events, Util } = Plugin
export default class CssFullScreen extends Plugin {
  static get pluginName () {
    return 'cssFullscreen'
  }

  constructor (args) {
    super(args)
    this.isCssfullScreen = false
  }

  afterCreate () {
    this.on(Events.READY, () => {
      this.btnClick = this.btnClick.bind(this);
      ['click', 'touchend'].forEach(event => {
        this.bind(event, this.btnClick)
      });
    });
  }

  btnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.isCssfullScreen) {
      this.getCssFullscreen()
    } else {
      this.exitCssFullscreen()
    }
    this.animate(this.isCssfullScreen)
    this.emit(Events.CSS_FULLSCREEN_CHANGE, this.isCssfullScreen)
  }

  animate (isFullScreen) {
    const path = this.find('.path')
    const full = this.find('.path_full').getAttribute('d')
    const exit = this.find('.path_exitfull').getAttribute('d')
    isFullScreen ? path.setAttribute('d', exit) : path.setAttribute('d', full)
  }

  getCssFullscreen () {
    const {player} = this
    if (player.config.fluid) {
      player.root.style['padding-top'] = ''
    }
    Util.addClass(player.root, 'xgplayer-is-cssfullscreen')
    this.isCssfullScreen = true
    player.emit('cssFullscreen_change', this.isCssfullScreen)
  }

  exitCssFullscreen () {
    const {player} = this
    if (player.config.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
    }
    Util.removeClass(player.root, 'xgplayer-is-cssfullscreen')
    this.isCssfullScreen = false
    player.emit('cssFullscreen_change', this.isCssfullScreen)
  }

  registerIcons () {
    return {
      cssFullscreen: CssFullscreenChange
    }
  }

  registerLangauageTexts () {
    return {
      'cssFullscreen': {
        jp: 'Cssfullscreen',
        en: 'Cssfullscreen',
        zh: '进入样式全屏'
      },
      exitCssFullscreen: {
        jp: 'Exit cssfullscreen',
        en: 'Exit cssfullscreen',
        zh: '退出样式全屏'
      }
    }
  }

  destroy () {
    ['click', 'touchend'].forEach(event => {
      this.unbind(event, this.btnClick)
    });
  }

  render () {
    return `<xg-icon class='xgplayer-cssfullscreen'>
    <div class="xgplayer-icon">
    ${this.icons.cssFullscreen}
    </div>
    <div class="xg-tips">${this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen}</div>
    </xg-icon>`
  }
}
