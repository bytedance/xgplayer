import { Util } from 'xgplayer'

class LyricTime {
  constructor (timeTxt) {
    // eslint-disable-next-line no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp
    this.regRule = /(\d{2}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g
    if (this.regRule.test(timeTxt)) {
      this.time = RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1
    } else {
      this.time = -1
    }
  }
}

export { LyricTime }

class Lyric {
  constructor (txts, dom) {
    this.rawTxts = txts
    this.txts = txts.map((item) => { return item.replace(/^[\r\n]|[\r\n]$/g, '').match(/(\[.*\])[^[]+/g) })
    this.isDynamics = txts.map((item, idx) => {
      return [].concat(item.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)).length === this.txts[idx].length && this.txts[idx].length === this.txts[0].length && this.txts[idx].length > 1
    })
    this.isDynamic = this.isDynamics.some((item) => {
      return item
    })
    this.__ainimateInterval__ = 0
    this.__offset__ = 0
    this.__offsetScale__ = 0.5
    this.dom = dom
    this.lists = []
    this.isDynamics.map((item, idx) => {
      if (item) {
        this.lists.push(
          this.txts[idx].map((txt, index) => {
            const reg = /(\[[\d:\S]+\])([^[]+)/g.test(txt)
            const time = RegExp.$1
            const lyric = RegExp.$2
            return {
              time: reg ? new LyricTime(time).time : -1,
              lyric,
              idx: index
            }
          })
        )
      }
    })
    this.list = this.lists.reduce((pre, cur) => {
      return pre.map((item, idx) => {
        return {
          time: item.time,
          lyric: item.lyric === '\n' ? `${item.lyric}${cur[idx].lyric}` : `${item.lyric}<br/>${cur[idx].lyric}`,
          idx
        }
      })
    })
    this.line = 0
  }

  set interval (val) {
    this.__ainimateInterval__ = val
  }

  get interval () {
    return this.__ainimateInterval__
  }

  set offset (val) {
    this.__offset__ = val
  }

  get offset () {
    return this.__offset__
  }

  set offsetScale (val) {
    this.__offsetScale__ = val
  }

  get offsetScale () {
    return this.__offsetScale__
  }

  adjust () {
    const list = this.list
    for (let i = 0, j, k, len = list.length; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        if (list[j].time > list[i].time) {
          break
        }
      }
      if (j < len) {
        const sep = (list[j].time - list[i].time) / (j - i)
        for (k = i + 1; k < j; k++) {
          list[k].time = list[k - 1].time + sep
        }
      }
    }
  }

  find (curTime) {
    const list = this.list
    const interval = this.__ainimateInterval__
    const offset = this.__offset__
    curTime = curTime + offset > 0 ? curTime + offset : 0
    return list.filter(({ time }, idx) => {
      const idxy = idx + 1
      return curTime >= time && ((list[idxy] && curTime * 1 + interval * 1 <= list[idxy].time) || (idxy >= list.length))
    })
  }

  bind (player) {
    const self = this
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

      self.__startHandle__ = (() => {
        player.emit('lyricUpdate', self.list[0])
      }).bind(self, player)
      player.once('playing', self.__startHandle__)
      //
      // self.__endHandle__ = (() => {
      //   player.emit('lyricUpdate', self.list[self.list.length - 1])
      // }).bind(self, player)
      // player.on('ended', self.__endHandle__)
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
    const dom = this.dom
    const lyrbicTxts = []
    const self = this
    const ev = ['click', 'touchstart']
    if (dom && dom.nodeType === 1) {
      const lrcWrap = Util.createDom('div', '<div></div>', {}, 'xgplayer-lrcWrap')
      dom.appendChild(lrcWrap)
      this.list.forEach(item => {
        lyrbicTxts.push(`<xg-lyric-item class="xgplayer-lyric-item" data-idx="${item.idx}">${item.lyric.replace(/[\r\n]/g, '')}</xg-lyric-item>`)
      })
      lrcWrap.innerHTML = lyrbicTxts.join('')
      const lrcForward = Util.createDom('xg-lrcForward', '<div></div>', {}, 'xgplayer-lrcForward')
      dom.appendChild(lrcForward)
      ev.forEach(item => {
        lrcForward.addEventListener(item, function (e) {
          e.preventDefault()
          e.stopPropagation()
          self.offset -= self.offsetScale
          console.log(`lyric go forward ${self.offsetScale}s`)
        }, false)
      })

      const lrcBack = Util.createDom('xg-lrcBack', '<div></div>', {}, 'xgplayer-lrcBack')
      dom.appendChild(lrcBack)
      ev.forEach(item => {
        lrcBack.addEventListener(item, function (e) {
          e.preventDefault()
          e.stopPropagation()
          self.offset += self.offsetScale
          console.log(`lyric go back ${self.offsetScale}s`)
        }, false)
      })
      this.__updateHandle__ = (item) => {
        const domWrap = this.dom.querySelector('.xgplayer-lrcWrap')
        let activeDom = domWrap.querySelector('.xgplayer-lyric-item-active')
        const offsetHeight = domWrap.offsetHeight
        let activeTop
        if (activeDom) {
          activeDom.className = 'xgplayer-lyric-item'
        }
        activeDom = domWrap.querySelector(`.xgplayer-lyric-item[data-idx="${item.idx}"]`)
        if (activeDom) {
          activeDom.className = 'xgplayer-lyric-item xgplayer-lyric-item-active'
          activeTop = (activeDom.getBoundingClientRect().top - domWrap.getBoundingClientRect().top + domWrap.scrollTop - offsetHeight / 2)
          if (activeTop) {
            domWrap.scrollTop = activeTop
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
