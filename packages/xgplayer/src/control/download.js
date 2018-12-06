import Player from '../player'
import downloadUtil from 'downloadjs'

const download = function () {
  const player = this
  if (!this.config.download) { return }
  let container = player.root
  let util = Player.util
  const downloadEl = util.createDom('xgplayer-download', `<xg-icon class="xgplayer-download-img"></xg-icon>`, {}, 'xgplayer-download')

  let root = player.controls
  root.appendChild(downloadEl)

  let tipsDownload = player.config.lang && player.config.lang === 'zh-cn' ? '下载' : 'Download'
  let tips = util.createDom('xg-tips', tipsDownload, {}, 'xgplayer-tips')
  downloadEl.appendChild(tips)

  downloadEl.addEventListener('click', (e) => {
    // e.preventDefault();
    e.stopPropagation()
    const url = player.config.url
    downloadUtil(url)
  })

  downloadEl.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  })
}

Player.install('download', download)
