/**
 * @author fuyuhao
 */
import MainParser from './parse/MainParser'
import MSE from './parse/MSE'
import VodTask from './tasks/VodTask'
import getDefaultConf from './constants/config'
/* eslint-disable no-unused-vars */
export default class Flv {
  constructor (options, player) {
    this._player = player
    this._options = Object.assign({}, getDefaultConf(), options)
    this.flvPlayer = new MainParser(this._options, player)
    this.mse = new MSE()
    this.isSeeking = false
    this.isDataLoading = false
    this.tempCurrentTime = 0
    this.tempFlvPlayer = null
    this.initPlayerEvents(player, this._options)
    this.initFlvPlayerEvents(this.flvPlayer, this.mse)
    this.initMseEvents(this.mse, this.flvPlayer)
  }

  load () {
    this.flvPlayer.startLoadData()
  }

  initPlayerEvents (player, options) {
    const { mse } = this
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
        this.flvPlayer.seek(player.currentTime)
        this.isSeeking = true
      })
    }
    player.on('timeupdate', () => {
      this.tempCurrentTime = player.currentTime
      if (!this.isSeeking && this.flvPlayer.isMediaInfoReady && !this.tempFlvPlayer) {
        this.progressChecker(player)
      }
      this.isEnded(player, this.flvPlayer)
    })
    player._replay = () => {
      player.mse.destroy()
      VodTask.clear()
      const _mse = new MSE()
      this.flvPlayer.replay()

      mse.on('sourceopen', () => {
        this.flvPlayer.isSourceOpen = true
        mse.appendBuffer(this.flvPlayer.ftyp_moov.buffer)
        mse.on('updateend', () => {
          const {pendingFragments, hasPendingFragments} = this.flvPlayer
          this.isSeeking = false
          if (hasPendingFragments) {
            const fragment = pendingFragments.shift()
            console.log(fragment)
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
    player.switchURL = (url) => {
      this._options.url = url
      this.flvPlayer.unbindEvents()
      VodTask.clear()
      if (!player.config.isLive) {
        const tempFlvPlayer = this.tempFlvPlayer = new MainParser(this._options, player)

        tempFlvPlayer.isSourceOpen = true
        tempFlvPlayer.isTempPlayer = true
        this.initFlvPlayerEvents(tempFlvPlayer, mse)
        tempFlvPlayer.handleMediaFragment = () => {
          this.isSeeking = false
          this.unbindFlvPlayerEvents(this.flvPlayer)
          this.flvPlayer.destroy()
          this.flvPlayer = tempFlvPlayer
          this.tempFlvPlayer = null

          mse.appendBuffer(tempFlvPlayer.ftyp_moov)
          tempFlvPlayer.handleMediaFragment = (fragment) => {
            return mse.appendBuffer(fragment.data)
          }
          return false
        }
        tempFlvPlayer.startLoadData()
      }
    }
  }
  unbindFlvPlayerEvents (flvPlayer) {
    flvPlayer.handleSeekEnd = () => null
    flvPlayer.handleError = () => null
    flvPlayer.handleMediaFragment = () => null
  }
  initFlvPlayerEvents (flvPlayer, mse) {
    const handleFtypMoov = (ftypMoov) => {
      if (flvPlayer.isSourceOpen && !this.tempFlvPlayer) {
        mse.appendBuffer(ftypMoov.buffer)
      } else {
        this.isSeeking = true
        flvPlayer.seek(this._player.currentTime)
      }
    }
    flvPlayer.once('ready', handleFtypMoov)
    flvPlayer.handleSeekEnd = () => {
      this.isSeeking = false
    }
    flvPlayer.handleError = function (e) {
      this._player.emit('error', e)
    }
    if (!this.tempFlvPlayer) {
      flvPlayer.handleMediaFragment = (fragment) => {
        return this.tempFlvPlayer ? false : mse.appendBuffer(fragment.data)
      }
    }
  }

  initMseEvents (mse) {
    mse.on('error', (e) => {
      this._player.emit('error', e)
    })
    const onSourceOpen = () => {
      this.flvPlayer.isSourceOpen = true
      if (this.flvPlayer.ftyp_moov !== null) {
        mse.appendBuffer(this.flvPlayer.ftyp_moov.buffer)
      }

      mse.on('updateend', () => {
        const { pendingFragments, hasPendingFragments } = this.flvPlayer

        if (hasPendingFragments) {
          const fragment = pendingFragments.shift()
          if (!mse.appendBuffer(fragment.data)) {
            pendingFragments.unshift(fragment)
          } else {
            console.log(fragment)
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

  progressChecker (player) {
    const { minCachedTime, preloadTime } = this._options
    const range = player.getBufferedRange()
    if (this.flvPlayer.videoDuration - range[1] * this.flvPlayer.videoTimeScale < 0.1 * this.flvPlayer.videoTimeScale) { return }
    if (range[1] - player.currentTime < minCachedTime && !this.isDataLoading) {
      this.isDataLoading = true
      this.flvPlayer.loadSegments(true, player.currentTime, preloadTime).then(() => {
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
