class LyricTime {
  constructor (timeTxt) {
    this.regRule = /(\d{2}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g
    if (this.regRule.test(timeTxt)) {
      this.time = RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1
    } else {
      this.time = -1
    }
  }
}

export {LyricTime}

class Lyric {
  constructor (txt, interval = 0) {
    this.rawTxt = txt
    this.txt = txt.replace(/^[\r\n]|[\r\n]$/g, '').match(/(\[.*\])[^[]+/g)
    this.isDynamic = [].concat(txt.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)).length === this.txt.length && this.txt.length > 1
    this.animateInterval = interval
    this.list = this.txt.map((item, idx) => {
      const reg = /(\[[\d:\S]+\])([^[]+)/g.test(item)
      const time = RegExp.$1
      const lyric = RegExp.$2
      return {
        time: reg ? new LyricTime(time).time : -1,
        lyric,
        idx
      }
    })
    this.line = 0
  }
  adjust () {
    let list = this.list
    for (let i = 0, j, k, len = list.length; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        if (list[j].time > list[i].time) {
          break
        }
      }
      if (j < len) {
        let sep = (list[j].time - list[i].time) / (j - i)
        for (k = i + 1; k < j; k++) {
          list[k].time = list[k - 1].time + sep
        }
      }
    }
  }
  find (curTime) {
    const list = this.list
    const interval = this.animateInterval
    return list.filter(({time}, idx) => {
      let idxy = idx + 1
      return curTime >= time && list[idxy] && curTime * 1 + interval * 1 <= list[idxy].time
    })
  }
  bind (player) {
    let self = this
    if (self.isDynamic) {
      self.__handle__ = (() => {
        const f = this.find(player.currentTime)[0]
        if (f && f.idx !== this.line) {
          this.line = f.idx
          player.emit('lyricUpdate', f)
        }
      }).bind(self, player)
      player.on('timeupdate', self.__handle__)
      return true
    } else {
      return false
    }
  }
  unbind (player) {
    if (this.__handle__) {
      player.off('lybricUpdate', this.__handle__)
      delete this.__handle__
    }
  }
}

export default Lyric
