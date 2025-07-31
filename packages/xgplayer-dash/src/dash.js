import EventEmitter from 'eventemitter3'
import MPD from './m4s/mpd'
import EME from './media/eme'
import MSE from './media/mse'
import Task from './media/task'

class DASH extends EventEmitter {
  constructor(url, options = {}, video) {
    super()
    this.mse = undefined
    this.url = url
    this.inited = false
    if (video) {
      this.video = video
    }
    if (options.dashOpts?.drm) {
      this.eme = new EME(options.dashOpts.drm)
    }
  }

  getData(url, range = [0]) {
    return new Promise((resolve, _reject) => {
      const task = new Task(url, resolve, range)
      task.once('error', err => {
        this.emit('error', err)
      })
    })
  }

  init(url) {
    const mpd = new MPD(url)
    this.mpd = mpd
    let mse
    let vl, al
    return new Promise((resolve, reject) => {
      mpd.once('ready', () => {
        this.type = mpd.type
        vl = mpd.mediaList.video
        al = mpd.mediaList.audio
        if (this.eme) {
          // console.log('dash.eme')
          // console.log(`${vl[vl.selectedIdx].mimeType}; codecs="${vl[vl.selectedIdx].codecs}"`)
          // console.log(`${al[al.selectedIdx].mimeType}; codecs="${al[al.selectedIdx].codecs}"`)
          this.eme.setOptions(
            `${vl[vl.selectedIdx].mimeType}; codecs="${vl[vl.selectedIdx].codecs}"`,
            `${al[al.selectedIdx].mimeType}; codecs="${al[al.selectedIdx].codecs}"`
          )
          this.eme.SetupEME(this.video)
        }
        mse = new MSE()
        mse.on('sourceopen', () => {
          ;['video', 'audio'].forEach(mediaType => {
            const ml = mpd.mediaList[mediaType]
            if (ml[ml.selectedIdx]) {
              mse.addSourceBuffer(
                `${ml[ml.selectedIdx].mimeType};codecs="${ml[ml.selectedIdx].codecs}"`
              )
              this.getData(
                ml[ml.selectedIdx].initSegment,
                ml[ml.selectedIdx].initSegmentRange
              ).then(initRes => {
                // console.log('get initSegment');
                mse.appendBuffer(`${ml[0].mimeType};codecs="${ml[0].codecs}"`, initRes)
                mse.once(
                  `${ml[ml.selectedIdx].mimeType};codecs="${ml[ml.selectedIdx].codecs}" updateend`,
                  () => {
                    ml[ml.selectedIdx].inited = true
                    mse.emit('updateend')
                  }
                )
              })
            }
          })
        })
        mse.on('updateend', _e => {
          if (
            vl[vl.selectedIdx] &&
            vl[vl.selectedIdx].inited &&
            al[al.selectedIdx] &&
            al[al.selectedIdx].inited
          ) {
            this.inited = true
            if (vl[vl.selectedIdx].encrypted || al[al.selectedIdx].encrypted) {
              this.eme.emit('encrypted')
            }
            // console.log('dash.inited = true')
            if (this.type === 'vod') {
              // console.log('vod dash.seek(0)')
              this.seek(0)
              this.emit('startPlay')
            }
          }
        })
        mse.on('error', e => {
          reject(e)
          console.log('mse error')
        })
        this.mse = mse
        resolve(mse)
      })
      mpd.once('end', () => {
        if (this.type === 'live') {
          this.mse.endOfStream()
        }
      })
    })
  }

  seek(time) {
    const seekResult = this.mpd.seek(time)
    ;['video', 'audio'].forEach(mediaType => {
      if (seekResult[mediaType] && seekResult[mediaType].length > 0) {
        // console.log('seekResult[mediaType].length > 0')
        // console.log(seekResult[mediaType])
        seekResult[mediaType].every(item => {
          if (item.downloaded) {
            return true
          }
          // eslint-disable-next-line no-unused-vars
          const _tasker = new Task(
            item.url,
            res => {
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
                this.mse.appendBuffer(
                  `${this.mpd.mediaList[mediaType][0].mimeType};codecs="${this.mpd.mediaList[mediaType][0].codecs}"`,
                  new Uint8Array(res)
                )
              }
              const idx = item.idx
              const ml = this.mpd.mediaList[mediaType]
              ml[ml.selectedIdx].mediaSegments.every(sItem => {
                if (sItem.idx !== idx) {
                  return true
                } else {
                  sItem.downloaded = true
                  return false
                }
              })
            },
            item.range
          )
          return true
        })
      }
    })
  }
}

export default DASH
