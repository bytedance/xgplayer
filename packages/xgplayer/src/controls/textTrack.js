import SubTitles from 'xgplayer-subtitles'
const defaultStyle = {
  follow: true, // 是否跟随控制栏调整位置
  mode: 'stroke', // 字体显示模式，默认是描边
  followBottom: 50, // 跟随底部控制栏的高度
  fitVideo: true, // 是否跟随视频自动调整字号
  offsetBottom: 2, // 字幕距离画面底部百分比，默认2%
  baseSizeX: 49, // 横屏视频适配基准字号
  baseSizeY: 28, // 竖屏视频适配基准字号
  minSize: 16, // pc端最小字号
  minMobileSize: 13, // 移动端最小字号
  line: 'double', // 最大显示行数 single/double/three
  fontColor: '#fff' // 字体颜色
}

// function createSubTitle (textTrack, style = {}, defaultOpen = true) {
//   const config = {
//     subTitles: textTrack,
//     defaultOpen: defaultOpen
//   }

//   Object.keys(style).map(key => {
//     config[key] = style[key]
//   })
//   return new SubTitles(config)
// }

class XgSubtitles {
  constructor (player, list, style) {
    const subtitle = this.create(list, style, player.textTrackShowDefault)
    subtitle.attachPlayer(player)
    this.subtitle = subtitle
    this.player = player
    this.positionData = {
      vBottom: 0,
      marginBottom: 0
    }
    this.isActive = false
    this.followBottom = style.followBottom;
    ['onSubtitleResize', 'onFocus', 'onBlur'].map(item => {
      this[item] = this[item].bind(this)
    })

    if (player.controls && style.follow) {
      this.subtitle.on('resize', this.onSubtitleResize)
      player.on('focus', this.onFocus)
      player.on('blur', this.onBlur)
    }
  }

  create (textTrack, style = {}, defaultOpen = true) {
    const config = {
      subTitles: textTrack,
      defaultOpen: defaultOpen
    }
    Object.keys(style).map(key => {
      config[key] = style[key]
    })
    return new SubTitles(config)
  }

  switch (subtitle) {
    return this.subtitle.switch(subtitle)
  }

  switchOff () {
    return this.subtitle.switchOff()
  }

  setSubTitles (subtitles) {
    return this.subtitle.setSubTitles(subtitles)
  }

  onFocus () {
    const { marginBottom, vBottom } = this.positionData
    if (this.isActive || !marginBottom) {
      return
    }
    this.isActive = true
    let bottom = marginBottom + vBottom
    if (this.followBottom > bottom) {
      bottom = this.followBottom
    }
    this.subtitle && (this.subtitle.root.style.bottom = `${bottom}px`)
  }

  onBlur () {
    this.isActive = false
    const bottom = this.positionData.vBottom + this.positionData.marginBottom
    this.subtitle && (this.subtitle.root.style.bottom = `${bottom}px`)
  }

  onSubtitleResize (data) {
    this.positionData.vBottom = data.vBottom
    this.positionData.marginBottom = data.marginBottom
  }

  destroy () {
    this.subtitle.off('resize', this.onSubtitleResize)
    this.player.off('focus', this.onFocus)
    this.player.off('blur', this.onBlur)
    this.subtitle.destroy()
    this.subtitle = null
  }
}

let textTrack = function () {
  const player = this
  const { textTrack } = player.config
  if (!textTrack) {
    return
  }
  let textTrackStyle = player.config.textTrackStyle || {}
  Object.keys(defaultStyle).map(key => {
    if (textTrackStyle[key] === undefined) {
      textTrackStyle[key] = defaultStyle[key]
    }
  })
  player.textTrackShowDefault = false
  player.config.textTrack.map((item, index) => {
    if (!item.id && !item.language) {
      item.id = index
    }
    !item.url && (item.url = item.src)
    !item.language && (item.language = item.srclang)
    item.isDefault === undefined && (item.isDefault = item.default)
    !player.textTrackShowDefault && (player.textTrackShowDefault = item.isDefault || item.default)
  })

  this.subTitles = new XgSubtitles(player, player.config.textTrack, textTrackStyle)

  player.setSubTitles = (textTrack) => {
    textTrack.map((item, index) => {
      if (!item.id && !item.language) {
        item.id = index
      }
      !item.url && (item.url = item.src)
      !item.language && (item.language = item.srclang)
      item.isDefault === undefined && (item.isDefault = item.default)
    })
    this.subTitles.setSubTitles(textTrack)
    player.emit('subtitle_change', {
      off: false,
      isListUpdate: true,
      list: textTrack
    })
  }

  player.switchSubTitle = (subtitle = { id: '', language: '' }) => {
    this.subTitles.switch(subtitle).then(data => {
      if (data.code === 0) {
        subtitle.off = false
        subtitle.isListUpdate = false
        subtitle.list = []
        player.emit('subtitle_change', subtitle)
      }
    })
  }

  player.switchOffSubtile = () => {
    this.subTitles.switchOff()
    player.emit('subtitle_change', {
      off: true,
      isListUpdate: false,
      list: []
    })
  }

  function onDestroy () {
    this.subTitles.destroy()
    this.subTitles = null
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'textTrack',
  method: textTrack
}
