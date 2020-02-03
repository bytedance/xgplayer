import Plugin from '../../plugin'
import './index.scss'
// import PlayIcon from './play'
// import NextIcon from './next'
// import VolumeIcon from './volume'

class Controls extends Plugin {
  static get pluginName () {
    return 'Controls'
  }

  afterCreate () {
    // this.on('player', 'revrevre')
    console.log('afterCreate')
  }

  children () {
    // const left = this.find('left-grid')
    // const center = this.find('center')
    // const right = this.find('right-grid')
    return {
      // PlayIcon: {
      //   plugin: PlayIcon,
      //   options: {
      //     index: 0, root: left
      //   }
      // },
      // NextIcon: {
      //   plugin: NextIcon,
      //   options: {index: 1, root: left}
      // },
      // TimeIcon: {
      //   plugin: VolumeIcon,
      //   options: {index: 1, root: left}
      // }
    }
  }

  render () {
    return `<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">
    <left-grid class="left-grid">
    </Left-grid>
    <center class="center"></center>
    <right-grid class="right-grid">
    </right-grid>
    </xg-controls>`
  }
}

export default Controls
