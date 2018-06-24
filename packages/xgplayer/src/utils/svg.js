import pasition from 'pasition'
import './animation'
class SVG {
  constructor (options = {}) {
    this.from = options.from
    this.to = options.to
    this.easing = options.easing || function (t) { return t * t }
    this.duration = options.duration || 150
    this.curPath = ''
    this.progress = options.progress
    this.state = 0// 0=idle,1=busy,2=break off
  }
  animate () {
    let self = this; let beginTime = new Date(); let time = self.duration
    let outShape = null
    let pathA = self.path2shapes(self.from)
    let pathB = self.path2shapes(self.to)
    let pathArr = self._preprocessing(pathA, pathB)
    self.state = 1
    let tick = () => {
      let dt = new Date() - beginTime
      if (dt >= time || self.state === 2) {
        outShape = pathB
        self.progress(outShape, 1)
        window.cancelAnimationFrame(self.tickId)
        self.state = 0
        return
      }
      let percent = self.easing(dt / time)
      outShape = self._lerp(pathArr[0], pathArr[1], percent)
      self.progress(outShape, percent)
      self.tickId = window.requestAnimationFrame(tick)
    }
    tick()
  }
  toSVGString (shapes) {
    return shapes.map(function (shape) {
      shape.forEach(function (point, idx) {
        if (!idx) {
          point.splice(2, 0, 'C')
          point.unshift('M')
        } else {
          point.splice(0, 2, 'C')
        }
      })
      return shape.map(function (point) {
        return point.join(' ')
      }).join('')
    }).join('')
  }
  start () {
    self.animate()
  }
  stop () {
    if (this.state !== 0) {
      this.state = 2
    }
    window.cancelAnimationFrame(self.tickId)
    this.state = 0
  }
  reverse () {
    if (this.state !== 0) {
      this.stop()
    }
    let tmp = this.from
    this.from = this.to
    this.to = tmp
    this.animate()
  }
  reset (to, from = this.from) {
    if (this.state !== 0) {
      this.stop()
    }
    this.from = from
    this.to = to
    this.animate()
  }
}

for (let k in pasition) {
  if (pasition[k] instanceof Function && !SVG.prototype[k]) {
    SVG.prototype[k] = pasition[k]
  }
}

export default SVG
