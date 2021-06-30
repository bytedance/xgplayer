import EventEmitter from 'event-emitter'
import MPD from './m4s/mpd'
import Task from './media/task'
import MSE from './media/mse'
import EME from './media/eme'

class DASH {
  constructor (url, options = {}, video) {
    EventEmitter(this)
    this.mse = undefined
    this.url = url
    this.inited = false
    if (video) {
      this.video = video
    }
    if (options.dashOpts && options.dashOpts.drm) {
      this.eme = new EME(options.dashOpts.drm)
    }
  }

  getData (url, range = [0]) {
    return new Promise((resolve, reject) => {
      const task = new Task(url, resolve, range)
      task.once('error', err => {
        self.emit('error', err)
      })
    })
  }

  init (url) {
    const mpd = new MPD(url)
    this.mpd = mpd
    const dash = this
    let mse
    let vl, al
    return new Promise((resolve, reject) => {
      mpd.once('ready', () => {
        dash.type = mpd.type
        vl = mpd.mediaList.video
        al = mpd.mediaList.audio
        if (dash.eme) {
          // console.log('dash.eme')
          // console.log(`${vl[vl.selectedIdx].mimeType}; codecs="${vl[vl.selectedIdx].codecs}"`)
          // console.log(`${al[al.selectedIdx].mimeType}; codecs="${al[al.selectedIdx].codecs}"`)
          dash.eme.setOptions(`${vl[vl.selectedIdx].mimeType}; codecs="${vl[vl.selectedIdx].codecs}"`, `${al[al.selectedIdx].mimeType}; codecs="${al[al.selectedIdx].codecs}"`)
          dash.eme.SetupEME(dash.video)
        }
        mse = new MSE()
        mse.on('sourceopen', function () {
          ['video', 'audio'].forEach(mediaType => {
            const ml = mpd.mediaList[mediaType]
            if (ml[ml.selectedIdx]) {
              mse.addSourceBuffer(`${ml[ml.selectedIdx].mimeType};codecs="${ml[ml.selectedIdx].codecs}"`)
              dash.getData(
                ml[ml.selectedIdx].initSegment,
                ml[ml.selectedIdx].initSegmentRange
              ).then(function (initRes) {
                // console.log('get initSegment');
                mse.appendBuffer(`${ml[0].mimeType};codecs="${ml[0].codecs}"`, initRes)
                mse.once(`${ml[ml.selectedIdx].mimeType};codecs="${ml[ml.selectedIdx].codecs}" updateend`, function () {
                  ml[ml.selectedIdx].inited = true
                  mse.emit('updateend')
                })
              })
            }
          })
        })
        mse.on('updateend', function (e) {
          if (vl[vl.selectedIdx] && vl[vl.selectedIdx].inited && al[al.selectedIdx] && al[al.selectedIdx].inited) {
            dash.inited = true
            if (vl[vl.selectedIdx].encrypted || al[al.selectedIdx].encrypted) {
              dash.eme.emit('encrypted')
            }
            // console.log('dash.inited = true')
            if (dash.type === 'vod') {
              // console.log('vod dash.seek(0)')
              dash.seek(0)
              dash.emit('startPlay')
            }
          }
        })
        mse.on('error', function (e) {
          reject(e)
          console.log('mse error')
        })
        dash.mse = mse
        resolve(mse)
      })
      mpd.once('end', () => {
        if (this.type === 'live') {
          dash.mse.endOfStream()
        }
      })
    })
  }

  seek (time) {
    const dash = this
    const seekResult = this.mpd.seek(time);
    ['video', 'audio'].forEach(mediaType => {
      if (seekResult[mediaType] && seekResult[mediaType].length > 0) {
        // console.log('seekResult[mediaType].length > 0')
        // console.log(seekResult[mediaType])
        seekResult[mediaType].every(item => {
          if (item.downloaded) {
            return true
          }
          // eslint-disable-next-line no-unused-vars
          const tasker = new Task(item.url, (res) => {
            if (res === 'Not Found') {
              // console.log('Not Found')
              if (!item.tryTimes) {
                item.tryTimes = 0
              }
              item.tryTimes++
              if (item.tryTimes <= 2) {
                return true
              }
            } else {
              // console.log('dash.mse.appendBuffer')
              // console.log(dash.mpd.mediaList[mediaType][0].mimeType)
              // console.log(dash.mpd.mediaList[mediaType][0].codecs)
              dash.mse.appendBuffer(`${dash.mpd.mediaList[mediaType][0].mimeType};codecs="${dash.mpd.mediaList[mediaType][0].codecs}"`, new Uint8Array(res))
            }
            const idx = item.idx
            const ml = dash.mpd.mediaList[mediaType]
            ml[ml.selectedIdx].mediaSegments.every(sItem => {
              if (sItem.idx !== idx) {
                return true
              } else {
                sItem.downloaded = true
                return false
              }
            })
          }, item.range)
          return true
        })
      }
    })
  }
}

export default DASH
