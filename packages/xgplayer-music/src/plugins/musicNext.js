import { Plugin } from 'xgplayer'

export class MusicNext extends Plugin {
  static get pluginName () {
    return 'musicnext'
  }

  static get defaultConfig () {
    return {
      index: 4,
      position: Plugin.POSITIONS.CONTROLS_LEFT
    }
  }

  onClick = (e) => {
    const { player } = this
    e.preventDefault()
    e.stopPropagation()
    player.plugins.music.next()
  }

  afterCreate () {
    this.initIcons()
    const ev = ['click', 'touchstart']
    ev.forEach(item => {
      this.bind(item, this.onClick)
    })
  }

  registerIcons () {
    return {
      musicNext: {
        icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="100 200 1024 1024">
        <path d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z">
      </svg>`,
        class: 'xg-icon-mnext'
      }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.musicNext)
  }

  destroy () {
    const ev = ['click', 'touchstart']
    ev.forEach(item => {
      this.unbind(item, this.onClick)
    })
  }

  render () {
    return `<xg-icon class="xgplayer-next">
            <div class="xgplayer-icon">
            </div>
          </xg-icon>`
  }
}
