import { BasePlugin, Util, Events } from 'xgplayer'
import Xhr from './xhr'

const PLAY_MODES = {
  ORDER: 'order',
  SLOOP: 'sloop',
  LOOP: 'loop',
  RANDOM: 'random'
}

const CLASS_NAME = 'xgplayer-music'

/**
 * @typedef {{
 *   src: string,
 *   vid: string | number,
 *   poster?: string,
 *   title?: string,
 * }} IMusicListItem
 */

/**
 * @typedef {{
*   start: number,
*   end: number,
*   loop?: boolean,
*   [propName: string]: any
* }} IABCycle
*/

/**
 * @typedef {{
 *   offline?: boolean,
 *   abCycle?: { IABCycle } | null,
 *   timeScale?: number,
 *   mode?: 'order' | 'sloop' | 'loop' | 'random',
 *   list?: Array<IMusicListItem>,
 *   [propName: string]: any
 * }} IMusicConfig
 */

function _randomIndex (min, max, index) {
  const i = Math.floor(Math.random() * (max - min) + min)
  // console.log('i', i, index, i === index, min, max)
  if (i === index) {
    if (i > max / 2) {
      max = max / 2
    } else {
      min = max / 2
    }
    return max - min > 2 ? _randomIndex(min, max, index) : i
  } else {
    return i
  }
}
export default class Music extends BasePlugin {
  static get pluginName () {
    return 'music'
  }

  /**
   * @type { IMusicConfig }
   */
  static get defaultConfig () {
    return {
      offline: false, // Whether to support offline playback
      preloadNext: true,
      abCycle: null, // ab loop playback configuration
      timeScale: 15, // Each time span when forward or backward
      mode: PLAY_MODES.ORDER, // Play mode, the default value id 'order'
      list: [] // Initial Playlist
    }
  }

  /**
   * @desc
   * @type {Array<string>}}
   */
  static get ModeType () {
    return Object.keys(PLAY_MODES).map(key => PLAY_MODES[key])
  }

  afterCreate () {
    const { player, playerConfig } = this
    Util.addClass(player.root, CLASS_NAME)
    this.halfPass = false
    this.list = this.config.list || []
    this.nextIndex = -1
    this.prevIndex = -1
    this.history = []
    this.disable = !(this.list.length > 0)
    if (this.list.length === 0) {
      return
    }
    if (!playerConfig.url && this.list.length > 0) {
      playerConfig.url = this.list[0].src
    }

    if (!playerConfig.poster) {
      playerConfig.poster = this.list[0].poster
    }

    if (!playerConfig.title) {
      playerConfig.title = this.list[0].title || ''
    }

    if (!playerConfig.vid) {
      playerConfig.vid = this.list[0].vid || ''
    }

    this._curInfo = {
      src: playerConfig.url,
      poster: playerConfig.poster,
      title: playerConfig.title,
      vid: playerConfig.vid
    }

    this.index = 0

    this.on(Events.TIME_UPDATE, this._onTimeUpdate)

    this.on(Events.ENDED, this._onEnded)

    this.on(Events.DURATION_CHANGE, this._onDurationChange)

    if (this.config.offline) {
      this.checkOffline(this._curInfo.src, this._curInfo.vid).then(data => {
        if (data.code === 0) {
          playerConfig.url = data.url
          if (player.state >= 4) {
            player.src = data.url
          }
        }
      }).catch(e => {})
    }
  }

  destroy () {
    Util.removeClass(this.player.root, CLASS_NAME)
  }

  _onEnded = () => {
    if (this.mode === 'order' && this.index + 1 >= this.list.length) {
      this.player.pause()
      this.player.currentTime = 0
      return
    }
    switch (this.mode) {
      case PLAY_MODES.SLOOP:
        this.change()
        break
      case PLAY_MODES.ORDER:
      case PLAY_MODES.LOOP:
      default:
        this.next()
        break
    }
  }

  _onDurationChange = () => {
    const { abCycle } = this.config
    this._initABCycle(abCycle, this.player)
  }

