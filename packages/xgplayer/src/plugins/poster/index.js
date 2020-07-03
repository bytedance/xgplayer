import Plugin from '../../plugin'
const {Events, Util} = Plugin

class Poster extends Plugin {
  static get pluginName () {
    return 'poster'
  }

  static get defaultConfig () {
    return {
      isEndedShow: true,
      poster: ''
    }
  }

  set isEndedShow (value) {
    this.config.isEndedShow = value
  }

  get isEndedShow () {
    return this.config.isEndedShow
  }

  beforeCreate (args) {
    if (typeof args.player.config.poster === 'object') {
      args.config = args.player.config.poster
    } else {
      args.config = {
        poster: args.player.config.poster
      }
    }
  }

  afterCreate () {
    console.log('ths.cinfig', this.config)
    this.on(Events.ENDED, () => {
      if (!this.isEndedShow) {
        Util.addClass(this.root, 'hide')
      }
    })

    this.on(Events.Play, () => {
      Util.removeClass(this.root, 'hide')
    })
  }

  render () {
    const {poster} = this.config
    if (!poster) {
      return ''
    }
    return `<xg-poster class="xgplayer-poster show" style="background-image:url(${poster})">
    </xg-poster>`
  }
}

export default Poster
