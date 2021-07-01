/* eslint-disable no-unused-vars */
import EventEmitter from 'event-emitter'
import util from '../util'
import XHR from '../util/xhr'

class EME {
  constructor (drm) {
    this.drm = drm
    this.KEYSYSTEM_TYPE = ''
    this.keys = {}
    if (this.drm.clearKeys) {
      this.KEYSYSTEM_TYPE = 'org.w3.clearkey'
      this.keys = this.drm.clearKeys
    }
    this.options = []
    this.ensurePromise = undefined
    // this.SetupEME(video, KEYSYSTEM_TYPE, "video", keys, options)
    EventEmitter(this)
  }

  setOptions (videoContentType = 'video/mp4; codecs="avc1.64001F"', audioContentType = 'audio/mp4; codecs="mp4a.40.2"') {
    // log('UA: "' + navigator.userAgent + '"')
    const basicVideoCapabilities = [
      { contentType: 'video/mp4; codecs="avc1.42E01E"' },
      { contentType: 'video/webm; codecs="vp8"' }
    ]

    const basicConfig = {
      videoCapabilities: basicVideoCapabilities
    }
    const offlineConfig = {
      videoCapabilities: basicVideoCapabilities,
      persistentState: 'required',
      sessionTypes: ['persistent-license']
    }

    // Try the offline config first, then fall back to the basic config.
    this.options = [offlineConfig, basicConfig]
    // this.options = [
    //   {
    //     persistentState: 'required',
    //     sessionTypes: ['persistent-license'],
    //     videoCapabilities: [
    //       {contentType: "video/mp4; codecs='avc1.42E01E'"},
    //       {contentType: "video/webm; codecs='vp8'"}
    //     ]
    //   },
    //   {
    //     videoCapabilities: [
    //       {contentType: "video/mp4; codecs='avc1.42E01E'"},
    //       {contentType: "video/webm; codecs='vp8'"}
    //     ]
    //   }
    // ]
    // if (typeof (MediaKeySystemAccess.prototype.getConfiguration) === 'undefined') {
    //   // Firefox 43 and earlier used a different style of defining configurations
    //   // for navigator.requestMediaKeySystem that doesn't match the current spec.
    //   // log("Detected obsolete navigator.requestMediaKeySystem options style.")
    //
    // } else {
    //   this.options = [
    //     {
    //       initDataTypes: ['cenc'],
    //       videoCapabilities: [{contentType: videoContentType}],
    //       audioCapabilities: [{contentType: audioContentType}]
    //     }
    //   ]
    // }
  }

  bail (message) {
    return function (err) {
      console.log(message + (err ? ' ' + err : ''))
    }
  }

