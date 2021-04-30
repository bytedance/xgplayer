import { findDom, hasClass, createDom, addClass, removeClass } from '../utils/util'
import Draggabilly from 'draggabilly'

let miniplayer = function () {
  let player = this
  let root = player.root
  function onMiniplayerBtnClick () {
    if (hasClass(root, 'xgplayer-miniplayer-active')) {
      player.exitMiniplayer()
    } else {
      player.getMiniplayer()
    }
  }
  player.on('miniplayerBtnClick', onMiniplayerBtnClick)

  function onDestroy () {
    player.off('miniplayerBtnClick', onMiniplayerBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)

  player.getMiniplayer = function () {
    if (hasClass(root, 'xgplayer-is-fullscreen')) {
      this.exitFullscreen(root)
    }
    if (hasClass(root, 'xgplayer-is-cssfullscreen')) {
      this.exitCssFullscreen()
    }
    if (hasClass(root, 'xgplayer-rotate-fullscreen')) {
      this.exitRotateFullscreen()
    }
    // let ro = this.root.getBoundingClientRect()
    // let Top = ro.top
    // let Left = ro.left
    let dragLay = createDom('xg-miniplayer-lay', '<div></div>', {}, 'xgplayer-miniplayer-lay')
    this.root.appendChild(dragLay)
    let dragHandle = createDom('xg-miniplayer-drag', `<div class="drag-handle"><span>${this.lang.MINIPLAYER_DRAG}</span></div>`, {tabindex: 9}, 'xgplayer-miniplayer-drag')
    this.root.appendChild(dragHandle)
    // eslint-disable-next-line no-unused-vars
    let draggie = new Draggabilly('.xgplayer', {
      handle: '.drag-handle'
    })
    addClass(this.root, 'xgplayer-miniplayer-active')
    this.root.style.right = 0
    this.root.style.bottom = '200px'
    this.root.style.top = ''
    this.root.style.left = ''
    this.root.style.width = '320px'
    this.root.style.height = '180px'
    if (this.config.miniplayerConfig) {
      if (this.config.miniplayerConfig.top !== undefined) {
        this.root.style.top = this.config.miniplayerConfig.top + 'px'
        this.root.style.bottom = ''
      }
      if (this.config.miniplayerConfig.bottom !== undefined) {
        this.root.style.bottom = this.config.miniplayerConfig.bottom + 'px'
      }
      if (this.config.miniplayerConfig.left !== undefined) {
        this.root.style.left = this.config.miniplayerConfig.left + 'px'
        this.root.style.right = ''
      }
      if (this.config.miniplayerConfig.right !== undefined) {
        this.root.style.right = this.config.miniplayerConfig.right + 'px'
      }
      if (this.config.miniplayerConfig.width !== undefined) {
        this.root.style.width = this.config.miniplayerConfig.width + 'px'
      }
      if (this.config.miniplayerConfig.height !== undefined) {
        this.root.style.height = this.config.miniplayerConfig.height + 'px'
      }
    }
    if (this.config.fluid) {
      this.root.style['padding-top'] = ''
    }
    let player = this;
    ['click', 'touchend'].forEach(item => {
      dragLay.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        player.exitMiniplayer()
        // player.root.style.top = `${Top}px`
        // player.root.style.left = `${Left}px`
      })
    })
  }

  player.exitMiniplayer = function () {
    removeClass(this.root, 'xgplayer-miniplayer-active')
    this.root.style.right = ''
    this.root.style.bottom = ''
    this.root.style.top = ''
    this.root.style.left = ''
    if (this.config.fluid) {
      this.root.style['width'] = '100%'
      this.root.style['height'] = '0'
      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`
    } else {
      if (this.config.width) {
        if (typeof this.config.width !== 'number') {
          this.root.style.width = this.config.width
        } else {
          this.root.style.width = `${this.config.width}px`
        }
      }
      if (this.config.height) {
        if (typeof this.config.height !== 'number') {
          this.root.style.height = this.config.height
        } else {
          this.root.style.height = `${this.config.height}px`
        }
      }
    }

    let dragLay = findDom(this.root, '.xgplayer-miniplayer-lay')
    if (dragLay && dragLay.parentNode) {
      dragLay.parentNode.removeChild(dragLay)
    }
    let dragHandle = findDom(this.root, '.xgplayer-miniplayer-drag')
    if (dragHandle && dragHandle.parentNode) {
      dragHandle.parentNode.removeChild(dragHandle)
    }
  }
}

export default {
  name: 'miniplayer',
  method: miniplayer
}