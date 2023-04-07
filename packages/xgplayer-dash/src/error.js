/* eslint-disable no-undef */
import { Errors } from 'xgplayer'
const version = JSON.parse('__XGPLAYER_DASH__')
console.log('version', version)
class _Errors extends Errors {
  constructor (type, vid, errd = {}, url = '') {
    errd.version = version
    super(type, vid, errd)
    this.url = url
  }
}

export default _Errors
