import { addClass, removeClass, event } from '../utils/util'
import sniffer from '../utils/sniffer'

let volume = function () {
  let player = this
  let root = player.root
  let container, slider, bar, selected
  function onCanplay () {
    // player.volume = sniffer.device === 'mobile' ? 1 : player.config.volume
    if(!player.controls) return
    player.volume = player.config.volume
    container = player.controls.querySelector('.xgplayer-volume')
    if(!container) return
    slider = container.querySelector('.xgplayer-slider')
    bar = container.querySelector('.xgplayer-bar')
    selected = container.querySelector('.xgplayer-drag')
    if (sniffer.device === 'mobile') {
      onVolumeChange()
    }
  }
  player.once('canplay', onCanplay)

  function onVolumeBarClick (e) {
    if(!slider) return
    player.video.muted = false
    slider.focus()
    event(e)

    let barRect = bar.getBoundingClientRect()
    let pos = {x: e.clientX, y: e.clientY}
    let height = selected.getBoundingClientRect().height
    let isMove = false
    let onMove = function (e) {
      e.preventDefault()
      e.stopPropagation()
      event(e)
      isMove = true
      let w = height - e.clientY + pos.y
      let now = w / barRect.height
      selected.style.height = `${w}px`
      player.volume = Math.max(Math.min(now, 1), 0)
    }
    let onUp = function (e) {
      e.preventDefault()
      e.stopPropagation()
      event(e)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)

      if (!isMove) {
        let w = barRect.height - (e.clientY - barRect.top)
        let now = w / barRect.height
        selected.style.height = `${w}px`
        if (now <= 0) {
          if (player.volume > 0) {
            selected.volume = player.video.volume
          } else {
            now = selected.volume
          }
        }
        player.volume = Math.max(Math.min(now, 1), 0)
      }
      slider.volume = player.volume
      isMove = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return false
  }
  player.on('volumeBarClick', onVolumeBarClick)

  function onVolumeIconClick () {
    if (sniffer.device === 'mobile') {
      if (player.video.muted) {
        player.video.muted = false
        player.emit('unmute')
        player.volume = 1
      } else {
        player.video.muted = true
        player.emit('mute')
        player.volume = 0
      }
    } else {
      if(!slider) return
      player.video.muted = false
      if (player.volume < 0.1) {
        if (slider.volume < 0.1) {
          player.volume = 0.6
        } else {
          player.volume = slider.volume
        }
        player.emit('unmute')
      } else {
        player.volume = 0
        player.emit('mute')
      }
    }
    // onVolumeChange ()
  }
  player.on('volumeIconClick', onVolumeIconClick)

  function onVolumeIconEnter () {
    addClass(root, 'xgplayer-volume-active')
    if (container) {
      container.focus()
    }
  }
  player.on('volumeIconEnter', onVolumeIconEnter)

  function onVolumeIconLeave () {
    removeClass(root, 'xgplayer-volume-active')
  }
  player.on('volumeIconLeave', onVolumeIconLeave)

  let _changeTimer = null
  function onVolumeChange () {
    if (_changeTimer) {
      clearTimeout(_changeTimer)
    }
    _changeTimer = setTimeout(() => {
      if (sniffer.device === 'mobile') {
        removeClass(root, 'xgplayer-volume-muted')
        removeClass(root, 'xgplayer-volume-large')
        if (player.video.muted || player.video.defaultMuted) {
          if (!player.video.muted) {
            player.video.muted = true
          }
          player.video.defaultMuted = false
          addClass(root, 'xgplayer-volume-muted')
        } else {
          addClass(root, 'xgplayer-volume-large')
        }
      } else {
        removeClass(root, 'xgplayer-volume-muted')
        removeClass(root, 'xgplayer-volume-small')
        removeClass(root, 'xgplayer-volume-large')
        if (player.volume === 0) {
          addClass(root, 'xgplayer-volume-muted')
        } else if (player.volume < 0.5) {
          addClass(root, 'xgplayer-volume-small')
        } else {
          addClass(root, 'xgplayer-volume-large')
        }
        if (!bar) return
        let containerHeight = bar.getBoundingClientRect().height || 76
        selected.style.height = `${player.volume * containerHeight}px`
      }
    }, 50)
  }
  player.on('volumechange', onVolumeChange)

  function onDestroy () {
    player.off('canplay', onCanplay)
    player.off('volumeBarClick', onVolumeBarClick)
    player.off('volumeIconClick', onVolumeIconClick)
    player.off('volumeIconEnter', onVolumeIconEnter)
    player.off('volumeIconLeave', onVolumeIconLeave)
    player.off('volumechange', onVolumeChange)
    player.off('destroy', onDestroy)
    if (_changeTimer) {
      clearTimeout(_changeTimer);
      _changeTimer = null;
    }
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'volume',
  method: volume
}