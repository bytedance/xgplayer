import loadingIcon from '../../skin/assets/loading.svg';

import Plugin from '../../plugin/plugin';

class Loading extends Plugin {
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
