import { Plugin } from 'xgplayer'

export default class Backward extends Plugin {
  static get pluginName () {
    return 'backword'
  }

  static get defaultConfig () {
    return {
      index: 0,
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
        player.backward()
      })
    })
  }

  render () {
    return `<xg-icon class="xgplayer-backward">
            <div class="xgplayer-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-2 0 21 15">
                <path d="m 14,2.99996 0,10 -7,-5 7,-5 z m -7,5 0,5 -7,-5 7,-5 0,5 z m -7,0 0,0 z"></path>
            </svg>
            </div>
          </xg-icon>`
  }
}
