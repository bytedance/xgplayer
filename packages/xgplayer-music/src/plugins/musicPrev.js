import { Plugin } from 'xgplayer'

export class MusicPrev extends Plugin {
  static get pluginName () {
    return 'musicprev'
  }

  static get defaultConfig () {
    return {
      index: 2,
      position: Plugin.POSITIONS.CONTROLS_LEFT
    }
  }

  onClick = (e) => {
    const { player } = this
    e.preventDefault()
    e.stopPropagation()
    player.plugins.music.prev()
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
      musicPrev: {
        icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="300 200 1024 1024">
        <path d="M600 1140v-768h128v352l320-320v704l-320-320v352zz"></path>
    </svg>`,
        class: 'xg-icon-mprev'
      }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.musicPrev)
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
