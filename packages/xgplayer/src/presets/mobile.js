import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Mobile from '../plugins/mobile'
import Loading from '../plugins/loading'
import Progress from '../plugins/progress'
import PlayIcon from '../plugins/play'
import FullScreen from '../plugins/fullscreen'
import TimeIcon from '../plugins/time'
import RotateIcon from '../plugins/rotate'
import PlayNextIcon from '../plugins/playNext'
import DownLoadIcon from '../plugins/download'
import ScreenShotIcon from '../plugins/screenShot'
import DefinitionIcon from '../plugins/definition'
import PlaybackRateIcon from '../plugins/playbackRate'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [Mobile, Progress, PlayIcon, FullScreen, TimeIcon,
      RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, DownLoadIcon, ScreenShotIcon]
    const layers = [Replay, Poster, Start, Loading, Enter]

    this.plugins = [...contolsIcons, ...layers]
    this.ignores = []
    // this.icons = {
    //   play: Play,
    //   pause: Pause
    // }
  }
}
