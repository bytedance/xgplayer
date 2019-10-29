import Player from '../../player'

let s_playbackRate = function () {
  let player = this
  let util = Player.util
  if (player.config.playbackRate) {
    player.config.playbackRate.sort((a, b) => b - a)
  } else {
    return false
  }
  let ul = util.createDom('xg-playbackrate', " ", {}, 'xgplayer-playbackrate')
  let list = []
  player.config.playbackRate.forEach(item => {
    list.push({name: `${item}`, rate: `${item}x`, selected: false})
  })
  let selectedSpeed = 1
  let tmp = ['<ul>']
  list.forEach(item => {
    if(player.config.defaultPlaybackRate && player.config.defaultPlaybackRate.toString() === item.name) {
      item.selected = true
      selectedSpeed = player.config.defaultPlaybackRate
      player.once('playing', () => { player.video.playbackRate = player.config.defaultPlaybackRate})
    } else if (item.name === '1.0' || item.name === '1') {
      if(!player.config.defaultPlaybackRate || player.config.defaultPlaybackRate === 1) {
        item.selected = true
      }
    }
    tmp.push(`<li cname='${item.name}' class='${item.selected ? 'selected' : ''}'>${item.rate}</li>`)
  })
  tmp.push(`</ul><p class='name'>${selectedSpeed}x</p>`)
  let playbackDom = player.root.querySelector('.xgplayer-playbackrate')
  if (playbackDom) {
    playbackDom.innerHTML = tmp.join('')
    let cur
    if(playbackDom) {
      cur = playbackDom.querySelector('.name')
    } else return
    cur.addEventListener('mouseenter', (e) => {
      e.preventDefault()
      e.stopPropagation()
      util.addClass(player.root, 'xgplayer-playbackrate-active')
      playbackDom.focus()
    })
  } else {
    ul.innerHTML = tmp.join('')
    let cur
    if(ul) {
      cur = ul.querySelector('.name')
    } else return
    cur.addEventListener('mouseenter', (e) => {
      e.preventDefault()
      e.stopPropagation()
      util.addClass(player.root, 'xgplayer-playbackrate-active')
      ul.focus()
    })
    player.once('ready', () => {
      player.controls.appendChild(ul)
    })
  }

  let ev = ['touchend', 'click']
  ev.forEach(item => {
    ul.addEventListener(item, function(e) {
      e.stopPropagation()
      e.preventDefault()
      let li = e.target
      if(li && li.tagName.toLocaleLowerCase() === 'li') {
        let from, to
        list.forEach(item => {
          item.selected = false
          if (li.textContent.replace(/\s+/g,"") === item.rate) {
            Array.prototype.forEach.call(li.parentNode.childNodes, item => {
              if(util.hasClass(item, 'selected')) {
                from = parseFloat(item.getAttribute('cname'))
                util.removeClass(item, 'selected')
              }
            })
            item.selected = true
            player.video.playbackRate = item.name * 1
            selectedSpeed = item.name * 1
          }
        })
        util.addClass(li, 'selected')
        to = parseFloat(li.getAttribute('cname'))
        li.parentNode.nextSibling.innerHTML = `${li.getAttribute('cname')}x`
        player.emit('playbackrateChange', {from, to})
      } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
        util.addClass(player.root, 'xgplayer-playbackrate-active')
        ul.focus()
      }
      player.emit('focus')
    }, false)
  })
  ul.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    util.removeClass(player.root, 'xgplayer-playbackrate-active')
  })
  player.on('play', () => {
    if(player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1) ) {
      player.video.playbackRate = selectedSpeed
    }
  })
}

Player.install('s_playbackRate', s_playbackRate)
