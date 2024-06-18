import { BasePlugin, Plugin, Util } from 'xgplayer'
import { Logger, createPublicPromise } from 'xgplayer-streaming-shared'
import * as AdEvents from './events'
import { ImaAdManager } from './imaAdManager'
import './index.scss'

const logger = new Logger('AdsPlugin')

export class AdsPlugin extends Plugin {
  static get pluginName () {
    return 'ad'
  }
  get version () {
    return __VERSION__
  }

  afterCreate () {
    this.csManager = undefined
  }

  beforePlayerInit () {
    logger.log(`plugin config: ${JSON.stringify(this.config || {})}`)

    this._initHooks()
    this._proxyPlayer()

    this.initPromise = createPublicPromise()

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

    this.csManager.on(AdEvents.IMA_AD_LOADER_READY, () => {
      this.emit(AdEvents.IMA_AD_LOADER_READY)
    })
    this.csManager.on(AdEvents.IMA_AD_MANAGER_READY, () => {
      this.initPromise?.resolve()
      this.emit(AdEvents.IMA_AD_MANAGER_READY)
    })

    this.csManager.init()
  }

  requestAds (payload) {
    this.csManager?.requestAds(payload)
  }

  destroy () {
    this.csManager?.destroy()
  }
}
