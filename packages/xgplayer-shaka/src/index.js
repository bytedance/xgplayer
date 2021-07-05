import { BasePlugin, Sniffer } from 'xgplayer'
import Shaka from 'shaka-player'

class ShakaJsPlugin extends BasePlugin {
  static get pluginName () {
    return 'ShakaJsPlugin'
  }

  static get defaultConfig () {
    return {
      shakaOpts: {}
    }
  }

  static isSupported () {
    return Shaka.Player.isBrowserSupported()
  }

  constructor (args) {
    super(args)
    Shaka.polyfill.installAll()
  }

  afterCreate () {
    this.content = []
    this.url = this.player.config.url
    // if (Shaka.Player.isBrowserSupported()) {
    // } else {
    //   console.error('Browser not supported!') // eslint-disable-line no-console
    // }
  }

  beforePlayerInit () {
    if (!Shaka.Player.isBrowserSupported()) {
      throw new Error('Browser not supported!')
    } else {
      this._initShaka()
    }
  }

  _initShaka () {
    const { player } = this
    this.shakaplayer = new Shaka.Player(player.video)
    this.shakaplayer.addEventListener('error', (event) => {
      console.error('Error code', event.detail.code, 'object', event.detail) // eslint-disable-line no-console
    })
    if (this.config.shakaOpts) {
      this.shakaplayer.configure(this.config.shakaOpts)
    }
    this.shakaplayer.getNetworkingEngine().registerRequestFilter((type, request) => {
      // Only add headers to license requests:
      if (type === Shaka.net.NetworkingEngine.RequestType.LICENSE) {
        // This is the specific header name and value the server wants:
        request.headers['CWIP-Auth-Header'] = 'VGhpc0lzQVRlc3QK'
      }
    })

    // this.player_.addEventListener(
    //     'trackschanged', self.onTracksChanged_);
    this.shakaplayer.addEventListener(
      'adaptation', this.onAdaptation_)

    const config = { abr: { enabled: false } }
    this.shakaplayer.configure(config)

    this.once('complete', () => {
      this.shakaplayer.load(this.url).then(() => {
        this.onTracksChanged_()
      }).catch((event) => {
        console.trace('event', event)
        console.error('Error code', event.detail.code, 'object', event.detail) // eslint-disable-line no-console
      })
    })

    // if (this.shakaplayer.isLive()) {
    //   this.util.addClass(this.player.root, 'xgplayer-is-live')
    //   const live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
    //   this.player.controls.appendChild(live)
    // }
  }

  onTracksChanged_ () {
    this.updateVariantTracks_()
  }

  onAdaptation_ = () => {
    // console.log('onAdaptation_')
    const tracks = this.shakaplayer.getVariantTracks()

    tracks.forEach(function (track) {
      if (!track.active) {
        return
      }

      for (let i = 0; i < this.content.length; ++i) {
        const option = this.content[i]
        if (option.value === track.id) {
          option.selected = true
        } else {
          option.selected = false
        }
      }
    })
  }

  updateVariantTracks_ () {
    const tracks = this.shakaplayer.getVariantTracks()
    tracks.sort(function (t1, t2) {
      return t1.bandwidth - t2.bandwidth
    })
    this.updateTrackOptions_(tracks)
  }

  updateTrackOptions_ (tracks) {
    // console.log(tracks); // eslint-disable-line no-console
    const formatters = {
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
    tracks.forEach((track) => {
      const option = {}
      option.textContent = formatters[track.type](track)
      option.track = track
      option.value = track.id
      option.selected = track.active
      this.content.push(option)
    })
    this.updateDefinition()
  }

  updateDefinition () {
    if (Sniffer.device === 'mobile') {
      return
    }
    console.log('updateDefinition', this.content)
    // let availableBitrates = _player.getBitrateInfoListFor('video') || [];

    // if (this.content instanceof Array && this.content.length > 1) {
    //   // this.content.forEach(function (element, index) {
    //   //     content.push(isNaN(index) ? 'Auto' : element.height + 'P');
    //   // });
    //   this.util.addClass(this.player.root, 'xgplayer-is-definition')

    //   const tmp = ['<ul>']

    //   // tmp.push('<li class="definition">Auto</li>');
    //   this.content.forEach(item => {
    //     tmp.push(`<li class=''>${item.textContent}</li>`)
    //   })
    //   this.content.some(item => {
    //     if (item.selected) {
    //       tmp.push(`</ul><p class="name"><em>${item.textContent}</em></p>`)
    //       return true
    //     }
    //     return false
    //   })
    //   const urlInRoot = root.querySelector('.xgplayer-definition')
    //   if (urlInRoot) {
    //     urlInRoot.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('')
    //   } else {
    //     ul.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('')
    //     root.appendChild(ul)
    //   }
    // }

    // ['touchstart', 'click'].forEach(item => {
    //   ul.addEventListener(item, function (ev) {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     const li = ev.target || ev.srcElement
    //     if (li && li.tagName.toLocaleLowerCase() === 'li') {
    //       Array.prototype.forEach.call(li.parentNode.childNodes, item => {
    //         self.util.removeClass(item, 'definition')
    //       })
    //       self.util.addClass(li, 'definition')
    //       li.parentNode.nextSibling.textContent = li.textContent

    //       const config = { abr: { enabled: false } }
    //       self.player_.configure(config)
    //       // console.log(li.innerHTML);
    //       self.content.some((item, index) => {
    //         if (li.innerHTML.indexOf(item.textContent) > -1) {
    //           self.player_.selectVariantTrack(self.content[index].track, true)
    //           return true
    //         }
    //         return false
    //       })

    //       // let enableAdaptation = this.player_.getConfiguration().abr.enabled;
    //       // document.getElementById('enableAdaptation').checked = enableAdaptation;
    //     } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
    //       self.util.addClass(ul, 'xgplayer-definition-active')
    //       ul.focus()
    //     }
    //   }, false)
    // })
    // ul.addEventListener('blur', (e) => {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   self.util.removeClass(ul, 'xgplayer-definition-active')
    // })

    // this.player.once('destroy', () => {
    //   ul = null
    // })
    // this.player.start = (url = self.player.config.url) => {
    //   const root = self.player.root
    //   root.insertBefore(self.player.video, root.firstChild)
    //   self.util.removeClass(root, 'none')
    //   self.player.userTimer = setTimeout(function () {
    //     self.player.emit('blur')
    //   }, self.player.config.inactive)
    //   setTimeout(() => {
    //     self.player.emit('complete')
    //   }, 1)

    //   self.player.reset = () => {
    //     // _player.reset();
    //   }
    // }
  }
}

export default ShakaJsPlugin
