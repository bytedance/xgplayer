import Plugin from '../../plugin'

const {Util, Events} = Plugin

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

const APIS = {
  initDots () {
    this._ispots.map(item => {
      this.createDot(item, false)
    })
    this._ispotsInit = true
  },
  /**
   * 创建一个故事点
   * @param {Object} iSpot
   * @param {boolean} isNew
   */
  createDot (iSpot, isNew = true) {
    const {progress} = this.player.plugins
    if (!progress) {
      return
    }
    if (isNew) {
      mergeISPOT(iSpot)
      this._ispots.push(iSpot)
    }
    if (!this._ispotsInit && isNew) {
      return
    }
    const ret = this.calcuPosition(iSpot.time, iSpot.duration)
    const style = iSpot.style || {}
    style.left = `${ret.left}%`
    style.width = `${ret.width}%`
    let className = `xgspot_${iSpot.id} xgplayer-spot`
    ret.isMini && (className += ' mini')
    const dotDom = Util.createDom('xg-spot', '', {
      'data-text': iSpot.text,
      'data-time': iSpot.time,
      'data-id': iSpot.id,
      'id': `xgspot_${iSpot.id}`
    }, className)
    Object.keys(style).map(key => {
      dotDom.style[key] = style[key]
    })
    progress.outer && progress.outer.appendChild(dotDom)
  },

  /**
   * 根据id查找节点
   * @param {String} id
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
   * @param {Object} iSpot
   * @param {Boolean} needShow
   */
  updateDot (iSpot, needShow = false) {
    const {progress} = this.player.plugins
    if (!progress) {
      return
    }
    const dot = this.findDot(iSpot.id)
    if (dot) {
      Object.keys(iSpot).map(key => {
        dot[key] = iSpot[key]
      })
    }
    if (!this._ispotsInit) {
      return
    }
    const dotDom = progress.find(`xg-spot[data-id="${iSpot.id}"]`)

    const ret = this.calcuPosition(iSpot.time, iSpot.duration)
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
    if (needShow) {
      this.showDot(iSpot.id)
    }
  },

  /**
   * 删除某个故事点
   * @param {String} id
   */
  deleteDot (id) {
    const {ispots} = this
    const {progress} = this.player.plugins
    if (!progress) {
      return
    }
    let index = -1
    for (let i = 0; i < ispots.length; i++) {
      if (ispots[i].id === id) {
        index = i
      }
    }
    index > -1 && ispots.splice(index, 1)
    if (index > -1 && this._ispotsInit) {
      const dotDom = progress.find(`#xgspot_${id}`)
      dotDom && progress.outer && progress.outer.removeChild(dotDom)
    }
  },

  /**
   * 移除所有的故事点
   */
  deleteAllDots () {
    const {progress} = this.player.plugins
    if (!progress) {
      return
    }
    if (!this._ispotsInit) {
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
    const {progress} = this.player.plugins
    if (!progress) {
      return
    }
    if (!this._ispotsInit) {
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
    iSpots.map((ispot, index) => {
      if (index < len) {
        dotDoms[index].setAttribute('data-id', `${ispot.id}`)
        this._ispots.push(ispot)
        this.updateDot(ispot)
      } else {
        this.createDot(ispot)
      }
    })
  }
}

export default function initDotsAPI (plugin) {
  const {config, player} = plugin
  Object.keys(APIS).map(item => {
    plugin[item] = APIS[item].bind(plugin)
  })
  const ispots = player.config.progressDot || config.ispots || []
  plugin._ispots = ispots.map(item => {
    mergeISPOT(item)
    return item
  })
  plugin._ispotsInit = false
  player.once(Events.DURATION_CHANGE, () => {
    plugin.initDots()
  })
}
