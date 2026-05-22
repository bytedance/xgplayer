export default (context) => {
  const { data, options, ctx, h, w } = context

  const percent = h / 255
  const increase = w / 128
  const count = options.count || 128
  const min = 5
  // const breakpoint = Math.floor(count / options.colors.length)

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, w, h)
  const gradient = options.linear
  for (let point = 1; point <= count; point++) {
    let p = data[point] // get value
    p += min
    p *= percent

    const x = increase * point

    const mid = (h / 2) + (p / 2)

    ctx.moveTo(x, mid)
    ctx.lineTo(x, mid - p)
    ctx.strokeStyle = gradient
    ctx.stroke()
    ctx.beginPath()
    // if (point % breakpoint === 0) {
    //   const i = (point / breakpoint) - 1
    //   ctx.strokeStyle = options.colors[i]
    //   ctx.stroke()
    //   ctx.beginPath()
    // }
  }
}
