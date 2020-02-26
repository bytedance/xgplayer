import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import PC from '../plugins/pc'
import Mobile from '../plugins/mobile'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
import sniffer from '../utils/sniffer';

import PlayIcon from '../plugins/icons/playIcon'
import FullScreen from '../plugins/icons/fullscreen'
import TimeIcon from '../plugins/icons/timeIcon'
import VolumeIcon from '../plugins/icons/volumeIcon'
import RotateIcon from '../plugins/icons/rotate'
import PIPIcon from '../plugins/icons/pipIcon'
import PlayNextIcon from '../plugins/icons/playNextIcon'
// import DownLoadIcon from '../plugins/icons/downloadIcon'
// import ScreenShotIcon from '../plugins/icons/screenShotIcon'
import DefinitionIcon from '../plugins/icons/definitionIcon'
import PlaybackRateIcon from '../plugins/icons/playbackRateIcon'
import CssFullScreen from '../plugins/icons/cssFullScreen'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [PlayIcon, FullScreen, TimeIcon, VolumeIcon,
      RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen, PIPIcon]
    this.plugins = [Poster, Start, Loading, Enter, ...contolsIcons]

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
