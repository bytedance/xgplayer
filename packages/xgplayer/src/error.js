import {version} from '../version.json'
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

class Errors {
  constructor (type, currentTime, duration, networkState, readyState, src, currentSrc,
    ended, errd = {line: '', handle: '', msg: '', version: ''}, errorCode, mediaError) {
    let r = {}
    if (arguments.length > 1) {
      r.playerVersion = version // 播放器版本
      r.errorType = type
      r.domain = document.domain // domain
      r.duration = duration // 视频时长
      r.currentTime = currentTime
      r.networkState = networkState
      r.readyState = readyState
      r.currentSrc = currentSrc
      r.src = src
      r.ended = ended
      r.errd = errd // 错误详情
      r.ex = (ErrorTypes[type] || {}).msg // 补充信息
      r.errorCode = errorCode
      r.mediaError = mediaError
    } else {
      const arg = arguments[0]
      Object.keys(arg).map(key => {
        r[key] = arg[key]
      })
      r.ex = ((arg.type && ErrorTypes[arg.type]) || {}).msg
    }
    return r
  }
}
export default Errors
