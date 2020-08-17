import { Plugin } from 'xgplayer/es/player'

export default class Prev extends Plugin {
  static get pluginName () {
    return 'prev'
  }

  static get defaultConfig () {
    return {
      index: 1,
      position: Plugin.POSITIONS.CONTROLS_LEFT
    }
  }

  afterCreate () {
    const ev = ['click', 'touchstart']
    const { player } = this
    ev.forEach(item => {
      this.bind(item, (e) => {
        e.preventDefault()
        e.stopPropagation()
        player.prev()
      })
    })
  }

  render () {
    return `<xg-icon class="xgplayer-next">
            <div class="xgplayer-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="300 200 1024 1024">
                <path d="M600 1140v-768h128v352l320-320v704l-320-320v352zz"></path>
            </svg>
            </div>
          </xg-icon>`
  }
}
