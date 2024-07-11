import { EventEmitter } from 'eventemitter3'
import { Events, STATE_CLASS, STATES } from 'xgplayer'
import { Logger } from 'xgplayer-streaming-shared'

const logger = new Logger('AdsPluginBaseAdManager')

/**
 * @typedef { import ('../../xgplayer/src/player').default } Player
 */

/**
 * @template T
 * @typedef {{
 *   player?: Player,
 *   config?: T,
 * }} BaseAdManagerOptions
 */

/**
 * @template [T=object],[V=object]
*/
export class BaseAdManager extends EventEmitter {
  get currentTime () {
    return this.context.currentTime
  }

  get duration () {
    return this.context.duration
  }

  get paused () {
    return this._isAdPaused
  }

  get shouldBlockVideoContent () {
    return this.isLinearAdRunning || this._shouldBlockVideoContent
  }

  /**
   * @param {boolean} flag
   */
  set shouldBlockVideoContent (flag) {
    // const preIsBlockState = this._shouldBlockVideoContent
    this._shouldBlockVideoContent = flag
  }

  /**
   * @param {BaseAdManagerOptions<T>} options
   */
  constructor (options = {}) {
    super()

    /**
     * @type {V}
     */
    this.options = options
    /**
     * @type {T}
     */
    this.config = options.config || {}
    /**
     * @type {import('./plugin').AdsPlugin}
     */
    this.plugin = options.plugin
    /**
     * @type {Player}
     */
    this.player = options.plugin.player
    /**
     * @type {HTMLMediaElement}
     */
    this.mediaElement = this.player.media || this.player.video

    /**
     * @type {boolean}
     * @description Whether in the linear advertising process
     */
    this.isLinearAdRunning = false

    /**
     * @type {boolean}
     * @description Whether the video is blocked to play.
     *   When the ad is playing or preparing, the video player is blocked.
     *
     *   `shouldBlockVideoContent` & `isLinearAdRunning` is not equal,
     *   `shouldBlockVideoContent` include ad sdk preparing period during lifecycle
     */
    this._shouldBlockVideoContent = false

    /**
     * @type {boolean}
     * @description Whether in ad pause state.
     *  When the ad is paused, the video player is paused.
     */
    this._isAdPaused = true
    /**
     * @type {boolean}
     * @description Whether the video has ended
     */
    this._isMediaEnded = false

    /**
     * @type {object}
     */
    this.context = {
      /**
       * @type {number}
       */
      currentTime: 0,
      /**
       * @type {number}
       */
      duration: 0
    }
  }

  updateConfig (config = {}) {
    if (!config) {
      logger.warn('config is empty')
      return
    }
    this.config = {
      ...this.config,
      ...config
    }
  }

  /**
   * @return {boolean}
   */
  isFullScreen () {
    return !!this.player.fullscreen
  }


  destroy () {
    this.removeAllListeners()
  }

  /**
   * @private
   */
  tryContentPlay () {
    const { player } = this

    // if (player.config.autoplay) {
    const playPromise = player.play()

    if (playPromise !== undefined && playPromise && playPromise.then) {
      playPromise
        .then(() => {
          logger.log('content play')

          player.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
          player.addClass(STATE_CLASS.PLAYING)
          if (player.state < STATES.RUNNING) {
            player.setState(STATES.RUNNING)
            player.emit(Events.AUTOPLAY_STARTED)
          }
        })
        .catch((e) => {
          logger.error('content play error', e)

          if (player.media && player.media.error) {
            player.onError()
            player.removeClass(STATE_CLASS.ENTER)
            return
          }
        })
    } else {
      if (player.state < STATES.RUNNING) {
        player.setState(STATES.RUNNING)
        player.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
        player.removeClass(STATE_CLASS.NO_START)
        player.removeClass(STATE_CLASS.ENTER)
        player.addClass(STATE_CLASS.PLAYING)
        player.emit(Events.AUTOPLAY_STARTED)
      }
    }
  }
  // }
}
