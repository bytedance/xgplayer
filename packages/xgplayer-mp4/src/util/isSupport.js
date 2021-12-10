exports.isMSBrowser = function () {
  let ua = window.navigator.userAgent
  let msie = ua.indexOf('MSIE ')
  let trident = ua.indexOf('Trident/')
  return msie > 0 || trident > 0
}

exports.isMediaSourceSupported = function () {
  const mediaSource = (window.MediaSource = window.MediaSource || window.WebKitMediaSource)
  return mediaSource && typeof mediaSource.isTypeSupported === 'function'
}

exports.isSupported = function () {
  return exports.isMediaSourceSupported()
    && !exports.isMSBrowser() 
}

exports.isSupportedWithXgmse = function () {
  return !exports.isMSBrowser() 
}
