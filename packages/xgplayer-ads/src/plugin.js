import { Plugin, Util } from 'xgplayer'
import { Logger, createPublicPromise } from 'xgplayer-streaming-shared'
import * as AdEvents from './events'
import { ImaAdManager } from './imaAdManager'
import './index.scss'
import { AdUIManager } from './ui/adUIManager'

const logger = new Logger('AdsPlugin')

/**
 * @typedef { import ('./imaAdManager').ImaConfig } ImaConfig
 */

/**
 * @typedef {{
 *   adType: 'ima',
 *   ima: ImaConfig
 * }} AdsPluginConfig
 */

export class AdsPlugin extends Plugin {
  static get pluginName () {
    return 'ad'
  }
  get version () {
    return __VERSION__
  }

  get paused () {
    return !!(this.csManager?.isLinearAdRunning && this.csManager?.paused)
  }

  get currentTime () {
    return this.csManager?.currentTime || 0
  }

  get duration () {
    return this.csManager?.duration || 0
  }

  afterCreate () {
    const { config } = this

    logger.log(`plugin afterCreate, config: ${JSON.stringify(config || {})}`)

    /**
     * @type {ImaAdManager | undefined}
     */
    this.csManager = undefined

    this._blockContentPlay()
  }

  beforePlayerInit () {
    logger.log('plugin beforePlayerInit')

    this.initPromise = createPublicPromise()
    this.uiManager = new AdUIManager(this.config, {
      plugin: this,
      player: this.player
    })

    switch (this.config.adType) {
      case 'ima':
      case 'google-ima':
        this._initClientSideAd()
        break
      default:
        break
    }

    return this.initPromise
  }

  render () {
    return Util.createDom('xg-ad', '', {}, 'xgplayer-ads')
  }

  /**
   * @private
   */
  _initClientSideAd () {
    switch (this.config.adType) {
      case 'ima':
      case 'google-ima':
        this._initImaAd()
        break
      default:
        break
    }
  }

  /**
   * @private
   */
  _initImaAd () {
    this.csManager = new ImaAdManager({
      plugin: this,
      config: this.config.ima,
      displayContainer: this.root
    })

    this.csManager.once(AdEvents.IMA_SDK_LOAD_START, () => {
      this.uiManager.showAdContainer()
    })
    this.csManager.on(AdEvents.IMA_SDK_LOAD_ERROR, () => {
      this.uiManager.hideAdContainer()
    })
    this.csManager.once(AdEvents.IMA_AD_LOADED, ({isPreroll}) => {
      if (!isPreroll) {
        this.uiManager.hideAdContainer()
      }
    })
    this.csManager.once(AdEvents.IMA_READY_TO_PLAY, () => {
      this.initPromise?.resolve()
    })
    this.csManager.on(AdEvents.IMA_CONTENT_PAUSE_REQUESTED, () => {
      this.uiManager.showAdUI()
    })
    this.csManager.on(AdEvents.IMA_CONTENT_RESUME_REQUESTED, () => {
      this.uiManager.hideAdUI()
    })

    this.csManager.init()
  }

  requestAds () {
    this.csManager?.requestAds()
  }

  playAds () {
    this.csManager?.playAds()
  }

  /**
   * @public
   */
  pause () {
    this.csManager?.pause()
  }

  /**
   * @public
   */
  play () {
    this.csManager?.play()
  }

  destroy () {
    this.offAll()

    this.csManager?.destroy()
    this.uiManager?.destroy()
  }

  reset () {
    this.csManager?.reset()
  }

  updateConfig (config) {
    this.csManager?.updateConfig(config)
  }

  /**
   * Makes sure content video state is paused during linear ad or before preroll.
   * @private
   */
  _blockContentPlay () {
    const { player } = this

    player.on('play', () => {
      if (this.csManager?.shouldBlockVideoContent) {
        logger.log('block content play')
        player.pause()
      }
    })
  }
}
