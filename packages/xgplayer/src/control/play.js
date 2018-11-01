import Player from '../player'
import SVG from '../utils/svg'

let play = function () {
  let player = this
  let root = player.controls; let util = Player.util; let scale = player.config.iconScale || 0.0320625
  let iconPath = {
    play: 'M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z',
    pause: 'M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z'
  }
  let btn = util.createDom('xg-play', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform="scale(${scale} ${scale})" d="${iconPath.play}"></path>
        </svg></xg-icon>`)
  let tipsPlay = player.config.lang && player.config.lang === 'zh-cn' ? '播放' : 'Play'
  let tipsPause = player.config.lang && player.config.lang === 'zh-cn' ? '暂停' : 'Pause'
  let tips = util.createDom('xg-tips', tipsPlay, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)

  let svg = new SVG({
    progress: (shape, percent) => {
      path.setAttribute('d', svg.toSVGString(shape))
    },
    from: iconPath.pause,
    to: iconPath.play,
    duration: 50
  })

  let ev = ['click', 'touchstart']
  btn.className = 'xgplayer-play'
  root.appendChild(btn)
  ev.forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (player.ended) {
        return
      }
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }, false)
  })

  player.on('play', () => {
    setTimeout(() => {
      tips.textContent = tipsPause
      if (svg.to !== iconPath.pause) {
        svg.reset(iconPath.pause, iconPath.play)
      }
    }, 80)
  })

  player.on('pause', () => {
    setTimeout(() => {
      tips.textContent = tipsPlay
      if (svg.to !== iconPath.play) {
        svg.reset(iconPath.play, iconPath.pause)
      }
    }, 80)
  })
  player.once('destroy', () => {
    btn = null
  })
}

Player.install('play', play)
