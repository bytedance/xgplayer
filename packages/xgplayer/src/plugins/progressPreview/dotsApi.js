import { Util, Events } from '../../plugin'

const ISPOT = {
  time: 0, // 进度条在此时间戳打点 单位为s
  text: '', // 打点处的自定义文案
  id: 1, // 标记唯一标识，用于删除的时候索引
  duration: 1, // 进度条标识点的时长 默认1s【可选】单位为s
  color: '#fff', // 进度条标识点的显示颜色【可选】
  style: {}, // 指定样式
  width: 6,
  height: 6
}

function mergeISPOT (iSpot) {
  Object.keys(ISPOT).map(key => {
    if (iSpot[key] === undefined) {
      iSpot[key] = ISPOT[key]
    }
  })
}

export function getOffSetISpot (time, duration, timeSegments) {
  if (!timeSegments || timeSegments.length < 1 ){
    return {
      time,
      duration
    }
  }
  const offsetTime = Util.getOffsetCurrentTime(time, timeSegments)
  const offsetEnd = Util.getOffsetCurrentTime(time + duration, timeSegments)
  const d = offsetEnd - offsetTime
  if (offsetEnd <= offsetTime) {
    return null
  }
  return {
    time: offsetTime,
    duration: d
  }
}

export function getOffSetISpotList (ispots, timeSegments) {
  const ret = []
  ispots.forEach(item => {
    const offsetItem = getOffSetISpot(item.time, item.duration, timeSegments)
    if (offsetItem) {
      ret.push({
        time: offsetItem.time,
        duration: offsetItem.duration,
        id: item.id
      })
    }
  })
  return ret
}

