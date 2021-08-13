
const XG_DEBUG_OPEN = typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('xgplayerdebugger=1') > -1

const STYLE = {
  info: 'color: #525252; background-color: #90ee90;',
  error: 'color: #525252; background-color: red;',
  warn: 'color: #525252; background-color: yellow; '
}

const XGTAG = '%c[xgplayer]'

const XG_DEBUG = {
  config: {
    debug: XG_DEBUG_OPEN ? 3 : 1
  },

  logInfo: function (message, ...optionalParams) {
    this.config.debug >= 3 && console.log(XGTAG, STYLE.info, message, ...optionalParams)
  },

  logWarn: function (message, ...optionalParams) {
    this.config.debug >= 1 && console.warn(XGTAG, STYLE.warn, message, ...optionalParams)
  },

  logError: function (message, ...optionalParams) {
    if (this.config.debug < 1) {
      return
    }
    const _fun = this.config.debug >= 2 ? 'trace' : 'error'
    console[_fun](XGTAG, STYLE.error, message, ...optionalParams)
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
