/**
 * @author fuyuhao
 */
import Logger from './Logger'

/**
 * Gtag事件统计
 */
export default class GtagLogger extends Logger {
  constructor (player, options) {
    super(player, options)

    this.collector = window.gtag
  }

  /**
     * gtag 事件收集
     * @param category
     * @param action
     * @param label
     * @param value
     */
  collectEvent (category, action, label, value) {
    this.collector('event', action, {
      eventcategory: category,
      event_label: label,
      value
    })
  }
}
