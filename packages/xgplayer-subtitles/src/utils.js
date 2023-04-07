export function hasClass (el, className) {
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

export function addClass (el, className) {
  if (!el) {
    return
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!hasClass(el, className)) {
    if (el.className && typeof el.className === 'object') {
      el.setAttribute('class', el.getAttribute('class') + ' ' + className)
    } else {
      el.className += ' ' + className
    }
  }
}
export function removeClass (el, className) {
  if (!el) {
    return
  }
  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (hasClass(el, className)) {
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

export function findIndexByTime (currentTime, list, index) {
  const len = list.length
  if (len < 1) {
    return -1
  }
  index = index < 0 ? 0 : (index >= len ? len - 1 : index)
  if (list[index].start <= currentTime && currentTime < list[index].end) {
    return index
  } else {
    let i = list[index].end <= currentTime ? index + 1 : 0
    for (; i < len; i++) {
      if (list[i].start <= currentTime && currentTime < list[i].end) {
        return i
      } else if (currentTime > list[i].end && i + 1 < len && currentTime < list[i + 1].start) {
        return -1
      } else if (currentTime > list[i].end && i + 1 >= len) {
        return -1
      }
    }
    return -1
  }
}

export function findCIndexByTime (currentTime, list, index) {
  const len = list.length
  if (len < 1) {
    return []
  }
  index = index < 0 ? 0 : (index >= len ? len - 1 : index)
  const ids = []
  if (index < len) {
    let i = list[index].end <= currentTime ? index : 0
    for (; i < len; i++) {
      if (list[i].start <= currentTime && currentTime < list[i].end) {
        ids.push(i)
      }
      if (currentTime < list[i].start) {
        break
      }
    }
  }
  return ids
}

export function typeOf (obj) {
  // eslint-disable-next-line no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

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

export function isMobile () {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  return isPhone || isAndroid || isSymbian || isTablet
}

export function addCSS (styles, preTag = '') {
  let cssText = ''
  styles.map(item => {
    cssText += ` ${preTag} ${item.key} {${item.style}}`
  })
  const styleTag = document.createElement('style') // 创建一个style元素
  const head = document.head || document.getElementsByTagName('head')[0] // 获取head元素
  styleTag.type = 'text/css' // 这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
  styleTag.id = 'ssss'
  if (styleTag.styleSheet) { // IE
    const func = function () {
      try { // 防止IE中stylesheet数量超过限制而发生错误
        styleTag.styleSheet.cssText = cssText
      } catch (e) {

      }
    }
    // 如果当前styleSheet还不能用，则放到异步中则行
    if (styleTag.styleSheet.disabled) {
      setTimeout(func, 10)
    } else {
      func()
    }
  } else { // w3c
    // w3c浏览器中只要创建文本节点插入到style元素中就行了
    const textNode = document.createTextNode(cssText)
    styleTag.appendChild(textNode)
  }
  head.appendChild(styleTag) // 把创建的style元素插入到head中
}
