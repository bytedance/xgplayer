import Plugin, { Events, Util } from '../../plugin'
import './index.scss'

/**
 * @typedef {{
*   lineWidth?: number,
*   dpi?: number,
*   alpha?: number,
*   gradient?: Array<number>,
*   gradientColors?: Array<{ start: number, color:number }>,
*   strokeStyle?: string,
*   fillColor?: string,
*   height?: number,
*   data?: Array<number>,
*   maxValue?: number,
*   minValue?: number,
*   maxLength?: number,
*   mode?: string,
*   [propName: string]: any
* }} IHeatMapConfig
*/

export default class HeatMap extends Plugin {
  static get pluginName () {
    return 'heatmap'
  }

  /**
   * @type IHeatMapConfig
   */
  static get defaultConfig () {
    return {
      lineWidth: 0,
      dpi: 2, // 分辨率
      alpha: 0.7, // 透明度
      gradient: [], // 渐变配置
      gradientColors: [], // 渐变颜色配置
      strokeStyle: '', // 描边颜色
      fillColor: '#FA1F41', // 填充颜色
      height: 20, // 高度
      data: [], // 数据
      maxValue: 100, // 数据最小值
      minValue: 0, // 数据最小值
      maxLength: 400,
      mode: 'activeShow'
    }
  }

  constructor (args) {
    super(args)
    // 画布高度
    this.canvasHeight = 0
    // 画布宽度
    this.canvasWidth = 0
    this.width = 0
    this.height = 0
    // 小数点位数
    this.dataFloatLen = 2
    // X轴数据
    this.xData = []
    // Y轴数据
    this.yData = []
    // Y轴数据最大值
    this.yMax = 0
    this._duration = 0
    // 本次热图数据
    this.curData = []
  }
  afterPlayerInit () {
    if (this.root) {
      return
    }
    this.createRoot()
    this.reset()
  }

  afterCreate () {
    this.on(Events.VIDEO_RESIZE, () => {
      this.resize()
    })
    this.on(Events.DURATION_CHANGE, () => {
      this._duration = this.player.duration
      this.reset()
    })
  }

  setConfig (config) {
    Object.keys(config).forEach(key => {
      this.config[key] = config[key]
    })
    this.reset()
  }

  reset () {
    const {data} = this.config
    this.setData(data)
    this.resize()
  }

  createRoot () {
    if (this.root) {
      return
    }
    const { mode } = this.config
    const {progress} = this.player.plugins
    const parent = progress.root
    const _class = mode === 'activeShow' ? 'xg-heatmap-active-show' : 'xg-heatmap-normal'
    const root = Util.createDom('div', '', {}, `xg-heatmap ${_class}`)
    const c = parent.children.length > 0 ? parent.children[0] : null
    parent.insertBefore(root, c)
    this.root = root
    const canvas = Util.createDom('canvas', '', {}, 'xg-heatmap-canvas')
    this.root.appendChild(canvas)
    this.root.style.height = `${this.config.height}px`
    this.canvas = canvas
  }

  resize () {
    const { dpi } = this.config
    const { width, height } = this.root.getBoundingClientRect()
    if (width === this.width && height * dpi === this.height) {
      return
    }
    this.width = width
    this.height = height
    this.canvas.width = this.canvasWidth = width * dpi
    this.canvas.height = this.canvasHeight = height * dpi
    this.yMax = 0
    if (this.curData.length) {
      this.setData()
      this.drawLinePath()
    }
  }

  formatData (data, duration, minValue) {
    const nData = []
    if (data.length < 1) {
      return nData
    }
    const totalDur = parseInt(duration * 1000, 10)
    if (Util.typeOf(data[0]) === 'Object' && data[0].time !== undefined) {
      if (!totalDur) {
        return nData
      }
      let step = 1
      let lastTime = 0
      data.forEach(item => {
        const dur = parseInt(item.time * 1000, 10)
        if (lastTime && (step < 0 || item.time - lastTime < step)) {
          step = item.time - lastTime
        }
        lastTime = item.time
        nData.push({
          ...item,
          percent: dur / totalDur
        })
      })
      // 开始的时间点不是0，插入一条数据,从0开始
      const fTime = nData[0].time
      if (fTime > 0) {
        const arr = fTime - step > 0 ? [fTime - step, 0] : [0]
        arr.forEach(time => {
          const dur = parseInt(time * 1000, 10)
          nData.unshift({
            time,
            score: minValue,
            percent: dur / totalDur
          })
        })
      }
      // 结束的时间不是duration则插入最小值
      const last = nData[nData.length - 1]
      if (duration - last.time > step) {
        [last.time + step, duration].forEach(item => {
          const dur = parseInt(item * 1000, 10)
          nData.push({
            time: item,
            score: minValue,
            percent: dur / totalDur
          })
        })
      }
    } else {
      data.forEach(item => {
        nData.push(item)
      })
    }
    return nData
  }

