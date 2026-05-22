import drawBars from './drawBars'
import drawVertLines from './drawVertlines'
import drawLightning from './drawLightning'
import drawDoubleline from './drawDoubleline'
import drawDoubleBars from './drawDoubleBars'
import drawWaves from './drawWaves'

const modeMap = {
  bars: drawBars,
  vertLines: drawVertLines, // 数显
  lightning: drawLightning,
  doubleLine: drawDoubleline,
  doubleBars: drawDoubleBars,
  waves: drawWaves
}
const frameRateMap = {
  bars: 2,
  vertLines: 1,
  lightning: 2,
  doubleLine: 1,
  doubleBars: 2,
  waves: 2
}

const MODES = {
  BARS: 'bars',
  VERT_LINES: 'vertLines',
  LIGHTNING: 'lightning',
  DOUBLE_LINE: 'doubleLine',
  DOUBLE_BARS: 'doubleBars',
  WAVES: 'waves'
}

function render (data, canvas, options = {}, frame) {
  if (!canvas) {
    return
  }
  options = { ...options }
  if (!options.stroke) options.stroke = 1
  if (!options.colors) options.colors = ['#ff8177', '#cf556c', '#f99185', '#b12a5b']

  const ctx = canvas.getContext('2d')
  const h = canvas.height
  const w = canvas.width

  ctx.strokeStyle = options.colors[0]
  ctx.lineWidth = options.stroke

  const context = {
    data, options, ctx, h, w
  }
  if (typeof options.mode === 'string') options.mode = [options.mode]
  options.mode.forEach(mode => {
    // abide by the frame rate
    if (frame % frameRateMap[mode] === 0) {
      // clear canvas
      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()

      modeMap[mode](context)
    }
  })
}

export {
  render as default,
  MODES
}
