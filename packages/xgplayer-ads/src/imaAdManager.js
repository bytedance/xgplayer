/* global google */
import { Events } from 'xgplayer'
import { Logger } from 'xgplayer-streaming-shared'
import canAutoplay from 'can-autoplay'
import { BaseAdManager } from './baseAdManager'
import * as ADEvents from './events'

const logger = new Logger('AdsPluginImaAdManager')

/**
 * @typedef {{
 *   adTagUrl?: string,
 *   adsResponse?: string,
 *   adsRequest?: google.ima.AdsRequest,
 *   autoPlayAdBreaks?: boolean,
 * }} ImaConfig
 */

/**
 * @typedef { import ('../../xgplayer/src/player').default } Player
 */

/**
 * @typedef {{
 *   player?: Player,
 *   config?: ImaConfig,
 *   displayContainer?: HTMLElement,
 * }} ImaAdManagerOptions
 */

/**
 * @extends {BaseAdManager<ImaConfig, ImaAdManagerOptions>}
 */
export class ImaAdManager extends BaseAdManager {
  /**
   * @param {ImaAdManagerOptions} options
   */
  constructor (options = {}) {
    super(options)

    if (!google?.ima) {
      throw 'google.ima sdk is not loaded'
    }

    this.displayContainer = null
    this.adsLoader = null
    this.adsManager = null
  }

  init () {
    this._initConfig()
    this._initMediaEvents()
    this._initContainer()
    this._initLoader()
    this._initAdsRequest()
  }

  destroy () {
    super.destroy()

    this._removeMediaEvents()
    this._destroyLoader()
  }

  /**
   * @private
   */
  _initConfig () {
    this.autoPlayAdBreaks = this.config.autoPlayAdBreaks !== false ? true : false
  }

  /**
   * @private
   */
  _initMediaEvents () {
    const { player } = this

    player.on(Events.VIDEO_RESIZE, this._onMediaResize)
    player.on(Events.ENDED, this._onMediaEnded)
    player.on(Events.PLAY, this._onMediaPlay)
    player.on(Events.PAUSED, this._onMediaPause)
    player.on(Events.VOLUME_CHANGE, this._onMediaVolumeChange)
  }

  /**
   * @private
   */
  _removeMediaEvents () {
    const { player } = this

    player.off(Events.VIDEO_RESIZE, this._onMediaResize)
    player.off(Events.ENDED, this._onMediaEnded)
    player.off(Events.PLAY, this._onMediaPlay)
    player.off(Events.PAUSED, this._onMediaPause)
    player.off(Events.VOLUME_CHANGE, this._onMediaVolumeChange)
  }

  /**
   * @private
   */
  _initContainer () {
    const { displayContainer } = this.options

    this.displayContainer = new google.ima.AdDisplayContainer(
      displayContainer,
      this.mediaElement
    )
  }

