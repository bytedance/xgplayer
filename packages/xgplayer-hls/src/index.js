import Player from 'xgplayer'
import HLS from './hls'
import MSE from './media/mse'

const isEnded = (player, hls) => {
  if (hls.type === 'vod') {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        player.mse.endOfStream()
      }
    }
  }
}

const hlsplayer = function () {
  let player = this

  let sniffer = Player.sniffer

  let util = Player.util
  const preloadTime = player.config.preloadTime || 15
  if (['chrome', 'firfox', 'safari'].some(item => item === sniffer.browser) && MSE.isSupported('video/mp4; codecs="avc1.64001E, mp4a.40.5"')) {
    const _start = player.start
    let hls
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
      }
    })
    player.start = function (url = player.config.url) {
      if (!url) { return }
      hls = new HLS(url)
      player.mse = hls.mse
      player.hls = hls
      player.download = () => {
        hls.download()
      }
      hls.m3u8.once('ready', () => {
        if (hls.type === 'live') {
          util.addClass(player.root, 'xgplayer-is-live')
          const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
          player.controls.appendChild(live)
          const timer = setInterval(() => {
            if (player.paused && player.buffered.length) {
              for (let i = 0, len = player.buffered.length; i < len; i++) {
                if (player.buffered.start(i) > player.currentTime) {
                  player.currentTime = player.buffered.start(i)
                  clearInterval(timer)
                  break
                }
              }
            }
          }, 200)
        } else {
          clearTimeout(hls.m3u8.timer)
        }
      })
      _start.call(player, hls.mse.url)
    }

    const loadData = (time = player.currentTime) => {
      const range = player.getBufferedRange()
      if (time < range[1]) {
        if (hls.type === 'vod') {
          if (range[1] - time < preloadTime) {
            hls.seek(range[1] + 1)
          }
        }
      } else {
        hls.seek(time)
      }
    }

    player.on('timeupdate', () => {
      loadData(player.currentTime + 1)
      isEnded(player, hls)
    })

    player.on('seeking', () => {
      loadData()
    })

    player.on('waiting', () => {
      if (hls.type === 'live') {
        let buffered = player.buffered
        let length = buffered.length
        let currentTime = player.currentTime
        for (let i = 0; i < length; i++) {
          if (buffered.start(i) > currentTime) {
            player.currentTime = buffered.start(i) + 0.1
            break
          }
        }
      } else {
        hls.seek()
      }
    })

    player.once('destroy', () => {
      clearTimeout(hls.m3u8.timer)
    })
  }
}

Player.install('hlsplayer', hlsplayer)
