import Player from '../player'
import SVG from '../utils/svg'

let volume = function () {
  let player = this; let util = Player.util; let sniffer = Player.sniffer; let scale = 0.0220625
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
  if (sniffer.device === 'mobile') {
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
    player.once('destroy', () => {
      container = null
    })
    return
  }

  let iconPath = {
    muted: 'M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z',
    small: 'M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z',
    large: 'M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z'
  }
  let v2s = (vol) => {
    let s = ''
    if (vol === 0) {
      s = 'muted'
    } else if (vol < 0.5) {
      s = 'small'
    } else {
      s = 'large'
    }
    return s
  }
  let curIocnPath = iconPath[v2s(volume)]
  let defaultPath = iconPath[v2s(volume)]
  let container = util.createDom('xg-volume', `<xg-icon class="xgplayer-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                                                        <path transform="scale(${scale} ${scale})" d="M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z"></path>
                                                        <path transform="scale(${scale} ${scale})" d="${defaultPath}"></path>
                                                    </svg>
                                                </xg-icon>
                                                <xg-slider class="xgplayer-slider" tabindex="2">
                                                    <xg-bar class="xgplayer-bar">
                                                        <xg-drag class="xgplayer-drag"></xg-drag>
                                                    </xg-bar>
                                                </xg-slider>`,
  {}, 'xgplayer-volume'); let root = player.controls
  root.appendChild(container)
  let containerHeight
  let slider = container.querySelector('.xgplayer-slider')
  let bar = container.querySelector('.xgplayer-bar')
  let selected = container.querySelector('.xgplayer-drag')
  let icon = container.querySelector('.xgplayer-icon')
  selected.style.height = `${player.config.volume * 100}%`
  let path = container.querySelectorAll('path')[1]
  let svg = new SVG({
    progress: (shape, percent) => {
      let _p = svg.toSVGString(shape)
      path.setAttribute('d', _p)
      curIocnPath = _p
    },
    from: curIocnPath,
    to: iconPath['large']
  })
  let barSize = null
  slider.volume = player.config.volume;

  ['touchstart', 'mousedown'].forEach(item => {
    bar.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.video.muted = false
      slider.focus()
      util.event(e)
      containerHeight = bar.getBoundingClientRect().height
      let pos = {x: e.clientX, y: e.clientY}; let height = selected.getBoundingClientRect().height; let isMove = false
      let move = function (e) {
        e.preventDefault()
        e.stopPropagation()
        util.event(e)
        isMove = true
        let w = height - e.clientY + pos.y
        let now = w / containerHeight
        selected.style.height = `${w}px`
        player.volume = Math.max(Math.min(now, 1), 0.01)
      }
      let up = function (e) {
        e.preventDefault()
        e.stopPropagation()
        util.event(e)
        window.removeEventListener('mousemove', move)
        window.removeEventListener('touchmove', move)
        window.removeEventListener('mouseup', up)
        window.removeEventListener('touchend', up)
        if (!barSize) {
          barSize = bar.getBoundingClientRect()
        }
        if (!isMove) {
          let w = barSize.height - (e.clientY - barSize.top)
          let now = w / barSize.height
          selected.style.height = `${w}px`
          if (now <= 0) {
            if (player.volume > 0) {
              selected.volume = player.video.volume
            } else {
              now = selected.volume
            }
          }
          player.volume = Math.max(Math.min(now, 1), 0.01)
        }
        slider.volume = player.volume
        isMove = false
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('touchmove', move)
      window.addEventListener('mouseup', up)
      window.addEventListener('touchend', up)
      return false
    })
  });

  ['touchstart', 'mousedown'].forEach((item) => {
    icon.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.video.muted = false

      if (player.volume === 0) {
        player.volume = slider.volume
      } else {
        player.volume = 0
      }
    })
  })

  icon.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.addClass(player.root, 'xgplayer-volume-active')
    container.focus()
  })

  container.addEventListener('blur', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'xgplayer-volume-active')
  })

  container.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'xgplayer-volume-active')
  })

  let _changeTimer = null
  player.on('volumechange', function () {
    if (_changeTimer) {
      clearTimeout(_changeTimer)
    }
    _changeTimer = setTimeout(() => {
      svg.reset(iconPath[v2s(player.volume)], curIocnPath)
      curIocnPath = iconPath[v2s[player.volume]]
      if (!containerHeight) {
        containerHeight = bar.getBoundingClientRect().height || 76
      }
      selected.style.height = `${player.volume * containerHeight}px`
    }, 50)
  })

  player.once('destroy', () => {
    container = null
    selected = null
  })
}

Player.install('volume', volume)
