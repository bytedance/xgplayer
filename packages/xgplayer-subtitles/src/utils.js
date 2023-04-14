import SubTitleParser from './parser'
import { _ERROR } from './error'
import XHR from './xhr'
import ProxyPromise from './proxyPromise'

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
  // console.log('findCIndexByTime', ids)
  return ids
}

/**
 * @description 根据索引从列表中删除某个选项
 * @param {Array<any>} list
 * @param {number} gid 一级存储索引
 * @param {number} cid 二级存储索引
 */
export function removeItemByIndex (list, gid, cid) {
  if (list.length === 0 || gid < 0 || gid > list.length - 1) {
    return
  }
  const gList = list[gid].list
  if (gList.length === 0) {
    list.splice(gid, 1)
    return
  }
  if (cid < 0 || cid > gList.length - 1) {
    return
  }
  gList.splice(cid, 1)
}

export function getItemsByIndex (list, gid, cids) {
  if (list.length === 0 || gid < 0 || gid > list.length - 1) {
    return []
  }
  const gList = list[gid].list

  if (cids.length === 0) {
    return []
  }

  const ret = gList.splice(cids[0], cids.length)

  // 删除当前获取项之前的数据
  if (gid > 0) {
    list.splice(0, gid)
  }
  if (gList.length === 0) {
    list.splice(0, 1)
  }

  return ret
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

export function parseResult (textTrack, resolve, reject, data, error) {
  if (error) {
    const err = _ERROR(2, error)
    reject(err, { format: data.format })
  } else if (!data.format) {
    const err = _ERROR(3)
    reject(err)
  } else {
    textTrack.list = data.list
    textTrack.format = data.format
    textTrack.styles = data.styles
    resolve(textTrack)
  }
}

export function parse (content, format, promise) {
  if (!promise) {
    promise = new ProxyPromise()
  }

  // json类型，直接格式化json并解析数据
  if (format === 'json') {
    const list = SubTitleParser.parseJson(content)
    promise.resolve({
      list,
      format: 'json'
    })
  } else if (format === 'string') {
    SubTitleParser.parse(content, (data, error) => {
      if (error) {
        const err = _ERROR(2, error)
        promise.reject(err, { format: data.format})
      } else if (!data.format) {
        const err = _ERROR(3)
        promise.reject(err)
      } else {
        promise.resolve({
          styles: data.styles,
          list: data.list,
          format: data.format
        })
      }
    })
  }
  return promise
}

export function loadSubTitle (object, promise) {
  if (!promise) {
    promise = new ProxyPromise()
  }
  new XHR({ url: object.url, type: 'text' }).then(data => {
    parse(data.res.response, 'string').then((data) => {
      promise.resolve({
        ...data,
        ...object
      })
    }).catch(e => {
      promise.reject(e)
    })
  }).catch(err => {
    const _err = _ERROR(1, { statusText: err.statusText, status: err.status, type: err.type, message: 'http load error', url: object.src, ...object })
    promise.reject(_err)
  })
  return promise
}

/**
 * 加载字幕
 * @param {*} textTrack
 * @param {string} 类型
 */
export function __loadText (textTrack, type) {
  return new Promise((resolve, reject) => {
    if (textTrack.list) {
      resolve(textTrack)
      return
    }
    // json类型，直接格式化json并解析数据
    if (textTrack.json) {
      const list = SubTitleParser.parseJson(textTrack.json)
      textTrack.list = list
      textTrack.format = 'json'
      resolve(textTrack)
      return
    }

    // text string类型，直接解析文本信息
    if (textTrack.stringContent && !textTrack.url) {
      SubTitleParser.parse(textTrack.stringContent, (data, error) => {
        parseResult(textTrack, resolve, reject, data, error)
      })
    } else if (!textTrack.url) {
      const _err = _ERROR(8)
      reject(_err)
    } else {
      new XHR({ url: textTrack.url, type: 'text' })
        .then(data => {
          SubTitleParser.parse(data.res.response, (data, error) => {
            console.log('SubTitleParser.parse data', data)
            parseResult(textTrack, resolve, reject, data, error)
          })
        }).catch(err => {
          const _err = _ERROR(1, { statusText: err.statusText, status: err.status, type: err.type, message: 'http load error', url: textTrack.url })
          reject(_err)
        })
    }
  })
}

/**
 * 切换的语言和当前的是否一致
 * @param {*} src
 * @param {*} dist
 * @returns
 */
export function checkSubtitle (src, dist) {
  if ((src.id && dist.id && src.id === dist.id) || (src.language && dist.language && src.language === dist.language)) {
    return true
  }
  return false
}