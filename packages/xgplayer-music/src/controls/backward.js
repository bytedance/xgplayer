import Player from '../music'

const backward = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const ev = ['click', 'touchstart']
  const backward = util.createDom('xg-backward', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform = "scale(1.5 1.5) translate(8 4.5)"
            d="m 14,2.99996 0,10 -7,-5 7,-5 z m -7,5 0,5 -7,-5 7,-5 0,5 z m -7,0 0,0 z"></path>
        </svg></xg-icon>`, {}, 'xgplayer-backward')
  controlEl.appendChild(backward)
  ev.forEach(item => {
    backward.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.backward()
    }, false)
  })
}

Player.install('backward', backward)
