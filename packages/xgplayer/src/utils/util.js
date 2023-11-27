import XG_DEBUG from './debug'
/**
 *
 * @param { string } el
 * @param { string } [tpl=]
 * @param { {[propName: string]: any }} [attrs={}]
 * @param { string } [cname='']
 * @returns { HTMLElement | null }
 */
export function createDom (el = 'div', tpl = '', attrs = {}, cname = '') {
  const dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    const key = item
    const value = attrs[item]
    if (el === 'video' || el === 'audio' || el === 'live-video') {
      if (value) {
        dom.setAttribute(key, value)
      }
    } else {
      dom.setAttribute(key, value)
    }
  })
  return dom
}

/**
 *
 * @param { string } html
 * @param { { [propName: string]: any } } [attrs={}]
 * @param { string } [classname=""]
 * @returns { HTMLElement | null }
 */
export function createDomFromHtml (html, attrs = {}, classname = '') {
  try {
    let doc = document.createElement('div')
    doc.innerHTML = html
    let dom = doc.children
    doc = null
    if (dom.length > 0) {
      dom = dom[0]
      classname && addClass(dom, classname)
      if (attrs) {
        Object.keys(attrs).forEach(key => {
          dom.setAttribute(key, attrs[key])
        })
      }
      return dom
    }
    return null
  } catch (err) {
    XG_DEBUG.logError('createDomFromHtml', err)
    return null
  }
}

/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { boolean }
 */
export function hasClass (el, className) {
  if (!el || !className) {
    return false
  }
  try {
    return Array.prototype.some.call(el.classList, item => item === className)
  } catch (e) {
    const orgClassName = el.className && typeof el.className === 'object' ? el.getAttribute('class') : el.className
    return orgClassName && !!orgClassName.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}

/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */
export function addClass (el, className) {
  if (!el || !className) {
    return
  }
  try {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } catch (e) {
    if (!hasClass(el, className)) {
      if (el.className && typeof el.className === 'object') {
        el.setAttribute('class', el.getAttribute('class') + ' ' + className)
      } else {
        el.className += ' ' + className
      }
    }
  }
}

/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */
export function removeClass (el, className) {
  if (!el || !className) {
    return
  }
  try {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.remove(item)
    })
  } catch (e) {
    if (hasClass(el, className)) {
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
}

/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */
export function toggleClass (el, className) {
  if (!el) {
    return
  }

  className.split(/\s+/g).forEach(item => {
    if (hasClass(el, item)) {
      removeClass(el, item)
    } else {
      addClass(el, item)
    }
  })
}

/**
 *
 * @param { string | Object } args0
 * @param { string } [className]
 * @returns { string }
 */
export function classNames () {
  const classname = []
  for (let i = 0; i < arguments.length; i++) {
    if (typeOf(arguments[i]) === 'String') {
      // classname += `${arguments[i]}`
      classname.push(arguments[i])
    } else if (typeOf(arguments[i]) === 'Object') {
      Object.keys(arguments[i]).map(key => {
        if (arguments[i][key]) {
          // classname += key
          classname.push(key)
        }
      })
    }
    // if (i < arguments.length - 1) {
    //   classname += ' '
    // }
  }
  return classname.join(' ')
}

/**
 *
 * @param { HTMLElement } el
 * @param { string } sel
 * @returns { HTMLElement }
 */
export function findDom (el = document, sel) {
  let dom
  // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
  try {
    dom = el.querySelector(sel)
  } catch (e) {
    XG_DEBUG.logError('export function findDom', e)
    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1))
    }
  }
  return dom
}

/**
 *
 * @param { HTMLElement } dom
 * @param { string } key
 * @returns { any }
 */
export function getCss (dom, key) {
  return dom.currentStyle ? dom.currentStyle[key] : document.defaultView.getComputedStyle(dom, false)[key]
}

