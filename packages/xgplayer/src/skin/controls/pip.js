import Player from '../../player'

let s_pip = function () {
  let player = this
  let util = Player.util
  if (!player.config.pip) { return }
  let pip = player.lang.PIP
  let btn = util.createDom('xg-pip', `<p class="name"><span>${pip}</span></p>`, {tabindex: 9}, 'xgplayer-pip')

  player.once('ready', () => {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.emit('pipBtnClick')
    })
  })
}

Player.install('s_pip', s_pip)
