import Player from '../player'

let fullscreen = function () {
  let player = this; let util = Player.util
  let scale = 0.03
  let iconPath = {
    active: 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z',
    default: 'M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z'
  }
  let btn = util.createDom('xg-fullscreen', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform="scale(${scale} ${scale})" d="${iconPath.default}"></path>
        </svg></xg-icon>`, {}, 'xgplayer-fullscreen')
  let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '全屏' : 'Full screen'
  let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出全屏' : 'Exit full screen'
  let root = player.controls; let container = player.root
  let tips = util.createDom('xg-tips', tipsFull, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)
  let getFullscreen = function (el) {
    let cssfullscreenDom = util.findDom(player.controls, 'xg-cssfullscreen')
    if(cssfullscreenDom) {
      cssfullscreenDom.style.display = 'none'
    }
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      util.addClass(el, 'xgplayer-fullscreen-active')
    }
  }
  let exitFullscreen = function (el) {
    let cssfullscreenDom = util.findDom(player.controls, 'xg-cssfullscreen')
    let iconPath = {
      default: 'M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z'
    }
    if(cssfullscreenDom) {
      let cssfullscreentTip = util.findDom(cssfullscreenDom, 'xg-tips')
      let path = cssfullscreenDom.querySelector('path')
      cssfullscreenDom.style.display = 'block'
      cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '样式全屏' : 'Full screen'
      path.setAttribute('d', iconPath.default)
    }
    util.removeClass(el, 'xgplayer-cssfullscreen-active')
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else {
      util.removeClass(el, 'xgplayer-fullscreen-active')
    }
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'xgplayer-fullscreen-active') || util.hasClass(container, 'xgplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })
  player.video.addEventListener('webkitendfullscreen', () => {
    player.emit('exitFullscreen')
    path.setAttribute('d', iconPath.default)
  })
  
  let fullsrceenChangeEv = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
  fullsrceenChangeEv.forEach(item => {
    document.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (!document.fullscreenElement &&!document.webkitIsFullScreen &&!document.mozFullScreen &&!document.msFullscreenElement) { 
        let cssfullscreenDom = util.findDom(player.controls, 'xg-cssfullscreen')
        let iconPath = {
          default: 'M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z'
        }
        if(cssfullscreenDom) {
          let cssfullscreentTip = util.findDom(cssfullscreenDom, 'xg-tips')
          let path = cssfullscreenDom.querySelector('path')
          cssfullscreenDom.style.display = 'block'
          cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '样式全屏' : 'Full screen'
          path.setAttribute('d', iconPath.default)
        }
        util.removeClass(container, 'xgplayer-cssfullscreen-active')
        path.setAttribute('d', iconPath.default)
        tips.textContent = tipsFull
        util.removeClass(container, 'xgplayer-fullscreen-active')
      }
    })
  })

  let handle = function (e) {
    let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    if (fullscreenEl && fullscreenEl === container) {
      util.addClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.active)
      tips.textContent = tipsExitFull
      player.emit('requestFullscreen')
    } else {
      util.removeClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.default)
      tips.textContent = tipsFull
      player.emit('exitFullscreen')
    }
  }

  btn.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  });

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
    document.addEventListener(item, handle)
  })

  function destroyFunc () {
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, handle)
    })
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('fullscreen', fullscreen)
