import Player from '../player'

const playNext = function () {
  let player = this
  const util = Player.util
  const controlEl = player.controls
  let nextBtn = player.config.playNext
  let index = -1
  if (nextBtn && nextBtn.urlList) {
    let next
    if (nextBtn.type === 'img') {
      next = Player.util.createImgBtn('playNext', nextBtn.url, nextBtn.width, nextBtn.height)
    } else {
      next = util.createDom('xg-playNext', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                <path transform="scale(0.025 0.025)"
                d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>
            </svg></xg-icon>`, {}, 'xgplayer-playNext')
    }
    controlEl.appendChild(next)
    const ev = ['click', 'touchend']
    ev.forEach(item => {
      next.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        if(index + 1 < nextBtn.urlList.length) {
          index++
          player.video.pause()
          player.currentTime = 0
          player.video.autoplay = true
          player.src = nextBtn.urlList[index]
          player.emit('playerNext', index+1)
        } else {
          player.emit('urlList last')
        }
      }, false)
    })
  }
}

Player.install('playNext', playNext)
