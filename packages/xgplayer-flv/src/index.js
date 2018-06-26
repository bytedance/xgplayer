import MainParser from './parse/MainParser'
import Player from 'xgplayer'
import MSE from './parse/MSE'
import VodTask from './utils/VodTask'
import defaultConfig from './constants/config'

const isEnded = function (player, flv) {
  if (flv.videoDuration - player.currentTime * flv.videoTimeScale < 2 * flv.videoTimeScale) {
    const range = player.getBufferedRange()
    if (player.currentTime - range[1] < 0.1) {
      player.mse.endOfStream()
    }
  }
}
let tempCurrentTime = 0
const flvPlayer = function () {
  let player = this
  let flv
  let mse
  let seekDataReceived
  let requestSending = false
  let _config = Object.assign(defaultConfig, player.config)
  // let sniffer = Player.sniffer
  const { preloadTime, minCachedTime, isLive } = _config

  function progressChecker () {
    const range = player.getBufferedRange()
    if (flv.videoDuration - range[1] * flv.videoTimeScale < 0.1 * flv.videoTimeScale) { return }
    if (range[1] - player.currentTime < minCachedTime && !requestSending) {
      requestSending = true
      flv.loadSegments(true, player.currentTime, preloadTime).then(() => {
        requestSending = false
      })
    }
  }

  const _start = player.start
  player.start = function (url = _config.url) {
    if (!url) { return }
    flv = new MainParser(_config, player)

    flv.on('ready', (ftypMoov) => {
      mse = player.mse = flv.mse = new MSE()
      _start.call(player, mse.url)

      mse.on('sourceopen', () => {
        flv.isSourceOpen = true
        mse.appendBuffer(ftypMoov.buffer)
        mse.on('updateend', () => {
          const { pendingFragments, hasPendingFragments } = flv

          seekDataReceived = true
          if (hasPendingFragments) {
            const fragment = pendingFragments.shift()
            if (!mse.appendBuffer(fragment.data)) {
              pendingFragments.unshift(fragment)
            } else {
              player.emit('cacheupdate', player)
            }
          }
        })
      })

      mse.on('error', (e) => {
        player.emit('error', e)
      })
    })

    flv.handleError = function (e) {
      player.emit('error', e)
    }
  }

  player.on('pause', () => {
    !isLive && VodTask.clear()
  })
  //
  // player.on('resume', function () {
  //
  // });
  //
  // player.on('waiting', function () {
  //     console.log('waiting');
  // });

  if (!isLive) {
    player.on('seeking', () => {
      VodTask.clear()
      const { buffered, currentTime } = player
      let isBuffered = false
      if (buffered.length) {
        for (let i = 0, len = buffered.length; i < len; i++) {
          if (currentTime > buffered.start(i) && currentTime < buffered.end(i)) {
            isBuffered = true
            break
          }
        }
      }
      if (isBuffered) {
        return
      }
      if (!flv.isSeekable) {
        player.currentTime = tempCurrentTime
        return
      }
      flv.seek(player.currentTime, preloadTime, player)
      seekDataReceived = false
    })
    player.on('timeupdate', () => {
      tempCurrentTime = player.currentTime
      if (seekDataReceived !== false) {
        progressChecker()
      }
      isEnded(player, flv)
    })
    player._replay = function () {
      VodTask.clear()
      const mse = flv.mse = new MSE()
      flv.replay()
      mse.on('sourceopen', () => {
        flv.isSourceOpen = true
        mse.appendBuffer(flv.ftyp_moof.buffer)
        mse.on('updateend', () => {
          const { pendingFragments, hasPendingFragments } = flv
          seekDataReceived = true
          if (hasPendingFragments) {
            const fragment = pendingFragments.shift()
            if (!mse.appendBuffer(fragment.data)) {
              pendingFragments.unshift(fragment)
            } else {
              player.emit('cacheupdate', player)
            }
          }
        })
      })

      mse.on('error', (e) => {
        player.emit('error', e)
      })
      player.emit('cacheupdate', player)
      player.src = mse.url
      player.mse = mse
      return true
    }
  }
}

Player.install('flvplayer', flvPlayer)
