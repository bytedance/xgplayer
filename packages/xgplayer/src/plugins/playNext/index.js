/**
 * 下一个按钮组件
 */
import Plugin from '../../plugin'
import Next from '../assets/playNext.svg'

const {POSITIONS, Sniffer} = Plugin
export default class PlayNextIcon extends Plugin {
  static get pluginName () {
    return 'playNext'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 1,
      url: null,
      urlList: []
    }
  }

  constructor (options) {
    super(options);
    this.idx = -1;
  }

  afterCreate () {
    if (!this.config.urlList || this.config.urlList.length === 0) {
      return
    }
    this.appendChild('.xgplayer-icon', this.icons.playNext)
    this.initEvents()
  }

  registerIcons () {
    return {
      playNext: Next
    }
  }

  registerLangauageTexts () {
    return {
      'playNext': {
        jp: '次をプレイ',
        en: 'playNext',
        zh: '播放'
      }
    }
  }

  initEvents () {
    this.playNext = this.playNext.bind(this);
    const event = Sniffer.device === 'mobile' ? 'touchend' : 'click'
    this.bind(event, this.playNext)
    this.show()
  }

  playNext () {
    const { player } = this;
    if (this.idx + 1 < this.config.urlList.length) {
      this.idx++;
      player.video.pause();
      player.currentTime = 0;
      player.video.autoplay = true;
      player.src = this.config.urlList[this.idx];
      player.emit('playerNext', this.idx + 1);
    } else {
      player.emit('urlList last');
    }
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.playNext)
  }

  render () {
    if (!this.config.urlList || this.config.urlList.length === 0) {
      return
    }
    return `
     <xg-icon class="xgplayer-playnext">
      <div class="xgplayer-icon">
      </div>
      <div class="xg-tips" lang-key="playNext">${this.langText.playNext}</div>
     </xg-icon>
    `
  }
}
