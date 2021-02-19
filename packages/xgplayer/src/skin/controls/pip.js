import Player from '../../player'
import '../style/controls/pip.scss'

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

export default {
  name: 's_pip',
  method: s_pip
}