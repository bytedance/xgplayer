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
    this.player.offsetDuration = timeSegments.length > 0 ? timeSegments[timeSegments.length - 1].duration : 0
    if (timeSegments.length > 0) {
      this.curIndex = 0
      this.curPos = timeSegments[0]
    }
    console.log('>>>TimeSegments', this.player.offsetDuration, timeSegments)

    this.on(Events.LOADED_DATA, this._onLoadedData)

    this.on(Events.TIME_UPDATE, this._onTimeupdate)

    this.on(Events.PLAY, this._onPlay)
  }

  formatTimeSegments (timeSegments) {
    if (!timeSegments) {
      return []
    }
    timeSegments.sort((a,b) =>{ return a.start - b.start })
    timeSegments.forEach((item, index) => {
      const _segDuration = item.end - item.start
      if (index === 0) {
        item.offset = item.start // 偏移量
        item.cTime = 0
        item.segDuration = _segDuration
        item.duration = _segDuration
      } else {
        const last = timeSegments[index - 1]
        item.offset = last.offset + (item.start - last.end)
        item.cTime = last.duration + last.cTime
        item.segDuration = _segDuration
        item.duration = last.duration + _segDuration
      }
    })
    return timeSegments
  }

  _onLoadedData = () => {
    const { timeSegments } = this.playerConfig
    if (!timeSegments || timeSegments.length === 0) {
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
    if (_len === 0) {
      return
    }
    const index = Util.getIndexByTime(currentTime, timeSegments)
    if (index !== this.curIndex) {
      this.changeIndex(index, timeSegments)
    }
    if (!this.curPos) {
      return
    }
    const { start, end } = this.curPos
    const curTime = Util.getOffsetCurrentTime(currentTime, timeSegments)
    // console.log('>>>_onTimeupdate', currentTime, curTime)
    this.player.offsetCurrentTime = curTime
    if (currentTime < start) {
      this.player.currentTime = start
    } else if (currentTime > end && index >= _len - 1) {
      this.player.pause()
    }
  }

  _onPlay = () => {
    const { currentTime } = this.player
    const { timeSegments } = this.playerConfig
    if (timeSegments.length > 0 && currentTime >= timeSegments[timeSegments.length - 1].end) {
      this.player.seek(timeSegments[0].start)
    }
  }

  changeIndex (index, timeSegments) {
    this.curIndex = index
    if (index >= 0 && timeSegments.length > 0) {
      this.curPos = timeSegments[index]
      this.player.timeOffset = this.curPos.offset
    }
  }
}