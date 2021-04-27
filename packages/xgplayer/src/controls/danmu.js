import { addClass, toggleClass, copyDom, hasClass, removeClass } from '../utils/util'

let danmu = function () {
  let player = this

  function onInitDanmu(danmujs) {
    let container = player.root.querySelector('xg-danmu')
    addClass(container, 'xgplayer-has-danmu')
    if (!player.config.danmu.closeDefaultBtn) {
      player.danmuBtn = copyDom(danmujs.bulletBtn.createSwitch(true))
      player.controls.appendChild(player.danmuBtn)

      function onTimeupdate () {
        danmujs.start()
      }
      ['click', 'touchend'].forEach(item => {
        player.danmuBtn.addEventListener(item, e => {
          e.preventDefault()
          e.stopPropagation()
          toggleClass(player.danmuBtn, 'danmu-switch-active')
          if (hasClass(player.danmuBtn, 'danmu-switch-active')) {
            player.emit('danmuBtnOn')
            addClass(container, 'xgplayer-has-danmu')
            player.once('timeupdate', onTimeupdate)
          } else {
            player.emit('danmuBtnOff')
            removeClass(container, 'xgplayer-has-danmu')
            danmujs.stop()
          }
        })
      })

      player.onElementClick && container.addEventListener('click', function (e) { player.onElementClick(e, container) }, false)
      player.onElementDblclick && container.addEventListener('dblclick', function (e) { player.onElementDblclick(e, container) }, false)

      function onPause () {
        if (hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.pause()
        }
      }
      player.on('pause', onPause)

      function onPlay () {
        if (hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.play()
        }
      }
      player.on('play', onPlay)

      function onSeeked () {
        if (hasClass(player.danmuBtn, 'danmu-switch-active')) {
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

export default {
  name: 'danmu',
  method: danmu
}