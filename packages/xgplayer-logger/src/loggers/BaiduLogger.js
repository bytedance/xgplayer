/**
 * @author fuyuhao
 */
import Logger from './Logger'

/**
 * 百度事件统计
 */
export default class BaiduLogger extends Logger {
  constructor (player, options) {
    super(player, options)
    this._collector = window._hmt
  }

  /**
     * 百度统计事件收集
     * @param args
     */
  collectEvent (...args) {
    this._collector.push('_trackEvent', ...args)
  }
}
