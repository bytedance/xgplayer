import downloadUtil from 'downloadjs'
import {getAbsoluteURL} from '../utils/url'

let download = function () {
  let player = this

  function onDownloadBtnClick () {
    // must pass an absolute url for download
    player.download()
  }
  player.on('downloadBtnClick', onDownloadBtnClick)

  function onDestroy () {
    player.off('downloadBtnClick', onDownloadBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)

  player.download = function () {
    const url = getAbsoluteURL(this.config.url)
    downloadUtil(url)
  }
}

export default {
  name: 'download',
  method: download
}