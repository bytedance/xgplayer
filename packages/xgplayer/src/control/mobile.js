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
  let centerBtn = player.config.centerBtn
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
  let enterLogo = new Image()
  let svg = new SVG({
    from: iconPath.play,
    to: iconPath.pause,
    progress: (shape, percent) => {
      path.setAttribute('d', svg.toSVGString(shape))
    }
  })
  enter.querySelector('.xgplayer-enter-tips').style.display = 'block'
  player.start()
  if (pass) {
    if (player.config.enterLogo) {
        enterLogo.src = player.config.enterLogo;
        logo.style.backgroundImage = `url("${player.config.enterLogo}")`
    } else {
        enterLogo.src = util.getBgImage(logo);
    }
    player.video.addEventListener('touchstart', (e) => {
      e.preventDefault()
      player.emit('focus')
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
      svg.reset(iconPath.play, iconPath.pause)
    })
    player.on('pause', () => {
      svg.reset(iconPath.pause, iconPath.play)
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
