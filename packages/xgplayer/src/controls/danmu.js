1import Player from '../player'

let danmu = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onInitDanmu(danmujs) {
    let container = player.root.querySelector('xg-danmu')
    util.addClass(container, 'xgplayer-has-danmu')
    if (!player.config.danmu.closeDefaultBtn) {
      player.danmuBtn = util.copyDom(danmujs.bulletBtn.createSwitch(true))
      player.controls.appendChild(player.danmuBtn)

      function onTimeupdate () {
        danmujs.start()
      }
      ['click', 'touchend'].forEach(item => {
        player.danmuBtn.addEventListener(item, e => {
          e.preventDefault()
          e.stopPropagation()
          util.toggleClass(player.danmuBtn, 'danmu-switch-active')
          if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
            util.addClass(container, 'xgplayer-has-danmu')
            player.once('timeupdate', onTimeupdate)
          } else {
            util.removeClass(container, 'xgplayer-has-danmu')
            danmujs.stop()
          }
        })
      })

      player.onElementClick && container.addEventListener('click', function (e) { player.onElementClick(e, container) }, false)
      player.onElementDblclick && container.addEventListener('dblclick', function (e) { player.onElementDblclick(e, container) }, false)

      function onPause () {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.pause()
        }
      }
      player.on('pause', onPause)

      function onPlay () {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.play()
        }
      }
      player.on('play', onPlay)

      function onSeeked () {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.stop()
          danmujs.start()
        }
      }
      player.on('seeked', onSeeked)

      function onDestroy () {
        player.off('timeupdate', onTimeupdate)
        player.off('pause', onPause)
        player.off('play', onPlay)
        player.off('seeked', onSeeked)
        player.off('destroy', onDestroy)
      }
      player.once('destroy', onDestroy)
    }
  }
  player.on('initDefaultDanmu', onInitDanmu)

}

Player.install('danmu', danmu)
