import { BasePlugin, Events } from '../../plugin'
const INFO = 'info'

const { STATS_EVENTS } = Events
export default class Stats extends BasePlugin {
  static get pluginName () {
    return 'stats'
  }

  static get defaultConfig () {
    return {
    }
  }

    _recordUserActions = (actionData) => {
      const time = this._getTime()
      const payload = Object.assign({}, actionData, { msg: actionData.msg || actionData.action })
      this._stats[INFO].push({
        type: 'userAction',
        ...time,
        payload
      })
    }

    _getTime () {
      return {
        timestamp: Date.now(),
        timeFormat: new Date().toISOString()
      }
    }

    afterCreate () {
      this.reset()
      this.on(Events.USER_ACTION, this._recordUserActions)
      this.on(STATS_EVENTS.STATS_INFO, this._recordInfo)
      this.on(STATS_EVENTS.STATS_DOWNLOAD, this._downloadStats)
      this.on(STATS_EVENTS.STATS_RESET, this._onReset)
    }

    destroy () {
      this.offAll()
    }

    _onReset = () => {
      this.reset()
    }

    _recordInfo = (data) => {
      this.info(data)
    }

    _downloadStats = () => {
      const stats = this.getStats()
      const blob = new Blob([JSON.stringify(stats)], { type: 'application/json' })
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = downloadUrl
      link.download = 'player.txt'
      link.disabled = false
      link.click()
    }

    downloadStats () {
      this._downloadStats()
    }

    /**
     * @params type
     */
    info (data) {
      if (data.profile) {
        this._infoProfile(data)
      } else {
        this._info(data)
      }
    }

    _info (data) {
      const time = this._getTime()
      this._stats[INFO].push({
        ...time,
        payload: data
      })
    }

    _infoProfile (data) {
      if (data && data.startMs) {
        const endMs = Date.now()
        const dur = endMs - data.startMs
        const profile = {
          cat: 'function',
          dur: dur,
          name: data.name || data.msg,
          ph: 'X',
          pid: 0,
          tid: 0,
          ts: data.startMs,
          profile: true,
          ...data
        }
        this._info(profile)
      } else {
        console.warn('infoProfile need object data, include startMs')
      }
    }

    reset () {
      this._stats = {
        [INFO]: [],
        media: {}
      }
    }

    getStats () {
      const { player } = this
      const mediaElem = player.media
      const buffered = []
      for (let i = 0; i < mediaElem.buffered.length; i++) {
        buffered.push({
          start: mediaElem.buffered.start(i),
          end: mediaElem.buffered.end(i)
        })
      }
      const mediaInfo = {
        currentTime: mediaElem.currentTime,
        readyState: mediaElem.readyState,
        buffered,
        paused: mediaElem.paused,
        ended: mediaElem.ended
      }

      this._stats.media = mediaInfo
      return {
        raw: this._stats,
        timestat: this._getTimeStats(),
        profile: this._getProfile()
      }
    }

    _getTimeStats () {
      const allStat = this._stats[INFO]
      const msgs = allStat.map(stat => {
        const data = stat.payload.data
        let msg = ''
        try {
          if (data instanceof Error) {
            msg = data.msg
          } else if (data !== undefined) {
            msg = JSON.stringify(data)
          }
        } catch (error) {
          console.log('err', error)
        }

        return `[${stat.timeFormat}] : ${stat.payload.msg} ${msg} `
      })
      return msgs
    }

    _getProfile () {
      const profile = {
        traceEvents: []
      }
      const allStat = this._stats[INFO]
      allStat.forEach(stat => {
        if (stat.payload.profile) {
          profile.traceEvents.push(stat.payload)
        }
      })
      return profile
    }
}
