import Player from '../player'

let pc = function () {
  let player = this
  let util = Player.util; let controls = player.controls; let root = player.root
  let clk = 0; let _click_
  let centerBtn = player.config.centerBtn ? player.config.centerBtn : {}
  let iconPath, btn, path
  if (centerBtn.type === 'img') {
    btn = Player.util.createImgBtn('start', centerBtn.url.play, centerBtn.width, centerBtn.height)
  } else {
    iconPath = {
      pause: centerBtn.pausePath ? centerBtn.pausePath : 'M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z',
      play: centerBtn.playPath ? centerBtn.playPath : 'M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z'
    }
    btn = util.createDom('xg-start', `
          <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
              <path transform="scale(0.04,0.04)" d="${iconPath.pause}"></path>
          </svg>`, {}, 'xgplayer-start')
    path = btn.querySelector('path')
  }

  let enter = util.createDom('xg-enter', '<xg-enter-logo class="xgplayer-enter-logo"></xg-enter-logo><xg-enter-tips class="xgplayer-enter-tips"></xg-player-tips>', {}, 'xgplayer-enter')
  let logo = enter.querySelector('.xgplayer-enter-logo')
  root.appendChild(btn)
  root.appendChild(enter)
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

  function startClcCanplay () {
    util.removeClass(root, 'xgplayer-is-enter')
  }

  function startClcPlaying () {
    util.removeClass(root, 'xgplayer-is-enter')
  }

  function startClc (e) {
    e.preventDefault()
    e.stopPropagation()
    // if (!player.config.url) {
    //   return
    // }
    if (util.hasClass(root, 'xgplayer-nostart')) {
      util.removeClass(root, 'xgplayer-nostart') // for ie quick switch
      util.addClass(root, 'xgplayer-is-enter')
      player.on('canplay', startClcCanplay)
      player.once('playing', startClcPlaying)
      if (!root.querySelector('video')) {
        player.start()
      }
      player.play()
    } else {
      if (player.paused) {
        util.removeClass(root, 'xgplayer-nostart xgplayer-isloading')
        setTimeout(() => {
          player.play()
        }, 10)
      }
    }
  };
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) { startClc(e) }, false)
  })

  function startAniEnd (e) {
    e.preventDefault()
    util.removeClass(btn, 'xgplayer-start-interact')
    btn.style.display = 'none'
  }
  btn.addEventListener('animationend', function (e) { startAniEnd(e) })

  function playFunc () {
    if (centerBtn.type === 'img') {
      btn.style.backgroundImage = `url("${centerBtn.url.pause}")`
    } else {
      path.setAttribute('d', iconPath.pause)
    }
    btn.style.display = 'inline-block'
    util.addClass(btn, 'xgplayer-start-interact')
  }
  player.on('play', playFunc)

  function pauseFunc () {
    if (centerBtn.type === 'img') {
      btn.style.backgroundImage = `url("${centerBtn.url.play}")`
    } else {
      path.setAttribute('d', iconPath.play)
    }
    btn.style.display = 'inline-block'
    util.addClass(btn, 'xgplayer-start-interact')
  }
  player.on('pause', pauseFunc)

  function videoClc (e) {
    e.preventDefault()
    e.stopPropagation()
    if (document.activeElement !== player.video) {
      player.video.focus()
      return
    }
    if (!player.config.closeVideoClick) {
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
    }
  }
  player.video.addEventListener('click', function (e) { videoClc(e) }, false)

  function videoDbClc (e) {
    e.preventDefault()
    e.stopPropagation()
    if (document.activeElement !== player.video) {
      player.video.focus()
      return
    }
    if (!player.config.closeVideoDblclick) {
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
    }
  }
  player.video.addEventListener('dblclick', function (e) { videoDbClc(e) }, false)

  function mouseenterFunc () {
    player.emit('focus', player)
  }
  root.addEventListener('mouseenter', mouseenterFunc, false)

  function mouseleaveFunc () {
    player.emit('blur', player)
  }
  root.addEventListener('mouseleave', mouseleaveFunc, false)

  function cmouseenterFunc (e) {
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
  }
  controls.addEventListener('mouseenter', cmouseenterFunc, false)

  function cmouseleaveFunc (e) {
    player.emit('focus', player)
  }
  controls.addEventListener('mouseleave', cmouseleaveFunc, false)

  function readyFunc (e) {
    if (player.config.autoplay) {
      player.start()
    }
  }
  player.once('ready', readyFunc)

  function destroyFunc () {
    this.off('destroy', destroyFunc);
    ['click', 'touchend'].forEach(item => {
      btn.removeEventListener(item, function (e) { startClc(e) }, false)
    })
    btn.removeEventListener('animationend', function (e) { startAniEnd(e) })
    player.video.removeEventListener('click', function (e) { videoClc(e) }, false)
    player.video.removeEventListener('dblclick', function (e) { videoDbClc(e) }, false)
    root.removeEventListener('mouseenter', mouseenterFunc, false)
    root.removeEventListener('mouseleave', mouseleaveFunc, false)
    controls.removeEventListener('mouseenter', cmouseenterFunc, false)
    controls.removeEventListener('mouseleave', cmouseleaveFunc, false)
    player.off('ready', readyFunc)
    player.off('canplay', startClcCanplay)
    player.off('playing', startClcPlaying)
    player.off('play', playFunc)
    player.off('pause', pauseFunc)
    enterLogo.onload = null
    util = null
    controls = null
    root = null
    clk = null
    _click_ = null
    centerBtn = null
    iconPath = null
    btn = null
    path = null
    enter = null
    logo = null
    enterTips = null
    enterLogo = null
  }
  player.on('destroy', destroyFunc)
}

Player.install('pc', pc)
