import { typeOf, hasClass, addClass, removeClass, createDom } from '../../utils/util'

const TPL = [
  { tag: 'xg-cache', className: 'xgplayer-progress-cache', styleKey: 'cachedColor' },
  { tag: 'xg-played', className: 'xgplayer-progress-played', styleKey: 'playedColor' }
]

export default class InnerList {
  constructor (args) {
    this.fragments = args.fragments || []
    if (this.fragments.length === 0) {
      this.fragments.push({ percent: 1 })
    }
    this._callBack = args.actionCallback
    this.fragConfig = {
      fragFocusClass: args.fragFocusClass || 'inner-focus-point', // 'inner-focus',
      fragAutoFocus: !!args.fragAutoFocus,
      fragClass: args.fragClass || ''
    }
    this.style = args.style || {
      playedColor: '',
      cachedColor: '',
      progressColor: ''
    }
    this.duration = 0
    this.cachedIndex = 0
    this.playedIndex = 0
    this.focusIndex = -1
  }

  updateDuration (duration) {
    this.duration = duration
    let start = 0
    const { fragments } = this
    this.fragments = fragments.map(item => {
      item.start = parseInt(start, 10)
      item.end = parseInt(start + item.percent * this.duration, 10)
      item.duration = parseInt(item.percent * this.duration, 10)
      start += item.percent * this.duration
      return item
    })
  }

  updateProgress (type = 'played', data = { newIndex: 0, curIndex: 0, millisecond: 0 }) {
    const { progressList, fragments } = this
    if (progressList.length < 1) {
      return
    }
    const { newIndex, curIndex, millisecond } = data
    if (newIndex !== curIndex) {
      progressList.map((item, index) => {
        if (index < newIndex) {
          item[type].style.width = '100%'
        } else if (index > newIndex) {
          item[type].style.width = 0
        }
      })
    }
    const curPFrag = fragments[newIndex]
    const per = millisecond === 0 ? 0 : (millisecond - curPFrag.start) / curPFrag.duration
    progressList[newIndex][type].style.width = per < 0 ? 0 : `${per * 100}%`
  }

  updateFocus (data) {
    if (!this.fragConfig.fragAutoFocus || this.fragments.length < 2) {
      return
    }
    if (!data) {
      // 取消焦点
      if (this.focusIndex > -1) {
        this.unHightLight(this.focusIndex)
        const _data = {
          index: -1,
          preIndex: this.focusIndex,
          fragment: null
        }
        this._callBack && this._callBack(_data)
        this.focusIndex = -1
      }
      return
    }
    const newPIndex = this.findIndex(data.currentTime * 1000, this.focusIndex)
    if (newPIndex >= 0 && newPIndex !== this.focusIndex) {
      this.focusIndex > -1 && this.unHightLight(this.focusIndex)
      this.setHightLight(newPIndex)
      const _data = {
        index: newPIndex,
        preIndex: this.focusIndex,
        fragment: this.fragments[this.focusIndex]
      }
      this.focusIndex = newPIndex
      this._callBack && this._callBack(_data)
    }
  }

  update (data = { cached: 0, played: 0 }, duration) {
    if (!this.duration || parseInt(duration * 1000, 10) !== this.duration) {
      if (!duration && duration !== 0) {
        return
      }
      this.updateDuration(parseInt(duration * 1000, 10))
    }
    const { playedIndex, cachedIndex } = this
    if (typeOf(data.played) !== 'Undefined') {
      const newPIndex = this.findIndex(data.played * 1000, playedIndex)
      if (newPIndex < 0) {
        return
      }
      this.updateProgress('played', {
        newIndex: newPIndex,
        curIndex: playedIndex,
        millisecond: parseInt(data.played * 1000, 10)
      })
      this.playedIndex = newPIndex
    }

    if (typeOf(data.cached) !== 'Undefined') {
      const newCIndex = this.findIndex(data.cached * 1000, cachedIndex)
      if (newCIndex < 0) {
        return
      }
      this.updateProgress('cached', {
        newIndex: newCIndex,
        curIndex: cachedIndex,
        millisecond: parseInt(data.cached * 1000, 10)
      })
      this.cachedIndex = newCIndex
    }
  }

  findIndex (time, curIndex) {
    const { fragments } = this
    if (!fragments || fragments.length === 0) {
      return -1
    }
    if (fragments.length === 1) {
      return 0
    }
    if (curIndex > -1 && curIndex < fragments.length && time > fragments[curIndex].start && time < fragments[curIndex].end) {
      return curIndex
    }
    if (time > fragments[fragments.length - 1].start) {
      return fragments.length - 1
    }

    for (let i = 0; i < fragments.length; i++) {
      if (time > fragments[i].start && time <= fragments[i].end) {
        curIndex = i
        break
      }
    }
    return curIndex
  }

  findHightLight () {
    const children = this.root.children
    for (let i = 0; i < children.length; i++) {
      if (hasClass(children[i], this.fragConfig.fragFocusClass)) {
        return {
          dom: children[i],
          pos: children[i].getBoundingClientRect()
        }
      }
    }
  }

  // 根据索引获取进度条片段
  findFragment (index) {
    const children = this.root.children
    if (index < 0 || index >= children.length) {
      return null
    }
    return {
      dom: children[index],
      pos: children[index].getBoundingClientRect()
    }
  }

  unHightLight () {
    const children = this.root.children
    for (let i = 0; i < children.length; i++) {
      removeClass(children[i], this.fragConfig.fragFocusClass)
    }
  }

  setHightLight (index) {
    const children = this.root.children
    if (index < children.length) {
      addClass(children[index], this.fragConfig.fragFocusClass)
      return {
        dom: children[index],
        pos: children[index].getBoundingClientRect()
      }
    }
  }

  destroy () {
    this.progressList = null
    this.fragments = null
    this.root.innerHTML = ''
  }

  /**
   * 重置当前
   * @param {*} newOptions
   */
  reset (newOptions) {
    // 更新fragConfig
    Object.keys(this.fragConfig).forEach(key => {
      if (newOptions[key] !== undefined) {
        this.fragConfig[key] = newOptions[key]
      }
    })
    if (newOptions.fragments) {
      this.fragments = newOptions.fragments.length === 0 ? [{ percent: 1 }] : newOptions.fragments
      this.updateDuration(this.duration)
      this.playedIndex = 0
      this.cachedIndex = 0
      // 移除分段信息
      if (this.root) {
        const _c = this.root.children
        while (_c.length > 0) {
          this.root.removeChild(_c[0])
        }
      }
      // 重新渲染
      this.render()
    }
  }

  render () {
    const { progressColor } = this.style
    if (!this.root) {
      this.root = createDom('xg-inners', '', {}, 'progress-list')
    }
    if (this.fragments) {
      const { fragClass, fragFocusClass } = this.fragConfig
      this.progressList = this.fragments.map((item) => {
        const inner = createDom('xg-inner', '', {
          style: progressColor ? `background:${progressColor}; flex: ${item.percent}` : `flex: ${item.percent}`
        }, `${item.isFocus ? fragFocusClass : ''} xgplayer-progress-inner ${fragClass}`)

        this.root.appendChild(inner)

        TPL.forEach(item => {
          inner.appendChild(createDom(item.tag, '', {
            style: item.styleKey ? `background: ${this.style[item.styleKey]}; width:0;` : 'width:0;'
          }, item.className))
        })

        return {
          cached: inner.children[0],
          played: inner.children[1]
        }
      })
    }
    return this.root
  }
}
