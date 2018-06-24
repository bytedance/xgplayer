class Download {
  constructor (filename, content) {
    let aLink = document.createElement('a')
    let blob = new Blob([content])
    let evt = document.createEvent('MouseEvents')
    evt.initEvent('click', false, false)
    aLink.download = filename
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(evt)
  }
}

export default Download
