import XG_DEBUG from './debug'
const util = {}

util.createDom = function (el = 'div', tpl = '', attrs = {}, cname = '') {
  const dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    const key = item
    const value = attrs[item]
    if (el === 'video' || el === 'audio' || el === 'mobile-video') {
      if (value) {
        dom.setAttribute(key, value)
      }
    } else {
      dom.setAttribute(key, value)
    }
  })
  return dom
}

util.createDomFromHtml = function (html, attrs = {}, classname = '') {
  try {
    let doc = document.createElement('div')
    doc.innerHTML = html
    let dom = doc.children
    doc = null
    if (dom.length > 0) {
      dom = dom[0]
      classname && util.addClass(dom, classname)
      if (attrs) {
        Object.keys(attrs).forEach(key => {
          dom.setAttribute(key, attrs[key])
        })
      }
      return dom
    }
    return null
  } catch (err) {
    XG_DEBUG.logError('util.createDomFromHtml', err)
    return null
  }
}

util.hasClass = function (el, className) {
  if (!el) {
    return false
  }
  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else {
    const orgClassName = el.className && typeof el.className === 'object' ? el.getAttribute('class') : el.className
    return orgClassName && !!orgClassName.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

util.addClass = function (el, className) {
  if (!el) {
    return
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!util.hasClass(el, className)) {
    if (el.className && typeof el.className === 'object') {
      el.setAttribute('class', el.getAttribute('class') + ' ' + className)
    } else {
      el.className += ' ' + className
    }
  }
}

util.removeClass = function (el, className) {
  if (!el) {
    return
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (util.hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      const reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      if (el.className && typeof el.className === 'object') {
        el.setAttribute('class', el.getAttribute('class').replace(reg, ' '))
      } else {
        el.className = el.className.replace(reg, ' ')
      }
    })
  }
}

util.toggleClass = function (el, className) {
  if (!el) {
    return
  }

  className.split(/\s+/g).forEach(item => {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item)
    } else {
      util.addClass(el, item)
    }
  })
}

util.classNames = function () {
  let classname = ''
  for (let i = 0; i < arguments.length; i++) {
    if (util.typeOf(arguments[i]) === 'String') {
      classname += `${arguments[i]}`
    } else if (util.typeOf(arguments[i]) === 'Object') {
      Object.keys(arguments[i]).map(key => {
        if (arguments[i][key]) {
          classname += key
        }
      })
    }
    if (i < arguments.length - 1) {
      classname += ' '
    }
  }
  return classname
}

util.findDom = function (el = document, sel) {
  let dom
  // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
  try {
    dom = el.querySelector(sel)
  } catch (e) {
    XG_DEBUG.logError('util.findDom', e)
    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1))
    }
  }
  return dom
}

util.getCss = function (dom, key) {
  return dom.currentStyle ? dom.currentStyle[key] : document.defaultView.getComputedStyle(dom, false)[key]
}

util.padStart = function (str, length, pad) {
  const charstr = String(pad)
  const len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  const chars = []
  const r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

util.format = function (time) {
  if (window.isNaN(time)) {
    return ''
  }
  time = Math.round(time)
  const hour = util.padStart(Math.floor(time / 3600), 2, 0)
  const minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  const second = util.padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}

util.event = function (e) {
  if (e.touches) {
    const touch = e.touches[0] || e.changedTouches[0]
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
      // eslint-disable-next-line no-undef
      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (dst[key] === undefined || dst[key] === undefined) {
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

util.deepMerge = function (dst, src) {
  Object.keys(src).map(key => {
    if (util.typeOf(src[key]) === 'Array' && util.typeOf(dst[key]) === 'Array') {
      if (util.typeOf(dst[key]) === 'Array') {
        dst[key].push(...src[key])
      }
    } else if (util.typeOf(dst[key]) === util.typeOf(src[key]) && dst[key] !== null && util.typeOf(dst[key]) === 'Object' && !(src[key] instanceof window.Node)) {
      util.deepMerge(dst[key], src[key])
    } else {
      src[key] !== null && (dst[key] = src[key])
    }
  })
  return dst
}

util.getBgImage = function (el) {
  // fix: return current page url when url is none
  const url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage
  if (!url || url === 'none') {
    return ''
  }
  const a = document.createElement('a')
  a.href = url.replace(/url\("|"\)/g, '')
  return a.href
}

util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    const back = document.createElement(dom.tagName)
    Array.prototype.forEach.call(dom.attributes, (node) => {
      back.setAttribute(node.name, node.value)
    })
    if (dom.innerHTML) {
      back.innerHTML = dom.innerHTML
    }
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

util.setTimeout = function (context, fun, time) {
  if (!context._timers) {
    context._timers = []
  }
  const id = setTimeout(() => {
    fun()
    util.clearTimeout(context, id)
  }, time)
  context._timers.push(id)
  return id
}

util.clearTimeout = function (context, id) {
  const { _timers } = context
  if (util.typeOf(_timers) === 'Array') {
    for (let i = 0; i < _timers.length; i++) {
      if (_timers[i] === id) {
        _timers.splice(i, 1)
        clearTimeout(id)
        break
      }
    }
  } else {
    clearTimeout(id)
  }
}

util.clearAllTimers = function (context) {
  const { _timers } = context
  if (util.typeOf(_timers) === 'Array') {
    _timers.map(item => {
      clearTimeout(item)
    })
    context._timerIds = []
  }
}

util.createImgBtn = function (name, imgUrl, width, height) {
  const btn = util.createDom(`xg-${name}`, '', {}, `xgplayer-${name}-img`)
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
  const rgb = [] // 定义rgb数组
  // eslint-disable-next-line no-useless-escape
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    let sixHex = '#'
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw
    })
    hex = sixHex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      rgb.push(parseInt(kw, 16))
    })
    return `rgba(${rgb.join(',')}, ${alpha})`
  } else {
    return 'rgba(255, 255, 255, 0.1)'
  }
}

