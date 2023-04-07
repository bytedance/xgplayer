import EventEmitter from 'eventemitter3'
import XHR from './xhr'
import SubTitleParser from './parser'
import { addClass, removeClass, typeOf, findIndexByTime, findCIndexByTime, isMobile, addCSS, createDom } from './utils'
import { addObserver, unObserver } from './observer'

import './style/index.scss'

/**
 * @typedef { {
 *   label?: string, // 字幕标记
 *   language?: string, // 字幕语言
 *   id?: string | number, // 字幕id
 *   isDefault?: boolean, // 当前字幕是不是默认字幕
 *   url?: string,
 *   stringContent?: string,
 *   list: any[]
 * } } SubtitleItem
 */

// eslint-disable-next-line no-unused-vars
const SubtitleItem = {
  label: '', // 字幕标记
  language: '', // 字幕语言
  id: '', // 字幕id
  isDefault: false, // 当前字幕是不是默认字幕
  json: {},
  url: '', // 字幕的url地址
  stringContent: '', // 响应格式的字符串，可以是vtt格式或者ass格式
  list: [] // json格式
}

const ERROR = [{
  code: 0, // 切换成功
  msg: 'SUCCESS'
}, {
  code: 1, // 下载错误
  msg: 'LOAD_ERROR'
}, {
  code: 2, // 解析错误
  msg: 'PARSER_ERROR'
}, {
  code: 3, // 格式不支持
  msg: 'FORMAT_NOT_SUPPORTED'
},
{
  code: 4, // id或者语言不存在
  msg: 'ID_OR_LANGUAGE_NOT_EXIST'
}, {
  code: 5, // 参数错误
  msg: 'PARAMETERS_ERROR'
}, {
  code: 6, // 操作中断
  msg: 'ABORT'
}, {
  code: 7, // 未知错误
  msg: 'UNKNOWN'
}, {
  code: 8, // url不存在
  msg: 'DATA_ERROR:subtitle.url is null'
}]

const EVENTS = {
  RESIZE: 'resize'
}

function _ERROR (code, error = {}) {
  const ret = {
    code: ERROR[code].code,
    msg: ERROR[code].msg
  }
  Object.keys(error).map(key => {
    ret[key] = error[key]
  })
  return ret
}

function parseResult (textTrack, resolve, reject, data, error) {
  if (error) {
    const err = _ERROR(2, error)
    reject(err, { format: data.format })
  } else if (!data.format) {
    const err = _ERROR(3)
    reject(err)
  } else {
    textTrack.list = data.list
    textTrack.format = data.format
    textTrack.styles = data.styles
    resolve(textTrack)
  }
}

/**
 * 加载字幕
 * @param {*} textTrack
 */
function __loadText (textTrack) {
  return new Promise((resolve, reject) => {
    if (textTrack.list) {
      resolve(textTrack)
      return
    }
    if (textTrack.json) {
      const list = SubTitleParser.parseJson(textTrack.json)
      textTrack.list = list
      textTrack.format = 'json'
      resolve(textTrack)
      return
    }
    if (textTrack.stringContent && !textTrack.url) {
      SubTitleParser.parse(textTrack.stringContent, (data, error) => {
        parseResult(textTrack, resolve, reject, data, error)
      })
    } else if (!textTrack.url) {
      const _err = _ERROR(8)
      reject(_err)
    } else {
      new XHR({ url: textTrack.url, type: 'text' })
        .then(data => {
          SubTitleParser.parse(data.res.response, (data, error) => {
            parseResult(textTrack, resolve, reject, data, error)
          })
        }).catch(err => {
          const _err = _ERROR(1, { statusText: err.statusText, status: err.status, type: err.type, message: 'http load error', url: textTrack.url })
          reject(_err)
        })
    }
  })
}

/**
 * 切换的语言和当前的是否一致
 * @param {*} src
 * @param {*} dist
 * @returns
 */
function checkSubtitle (src, dist) {
  if ((src.id && src.id === dist.id) || (src.language && src.language === dist.language)) {
    return true
  }
  return false
}

let IS_MOBILE = false
export default class Subtitle extends EventEmitter {
  /**
   * @type {string}
   * @description the version of sdk
   */
  get version () {
    return __VERSION__
  }

