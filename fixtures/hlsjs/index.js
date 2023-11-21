import Player from '../../packages/xgplayer/src'
import HlsJsPlugin from '../../packages/xgplayer-hls.js/src'

localStorage.setItem('xgd', 1)
function defaultOpt() {
  return {
    isLive: true,
    autoplay: false,
    autoplayMuted: false,
    retryTimes: 3,
    retryCount: 3,
    retryDelay: 1000,
    analyzeDuration: 5000,
    loadTimeout: 10000,
    bufferBehind: 10,
    maxJumpDistance: 3,
    maxReaderInterval: 5000,
    seamlesslyReload: false
  }
}
var cachedOpt = localStorage.getItem('xg:test:hlsjs:opt')
try {
  cachedOpt = JSON.parse(cachedOpt)
} catch (error) {
  cachedOpt = undefined
}
var opts = Object.assign(
  {
    url: 'http://127.0.0.1:8081/fixtures/hlsjs/video/0001-4kcountry-road.m3u8'
  },
  defaultOpt(),
  cachedOpt
)
var testPoint = Number(localStorage.getItem('xg:test:hlsjs:point'))

if (isNaN(testPoint)) testPoint = 0

window.onload = function () {
  var dlEvent = document.getElementById('event')
  var dlError = document.getElementById('error')
  var dlLogPause = document.getElementById('log-pause')

  function inp(d) {
    return d.getElementsByTagName('input')[0]
  }

  var player


  function initPlayer() {
    if (player) {
      player.destroy()
      setTimeout(init, 100)
    } else {
      init()
    }
    function init() {
      window.player = player = new Player({
        el: document.getElementById('player'),
        plugins: [HlsJsPlugin],
        url: opts.url,
        isLive: opts.isLive,
        autoplay: opts.autoplay,
        autoplayMuted: opts.autoplayMuted,
      })
      dlEvent.innerHTML = ''
      dlError.innerHTML = ''

      function pushEvent(name, value, container) {
        container = container || dlEvent
        if (container === dlEvent && dlLogPause.checked) return
        console.debug('[test]', name, value)
        if (container === dlEvent) {
          return
        }
        try {
          value = JSON.stringify(value)
        } catch (error) {}
        var record = document.createElement('div')
        record.innerHTML =
          '<div class="mb-2"><span class="text-base pr-2 bg-green-500 text-white">' +
          name +
          ' / ' +
          player.video.currentTime +
          '</span>' +
          value +
          '</div>'
        container.prepend(record)
      }

      player.on('loadstart', function (event) {
        pushEvent('loadstart', event)
      })
      player.on('loadeddata', function (event) {
        pushEvent('loadeddata', event)
      })
      player.on('play', function (event) {
        pushEvent('play', event)
      })
      player.on('pause', function (event) {
        pushEvent('pause', event)
      })
      player.on('ended', function (event) {
        pushEvent('ended', event)
      })
      player.on('autoplay_was_prevented', function (event) {
        pushEvent('autoplay_was_prevented', event)
      })
      player.on('playing', function (event) {
        pushEvent('playing', event)
      })
      player.on('seeking', function (event) {
        pushEvent('seeking', event)
      })
      player.on('seeked', function (event) {
        pushEvent('seeked', event)
      })
      player.on('waiting', function (event) {
        pushEvent('waiting', event)
      })
      player.on('canplay', function (event) {
        pushEvent('canplay', event)
      })
      player.on('durationchange', function (event) {
        pushEvent('durationchange', event)
      })
      player.on('ready', function (event) {
        pushEvent('ready', event)
      })
      player.on('complete', function (event) {
        pushEvent('complete', event)
      })
      player.on('urlchange', function (event) {
        pushEvent('urlchange', event)
      })
      player.on('destroy', function (event) {
        pushEvent('destroy', event)
      })
      player.on('replay', function (event) {
        pushEvent('replay', event)
      })
      player.on('retry', function (event) {
        pushEvent('retry', event)
      })
      player.on('core_event', function (event) {
        pushEvent(event.eventName, event)
      })
      player.on('error', function (event) {
        pushEvent(event.errorType, event, dlError)
      })
    }
  }

  initPlayer()
}
