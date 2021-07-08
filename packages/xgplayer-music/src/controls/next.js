import { Plugin } from 'xgplayer/es/player'

export default class Next extends Plugin {
  static get pluginName () {
    return 'next'
  }

  static get defaultConfig () {
    return {
      index: 4,
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
        player.next()
      })
    })
  }

  render () {
    return `<xg-icon class="xgplayer-next">
            <div class="xgplayer-icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="100 200 1024 1024">
              <path d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z">
            </svg>
            </div>
          </xg-icon>`
  }
}

// const next = (player) => {
//   const Util = Player.Util
//   const controlEl = player.controls
//   const ev = ['click', 'touchstart']
//   let nextBtn = player.config.nextBtn ? player.config.nextBtn : {}
//   let next
//   if (nextBtn.type === 'img') {
//     next = Player.Util.createImgBtn('next', nextBtn.url, nextBtn.width, nextBtn.height)
//   } else {
//     next = Util.createDom('xg-next', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
//               <path transform="scale(0.025 0.025)"
//               d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>
//           </svg></xg-icon>`, {}, 'xgplayer-next')
//   }
//   controlEl.appendChild(next)
//   ev.forEach(item => {
//     next.addEventListener(item, function (e) {
//       e.preventDefault()
//       e.stopPropagation()
//       player.next()
//     }, false)
//   })
// }

// Player.install('next', next)
