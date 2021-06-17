import XgplayerTimeRange from './xgplayerTimeRange'

export function createDom(el = 'div', tpl = '', attrs = {}, cname = '') {
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

export function hasClass(el, className) {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else if (el.className) {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  } else {
    return false;
  }
}

export function addClass(el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className
  }
}

export function removeClass(el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    })
  }
}

export function toggleClass(el, className) {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(item => {
    if (hasClass(el, item)) {
      removeClass(el, item)
    } else {
      addClass(el, item)
    }
  })
}

export function findDom(el = document, sel) {
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

export function padStart(str, length, pad) {
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

export function format(time) {
  if (window.isNaN(time)) {
    return ''
  }
  let hour = padStart(Math.floor(time / 3600), 2, 0)
  let minute = padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  let second = padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}

export function event(e) {
  if (e.touches) {
    let touch = e.touches[0] || e.changedTouches[0]
    e.clientX = touch.clientX || 0
    e.clientY = touch.clientY || 0
    e.offsetX = touch.pageX - touch.target.offsetLeft
    e.offsetY = touch.pageY - touch.target.offsetTop
  }
  e._target = e.target || e.srcElement
}

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

export function deepCopy(dst, src) {
  if (typeOf(src) === 'Object' && typeOf(dst) === 'Object') {
    Object.keys(src).forEach(key => {
      if (typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key]
        } else {
          deepCopy(dst[key], src[key])
        }
      } else if (typeOf(src[key]) === 'Array') {
        dst[key] = typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key]
      } else {
        dst[key] = src[key]
      }
    })
    return dst
  }
}
export function getBgImage(el) {
  // fix: return current page url when url is none
  let url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage
  if (!url || url === 'none') {
    return ''
  }
  let a = document.createElement('a')
  a.href = url.replace(/url\("|"\)/g, '')
  return a.href
}

export function copyDom(dom) {
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

export function _setInterval(context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency)
  }
}

export function _clearInterval(context, eventName) {
  clearInterval(context._interval[eventName])
  context._interval[eventName] = null
}

export function createImgBtn(name, imgUrl, width, height) {
  let btn = createDom(`xg-${name}`, '', {}, `xgplayer-${name}-img`)
  btn.style.backgroundImage = `url("${imgUrl}")`
  if (width && height) {
    let w, h, unit
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every((item) => {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = Number(width.slice(0, width.indexOf(item)).trim())
        h = Number(height.slice(0, height.indexOf(item)).trim())
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

export function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('micromessenger') > -1
}

export function isUc() {
  let ua = window.navigator.userAgent.toLowerCase()
  return ua.indexOf('ucbrowser') > -1
}

export function computeWatchDur(played = []) {
  let arr = []
  for (let i = 0; i < played.length; i++) {
    if(!played[i].end || played[i].begin < 0 || played[i].end < 0 || played[i].end < played[i].begin) {
      continue
    }
    if(arr.length < 1) {
      arr.push({begin: played[i].begin, end: played[i].end})
    } else {
      for (let j = 0; j < arr.length; j++) {
        let begin = played[i].begin
        let end = played[i].end
        if(end < arr[j].begin) {
          arr.splice(j, 0, {begin, end})
          break
        } else if(begin > arr[j].end) {
          if(j > arr.length - 2) {
            arr.push({begin, end})
            break
          }
        } else {
          let b = arr[j].begin
          let e = arr[j].end
          arr[j].begin = Math.min(begin, b)
          arr[j].end = Math.max(end, e)
          break
        }
      }
    }
  }
  let watch_dur = 0
  for (let i = 0; i < arr.length; i++) {
    watch_dur += arr[i].end - arr[i].begin
  }
  return watch_dur
}

export function offInDestroy(object, event, fn, offEvent) {
  function onDestroy () {
    object.off(event, fn)
    object.off(offEvent, onDestroy)
  }
  object.once(offEvent, onDestroy)
}

export function on(object, event, fn, offEvent) {
  if (offEvent) {
    object.on(event, fn)
    offInDestroy(object, event, fn, offEvent)
  } else {
    let _fn = data => {
      fn(data)
      object.off(event, _fn)
    }
    object.on(event, _fn)
  }
}

export function once(object, event, fn, offEvent) {
  if (offEvent) {
    object.once(event, fn)
    offInDestroy(object, event, fn, offEvent)
  } else {
    let _fn = data => {
      fn(data)
      object.off(event, _fn)
    }
    object.once(event, _fn)
  }
}

export function getBuffered2(vbuffered, maxHoleDuration = 0.5) { //ref: hls.js
  let buffered = []
  for (let i = 0; i < vbuffered.length; i++) {
    buffered.push({ start: vbuffered.start(i) < 0.5 ? 0 : vbuffered.start(i), end: vbuffered.end(i) });
  }
  buffered.sort(function (a, b) {
    let diff = a.start - b.start;
    if (diff) {
      return diff;
    } else {
      return b.end - a.end;
    }
  });
  let buffered_2 = []
  if (maxHoleDuration) {
    for (let i = 0; i < buffered.length; i++) {
      let buf2len = buffered_2.length
      if (buf2len) {
        let buf2end = buffered_2[buf2len - 1].end
        if ((buffered[i].start - buf2end) < maxHoleDuration) {
          if (buffered[i].end > buf2end) {
            buffered_2[buf2len - 1].end = buffered[i].end
          }
        } else {
          buffered_2.push(buffered[i])
        }
      } else {
        buffered_2.push(buffered[i])
      }
    }
  } else {
    buffered_2 = buffered
  }
  return new XgplayerTimeRange(buffered_2)
}

export function checkIsBrowser() {
  return !(typeof(window) === 'undefined' || typeof(window.document) === 'undefined' || typeof(window.document.createElement) === 'undefined')
}

export function setStyle(elem, name, value) {
  let style = elem.style;
  try {
    style[name] = value;
  } catch (error) {
    style.setProperty( name, value );
  }
}

export const util = {
  createDom, hasClass, addClass, removeClass, toggleClass, findDom, padStart, format, event, typeOf, 
  deepCopy, getBgImage, copyDom, setInterval: _setInterval, clearInterval: _clearInterval, createImgBtn, isWeiXin, isUc, computeWatchDur,
  offInDestroy, on, once, getBuffered2, checkIsBrowser, setStyle
}
