import { BasePlugin, Plugin, Util } from 'xgplayer'
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
    return !!(this.csManager?.isAdRunning && this.csManager?.paused)
  }

  afterCreate () {
    this.csManager = undefined
  }

  beforePlayerInit () {
    logger.log(`plugin config: ${JSON.stringify(this.config || {})}`)

    // this._initHooks()
    // this._proxyPlayer()

    this.initPromise = createPublicPromise()
    this.uiManager = new AdUIManager(this.config, {
      plugin: this,
      player: this.player
    })

    if (this.config.adType === 'ima') {
      this.initClientSideAd()
    }

    return this.initPromise
  }

  /**
   * @private
   */
  _initHooks () {
    this.player.useHooks('play', () => {
      if (this.csManager?.isAdRunning) {
        this.csManager?.play()
        return false
      }
    })
    this.player.useHooks('pause', () => {
      if (this.csManager?.isAdRunning) {
        this.csManager?.pause()
        return false
      }
    })
  }

  /**
   * @private
   */
  _proxyPlayer () {
    const { player } = this

    BasePlugin.defineGetterOrSetter(player, {
      adPaused: {
        get: () => {
          const media = player.media || player.video
          logger.log(
            'csManager.paused',
            this.csManager?.isAdRunning,
            this.csManager.paused,
            this.csManager?.isAdRunning
              ? this.csManager.paused
              : media
                ? media.paused
                : true
          )
          return this.csManager?.isAdRunning
            ? this.csManager.paused
            : media
              ? media.paused
              : true
        },
        configurable: true
      }
    })
  }

  render () {
    return Util.createDom('xg-ad', '', {}, 'xgplayer-ads')
  }

  initClientSideAd () {
    if (this.config.adType === 'ima') {
      this.initImaAd()
    }
  }

  initImaAd () {
    this.csManager = new ImaAdManager({
      player: this.player,
      config: this.config.ima,
      displayContainer: this.root
    })

    this.csManager.once(AdEvents.IMA_READY_TO_PLAY, () => {
      this.initPromise?.resolve()
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
    this.csManager?.destroy()
  }

  reset () {
    this.csManager?.reset()
  }

  updateConfig (config) {
    this.csManager?.updateConfig(config)
  }
}
