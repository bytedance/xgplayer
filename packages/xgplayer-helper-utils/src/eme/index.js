const KeySystems = {
  WIDEVINE: 'com.widevine.alpha',
  PLAYREADY: 'com.microsoft.playready'
}

const MAX_LICENSE_REQUEST_FAILURES = 3;

export default class EME {
  constructor ({ config, player }) {
    this.licenseUrl = config.licenseUrl
    this.mediaKeySystemConfigs = config.mediaKeySystemConfigs
    this.keySystem = config.keySystem || KeySystems.WIDEVINE
    this.video = player.video
    this.mediaKeysList = []
    this.requestLicenseFailureCount = 0
  }

  init () {
    this.on('ManifestParsed', this.onManifestParsed.bind(this))
  }

  onManifestParsed (data) {
    const mediaKeySystemConfigs = this.mediaKeySystemConfigs || this.createWidevineMediaKeySystemConfigurations(data.audioCodecs, data.videoCodecs)

    navigator.requestMediaKeySystemAccess(this.keySystem, mediaKeySystemConfigs)
      .then((keySystemAccess) => {
        return keySystemAccess.createMediaKeys();
      }).then((mediaKeys) => {
        this.video.setMediaKeys(mediaKeys);
      })

    this.video.addEventListener('encrypted', this.onMediaEncrypted.bind(this))
  }

  onKeySessionMessage (keySession, message) {
    this.requestLicense(message, (data) => {
      keySession.update(data);
    });
  }

  requestLicense (keyMessage, callback) {
    try {
      const url = this.licenseUrl;
      const xhr = this.createLicenseXhr(url, keyMessage, callback);
      xhr.send(keyMessage);
    } catch (e) {}
  }

  createLicenseXhr (url, keyMessage, callback) {
    const xhr = new window.XMLHttpRequest();

    xhr.open('POST', url, true);

    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = this.onLicenseRequestReadyStageChange.bind(this, xhr, url, keyMessage, callback);
    return xhr;
  }

  onLicenseRequestReadyStageChange (xhr, url, keyMessage, callback) {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status === 200) {
          this.requestLicenseFailureCount = 0;
          callback(xhr.response);
        } else {
          this.requestLicenseFailureCount++;

          if (this.requestLicenseFailureCount > MAX_LICENSE_REQUEST_FAILURES) {
            return
          }
          this.requestLicense(keyMessage, callback);
        }
        break;
    }
  }

  onMediaEncrypted (e) {
    const keySession = this.video.mediaKeys.createSession();
    keySession.addEventListener('message', (event) => {
      this.onKeySessionMessage(keySession, event.message);
    }, false);
    keySession.generateRequest(e.initDataType, e.initData);
  }

  createWidevineMediaKeySystemConfigurations (audioCodecs, videoCodecs) {
    return [{
      videoCapabilities: videoCodecs.map(codec => ({
        contentType: `video/mp4; codecs="${codec}"`
      }))
    }]
  }

  static isSupported () {
    const checkIsIncompatibleBrowser = function () {
      const ua = navigator.userAgent
      let isSafari = /^((?!chrome|android).)*safari/i.test(ua);
      let isMSBrowser = (ua.indexOf('MSIE ') > 0) || (ua.indexOf('Trident/') > 0);
      let isFirefox = ua.indexOf('Firefox') > 0;
      let isEdge = ua.indexOf('Edge') > 0;
      return isSafari || isMSBrowser || isFirefox || isEdge;
    };
    return !!navigator.requestMediaKeySystemAccess && !checkIsIncompatibleBrowser();
  }
}
