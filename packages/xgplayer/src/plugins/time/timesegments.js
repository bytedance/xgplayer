import { BasePlugin, Events, Util } from '../../plugin'
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
    console.log('>>>afterCreate, this.config', this.config)
    const { disable, segments } = this.config
    if (disable) {
      return
    }
    this.curIndex = -1
    this.curPos = null

    this.lastCurrentTime = 0

    const _segs = this.formatTimeSegments(segments)
    this.player.timeSegments = _segs
    this.player.offsetDuration = _segs.length > 0 ? _segs[_segs.length - 1].duration : 0
    this.player.offsetCurrentTime = -1

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
    const { disable, segments } = this.config
    if (disable || !segments || segments.length === 0) {
      this.player.timeSegments = []
      this.player.offsetDuration = 0
      this.player.offsetCurrentTime = -1
    } else {
      const _segs = this.formatTimeSegments(segments)
      this.player.timeSegments = _segs
      this.player.offsetDuration = _segs.length > 0 ? _segs[_segs.length - 1].duration : 0
    }
  }

  formatTimeSegments (timeSegments) {
    const ret = []
    if (!timeSegments) {
      return []
    }
    timeSegments.sort((a,b) =>{ return a.start - b.start })
    timeSegments.forEach((item, index) => {
      const _item = {}
      _item.start = item.start
      _item.end = item.end
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

  _onLoadedData = () => {
    const { timeSegments } = this.player
    if (!timeSegments || timeSegments.length === 0) {
      return
    }
    const time = Util.getOffsetCurrentTime(this.player.currentTime, timeSegments)
    this.player.offsetCurrentTime = time
    this.changeIndex(0, timeSegments)
    if (this.curPos.start > 0){
      this.player.currentTime = this.curPos.start
    }
  }

  _onTimeupdate = () => {
    const { currentTime, timeSegments } = this.player
    this.lastCurrentTime = currentTime
    const _len = timeSegments.length
    if (_len === 0) {
      return
    }
    const index = Util.getIndexByTime(currentTime, timeSegments)
    if (index !== this.curIndex) {
      this.changeIndex(index, timeSegments)
    }
    const curTime = Util.getOffsetCurrentTime(currentTime, timeSegments)

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
    if (timeSegments.length < 1) {
      return
    }
    if (currentTime < timeSegments[0].start) {
      this.player.currentTime = timeSegments[0].start
    } else if (currentTime > timeSegments[timeSegments.length - 1].end) {
      this.player.currentTime = timeSegments[timeSegments.length - 1].end
    } else {
      const _index = Util.getIndexByTime(currentTime, timeSegments)
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
    if (timeSegments.length > 0 && currentTime >= timeSegments[timeSegments.length - 1].end) {
      this.player.currentTime = timeSegments[0].start
    }
  }

  getSeekTime (currentTime, lastCurrentTime, index, timeSegments) {
    let _time = -1
    const { start, end } = timeSegments[index]
    if (currentTime >= start && currentTime <= end) {
      console.log('>>>>_onSeeking noSeek', currentTime, lastCurrentTime, start, end, _time)
      return _time
    }
    const diff = currentTime - lastCurrentTime
    if (diff < 0) {
      if (currentTime < start) {
        const diff2 = lastCurrentTime > start ? lastCurrentTime - start : 0
        _time = index - 1 >= 0 ? timeSegments[index - 1].end + diff + diff2 : 0
        console.log('>>>>_onSeeking seek3', currentTime, lastCurrentTime, diff, start, end, _time)
        return _time
      }
    }
    return -1
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