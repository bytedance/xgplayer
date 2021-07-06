import Progress from 'xgplayer/es/plugins/progress'
import PlayIcon from 'xgplayer/es/plugins/play'
import TimeIcon from 'xgplayer/es/plugins/time'
import Volume from 'xgplayer/es/plugins/volume'
import Cover from './controls/cover'
import Backward from './controls/backward'
import Forward from './controls/forward'
import Next from './controls/next'
import Prev from './controls/prev'
import Meta from './controls/meta'

export default class MusicPreset {
  constructor () {
    this.plugins = [
      Progress,
      {
        plugin: PlayIcon,
        options: {
          config: {
            index: 3
          }
        }
      },
      Backward,
      Prev,
      Forward,
      Next,
      {
        plugin: TimeIcon,
        options: {
          index: 0,
          config: {
            position: TimeIcon.POSITIONS.CONTROLS_RIGTH
          }
        }
      },
      Volume,
      Cover,
      Meta]
    this.ignores = []
  }
}
