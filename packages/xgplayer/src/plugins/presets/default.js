import Replay from '../replay';
import Poster from '../poster';
import StartPlugin from '../StartPlugin';
import Miniscreen from '../Controls/mini';
import Rotate from '../Controls/rotate';
import PC from '../pc'
import sniffer from '../../utils/sniffer';

export default class DefaultPreset {
  constructor () {
    this.plugins = []
    this.plugins.push(Replay);
    this.plugins.push(Poster);
    this.plugins.push(StartPlugin);

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
        this.plugins.push(PC)
        break;
      default:
        this.plugins.push(PC)
    }
    this.ignores = []
  }
}
