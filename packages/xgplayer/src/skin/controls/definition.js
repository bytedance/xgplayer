import { createDom, addClass, removeClass, hasClass, toggleClass } from '../../utils/util'
import sniffer from '../../utils/sniffer'
import '../style/controls/definition.scss'

let s_definition = function () {
  let player = this
  let root = player.root
  let paused
  let container = createDom('xg-definition', '', {tabindex: 3}, 'xgplayer-definition')
  if (sniffer.device === 'mobile') {
    player.config.definitionActive = 'click'
  }

  function onCanplayResourceReady () {
    let list = player.definitionList
    let tmp = ['<ul>'], src = player.config.url, a = document.createElement('a')
    if (player.switchURL) {
      ['mp4', 'hls', '__flv__', 'dash'].every(item => {
        if (player[item]) {
          if(player[item].url) {
            a.href = player[item].url
          }
          if(item === '__flv__') {
            if(player[item]._options) {
              a.href = player[item]._options.url
            } else {
              a.href = player[item]._mediaDataSource.url
            }
          }
          if(item === 'hls') {
            a.href = player[item].originUrl || player[item].url
            src = a.href
          }
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
        tmp.push(`<li url='${item.url}' cname='${item.name}' class='${item.selected ? 'selected' : ''}'>${item.name}</li>`)
      } else {
        tmp.push(`<li url='${item.url}' cname='${item.name}' class='${a.href === src ? 'selected' : ''}'>${item.name}</li>`)
      }
    })
    let cursrc = list.filter(item => {
      a.href = item.url
      if (player.dash) {
        return item.selected === true
      } else {
        return a.href === src
      }
    })
    tmp.push(`</ul><p class='name'>${(cursrc[0] || {name: ''}).name}</p>`)
    let urlInRoot = root.querySelector('.xgplayer-definition')
    if (urlInRoot) {
      urlInRoot.innerHTML = tmp.join('')
      let cur = urlInRoot.querySelector('.name')
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', (e) => {
          e.preventDefault()
          e.stopPropagation()
          addClass(player.root, 'xgplayer-definition-active')
          urlInRoot.focus()
        })
      }
    } else {
      container.innerHTML = tmp.join('')
      let cur = container.querySelector('.name')
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', (e) => {
          e.preventDefault()
          e.stopPropagation()
          addClass(player.root, 'xgplayer-definition-active')
          container.focus()
        })
      }
      player.controls.appendChild(container)
    }
  }
  function onResourceReady (list) {
    player.definitionList = list
    if (list && list instanceof Array && list.length > 0) {
      addClass(root, 'xgplayer-is-definition')
      player.once('canplay', onCanplayResourceReady)
    }
  }
  player.on('resourceReady', onResourceReady)

  function onPlayingChangeDefinition () {
    player.currentTime = player.curTime
    if (paused) {
      player.pause()
    } else {
      let playPromise = player.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => {})
      }
    }
  };
  function onTimeupdateChangeDefinition () {
    player.once('timeupdate', onPlayingChangeDefinition)
  };
  ['touchend', 'click'].forEach(item => {
    container.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let list = player.definitionList
      let li = e.target || e.srcElement, a = document.createElement('a')
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        let from, to
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          if(hasClass(item, 'selected')) {
            from = item.getAttribute('cname')
            removeClass(item, 'selected')
            player.emit('beforeDefinitionChange', item.getAttribute('url'))
          }
        })
        if (player.dash) {
          list.forEach(item => {
            item.selected = false
            if (item.name === li.innerHTML) {
              item.selected = true
            }
          })
        }

        addClass(li, 'selected')
        to = li.getAttribute('cname')
        li.parentNode.nextSibling.innerHTML = `${li.getAttribute('cname')}`
        a.href = li.getAttribute('url')
        paused = player.paused
        if (player.switchURL) {
          let curRUL = document.createElement('a');
          ['mp4', 'hls', '__flv__', 'dash'].every(item => {
            if (player[item]) {
              if(player[item].url) {
                curRUL.href = player[item].url
              }
              if(item === '__flv__') {
                if(player[item]._options) {
                  curRUL.href = player[item]._options.url
                } else {
                  curRUL.href = player[item]._mediaDataSource.url
                }
              }
              if(item === 'hls') {
                curRUL.href = player[item].originUrl || player[item].url
              }
              return false
            } else {
              return true
            }
          })
          if (curRUL.href !== a.href && !player.ended) {
            player.switchURL(a.href)
          }
        } else {
          if (player['hls']) {
            let curRUL = document.createElement('a')
            curRUL = player['hls'].url
          }
          if (a.href !== player.currentSrc) {
            player.curTime = player.currentTime
            if (!player.ended) {
              player.src = a.href
            }
          }
        }
        if(navigator.userAgent.toLowerCase().indexOf('android') > -1) {
          player.once('timeupdate', onTimeupdateChangeDefinition)
        } else {
          player.once('playing', onPlayingChangeDefinition)
        }
        player.emit('definitionChange', {from, to})
        if (sniffer.device === 'mobile') {
          removeClass(player.root, 'xgplayer-definition-active')
        }
      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        if(sniffer.device === 'mobile') {
          toggleClass(player.root, 'xgplayer-definition-active')
        } else {
          addClass(player.root, 'xgplayer-definition-active')
        }
        container.focus()
      }
      player.emit('focus')
    }, false)
  })

  container.addEventListener('mouseleave', e => {
    e.preventDefault()
    e.stopPropagation()
    removeClass(root, 'xgplayer-definition-active')
  })

  function onBlur () {
    removeClass(root, 'xgplayer-definition-active')
  }
  player.on('blur', onBlur)

  function onDestroy () {
    player.off('resourceReady', onResourceReady)
    player.off('canplay', onCanplayResourceReady)
    if(navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      player.off('timeupdate', onTimeupdateChangeDefinition)
      player.off('timeupdate', onPlayingChangeDefinition)
    } else {
      player.off('playing', onPlayingChangeDefinition)
    }
    player.off('blur', onBlur)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)

  player.getCurrentDefinition = function () {
    let liList = player.controls.querySelectorAll('.xgplayer-definition ul li')
    for(let i = 0; i < liList.length; i++) {
      if(liList[i].className && liList[i].className.indexOf('selected') > -1) {
        return {
          name: liList[i].getAttribute('cname'),
          url: liList[i].getAttribute('url')
        }
      }
    }
    return {
      name: liList[0].getAttribute('cname'),
      url: liList[0].getAttribute('url')
    }
  }

  player.switchDefinition = function (definitionObj = {}) {
    let liList = player.controls.querySelectorAll('.xgplayer-definition ul li')
    for(let i = 0; i < liList.length; i++) {
      if(liList[i].getAttribute('cname') === definitionObj.name || liList[i].getAttribute('url') === definitionObj.url || i === definitionObj.index) {
        liList[i].click()
      }
    }
  }
}

export default {
  name: 's_definition',
  method: s_definition
}