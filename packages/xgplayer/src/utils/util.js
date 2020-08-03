let util = {}

util.createDom = function (el = 'div', tpl = '', attrs = {}, cname = '') {
  let dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    let key = item
    let value = attrs[item]
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
    return null
  }
}

util.hasClass = function (el, className) {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

util.addClass = function (el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!util.hasClass(el, className)) {
    el.className += ' ' + className
  }
}

util.removeClass = function (el, className) {
  if (!el) {
    return;
  }

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
  if (!el) {
    return;
  }

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
    if (util.typeOf(dst[key]) === util.typeOf(src[key]) && dst[key] !== null && typeof dst[key] === 'object' && !(src[key] instanceof window.Node)) {
      util.deepMerge(dst[key], src[key])
    } else {
      src[key] !== null && (dst[key] = src[key])
    }
  })
  return dst
}

util.getBgImage = function (el) {
  // fix: return current page url when url is none
  let url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage
  if (!url || url === 'none') {
    return ''
  }
  let a = document.createElement('a')
  a.href = url.replace(/url\("|"\)/g, '')
  return a.href
}

util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    let back = document.createElement(dom.tagName)
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
      // eslint-disable-next-line no-eval
      rgb.push(eval('0x' + kw))
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
  const styleArr = text.replace(/\s+/g, '').split(';')
  styleArr.map(item => {
    if (item) {
      const arr = item.split(':')
      if (arr.length > 1) {
        dom.style[arr[0]] = arr[1]
      }
    }
  })
}

util.stopPropagation = (e) => {
  if (e) {
    e.stopPropagation()
    e.cancelable && e.preventDefault()
  }
}
export default util
