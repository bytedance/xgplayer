import Plugin from '../../plugin'

class RightGrid extends Plugin {
  static get pluginName () {
    return 'RightGrid'
  }

  render () {
    return `<right-grid class="right-grid"></right-grid>`
  }
}

export default RightGrid
