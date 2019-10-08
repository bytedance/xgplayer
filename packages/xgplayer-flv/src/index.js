import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './Flv'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

const isEnded = (player, flv) => {
  if (!player.config.isLive) {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        player.emit('ended')
      }
    }
  }
}

const flvPlayer = function () {
  let player = this

  const context = new Context(flvAllowedEvents)
  const preloadTime = player.config.preloadTime || 15
  const _start = player.start
  let flv

  player.start = function (url = player.config.url) {
    if (!url) { return }

    flv = context.registry('FLV_CONTROLLER', FLV)(player)
    player.flv = flv
    context.init()

    _start.call(player, flv.mse.url)

    initSrcChangeHandler()
  }

  const initSrcChangeHandler = () => {
    Object.defineProperty(player, 'src', {
      get () {
        return player.currentSrc
      },
      set (url) {
        player.config.url = url
        if (!player.paused) {
          player.pause()
          player.once('pause', () => {
            player.start(url)
          })
          player.once('canplay', () => {
            player.play()
          })
        } else {
          player.start(url)
        }
        player.once('canplay', () => {
          player.currentTime = 0
        })
      },
      configurable: true
    })
  }

  const loadData = (time = player.currentTime) => {
    const range = player.getBufferedRange()
    if (range[1] - time < preloadTime - 5) {
      flv.loadNext(range[1] + 1)
    }
  }

  player.on('timeupdate', () => {
    loadData()
    isEnded(player, flv)
  })

  player.on('seeking', () => {
    const time = player.currentTime
    const range = player.getBufferedRange()
    if (time > range[1] || time < range[0]) {
      flv.seek(player.currentTime)
    }
  })

  player.once('destroy', () => {
    flv.destroy()
  })
}

Player.install('flvplayer', flvPlayer)
