// eslint-disable-next-line no-undef
import version from './version'
import { getHostFromUrl } from './utils/util'
/**
 * @typedef { import ('./player').default } Player
 */

const ERROR_TYPE_MAP = {
  1: 'media',
  2: 'media',
  3: 'media',
  4: 'media',
  5: 'media',
  6: 'media'
}

const ERROR_MAP = {
  1: 5101,
  2: 5102,
  3: 5103,
  4: 5104,
  5: 5105,
  6: 5106
}

const ErrorTypes = {
  network: {
    code: 1
  },
  mse: {
    code: 2
  },
  parse: {
    code: 3
  },
  format: {
    code: 4
  },
  decoder: {
    code: 5
  },
  runtime: {
    code: 6
  },
  timeout: {
    code: 7
  },
  other: {
    code: 8
  }
}

/**
 * @typedef { {
 *   playerVersion: string,
 *   currentTime: number,
 *   duration: number,
 *   ended: boolean,
 *   readyState: number,
 *   networkState: number,
 *   src: any,
 *   errorType: string,
 *   errorCode: number,
 *   message: string,
 *   mediaError?: {
 *     code: number,
 *     message?: string
 *   },
 *   originError?: any,
 *   url?: any,
 *   host?: string,
 *   [propName: string]: any
 * } } IError
 */

/**
 * @type { IError }
 */
class Errors {
  /**
   *
   * @param { Player } player
   * @param { {
   * errorType: string,
   * errorCode: number,
   * errorMessage: string,
   * originError: any,
   * ext: { [propName: string]: any; }
   * } } errorInfo
   * @returns
   */
  constructor (player, errorInfo = { errorType: '', errorCode: 0, errorMessage: '', originError: '', ext: {}, mediaError: null }) {
    const ERROR_TYPES = player && player.i18n ? player.i18n.ERROR_TYPES : null
    if (player.media) {
      const mediaError = errorInfo.mediaError ? errorInfo.mediaError : (player.media.error || {})
      const { duration, currentTime, ended, src, currentSrc } = player
      const { readyState, networkState } = player.media
      let _errc = errorInfo.errorCode || mediaError.code
      if (ERROR_MAP[_errc]) {
        _errc = ERROR_MAP[_errc]
      }
      const r = {
        playerVersion: version,
        currentTime,
        duration,
        ended,
        readyState,
        networkState,
        src: src || currentSrc,
        errorType: errorInfo.errorType,
        errorCode: _errc,
        message: errorInfo.errorMessage || mediaError.message,
        mediaError,
        originError: errorInfo.originError ? errorInfo.originError.stack : '',
        host: getHostFromUrl(src || currentSrc)
      }
      errorInfo.ext && Object.keys(errorInfo.ext).map(key => {
        r[key] = errorInfo.ext[key]
      })
      return r
    } else {
      if (arguments.length > 1) {
        const r = {
          playerVersion: version,
          domain: document.domain
        }
        const arr = ['errorType', 'currentTime', 'duration', 'networkState', 'readyState', 'src', 'currentSrc', 'ended', 'errd', 'errorCode', 'mediaError']
        for (let i = 0; i < arguments.length; i++) {
          r[arr[i]] = arguments[i]
        }
        r.ex = ERROR_TYPES ? (ERROR_TYPES[arguments[0]] || {}).msg : ''// 补充信息
        return r
      }
    }
  }
}

export {
  Errors as default,
  ErrorTypes,
  ERROR_TYPE_MAP
}
