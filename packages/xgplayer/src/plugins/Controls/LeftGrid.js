import Plugin from '../../plugin'

class LeftGrid extends Plugin {
  static get pluginName () {
    return 'LeftGrid'
  }

  render () {
    return `
        <left-grid class="left-grid">
        </Left-grid>
        <center></center>
        <right-grid class="right-grid">
        </right-grid>
     `
  }
}

export default LeftGrid
