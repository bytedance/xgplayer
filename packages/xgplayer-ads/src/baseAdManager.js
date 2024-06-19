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
  /**
   * @param {BaseAdManagerOptions<T>} options
   */
  constructor (options = {}) {
    super()

    /**
     * @type {V}
     */
    this.options = options
    this.config = options.config || {}
    this.player = options.player
    this.mediaElement = options.player.media || options.player.video

    /**
     * @type {boolean}
     * @description Whether in the advertising process
     */
    this._isAdRunning = false
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

  get isAdRunning () {
    return this._isAdRunning
  }

  destroy () {
    this.removeAllListeners()
  }
}
