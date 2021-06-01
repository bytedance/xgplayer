import { createDom } from '../../utils/util'
import Loading from '../assets/loading.svg'
import '../style/controls/loading.scss'

let s_loading = function () {
  let player = this
  let root = player.root
  let container = createDom('xg-loading', `${Loading}`, {}, 'xgplayer-loading')
  player.once('ready', () => {
    root.appendChild(container)
  })
}

export default {
  name: 's_loading',
  method: s_loading
}