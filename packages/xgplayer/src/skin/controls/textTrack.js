import { createDom, addClass, removeClass } from '../../utils/util'
import SubTitles from 'xgplayer-subtitles'
import '../style/controls/textTrack.scss'

const defaultStyle = {
  follow: true, // 是否跟随控制栏调整位置
  mode: 'stroke', // 字体显示模式，默认是描边
  followBottom: 50, // 跟随底部控制栏的高度
  fitVideo: true, // 是否跟随视频自动调整字号
  offsetBottom: 2, // 字幕距离画面底部百分比，默认2%
  baseSizeX: 49, // 横屏视频适配基准字号
  baseSizeY: 28, // 竖屏视频适配基准字号
  minSize: 16, //pc端最小字号
  minMobileSize: 13, // 移动端最小字号
  line: 'double', // 最大显示行数 single/double/three
  fontColor: '#fff' // 字体颜色
}

function createSubTitle (textTrack, style = {}, defaultOpen = true) {
  const config = {
    subTitles: textTrack,
    defaultOpen: defaultOpen
  }

  Object.keys(style).map(key => {
    config[key] = style[key]
  })
  return new SubTitles(config)
}

// eslint-disable-next-line camelcase
let s_textTrack = function () {
  let player = this
  let root = player.root
  if (!this.config.textTrack) {
    return
  }
  const {textTrack} = this.config
  let textTrackStyle = this.config.textTrackStyle || {}
  Object.keys(defaultStyle).map(key => {
    if (textTrackStyle[key] === undefined) {
      textTrackStyle[key] = defaultStyle[key]
    }
  })

  player.textTrackShowDefault = false
  textTrack.map((item, index) => {
    if (!item.id && !item.language) {
      item.id = index
    }
    !item.url && (item.url = item.src)
    !item.language && (item.language = item.srclang)
    item.isDefault === undefined && (item.isDefault = item.default)
    !player.textTrackShowDefault && (player.textTrackShowDefault = item.isDefault || item.default)
  })
  let subtitle = createSubTitle(textTrack, textTrackStyle, player.textTrackShowDefault)
  subtitle.attachPlayer(player)
  let positionData = {}
  let container = createDom('xg-texttrack', '', {tabindex: 7}, 'xgplayer-texttrack')
  if (textTrack && Array.isArray(textTrack) && textTrack.length > 0) {
    addClass(player.root, 'xgplayer-is-texttrack')
    player.once('canplay', function () {
      let tmp = ['<ul>']
      tmp.push(`<li data-type="off" class="${player.textTrackShowDefault ? '' : 'selected'}">${player.lang.OFF}</li>`)
      textTrack.forEach(item => {
        tmp.push(`<li data-id=${item.id} data-language=${item.language} class="${item.isDefault && player.textTrackShowDefault ? 'selected' : ''}">${item.label}</li>`)
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
            addClass(root, 'xgplayer-texttrack-active')
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
            addClass(player.root, 'xgplayer-texttrack-active')
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
        const id = li.getAttribute('data-id')
        const type = li.getAttribute('data-type')
        const language = li.getAttribute('data-language')
        Array.prototype.forEach.call(li.parentNode.childNodes, item => {
          removeClass(item, 'selected')
        })
        addClass(li, 'selected')
        if (type === 'off') {
          subtitle.switchOff()
          removeClass(player.root, 'xgplayer-texttrack-active')
        } else {
          subtitle.switch({id, language})
          addClass(player.root, 'xgplayer-texttrack-active')
          player.emit('textTrackChange', li.innerHTML)
        }
      } else if (player.config.textTrackActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        addClass(player.root, 'xgplayer-texttrack-active')
        container.focus()
      }
    }, false)
  })

  let isActive = false
  let followBottom = textTrackStyle.followBottom
  function onFocus () {
    const {marginBottom, vBottom} = positionData
    if (isActive || !marginBottom) {
      return
    }
    isActive = true
    let bottom = marginBottom + vBottom
    if (followBottom > bottom) {
      bottom = followBottom
    }
    subtitle && (subtitle.root.style.bottom = `${bottom}px`)
  }

  function onBlur () {
    isActive = false
    const bottom = positionData.vBottom + positionData.marginBottom
    subtitle && (subtitle.root.style.bottom = `${bottom}px`)
  }

  function onSubtitleResize (data) {
    positionData.vBottom = data.vBottom
    positionData.marginBottom = data.marginBottom
  }

  if (player.controls && textTrackStyle.follow) {
    subtitle.on('resize', onSubtitleResize)
    player.on('focus', onFocus)
    player.on('blur', onBlur)
  }

  player.once('destroy', () => {
    subtitle.off('resize', onSubtitleResize)
    player.off('focus', onFocus)
    player.off('blur', onBlur)
    subtitle.destroy()
    subtitle = null
  })

  container.addEventListener('mouseleave', e => {
    e.preventDefault()
    e.stopPropagation()
    removeClass(player.root, 'xgplayer-texttrack-active')
  })
}

export default {
  name: 's_textTrack',
  method: s_textTrack
}