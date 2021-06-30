const util = {}

util.getBrowserVersion = function () {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  if (userAgent.toLowerCase().indexOf('mobile') > -1) {
    return 'Unknown'
  }
  if (userAgent.indexOf('Firefox') > -1) {
    const version = userAgent.match(/firefox\/[\d.]+/gi)[0].match(/[\d]+/)[0]
    return 'Firefox ' + version
  } else if (userAgent.indexOf('Edge') > -1) {
    const version = userAgent.match(/edge\/[\d.]+/gi)[0].match(/[\d]+/)[0]
    return 'Edge ' + version
  } else if (userAgent.indexOf('rv:11') > -1) {
    return 'IE 11'
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    if (userAgent.indexOf('Opera') > -1) {
      const version = userAgent.match(/opera\/[\d.]+/gi)[0].match(/[\d]+/)[0]
      return 'Opera ' + version
    }
    if (userAgent.indexOf('OPR') > -1) {
      const version = userAgent.match(/opr\/[\d.]+/gi)[0].match(/[\d]+/)[0]
      return 'Opera ' + version
    }
  } else if (userAgent.indexOf('Chrome') > -1) {
    const version = userAgent.match(/chrome\/[\d.]+/gi)[0].match(/[\d]+/)[0]
    return 'Chrome ' + version
  } else if (userAgent.indexOf('Safari') > -1) {
    const version = userAgent.match(/safari\/[\d.]+/gi)[0].match(/[\d]+/)[0]
    return 'Safari ' + version
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
    if (userAgent.indexOf('MSIE') > -1) {
      const version = userAgent.match(/msie [\d.]+/gi)[0].match(/[\d]+/)[0]
      return 'IE ' + version
    }
    if (userAgent.indexOf('Trident') > -1) {
      const versionTrident = userAgent.match(/trident\/[\d.]+/gi)[0].match(/[\d]+/)[0]
      const version = parseInt(versionTrident) + 4
      return 'IE ' + version
    }
  } else {
    return 'Unknown'
  }
}

export default util
