import Plugin from '../../plugin';
import util from '../../utils/util'

class MiniScreen extends Plugin {
  static get pluginName () {
    return 'miniscreen'
  }
  constructor (args) {
    super(args)

    this.getPIP = this.getPIP.bind(this)
    this.exitPIP = this.exitPIP.bind(this)
  }

  afterCreate () {
    this.bind('.xgplayer-pip', 'click', this.getPIP)
    this.bind('.xgplayer-pip', 'touchend', this.getPIP)
  }

  getPIP () {
    // let ro = this.root.getBoundingClientRect()
    // let Top = ro.top
    // let Left = ro.left
    let dragLay = util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay')
    this.root.appendChild(dragLay)
    let dragHandle = util.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', {tabindex: 9}, 'xgplayer-pip-drag')
    this.root.appendChild(dragHandle)
    util.addClass(this.root, 'xgplayer-pip-active')
    this.root.style.right = 0
    this.root.style.bottom = '200px'
    this.root.style.top = ''
    this.root.style.left = ''
    this.root.style.width = '320px'
    this.root.style.height = '180px'
    if (this.config.pipConfig) {
      if (this.config.pipConfig.top !== undefined) {
        this.root.style.top = this.config.pipConfig.top + 'px'
        this.root.style.bottom = ''
      }
      if (this.config.pipConfig.bottom !== undefined) {
        this.root.style.bottom = this.config.pipConfig.bottom + 'px'
      }
      if (this.config.pipConfig.left !== undefined) {
        this.root.style.left = this.config.pipConfig.left + 'px'
        this.root.style.right = ''
      }
      if (this.config.pipConfig.right !== undefined) {
        this.root.style.right = this.config.pipConfig.right + 'px'
      }
      if (this.config.pipConfig.width !== undefined) {
        this.root.style.width = this.config.pipConfig.width + 'px'
      }
      if (this.config.pipConfig.height !== undefined) {
        this.root.style.height = this.config.pipConfig.height + 'px'
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
        player.exitPIP()
        // player.root.style.top = `${Top}px`
        // player.root.style.left = `${Left}px`
      })
    })
  }

  exitPIP () {
    util.removeClass(this.root, 'xgplayer-pip-active')
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

    let dragLay = util.findDom(this.root, '.xgplayer-pip-lay')
    if (dragLay && dragLay.parentNode) {
      dragLay.parentNode.removeChild(dragLay)
    }
    let dragHandle = util.findDom(this.root, '.xgplayer-pip-drag')
    if (dragHandle && dragHandle.parentNode) {
      dragHandle.parentNode.removeChild(dragHandle)
    }
  }

  _destroy () {
    this.unbind('.xgplayer-pip', 'click', this.getPIP)
    this.unbind('.xgplayer-pip', 'touchend', this.getPIP)
    super._destroy();
  }

  render () {
    let pip = this.player.lang.PIP
    return `<xg-pip class="xgplayer-pip" tabindex="9"><p class="name">${pip}</p></xg-pip>`
  }
}

export default MiniScreen
