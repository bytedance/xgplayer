import Replay from '../replay';
import Poster from '../poster';
import Start from '../start';
import Enter from '../enter';
import Miniscreen from '../miniScreen';
// import Rotate from '../Controls/rotate';
import PC from '../pc'
import Mobile from '../mobile'
import Keyboard from '../keyboard'
import Loading from '../loading'
import sniffer from '../../utils/sniffer';
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
