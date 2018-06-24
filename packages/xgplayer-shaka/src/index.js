import Player from 'xgplayer'
import Shaka from 'shaka-player'

class ShakaJsPlayer extends Player {
  constructor (options) {
    super(options)
    let self = this
    this.shakaOpts = options.shakaOpts || {}
    this.util = Player.util
    this.player = this
    this.url = this.player.config.url
    this.sniffer = Player.sniffer
    this.player_ = null
    this.content = []

    Shaka.polyfill.installAll()

    if (Shaka.Player.isBrowserSupported()) {
      this.video_ = this.player.video
      this.video_.autoplay = false
      this.player_ = new Shaka.Player(this.video_)

      this.player_.addEventListener('error', function (event) {
        console.error('Error code', event.detail.code, 'object', event.detail) // eslint-disable-line no-console
      })

      if (this.shakaOpts) {
        this.player_.configure(this.shakaOpts)
      }

      this.player_.getNetworkingEngine().registerRequestFilter(function (type, request) {
        // Only add headers to license requests:
        if (type === Shaka.net.NetworkingEngine.RequestType.LICENSE) {
          // This is the specific header name and value the server wants:
          request.headers['CWIP-Auth-Header'] = 'VGhpc0lzQVRlc3QK'
        }
      })

      // this.player_.addEventListener(
      //     'trackschanged', self.onTracksChanged_);
      this.player_.addEventListener(
        'adaptation', self.onAdaptation_)

      let config = {abr: {enabled: false}}
      this.player_.configure(config)

      this.once('complete', () => {
        this.player_.load(this.url).then(function () {
          console.log('The video has now been loaded!') // eslint-disable-line no-console
          self.onTracksChanged_()
        }).catch(function (event) {
          console.error('Error code', event.detail.code, 'object', event.detail) // eslint-disable-line no-console
        }) // eslint-disable-line no-console);
      })

      if (this.player_.isLive()) {
        this.util.addClass(this.player.root, 'xgplayer-is-live')
        let live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
        this.player.controls.appendChild(live)
      }
    } else {
      console.error('Browser not supported!') // eslint-disable-line no-console
    }
  }

  onTracksChanged_ () {
    this.updateVariantTracks_()
  }

  onAdaptation_ () {
    let self = this
    // console.log('onAdaptation_')
    let tracks = this.player_.getVariantTracks()

    tracks.forEach(function (track) {
      if (!track.active) {
        return
      }

      for (let i = 0; i < self.content.length; ++i) {
        let option = self.content[i]
        if (option.value === track.id) {
          option.selected = true
        } else {
          option.selected = false
        }
      }
    })
  }

  updateVariantTracks_ () {
    let tracks = this.player_.getVariantTracks()
    tracks.sort(function (t1, t2) {
      return t1.bandwidth - t2.bandwidth
    })
    this.updateTrackOptions_(tracks)
  }

  updateTrackOptions_ (tracks) {
    // console.log(tracks); // eslint-disable-line no-console
    let self = this
    let formatters = {
      variant: function (track) {
        let trackInfo = ''
        if (track.width && track.height) {
          trackInfo += track.height + 'P'
        }
        // trackInfo += track.bandwidth + ' bits/s';
        return trackInfo
      }
    }
    this.content = []
    tracks.forEach(function (track) {
      let option = {}
      option.textContent = formatters[track.type](track)
      option.track = track
      option.value = track.id
      option.selected = track.active
      self.content.push(option)
    })
    this.updateDefinition()
  }

  updateDefinition () {
    let self = this
    let ul = this.util.createDom('xg-definition', '', {tabindex: 3}, 'xgplayer-definition')
    let root = this.player.controls
    if (this.sniffer.device === 'mobile') {
      return
    }
    // let availableBitrates = _player.getBitrateInfoListFor('video') || [];

    if (this.content instanceof Array && this.content.length > 1) {
      // this.content.forEach(function (element, index) {
      //     content.push(isNaN(index) ? 'Auto' : element.height + 'P');
      // });
      this.util.addClass(this.player.root, 'xgplayer-is-definition')

      let tmp = ['<ul>']

      // tmp.push('<li class="definition">Auto</li>');
      this.content.forEach(item => {
        tmp.push(`<li class=''>${item.textContent}</li>`)
      })
      this.content.some(item => {
        if (item.selected) {
          tmp.push(`</ul><p class="name"><em>${item.textContent}</em></p>`)
          return true
        }
        return false
      })
      let urlInRoot = root.querySelector('.xgplayer-definition')
      if (urlInRoot) {
        urlInRoot.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('')
      } else {
        ul.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('')
        root.appendChild(ul)
      }
    }

    ['touchstart', 'click'].forEach(item => {
      ul.addEventListener(item, function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        let li = ev.target || ev.srcElement
        if (li && li.tagName.toLocaleLowerCase() === 'li') {
          Array.prototype.forEach.call(li.parentNode.childNodes, item => {
            self.util.removeClass(item, 'definition')
          })
          self.util.addClass(li, 'definition')
          li.parentNode.nextSibling.textContent = li.textContent

          let config = {abr: {enabled: false}}
          self.player_.configure(config)
          // console.log(li.innerHTML);
          self.content.some((item, index) => {
            if (li.innerHTML.indexOf(item.textContent) > -1) {
              self.player_.selectVariantTrack(self.content[index].track, true)
              return true
            }
            return false
          })

          // let enableAdaptation = this.player_.getConfiguration().abr.enabled;
          // document.getElementById('enableAdaptation').checked = enableAdaptation;
        } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
          self.util.addClass(ul, 'xgplayer-definition-active')
          ul.focus()
        }
      }, false)
    })
    ul.addEventListener('blur', (e) => {
      e.preventDefault()
      e.stopPropagation()
      self.util.removeClass(ul, 'xgplayer-definition-active')
    })

    this.player.once('destroy', () => {
      ul = null
    })
    this.player.start = (url = self.player.config.url) => {
      let root = self.player.root
      root.insertBefore(self.player.video, root.firstChild)
      self.util.removeClass(root, 'none')
      self.player.userTimer = setTimeout(function () {
        self.player.emit('blur')
      }, self.player.config.inactive)
      setTimeout(() => {
        self.player.emit('complete')
      }, 1)

      self.player.reset = () => {
        // _player.reset();
      }
    }
  }
}

ShakaJsPlayer.isSupported = Shaka.Player.isBrowserSupported()

export default ShakaJsPlayer
