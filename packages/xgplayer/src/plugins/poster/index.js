import Plugin, {Events, Util} from '../../plugin'

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

  hide () {
    Util.addClass(this.root, 'hide')
  }

  show () {
    Util.removeClass(this.root, 'hide')
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
    this.on(Events.ENDED, () => {
      if (!this.isEndedShow) {
        Util.addClass(this.root, 'hide')
      }
    })

    this.on(Events.PLAY, () => {
      Util.addClass(this.root, 'hide')
    })
  }

  update (poster) {
    if (!poster) {
      return
    }
    this.config.poster = poster
    this.root.style.backgroundImage = `url:${poster}`
  }

  render () {
    const {poster} = this.config
    const style = poster ? `background-image:url(${poster});` : ''
    return `<xg-poster class="xgplayer-poster" style="${style}">
    </xg-poster>`
  }
}

export default Poster