  constructor (options) {
    super()
    IS_MOBILE = isMobile()
    this.currentText = null // 当前字幕信息
    this.currentExtText = null
    this.textTrack = [] // 字幕列表
    this._cid = -1 //  当前字幕索引
    this._gid = -1 // 当前字幕组索引
    this._cids = []
    this._iId = null
    this._iC = 0
    this.player = null
    this.root = null
    this.config = {
      line: 'double', // 行数
      bottom: 0, // 底部高度
      mode: 'stroke',
      defaultOpen: false, // 是否默认开启
      baseSizeX: 49, // 横向基准字号
      baseSizeY: 28, // 竖向基准字号, 宽高比例大于1.2视作竖向视频
      minSize: 16, // 最小字号
      minMobileSize: 13, // 移动端兜底字号
      fitVideo: true, // 是否适配视频画面
      offsetBottom: 2, // 底部边距百分比
      fontColor: '#fff', // 字体颜色
      domRender: true
    }

    this._ctime = 0
    this._loadingTrack = {}
    Object.keys(this.config).map(key => {
      if (options[key] !== undefined && options[key] !== null) {
        this.config[key] = options[key]
      }
    })
    this._isOpen = false // this.config.defaultOpen || false

    this._videoMeta = {
      scale: 0,
      videoHeight: 0,
      videoWidth: 0,
      lwidth: 0, // 当前容器宽度
      lheight: 0, // 当前容器高度
      vWidth: 0, // 视频画面实际宽度
      vHeight: 0, // 视频画面实际高度
      vBottom: 0, // 视频画面底部距离
      vLeft: 0, // 视频画面左边距离
      marginBottom: 0 // 字幕底部边距
    }
    if (!options.subTitles || typeOf(options.subTitles) !== 'Array') {
      return
    }
    if (options.player) {
      this.attachPlayer(options.player)
    }
    this.setSubTitles(options.subTitles, this.config.defaultOpen)
  }

  setSubTitles (subTitles = [], isOpen = false, ieRemoveFirst = true) {
    const _isOpen = this._isOpen || isOpen
    ieRemoveFirst && this.innerRoot && this.switchOff()
    this.currentText = null
    this.textTrack = []
    subTitles.map(item => {
      const text = {}
      Object.keys(item).map(key => {
        text[key] = item[key]
      })
      if (text.isDefault) {
        this.currentText = text
      }
      this.textTrack.push(text)
    })
    this.currentText && __loadText(this.currentText).then((textTrack) => {
      this.addStyles(textTrack)
      if (_isOpen) {
        this.switch()
      }
    })
  }

  addStyles (textTrack) {
    const { styles, format } = textTrack
    if (styles && format === 'vtt') {
      styles.map(item => {
        if (!item.key) {
          item.key = 'xg-text-track-span'
        }
      })
      addCSS(styles, 'xg-text-track')
    }
  }

  attachPlayer (player) {
    if (!player) {
      return
    }
    if (this.player) {
      this.detachPlayer()
    }
    const { fontColor, mode, fitVideo, domRender } = this.config
    this.player = player
    if (domRender) {
      this.root = document.createElement('xg-text-track')
      this.root.className = 'xg-text-track'
      !this._isOpen && addClass(this.root, 'text-track-hide')
      !fitVideo && addClass(this.root, 'text-track-no-fitvideo')
      mode && addClass(this.root, `text-track-${mode}`)
      this.innerRoot = document.createElement('xg-text-track-inner')
      this.root.appendChild(this.innerRoot)
      if (fontColor) {
        this.root.style.color = fontColor
      }
      if (this.currentText) {
        ['language', 'id', 'label'].map(key => {
          this.root.setAttribute(`data-${key}`, this.currentText[key] || '')
        })
      }
      this.player.root.appendChild(this.root)
      addObserver(player.root, this._onResize)
    }
    ['destroy', '__onTimeupdate', '_onResize'].map(item => {
      this[item] = this[item].bind(this)
    })
    this.player.on('destroy', this.destroy)
    this.player.on('timeupdate', this.__onTimeupdate)
    if (this._isOpen) {
      this.switch()
    }
  }