export function padStart (str, length, pad) {
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

/**
 *
 * @param { number } time
 * @returns { string }
 */
export function format (time) {
  if (window.isNaN(time)) {
    return ''
  }
  time = Math.round(time)
  const hour = padStart(Math.floor(time / 3600), 2, 0)
  const minute = padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  const second = padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}

/**
 *
 * @param { Object } e
 * @returns { Object }
 */
export function event (e) {
  if (e.touches) {
    const touch = e.touches[0] || e.changedTouches[0]
    e.clientX = touch.clientX || 0
    e.clientY = touch.clientY || 0
    e.offsetX = touch.pageX - touch.target.offsetLeft
    e.offsetY = touch.pageY - touch.target.offsetTop
  }
  e._target = e.target || e.srcElement
}

/**
 *
 * @param { any } obj
 * @returns { string }
 */
export function typeOf (obj) {
  // eslint-disable-next-line no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

/**
 *
 * @param { any } dst
 * @param { any } src
 * @returns { any }
 */
export function deepCopy (dst, src) {
  if (typeOf(src) === 'Object' && typeOf(dst) === 'Object') {
    Object.keys(src).forEach(key => {
      // eslint-disable-next-line no-undef
      if (typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (dst[key] === undefined || dst[key] === undefined) {
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

/**
 *
 * @param { any } dst
 * @param { any } src
 * @returns { any }
 */
export function deepMerge (dst, src) {
  Object.keys(src).map(key => {
    if (typeOf(src[key]) === 'Array' && typeOf(dst[key]) === 'Array') {
      if (typeOf(dst[key]) === 'Array') {
        dst[key].push(...src[key])
      }
    } else if (typeOf(dst[key]) === typeOf(src[key]) && dst[key] !== null && typeOf(dst[key]) === 'Object' && !(src[key] instanceof window.Node)) {
      deepMerge(dst[key], src[key])
    } else {
      src[key] !== null && (dst[key] = src[key])
    }
  })
  return dst
}

export function getBgImage (el) {
  // fix: return current page url when url is none
  const url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage
  if (!url || url === 'none') {
    return ''
  }
  const a = document.createElement('a')
  a.href = url.replace(/url\("|"\)/g, '')
  return a.href
}

/**
 *
 * @param {  HTMLElement } dom
 * @returns { HTMLElement | null }
 */
export function copyDom (dom) {
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

/**
 *
 * @param { any } context
 * @param { string } eventName
 * @param { function } intervalFunc
 * @param { number } frequency
 */
export function setInterval (context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = window.setInterval(intervalFunc.bind(context), frequency)
  }
}

/**
 *
 * @param { any } context
 * @param { string } eventName
 * @returns { void }
 */
export function clearInterval (context, eventName) {
  clearInterval(context._interval[eventName])
  context._interval[eventName] = null
}

/**
 *
 * @param { any } context
 * @param { function } fun
 * @param { number } time
 * @returns { number }
 */
export function setTimeout (context, fun, time) {
  if (!context._timers) {
    context._timers = []
  }
  const id = window.setTimeout(() => {
    fun()
    clearTimeout(context, id)
  }, time)
  context._timers.push(id)
  return id
}

/**
 *
 * @param { any } context
 * @param { number } id
 */
export function clearTimeout (context, id) {
  const { _timers } = context
  if (typeOf(_timers) === 'Array') {
    for (let i = 0; i < _timers.length; i++) {
      if (_timers[i] === id) {
        _timers.splice(i, 1)
        window.clearTimeout(id)
        break
      }
    }
  } else {
    window.clearTimeout(id)
  }
}

/**
 *
 * @param { any } context
 */
export function clearAllTimers (context) {
  const { _timers } = context
  if (typeOf(_timers) === 'Array') {
    _timers.map(item => {
      clearTimeout(item)
    })
    context._timerIds = []
  }
}

/**
 *
 * @param { string } name
 * @param { string } imgUrl
 * @param { number } [width]
 * @param { number } [height]
 * @returns { HTMLElement }
 */
export function createImgBtn (name, imgUrl, width, height) {
  const btn = createDom(`xg-${name}`, '', {}, `xgplayer-${name}-img`)
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

/**
 *
 * @param { string } hex
 * @param { string | number } alpha
 * @returns { string }
 */
export function Hex2RGBA (hex, alpha) {
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

/**
 *
 * @returns { HTMLElement | null }
 */
export function getFullScreenEl () {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
}

/**
 * @param { any }
 * @returns { boolean }
 */
export function checkIsFunction (fun) {
  return fun && typeof fun === 'function'
}

/**
 * @param { any }
 * @returns { boolean }
 */
export function checkIsObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * @param { HTMLElement }
 */
export function hide (dom) {
  dom.style.display = 'none'
}

/**
 * @param { HTMLElement }
 * @param { block | flex | inline-block | inline-flex } [display]
 */
export function show (dom, display) {
  dom.style.display = display || 'block'
}

/**
 *
 * @param { any } val
 * @returns { boolean }
 */
export function isUndefined (val) {
  if (typeof val === 'undefined' || val === null) {
    return true
  }
}

export function isNotNull (val) {
  return !(val === undefined || val === null)
}

/**
 *
 * @param { HTMLElement } dom
 * @param { string } [text]
 * @returns
 */
export function setStyleFromCsstext (dom, text) {
  // dom.setAttribute(style, text)
  if (!text) {
    return
  }
  if (typeOf(text) === 'String') {
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

/**
 *
 * @param { string } key
 * @param { Array<any>} list
 * @returns { boolean }
 */
function checkIsIn (key, list) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (key.indexOf(list[i]) > -1) {
      return true
    }
  }
  return false
}

/**
 *
 * @param { HTMLElement } dom
 * @param { Array<string> } [list] attribute names to filter
 * @returns { {} | {[propName: string]: any;} }
 */
export function filterStyleFromText (dom, list = ['width', 'height', 'top', 'left', 'bottom', 'right', 'position', 'z-index', 'padding', 'margin', 'transform']) {
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
  return ret
}

/**
 *
 * @param { HTMLElement } dom
 * @returns { {} | {[propName: string]: any;} }
 */
export function getStyleFromCsstext (dom) {
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

export function stopPropagation (e){
  if (e) {
    e.stopPropagation()
  }
}

export function scrollTop () {
  return window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0
}

export function scrollLeft () {
  return window.pageXOffset ||
  document.documentElement.scrollLeft ||
  document.body.scrollLeft ||
  0
}

export function checkTouchSupport () {
  return 'ontouchstart' in window
}

/**
 * @description css中有zoom的时候，位移会等比缩放，但是元素的宽高不会等比缩放，所以通过该api做统一
 * https://bugs.chromium.org/p/chromium/issues/detail?id=429140#c8
 * @param {Events} e
 * @param {number} zoom
 * @returns
 */
export function getEventPos (e, zoom = 1) {
  if (e.touches && e.touches.length > 0) {
    e = e.touches[0]
  }
  return {
    x: e.x / zoom,
    y: e.y / zoom,
    clientX: e.clientX / zoom,
    clientY: e.clientY / zoom,
    offsetX: e.offsetX / zoom,
    offsetY: e.offsetY / zoom,
    pageX: e.pageX / zoom,
    pageY: e.pageY / zoom
  }
}

export function requestAnimationFrame (callback) {
  const _fun = window.requestAnimationFrame ||
  // Older versions Chrome/Webkit
  window.webkitRequestAnimationFrame ||

   // Firefox < 23
   window.mozRequestAnimationFrame ||

   // opera
   window.oRequestAnimationFrame ||

   // ie
   window.msRequestAnimationFrame
  if (_fun) {
    return _fun(callback)
  }
}

export function getHostFromUrl (url) {
  if (typeOf(url) !== 'String') {
    return ''
  }
  const results = url.split('/') // 以“/”进行分割
  let domain = ''
  if (results.length > 3 && results[2]) {
    domain = results[2]
  }
  return domain
}

export function cancelAnimationFrame (frameId) {
  const _fun = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.cancelRequestAnimationFrame
  _fun && _fun(frameId)
}

/**
 * @desc Check whether it is MediaSource start
 * @param { HTMLVideoElement | HTMLAudioElement | HTMLElement } video
 * @returns { Boolean }
 */
export function isMSE (video) {
  if (!video || !(video instanceof HTMLMediaElement)) {
    return false
  }
  return /^blob/.test(video.currentSrc) || /^blob/.test(video.src)
}

export function isBlob (url) {
  return typeof url === 'string' && /^blob/.test(url)
}

/**
 * @param { number } did
 * @returns { string }
 */
export function generateSessionId (did = 0) {
  let d = new Date().getTime()
  try {
    did = parseInt(did)
  } catch (e) {
    did = 0
  }
  d += did
  if (window.performance && typeof window.performance.now === 'function') {
    d += parseInt(window.performance.now()) // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function createEvent (eventName) {
  let event
  if (typeof window.Event === 'function') {
    event = new Event(eventName)
  } else {
    event = document.createEvent('Event')
    event.initEvent(eventName, true, true)
  }
  return event
}

/**
 * @description Adjust currentTime according to duration, when ended is true and currentTime is less than duration, or
 *              currentTime is greater than duration, return duration
 * @param { number } time
 * @param { number } duration
 * @param { boolean } isEnded
 * @returns { number } Adjusted time
 */
export function adjustTimeByDuration (time, duration, isEnded) {
  if (!duration || !time) {
    return time
  }
  if (time > duration || (isEnded && time < duration)) {
    return duration
  }
  return time
}

export function createPositionBar (className, root) {
  const dom = createDom(
    'xg-bar',
    '',
    { 'data-index': -1 },
    className
  )
  root.appendChild(dom)
  return dom
}

export function getTransformStyle (pos = { x: 0, y: 0, scale: 1, rotate: 0 }) {
  return `scale(${pos.scale || 1}) translate(${pos.x || 0}%, ${pos.y || 0}%) rotate(${pos.rotate || 0}deg)`
}

/**
 * @description 角度换算
 * @param {number} val
 * @returns {number}
 */
export function convertDeg (val) {
  if (Math.abs(val) <= 1) {
    return val * 360
  }
  return val % 360
}

export function getIndexByTime (time, segments) {
  const _len = segments.length
  let _index = -1
  if (_len < 1) {
    return _index
  }
  if (time <= segments[0].end || _len < 2) {
    _index = 0
  } else if (time > segments[_len - 1].end) {
    _index = _len - 1
  } else {
    for (let i = 1; i < _len; i++) {
      if (time > segments[i - 1].end && time <= segments[i].end){
        _index = i
        break
      }
    }
  }
  return _index
}

export function getOffsetCurrentTime (currentTime, segments, index = -1) {
  let _index = -1
  if (index >= 0 && index < segments.length) {
    _index = index
  } else {
    _index = getIndexByTime(currentTime, segments)
  }
  if (_index < 0) {
    return -1
  }
  const _len = segments.length
  const { start, end, cTime, offset } = segments[_index]
  if (currentTime < start) {
    return cTime
  } else if (currentTime >= start && currentTime <= end) {
    return currentTime - offset
  } else if (currentTime > end && _index >= _len - 1) {
    return end
  }
  return -1
}

/**
 *
 * @param {*} offsetTime
 * @param {*} segments
 * @returns
 */
export function getCurrentTimeByOffset (offsetTime, segments) {
  let _index = -1
  if (!segments || segments.length < 0) {
    return offsetTime
  }
  for (let i = 0; i < segments.length; i++) {
    if (offsetTime <= segments[i].duration) {
      _index = i
      break
    }
  }
  if (_index !== -1) {
    const { start } = segments[_index]
    if (_index - 1 < 0) {
      return start + offsetTime
    } else {
      return start + (offsetTime - segments[_index - 1].duration)
    }
  }
  return offsetTime
}

/**
 * @returns { string }
 */
export function getLang () {
  let lang = (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase()
  if (lang === 'zh-cn') {
    lang = 'zh'
  }
  return lang
}

export function checkIsCurrentVideo (element, playerId, key) {
  if (!element) {
    return
  }
  const pid = element.getAttribute(key)
  if (pid && pid === playerId && (element.tagName === 'VIDEO' || element.tagName === 'AUDIO')) {
    return true
  }
  return false
}
