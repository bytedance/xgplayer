import Player from '../../player'

let s_textTrack = function () {
  // if (navigator.userAgent.indexOf('Chrome') < 0) {
  //   return
  // }
  let player = this
  let root = player.root
  let util = Player.util
  let sniffer = Player.sniffer
  let controls = player.controls
  let container = util.createDom('xg-texttrack', '', {tabindex: 7}, 'xgplayer-texttrack')
  let list = player.config.textTrack
  if (list && Array.isArray(list) && list.length > 0) {
    util.addClass(player.root, 'xgplayer-is-texttrack')
    player.on('canplay', function () {
      let tmp = ['<ul>']
      tmp.push(`<li class='${this.textTrackShowDefault ? '' : 'selected'}'}'>关闭</li>`)
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
        if (li.innerHTML === '关闭') {
          trackDoms[0].track.mode = 'hidden'
          util.removeClass(player.root, 'xgplayer-texttrack-active')
        } else {
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

  container.addEventListener('mouseleave', e => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'xgplayer-texttrack-active')
  })
}

Player.install('s_textTrack', s_textTrack)