  detachPlayer () {
    const { player, config } = this
    if (!player) {
      return
    }
    player.off('destroy', this.destroy)
    player.off('timeupdate', this.__onTimeupdate)
    if (config.domRender) {
      if (player.root) {
        unObserver(player.root, this._onResize)
        player.root.removeChild(this.root)
      }
      this.innerRoot = null
      this.root = null
    }
    this.player = null
  }

  switch (subtitle = { id: '', language: '' }) {
    this._loadingTrack = subtitle
    return new Promise((resolve, reject) => {
      // 无参数的情况下
      if (!subtitle.id && !subtitle.language) {
        if (this.currentText) {
          this._loadingTrack = {}
          this._updateCurrent(this.currentText)
          this.switchOn()
          const err = _ERROR(0, { message: 'switch default subtitle success' })
          resolve(err)
          return
        } else {
          const err = _ERROR(5, { message: 'no default subtitle' })
          reject(err)
          return
        }
      }
      if (this.currentText && checkSubtitle(subtitle, this.currentText)) {
        this._loadingTrack = {}
        this._updateCurrent(this.currentText)
        this.switchOn()
        resolve(_ERROR(0))
      } else {
        let nextSubtitle = null
        for (let i = 0; i < this.textTrack.length; i++) {
          if (checkSubtitle(subtitle, this.textTrack[i])) {
            nextSubtitle = this.textTrack[i]
            break
          }
        }
        if (nextSubtitle) {
          if (nextSubtitle.list) {
            this._loadingTrack = {}
            this._updateCurrent(nextSubtitle)
            this.switchOn()
            resolve(_ERROR(0))
          } else {
            __loadText(nextSubtitle)
              .then((textTrack) => {
                this.addStyles(textTrack)
                // 比对最近一次的信息
                if (this._loadingTrack.id === nextSubtitle.id || this._loadingTrack.language === textTrack.language) {
                  this._loadingTrack = {}
                  this._updateCurrent(textTrack)
                  this.switchOn()
                  resolve(_ERROR(0))
                } else {
                  const err = _ERROR(6, { message: `check _loadingTrack fail id: ${this._loadingTrack.id}  nextSubtitle:${textTrack.id}` })
                  console.trace(err)
                  reject(err)
                }
              }).catch(err => {
                reject(err)
              })
          }
        } else {
          const err = _ERROR(4, new Error(`The is no subtitle with id:[{${subtitle.id}}] or language:[${subtitle.language}]`))
          console.trace(err)
          reject(err)
        }
      }
    })
  }

  /**
   * 开启扩展字幕
   * @param {{
   *   id?: any,
   *   language?: any
   * }} subtitle
   * @returns
   */
  switchExt (subtitle = { id: '', language: '' }) {
    return new Promise((resolve, reject) => {
      if (!subtitle.id && !subtitle.language) {
        this.currentExtText = null
        resolve(_ERROR(0))
      } else {
        let nextSubtitle = null
        for (let i = 0; i < this.textTrack.length; i++) {
          if (checkSubtitle(subtitle, this.textTrack[i])) {
            nextSubtitle = this.textTrack[i]
            break
          }
        }
        if (nextSubtitle && !checkSubtitle(nextSubtitle, this.currentText)) {
          __loadText(nextSubtitle).then((textTrack) => {
            this.currentExtText = textTrack
            resolve(_ERROR(0))
          })
        }
      }
    })
  }

  switchOn () {
    this._isOpen = true
    this.show()
    this.emit('change', this.currentText)
  }

  /**
   * 关闭字幕
   */
  switchOff () {
    this._isOpen = false
    this.hide()
    this.emit('off')
  }

  get isOpen () {
    return this._isOpen
  }

  /**
   * @private
   * @param {} subtitle
   * @returns
   */
  _updateCurrent (subtitle) {
    this.currentText = subtitle
    if (this.config.domRender && this.root) {
      ['language', 'id', 'label'].map(key => {
        this.root.setAttribute(`data-${key}`, this.currentText[key] || '')
      })
      this.__remove(this._cids)
    }
    const { currentTime } = this.player
    this._cids = []
    this._gid = -1
    this._cid = -1
    this._update(currentTime)
  }

  __loadAll () {
    this.textTrack.map(item => {
      __loadText(item)
    })
  }

