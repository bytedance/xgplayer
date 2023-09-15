import { BasePlugin, Events, Util } from '../../plugin'
/**
 * 进行事件分段控制
 */
export default class TimeSegments extends BasePlugin {
  static get pluginName () {
    return 'TimeSegments'
  }

  static get defaultConfig () {
    return {
      disable: false
    }
  }

  afterCreate () {
    const { timeSegments } = this.playerConfig
    this.curIndex = -1
    this.curPos = null

    this.duration = 0
    this.formatTimeSegments(timeSegments)
    this.player.offsetDuration = this.duration
    if (timeSegments.length > 0) {
      this.curIndex = 0
      this.curPos = timeSegments[0]
    }
    console.log('>>>TimeSegments', this.duration, timeSegments)

    this.on(Events.LOADED_DATA, this._onLoadedData)

    this.on(Events.TIME_UPDATE, this._onTimeupdate)

    this.on(Events.SEEKING, this._onSeeking)
  }

  formatTimeSegments (timeSegments) {
    timeSegments.sort((a,b) =>{ return a.start - b.start })
    timeSegments.forEach((item, index) => {
      if (index === 0) {
        item.offset = item.start
        item.cTime = 0
        item.duration = item.end - item.start
      } else {
        const last = timeSegments[index - 1]
        item.offset = last.offset + (item.start - last.end)
        item.cTime = last.duration + last.cTime
        item.allDuration = last.duration + item.start - last.end
      }
      this.duration += (item.end - item.start)
    })
    console.log('>>>>this.duration', this.duration)
    return timeSegments
  }

  _onLoadedData = () => {
    const { timeSegments } = this.playerConfig
    if (timeSegments.length === 0) {
      return
    }
    const time = Util.getOffsetCurrentTime(this.player.currentTime, timeSegments)
    console.log('>>>offsetCurrentTime set', time)
    this.player.offsetCurrentTime = time
    this.changeIndex(0, timeSegments)
    if (this.curPos.start > 0){
      this.player.currentTime = this.curPos.start
    }
  }

  _onTimeupdate = () => {
    const { currentTime } = this.player
    const { timeSegments } = this.playerConfig
    const _len = timeSegments.length
    const index = this.getIndexByTime(currentTime, timeSegments)
    if (index !== this.curIndex) {
      this.changeIndex(index, timeSegments)
    }
    const { start, end } = this.curPos
    const curTime = Util.getOffsetCurrentTime(currentTime, timeSegments)
    console.log('>>>_onTimeupdate', currentTime, curTime)
    this.player.offsetCurrentTime = curTime
    if (currentTime < start) {
      this.player.currentTime = start
    } else if (currentTime > end && index >= _len - 1) {
      this.player.pause()
    }
  }

  _onSeeking = () => {
    console.log('>>>_onSeeking', this.player.currentTime)
  }

  changeIndex (index, timeSegments) {
    this.curIndex = index
    this.curPos = timeSegments[index]
    this.player.timeOffset = this.curPos.offset
  }

  _onPlay () {
    const { currentTime } = this.player
    const { timeSegments } = this.playerConfig
    if (currentTime >= timeSegments[timeSegments.length - 1].end) {
      this.seek(timeSegments[0].start)
    }
  }

  getIndexByTime (time, segments) {
    const _len = segments.length
    let _index = -1
    if (time < segments[0].end || _len < 2) {
      _index = 0
    } else if (time > segments[_len - 1].end) {
      _index = _len - 1
    } else {
      for (let i = 1; i < _len; i++) {
        // console.log(i, time, segments[i - 1].end, segments[i].end)
        if (time > segments[i - 1].end && time <= segments[i].end){
          _index = i
          break
        }
      }
    }
    return _index
  }
}