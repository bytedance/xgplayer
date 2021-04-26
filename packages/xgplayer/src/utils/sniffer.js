let sniffer = {}

Object.defineProperty(sniffer, 'device', {
  get: function () {
    let r = sniffer.os
    return r.isPc ? 'pc' : 'mobile'
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  }
})

Object.defineProperty(sniffer, 'browser', {
  get: function () {
    let ua = navigator.userAgent.toLowerCase()
    let reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firfox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    }
    return [].concat(Object.keys(reg).filter(key => reg[key].test(ua)))[0] || ''
  }
})

Object.defineProperty(sniffer, 'os', {
  get: function () {
    let ua = navigator.userAgent
    let isWindowsPhone = /(?:Windows Phone)/.test(ua)
    let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    let isAndroid = /(?:Android)/.test(ua)
    let isFireFox = /(?:Firefox)/.test(ua)
    let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    let isPhone = /(?:iPhone)/.test(ua) && !isTablet
    let isPc = !isPhone && !isAndroid && !isSymbian && !isTablet
    return {
      isTablet,
      isPhone,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    }
  }
})

export default sniffer
