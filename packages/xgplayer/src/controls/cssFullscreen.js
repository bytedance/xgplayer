import Player from '../player'

let cssFullscreen = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onCssFullscreenBtnClick () {
    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
      util.removeClass(root, 'xgplayer-is-cssfullscreen')
    } else {
      util.addClass(root, 'xgplayer-is-cssfullscreen')
    }
  }
  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick)
  player.on('exitFullscreen', () => {
    util.removeClass(root, 'xgplayer-is-cssfullscreen')
  })

  function onDestroy () {
    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('cssFullscreen', cssFullscreen)
