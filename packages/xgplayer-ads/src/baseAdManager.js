import { EventEmitter } from 'eventemitter3'
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
     * @type {Player}
     */
    this.player = options.player
    /**
     * @type {HTMLMediaElement}
     */
    this.mediaElement = options.player.media || options.player.video

    /**
     * @type {boolean}
     * @description Whether in the advertising process
     */
    this.isAdRunning = false

    /**
     * @type {boolean}
     * @description Whether the video is blocked to play.
     *   When the ad is playing or preparing, the video player is blocked.
     *
     *   `shouldBlockVideoContent` & `isAdRunning` is not equal,
     *   `shouldBlockVideoContent` include ad sdk preparing period during lifecycle
     */
    this.shouldBlockVideoContent = false

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

  get paused () {
    return this._isAdPaused
  }

  destroy () {
    this.removeAllListeners()
  }
}