  getDelCid (oldArr, newArr) {
    const ret = []
    for (let i = 0; i < oldArr.length; i++) {
      if (!newArr.includes(oldArr[i])) {
        ret.push(oldArr[i])
      }
    }
    return ret
  }

  getNewCid (oldArr, newArr) {
    const ret = []
    for (let i = 0; i < newArr.length; i++) {
      if (!oldArr.includes(newArr[i])) {
        ret.push(newArr[i])
      }
    }
    return ret
  }

  _update (currentTime) {
    const _gid = findIndexByTime(currentTime, this.currentText.list, this._gid)
    let _cids = []
    if (_gid > -1) {
      _cids = findCIndexByTime(currentTime, this.currentText.list[_gid].list, this._cid)
    }
    // console.log(this._gid, this._cid, _gid, _cids, currentTime)

    // 当前没有数据，清空
    if (_cids.length < 1) {
      this._cids.length > 0 && this.config.domRender && this.__remove(this._cids)
      this._cids = []
      return
    }
    // 数据没有更新
    if (this._cids === _cids && _gid === this._gid) {
      return
    }
    this._gid = _gid
    this._cid = _cids[0]

    // 需要删除的数据
    const delCids = this.getDelCid(this._cids, _cids)

    // 需要新增的数据
    const newCids = this.getNewCid(this._cids, _cids)

    this._cids = _cids
    this.config.domRender && this.__remove(delCids)
    const texts = []
    newCids.map(item => {
      const text = this.currentText.list[_gid].list[item]
      text.index = item
      texts.push(text)
    })

    if (this.currentExtText) {
      newCids.map(item => {
        const textExt = this.currentText.list[_gid].list[item]
        textExt.index = item
        texts.push(textExt)
      })
    }

    this.emit('update', texts)
    this.__render(texts, currentTime)
  }

  __onTimeupdate () {
    if (!this._isOpen) {
      return
    }
    const { videoWidth, videoHeight } = this.player.video
    if (!this._videoMeta.scale && videoWidth && videoHeight) {
      this._onResize(this.player.root)
    }
    const currentTime = this.player.currentTime
    if (Math.round(Math.abs(currentTime * 1000 - this._ctime)) < 200) {
      return
    }
    this._ctime = currentTime * 1000
    if (this.currentText && this.currentText.list) {
      this._update(currentTime)
    }
  }

  _onResize = (target) => {
    const { _videoMeta, config } = this
    if (!config.domRender) {
      return
    }
    if (!target || !(target instanceof window.Element)) {
      target = this.player.root
    }
    if (this._iId) {
      clearTimeout(this._iId)
      this._iId = null
    }
    if (!_videoMeta.scale) {
      if (!this.player.video) {
        return
      }
      const { videoWidth, videoHeight } = this.player.video
      if (videoWidth && videoHeight) {
        _videoMeta.videoWidth = videoWidth
        _videoMeta.videoHeight = videoHeight
        _videoMeta.scale = parseInt(videoHeight / videoWidth * 100, 10)
      } else {
        return
      }
    }
    this.__startResize(target)
  }

