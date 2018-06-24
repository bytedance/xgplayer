import {version} from '../package.json'
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
  constructor (type, vid, errd = {line: '', handle: '', msg: '', version: ''}, vd = 0, vu = []) {
    let r = {}
    r.pv = version // 播放器版本
    r.errt = type
    r.v = vid // 视频id
    r.uid = /tt_webid=(\d+)/gi.test(document.cookie) ? RegExp.$1 : '' // user_id
    r.dm = document.domain // domain
    r.sv = 1 // 统计接口的服务器端版本号
    r.pt = 0 // 启动本次播放的时间戳
    r.at = 0 // 在 complete 时默认完成，如果在之前数据已经上报获取到，则不需要在设置
    r.lt = 0 // QUESTION: 没有点播就离开，目前只是在 beforeunload 中做了监听，数据不准确
    r.bft = 0 // 结束时监听，在开始时置零
    r.br = 0 // 如果是 timeout 事件触发，意味着播放中断
    r.lc = 0 // TODO: 需要获得重播的事件，目前不敢对 beforeReplay 进行赋值操作
    r.vu = vu // 视频地址列表
    r.vd = 0 // 视频时长
    r.vs = 0 // TODO：video_size 视频总大小，从APi获取不到，建议可以从API获取，在complete中即可获取
    r.ps = 0 // TODO：parsed_size 已经解码的大小
    r.rs = 0 // TODO：requested_size 已经请求的大小
    r.errt = type // 错误类型
    r.errd = errd // 错误详情
    r.ex = (ErrorTypes[type] || {}).msg // 补充信息
    return r
  }
}

export default Errors
