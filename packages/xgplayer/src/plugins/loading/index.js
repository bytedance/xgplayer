import loadingIcon from '../assets/loading.svg';

import Plugin from '../../plugin/plugin';

class Loading extends Plugin {
  static get pluginName () {
    return 'loading'
  }

  registerIcons () {
    return {
      'loadingIcon': loadingIcon
    }
  }

  render () {
    return `
    <xg-loading class="xgplayer-loading">
      ${this.icons.loadingIcon}
    </xg-loading>`
  }
}

export default Loading;
