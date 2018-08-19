import Player from '../player'

let pc = function () {
  let player = this
  let util = Player.util; let controls = player.controls; let root = player.root
  let clk = 0; let _click_
  let centerBtn = player.config.centerBtn ? player.config.centerBtn : {}
  let iconPath = {
    pause: centerBtn.pausePath ? centerBtn.pausePath : 'M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z',
    play: centerBtn.playPath ? centerBtn.playPath : 'M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z'
  }
  let btn = util.createDom('xg-start', `
        <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform="scale(0.04,0.04)" d="${iconPath.pause}"></path>
        </svg>`, {}, 'xgplayer-start')
  let enter = util.createDom('xg-enter', '<xg-enter-logo class="xgplayer-enter-logo"></xg-enter-logo><xg-enter-tips class="xgplayer-enter-tips"></xg-player-tips>', {}, 'xgplayer-enter')
  let logo = enter.querySelector('.xgplayer-enter-logo')
  root.appendChild(btn)
  root.appendChild(enter)
  let path = btn.querySelector('path')
  let enterTips = enter.querySelector('.xgplayer-enter-tips')
  let enterLogo = new Image()
  enterLogo.onload = () => {
    enterTips.style.display = 'block'
  }
  if (player.config.enterLogo && player.config.enterLogo.url && player.config.enterLogo.width && player.config.enterLogo.height) {
    enterLogo.src = player.config.enterLogo.url

    logo.style.backgroundImage = `url("${player.config.enterLogo.url}")`
    logo.style.width = `${player.config.enterLogo.width}px`
    logo.style.height = `${player.config.enterLogo.height}px`

    logo.style.backgroundSize = `${player.config.enterLogo.width}px ${player.config.enterLogo.height}px`
    logo.style.margin = `-${player.config.enterLogo.height/2}px auto auto -${player.config.enterLogo.width/2}px`

    enterTips.style.margin = `${player.config.enterLogo.height-6}px auto auto -62px`
  } else {
    enterLogo.src = util.getBgImage(logo)
  }

  if (player.config.enterTips && player.config.enterTips.background) {
    enterTips.style.background = `${player.config.enterTips.background}`
  }

  if (player.config.enterBg) {
    if (player.config.enterBg.url) {
      enter.style.backgroundImage = `url("${player.config.enterBg.url}")`
    } else if (player.config.enterBg.color) {
      enter.style.background = player.config.enterBg.color
    }
  }

  ['click', 'touchstart'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (!player.config.url) {
        return
      }
      if (util.hasClass(root, 'xgplayer-nostart')) {
        util.removeClass(root, 'xgplayer-nostart') // for ie quick switch
        util.addClass(root, 'xgplayer-is-enter')
        if (!root.querySelector('video')) {
          player.start()
        }
        player.on('canplay', () => {
          util.removeClass(root, 'xgplayer-is-enter')
        })
        player.once('playing', () => {
          util.removeClass(root, 'xgplayer-is-enter')
        })
        player.play()
        setTimeout(() => {
          player.play()
        }, 10)
      } else {
        if (player.paused) {
          util.removeClass(root, 'xgplayer-nostart xgplayer-isloading')
          setTimeout(() => {
            player.play()
          }, 10)
        }
      }
    })
  })
  btn.addEventListener('animationend', (e) => {
    e.preventDefault()
    util.removeClass(btn, 'xgplayer-start-interact')
    btn.style.display = 'none'
  })
  player.on('play', () => {
    path.setAttribute('d', iconPath.pause)
    btn.style.display = 'inline-block'
    util.addClass(btn, 'xgplayer-start-interact')
  })
  player.on('pause', () => {
    path.setAttribute('d', iconPath.play)
    btn.style.display = 'inline-block'
    util.addClass(btn, 'xgplayer-start-interact')
  })

  player.video.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (document.activeElement !== player.video) {
      player.video.focus()
      return
    }
    clk++
    if (_click_) {
      clearTimeout(_click_)
    }
    if (clk === 1) {
      _click_ = setTimeout(function () {
        if (util.hasClass(player.root, 'xgplayer-nostart')) {
          return false
        } else if (!player.ended) {
          if (player.paused) {
            player.play()
          } else {
            player.pause()
          }
        }
        clk = 0
      }, 200)
    } else {
      clk = 0
    }
  }, false)

  player.video.addEventListener('dblclick', function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (document.activeElement !== player.video) {
      player.video.focus()
      return
    }
    let fullscreen = controls.querySelector('.xgplayer-fullscreen')
    if (fullscreen) {
      let clk
      if (document.createEvent) {
        clk = document.createEvent('Event')
        clk.initEvent('click', true, true)
      } else {
        clk = new Event('click')
      }
      fullscreen.dispatchEvent(clk)
    }
  }, false)

  root.addEventListener('mouseenter', function (e) {
    player.emit('focus', player)
  }, false)

  root.addEventListener('mouseleave', function (e) {
    player.emit('blur', player)
  }, false)

  controls.addEventListener('mouseenter', function (e) {
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
  }, false)

  controls.addEventListener('mouseleave', function (e) {
    player.emit('focus', player)
  }, false)
}

Player.install('pc', pc)
