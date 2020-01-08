/**
 * @author fuyuhao
 */
import { getDefaultOpts, mergeOptions } from '../utils/logHelpers'

/**
 * logger base class
 */
export default class Logger {
  constructor (player, options) {
    this.player = player
    this._options = mergeOptions(getDefaultOpts(player), options)
    this._colletor = {}
  }

  handleDataReport () {
    // empty
  }

  /**
     * get value from
     * @param eventName
     * @returns {*}
     */
  commonGetVal (eventName) {
    const func = this._options.value[eventName]
    return typeof func === 'function' ? func(this.player) : func
  }

  /**
     * default event handler
     */
  collectEvent () {
    this.player.emit('DATA_REPORT')
  }

  /**
     * collect complete event
     */
  handleComplete () {
    const { category, actions, label } = this._options
    const val = this.commonGetVal('complete')
    this.collectEvent(category, actions.complete, label, val)
  }

  /**
     * collect error event
     * param e
     */
  handleError (e) {
    const { category, actions, label, value } = this._options
    const val = value.error(this.player, e)
    this.collectEvent(category, actions.error, label, val)
  }

  /**
     * collect ended event
     */
  handleEnded () {
    const { category, actions, label, value } = this._options
    const val = value.end(this.player)
    this.collectEvent(category, actions.end, label, val)
  }

  /**
     * collect play event
     */
  handlePlay () {
    const { category, actions, label, value } = this._options
    const val = value.play(this.player)
    this.collectEvent(category, actions.play, label, val)
  }

  /**
     * collect pause event
     */
  handlePause () {
    const { category, actions, label, value } = this._options
    const val = value.pause(this.player)
    this.collectEvent(category, actions.pause, label, val)
  }

  /**
     * collect ready event
     */
  handleReady () {
    const { category, actions, label, value } = this._options
    const val = value.ready(this.player)
    this.collectEvent(category, actions.ready, label, val)
  }

  /**
     * collect seeked event
     */
  handleSeeked () {
    const { category, actions, label, value } = this._options
    const val = value.seek(this.player)
    this.collectEvent(category, actions.seek, label, val)
  }

  /**
     * collect unload event
     */
  handleUnload () {
    const { category, actions, label, value } = this._options
    const val = value.unload(this.player)
    this.collectEvent(category, actions.see, label, val)
  }
}
