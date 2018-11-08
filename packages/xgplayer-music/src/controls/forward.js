import Player from '../music'

const forward = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const ev = ['click', 'touchstart']
  let forwardBtn = player.config.forwardBtn ? player.config.forwardBtn : {}
  let forward
  if (forwardBtn.type === 'img') {
    forward = Player.util.createImgBtn('forward', forwardBtn.url, forwardBtn.width, forwardBtn.height)
  } else {
    forward = util.createDom('xg-forward', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
              <path transform = "scale(1.5 1.5) translate(-2 4.5)"
              d="m 2,2.99996 0,10 7,-5 -7,-5 z m 7,5 0,5 7,-5 -7,-5 0,5 z m 7,0 0,0 z"></path>
          </svg></xg-icon>`, {}, 'xgplayer-forward')
  }
  controlEl.appendChild(forward)
  ev.forEach(item => {
    forward.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.forward()
    }, false)
  })
}

Player.install('forward', forward)
