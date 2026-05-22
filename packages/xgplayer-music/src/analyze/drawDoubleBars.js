export default (context) => {
  const { data, options, ctx, h, w } = context
  const count = data.length > options.count ? options.count : data.length
  const percent = h / 255
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, w, h)
  const step = w / count
  const barWidth = step - step / 4
  let barHeight
  let x = 0
  const gradient = options.linear
  for (let i = 0; i < count; i++) {
    barHeight = data[i] * percent
    ctx.fillStyle = gradient
    ctx.fillRect(x, h / 2 + barHeight / 2, barWidth, -(barHeight))
    x += step
  }
}
