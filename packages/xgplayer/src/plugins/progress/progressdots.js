import Plugin from '../../plugin'
const defaultDot = {
  time: 10, // 出现的时间点
  text: '', // hover显示的文案
  duration: 1, // 显示时长
  style: {}, // 指定样式
  color: '#fff' // 颜色
}

const {Util, Events} = Plugin
export default class ProgressDot extends Plugin {
  static get pluginName () {
    return 'progressDots'
  }

  static get defaultConfig () {
    return {
      dots: []
    }
  }

  constructor (args) {
    super(args)
    this.dotsList = {}
  }

  afterCreate () {
    this.once(Events.CANPLAY, () => {
      const {dots} = this.config
      if (!dots || !Array.isArray(dots)) {
        return
      }
      dots.map(dot => {
        this.createDotDom(dot)
      })
      this.initEvents()
    })
  }

  initEvents () {
    // this.bind('.xgplayer-progress-dot', 'mouseenter', (e) => {
    //   console.log('mouseenter', e.target)
    // })
    // this.bind('.xgplayer-progress-dot', 'mouseleave', (e) => {
    //   console.log('mouseleave', e.target)
    // })
  }

  addDot (time, text, duration) {
    let newDots = null
    if (arguments.length === 1 && typeof time === 'object') {
      newDots = arguments[0]
    } else {
      newDots = {
        time: time,
        text: text,
        duration: duration
      }
    }
    newDots = Util.deepCopy(arguments[0], defaultDot)
    this.createDotDom(newDots)
  }

  removeDot (time) {
    const {player} = this
    if (time >= 0 && time <= player.duration && this.dotsList[time]) {
      let dot = this.dotsList[time]
      dot.parentNode.removeChild(dot)
      dot = null
      this.dotsList[time] = null
    }
  }

  removeAllProgressDots () {
    Object.keys(this.dotsList).forEach((key) => {
      if (this.dotsList[key]) {
        let dot = this.dotsList[key]
        dot.parentNode.removeChild(dot)
        dot = null
        this.dotsList[key] = null
      }
    })
  }

  createDotDom (dot) {
    const {player} = this
    const dom = Util.createDom('xg-progress-dot', `${dot.text ? `<span class="xgplayer-progress-tip">${dot.text}</span>` : ''}`, {}, 'xgplayer-progress-dot')
    const style = dot.style || {}
    style.left = (dot.time / player.duration) * 100 + '%'
    style.width = (Math.min(dot.duration, player.duration - dot.time) / player.duration) * 100 + '%'
    Object.keys(style).map(item => {
      dom.style[item] = style[item]
    })
    this.dotsList[dot.time] = dom
    this.root.appendChild(dom)
  }

  render () {
    return '<xg-dots></xg-dots>'
  }

  destroy () {

  }
}
