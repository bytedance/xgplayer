import { createDom, addClass, removeClass, hasClass } from '../../utils/util'
import '../style/controls/textTrack.scss'

function renderList (root, textTrack, offText, isDefaultShow) {
  let tmp = []
  tmp.push(`<li data-type="off" class="${isDefaultShow ? '' : 'selected'}">${offText}</li>`)
  textTrack.forEach(item => {
    tmp.push(`<li data-id=${item.id} data-language=${item.language} class="${item.isDefault && isDefaultShow ? 'selected' : ''}">${item.label}</li>`)
  })
  root.innerHTML = tmp.join('')
}

// eslint-disable-next-line camelcase
let s_textTrack = function () {
  let player = this
  if (!this.config.textTrack) {
    return
  }
  const { textTrack } = this.config
  let controlText = player.lang.TEXTTRACK
  const container = createDom('xg-texttrack', `<ul></ul><p class="name">${controlText}</p>`, {tabindex: 7}, 'xgplayer-texttrack')

  function onCanPlay () {
    const urlInRoot = player.root.querySelector('.xgplayer-texttrack')
    if (!urlInRoot) {
      player.controls.appendChild(container)
      const cur = container.querySelector('.name')
      if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
        cur.addEventListener('mouseenter', e => {
          e.preventDefault()
          e.stopPropagation()
          addClass(player.root, 'xgplayer-texttrack-active')
          container.focus()
        })
        container.addEventListener('mouseleave', e => {
          e.preventDefault()
          e.stopPropagation()
          removeClass(player.root, 'xgplayer-texttrack-active')
        })
      } else {
        cur.addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()
          if (hasClass(player.root, 'xgplayer-texttrack-active')) {
            removeClass(player.root, 'xgplayer-texttrack-active')
          } else {
            addClass(player.root, 'xgplayer-texttrack-active')
          }
        })
      }
    }

    ['touchend', 'click'].forEach(item => {
      container.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        let li = e.target || e.srcElement
        if (li && li.tagName.toLocaleLowerCase() === 'li') {
          const id = li.getAttribute('data-id')
          const type = li.getAttribute('data-type')
          const language = li.getAttribute('data-language')
          Array.prototype.forEach.call(li.parentNode.childNodes, item => {
            removeClass(item, 'selected')
          })
          addClass(li, 'selected')
          if (type === 'off') {
            player.switchOffSubtile()
            removeClass(player.root, 'xgplayer-texttrack-active')
          } else {
            player.switchSubTitle({id, language})
            addClass(player.root, 'xgplayer-texttrack-active')
          }
        }
      })
    })

    const ul = container.getElementsByTagName('ul')[0]
    renderList(ul, textTrack, player.lang.OFF, player.textTrackShowDefault)
  }

  const onListUpdate = function (data) {
    if (!data.isListUpdate) return
    const ul = container.getElementsByTagName('ul')[0]
    renderList(ul, data.list, player.lang.OFF, player.textTrackShowDefault)
    if (data.list.length === 0) {
      addClass(container, 'xgplayer-texttrack-hide')
    } else {
      removeClass(container, 'xgplayer-texttrack-hide')
    }
  }

  if (textTrack && Array.isArray(textTrack) && textTrack.length > 0) {
    addClass(player.root, 'xgplayer-is-texttrack')
    player.once('canplay', onCanPlay)
    player.on('subtitle_change', onListUpdate)
  }
}

export default {
  name: 's_textTrack',
  method: s_textTrack
}
