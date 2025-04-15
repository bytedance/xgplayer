/* global google */
import canAutoplay from 'can-autoplay'
import { Events, Util, Sniffer } from 'xgplayer'
import { Logger } from 'xgplayer-streaming-shared'
import { BaseAdManager } from './baseAdManager'
import * as ADEvents from './events'

const logger = new Logger('AdsPluginImaAdManager')

/**
 * @typedef {{
 *   debug?: boolean,
 *   loadSdkTimeout?: number,
 *   locale?: string,
 *   adTagUrl?: string,
 *   adsResponse?: string,
 *   adsRequest?: google.ima.AdsRequest,
 * }} ImaConfig
 */

/**
 * @typedef { import ('xgplayer').default } Player
 */

/**
 * @typedef {{
 *   player?: Player,
 *   config?: ImaConfig,
 *   displayContainer?: HTMLElement,
 * }} ImaAdManagerOptions
 */

const CLASS_NAME = 'xgplayer-ads-playing'

/**
 * @extends {BaseAdManager<ImaConfig, ImaAdManagerOptions>}
 */
export class ImaAdManager extends BaseAdManager {
  /**
   * @param {ImaAdManagerOptions} options
   */
  constructor (options = {}) {
    super(options)

    this.displayContainer = null
    this.adsLoader = null
    this.adsManager = null
  }

  async init () {
    this.shouldBlockVideoContent = !!(this.config.adTagUrl || this.config.adsResponse || this.config.adsRequest)

    try {
      this.emit(ADEvents.IMA_SDK_LOAD_START)
      await this._loadIMASdk()
      this.emit(ADEvents.IMA_SDK_LOAD_SUCCESS)
    } catch (e) {
      logger.error('google.ima sdk is not loaded, due to error', e?.message || e)
      this.emit(ADEvents.IMA_SDK_LOAD_ERROR)
      this.shouldBlockVideoContent = false
      return
    }

    this._initConfig()
    this._initMediaEvents()
    this._initContainer()
    this._initLoader()
    this._initAdsRequest()
  }

  destroy () {
    super.destroy()

    this.reset()
    this._removeMediaEvents()
    this._destroyLoader()
  }

  /**
   * @private
   */
  _initConfig () {
    const { locale } = this.config

    if (locale) {
      google.ima.settings.setLocale(locale)
    }
  }

