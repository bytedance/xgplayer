import {Util} from '../../plugin'

const TPL = [
  {tag: 'xg-cache', className: 'xgplayer-progress-cache', styleKey: 'cachedColor'},
  {tag: 'xg-played', className: 'xgplayer-progress-played', styleKey: 'playedColor'}
]

export default class InnerList {
  constructor (args) {
    this.fragments = args.fragments || []
    this.focusClass = 'inner-focus'
    this.style = args.style || {
      playedColor: '',
      cachedColor: '',
      progressColor: ''
    }
    this.duration = 0
    this.cachedIndex = 0
    this.playedIndex = 0
  }

  updateDuration (duration) {
    this.duration = parseInt(duration * 1000)
    let start = 0
    const { fragments } = this
    this.fragments = fragments.map(item => {
      item.start = start;
      item.end = start + item.percent * this.duration;
      item.duration = item.percent * this.duration;
      start += item.percent * this.duration;
      return item;
    })
  }

  updateProgress (type = 'played', data = {newIndex: 0, curIndex: 0, millisecond: 0}) {
    const {progressList, fragments} = this
    const {newIndex, curIndex, millisecond} = data
    if (newIndex !== curIndex) {
      progressList.map((item, index) => {
        if (index < newIndex) {
          item[type].style.width = `100%`
        } else if (index > newIndex) {
          item[type].style.width = 0
        }
      })
    }
    const curPFrag = fragments[newIndex]
    const per = (millisecond - curPFrag.start) / curPFrag.duration
    progressList[newIndex][type].style.width = per < 0 ? 0 : `${per * 100}%`
  }

  update (data = {cached: 0, played: 0}, duration) {
    if (!this.duration || parseInt(duration * 1000, 10) !== this.duration) {
      if (!duration) {
        return;
      }
      this.updateDuration(duration)
    }

    const {playedIndex, cachedIndex} = this
    if (data.played) {
      const newPIndex = this.findIndex(data.played * 1000, playedIndex)
      this.updateProgress('played', {
        newIndex: newPIndex,
        curIndex: playedIndex,
        millisecond: parseInt(data.played * 1000, 10)})
      this.playedIndex = newPIndex
    }

    if (data.cached) {
      const newCIndex = this.findIndex(data.cached * 1000, cachedIndex)
      this.updateProgress('cached', {
        newIndex: newCIndex,
        curIndex: cachedIndex,
        millisecond: parseInt(data.cached * 1000, 10)})
      this.cachedIndex = newCIndex
    }
  }

  findIndex (time, curIndex) {
    const {fragments} = this
    if (fragments.length === 1) {
      return 0
    }
    if (time > fragments[curIndex].start && time < fragments[curIndex].end) {
      return curIndex
    }
    this.fragments.map((item, index) => {
      if (time > item.start && time <= item.end) {
        curIndex = index
      }
    })
    return curIndex
  }

  findHightLight () {
    const children = this.root.children
    for (let i = 0; i < children.length; i++) {
      if (Util.hasClass(children[i], this.focusClass)) {
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
      Util.removeClass(children[i], this.focusClass)
    }
  }

  setHightLight (index) {
    const children = this.root.children
    if (index < children.length) {
      Util.addClass(children[index], this.focusClass)
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

  render () {
    const {progressColor} = this.style
    this.root = Util.createDom('xg-inners', '', {}, 'progress-list')
    if (this.fragments) {
      this.progressList = this.fragments.map((item) => {
        const inner = Util.createDom('xg-inner', '', {
          style: progressColor ? `background:${progressColor}; flex: ${item.percent}` : `flex: ${item.percent}`
        }, `${item.isFocus ? 'inner-focus' : ''} xgplayer-progress-inner`)

        this.root.appendChild(inner);

        TPL.map(item => {
          inner.appendChild(Util.createDom(item.tag, '', {
            style: item.styleKey ? `background: ${this.style[item.styleKey]}; width:0;` : 'width:0;'
          }, item.className))
        });

        return {
          cached: inner.children[0],
          played: inner.children[1]
        }
      })
    }
    return this.root
  }
}
