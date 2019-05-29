import Player from '../player'
import DanmuJs from 'danmu.js'

let danmu = function () {
  let player = this
  if (player.config.danmu) {
    let container = Player.util.createDom('xg-bullet', '', {}, 'xgplayer-bullet')
    player.root.appendChild(container)
    container.style.height = '100%'
    let config = Player.util.deepCopy({
      container,
      // containerStyle: {
      //   zIndex: 9
      // },
      player: player.video,
      comments: [],
      area: {
        start: 0,
        end: 1
      }
    }, player.config.danmu)

    player.once('complete', () => {
      let danmujs = new DanmuJs(config)
      Player.util.addClass(container, 'xgplayer-has-bullet')
      if (!player.config.danmu.closeDefaultBtn) {
        player.bulletBtn = Player.util.copyDom(danmujs.bulletBtn.createSwitch(true))
        player.controls.appendChild(player.bulletBtn);

        ['click', 'touchend'].forEach(item => {
          player.bulletBtn.addEventListener(item, function (e) {
            e.preventDefault()
            e.stopPropagation()
            Player.util.toggleClass(player.bulletBtn, 'danmu-switch-active')
            if (Player.util.hasClass(player.bulletBtn, 'danmu-switch-active')) {
              Player.util.addClass(container, 'xgplayer-has-bullet')
              player.once('timeupdate', () => {
                danmujs.start()
              })
            } else {
              Player.util.removeClass(container, 'xgplayer-has-bullet')
              danmujs.stop()
            }
          }, false)
        })

        player.onElementClick && container.addEventListener('click', function (e) { player.onElementClick(e, container) }, false)
        player.onElementDblclick && container.addEventListener('dblclick', function (e) { player.onElementDblclick(e, container) }, false)

        player.on('pause', () => {
          if (Player.util.hasClass(player.bulletBtn, 'danmu-switch-active')) {
            danmujs.pause()
          }
        })

        player.on('play', () => {
          if (Player.util.hasClass(player.bulletBtn, 'danmu-switch-active')) {
            danmujs.play()
          }
        })

        player.on('seeked', () => {
          if (Player.util.hasClass(player.bulletBtn, 'danmu-switch-active')) {
            danmujs.stop()
            danmujs.start()
          }
        })
      }

      player.danmu = danmujs
    })
  }
}

Player.install('danmu', danmu)
