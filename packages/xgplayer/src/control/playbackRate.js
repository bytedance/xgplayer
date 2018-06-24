import Player from '../player'

let playbackRate = function () {
  let player = this; let util = Player.util
  let rateTpl = []
  if (player.config.playbackRate) {
    player.config.playbackRate.sort((a, b) => b - a)
    player.config.playbackRate.forEach(item => {
      rateTpl.push(`<li>${item}x</li>`)
    })
  } else {
    return false
  }
  let ul = util.createDom('xg-playback', `<p>1x</p><ul>${rateTpl.join('')}</ul>`, {}, 'xgplayer-playback'); let root = player.controls
  root.appendChild(ul);
  ['touchstart', 'click'].forEach(item => {
    ul.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let li = e.target || e.srcElement
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          util.removeClass(item, 'active')
        })
        util.addClass(li, 'active')
        ul.querySelector('p').textContent = li.textContent
        player.video.playbackRate = li.textContent.replace(/x$/g, '') * 1
      }
    }, false)
  })

  player.once('destroy', () => {
    ul = null
  })
}

Player.install('playbackRate', playbackRate)
