import Plugin, {Util} from '../../plugin';

class Enter extends Plugin {
  static get pluginName () {
    return 'enter';
  }

  static get defaultConfig () {
    return {
      innerHtml: '',
      logo: ''
    }
  }

  render () {
    const {innerHtml} = this.config
    const root = Util.createDom('xg-enter', '', {}, 'xgplayer-enter')

    if (innerHtml && innerHtml instanceof window.HTMLElement) {
      root.appendChild(innerHtml)
    } else if (innerHtml && typeof innerHtml === 'string') {
      root.innerHTML = innerHtml
    } else {
      let barStr = '';
      for (let i = 1; i <= 12; i++) {
        barStr += `<div class="xgplayer-enter-bar${i}"></div>`;
      }
      root.innerHTML = `<div class="xgplayer-enter-spinner">${barStr}</div>`
    }
    return root
  }
}

export default Enter;
