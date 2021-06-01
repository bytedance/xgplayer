import { createDom, addClass } from '../../utils/util'
import PlayNextIcon from '../assets/playNext.svg'
import '../style/controls/playNext.scss'

let s_playNext = function () {
  let player = this
  let nextBtn = player.config.playNext
  if (!nextBtn || !nextBtn.urlList) { return }
  let btn = createDom('xg-playnext', `<xg-icon class="xgplayer-icon">${PlayNextIcon}</xg-icon>`, {}, 'xgplayer-playnext')
  let tipsText = player.lang.PLAYNEXT_TIPS
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-playnext">${tipsText}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      addClass(player.root, 'xgplayer-is-enter')
      player.userGestureTrigEvent('playNextBtnClick')
    })
  })

  let onUrlListEnd = function () {
    addClass(player.root, 'xgplayer-playnext-inactive')
  }
  player.on('urlListEnd', onUrlListEnd)

  function onDestroy () {
    player.off('urlListEnd', onUrlListEnd)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 's_playNext',
  method: s_playNext
}