import { Errors } from 'xgplayer'
// import { version } from '../package.json'

class _Errors extends Errors {
  constructor (type, vid, errd = {}, url = '') {
    errd.version = '__XGPLAYER_MP4__'
    super(type, vid, errd)
    this.url = url
  }
}

export default _Errors
