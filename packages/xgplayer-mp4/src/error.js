import { Errors } from 'xgplayer'

class _Errors extends Errors {
  constructor (type, vid, errd = {}, url = '') {
    // eslint-disable-next-line no-undef
    errd.version = JSON.parse('__XGPLAYER_MP4__')
    super(type, vid, errd)
    this.url = url
  }
}

export default _Errors
