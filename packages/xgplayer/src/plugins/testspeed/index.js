import BasePlugin, { Events, Util } from '../../plugin'

export default class TestSpeed extends BasePlugin {
  static get pluginName () {
    return 'testspeed'
  }

  static get defaultConfig () {
    return {
      openSpeed: false, // 测速开关，默认关
      testCnt: 3, // 一次播放的测速次数，默认1次
      loadSize: 200 * 1024, // 一次播放的测速请求的数据量大小，单位字节，默认200k
      testTimeStep: 3000, // 每次测速的时间间隔，第一次在开播后的testTimeStep 秒，默认是3s
      url: '', // 每次测速的url，一般传播放的备用地址测速
      saveSpeedMax: 5 // 保留最近多少次测速记录，最后的速度求这个记录列表平均值,默认5条
    }
  }

  getSpeed = (speedList) => {
    if (this.speedListCache.length <= 0) return 0
    let total = 0
    this.speedListCache.map(item => {
      total += item
    })
    return Math.floor(total / this.speedListCache.length)
  }

  afterCreate () {
    this.speedListCache = []
    const { openSpeed, testTimeStep } = this.config
    this.timer = null
    this.cnt = 0
    this.xhr = null
    if (!openSpeed) {
      return
    }
    this.on('real_time_speed', this._onRealSpeedChange)

    this.on([Events.LOADED_DATA, Events.REPLAY], () => {
      if (Util.isMSE(this.player.video)) {
        return
      }
      this.speedListCache = []
      this.cnt = 0
      this.timer = setTimeout(this.testSpeed, testTimeStep)
    })
  }

  _onRealSpeedChange = (data) => {
    data.speed && this.appendList(data.speed)
  }

  testSpeed = () => {
    clearTimeout(this.timer)
    this.timer = null
    if (!this.player || !this.config.openSpeed) return
    const { url, loadSize, testCnt, testTimeStep } = this.config
    const testSpeedUrl = url + (url.indexOf('?') < 0 ? '?testst=' : '&testst=') + Date.now()
    if (this.cnt >= testCnt) {
      return
    }
    this.cnt++
    try {
      const start = new Date().getTime()
      let end = null
      const xhr = new XMLHttpRequest()
      this.xhr = xhr
      xhr.open('GET', testSpeedUrl)
      const headers = {}
      const random = Math.floor(Math.random() * 10)
      headers.Range = 'bytes=' + random + '-' + (loadSize + random)
      if (headers) {
        Object.keys(headers).forEach(k => {
          xhr.setRequestHeader(k, headers[k])
        })
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.xhr = null
          end = new Date().getTime()
          const size = xhr.getResponseHeader('Content-Length') / 1024 * 8
          const speed = Math.round(size * 1000 / (end - start))
          this.appendList(speed)
          this.timer = setTimeout(this.testSpeed, testTimeStep)
        }
      }
      xhr.send()
    } catch (e) {
      console.error(e)
    }
  }

  appendList = (speed) => {
    const { saveSpeedMax } = this.config
    if (this.speedListCache.length >= saveSpeedMax) {
      this.speedListCache.shift()
    }
    this.speedListCache.push(speed)
    this.player && (this.player.realTimeSpeed = speed)
    this.updateSpeed()
  }

  updateSpeed = () => {
    const speed = this.getSpeed()
    const { player } = this
    if (player && (!player.avgSpeed || speed !== player.avgSpeed)) {
      player.avgSpeed = speed
      player.emit(Events.DOWNLOAD_SPEED_CHANGE, { speed: speed, realTimeSpeed: player.realTimeSpeed })
    }
  }

  set openSpeed (value) {
    this.config.openSpeed = value
    if (!value && this.timer) {
      clearTimeout(this.timer)
      this.timer = null
      return
    }
    if (this.config.openSpeed) {
      if (this.timer) return
      this.timer = setTimeout(this.testSpeed, this.config.testTimeStep)
    }
  }

  get openSpeed () {
    return this.config.openSpeed
  }

  destroy () {
    clearTimeout(this.timer)
    this.timer = null
    if (this.xhr && this.xhr.readyState !== 4) {
      this.xhr.cancel()
      this.xhr = null
    }
  }
}
