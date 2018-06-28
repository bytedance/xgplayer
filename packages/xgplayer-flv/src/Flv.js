/**
 * @author fuyuhao
 */
import MainParser from './parse/MainParser'
import MSE from './parse/MSE'
import VodTask from './utils/VodTask'
import getDefaultConf from './constants/config'
/* eslint-disable no-unused-vars */
export default class Flv {
  constructor (options, player) {
    this._player = player
    this._options = Object.assign({}, getDefaultConf(), options)
    this.flvPlayer = new MainParser(this._options, player)
    this.flvPlayer.mse = this.mse = new MSE()
    this.isSeeking = false
    this.isDataLoading = false
    this.tempCurrentTime = 0
    this.initPlayerEvents(player, this._options)
    this.initFlvPlayerEvents(this.flvPlayer, this.mse)
    this.initMseEvents(this.mse, this.flvPlayer)
  }

  load () {
    this.flvPlayer.startLoadData()
  }

  initPlayerEvents (player, options) {
    const { flvPlayer, mse } = this
    player.mse = mse
    if (!options.isLive) {
      player.on('seeking', () => {
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
        VodTask.clear()
        if (!this.isSeekable) {
          this._player.currentTime = this.tempCurrentTime
          return
        }
        flvPlayer.seek(player.currentTime, options.preloadTime, player)
        this.isSeeking = true
      })
    }
    player.on('timeupdate', () => {
      this.tempCurrentTime = player.currentTime
      if (!this.isSeeking && flvPlayer.isMediaInfoReady) {
        this.progressChecker(player, flvPlayer)
      }
      this.isEnded(player, flvPlayer)
    })
    player._replay = () => {
      flvPlayer.mse.destroy()
      VodTask.clear()
      const _mse = new MSE()
      flvPlayer.replay()

      mse.on('sourceopen', () => {
        flvPlayer.isSourceOpen = true
        mse.appendBuffer(flvPlayer.ftyp_moof.buffer)
        mse.on('updateend', () => {
          const {pendingFragments, hasPendingFragments} = flvPlayer
          this.isSeeking = false
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

      player.mse = mse
      player.src = this.mse.url
      return true
    }
  }

  initFlvPlayerEvents (flvPlayer, mse) {
    flvPlayer.on('ready', (ftypMoov) => {
      if (flvPlayer.isSourceOpen) {
        mse.appendBuffer(ftypMoov.buffer)
      }
    })

    flvPlayer.handleError = function (e) {
      this._player.emit('error', e)
    }
  }

  initMseEvents (mse, flvPlayer) {
    mse.on('error', (e) => {
      this._player.emit('error', e)
    })
    const onSourceOpen = () => {
      flvPlayer.isSourceOpen = true
      if (flvPlayer.ftyp_moof !== null) {
        mse.appendBuffer(this.flvPlayer.ftyp_moof.buffer)
      }

      mse.on('updateend', () => {
        const { pendingFragments, hasPendingFragments } = flvPlayer

        if (hasPendingFragments) {
          const fragment = pendingFragments.shift()
          if (!flvPlayer.mse.appendBuffer(fragment.data)) {
            pendingFragments.unshift(fragment)
          } else {
            this._player.emit('cacheupdate', this._player)
          }
        }
      })
    }
    mse.on('sourceopen', onSourceOpen)
  }

  loadData (currentTime) {
    return this.flvPlayer.loadSegments(true, currentTime, this._options.preloadTime)
  }

  progressChecker (player, flvPlayer) {
    const { minCachedTime, preloadTime } = this._options
    const range = player.getBufferedRange()
    if (flvPlayer.videoDuration - range[1] * flvPlayer.videoTimeScale < 0.1 * flvPlayer.videoTimeScale) { return }
    if (range[1] - player.currentTime < minCachedTime && !this.isDataLoading) {
      this.isDataLoading = true
      flvPlayer.loadSegments(true, player.currentTime, preloadTime).then(() => {
        this.isDataLoading = false
      })
    }
  }

  isEnded (player, flv) {
    if (flv.videoDuration - player.currentTime * flv.videoTimeScale < 2 * flv.videoTimeScale) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        this.mse.endOfStream()
      }
    }
  }
  get isSeekable () {
    return this.flvPlayer.isSeekable
  }
}
