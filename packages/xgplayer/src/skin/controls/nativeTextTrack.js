import Player from '../../player'
import '../style/controls/textTrack.scss'

let s_nativeTextTrack = function () {
  if (!this.config.nativeTextTrack) {
    return
  }
  let player = this
  let root = player.root
  let util = Player.util
  let container = util.createDom('xg-texttrack', '', {tabindex: 7}, 'xgplayer-texttrack')
  let list = player.config.nativeTextTrack
  if (list && Array.isArray(list) && list.length > 0) {
    util.addClass(player.root, 'xgplayer-is-texttrack')
    player.once('canplay', function () {
      let tmp = ['<ul>']
      tmp.push(`<li class='${this.textTrackShowDefault ? '' : 'selected'}'}'>${player.lang.OFF}</li>`)
      list.forEach(item => {
        tmp.push(`<li class='${item.default && this.textTrackShowDefault ? 'selected' : ''}'>${item.label}</li>`)
      })
      let controlText = player.lang.TEXTTRACK
      tmp.push(`</ul><p class="name">${controlText}</p>`)

      let urlInRoot = root.querySelector('.xgplayer-texttrack')
      if (urlInRoot) {
        urlInRoot.innerHTML = tmp.join('')
        let cur = urlInRoot.querySelector('.name')
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          cur.addEventListener('mouseenter', e => {
            e.preventDefault()
            e.stopPropagation()
            util.addClass(root, 'xgplayer-texttrack-active')
            urlInRoot.focus()
          })
        }
      } else {
        container.innerHTML = tmp.join('')
        let cur = container.querySelector('.name')
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          cur.addEventListener('mouseenter', e => {
            e.preventDefault()
            e.stopPropagation()
            util.addClass(player.root, 'xgplayer-texttrack-active')
            container.focus()
          })
        }
        player.controls.appendChild(container)
      }
    })
  };

  ['touchend', 'click'].forEach(item => {
    container.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let li = e.target || e.srcElement
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          util.removeClass(item, 'selected')
        })
        util.addClass(li, 'selected')
        let trackDoms = player.root.getElementsByTagName('Track')
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden'
          trackDoms[0].src = ''
          util.removeClass(player.root, 'xgplayer-texttrack-active')
        } else {
          trackDoms[0].style.display = 'block'
          util.addClass(player.root, 'xgplayer-texttrack-active')
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
      } else if (player.config.textTrackActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(player.root, 'xgplayer-texttrack-active')
        container.focus()
      }
    }, false)
  })

  player.on('play', () => {
    let ul = root.querySelector('.xgplayer-texttrack ul')
    let trackDoms = root.getElementsByTagName('Track')
    if (!player['hls'] || !ul || !trackDoms) return
    trackDoms[0].src = ''
    Array.prototype.forEach.call(ul.childNodes, li => {
      if (util.hasClass(li, 'selected')) {
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden'
          trackDoms[0].src = ''
        } else {
          trackDoms[0].track.mode = 'hidden'

          list.some(item => {
            if (item.label !== li.innerHTML) {
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

          list.some(item => {
            if (item.label === li.innerHTML) {
              setTimeout(() => {
                trackDoms[0].src = item.src
                if (item.kind) {
                  trackDoms[0].kind = item.kind
                }
                trackDoms[0].label = item.label
                if (item.srclang) {
                  trackDoms[0].srclang = item.srclang
                }
                trackDoms[0].track.mode = 'showing'
              })
              return true
            }
          })
        }
      }
    })
    util.removeClass(player.root, 'xgplayer-texttrack-active')
  })

  container.addEventListener('mouseleave', e => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'xgplayer-texttrack-active')
  })
}

export default {
  name: 's_nativeTextTrack',
  method: s_nativeTextTrack
}