  _onTimeUpdate = () => {
    const { config, player } = this
    if (!this.halfPass && player.currentTime > player.duration / 2) {
      this.confirmOrder()
    }
    if (config.abCycle) {
      const c = config.abCycle
      const _end = c.end > player.duration ? player.duration : c.end
      if (player.currentTime >= _end) {
        if (!c.loop) {
          player.pause()
          this.emit('abCycle_ended')
        }
        player.currentTime = c.start || 0
      } else if (player.currentTime < c.start) {
        player.currentTime = c.start || 0
      }
    }
  }

  _nextCompute () {
    if (this.disable) {
      return
    }
    switch (this.mode) {
      case PLAY_MODES.SLOOP:
      case PLAY_MODES.ORDER:
      case PLAY_MODES.LOOP:
        if (this.index + 1 < this.list.length) {
          this.nextIndex = this.index + 1
        } else {
          this.nextIndex = 0
        }
        break
      default:
        this.nextIndex = _randomIndex(0, this.list.length, this.index)
        break
    }
  }

  _prevCompute () {
    if (this.disable) {
      return
    }
    switch (this.mode) {
      case PLAY_MODES.SLOOP:
      case PLAY_MODES.ORDER:
      case PLAY_MODES.LOOP:
        if (this.index - 1 >= 0) {
          this.prevIndex = this.index - 1
        } else {
          this.prevIndex = this.list.length - 1
        }
        break
      default:
        this.prevIndex = _randomIndex(0, this.list.length, this.index)
        break
    }
  }

  _emitChange () {
    this.emit('change', this._curInfo)
  }

  _initABCycle (abCycle, player) {
    const _p = player.plugins.progresspreview
    if (abCycle && player) {
      const _end = abCycle.end > this.player.duration ? this.player.duration : abCycle.end
      const _start = abCycle.start > this.player.duration ? 0 : abCycle.start
      const dot = {
        id: player.playerId, // 标记唯一标识，用于删除的时候索引
        time: abCycle.start, // 进度条在此时间戳打点 单位为s
        duration: _end - _start, // 进度条标识点的时长 默认1s【可选】单位为s
        text: abCycle.text, // 打点处的自定义文案
        color: abCycle.color // 进度条标识点的显示颜色【可选】
      }
      _p.findDot(dot.id) ? _p.updateDot(dot) : _p.createDot(dot)
    } else {
      _p.findDot(player.playerId) ? _p.deleteDot(player.playerId) : ''
    }
  }

  /**
   * @desc Get a random one from the playlist
   * @returns { IMusicListItem | null }
   */
  random () {
    if (this.list.length < 0) {
      return null
    }
    const _i = _randomIndex(0, this.list.length, this.index)
    return this.list[_i]
  }

  /**
   * @desc play next item in playlist
   * @returns
   */
  next () {
    if (this.disable) {
      return
    }
    if (!this.halfPass) {
      this.halfPass = true
      this._nextCompute()
    }
    this.index = this.nextIndex
    this.change()
  }

  /**
   * @desc play previous item in playlist
   * @returns
   */
  prev () {
    if (this.disable) {
      return
    }
    if (!this.halfPass) {
      this.halfPass = true
      this._prevCompute()
    }
    this.index = this.prevIndex
    this.change()
  }

  /**
   * @desc fast forward play,
   */
  forward () {
    const { player } = this
    const { timeScale } = this.config
    // console.log(`music go forward ${timeScale}s`)
    player.currentTime = player.currentTime + timeScale < player.duration ? player.currentTime + timeScale : player.duration - 0.1
  }

  /**
   * @desc rewind playback
   */
  backward () {
    const { player } = this
    const { timeScale } = this.config
    // console.log(`music go backward ${timeScale}s`)
    player.currentTime = player.currentTime - timeScale > 0 ? player.currentTime - timeScale : 0
  }

  /**
   * @desc Add list item to the list
   * @param { IMusicListItem } meta
   */
  add (meta) {
    this.list.push({
      src: meta.src,
      title: meta.title,
      vid: meta.vid,
      poster: meta.poster
    })
  }

