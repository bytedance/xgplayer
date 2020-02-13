import Plugin from '../../plugin';

class EnterPlugin extends Plugin {
  static get pluginName () {
    return 'index.scss';
  }

  render () {
    let barStr = '';
    for (let i = 1; i <= 12; i++) {
      barStr += `<div class="xgplayer-enter-bar${i}"></div>`;
    }

    return `<xg-enter class="xgplayer-enter"><div class="xgplayer-enter-spinner">
      ${barStr}
    </div></xg-enter>`;
  }
}

export default EnterPlugin;
