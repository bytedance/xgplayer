import { BasePlugin, Events } from '../../plugin'
import { getOffsetCurrentTime, getIndexByTime } from '../../utils/util'
/**
 * 进行事件分段控制
 */
export default class TimeSegmentsControls extends BasePlugin {
  static get pluginName () {
    return 'TimeSegmentsControls'
  }

  static get defaultConfig () {
    return {
      disable: true,
      segments: []
    }
  }

  afterCreate () {
    this.curIndex = -1
    this.curPos = null
    this.lastCurrentTime = 0

    this.updateSegments()

    this.on(Events.DURATION_CHANGE, this._onDurationChange)
    this.on(Events.LOADED_DATA, this._onLoadedData)

    this.on(Events.TIME_UPDATE, this._onTimeupdate)

    this.on(Events.SEEKING, this._onSeeking)

    this.on(Events.PLAY, this._onPlay)
  }

  setConfig (newConfig) {
    if (!newConfig) {
      return
    }
    const keys = Object.keys(newConfig)
    if (keys.length < 1) {
      return
    }
    keys.forEach(key => {
      this.config[key] = newConfig[key]
    })
    this.updateSegments()
  }

  updateSegments () {
    const { disable, segments } = this.config
    const { player } = this
    if (disable || !segments || segments.length === 0) {
      player.timeSegments = []
      player.offsetDuration = 0
      player.offsetCurrentTime = -1
    } else {
      const _segs = this.formatTimeSegments(segments, player.duration)
      player.timeSegments = _segs
      player.offsetDuration = _segs.length > 0 ? _segs[_segs.length - 1].duration : 0
    }
  }

  formatTimeSegments (timeSegments, duration) {
    const ret = []
    if (!timeSegments) {
      return []
    }
    // console.log('>>>formatTimeSegments', duration)
    timeSegments.sort((a,b) =>{ return a.start - b.start })
    timeSegments.forEach((item, index) => {
      const _item = {}
      _item.start = item.start < 0 ? 0 : item.start
      _item.end = duration > 0 && item.end > duration ? duration : item.end
      if (duration > 0 && _item.start > duration) {
        return
      }
      ret.push(_item)
      const _segDuration = _item.end - _item.start
      if (index === 0) {
        _item.offset = item.start // 偏移量
        _item.cTime = 0
        _item.segDuration = _segDuration
        _item.duration = _segDuration
      } else {
        const last = ret[index - 1]
        _item.offset = last.offset + (_item.start - last.end)
        _item.cTime = last.duration + last.cTime
        _item.segDuration = _segDuration
        _item.duration = last.duration + _segDuration
      }
    })
    return ret
  }

  _onDurationChange = () => {
    this.updateSegments()
    const { currentTime, timeSegments } = this.player
    if (!this._checkIfEnabled(timeSegments)) {
      return
    }
    const index = getIndexByTime(currentTime,timeSegments)
    const time = getOffsetCurrentTime(currentTime, timeSegments, index)
    this.player.offsetCurrentTime = time
    this.changeIndex(index, timeSegments)
  }

  _onLoadedData = () => {
    const { timeSegments } = this.player
    if (!this._checkIfEnabled(timeSegments)) {
      return
    }
    const time = getOffsetCurrentTime(0, timeSegments)
    this.player.offsetCurrentTime = time
    this.changeIndex(0, timeSegments)
    if (this.curPos.start > 0){
      this.player.currentTime = this.curPos.start
    }
  }

  _onTimeupdate = () => {
    const { currentTime, timeSegments } = this.player
    if (!this._checkIfEnabled(timeSegments)) {
      return
    }
    const _len = timeSegments.length
    this.lastCurrentTime = currentTime
    const index = getIndexByTime(currentTime, timeSegments)
    if (index !== this.curIndex) {
      this.changeIndex(index, timeSegments)
    }
    const curTime = getOffsetCurrentTime(currentTime, timeSegments, index)

    this.player.offsetCurrentTime = curTime

    // 根据分段信息进行放时间点跳转
    if (!this.curPos) {
      return
    }
    const { start, end } = this.curPos
    if (currentTime < start) {
      this.player.currentTime = start
    } else if (currentTime > end && index >= _len - 1) {
      this.player.pause()
    }
  }

  _onSeeking = () => {
    const { currentTime, timeSegments } = this.player
    if (!this._checkIfEnabled(timeSegments)) {
      return
    }
    if (currentTime < timeSegments[0].start) {
      this.player.currentTime = timeSegments[0].start
    } else if (currentTime > timeSegments[timeSegments.length - 1].end) {
      this.player.currentTime = timeSegments[timeSegments.length - 1].end
    } else {
      const _index = getIndexByTime(currentTime, timeSegments)
      if (_index >= 0) {
        const _seekTime = this.getSeekTime(currentTime, this.lastCurrentTime, _index, timeSegments)
        if (_seekTime >= 0 ) {
          this.player.currentTime = _seekTime
        }
      }
    }
  }

  _onPlay = () => {
    const { currentTime, timeSegments } = this.player
    if (this._checkIfEnabled(timeSegments) && currentTime >= timeSegments[timeSegments.length - 1].end) {
      this.player.currentTime = timeSegments[0].start
    }
  }

  getSeekTime (currentTime, lastCurrentTime, index, timeSegments) {
    let _time = -1
    const { start, end } = timeSegments[index]
    if (currentTime >= start && currentTime <= end) {
      // console.log('>>>>_onSeeking noSeek', currentTime, lastCurrentTime, start, end, _time)
      return _time
    }
    const diff = currentTime - lastCurrentTime
    if (diff < 0) {
      if (currentTime < start) {
        const diff2 = lastCurrentTime > start ? lastCurrentTime - start : 0
        _time = index - 1 >= 0 ? timeSegments[index - 1].end + diff + diff2 : 0
        // console.log('>>>>_onSeeking seek3', currentTime, lastCurrentTime, diff, start, end, _time)
        return _time
      }
    }
    return -1
  }

  _checkIfEnabled (segments) {
    return !(!segments || segments.length < 1)
  }

  changeIndex (index, timeSegments) {
    this.curIndex = index
    if (index >= 0 && timeSegments.length > 0) {
      this.curPos = timeSegments[index]
    } else {
      this.curPos = null
    }
  }
}