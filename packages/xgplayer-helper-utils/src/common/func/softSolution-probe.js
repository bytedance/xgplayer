
export default function () {
  let webAudioEnable = false
  let webglEnable = false

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    let ctx = new AudioContext()
    ctx.close()
    ctx = null
    webAudioEnable = true
  } catch (e) {}

  try {
    let cvs = document.createElement('canvas')
    var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d']
    for (let i = 0; i < validContextNames.length; i++) {
      let glCtx = cvs.getContext(validContextNames[i])
      if (glCtx) {
        glCtx = null
        cvs = null
        webglEnable = true
        break
      }
    }
  } catch (e) {}

  const WebComponentSupported = 'customElements' in window && window.customElements.define
  let isComponentDefined
  if (WebComponentSupported) {
    let mVideo = window.customElements.get('live-video')
    isComponentDefined = mVideo && mVideo.isSupported()
  }

  return webAudioEnable && webglEnable && isComponentDefined
}
