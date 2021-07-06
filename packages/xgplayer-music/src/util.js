// @filename https://gist.github.com/chaping/88813f56e75b0fd43f8c
let lastTime = 0
const prefixes = 'webkit moz ms o'.split(' ') // 各浏览器前缀

let requestAnimationFrame = window.requestAnimationFrame
let cancelAnimationFrame = window.cancelAnimationFrame

let prefix
// 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break
  }
  prefix = prefixes[i]
  requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame']
  cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']
}

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function (callback, element) {
    const currTime = new Date().getTime()
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = window.setTimeout(function () {
      callback.call(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

  cancelAnimationFrame = function (id) {
    window.clearTimeout(id)
  }
}

const isSqrt = function (num, base) {
  if (num !== 1) {
    while (num !== 1) {
      if (num % base === 0) {
        num = num / base
      } else {
        return false
      }
    }
    return true
  } else {
    return true
  }
}

class Color {
  constructor (color, opacity = 1) {
    this.color = Color.Valid.test(color) ? color : '#ffffff'
    this.opacity = opacity
  }

  toArray () {
    let color = this.color.slice(1)
    let rgb = []
    if (color.length === 6) {
      color = color.match(/\d{2}/g)
      rgb = color.map((item) => {
        return Number(`0x${item}`)
      })
    }
    return rgb
  }

  toRGB () {
    const rgb = this.toArray()
    return rgb.length === 3 ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : ''
  }

  toGRBA () {
    const rgb = this.toArray()
    return rgb.length === 3 ? `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${this.opacity})` : ''
  }

  static get Valid () {
    return /^#[0-9A-F]{6}$|^#[0-9A-F]{3}$/i
  }
}

export default {
  requestAnimationFrame,
  cancelAnimationFrame,
  isSqrt,
  Color
}
