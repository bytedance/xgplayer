import Player from '../player'

let definition = function () {
  let player = this, util = Player.util, sniffer = Player.sniffer
  let ul = util.createDom('xg-definition', '', {tabindex: 3}, 'xgplayer-definition'), root = player.controls
  if (sniffer.device === 'mobile') {
    return
  }
  player.on('resourceReady', function (list) {
    if (list && list instanceof Array && list.length > 1) {
      util.addClass(player.root, 'xgplayer-is-definition')
      player.on('canplay', function () {
        let tmp = ['<ul>'], src = player.config.url, a = document.createElement('a')
        if (player.switchURL) {
          ['mp4', 'hls', 'flv', 'dash'].every(item => {
            if (player[item]) {
              a.href = player[item].url
              src = a.href
              return false
            } else {
              return true
            }
          })
        } else {
          src = player.currentSrc || player.src
        }
        list.forEach(item => {
          a.href = item.url
          if (player.dash) {
            tmp.push(`<li url='${item.url}' cname='${item.name}' class='${item.selected ? 'definition' : ''}'>${item.name}</li>`)
          } else {
            tmp.push(`<li url='${item.url}' cname='${item.name}' class='${a.href === src ? 'definition' : ''}'>${item.name}</li>`)
          }
        })
        let cursrc = list.filter(item => {
          a.href = item.url
          if (player.dash) {
            return item.selected
          } else {
            return a.href === src
          }
        })
        tmp.push(`</ul><p class='name'><em>${(cursrc[0] || {name: ''}).name}</em></p>`)
        let urlInRoot = root.querySelector('.xgplayer-definition')
        let tipsText = player.config.lang && player.config.lang === 'zh-cn' ? '清晰度' : 'Quality'
        if (urlInRoot) {
          urlInRoot.innerHTML = `<xg-tips class='xgplayer-tips'>${tipsText}</xg-tips>` + tmp.join('')
        } else {
          ul.innerHTML = `<xg-tips class='xgplayer-tips'>${tipsText}</xg-tips>` + tmp.join('')
          root.appendChild(ul)
        }
      })
    }
  });

  ['touchstart', 'click'].forEach(item => {
    ul.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let li = e.target || e.srcElement, a = document.createElement('a')
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          util.removeClass(item, 'definition')
        })
        util.addClass(li, 'definition')
        li.parentNode.nextSibling.innerHTML = `<em>${li.getAttribute('cname')}</em>`
        a.href = li.getAttribute('url')
        if (player.switchURL) {
          let curRUL = document.createElement('a');
          ['mp4', 'hls', 'flv', 'dash'].every(item => {
            if (player[item]) {
              curRUL = player[item].url
              return false
            } else {
              return true
            }
          })
          if (curRUL.href !== a.href && !player.ended) {
            player.switchURL(a.href)
          }
        } else {
          if (a.href !== player.currentSrc) {
            let curTime = player.currentTime, paused = player.paused
            if (!player.ended) {
              player.src = a.href
              player.once('canplay', function () {
                player.currentTime = curTime
                if (!paused) {
                  player.play()
                }
              })
            }
          }
        }
        player.emit('definitionchange', a.href)
      } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(ul, 'xgplayer-definition-active')
        ul.focus()
      }
    }, false)
  })

  ul.addEventListener('blur', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(ul, 'xgplayer-definition-active')
  })

  ul.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    let tips = ul.querySelector('.xgplayer-tips')
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = player.root.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  })

  player.once('destroy', () => {
    ul = null
  })
}

Player.install('definition', definition)
