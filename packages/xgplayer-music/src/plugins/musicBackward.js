import { Plugin } from 'xgplayer'

export class MusicBackward extends Plugin {
  static get pluginName () {
    return 'musicbackword'
  }

  static get defaultConfig () {
    return {
      index: 1,
      position: Plugin.POSITIONS.CONTROLS_LEFT
    }
  }

  onClick = (e) => {
    const { player } = this
    e.preventDefault()
    e.stopPropagation()
    player.plugins.music.backward()
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
      musicBackward: {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-2 0 21 15">
      <path d="m 14,2.99996 0,10 -7,-5 7,-5 z m -7,5 0,5 -7,-5 7,-5 0,5 z m -7,0 0,0 z"></path>
  </svg>`,
        class: 'xg-icon-mbackward'
      }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.musicBackward)
  }

  destroy () {
    const ev = ['click', 'touchstart']
    ev.forEach(item => {
      this.unbind(item, this.onClick)
    })
  }

  render () {
    return `<xg-icon class="xgplayer-backward">
            <div class="xgplayer-icon">
            </div>
          </xg-icon>`
  }
}
