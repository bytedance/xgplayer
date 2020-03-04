import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Miniscreen from '../plugins/miniScreen';
// import Miniscreen from '../Controls/mini';
// import Rotate from '../Controls/rotate';
import PC from '../plugins/pc'
import Mobile from '../plugins/mobile'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
import sniffer from '../utils/sniffer';
import Danmu from '../plugins/danmu'
import Progress from '../plugins/progress'
import PlayIcon from '../plugins/playIcon'
import FullScreen from '../plugins/fullscreenIcon'
import TimeIcon from '../plugins/timeIcon'
import VolumeIcon from '../plugins/volumeIcon'
import RotateIcon from '../plugins/rotateIcon'
import PIPIcon from '../plugins/pipIcon'
import PlayNextIcon from '../plugins/playNextIcon'
import DownLoadIcon from '../plugins/downloadIcon'
// import PlayNext from '../plugins/playNext'
// import DownLoadIcon from '../plugins/downloadIcon'
// import ScreenShotIcon from '../plugins/screenShotIcon'
import DefinitionIcon from '../plugins/definitionIcon'
import PlaybackRateIcon from '../plugins/playbackRateIcon'
import CssFullScreen from '../plugins/cssFullScreenIcon'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [Progress, PlayIcon, FullScreen, TimeIcon, VolumeIcon,
      RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen, DownLoadIcon]

    const barIcons = [{
      plugin: PIPIcon,
      options: {
        index: 0,
        rootType: PIPIcon.ROOT_TYPES.ROOT
      }}]

    const layers = [Replay, Poster, Start, Loading, Enter, Miniscreen, Danmu]

    this.plugins = [...contolsIcons, ...layers, ...barIcons]
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