  /**
   * @desc Remove list item from the list
   * @param { string } vid
   */
  remove (vid) {
    let idx = -1
    this.list.every((item, index) => {
      if (item.vid === vid) {
        idx = index
        return false
      } else {
        return true
      }
    })
    if (idx > -1) {
      this.list.splice(idx, 1)
    }
  }

  /**
   * @desc set abCycle config
   * @param { number | IABCycle } start
   * @param { number } [end]
   * @param { boolean } [loop]
   * @param {{ [propName: string]: any }} [ext]
   */
  setAbCycle (start, end, loop, ext = {}) {
    if (start && Util.typeof(start) === 'Object') {
      this.config.abCycle = {
        ...start
      }
    } else {
      this.config.abCycle = {
        start: start || 0,
        end: end || this.player.duration,
        loop,
        ...ext
      }
    }
    this._initABCycle( this.config.abCycle, this.player)
  }

  /**
   * @desc remove abCycle config
   */
  removeAbCycle () {
    this.config.abCycle = null
    this._initABCycle(null, this.player)
  }

  /**
   * @desc update the playList
   * @param { Array<IMusicListItem> } list
   */
  updateList (list = []) {
    this.removeAbCycle()
    this.player.pause()
    this.player.currentTime = 0
    this.list = list
    this.nextIndex = 0
    this.index = 0
    this.change()
  }

  /**
   * @desc set play index
   * @param { number } index
   */
  setIndex (index = 0) {
    if (index < 0 || index >= this.list.length) {
      return
    }
    this.nextIndex = index
    this.index = index
    this.change()
  }

  change () {
    if (this.disable) {
      return
    }
    const { player, list, index } = this
    const offlineVid = list[index].vid
    this.halfPass = false
    this.checkOffline(list[index].src, offlineVid).then(data => {
      this._curInfo = {
        title: this.list[this.index].title || '',
        vid: this.list[this.index].vid,
        poster: this.list[this.index].poster || '',
        src: data.url
      }

      player.playNext({
        url: data.url,
        vid: this.list[this.index].vid || 0,
        poster: this.list[this.index].poster || '',
        autoplay: true
      })
      player.off('timeupdate', this._emitChange)
      player.once('timeupdate', this._emitChange)
      player.play()
    })
  }

  /**
   * 检查当前播放音频是否有本地缓存
   * @param { string } url
   * @param { string | number } offlineVid
   * @returns
   */
  checkOffline (url, offlineVid) {
    return new Promise((resolve, reject) => {
      if (!this.config.offline || this.disable) {
        resolve({
          url,
          code: -1,
          vid: offlineVid
        })
      }
      const { database } = this.player
      database.openDB(() => {
        database.getDataByKey(database.myDB.ojstore.name, offlineVid, result => {
          setTimeout(() => {
            database.closeDB()
          }, 5000)
          if (result) {
            resolve({ url: URL.createObjectURL(result.blob), code: 0, vid: result.vid})
          } else {
            resolve({
              url,
              code: -2,
              vid: offlineVid
            })
          }
        })
      })
    })
  }

  confirmOrder () {
    this.halfPass = true
    this._nextCompute()
    this._prevCompute()
    if (this.config.preloadNext) {
      this.preload(this.nextIndex)
    }
  }

  preload (index) {
    if (index < 0 || index >= this.list.length) {
      return
    }
    const _item = this.list[index]
    const { player } = this
    this.checkOffline(_item.src, _item.vid).then(data => {
      if (data.code === -2) {
        const offlineVid = _item.vid
        new Xhr(_item.src, res => {
          player.database.openDB(() => {
            player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new Blob([res], {type: 'audio/mp4; codecs="mp4a.40.5"'}) }])
            setTimeout(() => {
              player.database.closeDB()
            }, 5000)
          })
        })
      }
    })
  }

  /**
   * @type { number }
   * @description forward or backward time scale
   */
  get timeScale () {
    return this.config.timeScale || 15
  }

  set timeScale (scale) {
    this.config.timeScale = scale
  }

  /**
   * @type { 'order' | 'sloop' | 'loop' | 'random' }
   * @description  set current play mode
   */
  get mode () {
    return this.config.mode || PLAY_MODES.RANDOM
  }

  set mode (val) {
    this.config.mode = val
  }
}
