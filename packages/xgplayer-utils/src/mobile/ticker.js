/**
 * @author fuyuhao@bytedance.com
 */

class Ticker {
  constructor (options) {
    this.options = Object.assign({}, options || {}, {
      interval: 16
    })

    this.callbacks = []
  }

  start(...callbacks) {
    this.callbacks = callbacks
  }

  onTick () {
    for (let i = 0, len = this.callbacks.length; i < len; i++) {
      const callback = this.callbacks[i]
      callback()
    }
  }

  setInterval (interval) {
    this.options.interval = interval
    return this;
  }
}

/**
 * ticker use requestAnimationFrame
 */
class RafTicker extends Ticker {
  constructor (props) {
    super(props);
    this.prev = null;
    this.timerId = null
    this._subTimerId = null

    this._tickFunc = RafTicker.getTickFunc()
    this.tick = this.tick.bind(this)
  }

  start (...callbacks) {
    super.start(...callbacks)
    this.tick()
  }

  tick (timestamp) {
    this.onTick()
    this.nextTick();
  }

  nextTick () {
    const { _tickFunc } = this;
    this.timerId = _tickFunc(this.tick)
  }

  stop () {
    if (this.timerId) {
      const cancelFunc = RafTicker.getCancelFunc()

      cancelFunc(this.timerId)
    }
  }

  static getTickFunc () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
  }

  static getCancelFunc () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame
  }

  static isSupported () {
    return RafTicker.getTickFunc() !== undefined
  }
}

/**
 * use setTimeout for browsers without raf support
 */
class TimeoutTicker extends Ticker {
  constructor(config) {
    super(config)
    this.timeoutId = null

  }

  start (...callbacks) {
    super.nextTick(...callbacks)
    this.timeoutId = window.setInterval(() => {
      this.onTick();
    }, this.options.interval || 16)
  }

  stop () {
    if (this.timeoutId) {
      window.clearInterval(this.timeoutId)
    }
  }

}

/**
 * 返回Ticker构造函数
 * @returns {Ticker}
 */
export const getTicker = () => {
  if (RafTicker.isSupported()) {
    return RafTicker
  } else {
    return TimeoutTicker
  }
}
