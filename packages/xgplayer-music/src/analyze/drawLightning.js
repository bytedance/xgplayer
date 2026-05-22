export default (context) => {
  const { data, options, ctx, h, w } = context
  const bufferLen = data.length > options.count ? options.count : data.length
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, w, h)
  ctx.beginPath()
  const gradient = options.linear
  ctx.strokeStyle = gradient// options.colors[0]
  const sliceWidth = w / bufferLen
  let x = 0
  for (let i = 0; i < bufferLen; i++) {
    const v = data[i] / 128.0
    const y = v * h / 2
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    x += sliceWidth
  }
  ctx.lineTo(w, h / 2)
  ctx.stroke()
}
