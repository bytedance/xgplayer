import Plugin from '../../../plugin'
import './index.scss'

const {Util} = Plugin

class MiniScreenIcon extends Plugin {
  static get pluginName () {
    return 'miniscreen'
  }

  afterCreate () {
    this.getMini = this.getMini.bind(this)
    this.exitMini = this.exitMini.bind(this)
    this.bind(['click', 'touchend'], this.getMini)
  }

  getMini () {
    const _player = this.player;
    // let ro = this.root.getBoundingClientRect()
    // let Top = ro.top
    // let Left = ro.left
    let dragLay = Util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay')
    _player.root.appendChild(dragLay)
    let dragHandle = Util.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', {tabindex: 9}, 'xgplayer-pip-drag')
    _player.root.appendChild(dragHandle)
    Util.addClass(this.root, 'xgplayer-pip-active')
    _player.root.style.right = 0
    _player.root.style.bottom = '200px'
    _player.root.style.top = ''
    _player.root.style.left = ''
    _player.root.style.width = '320px'
    _player.root.style.height = '180px'
    if (this.config) {
      if (this.config.top !== undefined) {
        _player.root.style.top = this.config.top + 'px'
        _player.root.style.bottom = ''
      }
      if (this.config.bottom !== undefined) {
        _player.root.style.bottom = this.config.bottom + 'px'
      }
      if (this.config.left !== undefined) {
        _player.root.style.left = this.config.left + 'px'
        _player.root.style.right = ''
      }
      if (this.config.right !== undefined) {
        _player.root.style.right = this.config.right + 'px'
      }
      if (this.config.width !== undefined) {
        _player.root.style.width = this.config.width + 'px'
      }
      if (this.config.height !== undefined) {
        _player.root.style.height = this.config.height + 'px'
      }
    }
    if (_player.config.fluid) {
      _player.root.style['padding-top'] = ''
    }
    ['click', 'touchend'].forEach(item => {
      dragLay.addEventListener(item, (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.exitMini()
        // player.root.style.top = `${Top}px`
        // player.root.style.left = `${Left}px`
      })
    })
  }

  exitMini () {
    const player = this.player;
    Util.removeClass(this.root, 'xgplayer-pip-active')
    player.root.style.right = ''
    player.root.style.bottom = ''
    player.root.style.top = ''
    player.root.style.left = ''
    if (player.config.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`
    } else {
      if (player.config.width) {
        if (typeof this.config.width !== 'number') {
          player.root.style.width = player.config.width
        } else {
          player.root.style.width = `${player.config.width}px`
        }
      }
      if (player.config.height) {
        if (typeof player.config.height !== 'number') {
          player.root.style.height = player.config.height
        } else {
          player.root.style.height = `${player.config.height}px`
        }
      }
    }

    let dragLay = Util.findDom(player.root, '.xgplayer-pip-lay')
    if (dragLay && dragLay.parentNode) {
      dragLay.parentNode.removeChild(dragLay)
    }
    let dragHandle = Util.findDom(player.root, '.xgplayer-pip-drag')
    if (dragHandle && dragHandle.parentNode) {
      dragHandle.parentNode.removeChild(dragHandle)
    }
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  // 扩展语言
  registerLangauageTexts () {
    return {
      'miniscreen': {
        jp: '日文text',
        en: 'miniscreen',
        zh: '小屏幕'
      }
    }
  }

  render () {
    let text = this.text.miniscreen
    return `
      <xg-icon class="xgplayer-miniicon">
       <p class="name"><span>${text}</span></p>
      </xg-icon>`
  }
}

export default MiniScreenIcon
