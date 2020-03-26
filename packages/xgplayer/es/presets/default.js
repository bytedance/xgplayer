function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import sniffer from '../utils/sniffer';
// import Danmu from '../plugins/danmu'
import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Miniscreen from '../plugins/miniScreen';
import PC from '../plugins/pc';
import Mobile from '../plugins/mobile';
import Keyboard from '../plugins/keyboard';
import Loading from '../plugins/loading';
import Progress from '../plugins/progress';
import PlayIcon from '../plugins/play';
import FullScreen from '../plugins/fullscreen';
import TimeIcon from '../plugins/time';
import Volume from '../plugins/volume';
import RotateIcon from '../plugins/rotate';
import PIPIcon from '../plugins/pip';
import PlayNextIcon from '../plugins/playNext';
import DownLoadIcon from '../plugins/download';
import ScreenShotIcon from '../plugins/screenShot';
import DefinitionIcon from '../plugins/definition';
import PlaybackRateIcon from '../plugins/playbackRate';
import CssFullScreen from '../plugins/cssFullScreen';

var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [Progress, PlayIcon, FullScreen, TimeIcon, RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, DownLoadIcon, ScreenShotIcon];

  var barIcons = [{
    plugin: PIPIcon,
    options: {
      index: 0,
      position: PIPIcon.POSITIONS.ROOT_TOP
    } }];

  var layers = [Replay, Poster, Start, Loading, Enter];

  this.plugins = [].concat(contolsIcons, layers);
  switch (sniffer.device) {
    case 'pc':
      (_plugins = this.plugins).push.apply(_plugins, [Keyboard, PC, CssFullScreen, Volume].concat(barIcons, [Miniscreen]));
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