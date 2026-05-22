export default (context) => {
  const { data, options, ctx, h, w } = context
  let count = options.count || 128
  if (data.length < count) {
    count = data.length
  }
  const percent = h / 255
  const increase = w / count
  const gradient = options.linear
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, w, h)
  for (let point = 1; point <= count; point++) {
    let p = data[point] // get value
    p *= percent

    const x = increase * point

    ctx.moveTo(x, h)
    ctx.lineTo(x, h - p)

    ctx.strokeStyle = gradient
    ctx.stroke()
    ctx.beginPath()
  }
}
