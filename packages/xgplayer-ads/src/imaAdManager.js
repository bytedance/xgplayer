/* global google */
import { Events } from 'xgplayer'
import { Logger } from 'xgplayer-streaming-shared'
import { BaseAdManager } from './baseAdManager'
import * as ADEvents from './events'

const logger = new Logger('AdsPluginImaAdManager')

export class ImaAdManager extends BaseAdManager {
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
    this._initMediaEvents()
    this._initContainer()
    this._initLoader()
  }

  destroy () {
    super.destroy()

    this._removeMediaEvents()
    this._destroyLoader()
  }

  /**
   * @private
   */
  _initMediaEvents () {
    const { player } = this

    player.on(Events.VIDEO_RESIZE, this.onMediaResize)
    player.on(Events.ENDED, this.onMediaEnded)
  }

  /**
   * @private
   */
  _removeMediaEvents () {
    const { player } = this

    player.off(Events.VIDEO_RESIZE, this.onMediaResize)
    player.off(Events.ENDED, this.onMediaEnded)
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
    // TODO: Must be done through a user action on mobile devices.
    this.displayContainer.initialize()
  }

  /**
   * Initializes the ads loader.
   * @private
   */
  _initLoader () {
    // Create ads loader.
    const adsLoader = (this.adsLoader = new google.ima.AdsLoader(this.displayContainer))

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

    this.emit(ADEvents.IMA_AD_LOADER_READY, { adsLoader })
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
   * End event listener to tell the SDK can play any post-roll ads.
   * @private
   */
  onMediaEnded = () => {
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
  onMediaResize = () => {
    const { player } = this
    const viewMode = this.isFullScreen()
      ? google.ima.ViewMode.FULLSCREEN
      : google.ima.ViewMode.NORMAL
    this.adsManager?.resize(player.sizeInfo.width, player.sizeInfo.height, viewMode)
  }

  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @param {!google.ima.AdsManagerLoadedEvent} ev
   * @private
   */
  onAdsManagerLoaded = ev => {
    const { player } = this

    // Get the ads manager.
    const adsRenderingSettings = new google.ima.AdsRenderingSettings()
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true
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

    try {
      const viewMode = this.isFullScreen()
        ? google.ima.ViewMode.FULLSCREEN
        : google.ima.ViewMode.NORMAL

      adsManager.init(player.sizeInfo.width, player.sizeInfo.height, viewMode)

      if (this.mediaPlayed) {
        adsManager.start()
      } else {
        player.once(Events.PLAY, () => {
          this.mediaPlayed = true
          adsManager.start()
        })
      }
    } catch (adError) {
      this.onAdEvent()
    }

    this.emit(ADEvents.IMA_AD_MANAGER_READY, { adsManager })
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
      // Fires when ad data is available.
      // This is the first event sent for an ad.
      case google.ima.AdEvent.Type.LOADED: {
        if (!ad.isLinear()) {
          this.mediaElement?.play()
        }
        break
      }
      // Fires when media content should be resumed.
      // This usually happens when an ad finishes or collapses.
      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED: {
        this._isAdRunning = false
        player?.pause()
        break
      }
      // Fires when media content should be paused.
      // This usually happens right before an ad is about to cover the content.
      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED: {
        this._isAdRunning = true
        if (!this._isMediaEnded) {
          player?.play()
        }
        break
      }
      // Fires when the ad starts playing.
      // Player can display a pause button and create an ad countdown timer.
      case google.ima.AdEvent.Type.STARTED: {
        if (ad.isLinear()) {
          this._isAdPaused = false
          this.player.emit(Events.PLAY, {
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

  /**
   * @param {!google.ima.AdsRequest} payload
   * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest
   */
  requestAds (payload) {
    this.adsManager?.destroy()

    this.adsLoader?.contentComplete()
    this.adsLoader?.requestAds(payload)
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
}
