import Player from '../player'

let progress
progress = function () {
  let player = this
  let util = Player.util
  let container = util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer"><xg-cache class="xgplayer-progress-cache"></xg-cache><xg-played class="xgplayer-progress-played"></xgplayer-played><xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point><xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail></xg-outer>', {tabindex: 1}, 'xgplayer-progress')
  let root = player.controls
  let containerWidth
  root.appendChild(container)
  let progress = container.querySelector('.xgplayer-progress-played')
  let cache = container.querySelector('.xgplayer-progress-cache')
  let point = container.querySelector('.xgplayer-progress-point')
  let thumbnail = container.querySelector('.xgplayer-progress-thumbnail')
  let tnailPicNum = 0
  let tnailWidth = 0
  let tnailHeight = 0
  let tnailCol = 0
  let tnailRow = 0
  let interval = 0
  let tnailUrls = []
  if (player.config.thumbnail) {
    tnailPicNum = player.config.thumbnail.pic_num
    tnailWidth = player.config.thumbnail.width
    tnailHeight = player.config.thumbnail.height
    tnailCol = player.config.thumbnail.col
    tnailRow = player.config.thumbnail.row
    tnailUrls = player.config.thumbnail.urls
    thumbnail.style.width = `${tnailWidth}px`
    thumbnail.style.height = `${tnailHeight}px`
  }
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
      let {left} = progress.getBoundingClientRect()
      // let isMove = false
      let move = function (e) {
        e.preventDefault()
        e.stopPropagation()
        util.event(e)
        player.isProgressMoving = true
        let w = e.clientX - left > containerWidth ? containerWidth : e.clientX - left
        let now = w / containerWidth * player.duration
        progress.style.width = `${w * 100 / containerWidth}%`
        if (player.videoConfig.mediaType === 'video' && !player.dash) {
          player.currentTime = Number(now).toFixed(1)
        } else {
          let time = util.findDom(root, '.xgplayer-time')
          if (time) {
            time.innerHTML = `<span>${util.format(now || 0)}</span><em>${util.format(player.duration)}`
          }
        }
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
        if (!player.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash) {
          let w = e.clientX - left
          let now = w / containerWidth * player.duration
          progress.style.width = `${w * 100 / containerWidth}%`
          player.currentTime = Number(now).toFixed(1)
        }
        player.isProgressMoving = false
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('touchmove', move)
      window.addEventListener('mouseup', up)
      window.addEventListener('touchend', up)
      return false
    })
  })

  container.addEventListener('mouseenter', function (e) {
    if (player.ended) {
      return false
    }
    let containerLeft = container.getBoundingClientRect().left
    let containerWidth = container.getBoundingClientRect().width
    let compute = function (e) {
      let now = (e.clientX - containerLeft) / containerWidth * player.duration
      point.textContent = util.format(now)
      let pointWidth = point.getBoundingClientRect().width
      if (player.config.thumbnail) {
        interval = player.duration / tnailPicNum
        let index = Math.floor(now / interval)
        thumbnail.style.backgroundImage = `url(${tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1]})`
        let indexInPage = index + 1 - (tnailCol * tnailRow) * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1)
        let tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1
        let tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1
        thumbnail.style['background-position'] = `-${tnaiColIndex * tnailWidth}px -${tnaiRowIndex * tnailHeight}px`
        let left = e.clientX - containerLeft - tnailWidth / 2
        left = left > 0 ? left : 0
        left = left < containerWidth - tnailWidth ? left : containerWidth - tnailWidth
        thumbnail.style.left = `${left}px`
        thumbnail.style.top = `${-10 - tnailHeight}px`
        thumbnail.style.display = 'block'
        point.style.left = `${left + tnailWidth / 2 - pointWidth / 2}px`
      } else {
        let left = e.clientX - containerLeft - pointWidth / 2
        left = left > 0 ? left : 0
        left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left
        point.style.left = `${left}px`
      }
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
      thumbnail.style.display = 'none'
    }
    container.addEventListener('mousemove', move, false)
    container.addEventListener('mouseleave', leave, false)
    compute(e)
  }, false)
  const handleTimeUpdate = function () {
    if (!containerWidth && container) {
      containerWidth = container.getBoundingClientRect().width
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      progress.style.width = `${player.currentTime * 100 / player.duration}%`
    }
  }
  player.on('timeupdate', handleTimeUpdate)

  const handleCacheUpdate = function () {
    let buffered = player.buffered
    if (buffered && buffered.length > 0) {
      let end = buffered.end(buffered.length - 1)
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
          end = buffered.end(i)
          for (let j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1)
              break
            }
          }
          break
        }
      }
      cache.style.width = `${end / player.duration * 100}%`
    }
  }
  const cacheUpdateEvents = ['bufferedChange', 'cacheupdate', 'ended', 'timeupdate']
  cacheUpdateEvents.forEach(item => {
    player.on(item, handleCacheUpdate)
  })
  player.once('destroy', () => {
    cacheUpdateEvents.forEach(item => {
      player.off(item, handleCacheUpdate)
    })
    player.off('timeupdate', handleTimeUpdate)
    container = null
    progress = null
    point = null
    thumbnail = null
    cache = null
  })
}

Player.install('progress', progress)
