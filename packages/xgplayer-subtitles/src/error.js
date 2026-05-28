const ERROR = [{
  code: 0, // 切换成功
  msg: 'SUCCESS'
}, {
  code: 1, // 下载错误
  msg: 'LOAD_ERROR'
}, {
  code: 2, // 解析错误
  msg: 'PARSER_ERROR'
}, {
  code: 3, // 格式不支持
  msg: 'FORMAT_NOT_SUPPORTED'
},
{
  code: 4, // id或者语言不存在
  msg: 'ID_OR_LANGUAGE_NOT_EXIST'
}, {
  code: 5, // 参数错误
  msg: 'PARAMETERS_ERROR'
}, {
  code: 6, // 操作中断
  msg: 'ABORT'
}, {
  code: 7, // 未知错误
  msg: 'UNKNOWN'
}, {
  code: 8, // url不存在
  msg: 'DATA_ERROR:subtitle.url is null'
}, {
  code: 9, // url不存在
  msg: 'DATA_ERROR:subtitle.url length is 0'
}]

export class SError extends Error {
  constructor (message, code = 7, orgError = null, data = null) {
    if (!message) {
      message = ERROR[code || 7].msg
    }
    super(message)
    this.code = code || 7
    this.message = message
    this.type = ERROR[code || 7].msg
    this.orgError = orgError || null
    this.data = data || null
  }
}

export function _ERROR (code, error = {}, subtitle) {
  const ret = {
    code: ERROR[code].code,
    msg: ERROR[code].msg,
    message: ERROR[code].msg,
    id: subtitle && subtitle.id || '',
    language: subtitle && subtitle.language || ''
  }
  Object.keys(error).map(key => {
    ret[key] = error[key]
  })
  return ret
}