  _getX (index, stepX, item, width) {
    if (item.percent !== undefined) {
      return this.fixFloat (width * item.percent, this.dataFloatLen)
    } else {
      return this.fixFloat((index - 1) * stepX, this.dataFloatLen)
    }
  }

  _getY (item, stepY, maxY) {
    const { maxValue, minValue } = this.config
    let y = minValue
    y = item.score !== undefined ? item.score : item
    // y值只能在[minValue, maxValue]之间
    y = Math.min(y, maxValue)
    y = Math.max(y, minValue)
    // 计算y值百分比
    y = y / stepY
    // 由于canvas是笛卡尔坐标系, 所以y值要翻转下（canvas翻转暂时没找到正确用法）
    y = 1 - y
    // 最后从百分比转为真实的y坐标
    y = this.fixFloat(y * maxY, this.dataFloatLen)
    return y
  }

  setData (data) {
    const { maxValue, minValue, maxLength } = this.config
    if (data && data.length) {
      this.curData = this.formatData(data, this._duration, minValue)
    }
    data = this.curData
    if (data.length < 1) {
      return
    }
    this.xData = []
    this.yData = []
    this.yMax = 0
    const max = maxValue
    const min = minValue
    const step_V = max - min
    const step_Y = this.canvasHeight
    // 取值间隔（原始数据一秒一个点）
    let curDataLength = data.length
    // 采样率, 大于最大数据量需要做采样
    const step_D = curDataLength > maxLength ? this.fixFloat(curDataLength / maxLength, this.dataFloatLen) : 1
    // 由于数据是1秒一个点，防止数据过多导致性能下降，所以要挑数据
    curDataLength = parseInt(curDataLength / step_D)

    // 获得X轴间隔
    let step_X = this.canvasWidth / (curDataLength - 1)

    step_X = this.fixFloat(step_X, this.dataFloatLen)

    if (Number.isNaN(step_X)) {
      // 数据有问题，停止
      return
    }
    // 遍历数据生成X,Y轴数据
    let i = parseInt(this.fixFloat(step_D - 1, 0))
    let j = 0
    while (j < curDataLength) {
      const x = this._getX(j, step_X, data[i], this.canvasWidth)
      this.xData.push(x)
      const y = this._getY(data[i], step_V, step_Y)
      this.yMax = Math.max(this.yMax, step_Y - y)
      this.yData.push(y)

      j++
      i = parseInt(this.fixFloat(j * step_D, 0))
    }
    // 最后添加以后最后最边缘的值
    // this.xData.push(this.canvasWidth)
    // this.yData.push(minValue)
  }

  _getFillStyle (ctx) {
    const {gradient, gradientColors, fillStyle } = this.config
    let fStyle = fillStyle
    if (gradient && gradient.length === 4) {
      const gradientStyle = ctx.createLinearGradient(gradient[0], gradient[1], gradient[2], gradient[3])
      if (gradientColors.length < 2) {
        console.warn(this.pluginName, '渐变颜色配置gradientColors异常')
      } else {
        gradientColors.forEach(item => {
          gradientStyle.addColorStop(item.start, item.color)
        })
        fStyle = gradientStyle
      }
    }
    return fStyle
  }

  drawLinePath () {
    this.clearCanvas()
    const ctx = this.canvas.getContext('2d')
    const { xData, yData } = this
    let x, y
    let i = 0
    const { lineWidth, alpha, strokeStyle } = this.config
    const fillStyle = this._getFillStyle(ctx)
    // 画热图
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.globalAlpha = alpha
    ctx.strokeStyle = strokeStyle || fillStyle
    ctx.fillStyle = fillStyle
    ctx.moveTo(0, this.canvasHeight)
    x = xData[i]
    y = yData[i]
    while (x !== undefined && y !== undefined) {
      ctx.lineTo(x, y)
      i++
      x = xData[i]
      y = yData[i]
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }

  clearCanvas () {
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
  }

  fixFloat (_num, _length) {
    if (typeof _num === 'number') {
      return parseFloat(_num.toFixed(_length))
    }
    // 返回NaN可能会导致数据有问题
    return NaN
  }

  render () {
    return ''
  }
}