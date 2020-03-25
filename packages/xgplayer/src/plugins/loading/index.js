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

  afterCreate () {
    console.log('this.icons.loadingIcon', this.icons.loadingIcon)
    this.appendChild(this.icons.loadingIcon)
  }

  render () {
    return `
    <xg-loading class="xgplayer-loading">
    </xg-loading>`
  }
}

export default Loading;
