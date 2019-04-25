import Player from '../player'

let playbackRate = function () {
  let player = this
  let util = Player.util
  let selected = 0
  let selectedSpeed = 1
  let rateTpl = []
  if (player.config.playbackRate) {
    player.config.playbackRate.sort((a, b) => a - b)
    player.config.playbackRate.forEach((item, index) => {
      if(player.config.defaultPlaybackRate && player.config.defaultPlaybackRate === item) {
        selected = index
        selectedSpeed = item
        player.once('playing', () => { player.video.playbackRate = item})
      } else if (item === 1 || item === '1') {
        selected = index
      }
      rateTpl.push(`${item}x`)
    })
  } else {
    return false
  }
  let tipsSpeed = player.config.lang && player.config.lang === 'zh-cn' ? '倍速' : 'Speed'
  let ul = util.createDom('xg-playback', `<p class='name'><span>${selectedSpeed}x</span></p>`, {}, 'xgplayer-playback')
  let root = player.controls
  let tips = util.createDom('xg-tips', tipsSpeed, {}, 'xgplayer-tips')
  ul.appendChild(tips)
  root.appendChild(ul);
  ['touchstart', 'click'].forEach(item => {
    ul.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let p = e.target || e.srcElement
      if (p && (p.tagName.toLocaleLowerCase() === 'p' || p.tagName.toLocaleLowerCase() === 'span')) {
        selected = selected + 1 === rateTpl.length ? 0 : selected + 1
        ul.querySelector('p').innerHTML = `<span>${rateTpl[selected]}</span>`
        player.video.playbackRate = rateTpl[selected].replace(/x$/g, '') * 1
      }
    }, false)
  })

  ul.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = player.root.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  })
}

Player.install('playbackRate', playbackRate)
