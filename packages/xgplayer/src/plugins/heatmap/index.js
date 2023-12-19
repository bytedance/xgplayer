import Plugin, { Events, Util } from '../../plugin'
import './index.scss'
export default class HeatMap extends Plugin {
  static get pluginName () {
    return 'heatmap'
  }

  static get defaultConfig () {
    return {
      lineWidth: 1,
      dpi: 1.5, // 分辨率
      alpha: 0.7, // 透明度
      lineStyle: '#ff0000',
      strokeStyle: '#000000',
      mapColor: '#FA1F41',
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
    // 本次热图数据
    this.curData = []
  }
  afterPlayerInit () {
    if (this.root) {
      return
    }
    this.createRoot()
    const {data} = this.config
    this.setData(data)
    this.resize()
    this.on(Events.VIDEO_RESIZE, () => {
      this.resize()
    })
  }

  setConfig (config) {
    Object.keys(config).forEach(key => {
      this.config[key] = config[key]
    })
    this.setData(this.config.data)
    this.drawLinePath()
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

  formatData (data) {
    const nData = []
    if (data.length < 1) {
      return nData
    }
    const totalDur = parseInt(data[data.length - 1].time * 1000, 10)
    if (Util.typeOf(data[0]) === 'Object' && data[0].time !== undefined) {
      data.forEach(item => {
        const dur = parseInt(item.time * 1000, 10)
        nData.push({
          ...item,
          dur: dur,
          percent: dur / totalDur
        })
      })
      return nData
    } else {
      return data
    }
  }

  _getX (index, stepX, item, width) {
    if (item.percent !== undefined) {
      return this.fixFloat (width * item.percent, this.dataFloatLen)
    } else {
      return this.fixFloat((index - 1) * stepX, this.dataFloatLen)
    }
  }

  setData (data) {
    if (data && data.length) {
      this.curData = this.formatData(data)
    }
    data = this.curData
    this.xData = []
    this.xData2 = []
    this.yData = []
    this.yMax = 0
    const { maxValue, minValue, maxLength } = this.config
    const max = maxValue
    const min = minValue
    const step_V = max - min
    const step_Y = this.canvasHeight
    // 取值间隔（原始数据一秒一个点）
    let curDataLength = data.length
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
    let y = min
    let i = parseInt(this.fixFloat(step_D, 0))
    let j = 1
    while (j < curDataLength) {
      const x = this._getX(j, step_X, data[i], this.canvasWidth)
      this.xData.push(x)
      y = data[i].score || data[i]
      // y值只能在[minValue, maxValue]之间
      y = Math.min(y, max)
      y = Math.max(y, min)
      // 计算y值百分比
      y = y / step_V
      // 由于canvas是笛卡尔坐标系, 所以y值要翻转下（canvas翻转暂时没找到正确用法）
      y = 1 - y
      // 最后从百分比转为真实的y坐标
      y = this.fixFloat(y * step_Y, this.dataFloatLen)
      this.yMax = Math.max(this.yMax, step_Y - y)
      this.yData.push(y)

      j++
      i = parseInt(this.fixFloat(j * step_D, 0))
    }
    // 最后添加以后最后最边缘的值
    this.xData.push(this.canvasWidth)
    this.yData.push(y)
  }

  drawLinePath () {
    this.clearCanvas()
    const ct = this.canvas.getContext('2d')
    const { xData, yData } = this
    let x, y
    let i = 0
    const { lineWidth, alpha, strokeStyle, lineStyle, mapColor } = this.config
    // 画热图
    ct.beginPath()
    ct.lineWidth = lineWidth
    ct.globalAlpha = alpha
    ct.strokeStyle = strokeStyle
    ct.fillStyle = mapColor
    ct.lineStyle = lineStyle
    ct.moveTo(0, this.canvasHeight)
    x = xData[i]
    y = yData[i]
    while (x !== undefined && y !== undefined) {
      ct.lineTo(x, y)
      i++
      x = xData[i]
      y = yData[i]
    }
    ct.lineTo(this.canvasWidth, this.canvasHeight)
    ct.closePath()
    ct.stroke()
    ct.fill()
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