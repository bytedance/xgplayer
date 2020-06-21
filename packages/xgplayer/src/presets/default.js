import sniffer from '../utils/sniffer';
// import Danmu from '../plugins/danmu'
import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Miniscreen from '../plugins/miniScreen';
import PC from '../plugins/pc'
import Mobile from '../plugins/mobile'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
import Progress from '../plugins/progress'
import PlayIcon from '../plugins/play'
import FullScreen from '../plugins/fullscreen'
import TimeIcon from '../plugins/time'
import Volume from '../plugins/volume'
import RotateIcon from '../plugins/rotate'
import PIPIcon from '../plugins/pip'
import PlayNextIcon from '../plugins/playNext'
import DownLoadIcon from '../plugins/download'
import ScreenShotIcon from '../plugins/screenShot'
import DefinitionIcon from '../plugins/definition'
import PlaybackRateIcon from '../plugins/playbackRate'
import CssFullScreen from '../plugins/cssFullScreen'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [Progress, PlayIcon, FullScreen, TimeIcon,
      RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, DownLoadIcon, ScreenShotIcon, Volume]

    const barIcons = [{
      plugin: PIPIcon,
      options: {
        index: 0,
        position: PIPIcon.POSITIONS.ROOT_TOP
      }}]

    const layers = [Replay, Poster, Start, Loading, Enter]

    this.plugins = [...contolsIcons, ...layers]
    switch (sniffer.device) {
      case 'pc':
        this.plugins.push(...[Keyboard, PC, CssFullScreen], ...barIcons, Miniscreen);
        break;
      case 'mobile':
        this.plugins.push(Mobile);
        break;
      default:
        this.plugins.push(...[Keyboard, PC])
    }
    this.ignores = []
  }
}
