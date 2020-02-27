function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Miniscreen from '../plugins/miniScreen';
// import Miniscreen from '../Controls/mini';
// import Rotate from '../Controls/rotate';
import PC from '../plugins/pc';
import Mobile from '../plugins/mobile';
import Keyboard from '../plugins/keyboard';
import Loading from '../plugins/loading';
import sniffer from '../utils/sniffer';
import Danmu from '../plugins/danmu';
import Progress from '../plugins/icons/progress';
import PlayIcon from '../plugins/icons/playIcon';
import FullScreen from '../plugins/icons/fullscreen';
import TimeIcon from '../plugins/icons/timeIcon';
import VolumeIcon from '../plugins/icons/volumeIcon';
import RotateIcon from '../plugins/icons/rotate';
import PIPIcon from '../plugins/icons/pipIcon';
import PlayNextIcon from '../plugins/icons/playNextIcon';
// import DownLoadIcon from '../plugins/icons/downloadIcon'
// import ScreenShotIcon from '../plugins/icons/screenShotIcon'
import DefinitionIcon from '../plugins/icons/definitionIcon';
import PlaybackRateIcon from '../plugins/icons/playbackRateIcon';
import CssFullScreen from '../plugins/icons/cssFullScreen';

var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [Progress, PlayIcon, FullScreen, TimeIcon, VolumeIcon, RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen];
  var barIcons = [{
    plugin: PIPIcon,
    options: {
      index: 0,
      rootType: PIPIcon.ROOT_TYPES.BASE_BAR
    } }];
  var layers = [Replay, Poster, Start, Loading, Enter, Miniscreen, Danmu];

  this.plugins = [].concat(layers, barIcons, contolsIcons);
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