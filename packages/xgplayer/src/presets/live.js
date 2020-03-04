import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import PC from '../plugins/pc'
import Mobile from '../plugins/mobile'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
import sniffer from '../utils/sniffer';

import PlayIcon from '../plugins/playIcon'
import FullScreen from '../plugins/fullscreen'
import TimeIcon from '../plugins/timeIcon'
import VolumeIcon from '../plugins/volumeIcon'
import RotateIcon from '../plugins/rotate'
import PIPIcon from '../plugins/pipIcon'
// import DownLoadIcon from '../plugins/downloadIcon'
// import ScreenShotIcon from '../plugins/screenShotIcon'
import DefinitionIcon from '../plugins/definitionIcon'
import PlaybackRateIcon from '../plugins/playbackRateIcon'
import CssFullScreen from '../plugins/cssFullScreen'

export default class DefaultPreset {
  constructor () {
    const contolsIcons = [PlayIcon, FullScreen, TimeIcon, VolumeIcon,
      RotateIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen, PIPIcon]
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
