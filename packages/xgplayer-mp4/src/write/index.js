import Box from './box'
import Buffer from './buffer'

// 引入整个目录
// eslint-disable-next-line no-undef
const context = require.context('./box', true, /\.js$/)
context.keys().forEach(function (key) {
  context(key)
})

class Write {
  writeMeta (boxes) {
    const out = new Buffer()
    boxes.forEach(item => {
      const box = new Box(item, out)
      box.writeBody()
    })
    return out.buffer
  }

  writeFragment (...args) {
    const out = new Buffer()
    args.forEach(item => {
      if (!item) {
        return false
      }
      const box = new Box(item, out)
      box.writeBody()
    })
    return out.buffer
  }
}

export default Write
