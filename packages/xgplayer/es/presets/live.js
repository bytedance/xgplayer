function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import PC from '../plugins/pc';
import Mobile from '../plugins/mobile';
import Keyboard from '../plugins/keyboard';
import Loading from '../plugins/loading';
import sniffer from '../utils/sniffer';

import PlayIcon from '../plugins/icons/playIcon';
import FullScreen from '../plugins/icons/fullscreen';
import TimeIcon from '../plugins/icons/timeIcon';
import VolumeIcon from '../plugins/icons/volumeIcon';
import RotateIcon from '../plugins/icons/rotate';
import PIPIcon from '../plugins/icons/pipIcon';
// import DownLoadIcon from '../plugins/icons/downloadIcon'
// import ScreenShotIcon from '../plugins/icons/screenShotIcon'
import DefinitionIcon from '../plugins/icons/definitionIcon';
import PlaybackRateIcon from '../plugins/icons/playbackRateIcon';
import CssFullScreen from '../plugins/icons/cssFullScreen';

var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [PlayIcon, FullScreen, TimeIcon, VolumeIcon, RotateIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen, PIPIcon];
  this.plugins = [Poster, Start, Loading, Enter].concat(contolsIcons);

  switch (sniffer.device) {
    case 'pc':
      (_plugins = this.plugins).push.apply(_plugins, [Keyboard, PC]);
      break;
    case 'mobile':
      this.plugins.push(Mobile);
      break;
    default:
      (_plugins2 = this.plugins).push.apply(_plugins2, [Keyboard, PC]);
  }
  this.ignores = [];
};

export default DefaultPreset;