  UpdateSessionFunc (drmKeys) {
    // console.log('UpdateSessionFunc')
    const self = this
    return function (ev) {
      const keys = []
      const keyIds = []
      Object.keys(drmKeys).forEach(function (keyIdHex) {
        const keyHex = drmKeys[keyIdHex]
        const keyId = util.fromHex(keyIdHex)
        const key = util.fromHex(keyHex)
        const keyObj = {
          kty: 'oct',
          kid: util.toBase64(keyId, false),
          k: util.toBase64(key, false)
        }
        keys.push(keyObj)
        keyIds.push(keyObj.kid)
      })

      const jwkSet = { keys: keys }
      const license = JSON.stringify(jwkSet)
      // let licenseServerUri = 'data:application/json;base64,' + window.btoa(license)
      // console.log('licenseServerUri')
      // console.log(licenseServerUri)
      // new XHR({url: licenseServerUri, method: 'POST', data: ev.message}).then((res) => {
      //   // let ctx = res.responseText
      //   console.log('licenseServerUri res')
      //   console.log(res)
      // }).catch((err) => {
      //   self.bail(err)
      // })
      ev.target.update(util.StringToArrayBuffer(license)).then(function () {
        // console.log(' MediaKeySession update ok!')
      }, self.bail(' MediaKeySession update failed'))

      // let msgStr = util.ArrayBufferToString(ev.message)
      // // console.log(' got message from CDM: ' + msgStr)
      // let msg = JSON.parse(msgStr)
      // let outKeys = []
      //
      // for (let i = 0; i < msg.kids.length; i++) {
      //   let id64 = msg.kids[i]
      //   let idHex = util.Base64ToHex(msg.kids[i]).toLowerCase()
      //   let key = keys[idHex]
      //
      //   if (key) {
      //     // console.log(' found key ' + key + ' for key id ' + idHex)
      //     outKeys.push({
      //       'kty': 'oct',
      //       'alg': 'A128KW',
      //       'kid': id64,
      //       'k': util.HexToBase64(key)
      //     })
      //   } else {
      //     self.bail(' couldnt find key for key id ' + idHex)
      //   }
      // }
      // console.log('outKeys')
      // console.log(outKeys)
      // let update = JSON.stringify({
      //   'keys': outKeys,
      //   'type': msg.type
      // })
      // // console.log(' sending update message to CDM: ' + update)
      //
      // ev.target.update(util.StringToArrayBuffer(update)).then(function () {
      //   // console.log(' MediaKeySession update ok!')
      // }, self.bail(' MediaKeySession update failed'))
    }
  }

  KeysChange (event) {
    const session = event.target
    // console.log('keystatuseschange event on session' + session.sessionId)
    const map = session.keyStatuses
    for (const entry of map.entries()) {
      const keyId = entry[0]
      const status = entry[1]
      const base64KeyId = util.Base64ToHex(window.btoa(util.ArrayBufferToString(keyId)))
      // console.log('SessionId=' + session.sessionId + ' keyId=' + base64KeyId + ' status=' + status)
    }
  }

  EnsureMediaKeysCreated (video, keySystem, options) {
    const self = this
    // We may already have a MediaKeys object if we initialized EME for a
    // different MSE SourceBuffer's 'encrypted' event, or the initialization
    // may still be in progress.
    if (this.ensurePromise) {
      return this.ensurePromise
    }

    // console.log('navigator.requestMediaKeySystemAccess(' + JSON.stringify(options) + ')')
    // console.log(keySystem)
    this.ensurePromise = navigator.requestMediaKeySystemAccess(keySystem, options)
      .then(function (keySystemAccess) {
        return keySystemAccess.createMediaKeys()
      }, self.bail(' Failed to request key system access.'))

      .then(function (mediaKeys) {
        // console.log(' created MediaKeys object ok')
        return video.setMediaKeys(mediaKeys)
      }, self.bail(' failed to create MediaKeys object'))

    return this.ensurePromise
  }

  SetupEME (video, keyIds) {
    const self = this
    video.sessions = []
    // console.log('install got encrypted event')
    // video.addEventListener('encrypted', function (ev) {
    this.on('encrypted', function () {
      // console.log('got encrypted event')
      // console.log(ev)
      const initDataType = 'keyids'
      const initDataStr = JSON.stringify({ kids: ['0123456789abcdef0123456789abcdef'] })
      const initData = new Uint8Array(util.toUTF8(initDataStr))

      self.EnsureMediaKeysCreated(video, self.KEYSYSTEM_TYPE, self.options)
        .then(function () {
          // console.log('ensured MediaKeys available on HTMLMediaElement')
          const session = video.mediaKeys.createSession()
          video.sessions.push(session)
          session.addEventListener('message', self.UpdateSessionFunc(self.keys))
          session.addEventListener('keystatuseschange', self.KeysChange)
          return session.generateRequest(initDataType, initData.buffer)
        }, self.bail(' failed to ensure MediaKeys on HTMLMediaElement'))

        .then(function () {
          // console.log(' generated request')
        }, self.bail(' Failed to generate request.'))
    })
  }
}

export default EME
