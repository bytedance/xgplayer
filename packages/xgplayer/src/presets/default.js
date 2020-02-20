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

export default class DefaultPreset {
  constructor () {
    this.plugins = [Replay, Poster, Start, Loading, Enter]

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
