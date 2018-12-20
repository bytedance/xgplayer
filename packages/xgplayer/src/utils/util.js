let util = {}

util.createDom = function (el = 'div', tpl = '', attrs = {}, cname = '') {
  let dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    let key = item
    let value = attrs[item]
    if (el === 'video' || el === 'audio') {
      if (value) {
        dom.setAttribute(key, value)
      }
    } else {
      dom.setAttribute(key, value)
    }
  })
  return dom
}

util.hasClass = function (el, className) {
  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

util.addClass = function (el, className) {
  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!util.hasClass(el, className)) {
    el.className += ' ' + className
  }
}

util.removeClass = function (el, className) {
  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (util.hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    })
  }
}

util.toggleClass = function (el, className) {
  className.split(/\s+/g).forEach(item => {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item)
    } else {
      util.addClass(el, item)
    }
  })
}

util.findDom = function (el = document, sel) {
  let dom
  // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
  try {
    dom = el.querySelector(sel)
  } catch (e) {
    if (sel.startsWith('#')) {
      dom = el.getElementById(sel.slice(1))
    }
  }
  return dom
}

util.padStart = function (str, length, pad) {
  let charstr = String(pad)
  let len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  let chars = []
  let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

util.format = function (time) {
  if (window.isNaN(time)) {
    return ''
  }
  let hour = util.padStart(Math.floor(time / 3600), 2, 0)
  let minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  let second = util.padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}

util.event = function (e) {
  if (e.touches) {
    let touch = e.touches[0] || e.changedTouches[0]
    e.clientX = touch.clientX || 0
    e.clientY = touch.clientY || 0
    e.offsetX = touch.pageX - touch.target.offsetLeft
    e.offsetY = touch.pageY - touch.target.offsetTop
  }
  e._target = e.target || e.srcElement
}

util.typeOf = function (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

util.deepCopy = function (dst, src) {
  if (util.typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
    Object.keys(src).forEach(key => {
      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key]
        } else {
          util.deepCopy(dst[key], src[key])
        }
      } else if (util.typeOf(src[key]) === 'Array') {
        dst[key] = util.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key]
      } else {
        dst[key] = src[key]
      }
    })
    return dst
  }
}
util.getBgImage = function (el) {
  let a = document.createElement('a')
  let url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage
  a.href = url.replace(/url\("|"\)/g, '')
  return a.href
}

util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    let back = document.createElement(dom.tagName)
    Array.prototype.forEach.call(dom.attributes, (node) => {
      back.setAttribute(node.name, node.value)
    })
    return back
  } else {
    return ''
  }
}

util.setInterval = function (context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency)
  }
}

util.clearInterval = function (context, eventName) {
  clearInterval(context._interval[eventName])
  context._interval[eventName] = null
}

util.createImgBtn = function (name, imgUrl, width, height) {
  let btn = util.createDom(`xg-${name}`, '', {}, `xgplayer-${name}-img`)
  btn.style.backgroundImage = `url("${imgUrl}")`
  if (width && height) {
    let w, h, unit
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every((item) => {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = parseFloat(width.slice(0, width.indexOf(item)).trim())
        h = parseFloat(height.slice(0, height.indexOf(item)).trim())
        unit = item
        return false
      } else {
        return true
      }
    })
    btn.style.width = `${w}${unit}`
    btn.style.height = `${h}${unit}`
    btn.style.backgroundSize = `${w}${unit} ${h}${unit}`
    if (name === 'start') {
      btn.style.margin = `-${h / 2}${unit} auto auto -${w / 2}${unit}`
    } else {
      btn.style.margin = 'auto 5px auto 5px'
    }
  }
  return btn
}

util.Hex2RGBA = function (hex, alpha) {
  let rgb = [] // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    let sixHex = '#'
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw
    })
    hex = sixHex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      rgb.push(eval('0x' + kw))
    })
    return `rgba(${rgb.join(',')}, ${alpha})`
  } else {
    return 'rgba(255, 255, 255, 0.1)'
  }
}

export default util
