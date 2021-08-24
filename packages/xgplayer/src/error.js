// eslint-disable-next-line no-undef
import version from './version'
/**
 * @typedef { import ('./player').default } Player
 */

const ERROR_TYPE_MAP = {
  1: 'network',
  2: 'network',
  3: 'decoder',
  4: 'format'
}

const ErrorTypes = {
  network: {
    code: 1,
    msg: '视频下载错误',
    remark: '只要视频下载错误就使用此类型，无论是video本身的超时还是xhr的分段请求超时或者资源不存在'
  },
  mse: {
    code: 2,
    msg: '流追加错误',
    remark: '追加流的时候如果类型不对、无法被正确解码则会触发此类错误'
  },
  parse: {
    code: 3,
    msg: '解析错误',
    remark: 'mp4、hls、flv我们都是使用js进行格式解析，如果解析失败则会触发此类错误'
  },
  format: {
    code: 4,
    msg: '格式错误',
    remark: '如果浏览器不支持的格式导致播放错误'
  },
  decoder: {
    code: 5,
    msg: '解码错误',
    remark: '浏览器解码异常会抛出此类型错误'
  },
  runtime: {
    code: 6,
    msg: '语法错误',
    remark: '播放器语法错误'
  },
  timeout: {
    code: 7,
    msg: '播放超时',
    remark: '播放过程中无法正常请求下一个分段导致播放中断'
  },
  other: {
    code: 8,
    msg: '其他错误',
    remark: '不可知的错误或被忽略的错误类型'
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
  constructor (player, errorInfo = { errorType: '', errorCode: 0, errorMessage: '', originError: '', ext: {} }) {
    if (player.video) {
      const mediaError = player.video.error || {}
      const { duration, currentTime, ended, src } = player
      const { readyState, networkState } = player.video
      const r = {
        playerVersion: version,
        currentTime,
        duration,
        ended,
        readyState,
        networkState,
        src,
        errorType: errorInfo.errorType,
        errorCode: errorInfo.errorCode || mediaError.code,
        message: errorInfo.errorMessage || mediaError.message,
        mediaError,
        originError: errorInfo.originError ? errorInfo.originError.stack : ''
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
        r.ex = (ErrorTypes[arguments[0]] || {}).msg // 补充信息
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
