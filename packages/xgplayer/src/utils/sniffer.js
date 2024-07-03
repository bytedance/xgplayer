/**
 *  @typedef {{
 *    isSupport: boolean,
 *    mime: string
 * }} ICheckResult
 */

/**
 * @typedef {{
 *  device: 'pc' | 'mobile',
 *  browser: 'ie' | 'firefox' | 'chrome' | 'opera' | 'safari',
 *  os: {
 *   isTablet: boolean,
 *   isPhone: boolean,
 *   isIpad: boolean,
 *   isIos: boolean,
 *   isAndroid: boolean,
 *   isPc: boolean,
 *   isSymbian: boolean,
 *   isWindowsPhone: boolean,
 *   isFireFox: boolean
 *  },
 *  isWeixin: boolean,
 *  isSupportMP4(): ICheckResult,
 *  isHevcSupported(): boolean,
 *  probeConfigSupported(info: MediaDecodingConfiguration): Promise<MediaCapabilitiesDecodingInfo>
 * }} ISniffer
 */

const VERSION_REG = {
  android: /(Android)\s([\d.]+)/,
  ios: /(Version)\/([\d.]+)/
}

const H264_MIMETYPES = [
  'avc1.42E01E, mp4a.40.2',
  'avc1.58A01E, mp4a.40.2',
  'avc1.4D401E, mp4a.40.2',
  'avc1.64001E, mp4a.40.2',
  'avc1.42E01E',
  'mp4v.20.8',
  'mp4v.20.8, mp4a.40.2',
  'mp4v.20.240, mp4a.40.2'
]

/**
 * @type ISniffer
 */
const sniffer = {
  get device () {
    const r = sniffer.os
    return r.isPc ? 'pc' : 'mobile'
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  },
  get browser () {
    if (typeof navigator === 'undefined') {
      return ''
    }
    const ua = navigator.userAgent.toLowerCase()
    const reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    }
    return [].concat(Object.keys(reg).filter(key => reg[key].test(ua)))[0]
  },
  get os () {
    if (typeof navigator === 'undefined') {
      return {}
    }
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isIpad = /(?:iPad|PlayBook)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const isTablet =
      isIpad ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian && !isTablet
    return {
      isTablet,
      isPhone,
      isIpad,
      isIos: isPhone || isIpad,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    }
  },

  get osVersion () {
    if (typeof navigator === 'undefined') {
      return 0
    }
    const ua = navigator.userAgent
    let reg = ''
    // ios
    if (/(?:iPhone)|(?:iPad|PlayBook)/.test(ua)) {
      reg = VERSION_REG.ios
      // android
    } else {
      reg = VERSION_REG.android
    }
    const _match = reg ? reg.exec(ua) : []
    if (_match && _match.length >= 3) {
      const version = _match[2].split('.')
      return version.length > 0 ? parseInt(version[0]) : 0
    }
    return 0
  },

  get isWeixin () {
    if (typeof navigator === 'undefined') {
      return false
    }
    const reg = /(micromessenger)\/([\d.]+)/
    const match = reg.exec(navigator.userAgent.toLocaleLowerCase())
    if (match) {
      return true
    }
    return false
  },

  /**
   *
   * @returns {{
   *   isSupport: boolean,
   *   mime: string
   * }}
   */
  isSupportMP4 () {
    const result = {
      isSupport: false,
      mime: ''
    }
    if (typeof document === 'undefined') {
      return result
    }
    if (this.supportResult) {
      return this.supportResult
    }
    let a = document.createElement('video')
    if (typeof a.canPlayType === 'function') {
      H264_MIMETYPES.map((key) => {
        if (a.canPlayType(`video/mp4; codecs="${key}"`) === 'probably') {
          result.isSupport = true
          result.mime += `||${key}`
        }
      })
    }
    this.supportResult = result
    a = null
    return result
  },

  /**
   * @description check is support MediaSource Extends
   * @param {string} [mime]
   * @returns { boolean }
   */
  isMSESupport (mime = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"') {
    if (typeof MediaSource === 'undefined' || !MediaSource) return false
    try {
      return MediaSource.isTypeSupported(mime)
    } catch (error) {
      this._logger.error(mime, error)
      return false
    }
  },

  /**
   * Is HEVC Hardware decoding supported by current browser
   * @returns {boolean}
   */
  isHevcSupported () {
    if (typeof MediaSource === 'undefined' || !MediaSource.isTypeSupported) {
      return false
    }
    return (
      MediaSource.isTypeSupported('video/mp4;codecs="hev1.1.6.L120.90"') ||
      MediaSource.isTypeSupported('video/mp4;codecs="hev1.2.4.L120.90"') ||
      MediaSource.isTypeSupported('video/mp4;codecs="hev1.3.E.L120.90"') ||
      MediaSource.isTypeSupported('video/mp4;codecs="hev1.4.10.L120.90"')
    )
  },

  /**
   * @param { MediaDecodingConfiguration } info
   * @returns { Promise<MediaCapabilitiesDecodingInfo> }
   */
  probeConfigSupported (info) {
    const defaults = {
      supported: false,
      smooth: false,
      powerEfficient: false
    }
    if (!info || typeof navigator === 'undefined') {
      return Promise.resolve(defaults)
    }
    if (
      navigator.mediaCapabilities &&
      navigator.mediaCapabilities.decodingInfo
    ) {
      return navigator.mediaCapabilities.decodingInfo(info)
    } else {
      const videoConfig = info.video || {}
      const audioConfig = info.audio || {}
      try {
        const videoSupported = MediaSource.isTypeSupported(
          videoConfig.contentType
        )
        const audioSupported = MediaSource.isTypeSupported(
          audioConfig.contentType
        )

        return Promise.resolve({
          supported: videoSupported && audioSupported,
          smooth: false,
          powerEfficient: false
        })
      } catch (e) {
        return Promise.resolve(defaults)
      }
    }
  }
}

export default sniffer
