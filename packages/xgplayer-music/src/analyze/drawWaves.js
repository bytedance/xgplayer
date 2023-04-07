import { split, scale, shrink } from './helper'

function drawPath (ctx, dataArray, options, bufferLen) {
  const { w, linear, reverse, offset } = options
  ctx.save()
  ctx.beginPath()
  const sliceWidth = w * 1 / bufferLen
  ctx.strokeStyle = linear
  let x = 0
  let y = 0
  for (let i = 0; i < bufferLen; i++) {
    y = reverse ? 0 - dataArray[i] : dataArray[i]
    y = offset - y
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    x += sliceWidth
  }
  ctx.lineTo(w, y)
  ctx.stroke()
}
export default (context) => {
  const { options, ctx, h, w } = context
  let data = context.data
  const { colors } = options
  data = shrink(data, 2048)
  data = scale(data, h / 2)
  data = split(data, 4).slice(0, 3)

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = options.bgColor
  ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < data.length; i++) {
    drawPath(ctx, data[i], {
      linear: colors[i],
      w,
      h,
      offset: h / 2,
      reverse: false
    }, data[i].length)
    drawPath(ctx, data[i], {
      linear: colors[i],
      w,
      h,
      offset: h / 2,
      reverse: true
    }, data[i].length)
  }
}
