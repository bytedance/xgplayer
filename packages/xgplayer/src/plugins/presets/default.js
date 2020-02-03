import Replay from '../replay';
import Poster from '../poster';
import StartPlugin from '../StartPlugin';
import Miniscreen from '../Controls/mini';
import Rotate from '../Controls/rotate';
import PC from '../pc'
import Keyboard from '../keyboard'
import Loading from '../loading'
import sniffer from '../../utils/sniffer';

export default class DefaultPreset {
  constructor () {
    this.plugins = [Replay, Poster, StartPlugin, Loading]

    this.plugins.push({
      plugin: Miniscreen,
      options: {
        root: 'controls'
      }
    });
    this.plugins.push({
      plugin: Rotate,
      options: {
        root: 'controls'
      }
    })

    switch (sniffer.device) {
      case 'pc':
        this.plugins.push(...[Keyboard, PC])
        break;
      default:
        this.plugins.push(...[Keyboard, PC])
    }
    this.ignores = []
  }
}