util.getFullScreenEl = function () {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
}

util.checkIsFunction = function (fun) {
  return fun && typeof fun === 'function'
}

util.checkIsObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}

util.hide = function (dom) {
  dom.style.display = 'none'
}

util.show = function (dom, display) {
  dom.style.display = display || 'block'
}

util.isUndefined = function (val) {
  if (typeof val === 'undefined' || val === null) {
    return true
  }
}

util.setStyleFromCsstext = function (dom, text) {
  // dom.setAttribute(style, text)
  if (!text) {
    return
  }
  if (util.typeOf(text) === 'String') {
    const styleArr = text.replace(/\s+/g, '').split(';')
    styleArr.map(item => {
      if (item) {
        const arr = item.split(':')
        if (arr.length > 1) {
          dom.style[arr[0]] = arr[1]
        }
      }
    })
  } else {
    Object.keys(text).map(key => {
      dom.style[key] = text[key]
    })
  }
}

function checkIsIn (key, list) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (key.indexOf(list[i]) > -1) {
      return true
    }
  }
  return false
}

util.filterStyleFromText = function (dom, list = ['width', 'height', 'top', 'left', 'bottom', 'right', 'position', 'z-index', 'padding', 'margin', 'transform']) {
  const _cssText = dom.style.cssText
  if (!_cssText) {
    return {}
  }
  const styleArr = _cssText.replace(/\s+/g, '').split(';')
  const ret = {}
  const remain = {}
  styleArr.map(item => {
    if (item) {
      const arr = item.split(':')
      if (arr.length > 1) {
        if (checkIsIn(arr[0], list)) {
          ret[arr[0]] = arr[1]
          // dom.style[arr[0]] = 'initial'
        } else {
          remain[arr[0]] = arr[1]
        }
      }
    }
  })
  dom.setAttribute('style', '')
  Object.keys(remain).map(key => {
    // netStyle += `${key}: ${remain[key]};`
    dom.style[key] = remain[key]
  })
  // dom.setAttribute('style', netStyle)
  // Object.keys(remain).map(key => {
  //   dom.style[key] = remain[key]
  // })
  // console.log('remain', remain, netStyle)
  return ret
}

util.getStyleFromCsstext = function (dom) {
  const _cssText = dom.style.cssText
  if (!_cssText) {
    return {}
  }
  const styleArr = _cssText.replace(/\s+/g, '').split(';')
  const ret = {}
  styleArr.map(item => {
    if (item) {
      const arr = item.split(':')
      if (arr.length > 1) {
        ret[arr[0]] = arr[1]
      }
    }
  })
  return ret
}

util.getStyleFromCsstext = function (dom) {
  const _cssText = dom.style.cssText
  const styleArr = _cssText.replace(/\s+/g, '').split(';')
  const ret = {}
  styleArr.map(item => {
    if (item) {
      const arr = item.split(':')
      if (arr.length > 1) {
        ret[arr[0]] = arr[1]
      }
    }
  })
  return ret
}

util.preloadImg = (url, onload = () => {}, onerror = () => {}) => {
  let img = new window.Image()
  if (img.complete) {
    // 图片已经加载过了，可以使用图片
    // do something here
    // img = null
    onload && onload()
  } else {
    img.onload = (e) => {
      img = null
      onload && onload(e)
    }
    img.onerror = (e) => {
      console.log('img.onerror')
      img = null
      onerror && onerror(e)
    }
  }
  img.src = url
}

util.stopPropagation = (e) => {
  if (e) {
    e.stopPropagation()
    e.cancelable && e.preventDefault()
  }
}

util.scrollTop = function () {
  return window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0
}

util.scrollLeft = function () {
  return window.pageXOffset ||
  document.documentElement.scrollLeft ||
  document.body.scrollLeft ||
  0
}

util.checkTouchSupport = function () {
  return 'ontouchstart' in window
}

export default util
