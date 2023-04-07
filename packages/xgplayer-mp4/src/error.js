import { Errors } from 'xgplayer'

class _Errors extends Errors {
  constructor (type, vid, errd = {}, url = '') {
    errd.version = __VERSION__
    super(type, vid, errd)
    this.url = url
  }
}

export default _Errors
