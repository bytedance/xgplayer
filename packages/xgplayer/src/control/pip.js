import Player from '../player'

let pip = function () {
  let player = this
  let util = Player.util
  if (!player.config.pip) {
    return
  }
  let btn = util.createDom('xg-pip', '<p class="name"><span>画中画</span></p>', {tabindex: 9}, 'xgplayer-pip')
  let root = player.controls
  let container = player.root
  root.appendChild(btn)
  let clickEvents = ['click', 'touchstart']
  clickEvents.forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'xgplayer-pip-active')) {
        player.exitPIP(player)
      } else {
        player.getPIP(player)
      }
    })
  })
}

Player.install('pip', pip)
