import Replay from '../replay';
import Poster from '../poster';
import Start from '../start';
import Enter from '../enter';
import Miniscreen from '../miniScreen';
import PC from '../pc'
import Mobile from '../mobile'
import Keyboard from '../keyboard'
import Loading from '../loading'
import sniffer from '../../utils/sniffer';
import Danmu from '../danmu'
import Progress from '../icons/progress'
import PlayIcon from '../icons/playIcon'
import FullScreen from '../icons/fullscreen'
import TimeIcon from '../icons/timeIcon'
import VolumeIcon from '../icons/volumeIcon'
import RotateIcon from '../icons/rotate'
// import MiniScreen from '../icons/miniScreen'
import PIPIcon from '../icons/pipIcon'
import PlayNextIcon from '../icons/playNextIcon'
// import DownLoadIcon from '../icons/downloadIcon'
// import ScreenShotIcon from '../icons/screenShotIcon'
import DefinitionIcon from '../icons/definitionIcon'
import PlaybackRateIcon from '../icons/playbackRateIcon'
import CssFullScreen from '../icons/cssFullScreen'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [Progress, PlayIcon, FullScreen, TimeIcon, VolumeIcon,
      RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen]
    const barIcons = [{
      plugin: PIPIcon,
      options: {
        index: 0,
        rootType: PIPIcon.ROOT_TYPES.BASE_BAR
      }}]
    const layers = [Replay, Poster, Start, Loading, Enter, Miniscreen, Danmu]
    this.plugins = [...layers, ...barIcons, ...contolsIcons]
    switch (sniffer.device) {
      case 'pc':
        this.plugins.push(...[Keyboard, PC]);
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
