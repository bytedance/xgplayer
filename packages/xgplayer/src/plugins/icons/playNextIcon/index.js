/**
 * 下一个按钮组件
 */
import Plugin from '../../../plugin'
import Next from '../../assets/playNext.svg'


// const { Events } = Plugin
export default class PlayNextIcon extends Plugin {
  static get pluginName () {
    return 'PlayNextIcon'
  }

  afterCreate () {
    const { playerConfig } = this
    console.log('playerConfig', playerConfig)
    if (!this.config.url) {
      this.initEvents()
    }
  }

  initEvents () {
    this.playNext = this.playNext.bind(this);
    this.bind(['touchend', 'click'], this.playNext)
    this.show()
  }

  playNext () {
    // TODO 根据配置信息进行下一个视频的切换 或者 根据参数中的回调函数进行调用
    this.emit('playNext')
  }

  registerIcons () {
    return {
      playNext: Next
    }
  }

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

  destroy () {
    this.unbind(['touchend', 'click'], this.playNext)
  }

  render () {
    return `
     <xg-icon class="xgplayer-playnext">
      <div class="xgplayer-icon">
        ${this.icons.playNext}
      </div>
      <div class="xg-tips"></div>
     </xg-icon>
    `
  }
}