  /**
   * @private
   */
  _loadIMASdk () {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.ima) {
        resolve()
        return
      }
      const script = document.createElement('script')
      const scriptLoadTimer = setTimeout(() => {
        reject(new Error('google.ima sdk load timeout'))
      }, this.config.loadSdkTimeout || 3000)
      script.src = `https://imasdk.googleapis.com/js/sdkloader/ima3${
        this.config.debug ? '_debug' : ''
      }.js`
      script.onload = () => {
        clearTimeout(scriptLoadTimer)
        resolve()
      }
      script.onerror = e => {
        clearTimeout(scriptLoadTimer)
        reject(e?.message)
      }
      document.head.appendChild(script)
    })
  }

  /**
   * @private
   */
  _initMediaEvents () {
    const { player } = this

    player.on(Events.VIDEO_RESIZE, this._onMediaResize)
    player.on(Events.ENDED, this._onMediaEnded)
    player.on(Events.PLAY, this._onMediaPlay)
    player.on(Events.PAUSE, this._onMediaPause)
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
    player.off(Events.PAUSE, this._onMediaPause)
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

    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this._onAdsManagerLoaded,
      false
    )
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this._onAdsLoaderAdError,
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
      this._onAdsManagerLoaded,
      false
    )
    adsLoader.removeEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this._onAdsLoaderAdError,
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
        if (this.autoplayAllowed) {
          this.playAds()
        } else {
          const cb = () => {
            this.playAds()
            this.player.removeHooks('play', cb)
            return false
          }
          this.player.useHooks('play', cb)
        }
        // 1. 如果在广告开始播放后emit IMA_READY_TO_PLAY，有可能因为其他插件没有初始化完成，导致广告和loading状态同时展示
        // 2. 如果先emit IMA_READY_TO_PLAY再播放广告，有可能看到内容的首帧
        this.emit(ADEvents.IMA_READY_TO_PLAY)
      })
      this.player.once(ADEvents.IMA_AD_ERROR, () => {
        this.emit(ADEvents.IMA_READY_TO_PLAY)
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
    if (this.isLinearAdRunning) {
      return
    }
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
  _onMediaVolumeChange = () => {
    this.adsManager?.setVolume(this.player.muted ? 0 : this.player.volume)
  }

  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @param {!google.ima.AdsManagerLoadedEvent} ev
   * @private
   */
  _onAdsManagerLoaded = ev => {
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

    this.player.emit(ADEvents.IMA_AD_MANAGER_READY, { adsManager })
  }

  playAds () {
    try {
      this._onMediaVolumeChange()

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
      this.adsManager.start()
    } catch (adError) {
      this._handleAdError(adError)
      this._resumeContent()
    }
  }

  /**
   * Handles ad errors.
   * @param {!google.ima.AdErrorEvent} ev
   * @private
   */
  _onAdsManagerAdError = ev => {
    this._handleAdError(ev.getError())
    this._resumeContent()
  }

  /**
   * Handles ad errors.
   * @param {!google.ima.AdErrorEvent} ev
   * @private
   */
  _onAdsLoaderAdError = ev => {
    this._handleAdError(ev.getError())
  }

  /**
   * @private
   */
  _handleAdError = error => {
    logger.log('AdError', error)
    this.shouldBlockVideoContent = false
    this.isLinearAdRunning = false
    this.adsManager?.destroy()
    this.plugin?.emit(ADEvents.IMA_AD_ERROR, error)
    this.plugin?.emit(ADEvents.AD_ERROR, error)
  }

  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @private
   */
  _initAdsManagerEventListeners () {
    const adsManager = this.adsManager

    // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdErrorEvent
    adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this._onAdsManagerAdError
    )

    // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdEvent
    const adEvents = [
      'LOADED',
      'STARTED',
      'RESUMED',
      'PAUSED',
      'COMPLETE',
      'ALL_ADS_COMPLETED',
      'CONTENT_PAUSE_REQUESTED',
      'CONTENT_RESUME_REQUESTED',
      'VOLUME_CHANGED',
      'VOLUME_MUTED',
      'AD_METADATA',
      'AD_CAN_PLAY',
      'AD_PROGRESS',
      'AD_BUFFERING',
      'CLICK',
      'VIDEO_CLICKED',
      'VIDEO_ICON_CLICKED',
      'FIRST_QUARTILE',
      'MIDPOINT',
      'THIRD_QUARTILE',
      'SKIPPED',
      'USER_CLOSE',
      'AD_BREAK_READY',
      'AD_BREAK_FETCH_ERROR'
    ]
    adEvents.forEach(type => {
      adsManager.addEventListener(google.ima.AdEvent.Type[type], this.onAdEvent)
    })
  }

  /**
   * @private
   */
  _resumeContent () {
    this.isLinearAdRunning = false
    this.shouldBlockVideoContent = false
    Util.removeClass(this.player.root, CLASS_NAME)
    if (!this._isMediaEnded) {
      this.player?.play()
    }
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
    const adData = ev?.getAdData() || ad?.data
    let intervalTimer
    let printJsonLog = false

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
        const { adPodInfo } = adData || {}
        const isPreroll = adPodInfo?.podIndex === 0

        printJsonLog = true

        if (isPreroll) {
          if (ad.isLinear()) {
            this.shouldBlockVideoContent = true
          } else {
            this.shouldBlockVideoContent = false
            this.tryContentPlay()
          }
        }

        this.emit(ADEvents.IMA_AD_LOADED, {
          ad,
          isPreroll
        })
        this.plugin.emit(ADEvents.IMA_AD_LOADED, {
          ad,
          isPreroll
        })
        break
      }
      // Fires when media content should be resumed.
      // This usually happens when an ad finishes or collapses.
      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED: {
        this._resumeContent()
        this.emit(ADEvents.IMA_CONTENT_RESUME_REQUESTED, {
          ad
        })
        break
      }
      // Fires when media content should be paused.
      // This usually happens right before an ad is about to cover the content.
      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED: {
        this.isLinearAdRunning = true

        // TODO: Just block content video to play for mutiple MediaElement, Ad in TV is video reused
        if (!(Sniffer.os.isTizen || Sniffer.os.isWebOS) ) {
          this.shouldBlockVideoContent = true
        }
        Util.addClass(this.player.root, CLASS_NAME)
        player?.pause()
        this.emit(ADEvents.IMA_CONTENT_PAUSE_REQUESTED, {
          ad
        })
        break
      }
      // Fires when the ad starts playing.
      // Player can display a pause button and create an ad countdown timer.
      case google.ima.AdEvent.Type.STARTED: {
        this.plugin.emit(ADEvents.AD_START, {
          ad
        })

        if (ad.isLinear()) {
          this._isAdPaused = false
          this.plugin.emit(ADEvents.AD_PLAY, {
            ad
          })

          // // For a linear ad, a timer can be started to poll for
          // // the remaining time.
          // intervalTimer = setInterval(function () {
          //   // Example: const remainingTime = adsManager.getRemainingTime();
          // }, 300) // every 300ms
        }
        break
      }
      // Fires when the ad is resumed.
      // This event is sent when an ad is resumed after a pause.
      case google.ima.AdEvent.Type.RESUMED: {
        this._isAdPaused = false
        this.plugin.emit(ADEvents.AD_PLAY, {
          ad
        })
        break
      }
      // Fires when the ad is paused.
      // This event is sent when an ad is paused before it finishes.
      case google.ima.AdEvent.Type.PAUSED: {
        this._isAdPaused = true
        this.plugin.emit(ADEvents.AD_PAUSE, {
          ad
        })
        break
      }
      // Fires when the ad is skipped by the user.
      case google.ima.AdEvent.Type.SKIPPED: {
        this.plugin.emit(ADEvents.AD_SKIPPED, {
          ad
        })
        break
      }
      // Fires when the ad's current time value changes.
      // Calling getAdData() on this event will return an AdProgressData object.
      case google.ima.AdEvent.Type.AD_PROGRESS: {
        const { currentTime, duration } = ev.getAdData()
        // Sync AdProgressData into AdManager Context.
        Object.assign(this.context, {
          currentTime,
          duration
        })
        this.plugin.emit(ADEvents.AD_TIME_UPDATE, {
          ad
        })
        break
      }
      // Fires when the ad completes playing.
      // Player could remove the ad UI also start playing the next ad.
      case google.ima.AdEvent.Type.COMPLETE: {
        const { adPodInfo } = adData || {}
        let hasNextInPod = false

        if (ad?.isLinear()) {
          if (adPodInfo) {
            hasNextInPod = adPodInfo.adPosition < adPodInfo.totalAds
          }

          clearInterval(intervalTimer)
        }

        this.plugin.emit(ADEvents.IMA_AD_COMPLETE, {
          ad,
          hasNextInPod
        })
        this.plugin.emit(ADEvents.AD_COMPLETE, {
          ad,
          hasNextInPod
        })
        break
      }
      // Fires when the ad completes playing.
      // Player could remove the ad UI also start playing the next ad.
      case google.ima.AdEvent.Type.ALL_ADS_COMPLETED: {
        if (ad?.isLinear()) {
          clearInterval(intervalTimer)
        }

        this.plugin.emit(ADEvents.IMA_ALL_ADS_COMPLETED, {
          ad
        })
        this.player.emit(ADEvents.AD_ALL_COMPLETED, {
          ad
        })
        break
      }
      default:
        if (ad?.isLinear()) {
          clearInterval(intervalTimer)
        }
        break
    }

    logger.log(
      'AdEvent',
      ev?.type,
      printJsonLog ? JSON.stringify(ev?.getAdData() || {}) : ev?.getAd()
    )
  }

  reset () {
    this.isLinearAdRunning = false
    this.adsManager?.destroy()
    this.adsManager = null
    this.adsLoader?.contentComplete()
    Util.removeClass(this.player.root, CLASS_NAME)
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
      Object.keys(providedAdsRequest).forEach(key => {
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
    const autoplay = this.player.config.autoplay
    // Safari 自动启播时间比较久，可能超过500ms+，因此考虑可能的其他浏览器低端机，将兜底timeout默认值`250ms`调高
    const timeout = 800
    const isKnownAutoplayPlatform = Sniffer.os.isTizen || Sniffer.os.isWebOS

    const [autoplayAllowed, autoplayMutedAllowed] = await Promise.all([
      autoplay
        ? isKnownAutoplayPlatform || canAutoplay.video({ timeout }).then(({ result }) => result)
        : Promise.resolve(false),
      autoplay && this.player.config.autoplayMuted
        ? isKnownAutoplayPlatform || canAutoplay.video({ timeout, muted: true }).then(({ result }) => result)
        : Promise.resolve(false)
    ])

    this.autoplayAllowed = autoplayAllowed || autoplayMutedAllowed
    this.autoplayRequiresMuted = !autoplayAllowed && autoplayMutedAllowed

    logger.log('checkAutoplaySupport', this.autoplayAllowed, this.autoplayRequiresMuted)
  }
}
