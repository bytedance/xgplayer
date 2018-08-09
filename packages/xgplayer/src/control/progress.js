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
  let tnail_pic_num = 0, tnail_width = 0, tnail_height = 0, tnail_col = 0, tnail_row = 0, interval = 0, tnail_urls = []
  if (player.config.thumbnail) {
    tnail_pic_num = player.config.thumbnail.pic_num
    tnail_width = player.config.thumbnail.width
    tnail_height = player.config.thumbnail.height
    tnail_col = player.config.thumbnail.col
    tnail_row = player.config.thumbnail.row
    tnail_urls = player.config.thumbnail.urls
    thumbnail.style.width = `${tnail_width}px`
    thumbnail.style.height = `${tnail_height}px`
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
      let isMove = false
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
        interval = player.duration / tnail_pic_num
        let index = Math.floor(now / interval)
        thumbnail.style.backgroundImage = `url(${tnail_urls[Math.ceil((index + 1) / (tnail_col * tnail_row)) - 1]})`
        let index_in_page = index + 1 - (tnail_col * tnail_row) * (Math.ceil((index + 1) / (tnail_col * tnail_row)) - 1)
        let tnai_row_index = Math.ceil(index_in_page / tnail_row) - 1
        let tnai_col_index = index_in_page - tnai_row_index * tnail_row - 1
        thumbnail.style['background-position'] = `-${tnai_col_index * tnail_width}px -${tnai_row_index * tnail_height}px`
        let left = e.clientX - containerLeft - tnail_width / 2
        left = left > 0 ? left : 0
        left = left < containerWidth - tnail_width ? left : containerWidth - tnail_width
        thumbnail.style.left = `${left}px`
        thumbnail.style.top = `${-10 - tnail_height}px`
        thumbnail.style.display = 'block'
        point.style.left = `${left + tnail_width / 2 - pointWidth / 2}px`
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
    progress.style.width = `${player.currentTime * 100 / player.duration}%`
  }
  player.on('timeupdate', handleTimeUpdate)

  const handleCacheUpdate = function () {
    let buffered = player.buffered
    if (buffered && buffered.length > 0) {
      let end = buffered.end(buffered.length - 1)
      cache.style.width = `${end / player.duration * 100}%`
    }
  }
  const cacheUpdateEvents = ['cacheupdate', 'ended', 'timeupdate']
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
