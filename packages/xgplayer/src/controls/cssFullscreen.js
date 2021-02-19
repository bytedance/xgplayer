import Player from '../player'

let cssFullscreen = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onCssFullscreenBtnClick () {
    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
      player.exitCssFullscreen()
    } else {
      player.getCssFullscreen()
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

  player.getCssFullscreen = function () {
    let player = this
    if (player.config.fluid) {
      player.root.style['padding-top'] = ''
    }
    util.addClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('requestCssFullscreen')
  }

  player.exitCssFullscreen = function () {
    let player = this
    if (player.config.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
    }
    util.removeClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('exitCssFullscreen')
  }
}

export default {
  name: 'cssFullscreen',
  method: cssFullscreen
}