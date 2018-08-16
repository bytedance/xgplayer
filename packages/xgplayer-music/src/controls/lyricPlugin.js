import Plugin from '../plugin'

// TODO: 这魔法数字看看是不是可以自动计算出来
function currentIsTop (currentLineDom) {
  const lineHeight = currentLineDom.clientHeight
  if (currentLineDom.offsetTop < lineHeight * 6) {
    return true
  }
  return false
}

function currentIsBottom (currentLineDom) {
  const lineHeight = currentLineDom.clientHeight
  if (currentLineDom.offsetParent.clientHeight - currentLineDom.offsetTop < lineHeight * 6) {
    return true
  }
  return false
}

class lyricThemePlugin extends Plugin {
  constructor (player) {
    super(player)
    const lyric = this.util.createDom(
      'xg-lyric',
      `<div class="xgplayer-lyric-contents">
      </div>`,
      {},
      'xgplayer-lyric'
    )

    player.root.insertBefore(lyric, player.root.firstChild)
  }

  afterPlayerInit () {
    this.lrcContentsNode = document.querySelector('.xgplayer-lyric-contents')
    this.bindLyricUpdate()

    const contents = this.player.__lyric__.list.reduce((pre, {index, lyric, time}) => {
      return pre + `<p>${lyric}</p>`
    }, '')

    this.lrcContentsNode.innerHTML = contents
  }

  bindLyricUpdate () {
    const self = this
    let currentLineNode = null
    this.player.on('lyricUpdate', (f) => {
      currentLineNode && currentLineNode.classList.remove('xgplayer-lyric-current')
      currentLineNode = self.lrcContentsNode.getElementsByTagName('p')[f.idx]
      currentLineNode.classList.add('xgplayer-lyric-current')

      if (currentIsTop(currentLineNode)) {

      } else if (currentIsBottom(currentLineNode)) {

      } else {
        // TODO: 干掉魔法数字
        self.lrcContentsNode.style.transform = `translateY(${-(f.idx - 6) * 16}px)`
        self.lrcContentsNode.style.webkitTransform = `translateY(${-(f.idx - 6) * 16}px)`
      }
    })
  }
}

export default lyricThemePlugin
