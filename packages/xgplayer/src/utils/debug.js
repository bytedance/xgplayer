
const DEBUG_OPEN = typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('xgplayerdebug=1') > -1

const DEBUG = {
  config: {
    debug: typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('playerdebug') > -1
  },
  logInfo: function (message, ...optionalParams) {
    (DEBUG_OPEN || this.config.debug) && console.log('%c[xgplayer]》》', 'color: #525252; background-color: #90ee90; padding: 2px 5px;', message, ...optionalParams)
  },

  logWarn: function (message, ...optionalParams) {
    (DEBUG_OPEN || this.config.debug) && console.warn('%c[xgplayer]》》', 'color: #525252; background-color: #ffff00', message, ...optionalParams)
  },

  logError: function (message, ...optionalParams) {
    (DEBUG_OPEN || this.config.debug) && console.error('%c[xgplayer]》》', 'color: #fff; background-color: #ff322e; padding: 2px 5px;', message, ...optionalParams)
  }
}

function bindDebug (player) {
  player.logInfo = DEBUG.logInfo.bind(player)
  player.logWarn = DEBUG.logWarn.bind(player)
  player.logError = DEBUG.logError.bind(player)
}

export {
  DEBUG as default,
  bindDebug
}
