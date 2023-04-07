function __toRadians__ (degree) {
  return (degree * Math.PI) / 180
}

function __rotatePoint__ ([pointX, pointY], [originX, originY], degree) {
  // clockwise
  const angle = __toRadians__(degree)
  const rotatedX = Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX
  const rotatedY = Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY

  return [rotatedX, rotatedY]
}

export function genLinear (ctx, size, colors, top) {
  const rtv = ctx.createLinearGradient(0, 0, top ? 0 : size, top ? size : 0)
  for (let i = 0; i < colors.length;) {
    rtv.addColorStop(colors[i++], colors[i++])
  }
  return rtv
}

/**
 * 根据颜色构建渐变色
 * @param {*} ctx
 * @param {*} w
 * @param {*} colors
 * @returns
 */
export function getGradient (ctx, w, colors) {
  const gradient = ctx.createLinearGradient(0, 0, w, 0)
  const len = colors.length
  const per = 100 / len
  for (let i = 0; i < colors.length; i++) {
    gradient.addColorStop(per * i / 100, colors[i])
  }
  return gradient
}

export function shrink (data, count) {
  if (!count || count < 1) {
    count = data.length * count
  }

  const rtn = []
  const splitAt = Math.floor(data.length / count)

  for (let i = 1; i <= count; i++) {
    const arraySection = data.slice(i * splitAt, (i * splitAt) + splitAt)
    const middle = arraySection[Math.floor(arraySection.length / 2)]
    rtn.push(middle)
  }

  return rtn
}

export function scale (data, max) {
  let scalePercent = max / 255
  if (max <= 3 && max >= 0) scalePercent = max
  const rtn = data.map(value => value * scalePercent)
  return rtn
}

export function split (data, count) {
  const size = Math.floor(data.length / count)
  const rtn = []
  let temp = []

  let track = 0
  for (let i = 0; i <= size * count; i++) {
    if (track === size) {
      rtn.push(temp)
      temp = []
      track = 0
    }

    temp.push(data[i])
    track++
  }

  return rtn
}

export function getPoints (shape = 'line', size, [originX, originY], pointCount, endPoints, options = {}) {
  const { offset = 0, rotate = 0, customOrigin = [] } = options
  const rtn = {
    start: [],
    end: []
  }
  if (shape === 'line') {
    const increment = size / pointCount

    originX = customOrigin[0] || originX
    originY = customOrigin[1] || originY

    for (let i = 0; i <= pointCount; i++) {
      const degree = rotate
      const pointOffset = endPoints[i] * (offset / 100)

      const startingPoint = __rotatePoint__([originX + (i * increment), originY - pointOffset],
        [originX, originY], degree)
      rtn.start.push(startingPoint)

      const endingPoint = __rotatePoint__([originX + (i * increment), (originY + endPoints[i]) - pointOffset],
        [originX, originY], degree)
      rtn.end.push(endingPoint)
    }

    return rtn
  }
}
