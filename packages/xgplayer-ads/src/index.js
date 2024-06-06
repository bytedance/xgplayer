import { BasePlugin, Plugin, Util } from 'xgplayer'
import { Logger } from 'xgplayer-streaming-shared'
import * as AdEvents from './events'
import { ImaAdManager } from './imaAdManager'
import './index.scss'

const logger = new Logger('AdsPlugin')

export default class AdsPlugin extends Plugin {
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
    this._initHooks()
    this._proxyPlayer()

    const promise = new Promise((resolve, reject) => {
      if (this.config.adType === 'ima') {
        this.initClientSideAd()

        this.csManager?.on(AdEvents.IMA_AD_MANAGER_LOADED, () => {
          resolve()
        })
      }
    })

    return promise
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
      displayContainer: this.root,
      player: this.player
    })

    this.csManager.init()
  }

  destroy () {
    this.csManager?.destroy()
  }
}
