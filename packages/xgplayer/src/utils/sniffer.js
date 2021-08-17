/**
 * @typedef {{
 *  device: 'pc' | 'mobile',
 *  browser: 'ie' | 'firefox' | 'chrome' | 'opera' | 'safari',
 *  os: {
 *   isTablet: boolean,
 *   isPhone: boolean,
 *   isIpad: boolean,
 *   isIos: boolean,
 *   isAndroid: boolean,
 *   isPc: boolean,
 *   isSymbian: boolean,
 *   isWindowsPhone: boolean,
 *   isFireFox: boolean
 *  },
 *  isWeixin: boolean
 * }} ISniffer
 */

const VERSION_REG = {
  android: /(Android)\s([\d.]+)/,
  ios: /(Version)\/([\d.]+)/
}
/**
 * @type ISniffer
 */
const sniffer = {
  get device () {
    const r = sniffer.os
    return r.isPc ? 'pc' : 'mobile'
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  },
  get browser () {
    if (typeof navigator === 'undefined') {
      return ''
    }
    const ua = navigator.userAgent.toLowerCase()
    const reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    }
    return [].concat(Object.keys(reg).filter(key => reg[key].test(ua)))[0]
  },
  get os () {
    if (typeof navigator === 'undefined') {
      return {}
    }
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian && !isTablet
    const isIpad = /(?:iPad|PlayBook)/.test(ua)
    return {
      isTablet,
      isPhone,
      isIpad,
      isIos: isPhone,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    }
  },

  get osVersion () {
    const ua = navigator.userAgent
    let reg = ''
    // ios
    if (/(?:iPhone)|(?:iPad|PlayBook)/.test(ua)) {
      reg = VERSION_REG.ios
    // android
    } else {
      reg = VERSION_REG.android
    }
    const _match = reg ? reg.exec(ua) : []
    if (_match && _match.length >= 3) {
      const version = _match[2].split('.')
      return version.length > 0 ? parseInt(version[0]) : 0
    }
    return 0
  },

  get isWeixin () {
    if (typeof navigator === 'undefined') {
      return false
    }
    const reg = /(micromessenger)\/([\d.]+)/
    const match = reg.exec(navigator.userAgent.toLocaleLowerCase())
    if (match) {
      return true
    }
  }
}

export default sniffer
