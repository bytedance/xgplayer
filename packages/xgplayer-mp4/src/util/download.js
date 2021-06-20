class Download {
  constructor (filename, content) {
    const aLink = document.createElement('a')
    const blob = new Blob([content])
    const evt = document.createEvent('MouseEvents')
    evt.initEvent('click', false, false)
    aLink.download = filename
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(evt)
  }
}

export default Download
