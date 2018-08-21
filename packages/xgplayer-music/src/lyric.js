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
  constructor (txt, dom) {
    this.rawTxt = txt
    this.txt = txt.replace(/^[\r\n]|[\r\n]$/g, '').match(/(\[.*\])[^[]+/g)
    this.isDynamic = [].concat(txt.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)).length === this.txt.length && this.txt.length > 1
    this.__ainimateInterval__ = 0
    this.dom = dom
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
  set interval (val) {
    this.__ainimateInterval__ = val
  }
  get interval () {
    return this.__ainimateInterval__
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
    const interval = this.__ainimateInterval__
    return list.filter(({time}, idx) => {
      let idxy = idx + 1
      return curTime >= time && list[idxy] && curTime * 1 + interval * 1 <= list[idxy].time
    })
  }
  bind (player) {
    let self = this
    this.__player__ = player
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
    delete this.__player__
    if (this.__handle__) {
      player.off('lyricUpdate', this.__handle__)
      delete this.__handle__
    }
  }
  show () {
    let dom = this.dom
    let lyrbicTxts = []
    if (dom && dom.nodeType === 1) {
      this.list.forEach(item => {
        lyrbicTxts.push(`<xg-lyric-item class="xgplayer-lyric-item" data-idx="${item.idx}">${item.lyric.replace(/[\r\n]/g, '')}</xg-lyric-item>`)
      })
      dom.innerHTML = lyrbicTxts.join('')
      this.__updateHandle__ = (item) => {
        let dom = this.dom
        let activeDom = dom.querySelector('.xgplayer-lyric-item-active')
        let offsetHeight = dom.offsetHeight
        let activeTop
        if (activeDom) {
          activeDom.className = 'xgplayer-lyric-item'
        }
        activeDom = dom.querySelector(`.xgplayer-lyric-item[data-idx="${item.idx}"]`)
        if (activeDom) {
          activeDom.className = 'xgplayer-lyric-item xgplayer-lyric-item-active'
          activeTop = (activeDom.getBoundingClientRect().top - dom.getBoundingClientRect().top + dom.scrollTop - offsetHeight / 2)
          if (activeTop) {
            dom.scrollTop = activeTop
          }
        }
      }
      this.__player__.on('lyricUpdate', this.__updateHandle__)
    } else {
      this.__player__.emit('error', 'lyric container can not be empty')
    }
  }
  hide () {
    this.__updateHandle__.off('lyricUpdate', this.__updateHandle__)
  }
}

export default Lyric
