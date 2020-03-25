import Player from '../music'

class Next {
  constructor (player) {
    const util = Player.util
    const controlEl = player.controls
    const ev = ['click', 'touchstart']
    let nextBtn = player.config.nextBtn ? player.config.nextBtn : {}
    let next
    if (nextBtn.type === 'img') {
      next = Player.util.createImgBtn('next', nextBtn.url, nextBtn.width, nextBtn.height)
    } else {
      next = util.createDom('xg-next', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                <path transform="scale(0.025 0.025)"
                d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>
            </svg></xg-icon>`, {}, 'xgplayer-next')
    }
    controlEl.appendChild(next)
    ev.forEach(item => {
      next.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        player.next()
      }, false)
    })
  }
}

export default Next;
