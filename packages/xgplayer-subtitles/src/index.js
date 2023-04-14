import EventEmitter from 'eventemitter3'
// import XHR from './xhr'
// import SubTitleParser from './parser'
// import { addClass, removeClass, typeOf, findIndexByTime, findCIndexByTime, isMobile, addCSS, createDom, __loadText, checkSubtitle } from './utils'
import * as Util from './utils'
import { addObserver, unObserver } from './observer'
import { EVENTS } from './constants'
import { _ERROR } from './error'
import ProxyPromise from './proxyPromise'

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

function formatUrl (url) {
  const ret = []
  if (url && Util.typeOf(url) === 'String') {
    ret.push({ url: url, index: 0, start: -1, end: -1})
  } else if (Util.typeOf(url) === 'Array') {
    url.forEach((item, i) => {
      ret.push({
        url: item.url || item.src,
        index: i,
        start: item.start || -1,
        end: item.end || -1
      })
    })
  }
  return ret
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
    IS_MOBILE = Util.isMobile()
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
      domRender: true,
      updateMode: 'vod', // 消费模式，vod 点播 live 直播
      debugger: false
    }

    this._ctime = 0
    this._loadingTrack = {}
    Object.keys(this.config).map(key => {
      if (options[key] !== undefined && options[key] !== null) {
        this.config[key] = options[key]
      }
    })

    this._isOpen = this.config.defaultOpen || false

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
    if (!options.subTitles || Util.typeOf(options.subTitles) !== 'Array') {
      return
    }
    if (options.player) {
      this.attachPlayer(options.player)
    }
    this.seiTime = 0
    this.lastSeiTime = 0
    this._curTexts = []
    this.setSubTitles(options.subTitles, this.config.defaultOpen)
  }


  /**
   * @description 更新字幕列表
   * @param {*} subTitles // 更新的字幕列表
   * @param {*} isOpen  // 是否默认开启
   * @param {*} ieRemoveFirst // 是否移除之前的数据
   */
  setSubTitles (subTitles = [], isOpen = false, ieRemoveFirst = true) {
    const _isOpen = this._isOpen || isOpen
    ieRemoveFirst && this.innerRoot && this.switchOff()
    this.currentText = null
    this.textTrack = []
    subTitles.forEach(item => {
      const text = {}
      Object.keys(item).map(key => {
        text[key] = item[key]
      })
      text.url = formatUrl(text.url)
      if (text.isDefault) {
        this.currentText = text
      }
      this.textTrack.push(text)
    })
    this._log('setSubTitles', _isOpen)
    if (_isOpen) {
      this.switch().catch(e => {
        this._log('[switch]', e)
      })
    }
    this.currentText && this._loadTrack(this.currentText).then((textTrack) => {
      this.addStyles(textTrack)
      // if (_isOpen) {
      //   this.switch()
      // }
    })
    this.emit('reset', {list: this.textTrack, isOpen: _isOpen})
  }

  /**
   * @description 更新更新单个语言数据
   * @param {*} subTitle
   */
  updateSubTitle (subTitle) {
    let index = -1
    for (let i = 0; i < this.textTrack.length; i++) {
      if (Util.checkSubtitle(subTitle, this.textTrack[i])) {
        index = i
        break
      }
    }
    this._log('updateSubTitle', index, subTitle)
    if (index > -1) {
      const _isCurrent = Util.checkSubtitle(this.currentText, this.textTrack[index])
      this._log('updateSubTitle', '_isCurrent', _isCurrent, 'this.isOpen', this.isOpen, this.currentText)
      if (!_isCurrent) {
        return
      }
      const url = formatUrl(subTitle.url)
      if (!this.isOpen) {
        this.textTrack[index].url = url
      } else {
        url.forEach(item => {
          this.textTrack[index].url.push(item)
        })
        this._log('updateSubTitle _loadTrackUrls', this.textTrack[index])
        this._loadTrackUrls(this.currentText, 2)
      }
    }
  }

  addStyles (textTrack) {
    const { styles, format } = textTrack
    if (styles && format === 'vtt') {
      styles.map(item => {
        if (!item.key) {
          item.key = 'xg-text-track-span'
        }
      })
      Util.addCSS(styles, 'xg-text-track')
    }
  }

  attachPlayer (player) {
    this._log('attachPlayer')
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
      !this._isOpen && Util.addClass(this.root, 'text-track-hide')
      !fitVideo && Util.addClass(this.root, 'text-track-no-fitvideo')
      mode && Util.addClass(this.root, `text-track-${mode}`)
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
    this.player.on('destroy', this.destroy)
    this.player.on('timeupdate', this._onTimeupdate)
    this.player.on('core_event', this._onCoreEvents)
    if (this._isOpen) {
      this.switch().catch(e => {
        this._log('[switch]', e)
      })
    }
  }

  detachPlayer () {
    const { player, config } = this
    if (!player) {
      return
    }
    player.off('destroy', this.destroy)
    player.off('timeupdate', this._onTimeupdate)
    player.on('core_event', this._onCoreEvents)
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
    this._log('switch', subtitle)
    this._loadingTrack = subtitle
    return new Promise((resolve, reject) => {
      // 无参数的情况下直接开启字幕
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
      // console.log('isCurrent', this.currentText && Util.checkSubtitle(subtitle, this.currentText))
      if (this.currentText && Util.checkSubtitle(subtitle, this.currentText)) {
        this._loadingTrack = {}
        this._updateCurrent(this.currentText)
        this.switchOn()
        resolve(_ERROR(0))
      } else {
        let nextSubtitle = null
        // 语言不同移除当前字幕
        this.__removeByTime(this._curTexts, 0)
        for (let i = 0; i < this.textTrack.length; i++) {
          if (Util.checkSubtitle(subtitle, this.textTrack[i])) {
            nextSubtitle = this.textTrack[i]
            break
          }
        }
        this._log('nextSubtitle', nextSubtitle)
        if (nextSubtitle) {
          this._emitPlayerSwitch(this.currentText, nextSubtitle)
          if (nextSubtitle.list) {
            this._loadingTrack = {}
            this._updateCurrent(nextSubtitle)
            this.switchOn()
            resolve(_ERROR(0))
          } else {
            this._log('this._loadTrack', nextSubtitle)
            this._updateCurrent(nextSubtitle)
            this._loadTrack(nextSubtitle)
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
                  // console.trace(err)
                  reject(err)
                }
              }).catch(err => {
                reject(err)
              })
          }
        } else {
          const err = _ERROR(4, new Error(`The is no subtitle with id:[{${subtitle.id}}] or language:[${subtitle.language}]`))
          // console.trace(err)
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
          if (Util.checkSubtitle(subtitle, this.textTrack[i])) {
            nextSubtitle = this.textTrack[i]
            break
          }
        }
        if (nextSubtitle && !Util.checkSubtitle(nextSubtitle, this.currentText)) {
          this._loadTrack(nextSubtitle).then((textTrack) => {
            this.currentExtText = textTrack
            resolve(_ERROR(0))
          })
        }
      }
    })
  }

  switchOn () {
    this._log('switchOn')
    this._isOpen = true
    this.show()
    this.emit(EVENTS.CHANGE, this.currentText)
  }

  /**
   * 关闭字幕
   */
  switchOff () {
    this._isOpen = false
    this.hide()
    this.emit(EVENTS.OFF)
  }

  get isOpen () {
    return this._isOpen
  }

  _log (...msg) {
    if (this.config.debugger) {
      console.log('[xgSubtitle]', ...msg)
    }
  }

  _loadTrack (textTrack) {
    this._log('_loadTrack', textTrack.language, textTrack)
    const promise = new ProxyPromise()
    let contentType = ''
    let content = ''
    if (textTrack.json) {
      contentType = 'json'
      content = textTrack.json
    } else if (textTrack.stringContent && !textTrack.url) {
      contentType = 'string'
      content = textTrack.stringContent
    }
    if (content) {
      Util.parse(content, contentType).then(data => {
        textTrack.format = data.format
        textTrack.styles = data.styles
        textTrack.list = data.list
        promise.resolve(textTrack)
      }).catch(e=>{
        promise.reject(e)
      })
      return promise
    }

    const urls = textTrack.url
    if (urls.length === 0){
      promise.resolve(textTrack)
      return promise
    }
    const url = urls.splice(0,1)
    Util.loadSubTitle(url[0]).then((data) => {
      textTrack.format = data.format
      textTrack.styles = data.styles
      if (!textTrack.list) {
        textTrack.list = []
      }
      this._pushList(textTrack.list, data.list)
      urls.length > 1 && this._loadTrackUrls(textTrack, 2)
      promise.resolve(textTrack)
    }).catch(e => {
      promise.reject(e)
    })
    return promise
  }

  _emitPlayerSwitch (curSubtitle, nextSubTitle) {
    // 清空当前字幕的列表
    if (curSubtitle && this.config.updateMode === 'live') {
      curSubtitle.list = []
      curSubtitle.url = []
    }
    const data = { lang: nextSubTitle.language, ...nextSubTitle}
    this._log('emit subtile_switch ', nextSubTitle, data)
    this.player && this.player.emit('switch_subtitle', data)
  }

  /**
   * @desc 多文件场景下下载多个vtt文件
   * @param {*} textTrack
   * @param {*} maxCount
   */
  _loadTrackUrls (textTrack, maxCount, promise) {
    const len = textTrack.url.length
    const urls = len > maxCount ? textTrack.url.splice(0, maxCount) : textTrack.url.splice(0, len)
    let loadingCount = urls.length
    this._log('_loadTrackUrls', textTrack.language, len, urls.length, loadingCount)
    urls.forEach((item, i) => {
      const obj = {
        ...item,
        index: i
      }
      Util.loadSubTitle(obj).then((data) => {
        textTrack.format = data.format
        textTrack.styles = data.format
        if (!textTrack.list) {
          textTrack.list = []
        }
        this._pushList(textTrack.list, data.list)
        loadingCount--
      }).catch((e) => {
        loadingCount--
      }).finally(e => {
        if (loadingCount === 0) {
          promise && promise.resolve(textTrack)
          this._loadTrackUrls(textTrack, 2)
        }
      })
    })
  }
  /**
   * @description 移除已经加载过的字幕url信息
   * @param {*} textTrack
   * @param {*} data
   */
  _freshUrl (textTrack, data = {url: ''}) {
    let i = -1
    textTrack.url.forEach((item, index) => {
      if (item.url === data.url) {
        i = index
      }
    })
    if (i > -1) {
      textTrack.url.splice(i, 1)
    }
  }

  /**
   * @desc 在当前的字幕list中插入后续加载到的字幕数据，按照时间分布插入
   * @param {Array} dist
   * @param {Array} src
   * @returns
   */
  _pushList (dist, src) {
    const _start = src[0].start
    const _end = src[src.length - 1].end
    if (dist.length === 0 || _start >= dist[dist.length - 1].end) {
      src.forEach(item => {
        dist.push(item)
      })
    } else {
      let _index = -1
      for (let i = 0; i < dist.length; i++) {
        if (dist[i].start > _end) {
          _index = i
          break
        }
      }
      if (_index > -1) {
        src.forEach((item, i) => {
          dist.splice(_index + i, 0, item)
        })
      }
    }
    return dist
  }

  /**
   * @private
   * @description 更新当前生效字幕, 移除原有的渲染
   * @param {} subtitle
   * @returns
   */
  _updateCurrent (subtitle) {
    // console.trace('_updateCurrent')
    this.currentText = subtitle
    if (this.config.domRender && this.root) {
      ['language', 'id', 'label'].map(key => {
        this.root.setAttribute(`data-${key}`, this.currentText[key] || '')
      })
      this.__remove(this._cids)
    }
    this._cids = []
    this._gid = -1
    this._cid = -1
    this._curTexts = []
    const curTime = this._getPlayerCurrentTime()
    curTime && (this.config.updateMode === 'live' ? this._liveUpdate(curTime) : this._update(curTime))
  }

  __loadAll () {
    this.textTrack.forEach(item => {
      this._loadTrack(item)
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

  /**
   * @description 实时丢弃型更新, 字幕消费之后自动删除
   * @param {number} currentTime 当前时间
   * @returns
   */
  _liveUpdate (currentTime) {
    if (!this.currentText || !this.currentText.list || !this.currentText.list.length) {
      return
    }
    let _cids = []
    const _gid = Util.findIndexByTime(currentTime, this.currentText.list, this._gid)
    if (_gid > -1) {
      _cids = Util.findCIndexByTime(currentTime, this.currentText.list[_gid].list, this._cid)
    }
    this.__removeByTime(this._curTexts, currentTime)
    this._log('_liveUpdate',currentTime, _gid, _cids, this.currentText.list[0].list[0].start, this.currentText.list[0].list[0].end)
    if (_cids.length > 0) {
      const ret = Util.getItemsByIndex(this.currentText.list, _gid, _cids)
      const _len = this._curTexts.length
      const _si = _len > 0 ? this._curTexts[_len - 1].index : 0
      ret.forEach((item, i) => {
        item.index = i + _si
        this._curTexts.push(item)
      })
      this.__render(ret)
    }
    this.emit('update', this._curTexts)
  }

  _update (currentTime) {
    if (!this.currentText || !this.currentText.list || !this.currentText.list.length) {
      return
    }
    const _gid = Util.findIndexByTime(currentTime, this.currentText.list, this._gid)
    let _cids = []
    if (_gid > -1) {
      _cids = Util.findCIndexByTime(currentTime, this.currentText.list[_gid].list, this._cid)
    }

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

  _getPlayerCurrentTime () {
    if (!this.player) {
      return 0
    }
    const { currentTime } = this.player
    // 如果是直播，有sei事件触发，需要对时间做校准
    const curTime = parseInt(currentTime * 1000 + this.seiTime * 1000 - this.lastSeiTime * 1000, 10) / 1000
    return curTime
  }

  _onTimeupdate = () => {
    if (!this._isOpen) {
      return
    }
    const { videoWidth, videoHeight } = this.player.video
    if (!this._videoMeta.scale && videoWidth && videoHeight) {
      this._onResize(this.player.root)
    }
    const curTime = this._getPlayerCurrentTime()
    if (Math.round(Math.abs(curTime * 1000 - this._ctime)) < 200) {
      return
    }
    this._ctime = curTime * 1000
    if (this.currentText && this.currentText.list) {
      this.config.updateMode === 'live' ? this._liveUpdate(curTime) : this._update(curTime)
    }
  }
  getItemsByIndex
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

  _onCoreEvents = (e) => {
    try {
      switch (e.eventName) {
        // 字幕更新
        case 'core.subtitlesegments':
          this._onSubtitleSegment(e.list || [])
          break
        // 字幕列表更新
        case 'core.subtitleplaylist':
          this._onSubtitlePlaylist(e.list || [])
          break
        // sei 时间更新
        case 'core.seipayloadtime':
          this._onCoreSeiintime(e)
          break
        default:
          //
      }
    } catch (e) {
      console.error(e)
    }
  }

  _onSubtitlePlaylist (subtitleList) {
    this._log('_onSubtitlePlaylist', subtitleList)
    const list = subtitleList.map(item => {
      return {
        label: item.name,
        language: item.lang, // 字幕语言f
        id: item.id, // 字幕id
        isDefault: item.default, // 当前字幕是不是默认字幕
        url: [], // 字幕的url地址
        mUrl: item.url
      }
    })
    this.setSubTitles(list)
  }

  _onSubtitleSegment (urlList) {
    this._log('_onSubtitleSegment', urlList.length, urlList[0].lang, urlList[0].sn, urlList[urlList.length - 1].sn, urlList[0].start, urlList[urlList.length - 1].end)
    if (!urlList || urlList.length === 0) {
      return
    }

    // 获取语言
    const lang = urlList[0].lang
    // 重构数据结构
    const urls = urlList.map(item => {
      return {
        id: item.sn,
        url: item.url,
        duration: item.duration,
        start: item.start,
        end: item.end
      }
    })
    const _sub = {
      language: lang,
      url: urls
    }
    // 更新的不是当前语言，不做处理
    if (!Util.checkSubtitle(_sub, this.currentText)) {
      return
    }
    this.updateSubTitle(_sub)
  }

  _onCoreSeiintime (e) {
    try {
      const sei = e.time / 1000
      this._log('_onCoreSeiintime sei', sei, this.seiTime, this.lastSeiTime)
      this.seiTime = sei
      this.lastSeiTime = this.player ? this.player.currentTime : 0
    } catch (e) {}
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
    // this._log(`height:${height} width:${width} vWidth:${vWidth} vHeight:${vHeight} this._videoMeta.vWidth:${this._videoMeta.vWidth} this._videoMeta.vHeight:${this._videoMeta.vHeight}`)
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
    // this._log(`fitVideo vLeft:${vLeft} vBottom:${vBottom} marginBottom:${marginBottom} vWidth:${vWidth} vHeight:${vHeight} fontSize:${fontSize}`)
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
    // this._log(`__startResize width:${width} height:${height} lwidth:${this._videoMeta.lwidth} lheight:${this._videoMeta.lheight}`)
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
   * @description 过期字幕移除
   * @param {Array} list 当前的列表
   * @param {number} time 需要移除的时间点
   * @returns
   */
  __removeByTime (list, time) {
    const ids = []
    for (let i = 0; i < list.length; i++) {
      if (!time || list[i].end < time) {
        ids.push(i)
      }
    }
    if (ids.length === 0) {
      return
    }
    list.splice(ids[0], ids.length)
    this.config.domRender && this.__remove (ids)
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
    this._log('__render', jsonItems.length, this.config.domRender)
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
          this.innerRoot.appendChild(Util.createDom('xg-text-track-span', item, attr, className))
        })
      })
    }
  }

  show () {
    if (!this.config.domRender) {
      return
    }
    Util.removeClass(this.root, 'text-track-hide')
  }

  hide () {
    if (!this.config.domRender) {
      return
    }
    Util.addClass(this.root, 'text-track-hide')
    this.innerRoot.innerHTML = ''
  }

  destroy = () => {
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
