import { Event } from './hls/constants'

export default class PluginExtension {
  _opts = null
  _plugin = null

  constructor (opts, plugin) {
    this._opts = opts
    this._plugin = plugin
    this._init()
  }

  _init () {
    const { media, preloadTime, innerDegrade, isLive } = this._opts

    if (!media) return

    if (!isLive && media.setPlayMode) {
      media.setPlayMode('VOD')
      return
    }

    if (innerDegrade) {
      media.setAttribute('innerdegrade', innerDegrade)
    }
    if (preloadTime) {
      media.setAttribute('preloadtime', preloadTime)
    }

    this._bindEvents()
  }

  _bindEvents () {
    const { media } = this._opts

    media.addEventListener('lowdecode', this._onLowDecode)
  }

  _onLowDecode = () => {
    const { media, innerDegrade } = this._opts

    this._plugin?.player?.emit('lowdecode', media.degradeInfo)
    this._plugin?.player?.emit('core_event', {
      ...media.degradeInfo,
      eventName: Event.LOWDECODE
    })

    if (innerDegrade === 1) {
      this._degrade(media.src)
    }
  }

  /**
   * @param {string | undefined} url
   */
  _degrade = (url) => {
    const { player } = this._plugin
    const originVideo = player.video

    if (originVideo && originVideo.TAG !== 'MVideo') return

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
    const hlsPlugin = this._plugin.constructor.pluginName.toLowerCase()
    player.unRegisterPlugin(hlsPlugin)

    // play
    player.once('canplay', () => {
      player.play()
    })
  }

  forceDegradeToVideo = (url) => {
    const { innerDegrade } = this._opts

    // 降级to video+m3u8
    if (innerDegrade === 1) {
      this._degrade(url)
    }
  }

  destroy () {
    this._opts?.media?.removeEventListener('lowdecode', this._onLowDecode)
    this._plugin = null
  }
}
