
const XG_DEBUG_OPEN = typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('xgplayerdebug=1') > -1

const STYLE = {
  info: 'color: #525252; background-color: #90ee90;',
  error: 'color: #525252; background-color: #90ee90;',
  warn: 'color: #525252; background-color: red; '
}

const XGTAG = '%c[xgplayer]》》'

const XG_DEBUG = {
  config: {
    debug: typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('playerdebug') > -1
  },
  logInfo: function (message, ...optionalParams) {
    (XG_DEBUG_OPEN || this.config.debug) && console.log(XGTAG, STYLE.info, message, ...optionalParams)
  },

  logWarn: function (message, ...optionalParams) {
    (XG_DEBUG_OPEN || this.config.debug) && console.warn(XGTAG, STYLE.warn, message, ...optionalParams)
  },

  logError: function (message, ...optionalParams) {
    console.error(XGTAG, STYLE.error, message, ...optionalParams)
  }
}

function bindDebug (player) {
  player.logInfo = XG_DEBUG.logInfo.bind(player)
  player.logWarn = XG_DEBUG.logWarn.bind(player)
  player.logError = XG_DEBUG.logError.bind(player)
}

export {
  XG_DEBUG as default,
  bindDebug
}
