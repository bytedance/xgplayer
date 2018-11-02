import Player from '../player'

let textTrack = function () {
  if (navigator.userAgent.indexOf('Chrome') === -1) {
    return
  }
  let player = this, util = Player.util, sniffer = Player.sniffer
  let ul = util.createDom('xg-textTrack', '', {tabindex: 7}, 'xgplayer-textTrack'), root = player.controls
  let list = player.config.textTrack
  if (list && Array.isArray(list) && list.length > 1) {
    util.addClass(player.root, 'xgplayer-is-textTrack')
    player.on('canplay', function () {
      let tmp = ['<ul>']
      tmp.push(`<li class=''}'>关闭</li>`)
      list.forEach(item => {
        tmp.push(`<li class='${item.default ? 'textTrack' : ''}'>${item.label}</li>`)
      })
      let controlText = player.config.lang && player.config.lang === 'zh-cn' ? '字幕' : 'Caption'
      tmp.push(`</ul><p class="name"><em>${controlText}</em></p>`)
      let urlInRoot = root.querySelector('.xgplayer-textTrack')
      if (urlInRoot) {
        urlInRoot.innerHTML = tmp.join('')
      } else {
        ul.innerHTML = tmp.join('')
        root.appendChild(ul)
      }
    })
  }

  ['touchstart', 'click'].forEach(item => {
    ul.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let li = e.target || e.srcElement
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          util.removeClass(item, 'textTrack')
        })
        util.addClass(li, 'textTrack')
        let trackDoms = player.root.getElementsByTagName('Track')
        if (li.innerHTML === '关闭') {
          trackDoms[0].track.mode = 'hidden'
          util.removeClass(player.root, 'xgplayer-is-textTrack')
        } else {
          if (!util.hasClass(player.root, 'xgplayer-is-textTrack')) {
            util.addClass(player.root, 'xgplayer-is-textTrack')
          }
          trackDoms[0].track.mode = 'showing'

          list.some(item => {
            if (item.label === li.innerHTML) {
              trackDoms[0].src = item.src
              if (item.kind) {
                trackDoms[0].kind = item.kind
              }
              trackDoms[0].label = item.label
              if (item.srclang) {
                trackDoms[0].srclang = item.srclang
              }
              return true
            }
          })
          player.emit('textTrackChange', li.innerHTML)
        }
      } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(ul, 'xgplayer-textTrack-active')
        ul.focus()
      }
    }, false)
  })

  ul.addEventListener('blur', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(ul, 'xgplayer-textTrack-active')
  })

  player.once('destroy', () => {
    ul = null
  })
}

Player.install('textTrack', textTrack)
