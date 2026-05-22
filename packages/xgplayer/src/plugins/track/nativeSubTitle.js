import EventEmitter from 'eventemitter3'
export default class NativeSubTitle extends EventEmitter{
  constructor (media) {
    super()
    this._media = media
    this._list = []
    this._languages = ''
    this.curIndex = -1
    this._init()
  }

  _init () {
    const _list = this._media.textTracks
    _list.addEventListener('change', this._onChange)
  }

  _onChange = (e) => {
    const _list = this._media.textTracks
    if (!_list || _list.length === 0) {
      return
    }
    const retList = []
    const langs = []
    let curIndex = -1
    for (let i = 0; i < _list.length; i++) {
      const item = _list[i]
      if (item.kind === 'subtitles') {
        retList.push({
          id: item.id || item.language,
          language: item.language,
          text: item.label,
          isDefault: item.mode === 'showing'
        })
        if (curIndex === -1 && item.mode === 'showing') {
          curIndex = i
        }
        langs.push(item.language)
      }
    }

    // 语言列表发生变化
    if (langs.join('|') !== this._languages) {
      this._languages = langs.join('|')
      this.emit('reset', {
        list: retList,
        isOpen: curIndex > -1
      })
    } else if (curIndex === -1) {
      this.emit('off')
    } else if (this.curIndex !== curIndex) {
      this.emit('change', retList[curIndex])
    }
    this.curIndex = curIndex
  }

  /**
   * @description 切换字幕
   * @param { null | {
   *  id: any,
   *  language: any
   * }} data
   */
  switch (data) {
    const _tracks = this._media.textTracks
    for (let i = 0; i < _tracks.length; i++) {
      const item = _tracks[i]
      if (item.language === data.language) {
        item.mode = 'showing'
        // this.curIndex = i
      } else if (item.mode === 'showing') {
        item.mode = 'disabled'
      }
    }
  }

  switchOff () {
    const _tracks = this._media.textTracks
    for (let i = 0; i < _tracks.length; i++) {
      _tracks[i].mode = 'disabled'
    }
    this.curIndex = -1
  }

  destroy () {
    const _list = this._media.textTracks
    _list.removeEventListener('change', this._onChange)
    this._media = null
    this._list = []
    this._languages = ''
    this.curIndex = -1
  }
}