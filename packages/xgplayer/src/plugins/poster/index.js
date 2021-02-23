import Plugin, {Events, Util} from '../../plugin'

class Poster extends Plugin {
  static get pluginName () {
    return 'poster'
  }

  static get defaultConfig () {
    return {
      isEndedShow: true,
      hideCanplay: false, // cnaplay的时候才隐藏
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
    if (typeof args.player.config.poster === 'string') {
      args.config.poster = args.player.config.poster
    }
  }

  afterCreate () {
    this.on(Events.ENDED, () => {
      if (!this.isEndedShow) {
        Util.addClass(this.root, 'hide')
      }
    })

    if (this.config.hideCanplay) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
      this.on(Events.URL_CHANGE, () => {
        console.log('Events.URL_CHANGE')
        Util.removeClass(this.root, 'hide')
        Util.addClass(this.root, 'xg-showplay')
        this.once(Events.TIME_UPDATE, () => {
          this.onTimeUpdate()
        })
      })
    } else {
      this.on(Events.PLAY, () => {
        Util.addClass(this.root, 'hide')
      })
    }
  }

  onTimeUpdate () {
    console.log('onTimeUpdate', this.player.currentTime)
    if (!this.player.currentTime) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
    } else {
      Util.removeClass(this.root, 'xg-showplay')
    }
  }

  update (poster) {
    if (!poster) {
      return
    }
    this.config.poster = poster
    this.root.style.backgroundImage = `url(${poster})`
  }

  render () {
    const {poster, hideCanplay} = this.config
    const style = poster ? `background-image:url(${poster});` : ''
    return `<xg-poster class="xgplayer-poster ${hideCanplay ? 'xg-showplay' : ''}" style="${style}">
    </xg-poster>`
  }
}

export default Poster
