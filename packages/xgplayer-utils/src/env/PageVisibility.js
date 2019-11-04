import Events from '../constants/events'
const BROWSER_EVENTS = Events.BROWSER_EVENTS

let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

class PageVisibility {

  constructor () {
    this.callbacks = {
      onShow: [],
      onHidden: []
    }
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.init();
  }

  init () {
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  handleVisibilityChange () {
    this.emit(BROWSER_EVENTS.VISIBILITY_CHANGE, document[hidden])
  }

  destroy () {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

}

export default PageVisibility;
