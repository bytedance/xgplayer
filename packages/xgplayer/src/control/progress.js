import Player from '../player'

let progress = function () {
  let player = this; let util = Player.util
  let container = util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer"><xg-cache class="xgplayer-progress-cache"></xg-cache><xg-played class="xgplayer-progress-played"></xgplayer-played><xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point></xg-outer>', {tabindex: 1}, 'xgplayer-progress'); let root = player.controls; let containerWidth
  root.appendChild(container)
  let progress = container.querySelector('.xgplayer-progress-played')
  let cache = container.querySelector('.xgplayer-progress-cache')
  let point = container.querySelector('.xgplayer-progress-point');
  ['touchstart', 'mousedown'].forEach(item => {
    container.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      util.event(e)
      if (e._target === point || player.ended) {
        return false
      }
      container.focus()
      containerWidth = container.getBoundingClientRect().width
      let {left} = progress.getBoundingClientRect(); let isMove = false
      let move = function (e) {
        e.preventDefault()
        e.stopPropagation()
        util.event(e)
        isMove = true
        let w = e.clientX - left
        let now = w / containerWidth * player.duration
        progress.style.width = `${w * 100 / containerWidth}%`
        player.currentTime = Number(now).toFixed(1)
      }
      let up = function (e) {
        e.preventDefault()
        e.stopPropagation()
        util.event(e)
        window.removeEventListener('mousemove', move)
        window.removeEventListener('touchmove', move)
        window.removeEventListener('mouseup', up)
        window.removeEventListener('touchend', up)
        container.blur()
        if (!isMove) {
          let w = e.clientX - left
          let now = w / containerWidth * player.duration
          progress.style.width = `${w * 100 / containerWidth}%`
          player.currentTime = Number(now).toFixed(1)
        }
        isMove = false
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('touchmove', move)
      window.addEventListener('mouseup', up)
      window.addEventListener('touchend', up)
      return false
    })
  })

  container.addEventListener('mouseenter', function (e) {
    if (player.ended) { return false }
    let containerLeft = container.getBoundingClientRect().left
    let containerWidth = container.getBoundingClientRect().width
    let compute = function (e) {
      let now = (e.clientX - containerLeft) / containerWidth * player.duration
      point.textContent = util.format(now)
      point.style.left = `${e.clientX - containerLeft - 15}px`
      point.style.display = 'block'
    }
    let move = function (e) {
      compute(e)
    }
    let leave = function (e) {
      container.removeEventListener('mousemove', move, false)
      container.removeEventListener('mouseleave', leave, false)
      compute(e)
      point.style.display = 'none'
    }
    container.addEventListener('mousemove', move, false)
    container.addEventListener('mouseleave', leave, false)
    compute(e)
  }, false)

  player.on('timeupdate', function () {
    if (!containerWidth) {
      containerWidth = container.getBoundingClientRect().width
    }
    progress.style.width = `${player.currentTime * 100 / player.duration}%`
  });
  ['cacheupdate', 'ended', 'timeupdate'].forEach(item => {
    player.on(item, function () {
      let buffered = player.buffered
      if (buffered && buffered.length > 0) {
        let end = buffered.end(buffered.length - 1)
        cache.style.width = `${end / player.duration * 100}%`
      }
    })
  })
  player.once('destroy', () => {
    container = null
    progress = null
    point = null
    cache = null
  })
}

Player.install('progress', progress)
