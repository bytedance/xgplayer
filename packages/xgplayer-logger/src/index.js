import Player from 'xgplayer'
import CNZZLogger from './loggers/CNZZLogger'
import BaiduLogger from './loggers/BaiduLogger'
import GtagLogger from './loggers/GtagLogger'
import RavenLogger from './loggers/RavenLogger'

const LOGGER_TYPE_CLS_MAP = {
  cnzz: CNZZLogger,
  baidu: BaiduLogger,
  gtag: GtagLogger,
  raven: RavenLogger
}

const initLoggerEvents = (player, logger) => {
  player.on('error', logger.handleError.bind(logger))
  player.on('seeked', logger.handleSeeked.bind(logger))
  player.on('DATA_REPORT', logger.handleDataReport.bind(logger))
  player.on('play', logger.handlePlay.bind(logger))
  player.on('pause', logger.handlePause.bind(logger))
  player.on('ended', logger.handleEnded.bind(logger))
  player.on('ready', logger.handleReady.bind(logger))
  player.once('complete', logger.handleComplete.bind(logger))
  window.addEventListener('beforeunload', logger.handleUnload.bind(logger))
}

const initLogger = (player) => {
  const { loggers } = player.config
  if (Array.isArray(loggers)) {
    loggers.forEach(({ type, options }) => {
      const LoggerCls = LOGGER_TYPE_CLS_MAP[type]
      if (!LoggerCls) { return }
      let logger = new LoggerCls(player, options || {})
      initLoggerEvents(player, logger)
    })
  } else {
    throw new Error('player.config.loggers should be an Array')
  }
}

const loggerPlugin = function () {
  let player = this
  initLogger(player)
}

Player.install('Logger', loggerPlugin)
