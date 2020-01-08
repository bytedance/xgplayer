/**
 * @author fuyuhao
 */
import Logger from './Logger'

/**
 * CNZZ事件统计
 */
export default class CNZZLogger extends Logger {
  constructor (player, options) {
    super(player, options)
    this._collector = window._czc
  }

  /**
     * CNZZ事件收集
     * @param args
     */
  collectEvent (...args) {
    this._collector.push('_trackEvent', ...args)
  }
}
