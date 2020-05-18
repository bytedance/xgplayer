
const DEBUG = typeof (window) !== 'undefined' && window.location && window.location.href.indexOf('debug') > -1
function loginfo (message, ...optionalParams) {
  (DEBUG || this.config.debug) && console.log('%c[xgplayer]》》', 'color: green; background-color: LightGreen; padding: 2px 5px;', message, ...optionalParams)
}

function logwarn (message, ...optionalParams) {
  (DEBUG || this.config.debug) && console.log('%c[xgplayer]》》', 'color: green; background-color: LightGreen; padding: 2px 5px;', message, ...optionalParams)
}

function logerror (message, ...optionalParams) {
  (DEBUG || this.config.debug) && console.log('%c[xgplayer]》》', 'color: green; background-color: LightGreen; padding: 2px 5px;', message, ...optionalParams)
}

export default function debug (player) {
  player.loginfo = loginfo.bind(this)
}
