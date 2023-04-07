/* eslint-disable camelcase */
import BasePlugin, { Util, Events } from '../../plugin'
/**
 * @typedef {{
 *   isShow?: boolean,
 *   urls?: Array<string>, // 有多张大图就多个url
 *   pic_num?: number, // 每张图含有几个雪碧图
 *   col?: number, // 截图列数
 *   row?: number, // 截图行数
 *   height?: number, // 缩略图高度
 *   width?: number, // 缩略图宽度
 *   scale?: number, // 缩放
 *   className?: string, // 额外添加在dom上的class
 *   hidePortrait?: boolean, // 是否在竖屏的时候隐藏
 *   [propName: string]: any
 * }} IThumbnailConfig
 */
export default class Thumbnail extends BasePlugin {
  static get pluginName () {
    return 'thumbnail'
  }

  /**
   * @type IThumbnailConfig
   */
  static get defaultConfig () {
    return {
      isShow: false,
      urls: [], // 有多张大图就多个url就好
      pic_num: 0, // 每张图含有几个雪碧图
      col: 0, // 截图列数
      row: 0, // 截图行数
      height: 90, // 缩略图高度
      width: 160, // 缩略图宽度
      scale: 1, // 缩放
      className: '', // 额外添加在dom上的class
      hidePortrait: false // 是否在竖屏的时候隐藏
    }
  }

  constructor (args) {
    super(args)
    this.ratio = 1
    this.interval = null
    this._preloadMark = {}
  }

  afterCreate () {
    if (this.usable) {
      this.initThumbnail()
    }
    this.on([Events.DURATION_CHANGE], () => {
      const { pic_num, interval } = this.config
      this.usable && (this.interval = interval > 0 ? interval : Math.round(this.player.duration * 1000 / pic_num) / 1000)
    })
  }

  setConfig (config) {
    if (!config) {
      return
    }
    const keys = Object.keys(config)
    if (keys.length < 1) {
      return
    }
    keys.forEach(key => {
      this.config[key] = config[key]
    })
    this.usable && this.initThumbnail()
  }

  get usable () {
    const { urls, pic_num } = this.config
    return urls && urls.length > 0 && pic_num > 0
  }

  initThumbnail () {
    const { width, height, pic_num, interval } = this.config
    this.ratio = width / height * 100
    this.interval = interval || Math.round(this.player.duration / pic_num)
    this._preloadMark = {}
    // this.preload(0)
    // this.preIndex = new Array(urls.length)
    // this.interval = interval || Math.round(this.player.duration / pic_num)
    // this.ratio = width / height * 100
    // className && Util.addClass(this.root, className)
    // hidePortrait && Util.addClass(this.root, 'portrait')
    // width && (this.root.style.width = `${width}px`)
    // height && (this.root.style.height = `${height}px`)
    // this.root.style.backgroundSize = `${width * col}px auto`
  }

  getUrlByIndex (index) {
    return index >= 0 && index < this.config.urls.length ? this.config.urls[index] : ''
  }

  preload (index) {
    if (this._preloadMark[index]) {
      return
    }
    const { urls } = this.config
    const len = urls.length
    const arr = []
    index > 0 && arr.push(index - 1)
    arr.push(index)
    index > 0 && index < len - 1 && arr.push(index + 1)
    arr.map(item => {
      if (!this._preloadMark[item] && item >= 0 && item < len) {
        this._preloadMark[item] = 1
        Util.preloadImg(urls[item], () => {
          this._preloadMark[item] = 2
        })
      }
    })
  }

  getPosition (now, containerWidth = 0, containerHeight = 0) {
    const { pic_num, row, col, width, height } = this.config
    this.interval = Math.round(this.player.duration / pic_num)
    let index = Math.ceil(now / this.interval) // 当前时间对应的图像索引
    index = index > pic_num ? pic_num : index
    const urlIndex = index < row * col ? 0 : (Math.ceil(index / (row * col)) - 1)// 当前图像所在的url索引
    const indexInPage = index - urlIndex * (col * row) // 当前图像在当前url中的索引
    const rowIndex = indexInPage > 0 ? Math.ceil(indexInPage / col) - 1 : 0// 当前图像在当前url中的行索引
    const colIndex = indexInPage > 0 ? indexInPage - rowIndex * col - 1 : 0 // 当前图像在当前url中的列索引
    let swidth = 0 // containerWidth || width
    let sHeight = 0 // swidth * height / width

    // 根据入参的宽高适配样式
    if (containerWidth && containerHeight) {
      const per = containerWidth / containerHeight
      if (per < width / height) {
        sHeight = containerHeight
        swidth = sHeight * (width / height)
        // swidth = containerWidth
        // sHeight = swidth / (width / height)
      } else {
        swidth = containerWidth
        sHeight = swidth / (width / height)
      }
    } else if (!containerHeight) {
      swidth = containerWidth || width
      sHeight = swidth / (width / height)
    } else if (!containerWidth) {
      sHeight = containerHeight || height
      swidth = sHeight * (width / height)
    }
    const url = this.getUrlByIndex(urlIndex)
    return {
      urlIndex,
      rowIndex,
      colIndex,
      url,
      height: sHeight,
      width: swidth,
      style: {
        backgroundImage: `url(${url})`,
        backgroundSize: `${swidth * col}px auto`,
        backgroundPosition: `-${colIndex * swidth}px -${rowIndex * sHeight}px`,
        width: `${swidth}px`,
        height: `${sHeight}px`
      }
    }
  }

  update (dom, now, containerWidth = 0, containerHeight = 0, customStyle = '') {
    const { pic_num, urls } = this.config
    if (pic_num <= 0 || !urls || urls.length === 0) {
      return
    }
    const pos = this.getPosition(now, containerWidth, containerHeight)
    this.preload(pos.urlIndex)

    Object.keys(pos.style).map((key) => {
      dom.style[key] = pos.style[key]
    })
    Object.keys(customStyle).map(key => {
      dom.style[key] = customStyle[key]
    })
  }

  // 对外暴露 切换缩略图配置
  changeConfig (newConfig = {}) {
    this.setConfig(newConfig)
  }

  createThumbnail (root, className) {
    const dom = Util.createDom('xg-thumbnail', '', {}, `thumbnail ${className}`)
    root && root.appendChild(dom)
    return dom
  }
}
