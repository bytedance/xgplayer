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
      next = util.createDom('xg-next', `<xg-icon class="xgplayer-icon"><svg t="1599462191231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1796" width="40" height="40"><path d="M298.666667 298.666667v426.666666l298.666666-213.333333z m384 426.666666V298.666667h-85.333334v426.666666z" p-id="1797" fill="#ffffff"></path></svg></xg-icon>`, {}, 'xgplayer-next')
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
