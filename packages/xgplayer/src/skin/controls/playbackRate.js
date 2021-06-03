import { createDom, addClass, removeClass, hasClass, toggleClass } from '../../utils/util'
import sniffer from '../../utils/sniffer'
import '../style/controls/playbackRate.scss'

let s_playbackRate = function () {
  let player = this
  let playbackRateList = []
  if (player.config.playbackRate) {
    playbackRateList = [].concat(player.config.playbackRate)
    playbackRateList.sort((a, b) => b - a)
  } else {
    return false
  }
  let unit = player.config.playbackRateUnit !== undefined ? player.config.playbackRateUnit : 'x'
  let container = createDom('xg-playbackrate', " ", {}, 'xgplayer-playbackrate')
  if (sniffer.device === 'mobile') {
    player.config.playbackRateActive = 'click'
  }

  let list = []
  playbackRateList.forEach(item => {
    list.push({name: `${item}`, rate: `${item}${unit}`, selected: false})
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
  tmp.push(`</ul><p class='name'>${selectedSpeed}${unit}</p>`)
  let playbackDom = player.root.querySelector('.xgplayer-playbackrate')
  if (playbackDom) {
    playbackDom.innerHTML = tmp.join('')
    let cur = playbackDom.querySelector('.name')
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      cur.addEventListener('mouseenter', (e) => {
        e.preventDefault()
        e.stopPropagation()
        addClass(player.root, 'xgplayer-playbackrate-active')
        playbackDom.focus()
      })
    }
  } else {
    container.innerHTML = tmp.join('')
    let cur = container.querySelector('.name')
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      cur.addEventListener('mouseenter', (e) => {
        e.preventDefault()
        e.stopPropagation()
        addClass(player.root, 'xgplayer-playbackrate-active')
        container.focus()
      })
    }
    player.once('ready', () => {
      player.controls.appendChild(container)
    })
  }

  let ev = ['touchend', 'click']
  ev.forEach(item => {
    container.addEventListener(item, e => {
      e.stopPropagation()
      e.preventDefault()
      let li = e.target
      if(li && li.tagName.toLocaleLowerCase() === 'li') {
        let from, to
        list.forEach(item => {
          item.selected = false
          if (li.textContent.replace(/\s+/g,"") === item.rate) {
            Array.prototype.forEach.call(li.parentNode.childNodes, item => {
              if(hasClass(item, 'selected')) {
                from = Number(item.getAttribute('cname'))
                removeClass(item, 'selected')
              }
            })
            item.selected = true
            player.video.playbackRate = item.name * 1
            selectedSpeed = item.name * 1
          }
        })
        addClass(li, 'selected')
        to = Number(li.getAttribute('cname'))
        li.parentNode.nextSibling.innerHTML = `${li.getAttribute('cname')}${unit}`
        player.emit('playbackrateChange', {from, to})
        if (sniffer.device === 'mobile') {
          removeClass(player.root, 'xgplayer-playbackrate-active')
        }
      } else if (player.config.playbackRateActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
        if(sniffer.device === 'mobile') {
          toggleClass(player.root, 'xgplayer-playbackrate-active')
        } else {
          addClass(player.root, 'xgplayer-playbackrate-active')
        }
        container.focus()
      }
      player.emit('focus')
    }, false)
  })
  container.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeClass(player.root, 'xgplayer-playbackrate-active')
  })

  function onBlur () {
    removeClass(player.root, 'xgplayer-playbackrate-active')
  }
  player.on('blur', onBlur)

  player.on('play', () => {
    if(player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1) ) {
      player.video.playbackRate = selectedSpeed
    }
  })
}

export default {
  name: 's_playbackRate',
  method: s_playbackRate
}