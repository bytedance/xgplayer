import { createDom, format } from '../../utils/util'
import '../style/controls/memoryPlay.scss'

let s_memoryPlay = function () {
  let player = this
  let lastPlayTime = player.config.lastPlayTime || 0
  let lastPlayTimeHideDelay = player.config.lastPlayTimeHideDelay || 0
  let dom = null
  if (lastPlayTime <= 0) {
    return
  }
  dom = createDom('xg-memoryplay', `<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">您上次观看到 <span class="xgplayer-lasttime">${format(lastPlayTime)}</span> ，为您自动续播 <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>`, {}, 'xgplayer-memoryplay');
  dom.addEventListener('mouseover', (e) => {
    e.stopPropagation();
  });
  const removeFunc = () => {
    dom && dom.parentNode && dom.parentNode.removeChild(dom)
    dom = null
  }
  dom.querySelector('.xgplayer-progress-tip .btn-close').addEventListener('click', removeFunc)
  const handlePlay = () => {
    if(lastPlayTimeHideDelay > 0) {
      player.root.appendChild(dom);
    }
    player.emit('memoryPlayStart', lastPlayTime);
    if (lastPlayTimeHideDelay > 0) {
      setTimeout(() => {
        removeFunc()
      }, lastPlayTimeHideDelay * 1000)
    }
  }
  player.once('play', handlePlay)
  player.once('ended', removeFunc)
}

export default {
  name: 's_memoryPlay',
  method: s_memoryPlay
}