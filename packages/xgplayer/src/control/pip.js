import Player from '../player'
import Draggabilly from 'draggabilly'

let pip = function () {
  let player = this
  let util = Player.util
  if (!player.config.pip) {
    return
  }
  let btn = util.createDom('xg-pip', '<p class="name"><span>画中画</span></p>', {tabindex: 9}, 'xgplayer-pip')
  let dragLay = util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay')
  let dragHandle = util.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', {tabindex: 9}, 'xgplayer-pip-drag')
  let root = player.controls
  let container = player.root
  root.appendChild(btn)
  container.appendChild(dragHandle)
  container.appendChild(dragLay)
  let draggie = new Draggabilly('.xgplayer', {
    handle: '.drag-handle'
  })

  let getPIP = function (el) {
    let ro = player.root.getBoundingClientRect()
    let Top = ro.top
    let Left = ro.left

    util.addClass(el, 'xgplayer-pip-active')
    player.root.style.right = 0
    player.root.style.bottom = '200px';
    player.root.style.top = ''
    player.root.style.left = '';
    ['click', 'touchstart'].forEach(item => {
      dragLay.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        exitPIP(container)
        player.root.style.top = `${Top}px`
        player.root.style.left = `${Left}px`
      })
    })
  }
  let exitPIP = function (el) {
    util.removeClass(el, 'xgplayer-pip-active')
  };

  ['click', 'touchstart'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'xgplayer-pip-active')) {
        exitPIP(container)
      } else {
        getPIP(container)
      }
    })
  })
}

Player.install('pip', pip)
