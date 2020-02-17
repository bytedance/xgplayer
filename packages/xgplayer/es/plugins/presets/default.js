function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Replay from '../replay';
import Poster from '../poster';
import Start from '../start';
import Enter from '../enter';
// import Miniscreen from '../Controls/mini';
// import Rotate from '../Controls/rotate';
import PC from '../pc';
import Mobile from '../mobile';
import Keyboard from '../keyboard';
import Loading from '../loading';
import sniffer from '../../utils/sniffer';

var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  this.plugins = [Replay, Poster, Start, Loading, Enter];

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