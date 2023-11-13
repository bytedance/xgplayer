import { createDom, addClass, removeClass, hasClass, toggleClass, typeOf, event, format, findDom } from '../../utils/util'
import sniffer from '../../utils/sniffer'
import '../style/controls/progress.scss'

const isRotateFullscreen = (player) => {
  return hasClass(player.root, 'xgplayer-rotate-fullscreen')
}

let s_progress = function () {
  let player = this
  let container = createDom('xg-progress', `<xg-outer class="xgplayer-progress-outer">
                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>
                                                   <xg-played class="xgplayer-progress-played">
                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>
                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>
                                                   </xg-played>
                                                 </xg-outer>`, {tabindex: 1}, 'xgplayer-progress')
  let containerWidth
  player.controls.appendChild(container)
  let progress = container.querySelector('.xgplayer-progress-played')
  let outer = container.querySelector('.xgplayer-progress-outer')
  let cache = container.querySelector('.xgplayer-progress-cache')
  let point = container.querySelector('.xgplayer-progress-point')
  let thumbnail = container.querySelector('.xgplayer-progress-thumbnail')
  player.dotArr = {}
  function dotEvent (dotItem, text) {
    dotItem.addEventListener('mouseenter', function (e) {
      if (text) {
        addClass(dotItem, 'xgplayer-progress-dot-show')
        addClass(container, 'xgplayer-progress-dot-active')
      }
    })
    dotItem.addEventListener('mouseleave', function (e) {
      if (text) {
        removeClass(dotItem, 'xgplayer-progress-dot-show')
        removeClass(container, 'xgplayer-progress-dot-active')
      }
    })
    dotItem.addEventListener('touchend', function (e) {
      // e.preventDefault()
      e.stopPropagation()
      if (text) {
        if (!hasClass(dotItem, 'xgplayer-progress-dot-show')) {
          Object.keys(player.dotArr).forEach(function (key) {
            if (player.dotArr[key]) {
              removeClass(player.dotArr[key], 'xgplayer-progress-dot-show')
            }
          })
        }
        toggleClass(dotItem, 'xgplayer-progress-dot-show')
        toggleClass(container, 'xgplayer-progress-dot-active')
      }
    })
  }
  function onCanplay () {
    if (player.config.progressDot && typeOf(player.config.progressDot) === 'Array') {
      player.config.progressDot.forEach(item => {
        if (item.time >= 0 && item.time <= player.duration) {
          let dot = createDom('xg-progress-dot', item.text ? `<span class="xgplayer-progress-tip">${item.text}</span>` : '', {}, 'xgplayer-progress-dot')
          dot.style.left = (item.time / player.duration) * 100 + '%'
          if (item.duration >= 0) {
            dot.style.width = (Math.min(item.duration, player.duration - item.time) / player.duration) * 100 + '%'
          }
          if(item.style) {
            for(let k in item.style) {
              dot.style[k] = item.style[k]
            }
          }
          outer.appendChild(dot)
          player.dotArr[item.time] = dot
          dotEvent(dot, item.text)
        }
      })
    }
  }
  player.once('canplay', onCanplay)
  player.addProgressDot = function (time, text, duration, style) {
    if (player.dotArr[time]) {
      return
    }
    if (time >= 0 && time <= player.duration) {
      let dot = createDom('xg-progress-dot', text ? `<span class="xgplayer-progress-tip">${text}</span>` : '', {}, 'xgplayer-progress-dot')
      dot.style.left = (time / player.duration) * 100 + '%'
      if (duration >= 0) {
        dot.style.width = (Math.min(duration, player.duration - time) / player.duration) * 100 + '%'
      }
      if(style) {
        for(let k in style) {
          dot.style[k] = style[k]
        }
      }
      outer.appendChild(dot)
      player.dotArr[time] = dot
      dotEvent(dot, text)
    }
  }
  player.removeProgressDot = function (time) {
    if (time >= 0 && time <= player.duration && player.dotArr[time]) {
      let dot = player.dotArr[time]
      dot.parentNode.removeChild(dot)
      dot = null
      player.dotArr[time] = null
    }
  }
  player.removeAllProgressDot = function () {
    Object.keys(player.dotArr).forEach(function (key) {
      if (player.dotArr[key]) {
        let dot = player.dotArr[key]
        dot.parentNode.removeChild(dot)
        dot = null
        player.dotArr[key] = null
      }
    })
  }
  let tnailPicNum = 0
  let tnailWidth = 0
  let tnailHeight = 0
  let tnailCol = 0
  let tnailRow = 0
  let interval = 0
  let tnailUrls = []
  let coverPreviewContainer, coverPreviewPoint, coverPreviewOuter
  let onLoadedmetadata = function() {
    if (player.config.thumbnail) {
      if(player.config.thumbnail.isShowCoverPreview && !coverPreviewContainer) {
        progress.removeChild(thumbnail)
        coverPreviewContainer = createDom('xg-coverpreview', `<xg-outer class="xgplayer-coverpreview-outer">
            <xg-thumbnail class="xgplayer-coverpreview-thumbnail"></xg-thumbnail>
            <xg-point class="xgplayer-coverpreview-point"></xg-point>
          </xg-outer>`, {tabindex: 1}, 'xgplayer-coverpreview')
        coverPreviewOuter = coverPreviewContainer.querySelector('.xgplayer-coverpreview-outer')
        coverPreviewPoint = coverPreviewContainer.querySelector('.xgplayer-coverpreview-point')
        thumbnail = coverPreviewContainer.querySelector('.xgplayer-coverpreview-thumbnail')
        player.root.appendChild(coverPreviewContainer)
      }
      tnailPicNum = player.config.thumbnail.pic_num
      tnailWidth = player.config.thumbnail.width
      tnailHeight = player.config.thumbnail.height
      tnailCol = player.config.thumbnail.col
      tnailRow = player.config.thumbnail.row
      tnailUrls = player.config.thumbnail.urls
      thumbnail.style.width = `${tnailWidth}px`
      thumbnail.style.height = `${tnailHeight}px`
    };
  };
  player.on('loadedmetadata', onLoadedmetadata);

  if (typeof player.config.disableSwipeHandler === 'function' && typeof player.config.enableSwipeHandler === 'function') {
    player.root.addEventListener('touchmove', e => {
      e.preventDefault();
      // e.stopPropagation();
      if (!player.disableSwipe) {
        player.disableSwipe = true
        player.config.disableSwipeHandler.call(player);
      }
    });
    player.root.addEventListener('touchstart', e => {
      // e.preventDefault();
      player.disableSwipe = true
      player.config.disableSwipeHandler.call(player);
    });
    player.root.addEventListener('touchend', e => {
      // e.preventDefault();
      player.disableSwipe = false
      player.config.enableSwipeHandler.call(player);
    });
  };
  let events = ['touchstart', 'mousedown'];
  if (sniffer.device === 'mobile') {
    // 解决在移动端触发多次seeking问题
    events.pop()
  }

  let move = null
  let up = null
  let down = function (e) {
    if (player.config.disableProgress) return;
    // e.preventDefault()
    e.stopPropagation()
    event(e)
    if (e._target === point || (!player.config.allowSeekAfterEnded && player.ended)) {
      return true
    }

    container.focus()
    let {left} = progress.getBoundingClientRect()

    const isRotate = isRotateFullscreen(player)
    if (isRotate) {
      left = progress.getBoundingClientRect().top
      containerWidth = container.getBoundingClientRect().height
    } else {
      containerWidth = container.getBoundingClientRect().width
      left = progress.getBoundingClientRect().left
    }

    move = function (e) {
      // e.preventDefault()
      e.stopPropagation()
      event(e)
      player.isProgressMoving = true
      let w = (isRotate ? e.clientY : e.clientX) - left
      if (w > containerWidth) {
        w = containerWidth
      }
      let now = w / containerWidth * player.duration
      if(now < 0) now = 0
      if(player.config.allowSeekPlayed && (Number(now).toFixed(1) > player.maxPlayedTime)) {}
      else {
        progress.style.width = `${w * 100 / containerWidth}%`

        if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
          console.log('trigger touchmove')
          player.currentTime = Number(now).toFixed(1)
        } else {
          let time = findDom(player.controls, '.xgplayer-time')
          if (time) {
            time.innerHTML = `<span class="xgplayer-time-current">${format(now || 0)}</span><span>${format(player.duration)}</span>`
          }
        }
      }

      if(player.config.thumbnail && player.config.thumbnail.isShowCoverPreview) {
        coverPreviewPoint.innerHTML = `<span>${format(now)}</span> / ${format(player.duration || 0)}`

        interval = player.duration / tnailPicNum
        let index = Math.floor(now / interval)
        thumbnail.style.backgroundImage = `url(${tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1]})`
        let indexInPage = index + 1 - (tnailCol * tnailRow) * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1)
        let tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1
        let tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1
        thumbnail.style['background-position'] = `-${tnaiColIndex * tnailWidth}px -${tnaiRowIndex * tnailHeight}px`
        coverPreviewContainer.style.display = 'block'
      }
      
      player.emit('focus')
    }
    up = function (e) {
      console.log('up event', e)
      // e.preventDefault()
      e.stopPropagation()
      event(e)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move, { passive: false })
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
      if(sniffer.browser.indexOf('ie') < 0) {
        container.blur()
      }
      if (!player.isProgressMoving || (player.videoConfig && player.videoConfig.mediaType === 'audio') || player.dash || player.config.closeMoveSeek) {
        let w = (isRotate ? e.clientY : e.clientX) - left
        if (w > containerWidth) {
          w = containerWidth
        }
        let now = w / containerWidth * player.duration
        if(now < 0) now = 0
        if(player.config.allowSeekPlayed && (Number(now).toFixed(1) > player.maxPlayedTime)) {}
        else {
          progress.style.width = `${w * 100 / containerWidth}%`
          console.warn('trigger touchup')
          player.currentTime = Number(now).toFixed(1)
        }
      }
      if(player.config.thumbnail && player.config.thumbnail.isShowCoverPreview) {
        coverPreviewContainer.style.display = 'none'
      }
      player.emit('focus')
      player.isProgressMoving = false
    }
    // if (item === 'touchstart') {
      window.addEventListener('touchmove', move, { passive: false })
      window.addEventListener('touchend', up)
    // } else {
      window.addEventListener('mousemove', move)
      // console.warn('add envent mouseup')
      window.addEventListener('mouseup', up)
    // }
    return true
  }
  events.forEach(item => {
    container.addEventListener(item, down)
  })

  const onMouseEnter = function (e) {
    if (!player.config.allowSeekAfterEnded && player.ended) {
      return true
    }
    const isRotate = isRotateFullscreen(player)
    let containerLeft = isRotate ? container.getBoundingClientRect().top : container.getBoundingClientRect().left
    let containerWidth = isRotate ? container.getBoundingClientRect().height : container.getBoundingClientRect().width

    let compute = function (e) {
      let now = ((isRotate ? e.clientY : e.clientX) - containerLeft) / containerWidth * player.duration
      now = now < 0 ? 0 : now
      point.textContent = format(now)
      let pointWidth = point.getBoundingClientRect().width
      if (player.config.thumbnail && !player.config.thumbnail.isShowCoverPreview) {
        interval = player.duration / tnailPicNum
        let index = Math.floor(now / interval)
        thumbnail.style.backgroundImage = `url(${tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1]})`
        let indexInPage = index + 1 - (tnailCol * tnailRow) * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1)
        let tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1
        let tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1
        thumbnail.style['background-position'] = `-${tnaiColIndex * tnailWidth}px -${tnaiRowIndex * tnailHeight}px`
        let left = (isRotate ? e.clientY : e.clientX) - containerLeft - tnailWidth / 2
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
      if (hasClass(container, 'xgplayer-progress-dot-active')) {
        point.style.display = 'none'
      } else {
        point.style.display = 'block'
      }
    }
    let move = function (e) {
      compute(e)
    }
    let leave = function (e) {
      container.removeEventListener('mousemove', move, false)
      container.removeEventListener('mouseleave', leave, false)
      compute(e)
      point.style.display = 'none'
      if (player.config.thumbnail && !player.config.thumbnail.isShowCoverPreview) {
        thumbnail.style.display = 'none'
      }
    }
    container.addEventListener('mousemove', move, false)
    container.addEventListener('mouseleave', leave, false)
    compute(e)
  }
  container.addEventListener('mouseenter', onMouseEnter, false)

  // let lastBtnLeft = false
  let onTimeupdate = function () {
    if(player.maxPlayedTime === undefined) player.maxPlayedTime = 0
    if(player.maxPlayedTime < player.currentTime) player.maxPlayedTime = player.currentTime
    if (!containerWidth && container) {
      containerWidth = container.getBoundingClientRect().width
    }
    if (!player.isProgressMoving && !player.isSeeking && !player.seeking) {
      const precent = player.currentTime / player.duration
      const prevPrecent = Number(progress.style.width.replace('%', '') || '0') / Number(container.style.width || '100');
      if (Math.abs(precent - prevPrecent) <= 1) {
        progress.style.width = `${player.currentTime * 100 / player.duration}%`
      }
    }
  }
  player.on('timeupdate', onTimeupdate)

  let onCurrentTimeChange = function (time) {
    progress.style.width = `${time * 100 / player.duration}%`
  }
  player.on('currentTimeChange', onCurrentTimeChange)

  let onSrcChange = function () {
    progress.style.width = '0%'
  }
  player.on('srcChange', onSrcChange)

  let onCacheUpdate = function () {
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
    player.on(item, onCacheUpdate)
  })

  function destroyFunc () {
    player.removeAllProgressDot()
    player.off('canplay', onCanplay)
    player.off('timeupdate', onTimeupdate)
    player.off('currentTimeChange', onCurrentTimeChange)
    player.off('srcChange', onSrcChange)
    player.off('loadedmetadata', onLoadedmetadata);
    container.removeEventListener('mouseenter', onMouseEnter, false)
    events.forEach(item => {
      container.removeEventListener(item, down)
    })
    window.removeEventListener('mousemove', move)
    window.removeEventListener('touchmove', move, { passive: false })
    window.removeEventListener('mouseup', up)
    window.removeEventListener('touchend', up)
    cacheUpdateEvents.forEach(item => {
      player.off(item, onCacheUpdate)
    })
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

export default {
  name: 's_progress',
  method: s_progress
}