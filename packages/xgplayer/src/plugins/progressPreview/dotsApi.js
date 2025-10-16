import { Util, Events } from '../../plugin'

const ISPOT = {
  time: 0, // 进度条在此时间戳打点 单位为s
  text: '', // 打点处的自定义文案
  image: '', // 打点处的自定义图片URL
  type: 'image', // 故事点类型：image-带图片模式，text-纯文本模式
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
  _updateDotDom (iSpot, dotDom) {
    if (!dotDom) {
      return
    }
    const ret = this.calcuPosition(iSpot.time, iSpot.duration)
    const style = iSpot.style || {}
    style.left = `${ret.left}%`
    style.width = `${ret.width}%`
    dotDom.setAttribute('data-text', iSpot.text)
    dotDom.setAttribute('data-image', iSpot.image || '')
    dotDom.setAttribute('data-time', iSpot.time)
    dotDom.setAttribute('data-type', iSpot.type || 'image')
    dotDom.setAttribute('data-spot-mode-text-sub-title', iSpot.spotModeTextSubTitle || '')
    dotDom.setAttribute('data-spot-mode-image-sub-title', iSpot.spotModeImageSubTitle || '')
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
    const ret = this.calcuPosition(iSpot.time, iSpot.duration)
    const style = iSpot.style || {}
    style.left = `${ret.left}%`
    style.width = `${ret.width}%`
    let className = `xgspot_${iSpot.id} xgplayer-spot`
    ret.isMini && (className += ' mini')
    const _t = iSpot.template ? `<div class="xgplayer-spot-pop">${iSpot.template}</div>` : ''
    const dotDom = Util.createDom('xg-spot', _t, {
      'data-text': iSpot.text,
      'data-image': iSpot.image || '',
      'data-time': iSpot.time,
      'data-type': iSpot.type || 'image',
      'data-id': iSpot.id,
      'data-spot-mode-text-sub-title': iSpot.spotModeTextSubTitle || '',
      'data-spot-mode-image-sub-title': iSpot.spotModeImageSubTitle || ''
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
   * 动态更新指定ID的图片地址
   * @param {string | number} id 故事点ID
   * @param {string} imageUrl 新的图片地址
   * @param {boolean} needShow 是否需要显示该故事点
   */
  updateDotImage (id, imageUrl, needShow = false) {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }

    // 更新内存中的数据
    const dot = this.findDot(id)
    if (dot) {
      dot.image = imageUrl
    }

    if (!this.ispotsInit) {
      return
    }

    // 更新DOM中的数据
    const dotDom = progress.find(`xg-spot[data-id="${id}"]`)
    if (dotDom) {
      dotDom.setAttribute('data-image', imageUrl || '')

      // 检查是否当前正在hover这个故事点
      const isCurrentlyHovered = this._curDot && this._curDot.getAttribute('data-id') === String(id)

      // 如果当前正在显示这个故事点的预览，需要实时更新预览内容
      if (isCurrentlyHovered || this._activeDotId === id || needShow) {
        if (needShow) {
          this.showDot(id)
        } else if (isCurrentlyHovered) {
          // 如果当前正在hover这个点，实时更新预览内容而不隐藏
          const spotText = dotDom.getAttribute('data-text')
          const spotType = dotDom.getAttribute('data-type') || 'image'
          const spotModeTextSubTitle = dotDom.getAttribute('data-spot-mode-text-sub-title')
          const spotModeImageSubTitle = dotDom.getAttribute('data-spot-mode-image-sub-title')

          // 确保使用当前的时间字符串，如果没有则格式化时间
          let timeStr = this.timeStr
          if (!timeStr && dot && dot.time !== undefined) {
            timeStr = this.formatTime(dot.time)
          }

          // 直接更新预览内容，保持显示状态
          console.log(`实时更新故事点 ${id} 的图片预览: ${imageUrl}`)
          this.showTips(spotText, false, timeStr, imageUrl, spotType, spotModeTextSubTitle, spotModeImageSubTitle)

          // 强制更新图片元素，确保图片能够立即显示
          if (spotType === 'image' && imageUrl && this.tipImage) {
            // 直接设置图片源，确保更新生效
            this.tipImage.src = imageUrl
            this.tipImage.style.display = 'block'
            console.log(`强制更新图片元素: ${imageUrl}`)
          }
        }
      }
    }
  },

  /**
   * 格式化时间显示
   * @param {number} time 时间（秒）
   * @returns {string} 格式化后的时间字符串
   */
  formatTime (time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
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
  plugin.on(Events.VIDEO_RESIZE, () => {
    plugin.positionDots()
  })
}