  resize (width, height) {
    const { baseSizeX, baseSizeY, minMobileSize, minSize, fitVideo, offsetBottom } = this.config
    const { scale } = this._videoMeta
    this._videoMeta.lwidth = width
    this._videoMeta.lheight = height
    let vWidth; let vHeight = 0
    if (height / width * 100 >= scale) {
      vHeight = parseInt(scale * width, 10) / 100
      vWidth = width
    } else {
      vHeight = height
      vWidth = parseInt(height / scale * 100, 10)
    }
    // console.log(`height:${height} width:${width} vWidth:${vWidth} vHeight:${vHeight} this._videoMeta.vWidth:${this._videoMeta.vWidth} this._videoMeta.vHeight:${this._videoMeta.vHeight}`)
    this._videoMeta.vWidth = vWidth
    this._videoMeta.vHeight = vHeight
    let _size = 0
    let fontSize = 0
    if (scale > 120) {
      _size = baseSizeY
      fontSize = parseInt(_size * vHeight / 1080, 10)
    } else {
      _size = baseSizeX
      fontSize = parseInt(_size * vWidth / 1920, 10)
    }
    const mini = IS_MOBILE ? minMobileSize : minSize
    fontSize = fontSize < mini ? mini : (fontSize > _size ? _size : fontSize)
    const style = {
      fontSize
    }
    const vBottom = parseInt((height - vHeight) / 2, 10)
    const vLeft = parseInt((width - vWidth) / 2, 10)
    const marginBottom = parseInt(vHeight * offsetBottom, 10) / 100
    this._videoMeta.vBottom = vBottom
    this._videoMeta.vLeft = vLeft
    this._videoMeta.marginBottom = marginBottom
    if (fitVideo) {
      style.bottom = vBottom + marginBottom
      style.left = style.right = vLeft
    }
    // console.log(`fitVideo vLeft:${vLeft} vBottom:${vBottom} marginBottom:${marginBottom} vWidth:${vWidth} vHeight:${vHeight} fontSize:${fontSize}`)
    Object.keys(style).map(item => {
      this.root.style[item] = `${style[item]}px`
    })
    this.emit(EVENTS.RESIZE, {
      vLeft,
      vBottom,
      marginBottom,
      vWidth,
      vHeight,
      fontSize,
      scale
    })
  }

  __startResize (target) {
    const rect = target.getBoundingClientRect()
    const { _videoMeta } = this
    const { width, height } = rect
    if (this._iId) {
      clearTimeout(this._iId)
      this._iId = null
    }
    // console.log(`__startResize width:${width} height:${height} lwidth:${this._videoMeta.lwidth} lheight:${this._videoMeta.lheight}`)
    if (width > 0 && height > 0 && (width !== _videoMeta.lwidth || height !== _videoMeta.lheight)) {
      this._iC = 0
      this.resize(width, height)
    } else {
      if (this._iC >= 5) {
        this._iC = 0
        return
      }
      this._iC++
      this._iId = setTimeout(() => {
        this.__startResize(target)
      }, 50)
    }
  }

  /**
   * @description 移除过期dom
   * @param {Array<number>} ids
   * @returns
   */
  __remove (ids) {
    if (!ids || ids.length < 1) {
      return
    }
    const children = this.innerRoot.children
    const removeIndex = []
    for (let i = 0; i < children.length; i++) {
      const index = Number(children[i].getAttribute('data-index'))
      if (ids.includes(index)) {
        removeIndex.push(children[i])
      }
    }
    removeIndex.map(item => {
      this.innerRoot.removeChild(item)
    })
  }

  /**
   * @description 渲染新增dom
   * @param {Array<any>} jsonItems
   */
  __render (jsonItems = []) {
    if (jsonItems.length > 0 && this.config.domRender) {
      jsonItems.map(jsonItem => {
        let className = `text-track-${this.config.line}`
        jsonItem.text.map((item, index) => {
          if (index > 0) {
            className += ' text-track-deputy'
          }
          const attr = {
            // 'data-tag': jsonItem.textTag[index],
            'data-start': jsonItem.start,
            'data-end': jsonItem.end,
            'data-index': jsonItem.index
          }
          this.innerRoot.appendChild(createDom('xg-text-track-span', item, attr, className))
        })
      })
    }
  }

  show () {
    if (!this.config.domRender) {
      return
    }
    removeClass(this.root, 'text-track-hide')
  }

  hide () {
    if (!this.config.domRender) {
      return
    }
    addClass(this.root, 'text-track-hide')
    this.innerRoot.innerHTML = ''
  }

  destroy () {
    this.detachPlayer()
    this.removeAllListeners()
    this.player = null
    this.textTrack = null
  }

  /**
   *
   * @param { string } event
   * @param { any } [data]
   * @returns
   */
  emit (event, data, ...args) {
    super.emit(event, data, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  on (event, callback, ...args) {
    super.on(event, callback, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  once (event, callback, ...args) {
    super.once(event, callback, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  off (event, callback, ...args) {
    super.off(event, callback, ...args)
  }

  offAll () {
    super.removeAllListeners()
  }

  /**
   * @description 获取底部边距
   */
  get marginBottom () {
    const { bottom, marginBottom } = this._videoMeta
    return this.config.fitVideo ? bottom + marginBottom : marginBottom
  }
}
