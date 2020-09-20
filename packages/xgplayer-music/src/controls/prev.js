import Player from '../music'

class Prev {
  constructor (player) {
    const util = Player.util
    const controlEl = player.controls
    const ev = ['click', 'touchstart']
    let prevBtn = player.config.prevBtn ? player.config.prevBtn : {}
    let prev
    if (prevBtn.type === 'img') {
      prev = Player.util.createImgBtn('prev', prevBtn.url, prevBtn.width, prevBtn.height)
    } else {
      prev = util.createDom('xg-prev', `<xg-icon class="xgplayer-icon"><svg t="1599462285788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18654" width="40" height="40"><path d="M682.666667 298.666667l-298.666667 213.333333 298.666667 213.333333z m-298.666667 213.333333V298.666667H298.666667v426.666666h85.333333z" p-id="18655" fill="#ffffff"></path></svg></xg-icon>`, {}, 'xgplayer-prev')
    }
    controlEl.appendChild(prev)

    ev.forEach(item => {
      prev.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        player.prev()
      }, false)
    })
  }
}

export default Prev;