  /**
   * Initializes the ads loader.
   * @private
   */
  _initLoader () {
    // Create ads loader.
    const adsLoader = (this.adsLoader = new google.ima.AdsLoader(this.displayContainer))

    adsLoader.getSettings().setAutoPlayAdBreaks(this.autoPlayAdBreaks)

    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.onAdsManagerLoaded,
      false
    )
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError,
      false
    )

    this.player.emit(ADEvents.IMA_AD_LOADER_READY, { adsLoader })
  }

  /**
   * Destroy the ads loader.
   * @private
   */
  _destroyLoader () {
    const { adsLoader } = this

    if (adsLoader) {
      return
    }

    adsLoader.removeEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.onAdsManagerLoaded,
      false
    )
    adsLoader.removeEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError,
      false
    )
  }

  /**
   * @private
   */
  async _initAdsRequest () {
    const { adsRequest, adsResponse, adTagUrl } = this.config
    if (adsRequest || adsResponse || adTagUrl) {
      await this._checkAutoplaySupport()
      this.requestAds()
      this.player.once(ADEvents.IMA_AD_MANAGER_READY, () => {
        this._startPreRoll()
        if (!this.adsManager.getCuePoints().length) {
          this.emit(ADEvents.IMA_READY_TO_PLAY)
        } else {
          this.player.once(ADEvents.IMA_AD_LOADED, () => {
            this.emit(ADEvents.IMA_READY_TO_PLAY)
          })
        }
      })
    } else {
      this.emit(ADEvents.IMA_READY_TO_PLAY)
    }
  }

  /**
   * End event listener to tell the SDK can play any post-roll ads.
   * @private
   */
  _onMediaEnded = () => {
    // An ad might have been playing in the content element, in which case the
    // content has not actually ended.
    if (this._isAdRunning) return
    this._isMediaEnded = true
    this.adsLoader?.contentComplete()
  }

  /**
   * End event listener to tell the SDK can play any post-roll ads.
   * @private
   */
  _onMediaResize = () => {
    const { player } = this
    const viewMode = this.isFullScreen()
      ? google.ima.ViewMode.FULLSCREEN
      : google.ima.ViewMode.NORMAL
    this.adsManager?.resize(player.sizeInfo.width, player.sizeInfo.height, viewMode)
  }

  /**
   * @private
   */
  _onMediaPlay = () => {
    this._mediaPlayed = true
  }

  /**
   * @private
   */
  _onMediaPause = () => {
    this._mediaPlayed = false
  }

  /**
   * @private
   */
  _startPreRoll = () => {
    if (this.autoPlayAdBreaks) {
      if (this.autoplayAllowed) {
        this._initAdsManager()
        this.playAds()
        this._mediaPlayFunc = this.player.mediaPlay
        this.player.mediaPlay = () => {}
      } else {
        const cb = () => {
          this._initAdsManager()
          this.playAds()
          this.player.removeHooks('play', cb)
          return false
        }

        this.player.useHooks('play', cb)
      }
    }
  }

  /**
   * @private
   */
  _onMediaVolumeChange = () => {
    this.adsManager?.setVolume(this.player.volume)
  }

  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @param {!google.ima.AdsManagerLoadedEvent} ev
   * @private
   */
  onAdsManagerLoaded = ev => {
    // Get the ads manager.
    const adsRenderingSettings = new google.ima.AdsRenderingSettings()
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true
    adsRenderingSettings.enablePreloading = true
    const adsManager = (this.adsManager = ev.getAdsManager(
      this.mediaElement,
      adsRenderingSettings
    ))

    logger.log('AdManager Loaded', adsManager)

    const cuePoints = adsManager.getCuePoints()
    if (cuePoints.length) {
      logger.log('cuePoints', cuePoints)
    }

    this._initAdsManagerEventListeners()

    if (!this.autoPlayAdBreaks || !cuePoints.length) {
      this._initAdsManager()
    }

    this.player.emit(ADEvents.IMA_AD_MANAGER_READY, { adsManager })
  }

  playAds () {
    try {
      this.adsManager.setVolume(this.player.volume)
      this.adsManager.start()
    } catch (adError) {
      this.onAdError(adError)
    }
  }

  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @private
   */
  _initAdsManagerEventListeners () {
    const adsManager = this.adsManager

    // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdErrorEvent
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError)

    // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdEvent
    const adEvents = [
      google.ima.AdEvent.Type.LOADED,
      google.ima.AdEvent.Type.STARTED,
      google.ima.AdEvent.Type.RESUMED,
      google.ima.AdEvent.Type.PAUSED,
      google.ima.AdEvent.Type.COMPLETE,
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      google.ima.AdEvent.Type.VOLUME_CHANGED,
      google.ima.AdEvent.Type.VOLUME_MUTED,
      google.ima.AdEvent.Type.AD_METADATA,
      google.ima.AdEvent.Type.AD_CAN_PLAY,
      google.ima.AdEvent.Type.CLICK,
      google.ima.AdEvent.Type.VIDEO_CLICKED,
      google.ima.AdEvent.Type.VIDEO_ICON_CLICKED,
      google.ima.AdEvent.Type.FIRST_QUARTILE,
      google.ima.AdEvent.Type.MIDPOINT,
      google.ima.AdEvent.Type.THIRD_QUARTILE,
      google.ima.AdEvent.Type.COMPLETE,
      google.ima.AdEvent.Type.SKIPPED,
      google.ima.AdEvent.Type.USER_CLOSE,
      google.ima.AdEvent.Type.AD_BREAK_READY,
      google.ima.AdEvent.Type.AD_BREAK_FETCH_ERROR
    ]
    adEvents.forEach(type => {
      adsManager.addEventListener(type, this.onAdEvent)
    })
  }

  /**
 * Initialize the ads manager.
 */
  _initAdsManager () {
    try {
      if (!this.displayContainerInitialized) {
        // Initialize the container. Must be done through a user action on mobile
        // devices.
        this.displayContainer.initialize()
        this.displayContainerInitialized = true
      }

      const { player } = this
      const viewMode = this.isFullScreen()
        ? google.ima.ViewMode.FULLSCREEN
        : google.ima.ViewMode.NORMAL

      // Initialize the ads manager. Ad rules playlist will start at this time.
      this.adsManager.init(player.sizeInfo.width, player.sizeInfo.height, viewMode)
    } catch (adError) {
      this.onAdError(adError)
    }
  }

  /**
   * Handles ad errors.
   * @param {!google.ima.AdErrorEvent} ev
   * @private
   */
  onAdError = ev => {
    // Handle the error logging.
    console.log(ev.getError())
    this.adsManager?.destroy()
  }

  /**
   * Handles actions taken in response to ad events.
   * @param {!google.ima.AdEvent} ev
   * @private
   */
  onAdEvent = ev => {
    const { player } = this
    // Retrieve the ad from the event. Some events (for example,
    // ALL_ADS_COMPLETED) don't have ad object associated.
    const ad = ev?.getAd()
    let intervalTimer

    logger.log('AdEvent', ev?.type, ev?.getAd())

    switch (ev?.type) {
      case google.ima.AdEvent.Type.AD_BREAK_READY: {
        this.player.emit(ADEvents.IMA_AD_BREAK_READY, {
          ad
        })
        break
      }
      // Fires when ad data is available.
      // This is the first event sent for an ad.
      case google.ima.AdEvent.Type.LOADED: {
        if (!ad.isLinear()) {
          this.mediaElement?.play()
        }
        this.player.emit(ADEvents.IMA_AD_LOADED, {
          ad
        })
        break
      }
      // Fires when media content should be resumed.
      // This usually happens when an ad finishes or collapses.
      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED: {
        this._isAdRunning = false
        if (this._mediaPlayFunc) {
          this.player.mediaPlay = this._mediaPlayFunc
          this._mediaPlayFunc = undefined
        }
        if (!this._isMediaEnded) {
          player?.play()
        }
        break
      }
      // Fires when media content should be paused.
      // This usually happens right before an ad is about to cover the content.
      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED: {
        this._isAdRunning = true
        player?.pause()
        break
      }
      // Fires when the ad starts playing.
      // Player can display a pause button and create an ad countdown timer.
      case google.ima.AdEvent.Type.STARTED: {
        if (ad.isLinear()) {
          this._isAdPaused = false
          this.player.emit(Events.AD_PLAY, {
            ad
          })

          // For a linear ad, a timer can be started to poll for
          // the remaining time.
          intervalTimer = setInterval(function () {
            // Example: const remainingTime = adsManager.getRemainingTime();
          }, 300) // every 300ms
        }
        break
      }
      // Fires when the ad is resumed.
      // This event is sent when an ad is resumed after a pause.
      case google.ima.AdEvent.Type.RESUMED: {
        this._isAdPaused = false
        this.player.emit(ADEvents.AD_PLAY, {
          ad
        })
        break
      }
      // Fires when the ad is paused.
      // This event is sent when an ad is paused before it finishes.
      case google.ima.AdEvent.Type.PAUSED: {
        this._isAdPaused = true
        this.player.emit(ADEvents.AD_PAUSE, {
          ad
        })
        break
      }
      // Fires when the ad completes playing.
      // Player could remove the ad UI also start playing the next ad.
      case google.ima.AdEvent.Type.COMPLETE:
      default:
        if (ad?.isLinear()) {
          clearInterval(intervalTimer)
        }
        break
    }
  }

  reset () {
    this._isAdRunning = false
    this.adsManager?.destroy()
    this.adsManager = null
    this.adsLoader?.contentComplete()
  }

  /**
   * Creates the AdsRequest and request ads through the AdsLoader.
   */
  requestAds () {
    const { adsRequest: providedAdsRequest, adsResponse, adTagUrl } = this.config
    const { player } = this

    const adsRequest = new google.ima.AdsRequest()

    adsRequest.linearAdSlotWidth = player.sizeInfo.width
    adsRequest.linearAdSlotHeight = player.sizeInfo.height
    adsRequest.nonLinearAdSlotWidth = player.sizeInfo.width
    adsRequest.nonLinearAdSlotHeight = player.sizeInfo.height
    adsRequest.setAdWillAutoPlay(this.autoplayAllowed)
    adsRequest.setAdWillPlayMuted(this.autoplayRequiresMuted)

    if (adTagUrl) {
      adsRequest.adTagUrl = adTagUrl
    } else if (adsResponse) {
      adsRequest.adsResponse = adsResponse
    } else if (providedAdsRequest && typeof providedAdsRequest === 'object') {
      Object.keys(providedAdsRequest).forEach((key) => {
        adsRequest[key] = providedAdsRequest[key]
      })
    }

    logger.log('requestAds', JSON.stringify(adsRequest))

    this.adsLoader?.requestAds(adsRequest)
  }

  /**
   * @public
   */
  pause () {
    return this.adsManager?.pause()
  }

  /**
   * @public
   */
  play () {
    return this.adsManager?.resume()
  }

  /**
   * @public
   * @description Skips the current ad when AdsManager.getAdSkippableState() is true.
   * When called under other circumstances, skip has no effect.
   * After the skip is completed the AdsManager fires an AdEvent.SKIPPED event.
   * AdsManager.skip() only skips ads if IMA does not render the 'Skip ad' button.
   */
  skip () {
    return this.adsManager?.skip()
  }

  updateConfig (config) {
    super.updateConfig(config)
    this._initConfig()
  }

  /**
   * @private
   */
  async _checkAutoplaySupport () {
    const [autoplayAllowed, autoplayMutedAllowed] = await Promise.all([
      this.player.config.autoplay ?
        canAutoplay.video({ timeout: 100 }).then(({ result }) => result) :
        Promise.resolve(false),
      this.player.config.autoplay && this.player.config.autoplayMuted ?
        canAutoplay.video({ timeout: 100, muted: true }).then(({ result }) => result) :
        Promise.resolve(false)
    ])

    this.autoplayAllowed = autoplayAllowed || autoplayMutedAllowed
    this.autoplayRequiresMuted = !autoplayAllowed && autoplayMutedAllowed

    logger.log('checkAutoplaySupport', this.autoplayAllowed, this.autoplayRequiresMuted)
  }
}
