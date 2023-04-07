import { EVENT } from 'xgplayer-streaming-shared'

export default class PluginExtension {
  constructor (opts, plugin) {
    this._opts = opts
    this._plugin = plugin
    this._init()
  }

  _init () {
    const { media, preloadTime, innerDegrade, decodeMode } = this._opts

    if (!media) return

    if (innerDegrade) {
      media.setAttribute('innerdegrade', innerDegrade)
    }
    if (preloadTime) {
      media.setAttribute('preloadtime', preloadTime)
    }

    if (media.setDecodeMode) {
      media.setDecodeMode(decodeMode)
    }

    this._bindEvents()
  }

  _bindEvents () {
    const { media } = this._opts

    media.addEventListener('lowdecode', this._onLowDecode)
  }

    _onLowDecode = () => {
      const { media, innerDegrade, backupURL } = this._opts

      this._plugin?.player?.emit('lowdecode', media.degradeInfo)
      this._plugin?.player?.emit('core_event', {
        ...media.degradeInfo,
        eventName: EVENT.LOWDECODE
      })

      if ((innerDegrade === 1 || innerDegrade === 3) && backupURL) {
        this._degrade(backupURL)
      }
    }

    /**
   * @param {string | undefined} url
   */
  _degrade = (url) => {
    const { player } = this._plugin
    const originVideo = player.video

    if (originVideo?.TAG !== 'MVideo') return

    const newVideo = player.video.degradeVideo

    player.video = newVideo

    originVideo.degrade(url)

    if (url) {
      player.config.url = url
    }

    // replace live-video to video element
    const firstChild = player.root.firstChild

    if (firstChild.TAG === 'MVideo') {
      player.root.replaceChild(newVideo, firstChild)
    }
    const flvPlugin = this._plugin.constructor.pluginName.toLowerCase()
    player.unRegisterPlugin(flvPlugin)

    // play
    player.once('canplay', () => {
      player.play()
    })
  }

  forceDegradeToVideo = (url) => {
    const { innerDegrade } = this._opts

    // 降级to video+m3u8
    if (innerDegrade === 1 || innerDegrade === 3) {
      this._degrade(url)
    }
  }

  destroy () {
    this._opts?.media?.removeEventListener('lowdecode', this._onLowDecode)
    this._plugin = null
  }
}
