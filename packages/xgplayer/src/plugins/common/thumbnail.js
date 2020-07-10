/* eslint-disable camelcase */
import Plugin from '../../plugin'

const {Util} = Plugin

export default class Thumbnail extends Plugin {
  static get pluginName () {
    return 'thumbnail'
  }

  static get defaultConfig () {
    return {
      isShow: false,
      urls: [], // 有多张大图就多个url就好
      pic_num: 0, // 每张图含有几个雪碧图
      col: 0, // 截图列数
      row: 0, // 截图行数
      height: 0,
      width: 0,
      scale: 1,
      className: '', // 额外添加在dom上的class
      hidePortrait: false // 是否在竖屏的时候隐藏
    }
  }

  constructor (args) {
    super(args)
    this.interval = null
    this.rowIndex = 0
    this.colIndex = 0
  }

  afterCreate () {
    this.initThumbnail()
  }

  initThumbnail () {
    const {width, height, scale, className, hidePortrait} = this.config
    className && Util.addClass(this.root, className)
    hidePortrait && Util.addClass(this.root, 'portrait')
    width && (this.root.style.width = `${width * scale}px`)
    height && (this.root.style.height = `${height * scale}px`)
  }

  update (now, clientX = null, containerWidth = 0, customStyle = '') {
    if (!this.playerConfig.thumbnail) {
      return;
    }
    const {width, height} = this.root.getBoundingClientRect()
    const {pic_num, urls, row, col, scale} = this.config
    if (pic_num <= 0 || !urls || urls.length === 0) {
      return
    }
    this.interval = this.player.duration / pic_num

    const index = Math.floor(now / this.interval)
    const indexInPage = index + 1 - (col * row) * (Math.ceil((index + 1) / (col * row)) - 1)
    const rowIndex = Math.ceil(indexInPage / row) - 1
    const colIndex = indexInPage - rowIndex * row - 1
    let left = null
    if (clientX && containerWidth) {
      left = clientX - width * scale / 2
      left = left > 0 ? left : 0
      left = left < containerWidth - width * scale ? left : containerWidth - width * scale
    }

    const style = {
      backgroundImage: `url(${urls[Math.ceil((index + 1) / (col * row)) - 1]})`,
      'background-position': `-${colIndex * width}px -${rowIndex * height}px`
    }
    if (left !== null) {
      style.left = `${left}px`
    }

    Object.keys(style).map((key) => {
      this.root.style[key] = style[key]
    })

    Object.keys(customStyle).map(key => {
      this.root.style[key] = customStyle[key]
    })

    this.show()
  }

  show () {
    Util.addClass(this.root, 'show')
  }

  hide () {
    Util.removeClass(this.root, 'show')
  }

  render () {
    return `<xg-thumbnail class="thumbnail">
    </div>`
  }
}
