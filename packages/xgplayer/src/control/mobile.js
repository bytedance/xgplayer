import Player from '../player'
import SVG from '../utils/svg'

let whitelistPass = (list) => {
  let util = Player.util
  return list.some(item => {
    if (util.typeOf(item) === 'Function') {
      return item.call(navigator.userAgent)
    } else if (util.typeOf(item) === 'RegExp') {
      return item.test(navigator.userAgent)
    } else if (util.typeOf(item) === 'String') {
      return navigator.userAgent.indexOf(item) > -1
    } else {
      return false
    }
  })
}

let debug = (config) => {
  let options = {}
  Object.assign(options, {
    host: '127.0.0.1',
    port: 9090
  }, config)
  let script = document.createElement('script')
  let h4 = document.createElement('h4')
  h4.style.cssText = 'position:fixed;bottom:0;padding:10px;width:100%;background-color:#fff;text-align:center'
  h4.textContent = `weinre --boundHost ${options.host} --httpPort ${options.port}\r\n 启动服务后，刷新页面`
  script.anonymous = true
  script.async = true
  script.src = `http://${options.host}:${options.port}/target/target-script-min.js#anonymous`
  script.onload = function () {
    h4.parentNode.removeChild(h4)
  }
  document.body.appendChild(script)
  document.body.appendChild(h4)
}

let mobile = function () {
  let player = this

  let util = Player.util; let root = player.root
  // player.config.autoplay = false
  let whitelist = player.config.whitelist
  let pass = whitelistPass(whitelist)
  player.mobilePass = pass
  let centerBtn = player.config.centerBtn ? player.config.centerBtn : {}
  let iconPath, btn, path, svg
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
    svg = new SVG({
      from: iconPath.play,
      to: iconPath.pause,
      progress: (shape, percent) => {
        path.setAttribute('d', svg.toSVGString(shape))
      }
    })
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
  player.start()
  if (pass) {
    player.video.addEventListener('touchend', (e) => {
      e.preventDefault()
      if (util.hasClass(root, 'xgplayer-inactive')) {
        player.emit('focus')
      } else {
        player.emit('blur')
      }
    }, false)
    btn.addEventListener('touchend', (e) => {
      e.preventDefault()
      if (util.hasClass(root, 'xgplayer-nostart')) {
        util.removeClass(root, 'xgplayer-nostart')
        util.addClass(root, 'xgplayer-is-enter')
        player.on('canplay', () => {
          util.removeClass(root, 'xgplayer-is-enter')
        })
        player.once('playing', () => {
          util.removeClass(root, 'xgplayer-is-enter')
        })
        player.play()
      } else {
        if (player.paused) {
          player.play()
        } else {
          player.pause()
        }
      }
    })
    player.on('play', () => {
      if (centerBtn.type === 'img') {
        btn.style.backgroundImage = `url("${centerBtn.url.play}")`
      } else {
        svg.reset(iconPath.play, iconPath.pause)
      }
    })
    player.on('pause', () => {
      if (centerBtn.type === 'img') {
        btn.style.backgroundImage = `url("${centerBtn.url.play}")`
      } else {
        svg.reset(iconPath.pause, iconPath.play)
      }
    })
    if (player.config.autoplayMuted) {
      player.config.volume = player.config.autoplay ? 0 : player.config.volume
    }
    player.once('canplay', function () {
      if (player.config.autoplay && player.config.autoplayMuted) {
        player.volume = 0
      } else {
        player.volume = player.config.volume
      }
    })
    let volume = player.config.volume
    let scale = 0.0220625
    let volumePath = {
      muted: 'M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z',
      large: 'M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z'
    }
    let v2s = (vol) => {
      let s = ''
      if (vol === 0) {
        s = 'muted'
      } else {
        s = 'large'
      }
      return s
    }
    let curIocnPath = volumePath[v2s(volume)]
    let defaultPath = volumePath[v2s(volume)]
    let container = util.createDom('xg-volume', `<xg-icon class="xgplayer-icon">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                                                          <path transform="scale(${scale} ${scale})" d="M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z"></path>
                                                          <path transform="scale(${scale} ${scale})" d="${defaultPath}"></path>
                                                      </svg>
                                                  </xg-icon>`,
    {}, 'xgplayer-volume')
    player.controls.appendChild(container)
    let icon = container.querySelector('.xgplayer-icon')
    let pathVolume = container.querySelectorAll('path')[1]
    let svgVolume = new SVG({
      progress: (shape, percent) => {
        let _p = svgVolume.toSVGString(shape)
        pathVolume.setAttribute('d', _p)
        curIocnPath = _p
      },
      from: curIocnPath,
      to: volumePath['large']
    });
    ['touchend', 'mousedown'].forEach((item) => {
      icon.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (player.video.muted) {
          player.video.muted = false
          player.volume = 1
          svgVolume.reset(volumePath['large'], volumePath['muted'])
          curIocnPath = volumePath['large']
        } else {
          player.volume = 0
          player.video.muted = true
          svgVolume.reset(volumePath['muted'], volumePath['large'])
          curIocnPath = volumePath['muted']
        }
      })
    })
    // let _changeTimer = null
    // player.on('volumechange', function () {
    //   if (_changeTimer) {
    //     clearTimeout(_changeTimer)
    //   }
    //   _changeTimer = setTimeout(() => {
    //     svgVolume.reset(volumePath[v2s(player.volume)], curIocnPath)
    //     curIocnPath = volumePath[v2s[player.volume]]
    //   }, 50)
    // })
    player.once('destroy', () => {
      container = null
    })
  } else {
    util.addClass(root, 'xgplayer-mobile-npassed')
    player.once('ready', function () {
      player.video.controls = player.config.controls
      player.video.controlsList = player.config.controlsList.join(' ')
      if (player.config.poster) {
        player.video.poster = player.config.poster
      }
    })
  }
  if (player.config.debug) {
    debug(player.config.debug)
  }
}
Player.install('mobile', mobile)
