import Plugin from '../../plugin'

class LeftGrid extends Plugin {
  static get pluginName () {
    return 'LeftGrid'
  }

  render () {
    return `
        <left-grid class="left-grid">
        </Left-grid>
     `
  }
}

export default LeftGrid