const APIS = {
  _updateDotDom (iSpot, dotDom) {
    if (!dotDom) {
      return
    }
    const offset = getOffSetISpot(iSpot.time, iSpot.duration, this.player.timeSegments)
    if (!offset) {
      return
    }
    const ret = this.calcuPosition(offset.time, offset.duration)
    const style = iSpot.style || {}
    style.left = `${ret.left}%`
    style.width = `${ret.width}%`
    dotDom.setAttribute('data-text', iSpot.text)
    dotDom.setAttribute('data-time', iSpot.time)
    if (ret.isMini) {
      Util.addClass(dotDom, 'mini')
    } else {
      Util.removeClass(dotDom, 'mini')
    }
    Object.keys(style).map(key => {
      dotDom.style[key] = style[key]
    })
  },

  initDots () {
    this._ispots.map(item => {
      this.createDot(item, false)
    })
    this.ispotsInit = true
  },

  /**
   * 创建一个故事点
   * @param { object } iSpot
   * @param { boolean } isNew
   */
  createDot (iSpot, isNew = true) {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    if (isNew) {
      mergeISPOT(iSpot)
      this._ispots.push(iSpot)
    }
    if (!this.ispotsInit && isNew) {
      return
    }
    const offset = getOffSetISpot(iSpot.time, iSpot.duration, this.player.timeSegments)
    if (!offset) {
      return
    }
    const ret = this.calcuPosition(offset.time, offset.duration)
    if (!ret) {
      return
    }
    const style = iSpot.style || {}
    style.left = `${ret.left}%`
    style.width = `${ret.width}%`
    let className = `xgspot_${iSpot.id} xgplayer-spot`
    ret.isMini && (className += ' mini')
    const _t = iSpot.template ? `<div class="xgplayer-spot-pop">${iSpot.template}</div>` : ''
    const dotDom = Util.createDom('xg-spot', _t, {
      'data-text': iSpot.text,
      'data-time': iSpot.time,
      'data-id': iSpot.id
    }, className)
    Object.keys(style).map(key => {
      dotDom.style[key] = style[key]
    })
    progress.outer && progress.outer.appendChild(dotDom)
    this.positionDot(dotDom, iSpot.id)
  },

  /**
   * 根据id查找节点
   * @param {string} id
   */
  findDot (id) {
    if (!this.player.plugins.progress) {
      return
    }
    const ret = this._ispots.filter((cur, index) => {
      return cur.id === id
    })
    return ret.length > 0 ? ret[0] : null
  },

  /**
   * 更新故事点
   * @param {any} iSpot
   * @param {boolean} needShow
   */
  updateDot (iSpot, needShow = false) {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    const dot = this.findDot(iSpot.id)
    if (dot) {
      Object.keys(iSpot).map(key => {
        dot[key] = iSpot[key]
      })
    }
    if (!this.ispotsInit) {
      return
    }
    const dotDom = progress.find(`xg-spot[data-id="${iSpot.id}"]`)
    if (!dotDom) {
      return
    }
    this._updateDotDom(iSpot, dotDom)
    if (needShow) {
      this.showDot(iSpot.id)
    }
  },

  /**
   * 删除某个故事点
   * @param {string | number } id
   */
  deleteDot (id) {
    const { _ispots } = this
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    const del = []
    for (let i = 0; i < _ispots.length; i++) {
      if (_ispots[i].id === id) {
        del.push(i)
      }
    }
    const len = del.length
    for (let i = len - 1; i >= 0; i--) {
      _ispots.splice(del[i], 1)
      if (this.ispotsInit) {
        const dotDom = progress.find(`xg-spot[data-id="${id}"]`)
        if (dotDom) {
          dotDom.parentElement.removeChild(dotDom)
        }
      }
    }
  },

  /**
   * 移除所有的故事点
   */
  deleteAllDots () {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    if (!this.ispotsInit) {
      this._ispots = []
      return
    }
    const dotDoms = progress.root.getElementsByTagName('xg-spot')
    for (let i = dotDoms.length - 1; i >= 0; i--) {
      progress.outer.removeChild(dotDoms[i])
    }
    this._ispots = []
  },
  /**
   * 批量全部更新当前故事点
   * @param {Array} iSpots
   */
  updateAllDots (iSpots = []) {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    if (!this.ispotsInit) {
      this._ispots = iSpots
      return
    }
    this._ispots = []
    const dotDoms = progress.root.getElementsByTagName('xg-spot')
    const len = dotDoms.length
    if (len > iSpots.length) {
      for (let i = len - 1; i > iSpots.length - 1; i--) {
        progress.outer.removeChild(dotDoms[i])
      }
    }
    iSpots.forEach((ispot, index) => {
      if (index < len) {
        dotDoms[index].setAttribute('data-id', `${ispot.id}`)
        this._ispots.push(ispot)
        this.updateDot(ispot)
      } else {
        this.createDot(ispot)
      }
    })
  },

  positionDots () {
    const { _ispots, playerSize } = this
    const { sizeInfo } = this.player
    const { progress } = this.player.plugins
    if (!progress || sizeInfo.width === playerSize.width) {
      return
    }
    playerSize.width = sizeInfo.width
    playerSize.left = sizeInfo.left
    _ispots.forEach(item => {
      const dotDom = progress.find(`xg-spot[data-id="${item.id}"]`)
      dotDom && this.positionDot(dotDom, item.id)
    })
  },

  positionDot (dotDom, id) {
    const _pop = Util.findDom(dotDom, '.xgplayer-spot-pop')
    if (!_pop) {
      return
    }
    const pRect = this.playerSize

    const rect1 = dotDom.getBoundingClientRect()
    const rect = _pop.getBoundingClientRect()
    const _left = rect1.left - pRect.left
    const _diff = pRect.width - _left - rect1.width / 2
    if (_left < rect.width / 2 || pRect.width < rect.width) {
      const t = rect.width / 2 - _left
      _pop.style.left = `${t}px`
    } else if (_diff < rect.width / 2) {
      const t = _diff - rect.width / 2 + rect1.width / 2
      _pop.style.left = `${t}px`
    } else {
      _pop.style.left = '50%'
    }
  },

  updateDuration () {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    const { _ispots } = this
    _ispots.forEach(item => {
      const dotDom = progress.find(`xg-spot[data-id="${item.id}"]`)
      this._updateDotDom(item, dotDom)
    })
  },

  getAllDotsDom () {
    const { progress } = this.player.plugins
    if (!progress) {
      return []
    }
    const dotDoms = progress.root.getElementsByTagName('xg-spot')
    return dotDoms
  },

  getDotDom (id) {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    return progress.find(`xg-spot[data-id="${id}"]`)
  }
}

export default function initDotsAPI (plugin) {
  const { config, player } = plugin
  Object.keys(APIS).map(item => {
    plugin[item] = APIS[item].bind(plugin)
  })
  const ispots = player.config.progressDot || config.ispots || []
  plugin._ispots = ispots.map(item => {
    mergeISPOT(item)
    return item
  })
  plugin.ispotsInit = false
  plugin.playerSize = {
    left: player.sizeInfo.left,
    width: player.sizeInfo.width
  }
  plugin.on(Events.DURATION_CHANGE, () => {
    if (!plugin.ispotsInit) {
      plugin.initDots()
    } else {
      // 更新节点
      plugin.updateDuration()
    }
  })
  plugin.on('timesegments_change', (data) => {
    plugin.updateAllDots(ispots)
  })
}